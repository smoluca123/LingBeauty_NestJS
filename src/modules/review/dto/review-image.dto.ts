import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UploadReviewImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload',
  })
  file: Express.Multer.File;

  @ApiPropertyOptional({
    description: 'Alt text for the image',
    example: 'Review photo',
  })
  @IsString()
  @IsOptional()
  alt?: string;
}

export class UploadReviewVideoDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Video file to upload',
  })
  file: Express.Multer.File;

  @ApiPropertyOptional({
    description: 'Alt text for the video',
    example: 'Review video',
  })
  @IsString()
  @IsOptional()
  alt?: string;
}

export class AddReviewImageDto {
  @ApiProperty({
    description: 'Media ID from uploaded file',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  mediaId: string;

  @ApiPropertyOptional({
    description: 'Alt text for the image',
    example: 'Review photo',
  })
  @IsString()
  @IsOptional()
  alt?: string;
}

export class ReviewImageResponseDto {
  @ApiProperty({ example: 'uuid-review-image-id' })
  id: string;

  @ApiProperty({ example: 'uuid-review-id' })
  reviewId: string;

  @ApiProperty({ example: 'uuid-media-id' })
  mediaId: string;

  @ApiPropertyOptional({ example: 'Review photo', nullable: true })
  alt: string | null;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      url: { type: 'string' },
      mimetype: { type: 'string' },
    },
  })
  media: {
    id: string;
    url: string;
    mimetype: string;
  };
}
