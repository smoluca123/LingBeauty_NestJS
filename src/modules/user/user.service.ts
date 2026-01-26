import { Injectable } from '@nestjs/common';
import { MediaType } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import { userSelect } from 'src/libs/prisma/user-select';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
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

@Injectable()
export class UserService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  async getMe(
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
      message: 'User retrieved successfully',
      data: userResponse,
    };
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
        message: 'Avatar updated successfully',
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
        message: 'User updated successfully',
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
        message: 'User updated successfully by admin',
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

  async getMyAddresses(
    userId: string,
  ): Promise<IBeforeTransformResponseType<AddressResponseDto[]>> {
    try {
      const addresses = await this.prismaService.address.findMany({
        where: {
          userId,
        },
        orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
      });

      const addressResponses = addresses.map((address) =>
        toResponseDto(AddressResponseDto, address),
      );

      return {
        type: 'response',
        message: 'Addresses retrieved successfully',
        data: addressResponses,
      };
    } catch (error) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getAddressesByUserId(
    targetUserId: string,
  ): Promise<IBeforeTransformResponseType<AddressResponseDto[]>> {
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

      const addresses = await this.prismaService.address.findMany({
        where: {
          userId: targetUserId,
        },
        orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
      });

      const addressResponses = addresses.map((address) =>
        toResponseDto(AddressResponseDto, address),
      );

      return {
        type: 'response',
        message: 'Addresses retrieved successfully',
        data: addressResponses,
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
        message: 'Address created successfully',
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
        message: 'Address updated successfully',
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

  async deleteAddress(
    userId: string,
    addressId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
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

      // Delete the address
      await this.prismaService.address.delete({
        where: { id: addressId },
      });

      return {
        type: 'response',
        message: 'Address deleted successfully',
        data: { message: 'Address deleted successfully' },
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
}
