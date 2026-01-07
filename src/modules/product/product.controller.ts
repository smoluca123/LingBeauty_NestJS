import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductStatsService } from './product-stats.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ProductBadgeResponseDto,
  ProductResponseDto,
} from './dto/product-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiAddMultipleProductBadges,
  ApiAddProductBadge,
  ApiDeleteProductBadge,
  ApiUpdateProductBadge,
  ApiAddProductImage,
  ApiAddProductVariant,
  ApiCreateProduct,
  ApiDeleteProduct,
  ApiDeleteProductImage,
  ApiDeleteProductVariant,
  ApiGetProduct,
  ApiGetProductBadges,
  ApiGetProductBySlug,
  ApiGetProductImages,
  ApiGetProducts,
  ApiGetProductVariants,
  ApiReorderProductImages,
  ApiUpdateProduct,
  ApiUpdateProductImage,
  ApiUpdateProductVariant,
  ApiUploadProductImage,
  ApiUploadProductVideo,
} from './decorators/product.decorators';
import {
  AddProductImageDto,
  ProductImageResponseDto,
  ReorderProductImagesDto,
  UpdateProductImageDto,
} from './dto/product-image.dto';
import {
  CreateSingleVariantDto,
  ProductVariantResponseDto,
  UpdateSingleVariantDto,
} from './dto/product-variant.dto';
import {
  CreateMultipleBadgesDto,
  CreateSingleBadgeDto,
  UpdateBadgeDto,
} from './dto/product-badge.dto';
import { normalizePaginationParams } from 'src/libs/utils/utils';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';

@ApiTags('Product Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productStatsService: ProductStatsService,
  ) {}

  @Get()
  @ApiGetProducts()
  getAllProducts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
    @Query('isActive') isActive?: string,
    @Query('isFeatured') isFeatured?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: 'name' | 'basePrice' | 'createdAt' | 'updatedAt',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<ProductResponseDto>> {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });
    return this.productService.getAllProducts({
      page: normalizedPage,
      limit: normalizedLimit,
      search,
      categoryId,
      brandId,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
      isFeatured: isFeatured !== undefined ? isFeatured === 'true' : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sortBy,
      order,
    });
  }

  @Post()
  @ApiCreateProduct()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    return this.productService.createProduct(createProductDto);
  }

  @Get('slug/:slug')
  @ApiGetProductBySlug()
  getProductBySlug(
    @Param('slug') slug: string,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    return this.productService.getProductBySlug(slug);
  }

  @Get(':id')
  @ApiGetProduct()
  getProduct(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    return this.productService.getProductById(productId);
  }

  @Patch(':id')
  @ApiUpdateProduct()
  updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    return this.productService.updateProduct({
      productId,
      updateProductDto,
    });
  }

  @Delete(':id')
  @ApiDeleteProduct()
  deleteProduct(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    return this.productService.deleteProduct(productId);
  }

  // ============== Product Image Routes ==============

  @Get(':id/images')
  @ApiGetProductImages()
  getProductImages(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto[]>> {
    return this.productService.getProductImages(productId);
  }

  @Post(':id/images')
  @ApiAddProductImage()
  addProductImage(
    @Param('id') productId: string,
    @Body() addProductImageDto: AddProductImageDto,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    return this.productService.addProductImage(productId, addProductImageDto);
  }

  @Patch(':id/images/:imageId')
  @ApiUpdateProductImage()
  updateProductImage(
    @Param('id') productId: string,
    @Param('imageId') imageId: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    return this.productService.updateProductImage(
      productId,
      imageId,
      updateProductImageDto,
    );
  }

  @Delete(':id/images/:imageId')
  @ApiDeleteProductImage()
  deleteProductImage(
    @Param('id') productId: string,
    @Param('imageId') imageId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.productService.deleteProductImage(productId, imageId);
  }

  @Patch(':id/images/reorder')
  @ApiReorderProductImages()
  reorderProductImages(
    @Param('id') productId: string,
    @Body() reorderDto: ReorderProductImagesDto,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto[]>> {
    return this.productService.reorderProductImages(
      productId,
      reorderDto.imageIds,
    );
  }

  // ============== Upload Routes ==============

  @Post(':id/upload/image')
  @ApiUploadProductImage()
  uploadProductImage(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('variantId') variantId?: string,
    @Body('alt') alt?: string,
    @Body('isPrimary') isPrimary?: string,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    return this.productService.uploadProductImage({
      productId,
      file,
      options: {
        variantId,
        alt,
        isPrimary: isPrimary === 'true',
      },
    });
  }

  @Post(':id/upload/video')
  @ApiUploadProductVideo()
  uploadProductVideo(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body('variantId') variantId?: string,
    @Body('alt') alt?: string,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    return this.productService.uploadProductVideo(
      productId,
      file,
      decodedAccessToken.userId,
      {
        variantId,
        alt,
      },
    );
  }

  // ============== Product Variant Routes ==============

  @Get(':id/variants')
  @ApiGetProductVariants()
  getProductVariants(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<ProductVariantResponseDto[]>> {
    return this.productService.getProductVariants(productId);
  }

  @Post(':id/variants')
  @ApiAddProductVariant()
  addProductVariant(
    @Param('id') productId: string,
    @Body() createVariantDto: CreateSingleVariantDto,
  ): Promise<IBeforeTransformResponseType<ProductVariantResponseDto>> {
    return this.productService.addProductVariant(productId, createVariantDto);
  }

  @Patch(':id/variants/:variantId')
  @ApiUpdateProductVariant()
  updateProductVariant(
    @Param('id') productId: string,
    @Param('variantId') variantId: string,
    @Body() updateVariantDto: UpdateSingleVariantDto,
  ): Promise<IBeforeTransformResponseType<ProductVariantResponseDto>> {
    return this.productService.updateProductVariant(
      productId,
      variantId,
      updateVariantDto,
    );
  }

  @Delete(':id/variants/:variantId')
  @ApiDeleteProductVariant()
  deleteProductVariant(
    @Param('id') productId: string,
    @Param('variantId') variantId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.productService.deleteProductVariant(productId, variantId);
  }

  // Product Badges
  @Get(':id/badges')
  @ApiGetProductBadges()
  getProductBadges(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto[]>> {
    return this.productService.getProductBadges({ productId });
  }

  @Post(':id/badges')
  @ApiAddProductBadge()
  addProductBadge(
    @Param('id') productId: string,
    @Body() createBadgeDto: CreateSingleBadgeDto,
  ): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto>> {
    return this.productService.addProductBadge({ productId, createBadgeDto });
  }

  @Post(':id/badges/bulk')
  @ApiAddMultipleProductBadges()
  addMultipleProductBadges(
    @Param('id') productId: string,
    @Body() createBadgesDto: CreateMultipleBadgesDto,
  ): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto[]>> {
    return this.productService.addMultipleProductBadges({
      productId,
      createBadgesDto,
    });
  }

  @Patch(':id/badges/:badgeId')
  @ApiUpdateProductBadge()
  updateProductBadge(
    @Param('id') productId: string,
    @Param('badgeId') badgeId: string,
    @Body() updateBadgeDto: UpdateBadgeDto,
  ): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto>> {
    return this.productService.updateProductBadge({
      productId,
      badgeId,
      updateBadgeDto,
    });
  }

  @Delete(':id/badges/:badgeId')
  @ApiDeleteProductBadge()
  deleteProductBadge(
    @Param('id') productId: string,
    @Param('badgeId') badgeId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.productService.deleteProductBadge({ productId, badgeId });
  }

  // ============== Product Stats Admin Routes ==============

  @Post('stats/sync-all')
  @ApiOperation({
    summary: 'Sync all product stats',
    description:
      'Recalculate and update stats for all active products. Use for initial migration or periodic sync.',
  })
  @ApiResponse({ status: 200, description: 'Stats synced successfully' })
  async syncAllProductStats(): Promise<
    IBeforeTransformResponseType<{ synced: number }>
  > {
    const result = await this.productStatsService.syncAllProductStats();
    return {
      type: 'response',
      message: `Successfully synced stats for ${result.synced} products`,
      data: result,
    };
  }

  @Post(':id/stats/sync')
  @ApiOperation({
    summary: 'Sync stats for a single product',
    description: 'Recalculate and update stats for a specific product.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product stats synced successfully',
  })
  async syncProductStats(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    await this.productStatsService.updateProductStats(productId);
    return {
      type: 'response',
      message: 'Product stats synced successfully',
      data: { message: 'Product stats synced successfully' },
    };
  }

  @Get(':id/stats')
  @ApiOperation({
    summary: 'Get stats for a product',
    description: 'Retrieve pre-calculated stats for a specific product.',
  })
  @ApiResponse({
    status: 200,
    description: 'Product stats retrieved successfully',
  })
  async getProductStats(
    @Param('id') productId: string,
  ): Promise<IBeforeTransformResponseType<any>> {
    const stats = await this.productStatsService.getProductStats(productId);
    return {
      type: 'response',
      message: 'Product stats retrieved successfully',
      data: stats,
    };
  }
}
