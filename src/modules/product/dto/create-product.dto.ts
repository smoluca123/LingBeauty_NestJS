import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductVariantDto {
  @ApiProperty({
    example: 'SKU-001-RED',
    description: 'Unique SKU for the variant',
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    example: 'Red - Size M',
    description: 'Variant name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Red',
    description: 'Color of the variant',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    example: 'M',
    description: 'Size of the variant',
  })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiPropertyOptional({
    example: 'Standard',
    description: 'Type of the variant',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: 150000,
    description: 'Price of the variant',
  })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Sort order for display',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  sortOrder?: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Initial inventory quantity',
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  quantity?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Low stock threshold',
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  lowStockThreshold?: number;
}

export class CreateProductDto {
  @ApiProperty({
    example: 'Lipstick Matte Red',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'A beautiful matte red lipstick with long-lasting formula',
    description: 'Full description of the product',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'Long-lasting matte lipstick',
    description: 'Short description of the product',
  })
  @IsString()
  @IsOptional()
  shortDesc?: string;

  @ApiProperty({
    example: 'LP-MAT-001',
    description: 'Unique SKU code',
  })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({
    example: ['uuid-category-id-1', 'uuid-category-id-2'],
    description: 'Array of Category IDs',
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  categoryIds: string[];

  @ApiPropertyOptional({
    example: 'uuid-brand-id',
    description: 'Brand ID',
  })
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiProperty({
    example: 250000,
    description: 'Base price of the product',
  })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  basePrice: number;

  @ApiPropertyOptional({
    example: 300000,
    description: 'Compare/original price for showing discount',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  comparePrice?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the product is active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the product is featured',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isFeatured?: boolean;

  @ApiPropertyOptional({
    example: 50.5,
    description: 'Weight in grams',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  weight?: number;

  @ApiPropertyOptional({
    example: 'Lipstick Matte Red - Best Quality',
    description: 'SEO meta title',
  })
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional({
    example: 'Shop the best matte lipstick online',
    description: 'SEO meta description',
  })
  @IsString()
  @IsOptional()
  metaDesc?: string;

  @ApiPropertyOptional({
    type: [CreateProductVariantDto],
    description: 'Product variants',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants?: CreateProductVariantDto[];
}
