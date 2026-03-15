import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FlashSaleStatus } from 'prisma/generated/prisma/client';
import { ProductResponseDto, ProductVariantDto } from 'src/modules/product/dto/product-response.dto';

export class FlashSaleProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  flashSaleId: string;

  @ApiProperty()
  productId: string;

  @ApiPropertyOptional()
  variantId?: string;

  @ApiProperty()
  flashPrice: string;

  @ApiProperty()
  originalPrice: string;

  @ApiProperty()
  maxQuantity: number;

  @ApiProperty()
  soldQuantity: number;

  @ApiProperty()
  limitPerOrder: number;

  @ApiProperty()
  sortOrder: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: () => ProductResponseDto })
  @Type(() => ProductResponseDto)
  product?: ProductResponseDto;

  @ApiPropertyOptional({ type: () => ProductVariantDto })
  @Type(() => ProductVariantDto)
  variant?: ProductVariantDto;
}

export class FlashSaleResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  slug: string;

  @ApiPropertyOptional()
  banner?: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty({ enum: FlashSaleStatus })
  status: FlashSaleStatus;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  sortOrder: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: [FlashSaleProductResponseDto] })
  @Type(() => FlashSaleProductResponseDto)
  products?: FlashSaleProductResponseDto[];
}
