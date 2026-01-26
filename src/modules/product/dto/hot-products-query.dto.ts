import { IsEnum, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Criteria types for determining hot/best-selling products
 * - SALES: Based on total quantity sold (from completed orders)
 * - REVENUE: Based on total revenue generated
 * - REVIEWS: Based on number of reviews
 * - RATING: Based on average rating
 * - BADGE: Admin-defined products with BEST_SELLER badge
 * - FEATURED: Admin-defined products marked as featured
 * - COMPOSITE: Combined score using multiple criteria
 */
export enum HotProductCriteria {
  SALES = 'sales',
  REVENUE = 'revenue',
  REVIEWS = 'reviews',
  RATING = 'rating',
  BADGE = 'badge',
  FEATURED = 'featured',
  COMPOSITE = 'composite',
}

/**
 * Time period for calculating hot products
 */
export enum HotProductPeriod {
  LAST_7_DAYS = '7d',
  LAST_30_DAYS = '30d',
  LAST_90_DAYS = '90d',
  ALL_TIME = 'all',
}

export class HotProductsQueryDto {
  @ApiPropertyOptional({
    description: 'Number of products to return',
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Criteria for determining hot products',
    enum: HotProductCriteria,
    default: HotProductCriteria.COMPOSITE,
  })
  @IsOptional()
  @IsEnum(HotProductCriteria)
  criteria?: HotProductCriteria = HotProductCriteria.COMPOSITE;

  @ApiPropertyOptional({
    description:
      'Time period for calculating hot products (only applicable for SALES, REVENUE criteria)',
    enum: HotProductPeriod,
    default: HotProductPeriod.LAST_30_DAYS,
  })
  @IsOptional()
  @IsEnum(HotProductPeriod)
  period?: HotProductPeriod = HotProductPeriod.LAST_30_DAYS;

  @ApiPropertyOptional({
    description: 'Filter by category ID',
  })
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Filter by brand ID',
  })
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional({
    description: 'Minimum average rating (1-5)',
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  minRating?: number;
}
