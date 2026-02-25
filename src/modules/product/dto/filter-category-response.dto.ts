import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for filter category returned by the filter-categories endpoint.
 * Contains category info with product count for the given filter context.
 */
export class FilterCategoryResponseDto {
  @ApiProperty({ example: 'uuid-category-id', description: 'Category ID' })
  id: string;

  @ApiProperty({ example: 'Son môi', description: 'Category name' })
  name: string;

  @ApiProperty({ example: 'son-moi', description: 'Category slug' })
  slug: string;

  @ApiProperty({
    example: 5,
    description: 'Number of products in this category matching the filter',
  })
  count: number;
}
