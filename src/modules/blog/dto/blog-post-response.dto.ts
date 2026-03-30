import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { BlogPostStatus } from 'prisma/generated/prisma/client';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';
import { BlogTopicResponseDto } from './blog-topic-response.dto';

export class BlogPostResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: 'Top 10 Beauty Tips for Summer',
    description: 'The title of the blog post',
  })
  title: string;

  @ApiProperty({
    example: 'top-10-beauty-tips-for-summer',
    description: 'The slug of the blog post',
  })
  slug: string;

  @ApiProperty({
    example: '<p>Here are the top 10 beauty tips...</p>',
    description: 'The content of the blog post (HTML format)',
  })
  content: string;

  @ApiPropertyOptional({
    example: 'Discover the best beauty tips for summer season',
    description: 'Short excerpt of the blog post',
  })
  excerpt?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the blog topic',
  })
  topicId?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the author',
  })
  authorId: string;

  @ApiProperty({
    enum: BlogPostStatus,
    example: BlogPostStatus.PUBLISHED,
    description: 'Status of the blog post',
  })
  status: BlogPostStatus;

  @ApiProperty({
    example: ['beauty', 'skincare', 'summer'],
    description: 'Tags for the blog post',
    type: [String],
  })
  tags: string[];

  @ApiProperty({
    example: 0,
    description: 'Number of views for this post',
  })
  viewCount: number;

  @ApiPropertyOptional({
    example: 'Top 10 Beauty Tips for Summer 2024',
    description: 'SEO meta title',
  })
  metaTitle?: string;

  @ApiPropertyOptional({
    example: 'Discover the best beauty tips for summer season...',
    description: 'SEO meta description',
  })
  metaDescription?: string;

  @ApiPropertyOptional({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Published timestamp',
  })
  publishedAt?: Date;

  @ApiPropertyOptional({
    type: () => BlogTopicResponseDto,
    description: 'Blog topic information',
  })
  @Type(() => BlogTopicResponseDto)
  topic?: BlogTopicResponseDto;

  @ApiPropertyOptional({
    type: () => UserResponseDto,
    description: 'Author information',
  })
  @Type(() => UserResponseDto)
  author?: UserResponseDto;

  @ApiPropertyOptional({
    type: MediaResponseDto,
    description: 'Featured image',
  })
  @Type(() => MediaResponseDto)
  featuredImage?: MediaResponseDto;

  @Exclude()
  featuredImageId?: string;
}
