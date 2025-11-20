import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { MediaType } from 'prisma/generated/prisma/client';
import { FileValidationUtil } from '../utils/file-validation.util';
import { configData } from 'src/configs/configuration';

/**
 * NestJS Pipe for validating uploaded files
 * Can be used as a route-level or parameter-level pipe
 */
@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly options: {
      type: MediaType;
      maxSize?: number;
      validateSignature?: boolean;
    },
  ) {}

  async transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    const isImage = this.isImageType(this.options.type);
    const isVideo = this.isVideoType(this.options.type);

    const maxSize =
      this.options.maxSize ||
      (isImage ? configData.S3_MAX_IMAGE_SIZE : configData.S3_MAX_VIDEO_SIZE);

    await FileValidationUtil.validateFile(file, {
      allowedTypes: isImage ? 'image' : isVideo ? 'video' : 'both',
      maxSize,
      validateSignature: this.options.validateSignature ?? true,
    });

    return file;
  }

  private isImageType(type: MediaType): boolean {
    const imageTypes: MediaType[] = [
      MediaType.PRODUCT_IMAGE,
      MediaType.REVIEW_IMAGE,
      MediaType.AVATAR,
      MediaType.CATEGORY_IMAGE,
      MediaType.BRAND_LOGO,
    ];
    return imageTypes.includes(type);
  }

  private isVideoType(type: MediaType): boolean {
    const videoTypes: MediaType[] = [
      MediaType.PRODUCT_VIDEO,
      MediaType.REVIEW_VIDEO,
    ];
    return videoTypes.includes(type);
  }
}
