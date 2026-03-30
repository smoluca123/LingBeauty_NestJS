import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';

export class BlogTopicResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: 'Beauty Tips',
    description: 'The name of the blog topic',
  })
  name: string;

  @ApiProperty({
    example: 'beauty-tips',
    description: 'The slug of the blog topic',
  })
  slug: string;

  @ApiPropertyOptional({
    example: 'Tips and tricks for beauty care',
    description: 'Description of the blog topic',
  })
  description?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the parent topic',
  })
  parentId?: string;

  @ApiProperty({
    example: 0,
    description: 'Sort order of the topic',
  })
  sortOrder: number;

  @ApiProperty({
    example: true,
    description: 'Whether the topic is active',
  })
  isActive: boolean;

  @ApiPropertyOptional({
    type: MediaResponseDto,
    description: 'Topic image',
  })
  @Type(() => MediaResponseDto)
  imageMedia?: MediaResponseDto;

  @ApiPropertyOptional({
    type: () => [BlogTopicResponseDto],
    description: 'Child topics',
  })
  @Type(() => BlogTopicResponseDto)
  children?: BlogTopicResponseDto[];

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of posts in this topic (for public routes)',
  })
  postCount?: number;

  @Exclude()
  imageMediaId?: string;
}
