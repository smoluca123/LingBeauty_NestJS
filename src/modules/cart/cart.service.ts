import { Injectable } from '@nestjs/common';
import { FlashSaleStatus, Prisma } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  cartItemSelect,
  CartItemSelect,
  cartSelect,
  CartSelect,
} from 'src/libs/prisma/cart-select';
import { withoutDeleted } from 'src/libs/prisma/soft-delete.helpers';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  AddToCartDto,
  CartItemResponseDto,
  CartResponseDto,
  CartSummaryDto,
  UpdateCartItemDto,
} from './dto/cart.dto';

/** Default backorder floor when no inventory record exists. */
const DEFAULT_MIN_STOCK_QUANTITY = -10;

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  // ============== Private Helpers ==============

  /**
   * Get or create a cart for the given user.
   * Each user has exactly one cart (enforced by unique userId on Cart model).
   */
  private async getOrCreateCart(userId: string): Promise<{ id: string }> {
    const existing = await this.prismaService.cart.findFirst({
      where: withoutDeleted({ userId }),
      select: { id: true },
    });

    if (existing) return existing;

    return this.prismaService.cart.create({
      data: { userId },
      select: { id: true },
    });
  }

  /**
   * Resolve stock data for a cart item.
   * After migration, all cart items have variantId.
   */
  private async resolveItemInventory(
    variantId: string,
    productId: string,
    variantInventory:
      | { quantity: number; minStockQuantity: number }
      | null
      | undefined,
  ): Promise<{ quantity: number; minStockQuantity: number }> {
    if (variantInventory !== undefined) {
      // Inventory already fetched with the variant — use it directly
      return {
        quantity: variantInventory?.quantity ?? 0,
        minStockQuantity:
          variantInventory?.minStockQuantity ?? DEFAULT_MIN_STOCK_QUANTITY,
      };
    }

    // Variant exists but inventory wasn't pre-fetched — load it
    const inv = await this.prismaService.productVariant
      .findFirst({
        where: { id: variantId },
        select: {
          inventory: { select: { quantity: true, minStockQuantity: true } },
        },
      })
      .then((v) => v?.inventory ?? null);

    return {
      quantity: inv?.quantity ?? 0,
      minStockQuantity: inv?.minStockQuantity ?? DEFAULT_MIN_STOCK_QUANTITY,
    };
  }

  /**
   * Throw CART_ITEM_BACKORDER_LIMIT_REACHED if the desired quantity would drop
   * projected stock below the backorder floor.
   * projectedStock = currentStock - desiredQty; must be >= minStockQuantity.
   */
  private assertBackorderLimit(
    currentStock: number,
    desiredQty: number,
    minStockQuantity: number,
  ): void {
    if (currentStock - desiredQty < minStockQuantity) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.CART_ITEM_BACKORDER_LIMIT_REACHED],
        ERROR_CODES.CART_ITEM_BACKORDER_LIMIT_REACHED,
      );
    }
  }

  private async getActiveFlashSaleMap(): Promise<Record<string, any>> {
    const now = new Date();
    const flashSale = await this.prismaService.flashSale.findFirst({
      where: withoutDeleted({
        isActive: true,
        startTime: { lte: now },
        endTime: { gte: now },
        status: FlashSaleStatus.ACTIVE,
      }),
      include: {
        products: {
          where: { isActive: true },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    const map: Record<string, any> = {};
    if (!flashSale) return map;

    for (const p of flashSale.products) {
      // After migration, all flash sale products have variantId
      const key = `${p.productId}_${p.variantId}`;
      map[key] = {
        ...p,
        flashSaleId: flashSale.id,
        flashSaleName: flashSale.name,
      };
    }
    return map;
  }

  /**
   * Map a CartItemSelect DB entity to CartItemResponseDto.
   */
  private mapCartItem(
    item: CartItemSelect,
    flashSaleMap: Record<string, any> = {},
  ): CartItemResponseDto {
    // After migration, all cart items have variantId
    const fsKey = `${item.productId}_${item.variantId}`;
    const fsProduct = flashSaleMap[fsKey];

    // Get price from variant (all items have variant now)
    const baseItemPrice = item.variant
      ? Number(item.variant.price)
      : Number(item.product.basePrice); // Fallback for safety

    // Debug logging
    if (fsProduct) {
      console.log('Flash Sale Item Debug:', {
        productId: item.productId,
        variantId: item.variantId,
        variantPrice: item.variant?.price,
        basePrice: item.product.basePrice,
        baseItemPrice,
        flashPrice: fsProduct.flashPrice,
      });
    }

    // Apply Flash Sale price if available
    const price = fsProduct ? Number(fsProduct.flashPrice) : baseItemPrice;
    const lineTotal = (price * item.quantity).toFixed(2);
    const thumbnailImage = item.product.images[0] ?? null;

    // stockInfo: use variant inventory (all items have variant now)
    const stockInfo = {
      stockQuantity: item.variant?.inventory?.quantity ?? 0,
      minStockQuantity:
        item.variant?.inventory?.minStockQuantity ?? DEFAULT_MIN_STOCK_QUANTITY,
      stockStatus: item.variant?.inventory?.displayStatus ?? 'OUT_OF_STOCK',
    };

    const flashSaleInfo = fsProduct
      ? {
          flashSaleId: fsProduct.flashSaleId,
          flashSaleName: fsProduct.flashSaleName,
          flashPrice: fsProduct.flashPrice.toString(),
          originalPrice: baseItemPrice.toString(),
          limitPerOrder: fsProduct.limitPerOrder,
          maxQuantity: fsProduct.maxQuantity,
          soldQuantity: fsProduct.soldQuantity,
        }
      : null;

    return {
      id: item.id,
      cartId: item.cartId,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      lineTotal,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        sku: item.product.sku,
        basePrice: item.product.basePrice.toString(),
        comparePrice: item.product.comparePrice?.toString() ?? null,
        isActive: item.product.isActive,
        thumbnailImage: thumbnailImage
          ? {
              alt: thumbnailImage.alt,
              media: {
                url: thumbnailImage.media.url,
                mimetype: thumbnailImage.media.mimetype,
              },
            }
          : null,
      },
      variant: item.variant
        ? {
            id: item.variant.id,
            sku: item.variant.sku,
            name: item.variant.name,
            color: item.variant.color,
            size: item.variant.size,
            type: item.variant.type,
            price: item.variant.price.toString(),
          }
        : null,
      stockInfo,
      flashSaleInfo,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  /**
   * Build CartSummaryDto from a list of mapped cart item responses.
   */
  private buildCartSummary(items: CartItemResponseDto[]): CartSummaryDto {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items
      .reduce((sum, item) => sum + Number(item.lineTotal), 0)
      .toFixed(2);

    return {
      itemCount: items.length,
      totalQuantity,
      subtotal,
    };
  }

  /**
   * Map a full CartSelect DB entity to CartResponseDto.
   */
  private mapCart(
    cart: CartSelect,
    flashSaleMap: Record<string, any> = {},
  ): CartResponseDto {
    const items = cart.items.map((item) =>
      this.mapCartItem(item, flashSaleMap),
    );
    const summary = this.buildCartSummary(items);

    return {
      id: cart.id,
      userId: cart.userId,
      items,
      summary,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  // ============== Public Service Methods ==============

  /**
   * Get the current user's cart. Creates one if it doesn't exist yet.
   */
  async getCart(
    userId: string,
  ): Promise<IBeforeTransformResponseType<CartResponseDto>> {
    try {
      const cartRef = await this.getOrCreateCart(userId);

      const cart = await this.prismaService.cart.findUnique({
        where: { id: cartRef.id },
        select: cartSelect,
      });

      // Should never be null after getOrCreate, but guard anyway
      if (!cart) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_NOT_FOUND],
          ERROR_CODES.CART_NOT_FOUND,
        );
      }

      const flashSaleMap = await this.getActiveFlashSaleMap();

      return {
        type: 'response',
        message: 'Lấy giỏ hàng thành công',
        data: this.mapCart(cart, flashSaleMap),
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Add a product to the cart.
   * - Supports both variant products (variantId required) and no-variant products.
   * - If the item is already in the cart, increments quantity.
   * - Validates product is active, variant exists, and stock is sufficient.
   */
  async addToCart(
    userId: string,
    dto: AddToCartDto,
  ): Promise<IBeforeTransformResponseType<CartItemResponseDto>> {
    try {
      const quantity = dto.quantity ?? 1;

      // Validate product exists and is active
      const product = await this.prismaService.product.findFirst({
        where: withoutDeleted({ id: dto.productId, isActive: true }),
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      const cartRef = await this.getOrCreateCart(userId);

      // Resolve variantId: use provided or get default variant
      let resolvedVariantId = dto.variantId;

      if (!resolvedVariantId) {
        // Get default variant (prioritize -DEFAULT suffix, then first by sortOrder)
        const defaultVariant =
          await this.prismaService.productVariant.findFirst({
            where: withoutDeleted({
              productId: dto.productId,
              OR: [{ sku: { endsWith: '-DEFAULT' } }, { sortOrder: 0 }],
            }),
            orderBy: [
              { sku: 'asc' }, // Prioritize -DEFAULT suffix
              { sortOrder: 'asc' },
            ],
            select: { id: true },
          });

        if (!defaultVariant) {
          throw new BusinessException(
            'Sản phẩm không có variant nào',
            ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND,
          );
        }

        resolvedVariantId = defaultVariant.id;
      }

      // Validate variant exists and belongs to product
      const variant = await this.prismaService.productVariant.findFirst({
        where: withoutDeleted({
          id: resolvedVariantId,
          productId: dto.productId,
        }),
        select: {
          id: true,
          inventory: {
            select: {
              quantity: true,
              minStockQuantity: true,
            },
          },
        },
      });

      if (!variant) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND],
          ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND,
        );
      }

      // Check for existing cart item by variantId
      const existingItem = await this.prismaService.cartItem.findUnique({
        where: {
          cartId_variantId: {
            cartId: cartRef.id,
            variantId: resolvedVariantId,
          },
        },
        select: { id: true, quantity: true },
      });

      const newQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;

      // Check inventory
      const inv = await this.resolveItemInventory(
        resolvedVariantId,
        dto.productId,
        variant.inventory,
      );
      this.assertBackorderLimit(
        inv.quantity,
        newQuantity,
        inv.minStockQuantity,
      );

      // Flash Sale Check Before Update
      const fsMap = await this.getActiveFlashSaleMap();
      const variantKey = `${dto.productId}_${resolvedVariantId}`;
      const fsProduct = fsMap[variantKey];

      if (fsProduct) {
        if (newQuantity > fsProduct.limitPerOrder) {
          throw new BusinessException(
            `${ERROR_MESSAGES[ERROR_CODES.CART_FS_LIMIT_EXCEEDED]} (Tối đa: ${fsProduct.limitPerOrder})`,
            ERROR_CODES.CART_FS_LIMIT_EXCEEDED,
          );
        }
        const fsAvailable = fsProduct.maxQuantity - fsProduct.soldQuantity;
        if (newQuantity > fsAvailable) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.CART_FS_OUT_OF_STOCK],
            ERROR_CODES.CART_FS_OUT_OF_STOCK,
          );
        }
      }

      let cartItemId: string;

      if (existingItem) {
        // Update existing item quantity
        const updated = await this.prismaService.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: newQuantity },
          select: { id: true },
        });
        cartItemId = updated.id;
      } else {
        // Create new cart item
        const created = await this.prismaService.cartItem.create({
          data: {
            cartId: cartRef.id,
            productId: dto.productId,
            variantId: resolvedVariantId,
            quantity,
          },
          select: { id: true },
        });
        cartItemId = created.id;
      }

      // Fetch full item with relations for response
      const cartItem = await this.prismaService.cartItem.findUnique({
        where: { id: cartItemId },
        select: cartItemSelect,
      });

      if (!cartItem) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
          ERROR_CODES.DATABASE_ERROR,
        );
      }

      return {
        type: 'response',
        message: existingItem
          ? 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công'
          : 'Thêm sản phẩm vào giỏ hàng thành công',
        data: this.mapCartItem(cartItem, fsMap),
        statusCode: existingItem ? 200 : 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
  async updateCartItem(
    userId: string,
    itemId: string,
    dto: UpdateCartItemDto,
  ): Promise<IBeforeTransformResponseType<CartItemResponseDto>> {
    try {
      // Verify item belongs to the user's cart
      const cartRef = await this.prismaService.cart.findFirst({
        where: withoutDeleted({ userId }),
        select: { id: true },
      });

      if (!cartRef) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_NOT_FOUND],
          ERROR_CODES.CART_NOT_FOUND,
        );
      }

      const item = await this.prismaService.cartItem.findFirst({
        where: { id: itemId, cartId: cartRef.id },
        select: {
          id: true,
          productId: true,
          variantId: true,
          variant: {
            select: {
              inventory: {
                select: {
                  quantity: true,
                  displayStatus: true,
                  minStockQuantity: true,
                },
              },
            },
          },
        },
      });

      if (!item) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_ITEM_NOT_FOUND],
          ERROR_CODES.CART_ITEM_NOT_FOUND,
        );
      }

      // Validate new quantity against backorder floor using shared helper
      // After migration, all cart items have variantId
      const inv = await this.resolveItemInventory(
        item.variantId!,
        item.productId,
        item.variant ? item.variant.inventory : undefined,
      );
      this.assertBackorderLimit(
        inv.quantity,
        dto.quantity,
        inv.minStockQuantity,
      );

      // Flash Sale Check
      const fsMap = await this.getActiveFlashSaleMap();
      const variantKey = `${item.productId}_${item.variantId}`;
      const fsProduct = fsMap[variantKey];

      if (fsProduct) {
        if (dto.quantity > fsProduct.limitPerOrder) {
          throw new BusinessException(
            `${ERROR_MESSAGES[ERROR_CODES.CART_FS_LIMIT_EXCEEDED]} (Tối đa: ${fsProduct.limitPerOrder})`,
            ERROR_CODES.CART_FS_LIMIT_EXCEEDED,
          );
        }
        const fsAvailable = fsProduct.maxQuantity - fsProduct.soldQuantity;
        if (dto.quantity > fsAvailable) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.CART_FS_OUT_OF_STOCK],
            ERROR_CODES.CART_FS_OUT_OF_STOCK,
          );
        }
      }

      const updated = await this.prismaService.cartItem.update({
        where: { id: itemId },
        data: { quantity: dto.quantity },
        select: cartItemSelect,
      });

      return {
        type: 'response',
        message: 'Cập nhật giỏ hàng thành công',
        data: this.mapCartItem(updated, fsMap),
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Remove a single item from the cart.
   */
  async removeCartItem(
    userId: string,
    itemId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const cartRef = await this.prismaService.cart.findFirst({
        where: withoutDeleted({ userId }),
        select: { id: true },
      });

      if (!cartRef) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_NOT_FOUND],
          ERROR_CODES.CART_NOT_FOUND,
        );
      }

      const item = await this.prismaService.cartItem.findFirst({
        where: { id: itemId, cartId: cartRef.id },
        select: { id: true },
      });

      if (!item) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_ITEM_NOT_FOUND],
          ERROR_CODES.CART_ITEM_NOT_FOUND,
        );
      }

      await this.prismaService.cartItem.delete({ where: { id: itemId } });

      return {
        type: 'response',
        message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
        data: { message: 'Xóa sản phẩm khỏi giỏ hàng thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Clear all items from the user's cart.
   */
  async clearCart(
    userId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const cartRef = await this.prismaService.cart.findFirst({
        where: withoutDeleted({ userId }),
        select: { id: true },
      });

      if (!cartRef) {
        // No cart means nothing to clear — return success
        return {
          type: 'response',
          message: 'Giỏ hàng đã trống',
          data: { message: 'Giỏ hàng đã trống' },
        };
      }

      await this.prismaService.cartItem.deleteMany({
        where: { cartId: cartRef.id },
      });

      return {
        type: 'response',
        message: 'Xóa toàn bộ giỏ hàng thành công',
        data: { message: 'Xóa toàn bộ giỏ hàng thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get lightweight cart count for badge display (no heavy joins).
   */
  async getCartCount(
    userId: string,
  ): Promise<
    IBeforeTransformResponseType<{ itemCount: number; totalQuantity: number }>
  > {
    try {
      const cart = await this.prismaService.cart.findFirst({
        where: withoutDeleted({ userId }),
        select: {
          items: {
            select: { quantity: true },
          },
        },
      });

      const items = cart?.items ?? [];
      const itemCount = items.length;
      const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

      return {
        type: 'response',
        message: 'Lấy số lượng giỏ hàng thành công',
        data: { itemCount, totalQuantity },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
