import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import {
  WishlistItemResponseDto,
  WishlistResponseDto,
  SharedWishlistResponseDto,
  SharedWishlistDetailDto,
  AddToWishlistDto,
  UpdateWishlistItemDto,
  CreateSharedWishlistDto,
  MoveToCartDto,
} from '../dto/wishlist.dto';
import { ApiProtectedAuthOperation } from 'src/decorators/api.decorators';

export function ApiGetWishlist() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get user wishlist',
      description: 'Retrieve all items in the current user wishlist',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (1-based)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page',
      example: 20,
    }),
    ApiResponse({
      status: 200,
      description: 'Wishlist retrieved successfully',
      type: WishlistResponseDto,
    }),
  );
}

export function ApiAddToWishlist() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Add product to wishlist',
      description: 'Add a product (with optional variant) to wishlist',
    }),
    ApiBody({ type: AddToWishlistDto }),
    ApiResponse({
      status: 201,
      description: 'Product added to wishlist successfully',
      type: WishlistItemResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Product already in wishlist or invalid data',
    }),
    ApiResponse({
      status: 404,
      description: 'Product or variant not found',
    }),
  );
}

export function ApiUpdateWishlistItem() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update wishlist item',
      description: 'Update note for a wishlist item',
    }),
    ApiParam({
      name: 'itemId',
      description: 'Wishlist item ID',
      type: String,
    }),
    ApiBody({ type: UpdateWishlistItemDto }),
    ApiResponse({
      status: 200,
      description: 'Wishlist item updated successfully',
      type: WishlistItemResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Wishlist item not found',
    }),
  );
}

export function ApiRemoveFromWishlist() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Remove item from wishlist',
      description: 'Remove a specific item from wishlist',
    }),
    ApiParam({
      name: 'itemId',
      description: 'Wishlist item ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Item removed from wishlist successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Wishlist item not found',
    }),
  );
}

export function ApiClearWishlist() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Clear wishlist',
      description: 'Remove all items from wishlist',
    }),
    ApiResponse({
      status: 200,
      description: 'Wishlist cleared successfully',
    }),
  );
}

export function ApiMoveToCart() {
  return applyDecorators(
    ApiOperation({
      summary: 'Move wishlist item to cart',
      description:
        'Move a wishlist item to shopping cart and remove from wishlist',
    }),
    ApiBody({ type: MoveToCartDto }),
    ApiResponse({
      status: 200,
      description: 'Item moved to cart successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Wishlist item not found',
    }),
  );
}

export function ApiCreateSharedWishlist() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create shared wishlist',
      description: 'Generate a shareable link for the wishlist',
    }),
    ApiBody({ type: CreateSharedWishlistDto }),
    ApiResponse({
      status: 201,
      description: 'Shared wishlist created successfully',
      type: SharedWishlistResponseDto,
    }),
  );
}

export function ApiGetSharedWishlist() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get shared wishlist',
      description: 'View a shared wishlist by token (public access)',
    }),
    ApiParam({
      name: 'shareToken',
      description: 'Share token',
      type: String,
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (1-based)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page',
      example: 20,
    }),
    ApiResponse({
      status: 200,
      description: 'Shared wishlist retrieved successfully',
      type: SharedWishlistDetailDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Shared wishlist not found or expired',
    }),
  );
}

export function ApiGetMySharedWishlists() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get my shared wishlists',
      description: 'Get all shared wishlist links created by the user',
    }),
    ApiResponse({
      status: 200,
      description: 'Shared wishlists retrieved successfully',
      type: [SharedWishlistResponseDto],
    }),
  );
}

export function ApiDeleteSharedWishlist() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete shared wishlist',
      description: 'Delete a shared wishlist link',
    }),
    ApiParam({
      name: 'sharedWishlistId',
      description: 'Shared wishlist ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Shared wishlist deleted successfully',
    }),
    ApiResponse({
      status: 404,
      description: 'Shared wishlist not found',
    }),
  );
}

export function ApiCheckWishlistStatus() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Check wishlist status',
      description: 'Check if a product is in the user wishlist',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
            description: 'Product ID to check',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          variantId: {
            type: 'string',
            description: 'Optional variant ID',
            example: '123e4567-e89b-12d3-a456-426614174001',
            nullable: true,
          },
        },
        required: ['productId'],
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Wishlist status retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          isInWishlist: {
            type: 'boolean',
            description: 'Whether the product is in wishlist',
          },
          wishlistItemId: {
            type: 'string',
            nullable: true,
            description: 'Wishlist item ID if in wishlist',
          },
        },
      },
    }),
  );
}
