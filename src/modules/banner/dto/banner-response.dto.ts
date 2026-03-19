import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BannerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ['TEXT', 'IMAGE'] })
  type: string;

  @ApiProperty({ enum: ['MAIN_CAROUSEL', 'SIDE_TOP', 'SIDE_BOTTOM'] })
  position: string;

  @ApiPropertyOptional()
  badge?: string;

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  highlight?: string;

  @ApiPropertyOptional()
  ctaText?: string;

  @ApiPropertyOptional()
  ctaLink?: string;

  @ApiPropertyOptional()
  subLabel?: string;

  @ApiPropertyOptional()
  gradientFrom?: string;

  @ApiPropertyOptional()
  gradientTo?: string;

  @ApiPropertyOptional()
  imageMediaId?: string;

  @ApiPropertyOptional()
  imageUrl?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: () => [BannerGroupReferenceDto] })
  @Type(() => BannerGroupReferenceDto)
  groups?: BannerGroupReferenceDto[];
}

export class BannerGroupReferenceDto {
  @ApiProperty()
  bannerGroupId: string;
}

export class BannerGroupResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiPropertyOptional()
  startDate?: Date;

  @ApiPropertyOptional()
  endDate?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: () => [BannerMappingResponseDto] })
  @Type(() => BannerMappingResponseDto)
  banners?: BannerMappingResponseDto[];
}

export class BannerMappingResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bannerId: string;

  @ApiProperty()
  bannerGroupId: string;

  @ApiProperty()
  sortOrder: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  @Type(() => BannerResponseDto)
  banner: BannerResponseDto;
}
