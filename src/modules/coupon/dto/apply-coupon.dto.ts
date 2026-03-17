import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class ApplyCouponDto {
  @ApiPropertyOptional({
    example: 'WELCOME10',
    description: 'Mã giảm giá để áp dụng vào giỏ hàng',
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({
    example: 500000,
    description: 'Tổng tiền tạm tính của giỏ hàng để validation',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  subtotal?: number;
}
