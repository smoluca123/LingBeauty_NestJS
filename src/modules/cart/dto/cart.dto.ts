import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

// ===== Request DTOs =====

export class AddToCartDto {
  @ApiProperty({
    description: 'Product ID to add to cart',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiPropertyOptional({
    description:
      'Variant ID. Omit for products that have no variants — the service will use product-level inventory instead.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  variantId?: string;

  @ApiPropertyOptional({
    description: 'Quantity to add (default: 1)',
    example: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  quantity?: number;
}

export class UpdateCartItemDto {
  @ApiProperty({
    description: 'New quantity for the cart item',
    example: 3,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;
}

// ===== Response DTOs =====

export class CartItemProductImageDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  url: string;

  @ApiProperty({ example: 'image/jpeg' })
  mimetype: string;
}

export class CartItemProductImageWrapperDto {
  @ApiPropertyOptional({ example: 'Product view', nullable: true })
  alt: string | null;

  @ApiProperty({ type: CartItemProductImageDto })
  @Type(() => CartItemProductImageDto)
  media: CartItemProductImageDto;
}

/** Stock snapshot — always present regardless of variant/no-variant product */
export class CartItemStockInfoDto {
  @ApiProperty({ example: 100 })
  stockQuantity: number;

  @ApiProperty({
    example: -10,
    description: 'Backorder floor: orders blocked when quantity drops to/below this value.',
  })
  minStockQuantity: number;

  @ApiProperty({ example: 'IN_STOCK', enum: ['IN_STOCK', 'OUT_OF_STOCK'] })
  stockStatus: string;
}

/** Variant display fields — null for products without variants */
export class CartItemVariantDto {
  @ApiProperty({ example: 'uuid-variant-id' })
  id: string;

  @ApiProperty({ example: 'SKU-RED-M' })
  sku: string;

  @ApiProperty({ example: 'Đỏ - Size M' })
  name: string;

  @ApiPropertyOptional({ example: 'Đỏ', nullable: true })
  color: string | null;

  @ApiPropertyOptional({ example: 'M', nullable: true })
  size: string | null;

  @ApiPropertyOptional({ example: 'Standard', nullable: true })
  type: string | null;

  @ApiProperty({ example: '250000' })
  price: string;
}

export class CartItemProductDto {
  @ApiProperty({ example: 'uuid-product-id' })
  id: string;

  @ApiProperty({ example: 'Son Môi Matte Đỏ' })
  name: string;

  @ApiProperty({ example: 'son-moi-matte-do' })
  slug: string;

  @ApiProperty({ example: 'LP-MAT-001' })
  sku: string;

  @ApiProperty({ example: '250000' })
  basePrice: string;

  @ApiPropertyOptional({ example: '300000', nullable: true })
  comparePrice: string | null;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiPropertyOptional({
    type: CartItemProductImageWrapperDto,
    nullable: true,
  })
  @Type(() => CartItemProductImageWrapperDto)
  thumbnailImage: CartItemProductImageWrapperDto | null;
}

export class CartItemFlashSaleDto {
  @ApiProperty({ example: '150000' })
  flashPrice: string;

  @ApiProperty({ example: 2 })
  limitPerOrder: number;

  @ApiProperty({ example: 10 })
  availableQuantity: number;
}

export class CartItemResponseDto {
  @ApiProperty({ example: 'uuid-cart-item-id' })
  id: string;

  @ApiProperty({ example: 'uuid-cart-id' })
  cartId: string;

  @ApiProperty({ example: 'uuid-product-id' })
  productId: string;

  @ApiProperty({ example: 'uuid-variant-id' })
  variantId: string | null;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({
    example: '500000',
    description: 'Line total (price x quantity)',
  })
  lineTotal: string;

  @ApiProperty({ type: CartItemProductDto })
  @Type(() => CartItemProductDto)
  product: CartItemProductDto;

  @ApiPropertyOptional({
    type: CartItemVariantDto,
    nullable: true,
    description: 'Null for products without variants.',
  })
  @Type(() => CartItemVariantDto)
  variant: CartItemVariantDto | null;

  @ApiProperty({
    type: CartItemStockInfoDto,
    description: 'Stock snapshot — always present. Use this for stock logic, not variant.',
  })
  @Type(() => CartItemStockInfoDto)
  stockInfo: CartItemStockInfoDto;

  @ApiPropertyOptional({
    type: CartItemFlashSaleDto,
    nullable: true,
  })
  @Type(() => CartItemFlashSaleDto)
  flashSaleInfo?: CartItemFlashSaleDto | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class CartSummaryDto {
  @ApiProperty({ example: 3, description: 'Total number of distinct items' })
  itemCount: number;

  @ApiProperty({ example: 5, description: 'Total quantity of all items' })
  totalQuantity: number;

  @ApiProperty({ example: '750000', description: 'Subtotal before discounts' })
  subtotal: string;
}

export class CartResponseDto {
  @ApiProperty({ example: 'uuid-cart-id' })
  id: string;

  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @ApiProperty({ type: [CartItemResponseDto] })
  @Type(() => CartItemResponseDto)
  items: CartItemResponseDto[];

  @ApiProperty({ type: CartSummaryDto })
  @Type(() => CartSummaryDto)
  summary: CartSummaryDto;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
