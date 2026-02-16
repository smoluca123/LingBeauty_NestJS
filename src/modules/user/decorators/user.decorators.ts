import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiParam } from '@nestjs/swagger';
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
