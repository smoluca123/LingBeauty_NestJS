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
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import {
  ReviewResponseDto,
  ReviewWithProductResponseDto,
} from '../dto/review-response.dto';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import {
  AddReviewImageDto,
  ReviewImageResponseDto,
  UploadReviewImageDto,
  UploadReviewVideoDto,
} from '../dto/review-image.dto';
import {
  CreateReviewReplyDto,
  UpdateReviewReplyDto,
  ReviewReplyResponseDto,
} from '../dto/review-reply.dto';
import {
  ReviewSummaryResponseDto,
  MarkHelpfulResponseDto,
} from '../dto/review-summary.dto';
import { FileValidationInterceptor } from 'src/modules/storage/interceptors/file-validation.interceptor';
import { MediaType } from 'prisma/generated/prisma/client';

export const ApiGetReviews = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get product reviews',
      description: 'Retrieve reviews with filtering and pagination',
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
      name: 'rating',
      type: Number,
      required: false,
      description: 'Filter by exact rating (1-5)',
    }),
    ApiQuery({
      name: 'isApproved',
      type: Boolean,
      required: false,
      description: 'Filter by approval status',
    }),
    ApiQuery({
      name: 'sortBy',
      type: String,
      required: false,
      enum: ['rating', 'helpfulCount', 'createdAt'],
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order (default: desc)',
    }),
    ApiResponse({
      status: 200,
      type: [ReviewResponseDto],
    }),
  );

export const ApiGetReview = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get review by ID',
      description: 'Retrieve a single review by its ID',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: ReviewWithProductResponseDto,
    }),
  );

export const ApiCreateReview = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create a review',
      description: 'Create a new product review with optional images',
    }),
    ApiBody({
      type: CreateReviewDto,
    }),
    ApiResponse({
      status: 201,
      type: ReviewResponseDto,
    }),
  );

export const ApiCreateReviewWithImages = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create review with images',
      description:
        'Create a new product review with up to 5 images uploaded directly. Images are validated for type and size.',
    }),
    UseInterceptors(
      new FileValidationInterceptor({
        type: MediaType.REVIEW_IMAGE,
        isRequired: false,
      }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: ['productId', 'rating'],
        properties: {
          productId: {
            type: 'string',
            format: 'uuid',
            description: 'Product ID to review',
          },
          rating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            description: 'Rating from 1 to 5',
          },
          title: {
            type: 'string',
            maxLength: 255,
            description: 'Review title (optional)',
          },
          comment: {
            type: 'string',
            description: 'Review comment (optional)',
          },
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
            maxItems: 5,
            description: 'Review images (max 5, jpeg/png/webp/gif)',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      type: ReviewResponseDto,
    }),
  );

export const ApiUpdateReview = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Update a review',
      description: 'Update your own review',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiBody({
      type: UpdateReviewDto,
    }),
    ApiResponse({
      status: 200,
      type: ReviewResponseDto,
    }),
  );

export const ApiDeleteReview = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Delete a review',
      description: 'Delete your own review',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Review deleted successfully',
    }),
  );

// ============== Review Image Decorators ==============

export const ApiGetReviewImages = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get review images',
      description: 'Get all images of a review',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: [ReviewImageResponseDto],
    }),
  );

export const ApiAddReviewImage = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Add image to review',
      description: 'Add a new image to your review (max 5 images per review)',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiBody({
      type: AddReviewImageDto,
    }),
    ApiResponse({
      status: 201,
      type: ReviewImageResponseDto,
    }),
  );

export const ApiDeleteReviewImage = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Delete review image',
      description: 'Remove an image from your review',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiParam({
      name: 'imageId',
      description: 'Review Image ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Image deleted successfully',
    }),
  );

// ============== Admin Decorators ==============

export const ApiApproveReview = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Approve or reject a review',
      description: 'Admin can approve or reject a review',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiQuery({
      name: 'isApproved',
      type: Boolean,
      required: true,
      description: 'Approval status',
    }),
    ApiResponse({
      status: 200,
      type: ReviewResponseDto,
    }),
  );

// ============== Upload Decorators ==============

export const ApiUploadReviewImage = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Upload review image',
      description:
        'Upload and attach an image to your review (max 5 per review)',
    }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.REVIEW_IMAGE }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiBody({
      type: UploadReviewImageDto,
    }),
    ApiResponse({
      status: 201,
      type: ReviewImageResponseDto,
    }),
  );

export const ApiUploadReviewVideo = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Upload review video',
      description:
        'Upload and attach a video to your review (max 5 media per review)',
    }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.REVIEW_VIDEO }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiBody({
      type: UploadReviewVideoDto,
    }),
    ApiResponse({
      status: 201,
      type: ReviewImageResponseDto,
    }),
  );

// ============== Public Decorators ==============

export const ApiGetPublicReviews = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get public product reviews',
      description:
        'Retrieve approved reviews for a product (no authentication required)',
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
      name: 'rating',
      type: Number,
      required: false,
      description: 'Filter by exact rating (1-5)',
    }),
    ApiQuery({
      name: 'sortBy',
      type: String,
      required: false,
      enum: ['rating', 'helpfulCount', 'createdAt'],
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order (default: desc)',
    }),
    ApiResponse({
      status: 200,
      type: [ReviewResponseDto],
    }),
  );

export const ApiGetPublicReview = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get public review by ID',
      description:
        'Retrieve a single approved review by its ID (no authentication required)',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: ReviewWithProductResponseDto,
    }),
  );

export const ApiGetReviewSummary = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get product review summary',
      description:
        'Get review statistics for a product (average rating, distribution, etc.)',
    }),
    ApiParam({
      name: 'productId',
      description: 'Product ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: ReviewSummaryResponseDto,
    }),
  );

// ============== User Decorators ==============

export const ApiGetMyReviews = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get my reviews',
      description: 'Retrieve all reviews created by the current user',
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
      name: 'sortBy',
      type: String,
      required: false,
      enum: ['rating', 'helpfulCount', 'createdAt'],
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order (default: desc)',
    }),
    ApiQuery({
      name: 'isApproved',
      type: Boolean,
      required: false,
      description: 'Filter by approval status (default: true)',
    }),
    ApiResponse({
      status: 200,
      type: [ReviewWithProductResponseDto],
    }),
  );

export const ApiMarkHelpful = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Mark review as helpful',
      description: 'Mark a review as helpful',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: MarkHelpfulResponseDto,
    }),
  );

export const ApiUnmarkHelpful = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Unmark helpful',
      description: 'Remove helpful mark from a review',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: MarkHelpfulResponseDto,
    }),
  );

// ============== Reply Decorators ==============

export const ApiGetReplies = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get review replies',
      description: 'Get all replies for a review (no authentication required)',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
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
      name: 'sortBy',
      type: String,
      required: false,
      enum: ['createdAt'],
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order (default: asc)',
    }),
    ApiResponse({
      status: 200,
      type: [ReviewReplyResponseDto],
    }),
  );

export const ApiCreateReply = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create reply',
      description: 'Add a reply to a review',
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiBody({
      type: CreateReviewReplyDto,
    }),
    ApiResponse({
      status: 201,
      type: ReviewReplyResponseDto,
    }),
  );

export const ApiUpdateReply = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Update reply',
      description: 'Update your reply',
    }),
    ApiParam({
      name: 'replyId',
      description: 'Reply ID',
      type: String,
    }),
    ApiBody({
      type: UpdateReviewReplyDto,
    }),
    ApiResponse({
      status: 200,
      type: ReviewReplyResponseDto,
    }),
  );

export const ApiDeleteReply = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Delete reply',
      description: 'Delete your reply',
    }),
    ApiParam({
      name: 'replyId',
      description: 'Reply ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Reply deleted successfully',
    }),
  );

// ============== Admin Decorators ==============

export const ApiGetPendingReviews = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get pending reviews',
      description: 'Get all reviews waiting for approval (Admin only)',
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
      name: 'sortBy',
      type: String,
      required: false,
      enum: ['rating', 'helpfulCount', 'createdAt'],
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order (default: desc)',
    }),
    ApiResponse({
      status: 200,
      type: [ReviewWithProductResponseDto],
    }),
  );

export const ApiAdminReply = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Admin reply to review',
      description: 'Reply to a review as admin (marked as official response)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiBody({
      type: CreateReviewReplyDto,
    }),
    ApiResponse({
      status: 201,
      type: ReviewReplyResponseDto,
    }),
  );

export const ApiAdminDeleteReview = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Admin delete review',
      description: 'Delete any review (Admin only)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Review ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Review deleted successfully',
    }),
  );
