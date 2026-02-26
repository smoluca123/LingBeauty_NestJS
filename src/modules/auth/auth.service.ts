import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { RefreshTokenDto } from 'src/modules/auth/dto/refresh-token.dto';
import { VerifyEmailDto } from 'src/modules/auth/dto/verify-email.dto';
import { VerifyPhoneDto } from 'src/modules/auth/dto/verify-phone.dto';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';
import { AuthResponseDto } from 'src/modules/auth/dto/response/auth-response.dto';
import { ValidateTokenResponseDto } from 'src/modules/auth/dto/response/validate-token-response.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import { JwtAuthService } from 'src/modules/jwt/jwt.service';
import { JwtPayload } from 'src/modules/jwt/interfaces/jwt-payload.interface';
import {
  ConflictException,
  CustomUnauthorizedException,
  ForbiddenException,
  BusinessException,
} from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { configData } from 'src/configs/configuration';
import { generateOTPCode } from 'src/libs/utils/utils';
import { userSelect } from 'src/libs/prisma/user-select';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { MailService } from 'src/modules/mail/mail.service';
import { EmailVerificationAction } from 'prisma/generated/prisma';

// Interface for request metadata (IP, User Agent)
interface RequestMetadata {
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuthService {
  private readonly redis: Redis;
  private readonly OTP_TTL = 600; // 10 minutes in seconds
  private readonly RATE_LIMIT_MAX_REQUESTS = 3;
  private readonly RATE_LIMIT_WINDOW_SECONDS = 300; // 5 minutes

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {
    this.redis = this.redisService.getOrThrow();
  }

  /**
   * Check if user is rate limited for email verification
   * @returns true if rate limited, false otherwise
   */
  private async checkRateLimit(userId: string): Promise<boolean> {
    const rateLimitKey = `email_verification_rate:${userId}`;
    const currentCount = await this.redis.get(rateLimitKey);
    return (
      currentCount !== null &&
      parseInt(currentCount, 10) >= this.RATE_LIMIT_MAX_REQUESTS
    );
  }

  /**
   * Get remaining cooldown time in seconds
   */
  private async getRemainingCooldown(userId: string): Promise<number> {
    const rateLimitKey = `email_verification_rate:${userId}`;
    const ttl = await this.redis.ttl(rateLimitKey);
    return ttl > 0 ? ttl : 0;
  }

  /**
   * Increment rate limit counter for email verification
   */
  private async incrementRateLimitCounter(userId: string): Promise<void> {
    const rateLimitKey = `email_verification_rate:${userId}`;
    const currentCount = await this.redis.get(rateLimitKey);

    if (currentCount === null) {
      await this.redis.setex(rateLimitKey, this.RATE_LIMIT_WINDOW_SECONDS, '1');
    } else {
      await this.redis.incr(rateLimitKey);
    }
  }

  /**
   * Log email verification action for audit trail
   */
  private async logEmailVerificationAction(
    userId: string,
    email: string,
    action: EmailVerificationAction,
    metadata?: RequestMetadata & { error?: string },
  ): Promise<void> {
    try {
      await this.prismaService.emailVerificationLog.create({
        data: {
          userId,
          email,
          action,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent,
          metadata: metadata?.error ? { error: metadata.error } : undefined,
        },
      });
    } catch (error) {
      // Don't throw error if logging fails - it shouldn't break the main flow
      console.error('Failed to log email verification action:', error);
    }
  }

  /**
   * Example: Get user by email
   * Demonstrates using Prisma Select to optimize query and UserResponseDto to exclude sensitive fields
   */
  async getUserByEmail(
    email: string,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    // Using Prisma Select to only fetch needed fields (optimization)
    // Note: We still need password for validation, but it will be excluded by UserResponseDto
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        username: true,
        password: true, // Needed for validation, but excluded in response
        refreshToken: true, // Needed for validation, but excluded in response
        isActive: true,
        isVerified: true,
        isBanned: true,
        isDeleted: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        emailVerifiedAt: true,
        phoneVerifiedAt: true,
        createdAt: true,
        updatedAt: true,

        // Exclude relations if not needed: cart, orders, reviews, addresses, affiliate, roleAssignments
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Transform Prisma result to UserResponseDto
    // ClassSerializerInterceptor will automatically exclude fields marked with @Exclude()
    const userResponse = toResponseDto(UserResponseDto, user);

    return {
      type: 'response',
      message: 'Lấy thông tin người dùng thành công',
      data: userResponse,
    };
  }

  /**
   * Example: Get user by ID (optimized version - excludes password/refreshToken at query level)
   * This is the most optimized approach when you don't need sensitive fields
   */
  async getUserById(
    id: string,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    // Optimized: Exclude password and refreshToken at Prisma query level
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        username: true,
        // password: false, // Excluded at query level
        // refreshToken: false, // Excluded at query level
        isActive: true,
        isVerified: true,
        isBanned: true,
        isDeleted: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        emailVerifiedAt: true,
        phoneVerifiedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Transform to DTO - ClassSerializerInterceptor handles serialization
    const userResponse = toResponseDto(UserResponseDto, user);

    return {
      type: 'response',
      message: 'Lấy thông tin người dùng thành công',
      data: userResponse,
    };
  }

  /**
   * Register a new user
   * Validates input, checks for duplicates, hashes password, creates user, and generates tokens
   */
  async register(
    registerDto: RegisterDto,
  ): Promise<IBeforeTransformResponseType<AuthResponseDto>> {
    // Check if email already exists
    const existingEmail = await this.prismaService.user.findUnique({
      where: { email: registerDto.email },
      select: { id: true },
    });
    if (existingEmail) {
      throw new ConflictException(
        'Email này đã được đăng ký',
        ERROR_CODES.EMAIL_ALREADY_EXISTS,
      );
    }

    // Check if phone already exists
    const existingPhone = await this.prismaService.user.findUnique({
      where: { phone: registerDto.phone },
      select: { id: true },
    });
    if (existingPhone) {
      throw new ConflictException(
        'Số điện thoại này đã được đăng ký',
        ERROR_CODES.USER_ALREADY_EXISTS,
      );
    }

    // Check if username already exists
    const existingUsername = await this.prismaService.user.findUnique({
      where: { username: registerDto.username },
      select: { id: true },
    });
    if (existingUsername) {
      throw new ConflictException(
        'Tên đăng nhập này đã được sử dụng',
        ERROR_CODES.USER_ALREADY_EXISTS,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      configData.BCRYPT_SALT_ROUNDS,
    );

    // Create user
    const user = await this.prismaService.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phone: registerDto.phone,
        username: registerDto.username,
        roleAssignments: {
          create: {
            roleId: configData.USER_ROLE_ID,
          },
        },
      },
      select: userSelect,
    });

    // Generate tokens
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
    };
    const { accessToken, refreshToken } =
      await this.jwtAuthService.generateTokenPair(payload);

    // Save refreshToken to database
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Transform to DTOs
    const userResponse = toResponseDto(UserResponseDto, user);
    const authResponse: AuthResponseDto = {
      user: userResponse,
      accessToken,
    };

    return {
      type: 'response',
      message: 'Đăng ký tài khoản thành công',
      data: authResponse,
    };
  }

  /**
   * Login user with email and password
   * Validates credentials, verifies password, generates tokens, and updates refreshToken
   */
  async login(
    loginDto: LoginDto,
  ): Promise<IBeforeTransformResponseType<AuthResponseDto>> {
    // Find user by email
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
      select: { ...userSelect, password: true },
    });

    if (!user) {
      throw new CustomUnauthorizedException(
        ERROR_MESSAGES[ERROR_CODES.EMAIL_NOT_FOUND],
        ERROR_CODES.EMAIL_NOT_FOUND,
      );
    }

    const password = await bcrypt.compare(loginDto.password, user.password);
    if (!password) {
      throw new CustomUnauthorizedException(
        ERROR_MESSAGES[ERROR_CODES.INVALID_PASSWORD],
        ERROR_CODES.INVALID_PASSWORD,
      );
    }

    // Check if user is deleted
    if (user.isDeleted) {
      throw new CustomUnauthorizedException(
        'Không tìm thấy người dùng hoặc tài khoản đã bị xóa',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    // Check if user is banned
    if (user.isBanned || !user.isActive) {
      throw new ForbiddenException(
        'Tài khoản đã bị cấm',
        ERROR_CODES.USER_BANNED,
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new CustomUnauthorizedException(
        'Invalid email or password',
        ERROR_CODES.INVALID_CREDENTIALS,
      );
    }

    // Generate tokens
    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
    };
    const { accessToken, refreshToken } =
      await this.jwtAuthService.generateTokenPair(payload);

    // Update refreshToken in database
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Transform to DTOs (exclude password)
    const userResponse = toResponseDto(UserResponseDto, {
      ...user,
      password: undefined, // Ensure password is excluded
    });
    const authResponse: AuthResponseDto = {
      user: userResponse,
      accessToken,
    };

    return {
      type: 'response',
      message: 'Đăng nhập thành công',
      data: authResponse,
    };
  }

  /**
   * Refresh access token using refresh token
   * Verifies refreshToken, validates user, generates new tokens, and updates refreshToken in DB
   */
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<IBeforeTransformResponseType<AuthResponseDto>> {
    try {
      // Verify refresh token
      let decodedPayload: JwtPayload;
      try {
        decodedPayload = await this.jwtAuthService.verifyToken<JwtPayload>(
          refreshTokenDto.accessToken,
          {
            ignoreExpiration: true,
          },
        );
      } catch {
        throw new CustomUnauthorizedException(
          'Invalid refresh token',
          ERROR_CODES.INVALID_REFRESH_TOKEN,
        );
      }

      // Find user by userId from token payload
      const user = await this.prismaService.user.findUnique({
        where: { id: decodedPayload.userId },
        select: userSelect,
      });

      if (!user) {
        throw new CustomUnauthorizedException(
          'Không tìm thấy người dùng',
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if user is deleted
      if (user.isDeleted) {
        throw new CustomUnauthorizedException(
          'Không tìm thấy người dùng hoặc tài khoản đã bị xóa',
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if user is banned
      if (user.isBanned || !user.isActive) {
        throw new ForbiddenException(
          'Tài khoản đã bị cấm',
          ERROR_CODES.USER_BANNED,
        );
      }

      // Generate new tokens
      const payload: JwtPayload = {
        userId: user.id,
        username: user.username,
      };
      const { accessToken, refreshToken } =
        await this.jwtAuthService.generateTokenPair(payload);

      // Update refreshToken in database
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      // Transform to DTOs
      const userResponse = toResponseDto(UserResponseDto, user);
      const authResponse: AuthResponseDto = {
        user: userResponse,
        accessToken,
      };

      return {
        type: 'response',
        message: 'Làm mới token thành công',
        data: authResponse,
      };
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof ForbiddenException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        'Failed to refresh token',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Send email verification code
   * Generates OTP code, stores it in Redis, and sends it via email
   */
  async sendEmailVerification(
    userId: string,
    metadata?: RequestMetadata,
  ): Promise<
    IBeforeTransformResponseType<{
      message: string;
      code?: string;
      remainingCooldown?: number;
    }>
  > {
    try {
      // Get user to check email and verification status
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          isEmailVerified: true,
        },
      });

      if (!user) {
        throw new CustomUnauthorizedException(
          'User not found',
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if email is already verified
      if (user.isEmailVerified) {
        throw new BusinessException(
          'Email này đã được xác thực',
          ERROR_CODES.INVALID_OPERATION,
        );
      }

      // Check rate limit
      const isRateLimited = await this.checkRateLimit(userId);
      if (isRateLimited) {
        const remainingCooldown = await this.getRemainingCooldown(userId);
        // Log rate limited action
        await this.logEmailVerificationAction(
          userId,
          user.email,
          EmailVerificationAction.RATE_LIMITED,
          metadata,
        );
        throw new BusinessException(
          `Too many requests. Please try again in ${remainingCooldown} seconds`,
          ERROR_CODES.RATE_LIMIT_EXCEEDED,
          429,
          { remainingCooldown },
        );
      }

      // Generate OTP code
      const code = generateOTPCode();

      // Store code in Redis with TTL (this also invalidates any previous OTP)
      const redisKey = `email_verification:${userId}`;
      await this.redis.setex(redisKey, this.OTP_TTL, code);

      // Send email with OTP code
      try {
        await this.mailService.sendOtpEmail(user.email, {
          userName: user.firstName || 'User',
          otpCode: code,
          companyName: configData.MAIL_FROM_NAME || 'LingBeauty',
          expiresIn: '10 phút',
        });
      } catch (error) {
        // Remove OTP from Redis if email sending fails
        await this.redis.del(redisKey);
        throw new BusinessException(
          'Failed to send verification email',
          ERROR_CODES.MAIL_SEND_FAILED,
          500,
        );
      }

      // Increment rate limit counter after successful email send
      await this.incrementRateLimitCounter(userId);

      // Log successful OTP send
      await this.logEmailVerificationAction(
        userId,
        user.email,
        EmailVerificationAction.SEND_OTP,
        metadata,
      );

      return {
        type: 'response',
        message: 'Đã gửi mã xác thực đến email',
        data: {
          message: 'Đã gửi mã xác thực đến email của bạn',
          ...(configData.NODE_ENV === 'development' && { code }), // Only return code in dev mode
        },
      };
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        'Failed to send email verification',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Verify email with OTP code
   * Checks code in Redis and updates user email verification status
   */
  async verifyEmail(
    userId: string,
    verifyEmailDto: VerifyEmailDto,
    metadata?: RequestMetadata,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Get user
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          isEmailVerified: true,
        },
      });

      if (!user) {
        throw new CustomUnauthorizedException(
          'User not found',
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if already verified
      if (user.isEmailVerified) {
        throw new BusinessException(
          'Email này đã được xác thực',
          ERROR_CODES.INVALID_OPERATION,
        );
      }

      // Get code from Redis
      const redisKey = `email_verification:${userId}`;
      const storedCode = await this.redis.get(redisKey);

      if (!storedCode) {
        // Log failed verification - code expired
        await this.logEmailVerificationAction(
          userId,
          user.email,
          EmailVerificationAction.VERIFY_FAILED,
          { ...metadata, error: 'Code expired or not found' },
        );
        throw new CustomUnauthorizedException(
          'Verification code expired or not found',
          ERROR_CODES.INVALID_CREDENTIALS,
        );
      }

      // Verify code
      if (storedCode !== verifyEmailDto.code) {
        // Log failed verification - invalid code
        await this.logEmailVerificationAction(
          userId,
          user.email,
          EmailVerificationAction.VERIFY_FAILED,
          { ...metadata, error: 'Invalid verification code' },
        );
        throw new CustomUnauthorizedException(
          'Invalid verification code',
          ERROR_CODES.INVALID_CREDENTIALS,
        );
      }

      // Update user - mark email as verified
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          isEmailVerified: true,
          emailVerifiedAt: new Date(),
        },
      });

      // Delete code from Redis (one-time use)
      await this.redis.del(redisKey);

      // Log successful verification
      await this.logEmailVerificationAction(
        userId,
        user.email,
        EmailVerificationAction.VERIFY_SUCCESS,
        metadata,
      );

      return {
        type: 'response',
        message: 'Xác thực email thành công',
        data: {
          message: 'Email của bạn đã được xác thực thành công',
        },
      };
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        'Failed to verify email',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Resend email verification code
   * Invalidates previous OTP and generates a new one
   */
  async resendEmailVerification(
    userId: string,
    metadata?: RequestMetadata,
  ): Promise<
    IBeforeTransformResponseType<{
      message: string;
      code?: string;
      remainingCooldown?: number;
    }>
  > {
    try {
      // Get user email for logging
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { email: true },
      });

      // Call sendEmailVerification which handles all the logic
      const result = await this.sendEmailVerification(userId, metadata);

      // Log resend action (sendEmailVerification already logs SEND_OTP, but we want to track resends separately)
      if (user) {
        await this.logEmailVerificationAction(
          userId,
          user.email,
          EmailVerificationAction.RESEND_OTP,
          metadata,
        );
      }

      return result;
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        'Failed to resend email verification',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Send phone verification code
   * Generates OTP code, stores it in Redis, and sends it via SMS (placeholder)
   */
  async sendPhoneVerification(
    userId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string; code?: string }>> {
    try {
      // Get user to check phone and verification status
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          phone: true,
          isPhoneVerified: true,
        },
      });

      if (!user) {
        throw new CustomUnauthorizedException(
          'User not found',
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if phone is already verified
      if (user.isPhoneVerified) {
        throw new BusinessException(
          'Phone number is already verified',
          ERROR_CODES.INVALID_OPERATION,
        );
      }

      // Generate OTP code
      const code = generateOTPCode();

      // Store code in Redis with TTL
      const redisKey = `phone_verification:${userId}`;
      await this.redis.setex(redisKey, this.OTP_TTL, code);

      // TODO: Send SMS with code
      // In development mode, we can return the code for testing
      // In production, this should send an actual SMS
      if (configData.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`Phone verification code for ${user.phone}: ${code}`);
      }

      return {
        type: 'response',
        message: 'Đã gửi mã xác thực đến số điện thoại',
        data: {
          message: 'Đã gửi mã xác thực đến số điện thoại của bạn',
          ...(configData.NODE_ENV === 'development' && { code }), // Only return code in dev mode
        },
      };
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        'Failed to send phone verification',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Verify phone with OTP code
   * Checks code in Redis and updates user phone verification status
   */
  async verifyPhone(
    userId: string,
    verifyPhoneDto: VerifyPhoneDto,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Get user
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          phone: true,
          isPhoneVerified: true,
        },
      });

      if (!user) {
        throw new CustomUnauthorizedException(
          'Không tìm thấy người dùng',
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if already verified
      if (user.isPhoneVerified) {
        throw new BusinessException(
          'Số điện thoại này đã được xác thực',
          ERROR_CODES.INVALID_OPERATION,
        );
      }

      // Get code from Redis
      const redisKey = `phone_verification:${userId}`;
      const storedCode = await this.redis.get(redisKey);

      if (!storedCode) {
        throw new CustomUnauthorizedException(
          'Verification code expired or not found',
          ERROR_CODES.INVALID_CREDENTIALS,
        );
      }

      // Verify code
      if (storedCode !== verifyPhoneDto.code) {
        throw new CustomUnauthorizedException(
          'Invalid verification code',
          ERROR_CODES.INVALID_CREDENTIALS,
        );
      }

      // Update user - mark phone as verified
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          isPhoneVerified: true,
          phoneVerifiedAt: new Date(),
        },
      });

      // Delete code from Redis (one-time use)
      await this.redis.del(redisKey);

      return {
        type: 'response',
        message: 'Xác thực số điện thoại thành công',
        data: {
          message: 'Số điện thoại của bạn đã được xác thực thành công',
        },
        statusCode: 200,
      };
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        'Failed to verify phone',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Validate access token
   * Uses decoded token from JWT guard and returns user info with expiration
   */
  async validateToken(
    userId: string,
    exp?: string | number,
  ): Promise<IBeforeTransformResponseType<ValidateTokenResponseDto>> {
    try {
      // Get user data
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: userSelect,
      });

      if (!user) {
        throw new CustomUnauthorizedException(
          'User not found',
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      const userResponse = toResponseDto(UserResponseDto, user);

      // Calculate expiration time
      const expiresAt = exp ? new Date(Number(exp) * 1000) : undefined;

      return {
        type: 'response',
        message: 'Token hợp lệ',
        data: {
          valid: true,
          user: userResponse,
          expiresAt,
        },
      };
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        'Failed to validate token',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Change user password
   * Verifies current password, hashes new password, and updates in database
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Get user with password field
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          password: true,
          isDeleted: true,
          isBanned: true,
          isActive: true,
        },
      });

      if (!user) {
        throw new CustomUnauthorizedException(
          ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if user is deleted
      if (user.isDeleted) {
        throw new CustomUnauthorizedException(
          ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Check if user is banned
      if (user.isBanned || !user.isActive) {
        throw new ForbiddenException(
          ERROR_MESSAGES[ERROR_CODES.USER_BANNED],
          ERROR_CODES.USER_BANNED,
        );
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isCurrentPasswordValid) {
        throw new CustomUnauthorizedException(
          ERROR_MESSAGES[ERROR_CODES.INVALID_OLD_PASSWORD],
          ERROR_CODES.INVALID_OLD_PASSWORD,
        );
      }

      // Check if new password is same as current password
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PASSWORD_SAME_AS_CURRENT],
          ERROR_CODES.PASSWORD_SAME_AS_CURRENT,
        );
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(
        newPassword,
        configData.BCRYPT_SALT_ROUNDS,
      );

      // Update password in database
      await this.prismaService.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return {
        type: 'response',
        message: 'Đổi mật khẩu thành công',
        data: {
          message: 'Mật khẩu của bạn đã được đổi thành công',
        },
      };
    } catch (error) {
      if (
        error instanceof CustomUnauthorizedException ||
        error instanceof ForbiddenException ||
        error instanceof BusinessException
      ) {
        throw error;
      }

      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
