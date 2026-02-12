import { ApiProperty } from '@nestjs/swagger';

/**
 * Ward (Phường/Xã) Response DTO
 */
export class WardResponseDto {
  @ApiProperty({
    description: 'Ward name',
    example: 'Phường Phúc Xá',
  })
  name: string;

  @ApiProperty({
    description: 'Unique code for the ward',
    example: 1,
  })
  code: number;

  @ApiProperty({
    description: 'URL-friendly codename',
    example: 'phuong_phuc_xa',
  })
  codename: string;

  @ApiProperty({
    description: 'Division type (xã, phường, thị trấn, etc.)',
    example: 'xã',
  })
  division_type: string;

  @ApiProperty({
    description: 'Short codename',
    example: 'phuc_xa',
  })
  short_codename: string;
}

/**
 * District (Quận/Huyện) Response DTO - Only for V1
 */
export class DistrictResponseDto {
  @ApiProperty({
    description: 'District name',
    example: 'Quận Ba Đình',
  })
  name: string;

  @ApiProperty({
    description: 'Unique code for the district',
    example: 1,
  })
  code: number;

  @ApiProperty({
    description: 'URL-friendly codename',
    example: 'quan_ba_dinh',
  })
  codename: string;

  @ApiProperty({
    description: 'Division type (quận, huyện, thành phố, etc.)',
    example: 'huyện',
  })
  division_type: string;

  @ApiProperty({
    description: 'Short codename',
    example: 'ba_dinh',
  })
  short_codename: string;

  @ApiProperty({
    description: 'List of wards in this district',
    type: [WardResponseDto],
  })
  wards: WardResponseDto[];
}

/**
 * Province V1 Response DTO (Before 07/2025 - 3 levels)
 */
export class ProvinceV1ResponseDto {
  @ApiProperty({
    description: 'Province name',
    example: 'Thành phố Hà Nội',
  })
  name: string;

  @ApiProperty({
    description: 'Unique code for the province',
    example: 1,
  })
  code: number;

  @ApiProperty({
    description: 'URL-friendly codename',
    example: 'thanh_pho_ha_noi',
  })
  codename: string;

  @ApiProperty({
    description: 'Division type (tỉnh, thành phố trung ương)',
    example: 'tỉnh',
  })
  division_type: string;

  @ApiProperty({
    description: 'Phone area code',
    example: 24,
  })
  phone_code: number;

  @ApiProperty({
    description: 'List of districts in this province',
    type: [DistrictResponseDto],
  })
  districts: DistrictResponseDto[];
}

/**
 * Province V2 Response DTO (After 07/2025 - 2 levels)
 */
export class ProvinceV2ResponseDto {
  @ApiProperty({
    description: 'Province name',
    example: 'Thành phố Hà Nội',
  })
  name: string;

  @ApiProperty({
    description: 'Unique code for the province',
    example: 1,
  })
  code: number;

  @ApiProperty({
    description: 'URL-friendly codename',
    example: 'ha_noi',
  })
  codename: string;

  @ApiProperty({
    description: 'Division type (tỉnh, thành phố trung ương)',
    example: 'thành phố trung ương',
  })
  division_type: string;

  @ApiProperty({
    description: 'Phone area code',
    example: 24,
  })
  phone_code: number;

  @ApiProperty({
    description: 'List of wards directly in this province (no districts)',
    type: [WardResponseDto],
  })
  wards: WardResponseDto[];
}
