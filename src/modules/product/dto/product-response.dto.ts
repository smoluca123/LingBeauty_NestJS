import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { ProductBadgeType, ProductBadgeVariant } from 'prisma/generated/prisma';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';

export class ProductCategoryDto {
  @ApiProperty({ example: 'uuid-category-id' })
  id: string;

  @ApiProperty({ example: 'Lipstick' })
  name: string;

  @ApiProperty({ example: 'lipstick' })
  slug: string;
}

export class ProductBrandDto {
  @ApiProperty({ example: 'uuid-brand-id' })
  id: string;

  @ApiProperty({ example: "L'Oreal" })
  name: string;

  @ApiProperty({ example: 'loreal' })
  slug: string;
}

export class ProductImageMediaDto {
  @ApiProperty({ example: 'uuid-media-id' })
  id: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  url: string;

  @ApiProperty({ example: 'image/jpeg' })
  mimetype: string;
}

export class ProductImageDto {
  @ApiProperty({ example: 'uuid-image-id' })
  id: string;

  @ApiPropertyOptional({ example: 'Product front view' })
  alt?: string;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({ example: true })
  isPrimary: boolean;

  @ApiProperty({ type: ProductImageMediaDto })
  @Type(() => ProductImageMediaDto)
  media: ProductImageMediaDto;
}

export class ProductInventoryDto {
  @ApiProperty({ example: 100 })
  quantity: number;

  @ApiProperty({ example: 'in_stock' })
  displayStatus: string;

  @ApiProperty({ example: 10 })
  lowStockThreshold: number;
}

export class ProductBadgeResponseDto {
  @ApiProperty({ example: 'uuid-badge-id', description: 'Badge ID' })
  id: string;

  @ApiProperty({ example: 'uuid-product-id', description: 'Product ID' })
  productId: string;

  @ApiProperty({ example: 'New Arrival', description: 'Badge name' })
  name: string;

  @ApiProperty({ example: 0, description: 'Sort order for display' })
  sortOrder: number;

  @ApiProperty({ example: true, description: 'Whether the badge is active' })
  isActive: boolean;

  @ApiPropertyOptional({
    example: ProductBadgeVariant.INFO,
    description: 'Badge variant style (e.g., primary, secondary, destructive)',
    enum: ProductBadgeVariant,
  })
  variant?: ProductBadgeVariant;

  @ApiPropertyOptional({
    example: ProductBadgeType.NEW,
    description: 'Badge type (e.g., promotion, new, sale)',
    enum: ProductBadgeType,
  })
  type?: ProductBadgeType;
}

export class ProductVariantDto {
  @ApiProperty({ example: 'uuid-variant-id' })
  id: string;

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

  @ApiPropertyOptional({ type: ProductInventoryDto })
  @Type(() => ProductInventoryDto)
  inventory?: ProductInventoryDto;
}

export class ProductResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: 'Lipstick Matte Red',
    description: 'Product name',
  })
  name: string;

  @ApiProperty({
    example: 'lipstick-matte-red',
    description: 'Product slug',
  })
  slug: string;

  @ApiPropertyOptional({
    example: 'A beautiful matte red lipstick with long-lasting formula',
    description: 'Full description',
  })
  description?: string;

  @ApiPropertyOptional({
    example: 'Long-lasting matte lipstick',
    description: 'Short description',
  })
  shortDesc?: string;

  @ApiProperty({
    example: 'LP-MAT-001',
    description: 'SKU code',
  })
  sku: string;

  @ApiProperty({
    example: '250000',
    description: 'Base price',
  })
  basePrice: string;

  @ApiPropertyOptional({
    example: '300000',
    description: 'Compare price',
  })
  comparePrice?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the product is active',
  })
  isActive: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the product is featured',
  })
  isFeatured: boolean;

  @ApiPropertyOptional({
    example: '50.5',
    description: 'Weight in grams',
  })
  weight?: string;

  @ApiPropertyOptional({
    example: 'Lipstick Matte Red - Best Quality',
    description: 'SEO meta title',
  })
  metaTitle?: string;

  @ApiPropertyOptional({
    example: 'Shop the best matte lipstick online',
    description: 'SEO meta description',
  })
  metaDesc?: string;

  @ApiPropertyOptional({ type: ProductImageDto })
  @Type(() => ProductImageDto)
  primaryImage?: ProductImageDto;

  @ApiProperty({ type: [ProductCategoryDto] })
  @Type(() => ProductCategoryDto)
  categories: ProductCategoryDto[];

  @ApiPropertyOptional({ type: ProductBrandDto })
  @Type(() => ProductBrandDto)
  brand?: ProductBrandDto;

  @ApiProperty({ type: [ProductImageDto] })
  @Type(() => ProductImageDto)
  images: ProductImageDto[];

  @ApiProperty({ type: [ProductVariantDto] })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @ApiProperty({ type: [ProductBadgeResponseDto] })
  @Type(() => ProductBadgeResponseDto)
  badges: ProductBadgeResponseDto[];

  @Exclude()
  brandId?: string;
}

// export class ProductListResponseDto extends ProductResponseDto {
//   @ApiPropertyOptional({ type: ProductImageDto })
//   @Type(() => ProductImageDto)
//   primaryImage?: ProductImageDto;
// }
