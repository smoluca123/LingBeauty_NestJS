import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export enum CouponType {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

export class CreateCouponDto {
  @ApiProperty({
    example: 'WELCOME10',
    description: 'Mã giảm giá (phải là duy nhất)',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    enum: CouponType,
    example: CouponType.PERCENTAGE,
    description: 'Loại giảm giá (Cố định hoặc Phần trăm)',
  })
  @IsEnum(CouponType)
  @IsNotEmpty()
  type: CouponType | string;

  @ApiProperty({
    example: 10,
    description: 'Giá trị giảm giá (vd: 10 cho 10%)',
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiPropertyOptional({
    example: 200000,
    description: 'Giá trị đơn hàng tối thiểu để áp dụng',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPurchase?: number;

  @ApiPropertyOptional({
    example: 50000,
    description: 'Số tiền giảm tối đa (Áp dụng khi loại là PERCENTAGE)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxDiscount?: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Giới hạn số lượt sử dụng mã này',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  usageLimit?: number;

  @ApiProperty({
    example: '2025-01-01T00:00:00.000Z',
    description: 'Ngày bắt đầu áp dụng',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string | Date;

  @ApiProperty({
    example: '2025-12-31T23:59:59.000Z',
    description: 'Ngày hết hạn áp dụng',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string | Date;

  @ApiPropertyOptional({
    example: true,
    description: 'Trạng thái hoạt động của mã giảm giá',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
