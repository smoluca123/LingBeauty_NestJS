import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from 'prisma/generated/prisma';

export class MediaResponseDto {
  @ApiProperty({
    description: 'Media ID in database',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Public URL of the uploaded file',
    example: 'https://link.storjshare.io/bucket/path/to/file.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'S3 key/path of the file',
    example: 'public/lingbeauty/products/1234567890-uuid.jpg',
  })
  key: string;

  @ApiProperty({
    description: 'File size in bytes',
    example: 1024000,
  })
  size: number;

  @ApiProperty({
    description: 'MIME type of the file',
    example: 'image/jpeg',
  })
  mimetype: string;

  @ApiProperty({
    description: 'Original filename',
    example: 'product-image.jpg',
  })
  filename: string;

  @ApiProperty({
    description: 'Media type',
    enum: MediaType,
    example: MediaType.PRODUCT_IMAGE,
  })
  type: MediaType;
}
