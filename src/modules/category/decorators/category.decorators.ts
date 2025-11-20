import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import {
  ApiPublicOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import { CategoryResponseDto } from 'src/modules/category/dto/category-response.dto';

export const ApiGetCategories = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get category tree',
      description: 'Retrieve all categories with nested child categories',
    }),
    ApiResponse({
      status: 200,
      type: CategoryResponseDto,
      isArray: true,
    }),
  );

export const ApiCreateCategory = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Create a new category',
      description: 'Create a root or child category with optional cover image',
    }),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor('image')),
    ApiResponse({
      status: 201,
      type: CategoryResponseDto,
    }),
  );

export const ApiCreateSubCategory = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Create a sub-category',
      description: 'Create a child category under a specific parent category',
    }),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor('image')),
    ApiResponse({
      status: 201,
      type: CategoryResponseDto,
    }),
  );

export const ApiUpdateCategory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update category',
      description: 'Update category information and optional cover image',
      roles: [RolesLevel.MANAGER],
    }),
    ApiConsumes('multipart/form-data'),
    UseInterceptors(FileInterceptor('image')),
    ApiResponse({
      status: 200,
      type: CategoryResponseDto,
    }),
  );

export const ApiDeleteCategory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete category',
      description:
        'Delete a category. Category must not have child categories or products',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 200,
      type: CategoryResponseDto,
      description: 'Category deleted successfully',
    }),
  );
