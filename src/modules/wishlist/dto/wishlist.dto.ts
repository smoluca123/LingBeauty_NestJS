import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsDateString,
  MaxLength,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductSummaryResponseDto } from 'src/modules/product/dto/product-response.dto';
import { ProductVariantResponseDto } from 'src/modules/product/dto/product-variant.dto';

// ============== Request DTOs ==============

export class GetWishlistDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 20,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}

export class AddToWishlistDto {
  @ApiProperty({
    description: 'Product ID to add to wishlist',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiPropertyOptional({
    description: 'Optional variant ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsOptional()
  variantId?: string;

  @ApiPropertyOptional({
    description: 'Optional note for this wishlist item',
    example: 'Want to buy this for birthday',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  note?: string;
}

export class UpdateWishlistItemDto {
  @ApiPropertyOptional({
    description: 'Update note for wishlist item',
    example: 'Changed my mind, want this for Christmas',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  note?: string;
}

export class CreateSharedWishlistDto {
  @ApiPropertyOptional({
    description: 'Title for the shared wishlist',
    example: 'My Birthday Wishlist 2024',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({
    description: 'Description for the shared wishlist',
    example: 'Items I want for my birthday',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Make wishlist publicly discoverable',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @ApiPropertyOptional({
    description: 'Expiration date for the shared link (ISO 8601)',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}

export class MoveToCartDto {
  @ApiProperty({
    description: 'Wishlist item ID to move to cart',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsString()
  @IsNotEmpty()
  wishlistItemId!: string;

  @ApiPropertyOptional({
    description: 'Quantity to add to cart (default: 1)',
    example: 2,
    default: 1,
  })
  @IsOptional()
  quantity?: number;
}

export class CheckWishlistStatusDto {
  @ApiProperty({
    description: 'Product ID to check',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiPropertyOptional({
    description: 'Optional variant ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsOptional()
  variantId?: string;
}

// ============== Response DTOs ==============

export class WishlistItemResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  productId!: string;

  @ApiProperty({ nullable: true })
  variantId!: string | null;

  @ApiProperty({ nullable: true })
  note!: string | null;

  @ApiProperty({ type: ProductSummaryResponseDto })
  @Type(() => ProductSummaryResponseDto)
  product!: ProductSummaryResponseDto;

  @ApiProperty({ type: ProductVariantResponseDto, nullable: true })
  @Type(() => ProductVariantResponseDto)
  variant!: ProductVariantResponseDto | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class WishlistResponseDto {
  @ApiProperty({ type: [WishlistItemResponseDto] })
  items!: WishlistItemResponseDto[];

  @ApiProperty()
  totalCount!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalPages!: number;

  @ApiProperty()
  hasMore!: boolean;
}

export class SharedWishlistResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  shareToken!: string;

  @ApiProperty({ nullable: true })
  title!: string | null;

  @ApiProperty({ nullable: true })
  description!: string | null;

  @ApiProperty()
  isPublic!: boolean;

  @ApiProperty({ nullable: true })
  expiresAt!: Date | null;

  @ApiProperty()
  viewCount!: number;

  @ApiProperty()
  shareUrl!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class SharedWishlistDetailDto extends SharedWishlistResponseDto {
  @ApiProperty({ type: [WishlistItemResponseDto] })
  items!: WishlistItemResponseDto[];

  @ApiProperty()
  totalCount!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalPages!: number;

  @ApiProperty()
  hasMore!: boolean;
}

export class WishlistStatusResponseDto {
  @ApiProperty()
  isInWishlist!: boolean;

  @ApiProperty({ nullable: true })
  wishlistItemId!: string | null;
}
