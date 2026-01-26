import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { JwtAuthService } from '../jwt/jwt.service';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { MailService } from '../mail/mail.service';
import {
  ConflictException,
  CustomUnauthorizedException,
  ForbiddenException,
  BusinessException,
} from '../../exceptions/business.exception';
import { ERROR_CODES } from '../../constants/error-codes';
import * as bcrypt from 'bcryptjs';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Mock configuration
jest.mock('../../configs/configuration', () => ({
  configData: {
    BCRYPT_SALT_ROUNDS: 10,
    USER_ROLE_ID: 'user-role-id',
    NODE_ENV: 'test',
  },
}));

// Mock utils
jest.mock('../../libs/utils/utils', () => ({
  generateOTPCode: jest.fn(() => '123456'),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: jest.Mocked<PrismaService>;
  let jwtAuthService: jest.Mocked<JwtAuthService>;
  let mockRedis: {
    get: jest.Mock;
    setex: jest.Mock;
    del: jest.Mock;
    incr: jest.Mock;
    ttl: jest.Mock;
  };

  const mockUser = {
    id: 'user-id-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    username: 'johndoe',
    password: 'hashedPassword123',
    refreshToken: 'old-refresh-token',
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

  const mockTokenPair = {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  };

  beforeEach(async () => {
    mockRedis = {
      get: jest.fn(),
      setex: jest.fn(),
      del: jest.fn(),
      incr: jest.fn(),
      ttl: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: JwtAuthService,
          useValue: {
            generateTokenPair: jest.fn(),
            verifyToken: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            getOrThrow: jest.fn(() => mockRedis),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendOtpEmail: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get(PrismaService);
    jwtAuthService = module.get(JwtAuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserByEmail', () => {
    it('should return user when found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUserByEmail('test@example.com');

      expect(result.type).toBe('response');
      expect(result.message).toBe('User retrieved successfully');
      expect(result.data.email).toBe(mockUser.email);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.getUserByEmail('notfound@example.com'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUserById('user-id-123');

      expect(result.type).toBe('response');
      expect(result.data.id).toBe(mockUser.id);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getUserById('invalid-id')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    const registerDto = {
      email: 'newuser@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '+0987654321',
      username: 'janedoe',
    };

    it('should register a new user successfully', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prismaService.user.create as jest.Mock).mockResolvedValue({
        ...mockUser,
        ...registerDto,
        password: 'hashedPassword',
      });
      (jwtAuthService.generateTokenPair as jest.Mock).mockResolvedValue(
        mockTokenPair,
      );
      (prismaService.user.update as jest.Mock).mockResolvedValue({});

      const result = await service.register(registerDto);

      expect(result.type).toBe('response');
      expect(result.message).toBe('User registered successfully');
      expect(result.data.accessToken).toBe(mockTokenPair.accessToken);
      expect(result.data.user.email).toBe(registerDto.email);
    });

    it('should throw ConflictException when email already exists', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'existing-id',
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException when phone already exists', async () => {
      (prismaService.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // email check
        .mockResolvedValueOnce({ id: 'existing-id' }); // phone check

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException when username already exists', async () => {
      (prismaService.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // email check
        .mockResolvedValueOnce(null) // phone check
        .mockResolvedValueOnce({ id: 'existing-id' }); // username check

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should login successfully with valid credentials', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwtAuthService.generateTokenPair as jest.Mock).mockResolvedValue(
        mockTokenPair,
      );
      (prismaService.user.update as jest.Mock).mockResolvedValue({});

      const result = await service.login(loginDto);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Login successful');
      expect(result.data.accessToken).toBe(mockTokenPair.accessToken);
    });

    it('should throw CustomUnauthorizedException when user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        CustomUnauthorizedException,
      );
    });

    it('should throw CustomUnauthorizedException when password is invalid', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        CustomUnauthorizedException,
      );
    });

    it('should throw CustomUnauthorizedException when user is deleted', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isDeleted: true,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.login(loginDto)).rejects.toThrow(
        CustomUnauthorizedException,
      );
    });

    it('should throw ForbiddenException when user is banned', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isBanned: true,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.login(loginDto)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException when user is inactive', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isActive: false,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.login(loginDto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('refreshToken', () => {
    const refreshTokenDto = {
      accessToken: 'old-access-token',
    };

    it('should refresh token successfully', async () => {
      (jwtAuthService.verifyToken as jest.Mock).mockResolvedValue({
        userId: mockUser.id,
        username: mockUser.username,
      });
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (jwtAuthService.generateTokenPair as jest.Mock).mockResolvedValue(
        mockTokenPair,
      );
      (prismaService.user.update as jest.Mock).mockResolvedValue({});

      const result = await service.refreshToken(refreshTokenDto);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Token refreshed successfully');
      expect(result.data.accessToken).toBe(mockTokenPair.accessToken);
    });

    it('should throw CustomUnauthorizedException when token is invalid', async () => {
      (jwtAuthService.verifyToken as jest.Mock).mockRejectedValue(
        new Error('Invalid token'),
      );

      await expect(service.refreshToken(refreshTokenDto)).rejects.toThrow(
        CustomUnauthorizedException,
      );
    });

    it('should throw CustomUnauthorizedException when user not found', async () => {
      (jwtAuthService.verifyToken as jest.Mock).mockResolvedValue({
        userId: 'invalid-id',
        username: 'test',
      });
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.refreshToken(refreshTokenDto)).rejects.toThrow(
        CustomUnauthorizedException,
      );
    });

    it('should throw ForbiddenException when user is banned', async () => {
      (jwtAuthService.verifyToken as jest.Mock).mockResolvedValue({
        userId: mockUser.id,
        username: mockUser.username,
      });
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isBanned: true,
      });

      await expect(service.refreshToken(refreshTokenDto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('sendEmailVerification', () => {
    it('should send email verification code successfully', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isEmailVerified: false,
      });

      const result = await service.sendEmailVerification(mockUser.id);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Verification code sent to email');
      expect(mockRedis.setex).toHaveBeenCalled();
    });

    it('should throw CustomUnauthorizedException when user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.sendEmailVerification('invalid-id')).rejects.toThrow(
        CustomUnauthorizedException,
      );
    });

    it('should throw BusinessException when email is already verified', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isEmailVerified: true,
      });

      await expect(service.sendEmailVerification(mockUser.id)).rejects.toThrow(
        BusinessException,
      );
    });
  });

  describe('verifyEmail', () => {
    const verifyEmailDto = { code: '123456' };

    it('should verify email successfully', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isEmailVerified: false,
      });
      mockRedis.get.mockResolvedValue('123456');
      (prismaService.user.update as jest.Mock).mockResolvedValue({});

      const result = await service.verifyEmail(mockUser.id, verifyEmailDto);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Email verified successfully');
      expect(mockRedis.del).toHaveBeenCalled();
    });

    it('should throw CustomUnauthorizedException when code expired', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isEmailVerified: false,
      });
      mockRedis.get.mockResolvedValue(null);

      await expect(
        service.verifyEmail(mockUser.id, verifyEmailDto),
      ).rejects.toThrow(CustomUnauthorizedException);
    });

    it('should throw CustomUnauthorizedException when code is invalid', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isEmailVerified: false,
      });
      mockRedis.get.mockResolvedValue('654321');

      await expect(
        service.verifyEmail(mockUser.id, verifyEmailDto),
      ).rejects.toThrow(CustomUnauthorizedException);
    });

    it('should throw BusinessException when email is already verified', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isEmailVerified: true,
      });

      await expect(
        service.verifyEmail(mockUser.id, verifyEmailDto),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('sendPhoneVerification', () => {
    it('should send phone verification code successfully', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isPhoneVerified: false,
      });

      const result = await service.sendPhoneVerification(mockUser.id);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Verification code sent to phone');
      expect(mockRedis.setex).toHaveBeenCalled();
    });

    it('should throw BusinessException when phone is already verified', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isPhoneVerified: true,
      });

      await expect(service.sendPhoneVerification(mockUser.id)).rejects.toThrow(
        BusinessException,
      );
    });
  });

  describe('verifyPhone', () => {
    const verifyPhoneDto = { code: '123456' };

    it('should verify phone successfully', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isPhoneVerified: false,
      });
      mockRedis.get.mockResolvedValue('123456');
      (prismaService.user.update as jest.Mock).mockResolvedValue({});

      const result = await service.verifyPhone(mockUser.id, verifyPhoneDto);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Phone verified successfully');
      expect(mockRedis.del).toHaveBeenCalled();
    });

    it('should throw CustomUnauthorizedException when code is invalid', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        isPhoneVerified: false,
      });
      mockRedis.get.mockResolvedValue('654321');

      await expect(
        service.verifyPhone(mockUser.id, verifyPhoneDto),
      ).rejects.toThrow(CustomUnauthorizedException);
    });
  });

  describe('validateToken', () => {
    it('should validate token and return user info', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.validateToken(mockUser.id, 1735689600);

      expect(result.type).toBe('response');
      expect(result.message).toBe('Token is valid');
      expect(result.data.valid).toBe(true);
      expect(result.data.user?.id).toBe(mockUser.id);
      expect(result.data.expiresAt).toBeInstanceOf(Date);
    });

    it('should throw CustomUnauthorizedException when user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.validateToken('invalid-id')).rejects.toThrow(
        CustomUnauthorizedException,
      );
    });
  });
});
