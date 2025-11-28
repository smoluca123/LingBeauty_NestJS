import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { configData } from 'src/configs/configuration';
import { MediaType } from 'prisma/generated/prisma/client';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import {
  UploadFileResult,
  UploadToS3Params,
  DeleteFromS3Params,
} from './interfaces/storage.interface';
import { FileValidationUtil } from './utils/file-validation.util';
import { mediaSelect } from 'src/libs/prisma/media-select';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly publicDir: string;
  private readonly publicPathPrefix: string;
  private readonly domain: string;

  constructor(private readonly prismaService: PrismaService) {
    // Initialize S3 client
    this.s3Client = new S3Client({
      region: configData.S3_REGION,
      endpoint: configData.S3_ENDPOINT,
      credentials: {
        accessKeyId: configData.S3_ACCESS_KEY_ID,
        secretAccessKey: configData.S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true, // Important for Storj compatibility
    });

    this.bucketName = configData.S3_BUCKET_NAME;
    this.publicDir = configData.S3_PUBLIC_DIR;
    this.publicPathPrefix = configData.S3_PUBLIC_PATH_PREFIX;
    this.domain = configData.S3_DOMAIN;
  }

  /**
   * Upload file to Storj S3 and create Media record
   */
  async uploadFile(
    params: UploadToS3Params,
    options: {
      getDirectUrl?: boolean;
    } = {
      getDirectUrl: false,
    },
  ): Promise<MediaResponseDto> {
    const { file, type, userId } = params;

    // Validate file based on type (comprehensive validation)
    await this.validateFile(file, type);

    // Generate unique filename to prevent conflicts and path traversal
    const uniqueFilename = FileValidationUtil.generateUniqueFilename(
      file.originalname,
    );

    // Construct S3 key
    const key = this.constructS3Key(type, uniqueFilename);

    try {
      // Upload to S3
      const uploadResult = await this.uploadToS3(file, key);

      const url = options.getDirectUrl
        ? uploadResult.url + '?wrap=0'
        : uploadResult.url;

      // Create Media record in database
      const media = await this.prismaService.media.create({
        data: {
          url: url,
          key: uploadResult.key,
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          type,
          uploadedById: userId,
        },
        select: mediaSelect,
      });

      const responseData = toResponseDto(MediaResponseDto, media);

      return responseData;
    } catch (error) {
      throw new BusinessException(
        `Failed to upload file: ${error.message}`,
        ERROR_CODES.UPLOAD_FAILED,
      );
    }
  }

  /**
   * Delete file from S3 and soft delete Media record
   */
  async deleteFile(mediaId: string): Promise<{ message: string }> {
    // Find media record
    const media = await this.prismaService.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new BusinessException(
        'Media not found',
        ERROR_CODES.MEDIA_NOT_FOUND,
      );
    }

    if (media.isDeleted) {
      throw new BusinessException(
        'Media already deleted',
        ERROR_CODES.MEDIA_NOT_FOUND,
      );
    }

    try {
      // Delete from S3
      await this.deleteFromS3({ key: media.key });

      // Soft delete in database
      await this.prismaService.media.delete({
        where: { id: mediaId },
      });

      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new BusinessException(
        `Failed to delete file: ${error.message}`,
        ERROR_CODES.DELETE_FILE_FAILED,
      );
    }
  }

  /**
   * Get media by ID
   */
  async getMediaById(mediaId: string) {
    const media = await this.prismaService.media.findUnique({
      where: { id: mediaId, isDeleted: false },
    });

    if (!media) {
      throw new BusinessException(
        'Media not found',
        ERROR_CODES.MEDIA_NOT_FOUND,
      );
    }

    return media;
  }

  /**
   * Upload file buffer to S3
   */
  private async uploadToS3(
    file: Express.Multer.File,
    key: string,
  ): Promise<UploadFileResult> {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await upload.done();

    // Construct public URL
    const url = `${this.domain}/${key}`;

    return {
      url,
      key,
      size: file.size,
      mimetype: file.mimetype,
      filename: file.originalname,
    };
  }

  /**
   * Delete file from S3
   */
  private async deleteFromS3(params: DeleteFromS3Params): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: params.key,
    });

    await this.s3Client.send(command);
  }

  /**
   * Validate file based on media type
   * Implements comprehensive multi-layer validation:
   * 1. MIME type validation
   * 2. File size validation
   * 3. File extension validation
   * 4. File signature validation (magic numbers) - prevents MIME type spoofing
   */
  private async validateFile(
    file: Express.Multer.File,
    type: MediaType,
  ): Promise<void> {
    const imageTypes: MediaType[] = [
      MediaType.PRODUCT_IMAGE,
      MediaType.REVIEW_IMAGE,
      MediaType.AVATAR,
      MediaType.CATEGORY_IMAGE,
      MediaType.BRAND_LOGO,
    ];

    const videoTypes: MediaType[] = [
      MediaType.PRODUCT_VIDEO,
      MediaType.REVIEW_VIDEO,
    ];

    // Determine allowed type and max size based on media type
    let allowedTypes: 'image' | 'video' | 'both';
    let maxSize: number;

    if (imageTypes.includes(type)) {
      allowedTypes = 'image';
      maxSize = configData.S3_MAX_IMAGE_SIZE;
    } else if (videoTypes.includes(type)) {
      allowedTypes = 'video';
      maxSize = configData.S3_MAX_VIDEO_SIZE;
    } else {
      allowedTypes = 'both';
      maxSize = Math.max(
        configData.S3_MAX_IMAGE_SIZE,
        configData.S3_MAX_VIDEO_SIZE,
      );
    }

    // Comprehensive validation with all security checks
    await FileValidationUtil.validateFile(file, {
      allowedTypes,
      maxSize,
      validateSignature: true, // Enable file signature validation for security
    });
  }

  /**
   * Construct S3 key based on media type
   */
  private constructS3Key(type: MediaType, filename: string): string {
    const typeMap: Record<MediaType, string> = {
      [MediaType.PRODUCT_IMAGE]: 'products/images',
      [MediaType.PRODUCT_VIDEO]: 'products/videos',
      [MediaType.REVIEW_IMAGE]: 'reviews/images',
      [MediaType.REVIEW_VIDEO]: 'reviews/videos',
      [MediaType.AVATAR]: 'avatars',
      [MediaType.CATEGORY_IMAGE]: 'categories',
      [MediaType.BRAND_LOGO]: 'brands',
    };

    const folder = typeMap[type] || 'misc';
    return `${this.publicDir}/${folder}/${filename}`;
  }
}
