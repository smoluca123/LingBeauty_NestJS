import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductStatsService } from './product-stats.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import {
  HotProductsQueryDto,
  HotProductCriteria,
  HotProductPeriod,
} from './dto/hot-products-query.dto';

/**
 * Public product endpoints that don't require authentication
 * Used by the frontend to display products on public pages
 */
@ApiTags('Public Products')
@Controller('public/products')
export class PublicProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productStatsService: ProductStatsService,
  ) {}

  /**
   * Get hot/best-selling products
   * This endpoint supports multiple criteria for determining "hot" products
   */
  @Get('hot')
  @ApiOperation({
    summary: 'Get hot/best-selling products',
    description: `
      Retrieves hot or best-selling products based on various criteria.
      
      **Available Criteria:**
      - \`sales\` - Products with highest quantity sold
      - \`revenue\` - Products with highest revenue generated
      - \`reviews\` - Products with most reviews
      - \`rating\` - Products with highest average rating
      - \`badge\` - Products marked with BEST_SELLER badge by admin
      - \`featured\` - Products marked as featured by admin
      - \`composite\` - Combined score using all factors (default)
      
      **Time Periods (for sales/revenue criteria):**
      - \`7d\` - Last 7 days
      - \`30d\` - Last 30 days (default)
      - \`90d\` - Last 90 days
      - \`all\` - All time
    `,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of products to return (1-50, default: 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'criteria',
    required: false,
    enum: HotProductCriteria,
    description: 'Criteria for determining hot products',
    example: HotProductCriteria.COMPOSITE,
  })
  @ApiQuery({
    name: 'period',
    required: false,
    enum: HotProductPeriod,
    description: 'Time period for sales/revenue calculation',
    example: HotProductPeriod.LAST_30_DAYS,
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    description: 'Filter by category ID',
  })
  @ApiQuery({
    name: 'brandId',
    required: false,
    type: String,
    description: 'Filter by brand ID',
  })
  @ApiQuery({
    name: 'minRating',
    required: false,
    type: Number,
    description: 'Minimum average rating (1-5)',
    example: 4,
  })
  @ApiResponse({
    status: 200,
    description: 'Hot products retrieved successfully',
    type: [ProductResponseDto],
  })
  getHotProducts(
    @Query() query: HotProductsQueryDto,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto[]>> {
    return this.productService.getHotProducts(query);
  }

  /**
   * Increment view count for a product
   * Call this when user visits product detail page
   */
  @Post(':id/view')
  @ApiOperation({
    summary: 'Track product view',
    description:
      'Increments the view count for a product. Call this when a user views the product detail page.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'View tracked successfully',
  })
  async trackProductView(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    await this.productStatsService.incrementViewCount(productId);
    return {
      type: 'response',
      message: 'Product view tracked successfully',
      data: { message: 'Product view tracked successfully' },
    };
  }
}
