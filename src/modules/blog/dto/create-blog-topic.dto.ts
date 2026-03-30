import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateBlogTopicDto {
  @ApiProperty({
    example: 'Beauty Tips',
    description: 'The name of the blog topic',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'Tips and tricks for beauty care',
    description: 'Description of the blog topic',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the parent topic for creating sub-topics',
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Sort order of the topic',
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the topic is active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: any;
}
