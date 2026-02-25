import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for lightweight product stats response.
 * Used by listing pages (brand, category) to show stats without fetching all products.
 */
export class ProductStatsResponseDto {
  @ApiProperty({
    example: 42,
    description: 'Total number of matching products',
  })
  productCount: number;

  @ApiProperty({
    example: 1250,
    description: 'Total units sold across matching products',
  })
  totalSold: number;
}
