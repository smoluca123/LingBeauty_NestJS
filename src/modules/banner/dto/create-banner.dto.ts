import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsInt,
  MaxLength,
  Min,
  Matches,
} from 'class-validator';

export enum BannerType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export enum BannerPosition {
  MAIN_CAROUSEL = 'MAIN_CAROUSEL',
  SIDE_TOP = 'SIDE_TOP',
  SIDE_BOTTOM = 'SIDE_BOTTOM',
}

export class CreateBannerDto {
  @ApiProperty({
    description: 'Banner type',
    enum: BannerType,
    default: BannerType.TEXT,
  })
  @IsEnum(BannerType)
  type: BannerType;

  @ApiProperty({
    description: 'Banner position',
    enum: BannerPosition,
    default: BannerPosition.MAIN_CAROUSEL,
  })
  @IsEnum(BannerPosition)
  position: BannerPosition;

  // Text content fields
  @ApiPropertyOptional({
    description: 'Badge text',
    example: 'Beauty Box',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  badge?: string;

  @ApiPropertyOptional({
    description: 'Main title',
    example: 'FLASH SALE RINH QUÀ LINH ĐÌNH',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({
    description: 'Description',
    example: 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Highlight text',
    example: 'Mua 1 tặng 3',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  highlight?: string;

  @ApiPropertyOptional({
    description: 'CTA button text',
    example: 'Mua ngay',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  ctaText?: string;

  @ApiPropertyOptional({
    description: 'CTA button link',
    example: '/products/flash-sale',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  ctaLink?: string;

  @ApiPropertyOptional({
    description: 'Sub label text',
    example: 'Số lượng quà tặng có hạn.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  subLabel?: string;

  // Styling - Gradient colors
  @ApiPropertyOptional({
    description: 'Gradient start color (hex)',
    example: '#ffe4f0',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'gradientFrom must be a valid hex color code',
  })
  gradientFrom?: string;

  @ApiPropertyOptional({
    description: 'Gradient end color (hex)',
    example: '#fff5fb',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'gradientTo must be a valid hex color code',
  })
  gradientTo?: string;

  // Image
  @ApiPropertyOptional({
    description: 'Image media ID',
    example: 'uuid-here',
  })
  @IsString()
  @IsOptional()
  imageMediaId?: string;

  // Settings
  @ApiPropertyOptional({
    description: 'Sort order',
    default: 0,
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({
    description: 'Is active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
