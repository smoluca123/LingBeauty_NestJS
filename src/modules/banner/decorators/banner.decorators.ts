import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import {
  BannerGroupResponseDto,
  BannerResponseDto,
} from '../dto/banner-response.dto';
import { CreateBannerGroupDto } from '../dto/create-banner-group.dto';
import { UpdateBannerGroupDto } from '../dto/update-banner-group.dto';
import {
  CreateBannerDto,
  CreateBannerWithUploadDto,
} from '../dto/create-banner.dto';
import { UpdateBannerDto } from '../dto/update-banner.dto';
import { ApiQueryLimitAndPage } from 'src/decorators/pagination.decorators';

// ============== Public Endpoints ==============

export function ApiGetActiveBannerGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get active banner group',
      description: 'Get the currently active banner group for homepage display',
    }),
    ApiResponse({
      status: 200,
      description: 'Active banner group retrieved successfully',
      type: BannerGroupResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'No active banner group found',
    }),
  );
}

// ============== Banner Group Endpoints ==============

export function ApiGetAllBannerGroups() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all banner groups',
      description: 'Get all banner groups with pagination',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Items per page',
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: 'Banner groups retrieved successfully',
      type: [BannerGroupResponseDto],
    }),
  );
}

export function ApiGetBannerGroupById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get banner group by ID',
      description: 'Get detailed information about a specific banner group',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Banner group ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Banner group retrieved successfully',
      type: BannerGroupResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Banner group not found',
    }),
  );
}

export function ApiCreateBannerGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create banner group',
      description: 'Create a new banner group',
    }),
    ApiBody({
      type: CreateBannerGroupDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Banner group created successfully',
      type: BannerGroupResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input or slug already exists',
    }),
  );
}

export function ApiUpdateBannerGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update banner group',
      description: 'Update an existing banner group',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Banner group ID',
    }),
    ApiBody({
      type: UpdateBannerGroupDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Banner group updated successfully',
      type: BannerGroupResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Banner group not found',
    }),
  );
}

export function ApiDeleteBannerGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete banner group',
      description: 'Delete a banner group and all its banners',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Banner group ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Banner group deleted successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Banner group not found',
    }),
  );
}

// ============== Banner Item Endpoints ==============

export function ApiGetAllBanners() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all banners',
      description: 'Get all banners with pagination',
    }),
    // ApiQuery({
    //   name: 'page',
    //   required: false,
    //   type: Number,
    //   description: 'Page number',
    //   example: 1,
    // }),
    // ApiQuery({
    //   name: 'limit',
    //   required: false,
    //   type: Number,
    //   description: 'Items per page',
    //   example: 10,
    // }),
    ApiQueryLimitAndPage(),
    ApiQuery({
      name: 'search',
      required: false,

      type: String,
      description: 'Search query',
    }),
    ApiQuery({
      name: 'groupId',
      required: false,
      type: String,
      description: 'Banner group ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Banners retrieved successfully',
      type: [BannerResponseDto],
    }),
  );
}

export function ApiCreateBanner() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create banner item',
      description: 'Create a new banner item in a group',
    }),
    ApiParam({
      name: 'groupId',
      type: String,
      description: 'Banner group ID',
    }),
    ApiBody({
      type: CreateBannerDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Banner created successfully',
      type: BannerResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Banner group not found',
    }),
  );
}

export function ApiAddBannerToGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add an existing banner to a banner group',
      description: 'Map an existing banner to a specific banner group',
    }),
    ApiParam({
      name: 'groupId',
      type: String,
      description: 'Banner group ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Banner ID',
    }),
    ApiResponse({
      status: 201,
      description: 'Banner added to group successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Banner or banner group not found',
    }),
    ApiResponse({
      status: 400,
      description: 'Banner is already in this group',
    }),
  );
}

export function ApiCreateBannerWithUpload() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create banner item with image upload',
      description: 'Create a new banner item and upload image in one request',
    }),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'groupId',
      type: String,
      description: 'Banner group ID',
    }),
    ApiBody({
      type: CreateBannerWithUploadDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Banner created with image successfully',
      type: BannerResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Banner group not found',
    }),
  );
}

export function ApiUpdateBanner() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update banner item',
      description: 'Update an existing banner item',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Banner ID',
    }),
    ApiBody({
      type: UpdateBannerDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Banner updated successfully',
      type: BannerResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Banner not found',
    }),
  );
}

export function ApiUpdateBannerWithUpload() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update banner item with image upload',
      description:
        'Update banner item and upload new image (replaces old image)',
    }),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Banner ID',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description: 'New banner image file',
          },
          type: { type: 'string', enum: ['TEXT', 'IMAGE'] },
          position: {
            type: 'string',
            enum: ['MAIN_CAROUSEL', 'SIDE_TOP', 'SIDE_BOTTOM'],
          },
          badge: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          highlight: { type: 'string' },
          ctaText: { type: 'string' },
          ctaLink: { type: 'string' },
          subLabel: { type: 'string' },
          bgClass: { type: 'string' },
          sortOrder: { type: 'number' },
          isActive: { type: 'boolean' },
        },
        required: ['file'],
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Banner updated with image successfully',
      type: BannerResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Banner not found',
    }),
  );
}

export function ApiDeleteBanner() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete banner item',
      description: 'Delete a banner item',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Banner ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Banner deleted successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Banner not found',
    }),
  );
}
