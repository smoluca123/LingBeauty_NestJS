import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class BanUserDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Ban status to set for the user',
    example: true,
  })
  isBanned: boolean;
}

export class BanUserBulkItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Target user ID',
    example: 'clxyz123abc',
  })
  userId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Ban status to set for this user',
    example: true,
  })
  isBanned: boolean;
}

export class BanUserBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BanUserBulkItemDto)
  @ApiProperty({
    description: 'Array of user ban update items',
    type: [BanUserBulkItemDto],
    example: [
      { userId: 'clxyz123abc', isBanned: true },
      { userId: 'clxyz456def', isBanned: false },
    ],
  })
  items: BanUserBulkItemDto[];
}

export class BanUserBulkResultDto {
  @ApiProperty({ description: 'Number of users updated', example: 2 })
  updatedCount: number;
}
