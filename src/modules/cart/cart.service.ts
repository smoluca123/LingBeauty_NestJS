import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  cartItemSelect,
  CartItemSelect,
  cartSelect,
  CartSelect,
} from 'src/libs/prisma/cart-select';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  AddToCartDto,
  CartItemResponseDto,
  CartResponseDto,
  CartSummaryDto,
  UpdateCartItemDto,
} from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  // ============== Private Helpers ==============

  /**
   * Get or create a cart for the given user.
   * Each user has exactly one cart (enforced by unique userId on Cart model).
   */
  private async getOrCreateCart(userId: string): Promise<{ id: string }> {
    const existing = await this.prismaService.cart.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (existing) return existing;

    return this.prismaService.cart.create({
      data: { userId },
      select: { id: true },
    });
  }

  /**
   * Map a CartItemSelect DB entity to CartItemResponseDto.
   */
  private mapCartItem(item: CartItemSelect): CartItemResponseDto {
    const variantPrice = Number(item.variant.price);
    const lineTotal = (variantPrice * item.quantity).toFixed(2);
    const thumbnailImage = item.product.images[0] ?? null;

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
      variant: {
        id: item.variant.id,
        sku: item.variant.sku,
        name: item.variant.name,
        color: item.variant.color,
        size: item.variant.size,
        type: item.variant.type,
        price: item.variant.price.toString(),
        stockQuantity: item.variant.inventory?.quantity ?? 0,
        stockStatus: item.variant.inventory?.displayStatus ?? 'OUT_OF_STOCK',
      },
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
  private mapCart(cart: CartSelect): CartResponseDto {
    const items = cart.items.map((item) => this.mapCartItem(item));
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

      return {
        type: 'response',
        message: 'Lấy giỏ hàng thành công',
        data: this.mapCart(cart),
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
   * Add a variant to the cart.
   * - If the variant is already in the cart, increments quantity.
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
        where: { id: dto.productId, isActive: true },
        select: { id: true },
      });

      if (!product) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
          ERROR_CODES.PRODUCT_NOT_FOUND,
        );
      }

      // Validate variant belongs to product and has inventory
      const variant = await this.prismaService.productVariant.findFirst({
        where: { id: dto.variantId, productId: dto.productId },
        select: {
          id: true,
          inventory: {
            select: { quantity: true, displayStatus: true },
          },
        },
      });

      if (!variant) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND],
          ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND,
        );
      }

      // Check stock availability
      if (variant.inventory?.displayStatus === 'OUT_OF_STOCK') {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_ITEM_OUT_OF_STOCK],
          ERROR_CODES.CART_ITEM_OUT_OF_STOCK,
        );
      }

      const cartRef = await this.getOrCreateCart(userId);

      // Check if variant already exists in cart — if so, increment quantity
      const existingItem = await this.prismaService.cartItem.findUnique({
        where: {
          cartId_variantId: {
            cartId: cartRef.id,
            variantId: dto.variantId,
          },
        },
        select: { id: true, quantity: true },
      });

      const newQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;

      // Validate new quantity against available stock
      const availableStock = variant.inventory?.quantity ?? 0;
      if (newQuantity > availableStock) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_ITEM_INSUFFICIENT_STOCK],
          ERROR_CODES.CART_ITEM_INSUFFICIENT_STOCK,
        );
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
            variantId: dto.variantId,
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
        data: this.mapCartItem(cartItem),
        statusCode: 201,
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
   * Update quantity of a specific cart item.
   */
  async updateCartItem(
    userId: string,
    itemId: string,
    dto: UpdateCartItemDto,
  ): Promise<IBeforeTransformResponseType<CartItemResponseDto>> {
    try {
      // Verify item belongs to the user's cart
      const cartRef = await this.prismaService.cart.findUnique({
        where: { userId },
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
          variant: {
            select: {
              inventory: { select: { quantity: true, displayStatus: true } },
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

      // Validate against stock
      const availableStock = item.variant.inventory?.quantity ?? 0;
      if (dto.quantity > availableStock) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CART_ITEM_INSUFFICIENT_STOCK],
          ERROR_CODES.CART_ITEM_INSUFFICIENT_STOCK,
        );
      }

      const updated = await this.prismaService.cartItem.update({
        where: { id: itemId },
        data: { quantity: dto.quantity },
        select: cartItemSelect,
      });

      return {
        type: 'response',
        message: 'Cập nhật giỏ hàng thành công',
        data: this.mapCartItem(updated),
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
      const cartRef = await this.prismaService.cart.findUnique({
        where: { userId },
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
      const cartRef = await this.prismaService.cart.findUnique({
        where: { userId },
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
      const cart = await this.prismaService.cart.findUnique({
        where: { userId },
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
