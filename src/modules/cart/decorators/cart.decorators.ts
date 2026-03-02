import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiProtectedAuthOperation } from 'src/decorators/api.decorators';
import {
  AddToCartDto,
  CartItemResponseDto,
  CartResponseDto,
  UpdateCartItemDto,
} from '../dto/cart.dto';

export const ApiGetCart = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get current user cart',
      description:
        "Retrieve the authenticated user's cart with all items and summary",
    }),
    ApiResponse({
      status: 200,
      type: CartResponseDto,
    }),
  );

export const ApiAddToCart = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Add item to cart',
      description:
        'Add a product variant to the cart. If the variant already exists, increments quantity.',
    }),
    ApiBody({ type: AddToCartDto }),
    ApiResponse({
      status: 201,
      type: CartItemResponseDto,
    }),
  );

export const ApiUpdateCartItem = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Update cart item quantity',
      description: 'Update the quantity of a specific item in the cart',
    }),
    ApiParam({
      name: 'itemId',
      description: 'Cart item ID',
      type: String,
    }),
    ApiBody({ type: UpdateCartItemDto }),
    ApiResponse({
      status: 200,
      type: CartItemResponseDto,
    }),
  );

export const ApiRemoveCartItem = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Remove item from cart',
      description: 'Remove a specific item from the cart',
    }),
    ApiParam({
      name: 'itemId',
      description: 'Cart item ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Item removed successfully',
    }),
  );

export const ApiClearCart = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Clear all items from cart',
      description: "Remove all items from the authenticated user's cart",
    }),
    ApiResponse({
      status: 200,
      description: 'Cart cleared successfully',
    }),
  );

export const ApiSyncCart = () =>
  applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Sync cart item count',
      description:
        'Return the total number of items in the cart (for badge display)',
    }),
    ApiResponse({
      status: 200,
      schema: {
        type: 'object',
        properties: {
          itemCount: { type: 'number', example: 3 },
          totalQuantity: { type: 'number', example: 5 },
        },
      },
    }),
  );
