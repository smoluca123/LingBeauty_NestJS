import {
  Controller,
  Post,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { UploadResponseDto } from './dto/upload-response.dto';
import { MediaType } from 'prisma/generated/prisma/client';
import { JwtTokenVerifyGuard } from 'src/guards/jwt-token-verify.guard';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { AuthGuard } from '@nestjs/passport';
import { ApiProtectedAuthOperation } from 'src/decorators/api.decorators';
import { BaseUploadFileDto } from 'src/modules/storage/dto/upload-file.dto';
import {
  ApiUploadBrandLogo,
  ApiUploadCategoryImage,
  ApiUploadProductImage,
  ApiUploadProductVideo,
  ApiUploadReviewImage,
  ApiUploadReviewVideo,
} from 'src/modules/storage/decorators/storage.decorator';

@ApiTags('Storage')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload/product-image')
  @ApiUploadProductImage()
  async uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<UploadResponseDto>> {
    const userId = decodedAccessToken.userId;
    const result = await this.storageService.uploadFile({
      file,
      type: MediaType.PRODUCT_IMAGE,
      userId,
    });

    return {
      type: 'response',
      message: 'Product image uploaded successfully',
      data: result,
    };
  }

  @Post('upload/product-video')
  @ApiUploadProductVideo()
  async uploadProductVideo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<IBeforeTransformResponseType<UploadResponseDto>> {
    const userId = req.user?.userId;
    const result = await this.storageService.uploadFile({
      file,
      type: MediaType.PRODUCT_VIDEO,
      userId,
    });

    return {
      type: 'response',
      message: 'Product video uploaded successfully',
      data: result,
    };
  }

  @Post('upload/review-image')
  @ApiUploadReviewImage()
  async uploadReviewImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<IBeforeTransformResponseType<UploadResponseDto>> {
    const userId = req.user?.userId;
    const result = await this.storageService.uploadFile({
      file,
      type: MediaType.REVIEW_IMAGE,
      userId,
    });

    return {
      type: 'response',
      message: 'Review image uploaded successfully',
      data: result,
    };
  }

  @Post('upload/review-video')
  @ApiUploadReviewVideo()
  async uploadReviewVideo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<IBeforeTransformResponseType<UploadResponseDto>> {
    const userId = req.user?.userId;
    const result = await this.storageService.uploadFile({
      file,
      type: MediaType.REVIEW_VIDEO,
      userId,
    });

    return {
      type: 'response',
      message: 'Review video uploaded successfully',
      data: result,
    };
  }

  @Post('upload/category-image')
  @ApiUploadCategoryImage()
  async uploadCategoryImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<IBeforeTransformResponseType<UploadResponseDto>> {
    const userId = req.user?.userId;
    const result = await this.storageService.uploadFile({
      file,
      type: MediaType.CATEGORY_IMAGE,
      userId,
    });

    return {
      type: 'response',
      message: 'Category image uploaded successfully',
      data: result,
    };
  }

  @Post('upload/brand-logo')
  @ApiUploadBrandLogo()
  async uploadBrandLogo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<IBeforeTransformResponseType<UploadResponseDto>> {
    const userId = req.user?.userId;
    const result = await this.storageService.uploadFile({
      file,
      type: MediaType.BRAND_LOGO,
      userId,
    });

    return {
      type: 'response',
      message: 'Brand logo uploaded successfully',
      data: result,
    };
  }

  @Delete('delete/:mediaId')
  @ApiProtectedAuthOperation({ summary: 'Delete media file' })
  @ApiParam({
    name: 'mediaId',
    description: 'Media ID to delete',
    type: String,
  })
  async deleteFile(
    @Param('mediaId') mediaId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    const result = await this.storageService.deleteFile(mediaId);

    return {
      type: 'response',
      message: result.message,
      data: result,
    };
  }
}
