import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
 import { VariantDisplayType } from 'prisma/generated/prisma';
import { ProductImageDto, ProductInventoryDto, ProductVariantDto } from './product-response.dto';

// ============== Create Product Variant DTO ==============

export class CreateSingleVariantDto {
  @ApiProperty({
    example: 'SKU-001-RED',
    description: 'Unique SKU for the variant',
  })
  @IsString()
  @IsOptional()
  sku?: string;

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
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  @IsOptional()
  price?: number;

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
    enum: VariantDisplayType,
    example: VariantDisplayType.COLOR,
    description: 'Controls how the variant button is rendered: COLOR (color swatch) or IMAGE',
    default: VariantDisplayType.COLOR,
  })
  @IsEnum(VariantDisplayType)
  @IsOptional()
  displayType?: VariantDisplayType;

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

// ============== Update Product Variant DTO ==============

export class UpdateSingleVariantDto {
  @ApiPropertyOptional({
    example: 'SKU-001-RED',
    description: 'Unique SKU for the variant',
  })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional({
    example: 'Red - Size M',
    description: 'Variant name',
  })
  @IsString()
  @IsOptional()
  name?: string;

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

  @ApiPropertyOptional({
    example: 150000,
    description: 'Price of the variant',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  price?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Sort order for display',
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  sortOrder?: number;

  @ApiPropertyOptional({
    enum: VariantDisplayType,
    example: VariantDisplayType.COLOR,
    description: 'Controls how the variant button is rendered: COLOR (color swatch) or IMAGE',
  })
  @IsEnum(VariantDisplayType)
  @IsOptional()
  displayType?: VariantDisplayType;

  @ApiPropertyOptional({
    example: 100,
    description: 'Inventory quantity',
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  quantity?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Low stock threshold',
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  lowStockThreshold?: number;
}

// ============== Response DTO ==============

export class ProductVariantResponseDto {
  @ApiProperty({ example: 'uuid-variant-id' })
  id: string;

  @ApiProperty({ example: 'uuid-product-id' })
  productId: string;

  @ApiProperty({ example: 'SKU-001-RED' })
  sku: string;

  @ApiProperty({ example: 'Red - Size M' })
  name: string;

  @ApiPropertyOptional({ example: 'Red' })
  color?: string;

  @ApiPropertyOptional({ example: 'M' })
  size?: string;

  @ApiPropertyOptional({ example: 'Standard' })
  type?: string;

  @ApiProperty({ example: '150000' })
  price: string;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({
    enum: VariantDisplayType,
    example: VariantDisplayType.COLOR,
    description: 'Controls how the variant button is rendered',
  })
  displayType: VariantDisplayType;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiPropertyOptional({ type: ProductInventoryDto })
  @Type(() => ProductInventoryDto)
  inventory?: ProductInventoryDto;
}

/**
 * Minimal variant info for embedding in inventory/order responses.
 */
export class VariantSummaryResponseDto {
  @ApiProperty({ example: 'uuid-variant-id' })
  id: string;

  @ApiProperty({ example: 'SKU-001-RED' })
  sku: string;

  @ApiProperty({ example: 'Rờ - Size M' })
  name: string;

  @ApiPropertyOptional({ example: 'Red', nullable: true })
  color?: string | null;

  @ApiPropertyOptional({ example: 'M', nullable: true })
  size?: string | null;

  @ApiPropertyOptional({ example: 'Standard', nullable: true })
  type?: string | null;

  @ApiProperty({ example: '150000' })
  price: string;

  @ApiProperty({ enum: VariantDisplayType, example: VariantDisplayType.COLOR })
  displayType: VariantDisplayType;

  @ApiProperty({ type: [ProductImageDto] })
  @Type(() => ProductImageDto)
  images: ProductImageDto[];
}
