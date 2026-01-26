import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';

// Match reviewImageSelect from review-select.ts
export class ReviewImageDto {
  @ApiProperty({ example: 'uuid-review-image-id' })
  id: string;

  @ApiProperty({ example: 'uuid-review-id' })
  reviewId: string;

  @ApiProperty({ example: 'uuid-media-id' })
  mediaId: string;

  @ApiPropertyOptional({ example: 'Review image', nullable: true })
  alt: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: MediaResponseDto })
  @Type(() => MediaResponseDto)
  media: MediaResponseDto;
}

export class ReviewProductDto {
  @ApiProperty({ example: 'uuid-product-id' })
  id: string;

  @ApiProperty({ example: 'Lipstick Matte Red' })
  name: string;

  @ApiProperty({ example: 'lipstick-matte-red' })
  slug: string;
}

// Match reviewSelect from review-select.ts
export class ReviewResponseDto extends BaseResponseDto {
  @ApiProperty({ example: 'uuid-product-id' })
  productId: string;

  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @ApiProperty({ example: 5 })
  rating: number;

  @ApiPropertyOptional({ example: 'Great product!', nullable: true })
  title: string | null;

  @ApiPropertyOptional({
    example: 'I really love this product.',
    nullable: true,
  })
  comment: string | null;

  @ApiProperty({ example: false })
  isVerified: boolean;

  @ApiProperty({ example: true })
  isApproved: boolean;

  @ApiProperty({ example: 10 })
  helpfulCount: number;

  @ApiProperty({ type: UserResponseDto })
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @ApiProperty({ type: [ReviewImageDto] })
  @Type(() => ReviewImageDto)
  reviewImages: ReviewImageDto[];
}

// Match reviewWithProductSelect from review-select.ts
export class ReviewWithProductResponseDto extends ReviewResponseDto {
  @ApiProperty({ type: ReviewProductDto })
  @Type(() => ReviewProductDto)
  product: ReviewProductDto;
}
