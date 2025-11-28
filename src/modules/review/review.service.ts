import { Injectable } from '@nestjs/common';
import { MediaType } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StorageService } from 'src/modules/storage/storage.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  AddReviewImageDto,
  ReviewImageResponseDto,
} from './dto/review-image.dto';
import {
  ReviewResponseDto,
  ReviewWithProductResponseDto,
} from './dto/review-response.dto';

const reviewSelect = {
  id: true,
  productId: true,
  userId: true,
  rating: true,
  title: true,
  comment: true,
  isVerified: true,
  isApproved: true,
  helpfulCount: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      fullName: true,
      avatarMedia: {
        select: {
          url: true,
        },
      },
    },
  },
  images: {
    select: {
      id: true,
      alt: true,
      media: {
        select: {
          id: true,
          url: true,
          mimetype: true,
        },
      },
    },
  },
};

const reviewWithProductSelect = {
  ...reviewSelect,
  product: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
};

export interface GetReviewsParams {
  page?: number;
  limit?: number;
  productId?: string;
  userId?: string;
  rating?: number;
  isApproved?: boolean;
  sortBy?: 'rating' | 'helpfulCount' | 'createdAt';
  order?: 'asc' | 'desc';
}

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async getProductReviews(
    params: GetReviewsParams,
  ): Promise<IBeforeTransformPaginationResponseType<ReviewResponseDto>> {
    const {
      page = 1,
      limit = 10,
      productId,
      userId,
      rating,
      isApproved,
      sortBy = 'createdAt',
      order = 'desc',
    } = params;

    try {
      const whereQuery = {
        ...(productId && { productId }),
        ...(userId && { userId }),
        ...(rating && { rating }),
        ...(isApproved !== undefined && { isApproved }),
      };

      const [reviews, totalCount] = await Promise.all([
        this.prismaService.productReview.findMany({
          where: whereQuery,
          select: reviewSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.productReview.count({
          where: whereQuery,
        }),
      ]);

      const reviewResponses = reviews.map((review) =>
        this.mapReviewEntity(review),
      );

      return {
        type: 'pagination',
        message: 'Reviews retrieved successfully',
        data: {
          items: reviewResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to get reviews',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getReviewById(
    reviewId: string,
  ): Promise<IBeforeTransformResponseType<ReviewWithProductResponseDto>> {
    try {
      const review = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: reviewWithProductSelect,
      });

      if (!review) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      return {
        type: 'response',
        message: 'Review retrieved successfully',
        data: this.mapReviewWithProductEntity(review),
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to get review',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createReview(
    userId: string,
    dto: CreateReviewDto,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: dto.productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Check if user already reviewed this product
      const existingReview = await this.prismaService.productReview.findUnique({
        where: {
          productId_userId: {
            productId: dto.productId,
            userId,
          },
        },
        select: { id: true },
      });

      if (existingReview) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_ALREADY_EXISTS],
          ERROR_CODES.REVIEW_ALREADY_EXISTS,
        );
      }

      // Validate media IDs if provided
      if (dto.mediaIds && dto.mediaIds.length > 0) {
        const mediaRecords = await this.prismaService.media.findMany({
          where: {
            id: { in: dto.mediaIds },
            type: { in: [MediaType.REVIEW_IMAGE, MediaType.REVIEW_VIDEO] },
          },
          select: { id: true },
        });

        if (mediaRecords.length !== dto.mediaIds.length) {
          throw new BusinessException(
            'One or more media IDs are invalid',
            ERROR_CODES.MEDIA_NOT_FOUND,
          );
        }
      }

      const review = await this.prismaService.productReview.create({
        data: {
          productId: dto.productId,
          userId,
          rating: dto.rating,
          title: dto.title,
          comment: dto.comment,
          images:
            dto.mediaIds && dto.mediaIds.length > 0
              ? {
                  create: dto.mediaIds.map((mediaId) => ({
                    mediaId,
                  })),
                }
              : undefined,
        },
        select: reviewSelect,
      });

      return {
        type: 'response',
        message: 'Review created successfully',
        data: this.mapReviewEntity(review),
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to create review',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateReview(
    userId: string,
    reviewId: string,
    dto: UpdateReviewDto,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    try {
      const existingReview = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true },
      });

      if (!existingReview) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      if (existingReview.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_OWNED],
          ERROR_CODES.REVIEW_NOT_OWNED,
        );
      }

      const updated = await this.prismaService.productReview.update({
        where: { id: reviewId },
        data: {
          ...(dto.rating !== undefined && { rating: dto.rating }),
          ...(dto.title !== undefined && { title: dto.title }),
          ...(dto.comment !== undefined && { comment: dto.comment }),
        },
        select: reviewSelect,
      });

      return {
        type: 'response',
        message: 'Review updated successfully',
        data: this.mapReviewEntity(updated),
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to update review',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteReview(
    userId: string,
    reviewId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existingReview = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true },
      });

      if (!existingReview) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      if (existingReview.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_OWNED],
          ERROR_CODES.REVIEW_NOT_OWNED,
        );
      }

      await this.prismaService.productReview.delete({
        where: { id: reviewId },
      });

      return {
        type: 'response',
        message: 'Review deleted successfully',
        data: { message: 'Review deleted successfully' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to delete review',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Review Image Methods ==============

  async addReviewImage(
    userId: string,
    reviewId: string,
    dto: AddReviewImageDto,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto>> {
    try {
      // Check if review exists and belongs to user
      const review = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true },
      });

      if (!review) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      if (review.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_OWNED],
          ERROR_CODES.REVIEW_NOT_OWNED,
        );
      }

      // Check if media exists
      const media = await this.prismaService.media.findUnique({
        where: { id: dto.mediaId },
        select: { id: true, type: true },
      });

      if (!media) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.MEDIA_NOT_FOUND],
          ERROR_CODES.MEDIA_NOT_FOUND,
        );
      }

      // Check image count limit (max 5)
      const imageCount = await this.prismaService.reviewImage.count({
        where: { reviewId },
      });

      if (imageCount >= 5) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED],
          ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED,
        );
      }

      const reviewImage = await this.prismaService.reviewImage.create({
        data: {
          reviewId,
          mediaId: dto.mediaId,
          alt: dto.alt,
        },
        select: {
          id: true,
          reviewId: true,
          mediaId: true,
          alt: true,
          media: {
            select: {
              id: true,
              url: true,
              mimetype: true,
            },
          },
        },
      });

      return {
        type: 'response',
        message: 'Review image added successfully',
        data: reviewImage,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to add review image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteReviewImage(
    userId: string,
    reviewId: string,
    imageId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Check if review exists and belongs to user
      const review = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true },
      });

      if (!review) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      if (review.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_OWNED],
          ERROR_CODES.REVIEW_NOT_OWNED,
        );
      }

      // Check if image exists
      const image = await this.prismaService.reviewImage.findFirst({
        where: { id: imageId, reviewId },
        select: { id: true },
      });

      if (!image) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_IMAGE_NOT_FOUND],
          ERROR_CODES.REVIEW_IMAGE_NOT_FOUND,
        );
      }

      await this.prismaService.reviewImage.delete({
        where: { id: imageId },
      });

      return {
        type: 'response',
        message: 'Review image deleted successfully',
        data: { message: 'Review image deleted successfully' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to delete review image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getReviewImages(
    reviewId: string,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto[]>> {
    try {
      const review = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true },
      });

      if (!review) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      const images = await this.prismaService.reviewImage.findMany({
        where: { reviewId },
        select: {
          id: true,
          reviewId: true,
          mediaId: true,
          alt: true,
          media: {
            select: {
              id: true,
              url: true,
              mimetype: true,
            },
          },
        },
      });

      return {
        type: 'response',
        message: 'Review images retrieved successfully',
        data: images,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to get review images',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Admin Methods ==============

  async approveReview(
    reviewId: string,
    isApproved: boolean,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    try {
      const existingReview = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true },
      });

      if (!existingReview) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      const updated = await this.prismaService.productReview.update({
        where: { id: reviewId },
        data: { isApproved },
        select: reviewSelect,
      });

      return {
        type: 'response',
        message: `Review ${isApproved ? 'approved' : 'rejected'} successfully`,
        data: this.mapReviewEntity(updated),
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to update review status',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Upload Methods ==============

  async uploadReviewImage(
    userId: string,
    reviewId: string,
    file: Express.Multer.File,
    alt?: string,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto>> {
    try {
      // Check if review exists and belongs to user
      const review = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true },
      });

      if (!review) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      if (review.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_OWNED],
          ERROR_CODES.REVIEW_NOT_OWNED,
        );
      }

      // Check image count limit (max 5)
      const imageCount = await this.prismaService.reviewImage.count({
        where: { reviewId },
      });

      if (imageCount >= 5) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED],
          ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED,
        );
      }

      // Upload file to storage
      const uploadResult = await this.storageService.uploadFile({
        file,
        type: MediaType.REVIEW_IMAGE,
        userId,
      });

      // Create review image record
      const reviewImage = await this.prismaService.reviewImage.create({
        data: {
          reviewId,
          mediaId: uploadResult.id,
          alt,
        },
        select: {
          id: true,
          reviewId: true,
          mediaId: true,
          alt: true,
          media: {
            select: {
              id: true,
              url: true,
              mimetype: true,
            },
          },
        },
      });

      return {
        type: 'response',
        message: 'Review image uploaded successfully',
        data: reviewImage,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to upload review image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async uploadReviewVideo(
    userId: string,
    reviewId: string,
    file: Express.Multer.File,
    alt?: string,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto>> {
    try {
      // Check if review exists and belongs to user
      const review = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true },
      });

      if (!review) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      if (review.userId !== userId) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_OWNED],
          ERROR_CODES.REVIEW_NOT_OWNED,
        );
      }

      // Check media count limit (max 5)
      const imageCount = await this.prismaService.reviewImage.count({
        where: { reviewId },
      });

      if (imageCount >= 5) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED],
          ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED,
        );
      }

      // Upload file to storage
      const uploadResult = await this.storageService.uploadFile({
        file,
        type: MediaType.REVIEW_VIDEO,
        userId,
      });

      // Create review image record (videos stored same as images)
      const reviewImage = await this.prismaService.reviewImage.create({
        data: {
          reviewId,
          mediaId: uploadResult.id,
          alt,
        },
        select: {
          id: true,
          reviewId: true,
          mediaId: true,
          alt: true,
          media: {
            select: {
              id: true,
              url: true,
              mimetype: true,
            },
          },
        },
      });

      return {
        type: 'response',
        message: 'Review video uploaded successfully',
        data: reviewImage,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to upload review video',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  private mapReviewEntity(review: any): ReviewResponseDto {
    return {
      ...review,
      user: {
        id: review.user.id,
        fullName: review.user.fullName,
        avatarUrl: review.user.avatarMedia?.url || null,
      },
    };
  }

  private mapReviewWithProductEntity(
    review: any,
  ): ReviewWithProductResponseDto {
    return {
      ...review,
      user: {
        id: review.user.id,
        fullName: review.user.fullName,
        avatarUrl: review.user.avatarMedia?.url || null,
      },
    };
  }
}
