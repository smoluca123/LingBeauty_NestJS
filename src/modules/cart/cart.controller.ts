import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import {
  AddToCartDto,
  CartItemResponseDto,
  CartResponseDto,
  UpdateCartItemDto,
} from './dto/cart.dto';
import {
  ApiAddToCart,
  ApiClearCart,
  ApiGetCart,
  ApiRemoveCartItem,
  ApiSyncCart,
  ApiUpdateCartItem,
} from './decorators/cart.decorators';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * GET /cart
   * Retrieve the current user's cart with all items and totals.
   */
  @Get()
  @ApiGetCart()
  getCart(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<CartResponseDto>> {
    return this.cartService.getCart(decodedAccessToken.userId);
  }

  /**
   * GET /cart/count
   * Lightweight endpoint for cart badge — returns only item/quantity counts.
   */
  @Get('count')
  @ApiSyncCart()
  getCartCount(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<
    IBeforeTransformResponseType<{ itemCount: number; totalQuantity: number }>
  > {
    return this.cartService.getCartCount(decodedAccessToken.userId);
  }

  /**
   * POST /cart/items
   * Add a product variant to cart. Upserts quantity if variant already in cart.
   */
  @Post('items')
  @ApiAddToCart()
  addToCart(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<IBeforeTransformResponseType<CartItemResponseDto>> {
    return this.cartService.addToCart(decodedAccessToken.userId, addToCartDto);
  }

  /**
   * PATCH /cart/items/:itemId
   * Update quantity of a specific cart item.
   */
  @Patch('items/:itemId')
  @ApiUpdateCartItem()
  updateCartItem(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<IBeforeTransformResponseType<CartItemResponseDto>> {
    return this.cartService.updateCartItem(
      decodedAccessToken.userId,
      itemId,
      updateCartItemDto,
    );
  }

  /**
   * DELETE /cart/items/:itemId
   * Remove a single item from the cart.
   */
  @Delete('items/:itemId')
  @ApiRemoveCartItem()
  removeCartItem(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('itemId') itemId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.cartService.removeCartItem(decodedAccessToken.userId, itemId);
  }

  /**
   * DELETE /cart
   * Clear all items from the cart.
   */
  @Delete()
  @ApiClearCart()
  clearCart(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.cartService.clearCart(decodedAccessToken.userId);
  }
}
