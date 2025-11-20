import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  ApiPublicOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import { BrandResponseDto } from 'src/modules/brand/dto/brand-response.dto';

export const ApiCreateBrand = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Create a new brand',
      description: 'Create a new brand with optional logo',
      roles: [RolesLevel.MANAGER],
    }),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor('logo')),
    ApiResponse({
      status: 201,
      type: BrandResponseDto,
    }),
  );

export const ApiGetBrands = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get all brands',
      description: 'Retrieve all brands',
    }),
    ApiResponse({
      status: 200,
      type: BrandResponseDto,
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      default: 1,
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      default: 10,
    }),
    ApiQuery({
      name: 'search',
      type: String,
      required: false,
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      enum: ['asc', 'desc'],
      default: 'asc',
    }),
  );

export const ApiGetBrand = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get brand by ID',
      description: 'Retrieve brand details by ID',
    }),
    ApiResponse({
      status: 200,
      type: BrandResponseDto,
    }),
  );

export const ApiUpdateBrand = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update brand',
      description: 'Update brand information and optional logo',
      roles: [RolesLevel.MANAGER],
    }),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor('logo')),
    ApiResponse({
      status: 200,
      type: BrandResponseDto,
    }),
  );

export const ApiDeleteBrand = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete brand',
      description: 'Delete a brand. Brand must not have products',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 200,
      type: BrandResponseDto,
      description: 'Brand deleted successfully',
    }),
  );
