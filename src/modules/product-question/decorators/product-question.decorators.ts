import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  ApiProtectedAuthOperation,
  ApiPublicOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import {
  QuestionResponseDto,
  QuestionWithProductResponseDto,
} from '../dto/question-response.dto';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { AnswerQuestionDto } from '../dto/answer-question.dto';

// ============== Admin Decorators ==============

export const ApiGetQuestions = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get all questions (Admin)',
      description: 'Retrieve all questions with filtering and pagination',
      roles: [RolesLevel.MANAGER],
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
      name: 'productId',
      type: String,
      required: false,
      description: 'Filter by product ID',
    }),
    ApiQuery({
      name: 'userId',
      type: String,
      required: false,
      description: 'Filter by user ID',
    }),
    ApiQuery({
      name: 'status',
      enum: ['PENDING', 'ANSWERED'],
      required: false,
      description: 'Filter by status',
    }),
    ApiQuery({
      name: 'sortBy',
      enum: ['createdAt', 'updatedAt'],
      required: false,
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      enum: ['asc', 'desc'],
      required: false,
      description: 'Sort order (default: desc)',
    }),
    ApiResponse({
      status: 200,
      type: [QuestionResponseDto],
    }),
  );

export const ApiAnswerQuestion = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Answer a question (Admin)',
      description: 'Admin answers a customer question',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Question ID',
      type: String,
    }),
    ApiBody({
      type: AnswerQuestionDto,
    }),
    ApiResponse({
      status: 200,
      type: QuestionResponseDto,
    }),
  );

export const ApiUpdateAnswer = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update answer (Admin)',
      description: 'Admin updates an existing answer',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Question ID',
      type: String,
    }),
    ApiBody({
      type: AnswerQuestionDto,
    }),
    ApiResponse({
      status: 200,
      type: QuestionResponseDto,
    }),
  );

export const ApiDeleteAnswer = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete answer (Admin)',
      description: 'Admin deletes an answer from a question',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Question ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: QuestionResponseDto,
    }),
  );

export const ApiDeleteQuestionByAdmin = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete question (Admin)',
      description: 'Admin deletes any question',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Question ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Question deleted successfully',
    }),
  );

// ============== User Decorators ==============

export const ApiGetMyQuestions = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get my questions',
      description: 'Retrieve all questions created by the current user',
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
      name: 'status',
      enum: ['PENDING', 'ANSWERED'],
      required: false,
      description: 'Filter by status',
    }),
    ApiQuery({
      name: 'sortBy',
      enum: ['createdAt', 'updatedAt'],
      required: false,
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      enum: ['asc', 'desc'],
      required: false,
      description: 'Sort order (default: desc)',
    }),
    ApiResponse({
      status: 200,
      type: [QuestionResponseDto],
    }),
  );

export const ApiGetQuestion = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get question by ID',
      description: 'Retrieve a single question by its ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Question ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: QuestionWithProductResponseDto,
    }),
  );

export const ApiCreateQuestion = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create a question',
      description: 'User creates a question about a product',
    }),
    ApiBody({
      type: CreateQuestionDto,
    }),
    ApiResponse({
      status: 201,
      type: QuestionResponseDto,
    }),
  );

export const ApiUpdateQuestion = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Update my question',
      description: 'User updates their own question (only if not answered yet)',
    }),
    ApiParam({
      name: 'id',
      description: 'Question ID',
      type: String,
    }),
    ApiBody({
      type: UpdateQuestionDto,
    }),
    ApiResponse({
      status: 200,
      type: QuestionResponseDto,
    }),
  );

export const ApiDeleteQuestion = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Delete my question',
      description: 'User deletes their own question',
    }),
    ApiParam({
      name: 'id',
      description: 'Question ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Question deleted successfully',
    }),
  );

// ============== Public Decorators ==============

export const ApiGetPublicProductQuestions = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get public product questions',
      description:
        'Retrieve answered and public questions for a product (no authentication required)',
    }),
    ApiParam({
      name: 'productId',
      description: 'Product ID',
      type: String,
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
      name: 'status',
      enum: ['PENDING', 'ANSWERED'],
      required: false,
      description: 'Filter by status',
    }),
    ApiQuery({
      name: 'sortBy',
      enum: ['createdAt', 'updatedAt'],
      required: false,
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      enum: ['asc', 'desc'],
      required: false,
      description: 'Sort order (default: desc)',
    }),
    ApiResponse({
      status: 200,
      type: [QuestionResponseDto],
    }),
  );
