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
import { ProductStatsService } from 'src/modules/product/product-stats.service';
import { StatsService } from 'src/modules/stats/stats.service';
import {
  CreateReviewDto,
  CreateReviewWithImagesDto,
} from './dto/create-review.dto';

import { UpdateReviewDto } from './dto/update-review.dto';
import {
  AddReviewImageDto,
  ReviewImageResponseDto,
} from './dto/review-image.dto';
import {
  ReviewResponseDto,
  ReviewWithProductResponseDto,
} from './dto/review-response.dto';
import {
  reviewSelect,
  reviewWithProductSelect,
} from 'src/libs/prisma/review-select';
import {
  toResponseDto,
  toResponseDtoArray,
} from 'src/libs/utils/transform.utils';

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
    private readonly productStatsService: ProductStatsService,
    private readonly statsService: StatsService,
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

      const reviewResponses = toResponseDtoArray(ReviewResponseDto, reviews);

      return {
        type: 'pagination',
        message: 'Lấy danh sách đánh giá thành công',
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
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
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

      const result = toResponseDto(ReviewWithProductResponseDto, review);

      return {
        type: 'response',
        message: 'Lấy thông tin đánh giá thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
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
            ERROR_MESSAGES[ERROR_CODES.MEDIA_NOT_FOUND],
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
          reviewImages:
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

      const result = toResponseDto(ReviewResponseDto, review);

      // Fire-and-forget: update daily stats after review created
      this.statsService.onReviewCreated().catch((err) => {
        console.error('Failed to update stats after review created:', err);
      });

      return {
        type: 'response',
        message: 'Tạo đánh giá thành công',
        data: result,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Create review with uploaded images (multipart/form-data)
   * Atomic operation: creates review + uploads images in one request
   */
  async createReviewWithImages(
    userId: string,
    dto: CreateReviewWithImagesDto,
    files: Express.Multer.File[],
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
      // Validate file count
      if (files && files.length > 5) {
        throw new BusinessException(
          'Maximum 5 images allowed per review',
          ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED,
        );
      }
      // Upload images and get media IDs
      const uploadedMediaIds: string[] = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const uploadResult = await this.storageService.uploadFile({
            file,
            type: MediaType.REVIEW_IMAGE,
            userId,
          });
          uploadedMediaIds.push(uploadResult.id);
        }
      }
      // Create review with images
      const review = await this.prismaService.productReview.create({
        data: {
          productId: dto.productId,
          userId,
          rating: dto.rating,
          title: dto.title,
          comment: dto.comment,
          reviewImages:
            uploadedMediaIds.length > 0
              ? {
                  create: uploadedMediaIds.map((mediaId) => ({
                    mediaId,
                  })),
                }
              : undefined,
        },
        select: reviewSelect,
      });

      const result = toResponseDto(ReviewResponseDto, review);

      return {
        type: 'response',
        message: 'Tạo đánh giá thành công',
        data: result,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateReview(
    userId: string,
    reviewId: string,
    dto: UpdateReviewDto,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    let productIdToSync: string | null = null;
    try {
      const existingReview = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true, productId: true },
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

      productIdToSync = existingReview.productId;

      const updated = await this.prismaService.productReview.update({
        where: { id: reviewId },
        data: {
          ...(dto.rating !== undefined && { rating: dto.rating }),
          ...(dto.title !== undefined && { title: dto.title }),
          ...(dto.comment !== undefined && { comment: dto.comment }),
        },
        select: reviewSelect,
      });

      const result = toResponseDto(ReviewResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật đánh giá thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    } finally {
      // Auto sync product stats after review updated (rating might have changed)
      if (dto.rating !== undefined && productIdToSync) {
        this.productStatsService
          .onReviewChange(productIdToSync)
          .catch((err) => {
            console.error(
              'Failed to sync product stats after review updated:',
              err,
            );
          });
      }
    }
  }

  async deleteReview(
    userId: string,
    reviewId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    let productIdToSync: string | null = null;
    try {
      const existingReview = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, userId: true, productId: true },
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

      productIdToSync = existingReview.productId;

      await this.prismaService.productReview.delete({
        where: { id: reviewId },
      });

      return {
        type: 'response',
        message: 'Xóa đánh giá thành công',
        data: { message: 'Xóa đánh giá thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    } finally {
      // Auto sync product stats after review deleted
      if (productIdToSync) {
        this.productStatsService
          .onReviewChange(productIdToSync)
          .catch((err) => {
            console.error(
              'Failed to sync product stats after review deleted:',
              err,
            );
          });
      }
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
        message: 'Thêm ảnh đánh giá thành công',
        data: reviewImage,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
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
        message: 'Xóa ảnh đánh giá thành công',
        data: { message: 'Xóa ảnh đánh giá thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
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
        message: 'Lấy danh sách ảnh đánh giá thành công',
        data: images,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Admin Methods ==============

  async approveReview(
    reviewId: string,
    isApproved: boolean,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    let productId: string | null = null;
    try {
      const existingReview = await this.prismaService.productReview.findUnique({
        where: { id: reviewId },
        select: { id: true, productId: true },
      });

      if (!existingReview) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.REVIEW_NOT_FOUND],
          ERROR_CODES.REVIEW_NOT_FOUND,
        );
      }

      productId = existingReview.productId;

      const updated = await this.prismaService.productReview.update({
        where: { id: reviewId },
        data: { isApproved },
        select: reviewSelect,
      });

      const result = toResponseDto(ReviewResponseDto, updated);

      return {
        type: 'response',
        message: `Đánh giá đã được ${isApproved ? 'phê duyệt' : 'từ chối'} thành công`,
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    } finally {
      // Auto sync product stats after review approved/rejected
      // This affects avgRating since only approved reviews count
      if (productId) {
        this.productStatsService.onReviewChange(productId).catch((err) => {
          console.error(
            'Failed to sync product stats after review approval change:',
            err,
          );
        });
      }
      // Update admin daily stats when review is approved
      if (isApproved && productId) {
        this.statsService.onReviewApproved().catch((err) => {
          console.error('Failed to update stats after review approved:', err);
        });
      }
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
        message: 'Tải ảnh đánh giá lên thành công',
        data: reviewImage,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
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
        message: 'Tải video đánh giá lên thành công',
        data: reviewImage,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
