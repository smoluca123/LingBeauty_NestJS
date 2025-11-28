import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';

export class BrandResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: "L'Oreal",
    description: 'The name of the brand',
  })
  name: string;

  @ApiProperty({
    example: 'loreal',
    description: 'The slug of the brand',
  })
  slug: string;

  @ApiPropertyOptional({
    example: "L'Oreal is a leading beauty brand",
    description: 'Description of the brand',
  })
  description?: string;

  @ApiPropertyOptional({
    example: 'https://www.loreal.com',
    description: 'Website URL of the brand',
  })
  website?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the brand is active',
  })
  isActive: boolean;

  @ApiPropertyOptional({
    type: MediaResponseDto,
    description: 'Brand logo',
  })
  @Type(() => MediaResponseDto)
  logoMedia?: MediaResponseDto;

  @Exclude()
  logoMediaId?: string;
}
