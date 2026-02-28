import { Injectable } from '@nestjs/common';
import { MediaType, Prisma } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import { userSelect } from 'src/libs/prisma/user-select';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';
import { StorageService } from 'src/modules/storage/storage.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserByAdminDto } from './dto/update-user-admin.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressResponseDto } from './dto/address-response.dto';
import { processDataObject } from 'src/libs/utils/utils';
import { addressSelect } from 'src/libs/prisma/address-select';
import { BanUserBulkItemDto, BanUserBulkResultDto } from './dto/ban-user.dto';
import { userRoleSelect } from 'src/libs/prisma/user-select';
import { UserRoleResponseDto } from './dto/response/user-role-response.dto';
import { CreateUserByAdminDto } from './dto/create-user-admin.dto';
import * as bcrypt from 'bcryptjs';
import { configData } from 'src/configs/configuration';
import { StatsService } from 'src/modules/stats/stats.service';

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  isBanned?: boolean;
  isVerified?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'email' | 'firstName' | 'lastName';
  order?: 'asc' | 'desc';
}

@Injectable()
export class UserService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
    private readonly statsService: StatsService,
  ) {}

  async getAllUsers({
    page = 1,
    limit = 10,
    search,
    isActive,
    isBanned,
    isVerified,
    sortBy = 'createdAt',
    order = 'desc',
  }: GetUsersParams): Promise<
    IBeforeTransformPaginationResponseType<UserResponseDto>
  > {
    try {
      const whereQuery: Prisma.UserWhereInput = {
        ...(search && {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { username: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(isActive !== undefined && { isActive }),
        ...(isBanned !== undefined && { isBanned }),
        ...(isVerified !== undefined && { isVerified }),
      };

      const [totalCount, users] = await Promise.all([
        this.prismaService.user.count({ where: whereQuery }),
        this.prismaService.user.findMany({
          where: whereQuery,
          select: userSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const userResponses = users.map((user) =>
        toResponseDto(UserResponseDto, user),
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách người dùng thành công',
        data: {
          items: userResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getUserById(
    userId: string,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: userSelect,
    });

    if (!user) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    const userResponse = toResponseDto(UserResponseDto, user);

    return {
      type: 'response',
      message: 'Lấy thông tin người dùng thành công',
      data: userResponse,
    };
  }

  async updateBanStatus(
    userId: string,
    isBanned: boolean,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    // Verify user exists before updating
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: { isBanned },
      select: userSelect,
    });

    const userResponse = toResponseDto(UserResponseDto, updatedUser);

    return {
      type: 'response',
      message: isBanned
        ? 'Khóa tài khoản người dùng thành công'
        : 'Mở khóa tài khoản người dùng thành công',
      data: userResponse,
    };
  }

  async updateBanStatusBulk(
    items: BanUserBulkItemDto[],
  ): Promise<IBeforeTransformResponseType<BanUserBulkResultDto>> {
    try {
      // Group items by isBanned value to minimize DB round trips
      const toBan = items
        .filter((item) => item.isBanned)
        .map((item) => item.userId);
      const toUnban = items
        .filter((item) => !item.isBanned)
        .map((item) => item.userId);

      const updates: Promise<{ count: number }>[] = [];

      if (toBan.length > 0) {
        updates.push(
          this.prismaService.user.updateMany({
            where: { id: { in: toBan } },
            data: { isBanned: true },
          }),
        );
      }

      if (toUnban.length > 0) {
        updates.push(
          this.prismaService.user.updateMany({
            where: { id: { in: toUnban } },
            data: { isBanned: false },
          }),
        );
      }

      const results = await Promise.all(updates);
      const updatedCount = results.reduce((sum, r) => sum + r.count, 0);

      return {
        type: 'response',
        message: `Cập nhật trạng thái khóa thành công cho ${updatedCount} người dùng`,
        data: { updatedCount },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getMe(
    userId: string,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    return this.getUserById(userId);
  }
  async updateAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    try {
      const uploadedMedia = await this.storageService.uploadFile(
        {
          file,
          type: MediaType.AVATAR,
          userId,
        },
        {
          getDirectUrl: true,
        },
      );
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: { avatarMediaId: uploadedMedia.id },
        select: userSelect,
      });

      const userResponse = toResponseDto(UserResponseDto, updatedUser);

      return {
        type: 'response',
        message: 'Cập nhật ảnh đại diện thành công',
        data: userResponse,
      };
    } catch (error) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.UPDATE_AVATAR_FAILED],
        ERROR_CODES.UPDATE_AVATAR_FAILED,
      );
    }
  }

  async updateMe(
    userId: string,
    updateDto: UpdateUserDto,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    try {
      // Get current user data
      const currentUser = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!currentUser) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Validate uniqueness for email, phone, username if they are being updated
      if (updateDto.email && updateDto.email !== currentUser.email) {
        const existingEmail = await this.prismaService.user.findUnique({
          where: { email: updateDto.email },
        });
        if (existingEmail) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.EMAIL_ALREADY_EXISTS],
            ERROR_CODES.EMAIL_ALREADY_EXISTS,
          );
        }
      }

      if (updateDto.phone && updateDto.phone !== currentUser.phone) {
        const existingPhone = await this.prismaService.user.findUnique({
          where: { phone: updateDto.phone },
        });
        if (existingPhone) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PHONE_ALREADY_EXISTS],
            ERROR_CODES.PHONE_ALREADY_EXISTS,
          );
        }
      }

      if (updateDto.username && updateDto.username !== currentUser.username) {
        const existingUsername = await this.prismaService.user.findUnique({
          where: { username: updateDto.username },
        });
        if (existingUsername) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.USERNAME_ALREADY_EXISTS],
            ERROR_CODES.USERNAME_ALREADY_EXISTS,
          );
        }
      }

      // Prepare update data
      // const updateData: any = {};
      // if (updateDto.email) updateData.email = updateDto.email;
      // if (updateDto.firstName) updateData.firstName = updateDto.firstName;
      // if (updateDto.lastName) updateData.lastName = updateDto.lastName;
      // if (updateDto.phone) updateData.phone = updateDto.phone;
      // if (updateDto.username) updateData.username = updateDto.username;

      const updateData = await processDataObject(updateDto);

      // Hash password if provided
      // if (updateDto.password) {
      //   const hashedPassword = await bcrypt.hash(updateDto.password, 10);
      //   updateData.password = hashedPassword;
      // }

      // Update user
      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: updateData,
        select: userSelect,
      });

      const userResponse = toResponseDto(UserResponseDto, updatedUser);

      return {
        type: 'response',
        message: 'Cập nhật thông tin cá nhân thành công',
        data: userResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.UPDATE_USER_FAILED],
        ERROR_CODES.UPDATE_USER_FAILED,
      );
    }
  }

  async updateUserById(
    adminUserId: string,
    targetUserId: string,
    updateDto: UpdateUserByAdminDto,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    try {
      // Verify target user exists
      const targetUser = await this.prismaService.user.findUnique({
        where: { id: targetUserId },
      });

      if (!targetUser) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      // Validate uniqueness for email, phone, username if they are being updated
      if (updateDto.email && updateDto.email !== targetUser.email) {
        const existingEmail = await this.prismaService.user.findUnique({
          where: { email: updateDto.email },
        });
        if (existingEmail) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.EMAIL_ALREADY_EXISTS],
            ERROR_CODES.EMAIL_ALREADY_EXISTS,
          );
        }
      }

      if (updateDto.phone && updateDto.phone !== targetUser.phone) {
        const existingPhone = await this.prismaService.user.findUnique({
          where: { phone: updateDto.phone },
        });
        if (existingPhone) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PHONE_ALREADY_EXISTS],
            ERROR_CODES.PHONE_ALREADY_EXISTS,
          );
        }
      }

      if (updateDto.username && updateDto.username !== targetUser.username) {
        const existingUsername = await this.prismaService.user.findUnique({
          where: { username: updateDto.username },
        });
        if (existingUsername) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.USERNAME_ALREADY_EXISTS],
            ERROR_CODES.USERNAME_ALREADY_EXISTS,
          );
        }
      }

      // Prepare update data
      // const updateData: any = {};
      // if (updateDto.email) updateData.email = updateDto.email;
      // if (updateDto.firstName) updateData.firstName = updateDto.firstName;
      // if (updateDto.lastName) updateData.lastName = updateDto.lastName;
      // if (updateDto.phone) updateData.phone = updateDto.phone;
      // if (updateDto.username) updateData.username = updateDto.username;

      const updateData = await processDataObject(updateDto);

      // Add admin-specific fields
      // if (updateDto.isActive !== undefined)
      //   updateData.isActive = updateDto.isActive;
      // if (updateDto.isBanned !== undefined)
      //   updateData.isBanned = updateDto.isBanned;
      // if (updateDto.isVerified !== undefined)
      //   updateData.isVerified = updateDto.isVerified;
      // if (updateDto.isEmailVerified !== undefined)
      //   updateData.isEmailVerified = updateDto.isEmailVerified;
      // if (updateDto.isPhoneVerified !== undefined)
      //   updateData.isPhoneVerified = updateDto.isPhoneVerified;

      // Update user
      const updatedUser = await this.prismaService.user.update({
        where: { id: targetUserId },
        data: updateData,
        select: userSelect,
      });

      const userResponse = toResponseDto(UserResponseDto, updatedUser);

      return {
        type: 'response',
        message: 'Cập nhật người dùng thành công',
        data: userResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.UPDATE_USER_FAILED],
        ERROR_CODES.UPDATE_USER_FAILED,
      );
    }
  }

  async getAddressesByUserId({
    targetUserId,
    limit = 10,
    page = 1,
    search,
  }: {
    targetUserId: string;
    limit: number;
    page: number;
    search: string;
  }): Promise<IBeforeTransformPaginationResponseType<AddressResponseDto>> {
    try {
      // Check if user exists
      const user = await this.prismaService.user.findUnique({
        where: { id: targetUserId },
      });

      if (!user) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
          ERROR_CODES.USER_NOT_FOUND,
        );
      }

      const whereQuery: Prisma.AddressWhereInput = {
        userId: targetUserId,
        ...(search && {
          OR: [
            {
              phone: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              fullName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              addressLine1: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              addressLine2: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              city: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              province: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              country: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              postalCode: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }),
      };

      const [totalCount, addresses] = await Promise.all([
        this.prismaService.address.count({ where: whereQuery }),
        this.prismaService.address.findMany({
          where: whereQuery,
          select: addressSelect,
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
          take: limit,
          skip: (page - 1) * limit,
        }),
      ]);

      const addressResponses = addresses.map((address) =>
        toResponseDto(AddressResponseDto, address),
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách địa chỉ thành công',
        data: {
          totalCount,
          currentPage: page,
          pageSize: limit,
          items: addressResponses,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getMyAddresses({
    userId,
    limit,
    page,
    search,
  }: {
    userId: string;
    limit: number;
    page: number;
    search: string;
  }): Promise<IBeforeTransformPaginationResponseType<AddressResponseDto>> {
    try {
      return this.getAddressesByUserId({
        targetUserId: userId,
        limit,
        page,
        search,
      });
    } catch (error) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // async getMyAddresses(
  //   userId: string,
  // ): Promise<IBeforeTransformResponseType<AddressResponseDto[]>> {
  //   try {
  //     const addresses = await this.prismaService.address.findMany({
  //       where: {
  //         userId,
  //       },
  //       orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  //     });

  //     const addressResponses = addresses.map((address) =>
  //       toResponseDto(AddressResponseDto, address),
  //     );

  //     return {
  //       type: 'response',
  //       message: 'Addresses retrieved successfully',
  //       data: addressResponses,
  //     };
  //   } catch (error) {
  //     throw new BusinessException(
  //       ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
  //       ERROR_CODES.DATABASE_ERROR,
  //     );
  //   }
  // }

  async createAddress(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<IBeforeTransformResponseType<AddressResponseDto>> {
    try {
      // If this address is set as default, unset all other default addresses for this user
      if (createAddressDto.isDefault) {
        await this.prismaService.address.updateMany({
          where: {
            userId,
            isDefault: true,
          },
          data: {
            isDefault: false,
          },
        });
      }

      // Create the new address
      const address = await this.prismaService.address.create({
        data: {
          userId,
          fullName: createAddressDto.fullName,
          phone: createAddressDto.phone,
          addressLine1: createAddressDto.addressLine1,
          addressLine2: createAddressDto.addressLine2,
          city: createAddressDto.city,
          province: createAddressDto.province,
          postalCode: createAddressDto.postalCode,
          country: createAddressDto.country || 'Vietnam',
          isDefault: createAddressDto.isDefault || false,
        },
      });

      const addressResponse = toResponseDto(AddressResponseDto, address);

      return {
        type: 'response',
        message: 'Tạo địa chỉ thành công',
        data: addressResponse,
        statusCode: 201,
      };
    } catch (error) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.CREATE_ADDRESS_FAILED],
        ERROR_CODES.CREATE_ADDRESS_FAILED,
      );
    }
  }

  async updateAddress(
    userId: string,
    addressId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<IBeforeTransformResponseType<AddressResponseDto>> {
    try {
      // Check if address exists
      const existingAddress = await this.prismaService.address.findUnique({
        where: { id: addressId },
      });

      if (!existingAddress) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ADDRESS_NOT_FOUND],
          ERROR_CODES.ADDRESS_NOT_FOUND,
        );
      }

      // Verify ownership
      if (existingAddress.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ADDRESS_NOT_OWNED],
          ERROR_CODES.ADDRESS_NOT_OWNED,
        );
      }

      // If this address is being set as default, unset all other default addresses for this user
      if (updateAddressDto.isDefault) {
        await this.prismaService.address.updateMany({
          where: {
            userId,
            isDefault: true,
            id: { not: addressId },
          },
          data: {
            isDefault: false,
          },
        });
      }

      // Prepare update data
      const updateData = await processDataObject(updateAddressDto);

      // Update the address
      const updatedAddress = await this.prismaService.address.update({
        where: { id: addressId },
        data: updateData,
      });

      const addressResponse = toResponseDto(AddressResponseDto, updatedAddress);

      return {
        type: 'response',
        message: 'Cập nhật địa chỉ thành công',
        data: addressResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.UPDATE_ADDRESS_FAILED],
        ERROR_CODES.UPDATE_ADDRESS_FAILED,
      );
    }
  }

  async deleteAddress({
    userId,
    addressId,
  }: {
    userId: string;
    addressId: string;
  }): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      await this.deleteAddressById({
        userId,
        addressId,
      });

      return {
        type: 'response',
        message: 'Xóa địa chỉ thành công',
        data: { message: 'Xóa địa chỉ thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DELETE_ADDRESS_FAILED],
        ERROR_CODES.DELETE_ADDRESS_FAILED,
      );
    }
  }

  async deleteAddressById({
    userId,
    addressId,
  }: {
    userId?: string;
    addressId: string;
  }): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Check if address exists
      const existingAddress = await this.prismaService.address.findUnique({
        where: { id: addressId },
      });

      if (!existingAddress) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ADDRESS_NOT_FOUND],
          ERROR_CODES.ADDRESS_NOT_FOUND,
        );
      }

      // Verify ownership
      if (userId && existingAddress.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ADDRESS_NOT_OWNED],
          ERROR_CODES.ADDRESS_NOT_OWNED,
        );
      }

      // Delete the address
      await this.prismaService.address.delete({
        where: { id: addressId },
      });

      return {
        type: 'response',
        message: 'Xóa địa chỉ thành công',
        data: { message: 'Xóa địa chỉ thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DELETE_ADDRESS_FAILED],
        ERROR_CODES.DELETE_ADDRESS_FAILED,
      );
    }
  }

  async createUserByAdmin(
    createUserByAdminDto: CreateUserByAdminDto,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    try {
      // Validate email uniqueness
      const existingEmail = await this.prismaService.user.findUnique({
        where: { email: createUserByAdminDto.email },
        select: { id: true },
      });
      if (existingEmail) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.EMAIL_ALREADY_EXISTS],
          ERROR_CODES.EMAIL_ALREADY_EXISTS,
        );
      }

      // Validate phone uniqueness
      const existingPhone = await this.prismaService.user.findUnique({
        where: { phone: createUserByAdminDto.phone },
        select: { id: true },
      });
      if (existingPhone) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PHONE_ALREADY_EXISTS],
          ERROR_CODES.PHONE_ALREADY_EXISTS,
        );
      }

      // Validate username uniqueness
      const existingUsername = await this.prismaService.user.findUnique({
        where: { username: createUserByAdminDto.username },
        select: { id: true },
      });
      if (existingUsername) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.USERNAME_ALREADY_EXISTS],
          ERROR_CODES.USERNAME_ALREADY_EXISTS,
        );
      }

      // Resolve roleId: use provided roleId or fall back to default USER role
      const roleId = createUserByAdminDto.roleId ?? configData.USER_ROLE_ID;

      // Validate that the provided roleId actually exists
      if (createUserByAdminDto.roleId) {
        const roleExists = await this.prismaService.userRole.findUnique({
          where: { id: createUserByAdminDto.roleId },
          select: { id: true },
        });
        if (!roleExists) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.USER_ROLE_NOT_FOUND],
            ERROR_CODES.USER_ROLE_NOT_FOUND,
          );
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(
        createUserByAdminDto.password,
        configData.BCRYPT_SALT_ROUNDS,
      );

      // Create user with role assignment
      const newUser = await this.prismaService.user.create({
        data: {
          email: createUserByAdminDto.email,
          password: hashedPassword,
          firstName: createUserByAdminDto.firstName,
          lastName: createUserByAdminDto.lastName,
          phone: createUserByAdminDto.phone,
          username: createUserByAdminDto.username,
          isActive: createUserByAdminDto.isActive ?? true,
          isEmailVerified: createUserByAdminDto.isEmailVerified ?? false,
          isPhoneVerified: createUserByAdminDto.isPhoneVerified ?? false,
          emailVerifiedAt: createUserByAdminDto.isEmailVerified
            ? new Date()
            : null,
          phoneVerifiedAt: createUserByAdminDto.isPhoneVerified
            ? new Date()
            : null,
          roleAssignments: {
            create: {
              roleId,
            },
          },
        },
        select: userSelect,
      });

      const userResponse = toResponseDto(UserResponseDto, newUser);

      // Fire-and-forget: update daily stats after user created by admin
      this.statsService.onUserCreated().catch((err) => {
        console.error('Failed to update stats after admin created user:', err);
      });

      return {
        type: 'response',
        message: 'Tạo người dùng thành công',
        data: userResponse,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getAllUserRoles(): Promise<
    IBeforeTransformResponseType<UserRoleResponseDto[]>
  > {
    try {
      const roles = await this.prismaService.userRole.findMany({
        select: userRoleSelect,
        orderBy: { createdAt: 'asc' },
      });

      const roleResponses = roles.map((role) =>
        toResponseDto(UserRoleResponseDto, role),
      );

      return {
        type: 'response',
        message: 'Lấy danh sách vai trò người dùng thành công',
        data: roleResponses,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
