import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProductInventoryDisplayStatus } from 'prisma/generated/prisma/client';
import { ProductSummaryResponseDto } from 'src/modules/product/dto/product-response.dto';
import { VariantSummaryResponseDto } from 'src/modules/product/dto/product-variant.dto';

export class InventoryResponseDto {
  @ApiProperty({ example: 'uuid-inventory-id' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'uuid-product-id' })
  @Expose()
  productId: string;

  @ApiPropertyOptional({ example: 'uuid-variant-id', nullable: true })
  @Expose()
  variantId: string | null;

  @ApiProperty({ example: 100 })
  @Expose()
  quantity: number;

  @ApiProperty({ enum: ProductInventoryDisplayStatus, example: 'IN_STOCK' })
  @Expose()
  displayStatus: ProductInventoryDisplayStatus;

  @ApiProperty({ example: 10 })
  @Expose()
  lowStockThreshold: number;

  @ApiProperty({
    example: -10,
    description:
      'Minimum allowed stock quantity for backorder. When quantity drops to/below this, orders are rejected.',
  })
  @Expose()
  minStockQuantity: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

/**
 * Inventory response for variant-level records.
 * Extends the base with a `variant` summary field.
 */
export class InventoryVariantResponseDto extends InventoryResponseDto {
  @ApiProperty({ type: ProductSummaryResponseDto })
  @Expose()
  @Type(() => ProductSummaryResponseDto)
  product: ProductSummaryResponseDto;

  @ApiProperty({ type: VariantSummaryResponseDto })
  @Expose()
  @Type(() => VariantSummaryResponseDto)
  variant: VariantSummaryResponseDto;
}

export class InventoryProductResponseDto extends InventoryResponseDto {
  @ApiProperty({ type: ProductSummaryResponseDto })
  @Expose()
  @Type(() => ProductSummaryResponseDto)
  product: ProductSummaryResponseDto;
}

export class InventoryOverviewResponseDto {
  @ApiProperty({ example: 120, description: 'Total products in system' })
  @Expose()
  totalProducts: number;

  @ApiProperty({ example: 350, description: 'Total variants in system' })
  @Expose()
  totalVariants: number;

  @ApiProperty({
    example: 400,
    description: 'Inventory records with IN_STOCK status',
  })
  @Expose()
  inStockCount: number;

  @ApiProperty({
    example: 30,
    description: 'Inventory records below lowStockThreshold',
  })
  @Expose()
  lowStockCount: number;

  @ApiProperty({
    example: 20,
    description: 'Inventory records with OUT_OF_STOCK status',
  })
  @Expose()
  outOfStockCount: number;

  @ApiProperty({
    example: 15000,
    description: 'Sum of all inventory quantities',
  })
  @Expose()
  totalQuantity: number;
}
