import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MediaType } from 'prisma/generated/prisma/client';
import { FileValidationUtil } from '../utils/file-validation.util';
import { configData } from 'src/configs/configuration';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';

/**
 * Interceptor for early file validation
 * Validates file before it reaches the controller
 * This provides an additional layer of security
 */
@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  constructor(
    private readonly options: {
      type: MediaType;
      maxSize?: number;
      validateSignature?: boolean;
    },
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const file: Express.Multer.File = request.file;

    if (!file) {
      throw new BusinessException(
        'No file uploaded',
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }

    // Determine validation parameters
    const isImage = this.isImageType(this.options.type);
    const isVideo = this.isVideoType(this.options.type);

    const maxSize =
      this.options.maxSize ||
      (isImage ? configData.S3_MAX_IMAGE_SIZE : configData.S3_MAX_VIDEO_SIZE);

    // Validate file
    await FileValidationUtil.validateFile(file, {
      allowedTypes: isImage ? 'image' : isVideo ? 'video' : 'both',
      maxSize,
      validateSignature: this.options.validateSignature ?? true,
    });

    return next.handle();
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
