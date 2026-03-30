import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from 'prisma/generated/prisma/client';

export class CreateOrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'uuid-product-id', description: 'ID sản phẩm' })
  productId!: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: 'uuid-variant-id',
    description: 'ID biến thể sản phẩm',
  })
  variantId!: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 2, description: 'Số lượng' })
  quantity!: number;
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: 'uuid-address-id',
    description: 'ID địa chỉ giao hàng',
  })
  shippingAddressId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ApiProperty({
    type: [CreateOrderItemDto],
    description: 'Danh sách sản phẩm trong đơn hàng',
  })
  items!: CreateOrderItemDto[];

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.COD,
    description: 'Phương thức thanh toán',
  })
  paymentMethod!: PaymentMethod;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'SUMMER2024', description: 'Mã giảm giá' })
  couponCode?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'AFF123', description: 'Mã affiliate' })
  affiliateCode?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Giao hàng giờ hành chính',
    description: 'Ghi chú đơn hàng',
  })
  notes?: string;
}
