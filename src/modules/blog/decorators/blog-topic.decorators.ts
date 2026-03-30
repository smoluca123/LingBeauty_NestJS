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
  ApiPublicOperation,
} from 'src/decorators/api.decorators';
import { FileValidationInterceptor } from 'src/modules/storage/interceptors/file-validation.interceptor';
import { MediaType } from 'prisma/generated/prisma/client';
import { BlogTopicResponseDto } from '../dto/blog-topic-response.dto';
import { CreateBlogTopicDto } from '../dto/create-blog-topic.dto';
import { UpdateBlogTopicDto } from '../dto/update-blog-topic.dto';

// ============== Admin Blog Topic Decorators ==============

export const ApiGetAllTopics = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get all blog topics with pagination',
      description: 'Retrieve all blog topics with search and filter options',
    }),
    ApiResponse({
      status: 200,
      type: BlogTopicResponseDto,
      isArray: true,
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      description: 'Page number (default: 1)',
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      description: 'Items per page (default: 10)',
    }),
    ApiQuery({
      name: 'search',
      type: String,
      required: false,
      description: 'Search by topic name or description',
    }),
    ApiQuery({
      name: 'isActive',
      type: Boolean,
      required: false,
      description: 'Filter by active status',
    }),
  );

export const ApiCreateTopic = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create a new blog topic',
      description: 'Create a new blog topic with auto-generated slug',
    }),
    ApiBody({
      type: CreateBlogTopicDto,
    }),
    ApiResponse({
      status: 201,
      type: BlogTopicResponseDto,
    }),
  );

export const ApiCreateSubTopic = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create a sub-topic under a parent topic',
      description: 'Create a new blog sub-topic linked to a parent topic',
    }),
    ApiParam({
      name: 'parentId',
      description: 'Parent Topic ID',
      type: String,
    }),
    ApiBody({
      type: CreateBlogTopicDto,
    }),
    ApiResponse({
      status: 201,
      type: BlogTopicResponseDto,
    }),
  );

export const ApiGetTopicById = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get blog topic by ID',
      description: 'Retrieve blog topic details by ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Topic ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: BlogTopicResponseDto,
    }),
  );

export const ApiUpdateTopic = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Update blog topic',
      description: 'Update blog topic information',
    }),
    ApiParam({
      name: 'id',
      description: 'Topic ID',
      type: String,
    }),
    ApiBody({
      type: UpdateBlogTopicDto,
    }),
    ApiResponse({
      status: 200,
      type: BlogTopicResponseDto,
    }),
  );

export const ApiDeleteTopic = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Delete blog topic',
      description: 'Soft delete a blog topic',
    }),
    ApiParam({
      name: 'id',
      description: 'Topic ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: BlogTopicResponseDto,
      description: 'Topic deleted successfully',
    }),
  );

export const ApiUploadTopicImage = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Upload blog topic image',
      description: 'Upload and attach an image to a blog topic',
    }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.BLOG_TOPIC_IMAGE }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      description: 'Topic ID',
      type: String,
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      type: BlogTopicResponseDto,
    }),
  );

// ============== Public Blog Topic Decorators ==============

export const ApiGetAllPublicTopics = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get all active blog topics',
      description: 'Retrieve all active blog topics for public viewing',
    }),
    ApiResponse({
      status: 200,
      type: BlogTopicResponseDto,
      isArray: true,
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      description: 'Page number (default: 1)',
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      description: 'Items per page (default: 10)',
    }),
    ApiQuery({
      name: 'search',
      type: String,
      required: false,
      description: 'Search by topic name or description',
    }),
  );

export const ApiGetTopicBySlug = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get blog topic by slug',
      description: 'Retrieve blog topic details by slug with post count',
    }),
    ApiParam({
      name: 'slug',
      description: 'Topic slug',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: BlogTopicResponseDto,
    }),
  );
