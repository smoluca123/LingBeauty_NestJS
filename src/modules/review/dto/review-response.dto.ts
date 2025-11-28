import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';

export class ReviewImageMediaDto {
  @ApiProperty({ example: 'uuid-media-id' })
  id: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  url: string;

  @ApiProperty({ example: 'image/jpeg' })
  mimetype: string;
}

export class ReviewImageDto {
  @ApiProperty({ example: 'uuid-review-image-id' })
  id: string;

  @ApiPropertyOptional({ example: 'Review image', nullable: true })
  alt: string | null;

  @ApiProperty({ type: ReviewImageMediaDto })
  @Type(() => ReviewImageMediaDto)
  media: ReviewImageMediaDto;
}

export class ReviewUserDto {
  @ApiProperty({ example: 'uuid-user-id' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    nullable: true,
  })
  avatarUrl: string | null;
}

export class ReviewProductDto {
  @ApiProperty({ example: 'uuid-product-id' })
  id: string;

  @ApiProperty({ example: 'Lipstick Matte Red' })
  name: string;

  @ApiProperty({ example: 'lipstick-matte-red' })
  slug: string;
}

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

  @ApiProperty({ type: ReviewUserDto })
  @Type(() => ReviewUserDto)
  user: ReviewUserDto;

  @ApiProperty({ type: [ReviewImageDto] })
  @Type(() => ReviewImageDto)
  images: ReviewImageDto[];
}

export class ReviewWithProductResponseDto extends ReviewResponseDto {
  @ApiProperty({ type: ReviewProductDto })
  @Type(() => ReviewProductDto)
  product: ReviewProductDto;
}
