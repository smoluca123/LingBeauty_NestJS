import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductInventoryDisplayStatus } from 'prisma/generated/prisma/client';

export class InventoryListQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (default: 1)',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of records per page (default: 20)',
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Search by product name or SKU',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by inventory display status',
    enum: ProductInventoryDisplayStatus,
  })
  @IsOptional()
  @IsEnum(ProductInventoryDisplayStatus)
  status?: ProductInventoryDisplayStatus;
}
