import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateBannerGroupDto {
  @ApiProperty({
    description: 'Banner group name',
    example: 'Tết 2026',
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Banner group slug',
    example: 'tet-2026',
  })
  @IsString()
  @MaxLength(255)
  slug: string;

  @ApiPropertyOptional({
    description: 'Banner group description',
    example: 'Banner chương trình khuyến mãi Tết Nguyên Đán 2026',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Is active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Start date',
    example: '2026-01-20T00:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date',
    example: '2026-02-10T23:59:59Z',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
