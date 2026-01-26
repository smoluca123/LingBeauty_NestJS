import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ApiProtectedAuthOperation,
  ApiPublicOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import {
  ProductBadgeResponseDto,
  ProductResponseDto,
} from '../dto/product-response.dto';
import {
  AddProductImageDto,
  ProductImageResponseDto,
  ReorderProductImagesDto,
  UpdateProductImageDto,
  UploadProductImageDto,
  UploadProductVideoDto,
} from '../dto/product-image.dto';
import {
  CreateSingleVariantDto,
  ProductVariantResponseDto,
  UpdateSingleVariantDto,
} from '../dto/product-variant.dto';
import { FileValidationInterceptor } from 'src/modules/storage/interceptors/file-validation.interceptor';
import { MediaType } from 'prisma/generated/prisma/client';
import {
  CreateMultipleBadgesDto,
  CreateSingleBadgeDto,
  UpdateBadgeDto,
} from 'src/modules/product/dto/product-badge.dto';

export const ApiCreateProduct = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Create a new product',
      description: 'Create a new product with variants',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 201,
      type: ProductResponseDto,
    }),
  );

export const ApiGetProducts = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get all products with pagination',
      description: 'Retrieve all products with search and filter options',
    }),
    ApiResponse({
      status: 200,
      type: ProductResponseDto,
      isArray: true,
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      description: 'Page number (default: 1)',
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      description: 'Items per page (default: 10)',
    }),
    ApiQuery({
      name: 'search',
      type: String,
      required: false,
      description: 'Search by product name',
    }),
    ApiQuery({
      name: 'categoryId',
      type: String,
      required: false,
      description:
        'Filter by category ID (products that belong to this category)',
    }),
    ApiQuery({
      name: 'brandId',
      type: String,
      required: false,
      description: 'Filter by brand ID',
    }),
    ApiQuery({
      name: 'isActive',
      type: Boolean,
      required: false,
      description: 'Filter by active status',
    }),
    ApiQuery({
      name: 'isFeatured',
      type: Boolean,
      required: false,
      description: 'Filter by featured status',
    }),
    ApiQuery({
      name: 'minPrice',
      type: Number,
      required: false,
      description: 'Minimum base price',
    }),
    ApiQuery({
      name: 'maxPrice',
      type: Number,
      required: false,
      description: 'Maximum base price',
    }),
    ApiQuery({
      name: 'sortBy',
      type: String,
      required: false,
      enum: ['name', 'basePrice', 'createdAt', 'updatedAt'],
      description: 'Sort field (default: createdAt)',
    }),
    ApiQuery({
      name: 'order',
      type: String,
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order (default: desc)',
    }),
  );

export const ApiGetProduct = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get product by ID',
      description: 'Retrieve product details by ID',
    }),
    ApiResponse({
      status: 200,
      type: ProductResponseDto,
    }),
  );

export const ApiGetProductBySlug = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get product by slug',
      description: 'Retrieve product details by slug',
    }),
    ApiResponse({
      status: 200,
      type: ProductResponseDto,
    }),
  );

export const ApiUpdateProduct = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update product',
      description: 'Update product information and variants',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 200,
      type: ProductResponseDto,
    }),
  );

export const ApiDeleteProduct = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete product',
      description: 'Delete a product and all its variants',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 200,
      type: ProductResponseDto,
      description: 'Product deleted successfully',
    }),
  );

// ============== Product Image Decorators ==============

export const ApiGetProductImages = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get all images of a product',
      description: 'Retrieve all images associated with a product',
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: [ProductImageResponseDto],
    }),
  );

export const ApiAddProductImage = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Add image to product',
      description: 'Add a new image to a product using an uploaded media ID',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiBody({
      type: AddProductImageDto,
    }),
    ApiResponse({
      status: 201,
      type: ProductImageResponseDto,
    }),
  );

export const ApiUpdateProductImage = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update product image',
      description:
        'Update product image properties (alt text, sort order, primary status)',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiParam({
      name: 'imageId',
      description: 'Product Image ID',
      type: String,
    }),
    ApiBody({
      type: UpdateProductImageDto,
    }),
    ApiResponse({
      status: 200,
      type: ProductImageResponseDto,
    }),
  );

export const ApiDeleteProductImage = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete product image',
      description: 'Remove an image from a product',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiParam({
      name: 'imageId',
      description: 'Product Image ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Image deleted successfully',
    }),
  );

export const ApiReorderProductImages = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Reorder product images',
      description: 'Update the sort order of product images',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiBody({
      type: ReorderProductImagesDto,
    }),
    ApiResponse({
      status: 200,
      type: [ProductImageResponseDto],
    }),
  );

// ============== Upload Decorators ==============

export const ApiUploadProductImage = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Upload product image',
      description: 'Upload and attach an image to a product',
      roles: [RolesLevel.MANAGER],
    }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.PRODUCT_IMAGE }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiBody({
      type: UploadProductImageDto,
    }),
    ApiResponse({
      status: 201,
      type: ProductImageResponseDto,
    }),
  );

export const ApiUploadProductVideo = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Upload product video',
      description: 'Upload and attach a video to a product',
      roles: [RolesLevel.MANAGER],
    }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.PRODUCT_VIDEO }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiBody({
      type: UploadProductVideoDto,
    }),
    ApiResponse({
      status: 201,
      type: ProductImageResponseDto,
    }),
  );

// ============== Product Variant Decorators ==============

export const ApiGetProductVariants = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get all variants of a product',
      description: 'Retrieve all variants associated with a product',
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: [ProductVariantResponseDto],
    }),
  );

export const ApiAddProductVariant = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Add variant to product',
      description: 'Add a new variant to a product',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiBody({
      type: CreateSingleVariantDto,
    }),
    ApiResponse({
      status: 201,
      type: ProductVariantResponseDto,
    }),
  );

export const ApiUpdateProductVariant = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update product variant',
      description: 'Update product variant properties',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiParam({
      name: 'variantId',
      description: 'Variant ID',
      type: String,
    }),
    ApiBody({
      type: UpdateSingleVariantDto,
    }),
    ApiResponse({
      status: 200,
      type: ProductVariantResponseDto,
    }),
  );

export const ApiDeleteProductVariant = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete product variant',
      description: 'Remove a variant from a product',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiParam({
      name: 'variantId',
      description: 'Variant ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Variant deleted successfully',
    }),
  );

// ============== Product Badge Decorators ==============

export const ApiGetProductBadges = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get all badges of a product',
      description: 'Retrieve all badges associated with a product',
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      type: [ProductBadgeResponseDto],
    }),
  );

export const ApiAddProductBadge = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Add badge to product',
      description: 'Add a new badge to a product',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiBody({
      type: CreateSingleBadgeDto,
    }),
    ApiResponse({
      status: 201,
      type: ProductBadgeResponseDto,
    }),
  );

export const ApiAddMultipleProductBadges = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Add multiple badges to product',
      description: 'Add multiple badges to a product at once',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiBody({
      type: CreateMultipleBadgesDto,
    }),
    ApiResponse({
      status: 201,
      type: [ProductBadgeResponseDto],
    }),
  );

export const ApiUpdateProductBadge = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update a product badge',
      description: 'Update an existing badge of a product',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiParam({
      name: 'badgeId',
      description: 'Badge ID',
      type: String,
    }),
    ApiBody({
      type: UpdateBadgeDto,
    }),
    ApiResponse({
      status: 200,
      type: ProductBadgeResponseDto,
    }),
  );

export const ApiDeleteProductBadge = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete a product badge',
      description: 'Delete an existing badge from a product',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiParam({
      name: 'badgeId',
      description: 'Badge ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Badge deleted successfully',
    }),
  );

// ============== Public Product Decorators ==============

export const ApiGetHotProducts = () =>
  applyDecorators(
    ApiPublicOperation({
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
    }),
    ApiResponse({
      status: 200,
      description: 'Hot products retrieved successfully',
      type: [ProductResponseDto],
    }),
  );

export const ApiTrackProductView = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Track product view',
      description:
        'Increments the view count for a product. Call this when a user views the product detail page.',
    }),
    ApiParam({
      name: 'id',
      description: 'Product ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'View tracked successfully',
    }),
  );
