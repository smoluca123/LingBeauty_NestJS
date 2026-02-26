import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ApiProtectedAuthOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import { UpdateAvatarDto } from 'src/modules/user/dto/avatar-upload.dto';
import { UpdateUserByAdminDto } from 'src/modules/user/dto/update-user-admin.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { CreateAddressDto } from 'src/modules/user/dto/create-address.dto';
import { UpdateAddressDto } from 'src/modules/user/dto/update-address.dto';
import { AddressResponseDto } from 'src/modules/user/dto/address-response.dto';
import { FileValidationInterceptor } from 'src/modules/storage/interceptors/file-validation.interceptor';
import { MediaType } from 'prisma/generated/prisma';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';
import { ApiQueryLimitAndPage } from 'src/decorators/pagination.decorators';
import {
  BanUserBulkDto,
  BanUserBulkResultDto,
  BanUserDto,
} from 'src/modules/user/dto/ban-user.dto';

export function ApiGetAllUsers() {
  return applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get all users with pagination (Admin/Manager only)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiQueryLimitAndPage(),
    ApiQuery({
      name: 'search',
      description: 'Search by email, firstName, lastName, username or phone',
      required: false,
    }),
    ApiQuery({
      name: 'isActive',
      description: 'Filter by active status',
      required: false,
      type: Boolean,
    }),
    ApiQuery({
      name: 'isBanned',
      description: 'Filter by banned status',
      required: false,
      type: Boolean,
    }),
    ApiQuery({
      name: 'isVerified',
      description: 'Filter by verified status',
      required: false,
      type: Boolean,
    }),
    ApiQuery({
      name: 'sortBy',
      description: 'Sort field (default: createdAt)',
      required: false,
      enum: ['createdAt', 'updatedAt', 'email', 'firstName', 'lastName'],
    }),
    ApiQuery({
      name: 'order',
      description: 'Sort order (default: desc)',
      required: false,
      enum: ['asc', 'desc'],
    }),
    ApiResponse({
      status: 200,
      description: 'Paginated list of users',
      type: [UserResponseDto],
    }),
  );
}

export function ApiGetUserById() {
  return applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get user detail by ID (Admin/Manager only)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'User ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'User detail',
      type: UserResponseDto,
    }),
  );
}

export function ApiGetMe() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Get current user profile' }),
    ApiResponse({
      status: 200,
      description: 'Current user profile',
      type: UserResponseDto,
    }),
  );
}

export function ApiUploadAvatar() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Upload user avatar' }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: 'AVATAR' }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: UpdateAvatarDto,
    }),
  );
}

export function ApiUpdateMe() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Update current user profile' }),
    ApiBody({
      type: UpdateUserDto,
    }),
  );
}

export function ApiUpdateUserById() {
  return applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update user by ID (Admin only)',
      roles: [RolesLevel.ADMIN],
    }),
    ApiBody({
      type: UpdateUserByAdminDto,
    }),
  );
}

export function ApiGetMyAddresses() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Get my addresses' }),
    ApiQueryLimitAndPage(),
    ApiResponse({
      status: 200,
      description: 'List of addresses',
      type: [AddressResponseDto],
    }),
  );
}

export function ApiCreateAddress() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Create a new address' }),
    ApiBody({
      type: CreateAddressDto,
    }),
  );
}

export function ApiUpdateAddress() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Update an existing address' }),
    ApiBody({
      type: UpdateAddressDto,
    }),
  );
}

export function ApiDeleteAddress() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Delete an address (Manager)' }),
    ApiParam({
      name: 'id',
      description: 'Address ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Address deleted successfully',
      example: {
        message: 'Address deleted successfully',
      },
    }),
  );
}
export function ApiAdminDeleteAddress() {
  return applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete an address (Manager)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Address ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Address deleted successfully',
      example: {
        message: 'Address deleted successfully',
      },
    }),
  );
}

export function ApiGetAddressesByUserId() {
  return applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get addresses by user ID (Manager only)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiQueryLimitAndPage(),
    ApiParam({
      name: 'userId',
      description: 'User ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'List of addresses for the user',
      type: [AddressResponseDto],
    }),
  );
}

export function ApiUpdateBanStatus() {
  return applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update ban status for a single user (Manager only)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Target user ID',
      type: String,
    }),
    ApiBody({ type: BanUserDto }),
    ApiResponse({
      status: 200,
      description: 'User ban status updated successfully',
      type: UserResponseDto,
    }),
  );
}

export function ApiUpdateBanStatusBulk() {
  return applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Bulk update ban status for multiple users (Manager only)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiBody({ type: BanUserBulkDto }),
    ApiResponse({
      status: 200,
      description: 'Bulk ban status updated successfully',
      type: BanUserBulkResultDto,
    }),
  );
}
