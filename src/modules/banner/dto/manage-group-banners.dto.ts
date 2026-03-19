import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class BulkRemoveBannersDto {
  @ApiProperty({
    description: 'Danh sách ID của các banner cần gỡ khỏi nhóm',
    type: [String],
    example: ['uuid1', 'uuid2'],
  })
  @IsArray({ message: 'Danh sách ID banner phải là một mảng' })
  @IsString({ each: true, message: 'Mỗi ID banner phải là một chuỗi' })
  @IsNotEmpty({ message: 'Danh sách ID banner không được để trống' })
  bannerIds: string[];
}

export class ReorderBannerItemDto {
  @ApiProperty({
    description: 'ID của banner',
    example: 'uuid-1234',
  })
  @IsString({ message: 'ID banner phải là một chuỗi' })
  @IsNotEmpty({ message: 'ID banner không được để trống' })
  bannerId: string;

  @ApiProperty({
    description: 'Thứ tự mới',
    example: 1,
  })
  @IsNumber({}, { message: 'Thứ tự (sortOrder) phải là một số' })
  @IsNotEmpty({ message: 'Thứ tự (sortOrder) không được để trống' })
  sortOrder: number;
}

export class ReorderBannersDto {
  @ApiProperty({
    description: 'Danh sách các banner và thứ tự tương ứng',
    type: [ReorderBannerItemDto],
  })
  @IsArray({ message: 'Danh sách thứ tự phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => ReorderBannerItemDto)
  @IsNotEmpty({ message: 'Danh sách thứ tự không được để trống' })
  orderData: ReorderBannerItemDto[];
}
