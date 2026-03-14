import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReviewService, GetReviewsParams } from './review.service';
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
  CreateReviewReplyDto,
  UpdateReviewReplyDto,
  ReviewReplyResponseDto,
} from './dto/review-reply.dto';
import {
  ReviewSummaryResponseDto,
  MarkHelpfulResponseDto,
} from './dto/review-summary.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiAddReviewImage,
  ApiApproveReview,
  ApiCreateReview,
  ApiCreateReviewWithImages,
  ApiDeleteReview,
  ApiDeleteReviewImage,
  ApiGetReview,
  ApiGetReviewImages,
  ApiGetReviews,
  ApiUpdateReview,
  ApiUploadReviewImage,
  ApiUploadReviewVideo,
  ApiGetPublicReviews,
  ApiGetPublicReview,
  ApiGetReviewSummary,
  ApiGetMyReviews,
  ApiMarkHelpful,
  ApiUnmarkHelpful,
  ApiGetReplies,
  ApiCreateReply,
  ApiUpdateReply,
  ApiDeleteReply,
  ApiGetPendingReviews,
  ApiAdminReply,
  ApiAdminDeleteReview,
} from './decorators/review.decorators';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { normalizePaginationParams } from 'src/libs/utils/utils';

@ApiTags('Review Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiGetReviews()
  getReviews(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('productId') productId?: string,
    @Query('userId') userId?: string,
    @Query('rating') rating?: number,
    @Query('isApproved') isApproved?: string,
    @Query('sortBy') sortBy?: 'rating' | 'helpfulCount' | 'createdAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<ReviewResponseDto>> {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });

    const params: GetReviewsParams = {
      page: normalizedPage,
      limit: normalizedLimit,
      productId,
      userId,
      rating: rating ? Number(rating) : undefined,
      isApproved: isApproved !== undefined ? isApproved === 'true' : undefined,
      sortBy,
      order,
    };

    return this.reviewService.getProductReviews(params);
  }

  @Get(':id')
  @ApiGetReview()
  getReview(
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<ReviewWithProductResponseDto>> {
    return this.reviewService.getReviewById(reviewId);
  }

  @Post()
  @ApiCreateReview()
  createReview(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    return this.reviewService.createReview(
      decodedAccessToken.userId,
      createReviewDto,
    );
  }

  /**
   * Create review with images upload (multipart/form-data)
   * Uses ApiProtectedAuthOperation for authentication
   */
  @Post('with-images')
  @UseInterceptors(FilesInterceptor('images', 5))
  @ApiCreateReviewWithImages()
  createReviewWithImages(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() createReviewDto: CreateReviewWithImagesDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    return this.reviewService.createReviewWithImages(
      decodedAccessToken.userId,
      createReviewDto,
      files || [],
    );
  }

  @Patch(':id')
  @ApiUpdateReview()
  updateReview(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    return this.reviewService.updateReview(
      decodedAccessToken.userId,
      reviewId,
      updateReviewDto,
    );
  }

  @Delete(':id')
  @ApiDeleteReview()
  deleteReview(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.reviewService.deleteReview(decodedAccessToken.userId, reviewId);
  }

  // ============== Review Image Routes ==============

  @Get(':id/images')
  @ApiGetReviewImages()
  getReviewImages(
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto[]>> {
    return this.reviewService.getReviewImages(reviewId);
  }

  @Post(':id/images')
  @ApiAddReviewImage()
  addReviewImage(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
    @Body() addReviewImageDto: AddReviewImageDto,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto>> {
    return this.reviewService.addReviewImage(
      decodedAccessToken.userId,
      reviewId,
      addReviewImageDto,
    );
  }

  @Delete(':id/images/:imageId')
  @ApiDeleteReviewImage()
  deleteReviewImage(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
    @Param('imageId') imageId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.reviewService.deleteReviewImage(
      decodedAccessToken.userId,
      reviewId,
      imageId,
    );
  }

  // ============== Admin Routes ==============

  @Patch(':id/approve')
  @ApiApproveReview()
  approveReview(
    @Param('id') reviewId: string,
    @Query('isApproved') isApproved: string,
  ): Promise<IBeforeTransformResponseType<ReviewResponseDto>> {
    return this.reviewService.approveReview(reviewId, isApproved === 'true');
  }

  // ============== Upload Routes ==============

  @Post(':id/upload/image')
  @ApiUploadReviewImage()
  uploadReviewImage(
    @Param('id') reviewId: string,
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body('alt') alt?: string,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto>> {
    return this.reviewService.uploadReviewImage(
      decodedAccessToken.userId,
      reviewId,
      file,
      alt,
    );
  }

  @Post(':id/upload/video')
  @ApiUploadReviewVideo()
  uploadReviewVideo(
    @Param('id') reviewId: string,
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body('alt') alt?: string,
  ): Promise<IBeforeTransformResponseType<ReviewImageResponseDto>> {
    return this.reviewService.uploadReviewVideo(
      decodedAccessToken.userId,
      reviewId,
      file,
      alt,
    );
  }

  // ============== Public Routes ==============

  @Get('public/product/:productId')
  @ApiGetPublicReviews()
  getPublicProductReviews(
    @Param('productId') productId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('rating') rating?: number,
    @Query('sortBy') sortBy?: 'rating' | 'helpfulCount' | 'createdAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<ReviewResponseDto>> {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });

    return this.reviewService.getPublicProductReviews(productId, {
      page: normalizedPage,
      limit: normalizedLimit,
      rating: rating ? Number(rating) : undefined,
      sortBy,
      order,
    });
  }

  @Get('public/product/:productId/summary')
  @ApiGetReviewSummary()
  getProductReviewSummary(
    @Param('productId') productId: string,
  ): Promise<IBeforeTransformResponseType<ReviewSummaryResponseDto>> {
    return this.reviewService.getProductReviewSummary(productId);
  }

  @Get('public/:id')
  @ApiGetPublicReview()
  getPublicReviewById(
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<ReviewWithProductResponseDto>> {
    return this.reviewService.getPublicReviewById(reviewId);
  }

  // ============== User Routes ==============

  @Get('my-reviews')
  @ApiGetMyReviews()
  getMyReviews(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: 'rating' | 'helpfulCount' | 'createdAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<
    IBeforeTransformPaginationResponseType<ReviewWithProductResponseDto>
  > {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });

    return this.reviewService.getMyReviews(decodedAccessToken.userId, {
      page: normalizedPage,
      limit: normalizedLimit,
      sortBy,
      order,
    });
  }

  @Post(':id/helpful')
  @ApiMarkHelpful()
  markHelpful(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<MarkHelpfulResponseDto>> {
    return this.reviewService.markHelpful(
      decodedAccessToken.userId,
      reviewId,
      true,
    );
  }

  @Delete(':id/helpful')
  @ApiUnmarkHelpful()
  unmarkHelpful(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<MarkHelpfulResponseDto>> {
    return this.reviewService.unmarkHelpful(
      decodedAccessToken.userId,
      reviewId,
    );
  }

  // ============== Reply Routes ==============

  @Get(':id/replies')
  @ApiGetReplies()
  getReviewReplies(
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<ReviewReplyResponseDto[]>> {
    return this.reviewService.getReviewReplies(reviewId);
  }

  @Post(':id/reply')
  @ApiCreateReply()
  createReply(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
    @Body() dto: CreateReviewReplyDto,
  ): Promise<IBeforeTransformResponseType<ReviewReplyResponseDto>> {
    return this.reviewService.createReply(
      decodedAccessToken.userId,
      reviewId,
      dto,
    );
  }

  @Patch('reply/:replyId')
  @ApiUpdateReply()
  updateReply(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('replyId') replyId: string,
    @Body() dto: UpdateReviewReplyDto,
  ): Promise<IBeforeTransformResponseType<ReviewReplyResponseDto>> {
    return this.reviewService.updateReply(
      decodedAccessToken.userId,
      replyId,
      dto,
    );
  }

  @Delete('reply/:replyId')
  @ApiDeleteReply()
  deleteReply(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('replyId') replyId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.reviewService.deleteReply(decodedAccessToken.userId, replyId);
  }

  // ============== Admin Routes ==============

  @Get('admin/pending')
  @ApiGetPendingReviews()
  getPendingReviews(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: 'rating' | 'helpfulCount' | 'createdAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<
    IBeforeTransformPaginationResponseType<ReviewWithProductResponseDto>
  > {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });

    return this.reviewService.getPendingReviews({
      page: normalizedPage,
      limit: normalizedLimit,
      sortBy,
      order,
    });
  }

  @Post(':id/admin-reply')
  @ApiAdminReply()
  adminReply(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('id') reviewId: string,
    @Body() dto: CreateReviewReplyDto,
  ): Promise<IBeforeTransformResponseType<ReviewReplyResponseDto>> {
    return this.reviewService.adminReply(
      decodedAccessToken.userId,
      reviewId,
      dto,
    );
  }

  @Delete(':id/admin')
  @ApiAdminDeleteReview()
  adminDeleteReview(
    @Param('id') reviewId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.reviewService.adminDeleteReview(reviewId);
  }
}
