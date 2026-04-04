import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  ApiProtectedAuthOperation,
  ApiPublicOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { BlogCommentResponseDto } from '../dto/comment-response.dto';
import { BlogCommentReportResponseDto } from '../dto/comment-report-response.dto';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';

// ============== Public Comment Decorators ==============

export const ApiGetPostComments = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get comments for a blog post',
      description: 'Retrieve all comments for a specific blog post',
    }),
    ApiResponse({
      status: 200,
      type: BlogCommentResponseDto,
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
      description: 'Items per page (default: 20)',
    }),
    ApiQuery({
      name: 'postId',
      type: String,
      required: false,
      description: 'Filter by post ID',
    }),
    ApiQuery({
      name: 'parentId',
      type: String,
      required: false,
      description: 'Filter by parent comment ID (null for top-level comments)',
    }),
  );

export const ApiGetCommentById = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get comment by ID',
      description: 'Retrieve a specific comment with its replies',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Comment ID',
    }),
    ApiResponse({
      status: 200,
      type: BlogCommentResponseDto,
    }),
  );

// ============== Protected Comment Decorators ==============

export const ApiCreateComment = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create a new comment',
      description: 'Create a new comment on a blog post',
    }),
    ApiResponse({
      status: 201,
      type: BlogCommentResponseDto,
    }),
  );

export const ApiUpdateComment = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Update a comment',
      description: 'Update your own comment',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Comment ID',
    }),
    ApiResponse({
      status: 200,
      type: BlogCommentResponseDto,
    }),
  );

export const ApiDeleteComment = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Delete a comment',
      description: 'Delete your own comment',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Comment ID',
    }),
    ApiResponse({
      status: 200,
    }),
  );

// ============== Comment Report Decorators ==============

export const ApiCreateCommentReport = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Report a comment',
      description: 'Report an inappropriate comment to admin',
    }),
    ApiResponse({
      status: 201,
      type: BlogCommentReportResponseDto,
    }),
  );

export const ApiGetReports = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      roles: [RolesLevel.MANAGER],
      summary: 'Get all comment reports (Admin)',
      description: 'Retrieve all comment reports with filters',
    }),
    ApiResponse({
      status: 200,
      type: BlogCommentReportResponseDto,
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
      description: 'Items per page (default: 20)',
    }),
    ApiQuery({
      name: 'status',
      enum: ['PENDING', 'REVIEWED', 'RESOLVED', 'REJECTED'],
      required: false,
      description: 'Filter by report status',
    }),
    ApiQuery({
      name: 'reason',
      enum: ['SPAM', 'INAPPROPRIATE', 'HARASSMENT', 'MISINFORMATION', 'OTHER'],
      required: false,
      description: 'Filter by report reason',
    }),
  );

export const ApiUpdateReportStatus = () =>
  applyDecorators(
    ApiProtectedAuthOperation({}),
    ApiRoleProtectedOperation({
      roles: [RolesLevel.MANAGER],
      summary: 'Update report status (Admin)',
      description: 'Update the status of a comment report',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Report ID',
    }),

    ApiResponse({
      status: 200,
      type: BlogCommentReportResponseDto,
    }),
  );

export const ApiAdminDeleteComment = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      roles: [RolesLevel.MANAGER],
      summary: 'Delete any comment (Admin)',
      description: 'Admin can delete any comment',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Comment ID',
    }),
    ApiResponse({
      status: 200,
    }),
  );
