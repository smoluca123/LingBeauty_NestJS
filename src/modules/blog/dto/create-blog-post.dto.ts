import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BlogPostStatus } from 'prisma/generated/prisma/client';

export class CreateBlogPostDto {
  @ApiProperty({
    example: 'Top 10 Beauty Tips for Summer',
    description: 'The title of the blog post',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: '<p>Here are the top 10 beauty tips...</p>',
    description: 'The content of the blog post (HTML format)',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({
    example: 'Discover the best beauty tips for summer season',
    description: 'Short excerpt of the blog post',
  })
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the blog topic this post belongs to',
  })
  @IsUUID()
  @IsOptional()
  topicId?: string;

  @ApiPropertyOptional({
    enum: BlogPostStatus,
    example: BlogPostStatus.DRAFT,
    description: 'Status of the blog post',
    default: BlogPostStatus.DRAFT,
  })
  @IsEnum(BlogPostStatus)
  @IsOptional()
  status?: BlogPostStatus;

  @ApiPropertyOptional({
    example: ['beauty', 'skincare', 'summer'],
    description: 'Tags for the blog post',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    example: 'Top 10 Beauty Tips for Summer 2024',
    description: 'SEO meta title (defaults to title if not provided)',
  })
  @IsString()
  @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional({
    example: 'Discover the best beauty tips for summer season...',
    description:
      'SEO meta description (defaults to first 160 chars of content if not provided)',
  })
  @IsString()
  @IsOptional()
  metaDescription?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  featuredImage?: any;
}
