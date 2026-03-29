import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import {
  AddToWishlistDto,
  UpdateWishlistItemDto,
  CreateSharedWishlistDto,
  WishlistItemResponseDto,
  WishlistResponseDto,
  SharedWishlistResponseDto,
  SharedWishlistDetailDto,
  MoveToCartDto,
  GetWishlistDto,
} from './dto/wishlist.dto';
import { randomBytes } from 'crypto';
import {
  wishlistItemSelect,
  sharedWishlistSelect,
} from 'src/libs/prisma/wishlist-select';
import {
  toResponseDto,
  toResponseDtoArray,
} from 'src/libs/utils/transform.utils';
import {
  softDeleteData,
  withoutDeleted,
} from 'src/libs/prisma/soft-delete.helpers';

@Injectable()
export class WishlistService {
  constructor(private readonly prismaService: PrismaService) {}

  // ============== Private Helpers ==============

  private generateShareToken(): string {
    return randomBytes(16).toString('hex');
  }

  private buildShareUrl(shareToken: string): string {
    // TODO: Replace with actual frontend URL from config
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return `${baseUrl}/wishlist/shared/${shareToken}`;
  }

  // ============== Public Service Methods ==============

  /**
   * Get user's wishlist with pagination
   */
  async getWishlist(
    userId: string,
    query: GetWishlistDto,
  ): Promise<IBeforeTransformResponseType<WishlistResponseDto>> {
    try {
      const page = query.page || 1;
      const limit = query.limit || 20;
      const skip = (page - 1) * limit;

      const [items, totalCount] = await Promise.all([
        this.prismaService.wishlist.findMany({
          where: withoutDeleted({ userId }),
          select: wishlistItemSelect,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prismaService.wishlist.count({
          where: withoutDeleted({ userId }),
        }),
      ]);

      const responseData = toResponseDtoArray(WishlistItemResponseDto, items);
      const totalPages = Math.ceil(totalCount / limit);
      const hasMore = page < totalPages;

      return {
        type: 'response',
        message: 'Lấy danh sách yêu thích thành công',
        data: {
          items: responseData,
          totalCount,
          page,
          limit,
          totalPages,
          hasMore,
        },
      };
    } catch (error) {
      console.error('Error getting wishlist:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Add product to wishlist
   */
  async addToWishlist(
    userId: string,
    dto: AddToWishlistDto,
  ): Promise<IBeforeTransformResponseType<WishlistItemResponseDto>> {
    try {
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

      // If variantId provided, validate it
      if (dto.variantId) {
        const variant = await this.prismaService.productVariant.findFirst({
          where: withoutDeleted({
            id: dto.variantId,
            productId: dto.productId,
          }),
          select: { id: true },
        });

        if (!variant) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND],
            ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND,
          );
        }
      }

      // Check if already in wishlist
      const existing = await this.prismaService.wishlist.findFirst({
        where: withoutDeleted({
          userId,
          productId: dto.productId,
          variantId: dto.variantId ?? null,
        }),
        select: { id: true },
      });

      if (existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.WISHLIST_ITEM_ALREADY_EXISTS],
          ERROR_CODES.WISHLIST_ITEM_ALREADY_EXISTS,
        );
      }

      // Add to wishlist
      const wishlistItem = await this.prismaService.wishlist.create({
        data: {
          userId,
          productId: dto.productId,
          variantId: dto.variantId,
          note: dto.note,
        },
        select: wishlistItemSelect,
      });

      const responseData = toResponseDto(WishlistItemResponseDto, wishlistItem);

      return {
        type: 'response',
        message: 'Thêm vào danh sách yêu thích thành công',
        data: responseData,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      console.error('Error adding to wishlist:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Update wishlist item note
   */
  async updateWishlistItem(
    userId: string,
    itemId: string,
    dto: UpdateWishlistItemDto,
  ): Promise<IBeforeTransformResponseType<WishlistItemResponseDto>> {
    try {
      // Verify item belongs to user and not deleted
      const item = await this.prismaService.wishlist.findFirst({
        where: withoutDeleted({ id: itemId, userId }),
        select: { id: true },
      });

      if (!item) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.WISHLIST_ITEM_NOT_FOUND],
          ERROR_CODES.WISHLIST_ITEM_NOT_FOUND,
        );
      }

      const updated = await this.prismaService.wishlist.update({
        where: { id: itemId },
        data: { note: dto.note },
        select: wishlistItemSelect,
      });

      const responseData = toResponseDto(WishlistItemResponseDto, updated);

      return {
        type: 'response',
        message: 'Cập nhật ghi chú thành công',
        data: responseData,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      console.error('Error updating wishlist item:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Remove item from wishlist (soft delete)
   */
  async removeFromWishlist(
    userId: string,
    itemId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Verify item belongs to user and not already deleted
      const item = await this.prismaService.wishlist.findFirst({
        where: withoutDeleted({ id: itemId, userId }),
        select: { id: true },
      });

      if (!item) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.WISHLIST_ITEM_NOT_FOUND],
          ERROR_CODES.WISHLIST_ITEM_NOT_FOUND,
        );
      }

      // Soft delete
      await this.prismaService.wishlist.update({
        where: { id: itemId },
        data: softDeleteData(),
      });

      return {
        type: 'response',
        message: 'Xóa khỏi danh sách yêu thích thành công',
        data: { message: 'Xóa khỏi danh sách yêu thích thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      console.error('Error removing from wishlist:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Clear entire wishlist (soft delete all items)
   */
  async clearWishlist(
    userId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Soft delete all wishlist items
      await this.prismaService.wishlist.updateMany({
        where: withoutDeleted({ userId }),
        data: softDeleteData(),
      });

      return {
        type: 'response',
        message: 'Xóa toàn bộ danh sách yêu thích thành công',
        data: { message: 'Xóa toàn bộ danh sách yêu thích thành công' },
      };
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Move wishlist item to cart
   */
  async moveToCart(
    userId: string,
    dto: MoveToCartDto,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Get wishlist item
      const wishlistItem = await this.prismaService.wishlist.findFirst({
        where: withoutDeleted({ id: dto.wishlistItemId, userId }),
        select: {
          id: true,
          productId: true,
          variantId: true,
        },
      });

      if (!wishlistItem) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.WISHLIST_ITEM_NOT_FOUND],
          ERROR_CODES.WISHLIST_ITEM_NOT_FOUND,
        );
      }

      // Get or create cart
      let cart = await this.prismaService.cart.findFirst({
        where: withoutDeleted({ userId }),
        select: { id: true },
      });

      if (!cart) {
        cart = await this.prismaService.cart.create({
          data: { userId },
          select: { id: true },
        });
      }

      const quantity = dto.quantity ?? 1;

      // Check if item already in cart
      const existingCartItem = await this.prismaService.cartItem.findFirst({
        where: {
          cartId: cart.id,
          variantId: wishlistItem.variantId,
        },
        select: { id: true, quantity: true },
      });

      if (existingCartItem) {
        // Update quantity
        await this.prismaService.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
      } else {
        // Create new cart item
        await this.prismaService.cartItem.create({
          data: {
            cartId: cart.id,
            productId: wishlistItem.productId,
            variantId: wishlistItem.variantId,
            quantity,
          },
        });
      }

      // Remove from wishlist (soft delete)
      await this.prismaService.wishlist.update({
        where: { id: dto.wishlistItemId },
        data: softDeleteData(),
      });

      return {
        type: 'response',
        message: 'Chuyển sản phẩm vào giỏ hàng thành công',
        data: { message: 'Chuyển sản phẩm vào giỏ hàng thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      console.error('Error moving to cart:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Create shared wishlist
   */
  async createSharedWishlist(
    userId: string,
    dto: CreateSharedWishlistDto,
  ): Promise<IBeforeTransformResponseType<SharedWishlistResponseDto>> {
    try {
      const shareToken = this.generateShareToken();
      const expiresAt = dto.expiresAt ? new Date(dto.expiresAt) : null;

      const sharedWishlist = await this.prismaService.sharedWishlist.create({
        data: {
          userId,
          shareToken,
          title: dto.title,
          description: dto.description,
          isPublic: dto.isPublic ?? false,
          expiresAt,
        },
      });

      return {
        type: 'response',
        message: 'Tạo link chia sẻ thành công',
        data: {
          id: sharedWishlist.id,
          userId: sharedWishlist.userId,
          shareToken: sharedWishlist.shareToken,
          title: sharedWishlist.title,
          description: sharedWishlist.description,
          isPublic: sharedWishlist.isPublic,
          expiresAt: sharedWishlist.expiresAt,
          viewCount: sharedWishlist.viewCount,
          shareUrl: this.buildShareUrl(sharedWishlist.shareToken),
          createdAt: sharedWishlist.createdAt,
          updatedAt: sharedWishlist.updatedAt,
        },
        statusCode: 201,
      };
    } catch (error) {
      console.error('Error creating shared wishlist:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get shared wishlist by token (public access) with pagination
   */
  async getSharedWishlist(
    shareToken: string,
    query: GetWishlistDto,
  ): Promise<IBeforeTransformResponseType<SharedWishlistDetailDto>> {
    try {
      const sharedWishlist = await this.prismaService.sharedWishlist.findFirst({
        where: withoutDeleted({ shareToken }),
        select: sharedWishlistSelect,
      });

      if (!sharedWishlist) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.SHARED_WISHLIST_NOT_FOUND],
          ERROR_CODES.SHARED_WISHLIST_NOT_FOUND,
        );
      }

      // Check if expired
      if (sharedWishlist.expiresAt && sharedWishlist.expiresAt < new Date()) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.SHARED_WISHLIST_EXPIRED],
          ERROR_CODES.SHARED_WISHLIST_EXPIRED,
        );
      }

      // Increment view count
      await this.prismaService.sharedWishlist.update({
        where: { id: sharedWishlist.id },
        data: { viewCount: { increment: 1 } },
      });

      const page = query.page || 1;
      const limit = query.limit || 20;
      const skip = (page - 1) * limit;

      // Get wishlist items with pagination
      const [items, totalCount] = await Promise.all([
        this.prismaService.wishlist.findMany({
          where: withoutDeleted({ userId: sharedWishlist.userId }),
          select: wishlistItemSelect,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prismaService.wishlist.count({
          where: withoutDeleted({ userId: sharedWishlist.userId }),
        }),
      ]);

      const mappedItems = toResponseDtoArray(WishlistItemResponseDto, items);
      const totalPages = Math.ceil(totalCount / limit);
      const hasMore = page < totalPages;

      return {
        type: 'response',
        message: 'Lấy danh sách chia sẻ thành công',
        data: {
          id: sharedWishlist.id,
          userId: sharedWishlist.userId,
          shareToken: sharedWishlist.shareToken,
          title: sharedWishlist.title,
          description: sharedWishlist.description,
          isPublic: sharedWishlist.isPublic,
          expiresAt: sharedWishlist.expiresAt,
          viewCount: sharedWishlist.viewCount + 1,
          shareUrl: this.buildShareUrl(sharedWishlist.shareToken),
          createdAt: sharedWishlist.createdAt,
          updatedAt: sharedWishlist.updatedAt,
          items: mappedItems,
          totalCount,
          page,
          limit,
          totalPages,
          hasMore,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      console.error('Error getting shared wishlist:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get user's shared wishlists
   */
  async getMySharedWishlists(
    userId: string,
  ): Promise<IBeforeTransformResponseType<SharedWishlistResponseDto[]>> {
    try {
      const sharedWishlists = await this.prismaService.sharedWishlist.findMany({
        where: withoutDeleted({ userId }),
        select: sharedWishlistSelect,
        orderBy: { createdAt: 'desc' },
      });

      const data = sharedWishlists.map((sw) => ({
        id: sw.id,
        userId: sw.userId,
        shareToken: sw.shareToken,
        title: sw.title,
        description: sw.description,
        isPublic: sw.isPublic,
        expiresAt: sw.expiresAt,
        viewCount: sw.viewCount,
        shareUrl: this.buildShareUrl(sw.shareToken),
        createdAt: sw.createdAt,
        updatedAt: sw.updatedAt,
      }));

      return {
        type: 'response',
        message: 'Lấy danh sách chia sẻ thành công',
        data,
      };
    } catch (error) {
      console.error('Error getting my shared wishlists:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Delete shared wishlist (soft delete)
   */
  async deleteSharedWishlist(
    userId: string,
    sharedWishlistId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      // Verify ownership and not already deleted
      const sharedWishlist = await this.prismaService.sharedWishlist.findFirst({
        where: withoutDeleted({ id: sharedWishlistId, userId }),
        select: { id: true },
      });

      if (!sharedWishlist) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.SHARED_WISHLIST_NOT_FOUND],
          ERROR_CODES.SHARED_WISHLIST_NOT_FOUND,
        );
      }

      // Soft delete
      await this.prismaService.sharedWishlist.update({
        where: { id: sharedWishlistId },
        data: softDeleteData(),
      });

      return {
        type: 'response',
        message: 'Xóa link chia sẻ thành công',
        data: { message: 'Xóa link chia sẻ thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      console.error('Error deleting shared wishlist:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Check if product is in wishlist
   */
  async checkWishlistStatus(
    userId: string,
    productId: string,
    variantId?: string,
  ): Promise<
    IBeforeTransformResponseType<{
      isInWishlist: boolean;
      wishlistItemId: string | null;
    }>
  > {
    try {
      const wishlistItem = await this.prismaService.wishlist.findFirst({
        where: withoutDeleted({
          userId,
          productId,
          variantId: variantId ?? null,
        }),
        select: { id: true },
      });

      return {
        type: 'response',
        message: 'Kiểm tra trạng thái wishlist thành công',
        data: {
          isInWishlist: !!wishlistItem,
          wishlistItemId: wishlistItem?.id ?? null,
        },
      };
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
