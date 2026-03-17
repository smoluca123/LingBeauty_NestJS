import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/libs/dto/base-response.dto';
import { CouponType } from './create-coupon.dto';

export class CouponResponseDto extends BaseResponseDto {
  @ApiProperty({
    example: 'WELCOME10',
    description: 'The unique coupon code',
  })
  code: string;

  @ApiProperty({
    enum: CouponType,
    example: CouponType.FIXED,
    description: 'Type of coupon value',
  })
  type: string;

  @ApiProperty({
    example: '50000',
    description: 'The discount value',
  })
  value: string | number;

  @ApiPropertyOptional({
    example: '200000',
    description: 'Minimum purchase required',
  })
  minPurchase?: string | number;

  @ApiPropertyOptional({
    example: '50000',
    description: 'Max discount amount for percentage type',
  })
  maxDiscount?: string | number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Total times this coupon can be used',
  })
  usageLimit?: number;

  @ApiProperty({
    example: 10,
    description: 'How many times this coupon has been used',
  })
  usedCount: number;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
  })
  endDate: Date;

  @ApiProperty({
    example: true,
  })
  isActive: boolean;
}
