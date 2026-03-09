import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { ProductInventoryDisplayStatus } from 'prisma/generated/prisma/client';

export class UpdateInventoryDto {
  @ApiPropertyOptional({
    example: 100,
    description:
      'Set absolute quantity. If provided without displayStatus, displayStatus is auto-calculated.',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  quantity?: number;

  @ApiPropertyOptional({
    enum: ProductInventoryDisplayStatus,
    example: 'IN_STOCK',
    description:
      'Override display status manually. If omitted and quantity is provided, status is auto-calculated from quantity.',
  })
  @IsEnum(ProductInventoryDisplayStatus)
  @IsOptional()
  displayStatus?: ProductInventoryDisplayStatus;

  @ApiPropertyOptional({
    example: 10,
    description: 'Alert threshold for low-stock notification',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  lowStockThreshold?: number;

  @ApiPropertyOptional({
    example: -10,
    description:
      'Minimum allowed stock quantity for backorder. Negative values allow backorders. ' +
      'E.g. -10 means up to 10 units can be ordered beyond zero stock. Default: -10.',
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  minStockQuantity?: number;
}
