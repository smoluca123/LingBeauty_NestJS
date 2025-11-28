import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';

export class AddProductImageDto {
  @ApiProperty({
    description: 'Media ID from uploaded file',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  mediaId: string;

  @ApiPropertyOptional({
    description: 'Variant ID (optional, for variant-specific image)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  variantId?: string;

  @ApiPropertyOptional({
    description: 'Alt text for the image',
    example: 'Product front view',
  })
  @IsString()
  @IsOptional()
  alt?: string;

  @ApiPropertyOptional({
    description: 'Sort order for display',
    example: 0,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({
    description: 'Whether this is the primary image',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UpdateProductImageDto {
  @ApiPropertyOptional({
    description: 'Alt text for the image',
    example: 'Product front view',
  })
  @IsString()
  @IsOptional()
  alt?: string;

  @ApiPropertyOptional({
    description: 'Sort order for display',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({
    description: 'Whether this is the primary image',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class ProductImageResponseDto {
  @ApiProperty({ example: 'uuid-image-id' })
  id: string;

  @ApiProperty({ example: 'uuid-product-id' })
  productId: string;

  @ApiPropertyOptional({ example: 'uuid-variant-id', nullable: true })
  variantId: string | null;

  @ApiProperty({ example: 'uuid-media-id' })
  mediaId: string;

  @ApiPropertyOptional({ example: 'Product front view', nullable: true })
  alt: string | null;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({ example: true })
  isPrimary: boolean;

  @ApiProperty({
    type: MediaResponseDto,
    description: 'Media object',
  })
  @Type(() => MediaResponseDto)
  media: MediaResponseDto;
}

export class ReorderProductImagesDto {
  @ApiProperty({
    description: 'Array of image IDs in the desired order',
    example: ['uuid-1', 'uuid-2', 'uuid-3'],
    type: [String],
  })
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  imageIds: string[];
}

export class UploadProductImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload',
  })
  file: Express.Multer.File;

  @ApiPropertyOptional({
    description: 'Variant ID (optional, for variant-specific image)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  variantId?: string;

  @ApiPropertyOptional({
    description: 'Alt text for the image',
    example: 'Product front view',
  })
  @IsString()
  @IsOptional()
  alt?: string;

  @ApiPropertyOptional({
    description: 'Whether this is the primary image',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UploadProductVideoDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Video file to upload',
  })
  file: Express.Multer.File;

  @ApiPropertyOptional({
    description: 'Variant ID (optional, for variant-specific video)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  variantId?: string;

  @ApiPropertyOptional({
    description: 'Alt text for the video',
    example: 'Product demo video',
  })
  @IsString()
  @IsOptional()
  alt?: string;
}
