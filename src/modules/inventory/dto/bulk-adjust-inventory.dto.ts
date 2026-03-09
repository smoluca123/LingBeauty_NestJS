import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class BulkAdjustItemDto {
  @ApiProperty({
    example: 'uuid-inventory-id',
    description: 'ID of the ProductInventory record to adjust',
  })
  @IsUUID()
  @IsNotEmpty()
  inventoryId: string;

  @ApiProperty({
    example: 10,
    description: 'Relative quantity change. Positive to add, negative to reduce.',
  })
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  delta: number;
}

export class BulkAdjustInventoryDto {
  @ApiProperty({
    type: [BulkAdjustItemDto],
    description: 'List of inventory adjustments to perform atomically',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BulkAdjustItemDto)
  items: BulkAdjustItemDto[];
}
