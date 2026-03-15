import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsEnum,
  IsBoolean,
  Min,
  IsInt,
  IsNumber,
} from 'class-validator';
import { FlashSaleStatus } from 'prisma/generated/prisma/client';

export class CreateFlashSaleDto {
  @ApiProperty({ description: 'Tên đợt flash sale' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Mô tả chi tiết đợt flash sale' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Đường dẫn (slug) cho flash sale' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional({ description: 'Đường dẫn file banner ảnh' })
  @IsString()
  @IsOptional()
  banner?: string;

  @ApiProperty({ description: 'Thời gian bắt đầu' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ description: 'Thời gian kết thúc' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @ApiPropertyOptional({ description: 'Trạng thái', enum: FlashSaleStatus, default: FlashSaleStatus.UPCOMING })
  @IsEnum(FlashSaleStatus)
  @IsOptional()
  status?: FlashSaleStatus;

  @ApiPropertyOptional({ description: 'Kích hoạt', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Vị trí sắp xếp', default: 0 })
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}

export class UpdateFlashSaleDto extends PartialType(CreateFlashSaleDto) {}

export class AddFlashSaleProductDto {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiPropertyOptional({ description: 'Variant ID' })
  @IsString()
  @IsOptional()
  variantId?: string;

  @ApiProperty({ description: 'Giá bán trong đợt flash sale' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  flashPrice: number;

  @ApiProperty({ description: 'Giá gốc trước khi giảm' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  originalPrice: number;

  @ApiProperty({ description: 'Số lượng sản phẩm bán trong flash sale' })
  @IsInt()
  @Min(1)
  maxQuantity: number;

  @ApiPropertyOptional({ description: 'Giới hạn số lượng mua trên mỗi đơn hàng', default: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  limitPerOrder?: number;

  @ApiPropertyOptional({ description: 'Vị trí sắp xếp', default: 0 })
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}

export class UpdateFlashSaleProductDto extends PartialType(AddFlashSaleProductDto) {}
