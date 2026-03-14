import { ApiProperty } from '@nestjs/swagger';

export class RatingDistributionDto {
  @ApiProperty({ example: 5 })
  '1': number;

  @ApiProperty({ example: 10 })
  '2': number;

  @ApiProperty({ example: 20 })
  '3': number;

  @ApiProperty({ example: 30 })
  '4': number;

  @ApiProperty({ example: 35 })
  '5': number;
}

export class ReviewSummaryResponseDto {
  @ApiProperty({ example: 'uuid-product-id' })
  productId: string;

  @ApiProperty({ example: 4.5, description: 'Average rating from 1 to 5' })
  averageRating: number;

  @ApiProperty({ example: 100, description: 'Total number of reviews' })
  totalReviews: number;

  @ApiProperty({ example: 80, description: 'Number of approved reviews' })
  approvedReviews: number;

  @ApiProperty({ type: RatingDistributionDto })
  ratingDistribution: RatingDistributionDto;
}

export class MarkHelpfulResponseDto {
  @ApiProperty({ example: 'uuid-review-id' })
  reviewId: string;

  @ApiProperty({ example: 10 })
  helpfulCount: number;

  @ApiProperty({ example: true })
  hasMarked: boolean;

  @ApiProperty({ example: true, nullable: true })
  isHelpful: boolean | null;
}
