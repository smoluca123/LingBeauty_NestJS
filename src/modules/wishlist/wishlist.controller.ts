import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WishlistService } from './wishlist.service';
import {
  AddToWishlistDto,
  UpdateWishlistItemDto,
  CreateSharedWishlistDto,
  MoveToCartDto,
  WishlistItemResponseDto,
  WishlistResponseDto,
  SharedWishlistResponseDto,
  SharedWishlistDetailDto,
  GetWishlistDto,
  CheckWishlistStatusDto,
  WishlistStatusResponseDto,
} from './dto/wishlist.dto';
import {
  ApiGetWishlist,
  ApiAddToWishlist,
  ApiUpdateWishlistItem,
  ApiRemoveFromWishlist,
  ApiClearWishlist,
  ApiMoveToCart,
  ApiCreateSharedWishlist,
  ApiGetSharedWishlist,
  ApiGetMySharedWishlists,
  ApiDeleteSharedWishlist,
  ApiCheckWishlistStatus,
} from './decorators/wishlist.decorators';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';

@ApiTags('Wishlist')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  /**
   * GET /wishlist
   * Get user's wishlist
   */
  @Get()
  @ApiGetWishlist()
  getWishlist(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Query() query: GetWishlistDto,
  ): Promise<IBeforeTransformResponseType<WishlistResponseDto>> {
    return this.wishlistService.getWishlist(decodedAccessToken.userId, query);
  }

  /**
   * POST /wishlist/items
   * Add product to wishlist
   */
  @Post('items')
  @ApiAddToWishlist()
  addToWishlist(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() addToWishlistDto: AddToWishlistDto,
  ): Promise<IBeforeTransformResponseType<WishlistItemResponseDto>> {
    return this.wishlistService.addToWishlist(
      decodedAccessToken.userId,
      addToWishlistDto,
    );
  }

  /**
   * PATCH /wishlist/items/:itemId
   * Update wishlist item note
   */
  @Patch('items/:itemId')
  @ApiUpdateWishlistItem()
  updateWishlistItem(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('itemId') itemId: string,
    @Body() updateWishlistItemDto: UpdateWishlistItemDto,
  ): Promise<IBeforeTransformResponseType<WishlistItemResponseDto>> {
    return this.wishlistService.updateWishlistItem(
      decodedAccessToken.userId,
      itemId,
      updateWishlistItemDto,
    );
  }

  /**
   * DELETE /wishlist/items/:itemId
   * Remove item from wishlist
   */
  @Delete('items/:itemId')
  @ApiRemoveFromWishlist()
  removeFromWishlist(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('itemId') itemId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.wishlistService.removeFromWishlist(
      decodedAccessToken.userId,
      itemId,
    );
  }

  /**
   * DELETE /wishlist
   * Clear entire wishlist
   */
  @Delete()
  @ApiClearWishlist()
  clearWishlist(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.wishlistService.clearWishlist(decodedAccessToken.userId);
  }

  /**
   * POST /wishlist/move-to-cart
   * Move wishlist item to cart
   */
  @Post('move-to-cart')
  @ApiMoveToCart()
  moveToCart(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() moveToCartDto: MoveToCartDto,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.wishlistService.moveToCart(
      decodedAccessToken.userId,
      moveToCartDto,
    );
  }

  /**
   * POST /wishlist/share
   * Create shared wishlist
   */
  @Post('share')
  @ApiCreateSharedWishlist()
  createSharedWishlist(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() createSharedWishlistDto: CreateSharedWishlistDto,
  ): Promise<IBeforeTransformResponseType<SharedWishlistResponseDto>> {
    return this.wishlistService.createSharedWishlist(
      decodedAccessToken.userId,
      createSharedWishlistDto,
    );
  }

  /**
   * GET /wishlist/share
   * Get my shared wishlists
   */
  @Get('share')
  @ApiGetMySharedWishlists()
  getMySharedWishlists(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<SharedWishlistResponseDto[]>> {
    return this.wishlistService.getMySharedWishlists(decodedAccessToken.userId);
  }

  /**
   * GET /wishlist/shared/:shareToken
   * Get shared wishlist by token (public access)
   */
  @Get('shared/:shareToken')
  @ApiGetSharedWishlist()
  getSharedWishlist(
    @Param('shareToken') shareToken: string,
    @Query() query: GetWishlistDto,
  ): Promise<IBeforeTransformResponseType<SharedWishlistDetailDto>> {
    return this.wishlistService.getSharedWishlist(shareToken, query);
  }

  /**
   * DELETE /wishlist/share/:sharedWishlistId
   * Delete shared wishlist
   */
  @Delete('share/:sharedWishlistId')
  @ApiDeleteSharedWishlist()
  deleteSharedWishlist(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('sharedWishlistId') sharedWishlistId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.wishlistService.deleteSharedWishlist(
      decodedAccessToken.userId,
      sharedWishlistId,
    );
  }

  /**
   * POST /wishlist/check-status
   * Check if product is in wishlist
   */
  @Post('check-status')
  @ApiCheckWishlistStatus()
  checkWishlistStatus(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() checkWishlistStatusDto: CheckWishlistStatusDto,
  ): Promise<
    IBeforeTransformResponseType<{
      isInWishlist: boolean;
      wishlistItemId: string | null;
    }>
  > {
    return this.wishlistService.checkWishlistStatus(
      decodedAccessToken.userId,
      checkWishlistStatusDto.productId,
      checkWishlistStatusDto.variantId,
    );
  }
}
