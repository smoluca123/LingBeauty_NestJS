import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { IDecodedAccecssTokenType } from '../../libs/types/interfaces/utils.interfaces';
import { AuthGuard } from '@nestjs/passport';
import { JwtTokenVerifyGuard } from '../../guards/jwt-token-verify.guard';

// Mock guards to bypass authentication in tests
const mockGuard = { canActivate: jest.fn(() => true) };

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockUser = {
    id: 'user-id-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    username: 'johndoe',
    password: 'hashedPassword',
    avatarMediaId: 'avatar-id',
    isActive: true,
    isVerified: false,
    isBanned: false,
    isDeleted: false,
    isEmailVerified: false,
    isPhoneVerified: false,
    emailVerifiedAt: null,
    phoneVerifiedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAuthResponse = {
    type: 'response' as const,
    message: 'Success',
    data: {
      user: mockUser,
      accessToken: 'mock-access-token',
    },
  };

  const mockDecodedToken: IDecodedAccecssTokenType = {
    userId: 'user-id-123',
    username: 'johndoe',
    originalToken: 'mock-original-token',
    key: 'mock-key',
    exp: 1735689600,
    iat: 1735603200,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            refreshToken: jest.fn(),
            sendEmailVerification: jest.fn(),
            verifyEmail: jest.fn(),
            sendPhoneVerification: jest.fn(),
            verifyPhone: jest.fn(),
            validateToken: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockGuard)
      .overrideGuard(JwtTokenVerifyGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '+0987654321',
        username: 'janedoe',
      };

      authService.register.mockResolvedValue({
        ...mockAuthResponse,
        message: 'User registered successfully',
      });

      const result = await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result.message).toBe('User registered successfully');
      expect(result.data.accessToken).toBeDefined();
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      authService.login.mockResolvedValue({
        ...mockAuthResponse,
        message: 'Login successful',
      });

      const result = await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result.message).toBe('Login successful');
      expect(result.data.accessToken).toBeDefined();
    });
  });

  describe('refreshToken', () => {
    it('should refresh access token', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        accessToken: 'old-access-token',
      };

      authService.refreshToken.mockResolvedValue({
        ...mockAuthResponse,
        message: 'Token refreshed successfully',
      });

      const result = await controller.refreshToken(refreshTokenDto);

      expect(authService.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
      expect(result.message).toBe('Token refreshed successfully');
    });
  });

  describe('sendEmailVerification', () => {
    it('should send email verification code', async () => {
      authService.sendEmailVerification.mockResolvedValue({
        type: 'response',
        message: 'Verification code sent to email',
        data: { message: 'Verification code has been sent to your email' },
      });

      const result = await controller.sendEmailVerification(mockDecodedToken);

      expect(authService.sendEmailVerification).toHaveBeenCalledWith(
        mockDecodedToken.userId,
      );
      expect(result.message).toBe('Verification code sent to email');
    });
  });

  describe('verifyEmail', () => {
    it('should verify email with valid code', async () => {
      const verifyEmailDto: VerifyEmailDto = { code: '123456' };

      authService.verifyEmail.mockResolvedValue({
        type: 'response',
        message: 'Email verified successfully',
        data: { message: 'Your email has been verified successfully' },
      });

      const result = await controller.verifyEmail(
        mockDecodedToken,
        verifyEmailDto,
      );

      expect(authService.verifyEmail).toHaveBeenCalledWith(
        mockDecodedToken.userId,
        verifyEmailDto,
      );
      expect(result.message).toBe('Email verified successfully');
    });
  });

  describe('sendPhoneVerification', () => {
    it('should send phone verification code', async () => {
      authService.sendPhoneVerification.mockResolvedValue({
        type: 'response',
        message: 'Verification code sent to phone',
        data: { message: 'Verification code has been sent to your phone' },
      });

      const result = await controller.sendPhoneVerification(mockDecodedToken);

      expect(authService.sendPhoneVerification).toHaveBeenCalledWith(
        mockDecodedToken.userId,
      );
      expect(result.message).toBe('Verification code sent to phone');
    });
  });

  describe('verifyPhone', () => {
    it('should verify phone with valid code', async () => {
      const verifyPhoneDto: VerifyPhoneDto = { code: '123456' };

      authService.verifyPhone.mockResolvedValue({
        type: 'response',
        message: 'Phone verified successfully',
        data: { message: 'Your phone number has been verified successfully' },
        statusCode: 200,
      });

      const result = await controller.verifyPhone(
        mockDecodedToken,
        verifyPhoneDto,
      );

      expect(authService.verifyPhone).toHaveBeenCalledWith(
        mockDecodedToken.userId,
        verifyPhoneDto,
      );
      expect(result.message).toBe('Phone verified successfully');
    });
  });

  describe('validateToken', () => {
    it('should validate token and return user info', async () => {
      authService.validateToken.mockResolvedValue({
        type: 'response',
        message: 'Token is valid',
        data: {
          valid: true,
          user: mockUser as any,
          expiresAt: new Date(Number(mockDecodedToken.exp) * 1000),
        },
      });

      const result = await controller.validateToken(mockDecodedToken);

      expect(authService.validateToken).toHaveBeenCalledWith(
        mockDecodedToken.userId,
        mockDecodedToken.exp,
      );
      expect(result.message).toBe('Token is valid');
      expect(result.data.valid).toBe(true);
    });
  });
});
