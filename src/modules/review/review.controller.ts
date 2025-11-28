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
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReviewService, GetReviewsParams } from './review.service';
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
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiAddReviewImage,
  ApiApproveReview,
  ApiCreateReview,
  ApiDeleteReview,
  ApiDeleteReviewImage,
  ApiGetReview,
  ApiGetReviewImages,
  ApiGetReviews,
  ApiUpdateReview,
  ApiUploadReviewImage,
  ApiUploadReviewVideo,
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
}
