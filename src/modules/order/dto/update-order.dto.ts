import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'prisma/generated/prisma/client';

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  @ApiPropertyOptional({
    enum: OrderStatus,
    example: OrderStatus.CONFIRMED,
    description: 'Trạng thái đơn hàng',
  })
  status?: OrderStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Cập nhật ghi chú',
    description: 'Ghi chú đơn hàng',
  })
  notes?: string;
}

export class CancelOrderDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Khách hàng đổi ý',
    description: 'Lý do hủy đơn',
  })
  reason?: string;
}
