import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
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
import { BlogPostResponseDto } from '../dto/blog-post-response.dto';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { UpdateBlogPostDto } from '../dto/update-blog-post.dto';

// ============== Admin Blog Post Decorators ==============

export const ApiGetAllPosts = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get all blog posts with pagination and filters',
      description:
        'Retrieve all blog posts with search, filter, and sort options',
    }),
    ApiResponse({
      status: 200,
      type: BlogPostResponseDto,
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
      description: 'Search by title, content, or tags',
    }),
    ApiQuery({
      name: 'topicId',
      type: String,
      required: false,
      description: 'Filter by blog topic ID',
    }),
    ApiQuery({
      name: 'authorId',
      type: String,
      required: false,
      description: 'Filter by author ID',
    }),
    ApiQuery({
      name: 'status',
      enum: ['DRAFT', 'PUBLISHED'],
      required: false,
      description: 'Filter by post status',
    }),
    ApiQuery({
      name: 'tag',
      type: String,
      required: false,
      description: 'Filter by tag',
    }),
    ApiQuery({
      name: 'sortBy',
      enum: ['createdAt', 'updatedAt', 'title', 'viewCount'],
      required: false,
      description: 'Sort by field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      enum: ['asc', 'desc'],
      required: false,
      description: 'Sort order (default: desc)',
    }),
  );

export const ApiCreatePost = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create a new blog post',
      description:
        'Create a new blog post with auto-generated slug and author from JWT',
    }),
    ApiBody({
      type: CreateBlogPostDto,
    }),
    ApiResponse({
      status: 201,
      type: BlogPostResponseDto,
    }),
  );

export const ApiGetPostById = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get blog post by ID',
      description: 'Retrieve blog post details by ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Post ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: BlogPostResponseDto,
    }),
  );

export const ApiUpdatePost = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update blog post',
      description: 'Update blog post information',
    }),
    ApiParam({
      name: 'id',
      description: 'Post ID',
      type: String,
    }),
    ApiBody({
      type: UpdateBlogPostDto,
    }),
    ApiResponse({
      status: 200,
      type: BlogPostResponseDto,
    }),
  );

export const ApiDeletePost = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Delete blog post',
      description: 'Soft delete a blog post',
    }),
    ApiParam({
      name: 'id',
      description: 'Post ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: BlogPostResponseDto,
      description: 'Post deleted successfully',
    }),
  );

export const ApiUploadFeaturedImage = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Upload blog post featured image',
      description: 'Upload and attach a featured image to a blog post',
    }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.BLOG_POST_IMAGE }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      description: 'Post ID',
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
      type: BlogPostResponseDto,
    }),
  );

// ============== Public Blog Post Decorators ==============

export const ApiGetAllPublicPosts = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get all published blog posts',
      description:
        'Retrieve all published blog posts with filters and pagination',
    }),
    ApiResponse({
      status: 200,
      type: BlogPostResponseDto,
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
      description: 'Search by title, content, or tags',
    }),
    ApiQuery({
      name: 'topicId',
      type: String,
      required: false,
      description: 'Filter by blog topic ID',
    }),
    ApiQuery({
      name: 'tag',
      type: String,
      required: false,
      description: 'Filter by tag',
    }),
    ApiQuery({
      name: 'sortBy',
      enum: ['createdAt', 'updatedAt', 'title', 'viewCount'],
      required: false,
      description: 'Sort by field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      enum: ['asc', 'desc'],
      required: false,
      description: 'Sort order (default: desc)',
    }),
  );

export const ApiGetPostBySlug = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get blog post by slug',
      description:
        'Retrieve blog post details by slug and increment view count',
    }),
    ApiParam({
      name: 'slug',
      description: 'Post slug',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: BlogPostResponseDto,
    }),
  );
