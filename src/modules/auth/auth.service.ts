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
import { mediaSelect } from 'src/libs/prisma/media-select';

@Injectable()
export class AuthService {
  private readonly redis: Redis;
  private readonly OTP_TTL = 600; // 10 minutes in seconds

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getOrThrow();
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
      message: 'User retrieved successfully',
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
      message: 'User retrieved successfully',
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
        'Email address is already registered',
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
        'Phone number is already registered',
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
        'Username is already taken',
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
      message: 'User registered successfully',
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
        'User not found or has been deleted',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    // Check if user is banned
    if (user.isBanned || !user.isActive) {
      throw new ForbiddenException(
        'User has been banned',
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
      message: 'Login successful',
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
    let decodedPayload: JwtPayload;

    try {
      // Verify refresh token
      decodedPayload = await this.jwtAuthService.verifyToken<JwtPayload>(
        refreshTokenDto.accessToken,
        {
          ignoreExpiration: true,
        },
      );
    } catch (error) {
      throw new CustomUnauthorizedException(
        'Invalid refresh token',
        ERROR_CODES.INVALID_REFRESH_TOKEN,
      );
    }

    // Find user by userId from token payload
    const user = await this.prismaService.user.findUnique({
      where: { id: decodedPayload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        username: true,
        refreshToken: true,
        isActive: true,
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
      throw new CustomUnauthorizedException(
        'User not found',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    // Check if user is deleted
    if (user.isDeleted) {
      throw new CustomUnauthorizedException(
        'User not found or has been deleted',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    // Check if user is banned
    if (user.isBanned || !user.isActive) {
      throw new ForbiddenException(
        'User has been banned',
        ERROR_CODES.USER_BANNED,
      );
    }

    // Verify refreshToken matches the one in database
    // if (user.refreshToken !== refreshTokenDto.accessToken) {
    //   throw new CustomUnauthorizedException(
    //     'Invalid refresh token',
    //     ERROR_CODES.INVALID_REFRESH_TOKEN,
    //   );
    // }

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
      message: 'Token refreshed successfully',
      data: authResponse,
    };
  }

  /**
   * Send email verification code
   * Generates OTP code, stores it in Redis, and sends it via email (placeholder)
   */
  async sendEmailVerification(
    userId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string; code?: string }>> {
    // Get user to check email and verification status
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

    // Check if email is already verified
    if (user.isEmailVerified) {
      throw new BusinessException(
        'Email is already verified',
        ERROR_CODES.INVALID_OPERATION,
      );
    }

    // Generate OTP code
    const code = generateOTPCode();

    // Store code in Redis with TTL
    const redisKey = `email_verification:${userId}`;
    await this.redis.setex(redisKey, this.OTP_TTL, code);

    // TODO: Send email with code
    // In development mode, we can return the code for testing
    // In production, this should send an actual email
    if (configData.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`Email verification code for ${user.email}: ${code}`);
    }

    return {
      type: 'response',
      message: 'Verification code sent to email',
      data: {
        message: 'Verification code has been sent to your email',
        ...(configData.NODE_ENV === 'development' && { code }), // Only return code in dev mode
      },
    };
  }

  /**
   * Verify email with OTP code
   * Checks code in Redis and updates user email verification status
   */
  async verifyEmail(
    userId: string,
    verifyEmailDto: VerifyEmailDto,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
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
        'Email is already verified',
        ERROR_CODES.INVALID_OPERATION,
      );
    }

    // Get code from Redis
    const redisKey = `email_verification:${userId}`;
    const storedCode = await this.redis.get(redisKey);

    if (!storedCode) {
      throw new CustomUnauthorizedException(
        'Verification code expired or not found',
        ERROR_CODES.INVALID_CREDENTIALS,
      );
    }

    // Verify code
    if (storedCode !== verifyEmailDto.code) {
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

    return {
      type: 'response',
      message: 'Email verified successfully',
      data: {
        message: 'Your email has been verified successfully',
      },
    };
  }

  /**
   * Send phone verification code
   * Generates OTP code, stores it in Redis, and sends it via SMS (placeholder)
   */
  async sendPhoneVerification(
    userId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string; code?: string }>> {
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
      message: 'Verification code sent to phone',
      data: {
        message: 'Verification code has been sent to your phone',
        ...(configData.NODE_ENV === 'development' && { code }), // Only return code in dev mode
      },
    };
  }

  /**
   * Verify phone with OTP code
   * Checks code in Redis and updates user phone verification status
   */
  async verifyPhone(
    userId: string,
    verifyPhoneDto: VerifyPhoneDto,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
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
        'User not found',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    // Check if already verified
    if (user.isPhoneVerified) {
      throw new BusinessException(
        'Phone number is already verified',
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
      message: 'Phone verified successfully',
      data: {
        message: 'Your phone number has been verified successfully',
      },
      statusCode: 200,
    };
  }
}
