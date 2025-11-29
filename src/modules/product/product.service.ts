import { Injectable } from '@nestjs/common';
import { MediaType, Prisma } from 'prisma/generated/prisma/client';
import { StorageService } from 'src/modules/storage/storage.service';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  productBadgeSelect,
  productImageSelect,
  productListSelect,
  ProductListSelect,
  productSelect,
  ProductSelect,
  productVariantSelect,
} from 'src/libs/prisma/product-select';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  toResponseDto,
  toResponseDtoArray,
} from 'src/libs/utils/transform.utils';
import { PrismaService } from 'src/services/prisma/prisma.service';
import slugify from 'slugify';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ProductBadgeResponseDto,
  ProductResponseDto,
} from './dto/product-response.dto';
import {
  AddProductImageDto,
  ProductImageResponseDto,
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
import { generateSkuCode, processDataObject } from 'src/libs/utils/utils';

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'basePrice' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async getAllProducts({
    page = 1,
    limit = 10,
    search,
    categoryId,
    brandId,
    isActive,
    isFeatured,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',
    order = 'desc',
  }: GetProductsParams): Promise<
    IBeforeTransformPaginationResponseType<ProductResponseDto>
  > {
    try {
      const whereQuery: Prisma.ProductWhereInput = {
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive' as const,
          },
        }),
        ...(categoryId && {
          productCategories: {
            some: { categoryId },
          },
        }),
        ...(brandId && { brandId }),
        ...(isActive !== undefined && { isActive }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...((minPrice !== undefined || maxPrice !== undefined) && {
          basePrice: {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
          },
        }),
      };

      const [products, totalCount] = await Promise.all([
        this.prismaService.product.findMany({
          select: productListSelect,
          where: whereQuery,
          orderBy: {
            [sortBy]: order,
          },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.product.count({
          where: whereQuery,
        }),
      ]);

      const productResponses = products.map((product) =>
        this.mapProductListEntity(product),
      );

      return {
        type: 'pagination',
        message: 'Products retrieved successfully',
        data: {
          items: productResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get products',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getProductById(
    productId: string,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: productSelect,
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      const productResponse = this.mapProductEntity(product);

      return {
        type: 'response',
        message: 'Product retrieved successfully',
        data: productResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get product',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getProductBySlug(
    slug: string,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { slug },
        select: productSelect,
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      const productResponse = this.mapProductEntity(product);

      return {
        type: 'response',
        message: 'Product retrieved successfully',
        data: productResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get product',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    try {
      // Check if SKU already exists
      const existingSku = await this.prismaService.product.findUnique({
        where: { sku: createProductDto.sku },
        select: { id: true },
      });

      if (existingSku) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_SKU_EXISTS],
          ERROR_CODES.PRODUCT_SKU_EXISTS,
        );
      }

      // Check if all categories exist
      const categories = await this.prismaService.category.findMany({
        where: { id: { in: createProductDto.categoryIds } },
        select: { id: true },
      });

      if (categories.length !== createProductDto.categoryIds.length) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CATEGORY_NOT_FOUND],
          ERROR_CODES.CATEGORY_NOT_FOUND,
        );
      }

      // Check if brand exists (if provided)
      if (createProductDto.brandId) {
        const brand = await this.prismaService.brand.findUnique({
          where: { id: createProductDto.brandId },
          select: { id: true },
        });

        if (!brand) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.BRAND_NOT_FOUND],
            ERROR_CODES.BRAND_NOT_FOUND,
          );
        }
      }

      // Check variant SKUs
      if (createProductDto.variants && createProductDto.variants.length > 0) {
        const variantSkus = createProductDto.variants.map((v) => v.sku);
        const existingVariantSkus =
          await this.prismaService.productVariant.findMany({
            where: { sku: { in: variantSkus } },
            select: { sku: true },
          });

        if (existingVariantSkus.length > 0) {
          throw new BusinessException(
            `${ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS]}: ${existingVariantSkus.map((v) => v.sku).join(', ')}`,
            ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS,
          );
        }
      }

      const slug = await this.ensureUniqueSlug(createProductDto.name);

      const product = await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          slug,
          description: createProductDto.description,
          shortDesc: createProductDto.shortDesc,
          sku: createProductDto.sku,
          productCategories: {
            create: createProductDto.categoryIds.map((categoryId) => ({
              categoryId,
            })),
          },
          brandId: createProductDto.brandId,
          basePrice: createProductDto.basePrice,
          comparePrice: createProductDto.comparePrice,
          isActive: createProductDto.isActive ?? true,
          isFeatured: createProductDto.isFeatured ?? false,
          weight: createProductDto.weight,
          metaTitle: createProductDto.metaTitle,
          metaDesc: createProductDto.metaDesc,
          variants: createProductDto.variants
            ? {
                create: createProductDto.variants.map((variant) => ({
                  sku: variant.sku || generateSkuCode(),
                  name: variant.name,
                  color: variant.color,
                  size: variant.size,
                  type: variant.type,
                  price: variant.price,
                  sortOrder: variant.sortOrder ?? 0,
                  inventory: {
                    create: {
                      quantity: variant.quantity ?? 0,
                      lowStockThreshold: variant.lowStockThreshold ?? 10,
                      displayStatus:
                        (variant.quantity ?? 0) > 0
                          ? 'in_stock'
                          : 'out_of_stock',
                    },
                  },
                })),
              }
            : undefined,
        },
        select: productSelect,
      });

      const productResponse = this.mapProductEntity(product);

      return {
        type: 'response',
        message: 'Product created successfully',
        data: productResponse,
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to create product',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateProduct({
    productId,
    updateProductDto,
  }: {
    productId: string;
    updateProductDto: UpdateProductDto;
  }): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    try {
      const existing = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true, name: true, sku: true },
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Check if new SKU already exists (if changing)
      if (updateProductDto.sku && updateProductDto.sku !== existing.sku) {
        const existingSku = await this.prismaService.product.findUnique({
          where: { sku: updateProductDto.sku },
          select: { id: true },
        });

        if (existingSku) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PRODUCT_SKU_EXISTS],
            ERROR_CODES.PRODUCT_SKU_EXISTS,
          );
        }
      }

      // Check if all categories exist (if changing)
      if (
        updateProductDto.categoryIds &&
        updateProductDto.categoryIds.length > 0
      ) {
        const categories = await this.prismaService.category.findMany({
          where: { id: { in: updateProductDto.categoryIds } },
          select: { id: true },
        });

        if (categories.length !== updateProductDto.categoryIds.length) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.CATEGORY_NOT_FOUND],
            ERROR_CODES.CATEGORY_NOT_FOUND,
          );
        }
      }

      // Check if brand exists (if changing)
      if (updateProductDto.brandId) {
        const brand = await this.prismaService.brand.findUnique({
          where: { id: updateProductDto.brandId },
          select: { id: true },
        });

        if (!brand) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.BRAND_NOT_FOUND],
            ERROR_CODES.BRAND_NOT_FOUND,
          );
        }
      }

      // Build update data
      const updateData: Prisma.ProductUpdateInput = {};

      if (updateProductDto.name !== undefined) {
        updateData.name = updateProductDto.name;
        if (updateProductDto.name !== existing.name) {
          updateData.slug = await this.ensureUniqueSlug(
            updateProductDto.name,
            productId,
          );
        }
      }
      if (updateProductDto.description !== undefined)
        updateData.description = updateProductDto.description;
      if (updateProductDto.shortDesc !== undefined)
        updateData.shortDesc = updateProductDto.shortDesc;
      if (updateProductDto.sku !== undefined)
        updateData.sku = updateProductDto.sku;
      if (updateProductDto.categoryIds !== undefined) {
        // Delete existing product categories and create new ones
        await this.prismaService.productCategory.deleteMany({
          where: { productId },
        });
        await this.prismaService.productCategory.createMany({
          data: updateProductDto.categoryIds.map((categoryId) => ({
            productId,
            categoryId,
          })),
        });
      }
      if (updateProductDto.brandId !== undefined)
        updateData.brand = { connect: { id: updateProductDto.brandId } };
      if (updateProductDto.basePrice !== undefined)
        updateData.basePrice = updateProductDto.basePrice;
      if (updateProductDto.comparePrice !== undefined)
        updateData.comparePrice = updateProductDto.comparePrice;
      if (updateProductDto.isActive !== undefined)
        updateData.isActive = updateProductDto.isActive;
      if (updateProductDto.isFeatured !== undefined)
        updateData.isFeatured = updateProductDto.isFeatured;
      if (updateProductDto.weight !== undefined)
        updateData.weight = updateProductDto.weight;
      if (updateProductDto.metaTitle !== undefined)
        updateData.metaTitle = updateProductDto.metaTitle;
      if (updateProductDto.metaDesc !== undefined)
        updateData.metaDesc = updateProductDto.metaDesc;

      // Handle variants update
      if (updateProductDto.variants !== undefined) {
        // Delete existing variants and recreate
        await this.prismaService.productVariant.deleteMany({
          where: { productId },
        });

        if (updateProductDto.variants.length > 0) {
          // Check variant SKUs
          const variantSkus = updateProductDto.variants.map((v) => v.sku!);
          const existingVariantSkus =
            await this.prismaService.productVariant.findMany({
              where: { sku: { in: variantSkus } },
              select: { sku: true },
            });

          if (existingVariantSkus.length > 0) {
            throw new BusinessException(
              `${ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS]}: ${existingVariantSkus.map((v) => v.sku).join(', ')}`,
              ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS,
            );
          }

          updateData.variants = {
            create: updateProductDto.variants.map((variant) => ({
              sku: variant.sku!,
              name: variant.name!,
              color: variant.color,
              size: variant.size,
              type: variant.type,
              price: variant.price!,
              sortOrder: variant.sortOrder ?? 0,
              inventory: {
                create: {
                  quantity: variant.quantity ?? 0,
                  lowStockThreshold: variant.lowStockThreshold ?? 10,
                  displayStatus:
                    (variant.quantity ?? 0) > 0 ? 'in_stock' : 'out_of_stock',
                },
              },
            })),
          };
        }
      }

      const updated = await this.prismaService.product.update({
        where: { id: productId },
        data: updateData,
        select: productSelect,
      });

      const productResponse = this.mapProductEntity(updated);

      return {
        type: 'response',
        message: 'Product updated successfully',
        data: productResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to update product',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteProduct(
    productId: string,
  ): Promise<IBeforeTransformResponseType<ProductResponseDto>> {
    try {
      const existing = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: productSelect,
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Check if product has orders
      const ordersCount = await this.prismaService.orderItem.count({
        where: { productId },
      });

      if (ordersCount > 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_HAS_ORDERS],
          ERROR_CODES.PRODUCT_HAS_ORDERS,
        );
      }

      await this.prismaService.product.delete({
        where: { id: productId },
      });

      const productResponse = this.mapProductEntity(existing);

      return {
        type: 'response',
        message: 'Product deleted successfully',
        data: productResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to delete product',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Product Image Methods ==============

  async addProductImage(
    productId: string,
    dto: AddProductImageDto,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Check if variant exists (if provided)
      if (dto.variantId) {
        const variant = await this.prismaService.productVariant.findFirst({
          where: { id: dto.variantId, productId },
          select: { id: true },
        });

        if (!variant) {
          throw new BusinessException(
            'Product variant not found',
            ERROR_CODES.PRODUCT_NOT_FOUND,
          );
        }
      }

      // Check if media exists and is a product image type
      const media = await this.prismaService.media.findUnique({
        where: { id: dto.mediaId },
        select: { id: true, type: true, url: true, mimetype: true },
      });

      if (!media) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.MEDIA_NOT_FOUND],
          ERROR_CODES.MEDIA_NOT_FOUND,
        );
      }

      // If isPrimary is true, unset other primary images
      if (dto.isPrimary) {
        await this.prismaService.productImage.updateMany({
          where: { productId, isPrimary: true },
          data: { isPrimary: false },
        });
      }

      // Get current max sortOrder
      const maxSortOrder = await this.prismaService.productImage.aggregate({
        where: { productId },
        _max: { sortOrder: true },
      });

      const productImage = await this.prismaService.productImage.create({
        data: {
          productId,
          variantId: dto.variantId,
          mediaId: dto.mediaId,
          alt: dto.alt,
          sortOrder: dto.sortOrder ?? (maxSortOrder._max.sortOrder ?? -1) + 1,
          isPrimary: dto.isPrimary ?? false,
        },
        select: productImageSelect,
      });

      const responseData = toResponseDto(ProductImageResponseDto, productImage);

      return {
        type: 'response',
        message: 'Product image added successfully',
        data: responseData,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to add product image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateProductImage(
    productId: string,
    imageId: string,
    dto: UpdateProductImageDto,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    try {
      // Check if product image exists
      const existingImage = await this.prismaService.productImage.findFirst({
        where: { id: imageId, productId },
        select: { id: true },
      });

      if (!existingImage) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_IMAGE_NOT_FOUND],
          ERROR_CODES.PRODUCT_IMAGE_NOT_FOUND,
        );
      }

      // If setting as primary, unset other primary images
      if (dto.isPrimary === true) {
        await this.prismaService.productImage.updateMany({
          where: { productId, isPrimary: true, id: { not: imageId } },
          data: { isPrimary: false },
        });
      }

      const updatedImage = await this.prismaService.productImage.update({
        where: { id: imageId },
        data: {
          ...(dto.alt !== undefined && { alt: dto.alt }),
          ...(dto.sortOrder !== undefined && { sortOrder: dto.sortOrder }),
          ...(dto.isPrimary !== undefined && { isPrimary: dto.isPrimary }),
        },
        select: productImageSelect,
      });
      const responseData = toResponseDto(ProductImageResponseDto, updatedImage);

      return {
        type: 'response',
        message: 'Product image updated successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to update product image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteProductImage(
    productId: string,
    imageId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Check if product image exists
      const existingImage = await this.prismaService.productImage.findFirst({
        where: { id: imageId, productId },
        select: { id: true, isPrimary: true, mediaId: true },
      });

      if (!existingImage) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_IMAGE_NOT_FOUND],
          ERROR_CODES.PRODUCT_IMAGE_NOT_FOUND,
        );
      }

      // Delete the product image record
      await this.prismaService.productImage.delete({
        where: { id: imageId },
      });

      // If deleted image was primary, set first remaining image as primary
      if (existingImage.isPrimary) {
        const firstImage = await this.prismaService.productImage.findFirst({
          where: { productId },
          orderBy: { sortOrder: 'asc' },
          select: { id: true },
        });

        if (firstImage) {
          await this.prismaService.productImage.update({
            where: { id: firstImage.id },
            data: { isPrimary: true },
          });
        }
      }

      return {
        type: 'response',
        message: 'Product image deleted successfully',
        data: { message: 'Product image deleted successfully' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to delete product image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getProductImages(
    productId: string,
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto[]>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      const images = await this.prismaService.productImage.findMany({
        where: { productId },
        orderBy: { sortOrder: 'asc' },
        select: productImageSelect,
      });

      const responseData = toResponseDtoArray(ProductImageResponseDto, images);

      return {
        type: 'response',
        message: 'Product images retrieved successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get product images',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async reorderProductImages(
    productId: string,
    imageIds: string[],
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto[]>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Update sort order for each image
      await Promise.all(
        imageIds.map((imageId, index) =>
          this.prismaService.productImage.updateMany({
            where: { id: imageId, productId },
            data: { sortOrder: index },
          }),
        ),
      );

      const images = await this.prismaService.productImage.findMany({
        where: { productId },
        orderBy: { sortOrder: 'asc' },
        select: productImageSelect,
      });

      const responseData = toResponseDtoArray(ProductImageResponseDto, images);

      return {
        type: 'response',
        message: 'Product images reordered successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to reorder product images',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Upload Methods ==============

  async uploadProductImage({
    productId,
    file,
    userId,
    options,
  }: {
    productId: string;
    file: Express.Multer.File;
    userId?: string;
    options?: { variantId?: string; alt?: string; isPrimary?: boolean };
  }): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Check if variant exists (if provided)
      if (options?.variantId) {
        const variant = await this.prismaService.productVariant.findFirst({
          where: { id: options.variantId, productId },
          select: { id: true },
        });

        if (!variant) {
          throw new BusinessException(
            'Product variant not found',
            ERROR_CODES.PRODUCT_NOT_FOUND,
          );
        }
      }

      // Upload file to storage
      const uploadResult = await this.storageService.uploadFile(
        {
          file,
          type: MediaType.PRODUCT_IMAGE,
          userId,
        },
        {
          getDirectUrl: true,
        },
      );

      // If isPrimary is true, unset other primary images
      if (options?.isPrimary) {
        await this.prismaService.productImage.updateMany({
          where: { productId, isPrimary: true },
          data: { isPrimary: false },
        });
      }

      // Get current max sortOrder
      const maxSortOrder = await this.prismaService.productImage.aggregate({
        where: { productId },
        _max: { sortOrder: true },
      });

      const validOptions = await processDataObject(options);

      // Create product image record
      const productImage = await this.prismaService.productImage.create({
        data: {
          productId,
          variantId: validOptions?.variantId || undefined,
          mediaId: uploadResult.id,
          alt: validOptions?.alt,
          sortOrder: (maxSortOrder._max.sortOrder ?? -1) + 1,
          isPrimary: validOptions?.isPrimary ?? false,
        },
        select: productImageSelect,
      });

      const responseData = toResponseDto(ProductImageResponseDto, productImage);

      return {
        type: 'response',
        message: 'Product image uploaded successfully',
        data: responseData,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to upload product image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async uploadProductVideo(
    productId: string,
    file: Express.Multer.File,
    userId: string,
    options?: { variantId?: string; alt?: string },
  ): Promise<IBeforeTransformResponseType<ProductImageResponseDto>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Check if variant exists (if provided)
      if (options?.variantId) {
        const variant = await this.prismaService.productVariant.findFirst({
          where: { id: options.variantId, productId },
          select: { id: true },
        });

        if (!variant) {
          throw new BusinessException(
            'Product variant not found',
            ERROR_CODES.PRODUCT_NOT_FOUND,
          );
        }
      }

      // Upload file to storage
      const uploadResult = await this.storageService.uploadFile({
        file,
        type: MediaType.PRODUCT_VIDEO,
        userId,
      });

      // Get current max sortOrder
      const maxSortOrder = await this.prismaService.productImage.aggregate({
        where: { productId },
        _max: { sortOrder: true },
      });

      // Create product image record (videos stored same as images)
      const productImage = await this.prismaService.productImage.create({
        data: {
          productId,
          variantId: options?.variantId,
          mediaId: uploadResult.id,
          alt: options?.alt,
          sortOrder: (maxSortOrder._max.sortOrder ?? -1) + 1,
          isPrimary: false,
        },
        select: productImageSelect,
      });
      const responseData = toResponseDto(ProductImageResponseDto, productImage);

      return {
        type: 'response',
        message: 'Product video uploaded successfully',
        data: responseData,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to upload product video',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Product Variant Methods ==============

  async getProductVariants(
    productId: string,
  ): Promise<IBeforeTransformResponseType<ProductVariantResponseDto[]>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      const variants = await this.prismaService.productVariant.findMany({
        where: { productId },
        orderBy: { sortOrder: 'asc' },
        select: productVariantSelect,
      });

      const responseData = toResponseDtoArray(
        ProductVariantResponseDto,
        variants.map((v) => ({ ...v, productId })),
      );

      return {
        type: 'response',
        message: 'Product variants retrieved successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get product variants',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async addProductVariant(
    productId: string,
    dto: CreateSingleVariantDto,
  ): Promise<IBeforeTransformResponseType<ProductVariantResponseDto>> {
    try {
      const productSku = dto.sku || generateSkuCode();
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true, basePrice: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Check if SKU already exists
      const existingSku = await this.prismaService.productVariant.findUnique({
        where: { sku: productSku },
        select: { id: true },
      });

      if (existingSku) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS],
          ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS,
        );
      }

      const processedData = await processDataObject(dto);
      const { quantity, lowStockThreshold, ...data } = processedData;

      const variant = await this.prismaService.productVariant.create({
        data: {
          productId,
          ...data,
          sku: productSku,
          price: data.price || product.basePrice,
          inventory: {
            create: {
              quantity,
              lowStockThreshold,
              displayStatus: (quantity ?? 0) > 0 ? 'in_stock' : 'out_of_stock',
            },
          },
        },
        select: productVariantSelect,
      });

      const responseData = toResponseDto(ProductVariantResponseDto, {
        ...variant,
        productId,
      });

      return {
        type: 'response',
        message: 'Product variant added successfully',
        data: responseData,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to add product variant',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateProductVariant(
    productId: string,
    variantId: string,
    dto: UpdateSingleVariantDto,
  ): Promise<IBeforeTransformResponseType<ProductVariantResponseDto>> {
    try {
      // Check if variant exists and belongs to product
      const existingVariant = await this.prismaService.productVariant.findFirst(
        {
          where: { id: variantId, productId },
          select: { id: true, sku: true },
        },
      );

      if (!existingVariant) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND],
          ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND,
        );
      }

      // Check if new SKU already exists (if changing)
      if (dto.sku && dto.sku !== existingVariant.sku) {
        const existingSku = await this.prismaService.productVariant.findUnique({
          where: { sku: dto.sku },
          select: { id: true },
        });

        if (existingSku) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS],
            ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS,
          );
        }
      }

      // Build update data for variant
      const updateData: Prisma.ProductVariantUpdateInput = {};
      if (dto.sku !== undefined) updateData.sku = dto.sku;
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.color !== undefined) updateData.color = dto.color;
      if (dto.size !== undefined) updateData.size = dto.size;
      if (dto.type !== undefined) updateData.type = dto.type;
      if (dto.price !== undefined) updateData.price = dto.price;
      if (dto.sortOrder !== undefined) updateData.sortOrder = dto.sortOrder;

      // Update variant
      const variant = await this.prismaService.productVariant.update({
        where: { id: variantId },
        data: updateData,
        include: {
          inventory: true,
        },
      });

      // Update inventory if quantity or lowStockThreshold provided
      if (dto.quantity !== undefined || dto.lowStockThreshold !== undefined) {
        await this.prismaService.productInventory.upsert({
          where: { variantId },
          create: {
            variantId,
            quantity: dto.quantity ?? 0,
            lowStockThreshold: dto.lowStockThreshold ?? 10,
            displayStatus:
              (dto.quantity ?? 0) > 0 ? 'in_stock' : 'out_of_stock',
          },
          update: {
            ...(dto.quantity !== undefined && {
              quantity: dto.quantity,
              displayStatus: dto.quantity > 0 ? 'in_stock' : 'out_of_stock',
            }),
            ...(dto.lowStockThreshold !== undefined && {
              lowStockThreshold: dto.lowStockThreshold,
            }),
          },
        });
      }

      // Fetch updated variant with inventory
      const updatedVariant = await this.prismaService.productVariant.findUnique(
        {
          where: { id: variantId },
          select: productVariantSelect,
        },
      );

      const responseData = toResponseDto(ProductVariantResponseDto, {
        ...updatedVariant,
        productId,
      });

      return {
        type: 'response',
        message: 'Product variant updated successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to update product variant',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteProductVariant(
    productId: string,
    variantId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Check if variant exists and belongs to product
      const existingVariant = await this.prismaService.productVariant.findFirst(
        {
          where: { id: variantId, productId },
          select: { id: true },
        },
      );

      if (!existingVariant) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND],
          ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND,
        );
      }

      // Check if variant has orders
      const ordersCount = await this.prismaService.orderItem.count({
        where: { variantId },
      });

      if (ordersCount > 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_HAS_ORDERS],
          ERROR_CODES.PRODUCT_VARIANT_HAS_ORDERS,
        );
      }

      // Delete the variant (cascade will delete inventory and images)
      await this.prismaService.productVariant.delete({
        where: { id: variantId },
      });

      return {
        type: 'response',
        message: 'Product variant deleted successfully',
        data: { message: 'Product variant deleted successfully' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to delete product variant',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getProductBadges({
    productId,
  }: {
    productId: string;
  }): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto[]>> {
    try {
      const productBadges = await this.prismaService.productBadge.findMany({
        where: { productId },
        select: productBadgeSelect,
      });

      const responseData = toResponseDtoArray(ProductBadgeResponseDto, {
        ...productBadges,
      });

      return {
        type: 'response',
        message: 'Product badges retrieved successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get product badges',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async addProductBadge({
    productId,
    createBadgeDto,
  }: {
    productId: string;
    createBadgeDto: CreateSingleBadgeDto;
  }): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Create badge
      const badge = await this.prismaService.productBadge.create({
        data: {
          productId,
          name: createBadgeDto.name,
          sortOrder: createBadgeDto.sortOrder ?? 0,
          isActive: createBadgeDto.isActive ?? true,
          variant: createBadgeDto.variant,
          type: createBadgeDto.type,
        },
        select: productBadgeSelect,
      });

      const responseData = toResponseDto(ProductBadgeResponseDto, badge);

      return {
        type: 'response',
        message: 'Product badge created successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to create product badge',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async addMultipleProductBadges({
    productId,
    createBadgesDto,
  }: {
    productId: string;
    createBadgesDto: CreateMultipleBadgesDto;
  }): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto[]>> {
    try {
      // Check if product exists
      const product = await this.prismaService.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Create multiple badges
      const badges = await this.prismaService.$transaction(
        createBadgesDto.badges.map((badge) =>
          this.prismaService.productBadge.create({
            data: {
              productId,
              name: badge.name,
              sortOrder: badge.sortOrder ?? 0,
              isActive: badge.isActive ?? true,
              variant: badge.variant,
              type: badge.type,
            },
            select: productBadgeSelect,
          }),
        ),
      );

      const responseData = toResponseDtoArray(ProductBadgeResponseDto, badges);

      return {
        type: 'response',
        message: `${badges.length} product badges created successfully`,
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to create product badges',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateProductBadge({
    productId,
    badgeId,
    updateBadgeDto,
  }: {
    productId: string;
    badgeId: string;
    updateBadgeDto: UpdateBadgeDto;
  }): Promise<IBeforeTransformResponseType<ProductBadgeResponseDto>> {
    try {
      // Check if badge exists and belongs to product
      const existingBadge = await this.prismaService.productBadge.findFirst({
        where: { id: badgeId, productId },
      });

      if (!existingBadge) {
        throw new BusinessException(
          'Product badge not found',
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Update badge
      const badge = await this.prismaService.productBadge.update({
        where: { id: badgeId },
        data: {
          name: updateBadgeDto.name,
          sortOrder: updateBadgeDto.sortOrder,
          isActive: updateBadgeDto.isActive,
          variant: updateBadgeDto.variant,
          type: updateBadgeDto.type,
        },
        select: productBadgeSelect,
      });

      const responseData = toResponseDto(ProductBadgeResponseDto, badge);

      return {
        type: 'response',
        message: 'Product badge updated successfully',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to update product badge',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteProductBadge({
    productId,
    badgeId,
  }: {
    productId: string;
    badgeId: string;
  }): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Check if badge exists and belongs to product
      const existingBadge = await this.prismaService.productBadge.findFirst({
        where: { id: badgeId, productId },
      });

      if (!existingBadge) {
        throw new BusinessException(
          'Product badge not found',
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Delete badge
      await this.prismaService.productBadge.delete({
        where: { id: badgeId },
      });

      return {
        type: 'response',
        message: 'Product badge deleted successfully',
        data: { message: 'Product badge deleted successfully' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to delete product badge',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Private Methods ==============

  private mapProductEntity(product: ProductSelect): ProductResponseDto {
    console.log(product);
    return toResponseDto(ProductResponseDto, {
      ...product,
      // categories: product.productCategories.map((pc) => pc.category),
      primaryImage: product.images.find((image) => image.isPrimary),
    });
  }

  private mapProductListEntity(product: ProductListSelect): ProductResponseDto {
    console.log(product);
    return toResponseDto(ProductResponseDto, {
      ...product,
      // categories: product.productCategories.map((pc) => pc.category),
      primaryImage: product.images.find((image) => image.isPrimary),
    });
  }

  private async ensureUniqueSlug(
    name: string,
    excludeProductId?: string,
  ): Promise<string> {
    const baseSlug = slugify(name, {
      lower: true,
    });
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.prismaService.product.findFirst({
        where: {
          slug,
          ...(excludeProductId ? { id: { not: excludeProductId } } : {}),
        },
        select: { id: true },
      });

      if (!existing) {
        break;
      }

      slug = `${baseSlug}-${counter++}`;
    }

    return slug;
  }
}
