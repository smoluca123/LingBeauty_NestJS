import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';
import { BrandResponseDto } from 'src/modules/brand/dto/brand-response.dto';
import { UploadResponseDto } from 'src/modules/storage/dto/upload-response.dto';

export class CategoryResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: 'Skincare',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: 'skincare',
    description: 'The slug of the category',
  })
  slug: string;

  @ApiPropertyOptional({
    example: 'Products for skin care',
    description: 'Description of the category',
  })
  description?: string;

  @ApiPropertyOptional({
    example: 'BRAND | CATEGORY',
    description: 'Type of the category',
  })
  type?: string;

  @ApiPropertyOptional({
    description: 'Brand of the category',
  })
  @Type(() => CategoryResponseDto)
  brand?: BrandResponseDto;

  @ApiPropertyOptional({
    example: 'uuid-of-parent-category',
    description: 'ID of the parent category',
  })
  parentId?: string;

  @ApiProperty({
    example: 0,
    description: 'Sort order of the category',
  })
  sortOrder: number;

  @ApiProperty({
    example: true,
    description: 'Whether the category is active',
  })
  isActive: boolean;

  @ApiPropertyOptional({
    type: UploadResponseDto,
    description: 'Category cover image',
  })
  @Type(() => UploadResponseDto)
  imageMedia?: UploadResponseDto;

  @ApiPropertyOptional({
    type: [CategoryResponseDto],
    description: 'Child categories',
  })
  @Type(() => CategoryResponseDto)
  children?: CategoryResponseDto[];

  // @ApiPropertyOptional({
  //   type: CategoryResponseDto,
  //   description: 'Parent category',
  // })
  // @Type(() => CategoryResponseDto)
  // parent?: CategoryResponseDto;

  @Exclude()
  imageMediaId?: string;
}
