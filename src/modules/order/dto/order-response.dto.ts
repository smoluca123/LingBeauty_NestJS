import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from 'prisma/generated/prisma/client';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';
import { AddressResponseDto } from 'src/modules/user/dto/address-response.dto';
import { ProductResponseDto } from 'src/modules/product/dto/product-response.dto';
import { ProductVariantResponseDto } from 'src/modules/product/dto/product-variant.dto';

/**
 * Response DTO for individual order item
 * Contains product and variant details with pricing information
 */
export class OrderItemDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  orderId: string;

  @Expose()
  @ApiProperty()
  productId: string;

  @Expose()
  @ApiProperty()
  variantId: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  sku: string;

  @Expose()
  @ApiProperty()
  price: string;

  @Expose()
  @ApiProperty()
  quantity: number;

  @Expose()
  @ApiProperty()
  total: string;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @Type(() => ProductResponseDto)
  @ApiProperty({ type: ProductResponseDto })
  product: ProductResponseDto;

  @Expose()
  @Type(() => ProductVariantResponseDto)
  @ApiProperty({ type: ProductVariantResponseDto })
  variant: ProductVariantResponseDto;
}

/**
 * Response DTO for order payment information
 * Tracks payment method, status, and transaction details
 */
export class OrderPaymentDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  orderId: string;

  @Expose()
  @ApiProperty({ enum: PaymentMethod })
  method: PaymentMethod;

  @Expose()
  @ApiProperty()
  amount: string;

  @Expose()
  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @Expose()
  @ApiPropertyOptional()
  transactionId?: string;

  @Expose()
  @Type(() => Date)
  @ApiPropertyOptional()
  paidAt?: Date;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  updatedAt: Date;
}

/**
 * Complete response DTO for order details
 * Includes user, shipping address, items, and payment information
 */
export class OrderResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  orderNumber: string;

  @Expose()
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @Expose()
  @ApiProperty()
  subtotal: string;

  @Expose()
  @ApiProperty()
  tax: string;

  @Expose()
  @ApiProperty()
  shipping: string;

  @Expose()
  @ApiProperty()
  discount: string;

  @Expose()
  @ApiProperty()
  total: string;

  @Expose()
  @ApiPropertyOptional()
  shippingAddressId?: string;

  @Expose()
  @ApiPropertyOptional()
  affiliateCode?: string;

  @Expose()
  @ApiPropertyOptional()
  couponCode?: string;

  @Expose()
  @ApiPropertyOptional()
  notes?: string;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @Expose()
  @Type(() => AddressResponseDto)
  @ApiPropertyOptional({ type: AddressResponseDto })
  shippingAddress?: AddressResponseDto;

  @Expose()
  @Type(() => OrderItemDto)
  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];

  @Expose()
  @Type(() => OrderPaymentDto)
  @ApiProperty({ type: [OrderPaymentDto] })
  payments: OrderPaymentDto[];
}

/**
 * Lightweight response DTO for order list views
 * Contains summary information without nested details
 */
export class OrderListItemDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  orderNumber: string;

  @Expose()
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @Expose()
  @ApiProperty()
  total: string;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @Expose()
  @ApiProperty()
  itemCount: number;
}
