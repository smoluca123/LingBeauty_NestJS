import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  ProvinceV1ResponseDto,
  ProvinceV2ResponseDto,
} from '../dto/province-response.dto';

/**
 * API decorator for GET /provinces/v1
 * Returns V1 province data (3 levels: Province -> District -> Ward)
 */
export function ApiGetProvincesV1() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get V1 province data (Before 07/2025)',
      description:
        'Returns Vietnamese provinces with districts and wards (3-level structure). Data is cached in memory and served from static JSON file.',
    }),
    ApiResponse({
      status: 200,
      description: 'List of provinces with districts and wards',
      type: [ProvinceV1ResponseDto],
    }),
    ApiResponse({
      status: 500,
      description: 'Province V1 data not available',
    }),
  );
}

/**
 * API decorator for GET /provinces/v2
 * Returns V2 province data (2 levels: Province -> Ward)
 */
export function ApiGetProvincesV2() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get V2 province data (After 07/2025)',
      description:
        'Returns Vietnamese provinces with wards directly (2-level structure, districts removed after administrative merger). Data is cached in memory and served from static JSON file.',
    }),
    ApiResponse({
      status: 200,
      description: 'List of provinces with wards (no districts)',
      type: [ProvinceV2ResponseDto],
    }),
    ApiResponse({
      status: 500,
      description: 'Province V2 data not available',
    }),
  );
}

/**
 * API decorator for GET /provinces/:version
 * Returns province data by version parameter
 */
export function ApiGetProvincesByVersion() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get province data by version',
      description:
        'Returns province data based on version parameter (v1 or v2). Defaults to v2 if invalid version provided.',
    }),
    ApiParam({
      name: 'version',
      description: 'API version (v1 or v2)',
      enum: ['v1', 'v2'],
      example: 'v2',
    }),
    ApiResponse({
      status: 200,
      description: 'List of provinces based on version',
    }),
    ApiResponse({
      status: 500,
      description: 'Province data not available',
    }),
  );
}
