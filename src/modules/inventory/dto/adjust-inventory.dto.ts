import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AdjustInventoryDto {
  @ApiProperty({
    example: -5,
    description:
      'Relative quantity change. Positive to add stock, negative to reduce. Result cannot be negative.',
  })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  delta: number;
}
