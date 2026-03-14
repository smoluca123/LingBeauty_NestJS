import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

class ReviewReplyUserDto {
  @ApiProperty({ example: 'uuid-user-id' })
  id: string;

  @ApiProperty({ example: 'Nguyen' })
  firstName: string;

  @ApiProperty({ example: 'Van A' })
  lastName: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', nullable: true })
  avatarUrl?: string | null;
}

export class CreateReviewReplyDto {
  @ApiProperty({
    description: 'Reply content',
    example: 'Cảm ơn bạn đã đánh giá!',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}

export class UpdateReviewReplyDto {
  @ApiPropertyOptional({
    description: 'Reply content',
    example: 'Cảm ơn bạn đã đánh giá!',
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  content?: string;
}

export class ReviewReplyResponseDto {
  @ApiProperty({ example: 'uuid-reply-id' })
  id: string;

  @ApiProperty({ example: 'uuid-review-id' })
  reviewId: string;

  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @ApiProperty({ example: 'Cảm ơn bạn đã đánh giá!' })
  content: string;

  @ApiProperty({ example: false })
  isAdmin: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: ReviewReplyUserDto })
  @Type(() => ReviewReplyUserDto)
  user: any; // Use any to avoid type conflicts with Prisma select
}
