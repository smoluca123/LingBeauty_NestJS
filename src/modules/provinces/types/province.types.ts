/**
 * Vietnamese Province Data Types
 * Based on provinces.open-api.vn response format
 */

// Ward (Phường/Xã)
export interface ProvinceWard {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
}

// District (Quận/Huyện) - Only in V1
export interface ProvinceDistrict {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: ProvinceWard[];
}

// Province V1 (Before 07/2025 - 3 levels: Province -> District -> Ward)
export interface ProvinceV1 {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
  districts: ProvinceDistrict[];
}

// Province V2 (After 07/2025 - 2 levels: Province -> Ward)
export interface ProvinceV2 {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
  wards: ProvinceWard[];
}

// Union type
export type Province = ProvinceV1 | ProvinceV2;

// Type guards
export function isProvinceV1(province: Province): province is ProvinceV1 {
  return 'districts' in province;
}

export function isProvinceV2(province: Province): province is ProvinceV2 {
  return 'wards' in province && !('districts' in province);
}
