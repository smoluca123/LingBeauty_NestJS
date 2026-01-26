import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  sortOrder: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: 'array', items: { type: 'object' } })
  groups?: Array<{
    bannerGroupId: string;
  }>;
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

  @ApiPropertyOptional({ type: 'array', items: { type: 'object' } })
  banners?: Array<{
    id: string;
    bannerId: string;
    bannerGroupId: string;
    sortOrder: number;
    createdAt: Date;
    banner: BannerResponseDto;
  }>;
}
