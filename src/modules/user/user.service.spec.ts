import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { StatsService } from '../stats/stats.service';
import { BusinessException } from '../../exceptions/business.exception';
import { ERROR_CODES } from '../../constants/error-codes';
import {
  withoutDeleted,
  softDeleteData,
} from '../../libs/prisma/soft-delete.helpers';
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
    USER_ROLE_ID: 'default-user-role-id',
  },
}));

// Mock utils
jest.mock('../../libs/utils/utils', () => ({
  processDataObject: jest.fn((data) => Promise.resolve(data)),
}));

describe('UserService - Soft Delete Implementation', () => {
  let service: UserService;
  let prismaService: jest.Mocked<PrismaService>;
  let storageService: jest.Mocked<StorageService>;
  let statsService: jest.Mocked<StatsService>;

  const mockUser = {
    id: 'user-id-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    username: 'johndoe',
    password: 'hashedPassword123',
    isActive: true,
    isBanned: false,
    isDeleted: false,
    isEmailVerified: true,
    isPhoneVerified: true,
    emailVerifiedAt: new Date(),
    phoneVerifiedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    avatar: null,
    roleAssignments: [],
  };

  const mockDeletedUser = {
    ...mockUser,
    id: 'deleted-user-id',
    email: 'deleted@example.com',
    isDeleted: true,
    deletedAt: new Date(),
  };

  const mockUserRole = {
    id: 'role-id-123',
    name: 'CLIENT',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  };

  const mockDeletedRole = {
    ...mockUserRole,
    id: 'deleted-role-id',
    isDeleted: true,
    deletedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
              findUnique: jest.fn(),
            },
            address: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
            },
            userRole: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
            userRoleAssignment: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
              findMany: jest.fn(),
            },
            userAvatar: {
              upsert: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useValue: {
            uploadFile: jest.fn(),
          },
        },
        {
          provide: StatsService,
          useValue: {
            onUserCreated: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService) as jest.Mocked<PrismaService>;
    storageService = module.get(StorageService) as jest.Mocked<StorageService>;
    statsService = module.get(StatsService) as jest.Mocked<StatsService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Task 1.1: getAllUsers() - Query Filtering', () => {
    it('should filter out soft-deleted users using withoutDeleted()', async () => {
      const mockUsers = [mockUser];
      (prismaService.user.count as jest.Mock).mockResolvedValue(1);
      (prismaService.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      await service.getAllUsers({ page: 1, limit: 10 });

      expect(prismaService.user.count).toHaveBeenCalledWith({
        where: expect.objectContaining({ isDeleted: false }),
      });
      expect(prismaService.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isDeleted: false }),
        }),
      );
    });

    it('should not return soft-deleted users in results', async () => {
      (prismaService.user.count as jest.Mock).mockResolvedValue(1);
      (prismaService.user.findMany as jest.Mock).mockResolvedValue([mockUser]);

      const result = await service.getAllUsers({ page: 1, limit: 10 });

      expect(result.data.items).toHaveLength(1);
      // isDeleted field should not be exposed in API response (backward compatibility)
      expect(result.data.items[0].isDeleted).toBeUndefined();
    });

    it('should apply withoutDeleted() with search filters', async () => {
      (prismaService.user.count as jest.Mock).mockResolvedValue(0);
      (prismaService.user.findMany as jest.Mock).mockResolvedValue([]);

      await service.getAllUsers({ page: 1, limit: 10, search: 'john' });

      expect(prismaService.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            isDeleted: false,
            OR: expect.any(Array),
          }),
        }),
      );
    });
  });

  describe('Task 1.2: getUserById() - findFirst with isDeleted filter', () => {
    it('should use findFirst instead of findUnique', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

      await service.getUserById('user-id-123');

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'user-id-123' }),
        select: expect.any(Object),
      });
    });

    it('should throw USER_NOT_FOUND when user is soft-deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getUserById('deleted-user-id')).rejects.toThrow(
        BusinessException,
      );
    });

    it('should return user when user exists and is not deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUserById('user-id-123');

      expect(result.data).toBeDefined();
      expect(result.message).toBe('Lấy thông tin người dùng thành công');
    });
  });

  describe('Task 1.3: updateBanStatus() - Filter deleted users', () => {
    it('should verify user exists and is not deleted before updating', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        isBanned: true,
      });

      await service.updateBanStatus('user-id-123', true);

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'user-id-123' }),
      });
    });

    it('should throw USER_NOT_FOUND when trying to ban deleted user', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.updateBanStatus('deleted-user-id', true),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('Task 1.4: updateBanStatusBulk() - Filter deleted users', () => {
    it('should filter deleted users in bulk ban operation', async () => {
      (prismaService.user.updateMany as jest.Mock).mockResolvedValue({
        count: 2,
      });

      const items = [
        { userId: 'user-1', isBanned: true },
        { userId: 'user-2', isBanned: true },
      ];

      await service.updateBanStatusBulk(items);

      expect(prismaService.user.updateMany).toHaveBeenCalledWith({
        where: withoutDeleted({ id: { in: ['user-1', 'user-2'] } }),
        data: { isBanned: true },
      });
    });

    it('should handle mixed ban/unban operations', async () => {
      (prismaService.user.updateMany as jest.Mock)
        .mockResolvedValueOnce({ count: 1 })
        .mockResolvedValueOnce({ count: 1 });

      const items = [
        { userId: 'user-1', isBanned: true },
        { userId: 'user-2', isBanned: false },
      ];

      const result = await service.updateBanStatusBulk(items);

      expect(result.data.updatedCount).toBe(2);
    });
  });

  describe('Task 1.5: updateAvatar() - Filter deleted users', () => {
    it('should verify user exists before updating avatar', async () => {
      const mockFile = {
        originalname: 'avatar.jpg',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const mockMedia = { id: 'media-id-123' };
      (storageService.uploadFile as jest.Mock).mockResolvedValue(mockMedia);
      (prismaService.userAvatar.upsert as jest.Mock).mockResolvedValue({});
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

      await service.updateAvatar('user-id-123', mockFile);

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'user-id-123' }),
        select: expect.any(Object),
      });
    });
  });

  describe('Task 1.6: updateMe() - Validation queries filter deleted users', () => {
    it('should verify current user is not deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.user.update as jest.Mock).mockResolvedValue(mockUser);

      await service.updateMe('user-id-123', { firstName: 'Jane' });

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'user-id-123' }),
      });
    });

    it('should exclude deleted users from email uniqueness check', async () => {
      (prismaService.user.findFirst as jest.Mock)
        .mockResolvedValueOnce(mockUser) // Current user
        .mockResolvedValueOnce(null); // Email check
      (prismaService.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        email: 'newemail@example.com',
      });

      await service.updateMe('user-id-123', {
        email: 'newemail@example.com',
      });

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ email: 'newemail@example.com' }),
      });
    });

    it('should allow reusing email from deleted user', async () => {
      (prismaService.user.findFirst as jest.Mock)
        .mockResolvedValueOnce(mockUser) // Current user
        .mockResolvedValueOnce(null); // Email check (deleted user not found)
      (prismaService.user.update as jest.Mock).mockResolvedValue({
        ...mockUser,
        email: 'deleted@example.com',
      });

      const result = await service.updateMe('user-id-123', {
        email: 'deleted@example.com',
      });

      expect(result.data.email).toBe('deleted@example.com');
    });
  });

  describe('Task 1.7: updateUserById() - Validation queries filter deleted users', () => {
    it('should verify target user exists and is not deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.user.update as jest.Mock).mockResolvedValue(mockUser);

      await service.updateUserById({
        targetUserId: 'user-id-123',
        updateDto: { firstName: 'Jane' },
      });

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'user-id-123' }),
      });
    });

    it('should validate roleIds are not deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.userRole.findMany as jest.Mock).mockResolvedValue([
        mockUserRole,
      ]);
      (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
        cb(prismaService),
      );
      (prismaService.user.update as jest.Mock).mockResolvedValue(mockUser);
      (
        prismaService.userRoleAssignment.deleteMany as jest.Mock
      ).mockResolvedValue({ count: 0 });
      (
        prismaService.userRoleAssignment.createMany as jest.Mock
      ).mockResolvedValue({ count: 1 });
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await service.updateUserById({
        targetUserId: 'user-id-123',
        updateDto: { roleIds: ['role-id-123'] },
      });

      expect(prismaService.userRole.findMany).toHaveBeenCalledWith({
        where: withoutDeleted({ id: { in: ['role-id-123'] } }),
        select: { id: true },
      });
    });

    it('should throw error when roleId is deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.userRole.findMany as jest.Mock).mockResolvedValue([]); // No active roles found

      await expect(
        service.updateUserById({
          targetUserId: 'user-id-123',
          updateDto: { roleIds: ['deleted-role-id'] },
        }),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('Task 1.8: createUserByAdmin() - Validation queries filter deleted users', () => {
    it('should exclude deleted users from email uniqueness check', async () => {
      (prismaService.user.findFirst as jest.Mock)
        .mockResolvedValueOnce(null) // Email check
        .mockResolvedValueOnce(null) // Phone check
        .mockResolvedValueOnce(null); // Username check
      (prismaService.userRole.findFirst as jest.Mock).mockResolvedValue(
        mockUserRole,
      );
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

      await service.createUserByAdmin({
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'New',
        lastName: 'User',
        phone: '+1234567890',
        username: 'newuser',
        roleId: 'role-id-123',
      });

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ email: 'newuser@example.com' }),
        select: { id: true },
      });
    });

    it('should validate roleId is not deleted', async () => {
      (prismaService.user.findFirst as jest.Mock)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      (prismaService.userRole.findFirst as jest.Mock).mockResolvedValue(
        mockUserRole,
      );
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

      await service.createUserByAdmin({
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'New',
        lastName: 'User',
        phone: '+1234567890',
        username: 'newuser',
        roleId: 'role-id-123',
      });

      expect(prismaService.userRole.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'role-id-123' }),
        select: { id: true },
      });
    });

    it('should throw error when roleId is deleted', async () => {
      (prismaService.user.findFirst as jest.Mock)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      (prismaService.userRole.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.createUserByAdmin({
          email: 'newuser@example.com',
          password: 'password123',
          firstName: 'New',
          lastName: 'User',
          phone: '+1234567890',
          username: 'newuser',
          roleId: 'deleted-role-id',
        }),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('Task 1.9: assignRolesToUser() - Filter deleted users and roles', () => {
    it('should verify user exists and is not deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.userRole.findMany as jest.Mock).mockResolvedValue([
        mockUserRole,
      ]);
      (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
        cb(prismaService),
      );
      (
        prismaService.userRoleAssignment.deleteMany as jest.Mock
      ).mockResolvedValue({ count: 0 });
      (
        prismaService.userRoleAssignment.createMany as jest.Mock
      ).mockResolvedValue({ count: 1 });
      (
        prismaService.userRoleAssignment.findMany as jest.Mock
      ).mockResolvedValue([]);

      await service.assignRolesToUser('user-id-123', {
        roleIds: ['role-id-123'],
      });

      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: withoutDeleted({ id: 'user-id-123' }),
        select: { id: true },
      });
    });

    it('should verify all roleIds are not deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.userRole.findMany as jest.Mock).mockResolvedValue([
        mockUserRole,
      ]);
      (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
        cb(prismaService),
      );
      (
        prismaService.userRoleAssignment.deleteMany as jest.Mock
      ).mockResolvedValue({ count: 0 });
      (
        prismaService.userRoleAssignment.createMany as jest.Mock
      ).mockResolvedValue({ count: 1 });
      (
        prismaService.userRoleAssignment.findMany as jest.Mock
      ).mockResolvedValue([]);

      await service.assignRolesToUser('user-id-123', {
        roleIds: ['role-id-123'],
      });

      expect(prismaService.userRole.findMany).toHaveBeenCalledWith({
        where: withoutDeleted({ id: { in: ['role-id-123'] } }),
        select: { id: true },
      });
    });

    it('should throw error when any roleId is deleted', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.userRole.findMany as jest.Mock).mockResolvedValue([]); // No active roles

      await expect(
        service.assignRolesToUser('user-id-123', {
          roleIds: ['deleted-role-id'],
        }),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('Address Operations - Soft Delete', () => {
    const mockAddress = {
      id: 'address-id-123',
      userId: 'user-id-123',
      fullName: 'John Doe',
      phone: '+1234567890',
      addressLine1: '123 Main St',
      addressLine2: null,
      city: 'New York',
      province: 'NY',
      postalCode: '10001',
      country: 'Vietnam',
      isDefault: false,
      isDeleted: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should filter deleted addresses in getAddressesByUserId()', async () => {
      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prismaService.address.count as jest.Mock).mockResolvedValue(1);
      (prismaService.address.findMany as jest.Mock).mockResolvedValue([
        mockAddress,
      ]);

      await service.getAddressesByUserId({
        targetUserId: 'user-id-123',
        limit: 10,
        page: 1,
        search: '',
      });

      expect(prismaService.address.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isDeleted: false }),
        }),
      );
    });

    it('should soft delete address using softDeleteData()', async () => {
      (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
        mockAddress,
      );
      (prismaService.address.update as jest.Mock).mockResolvedValue({
        ...mockAddress,
        isDeleted: true,
        deletedAt: new Date(),
      });

      await service.deleteAddressById({
        userId: 'user-id-123',
        addressId: 'address-id-123',
      });

      expect(prismaService.address.update).toHaveBeenCalledWith({
        where: { id: 'address-id-123' },
        data: expect.objectContaining({
          isDeleted: true,
          deletedAt: expect.any(Date),
        }),
      });
    });

    it('should throw error when trying to delete already deleted address', async () => {
      (prismaService.address.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.deleteAddressById({
          userId: 'user-id-123',
          addressId: 'deleted-address-id',
        }),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('getAllUserRoles() - Filter deleted roles', () => {
    it('should filter out soft-deleted roles', async () => {
      (prismaService.userRole.findMany as jest.Mock).mockResolvedValue([
        mockUserRole,
      ]);

      await service.getAllUserRoles();

      expect(prismaService.userRole.findMany).toHaveBeenCalledWith({
        where: withoutDeleted(),
        select: expect.any(Object),
        orderBy: { createdAt: 'asc' },
      });
    });
  });
});
