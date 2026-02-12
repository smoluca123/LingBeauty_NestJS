import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as provincesV1Data from './data/provinces-v1.json';
import * as provincesV2Data from './data/provinces-v2.json';
import { ProvinceV1, ProvinceV2 } from './types/province.types';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';

/**
 * Provinces Service
 * Serves Vietnamese administrative division data (provinces, districts, wards)
 * Data is loaded from JSON files and cached in memory
 */
@Injectable()
export class ProvincesService {
  private readonly v1Data: ProvinceV1[];
  private readonly v2Data: ProvinceV2[];

  constructor() {
    // Load and cache data on service initialization
    this.v1Data = Array.isArray(provincesV1Data)
      ? (provincesV1Data as ProvinceV1[])
      : ((provincesV1Data as any).default as ProvinceV1[]) || [];

    this.v2Data = Array.isArray(provincesV2Data)
      ? (provincesV2Data as ProvinceV2[])
      : ((provincesV2Data as any).default as ProvinceV2[]) || [];

    // Validate data loaded successfully
    if (this.v1Data.length === 0) {
      console.warn(
        '⚠️  Warning: provinces-v1.json is empty. Please download data from API.',
      );
    }

    if (this.v2Data.length === 0) {
      console.warn(
        '⚠️  Warning: provinces-v2.json is empty. Please download data from API.',
      );
    }

    console.log(
      `✅ Provinces data loaded: V1 (${this.v1Data.length} provinces), V2 (${this.v2Data.length} provinces)`,
    );
  }

  /**
   * Get V1 province data (Before 07/2025 - 3 levels: Province -> District -> Ward)
   * Returns data directly - response wrapper added by interceptor
   */
  getProvincesV1(): IBeforeTransformResponseType<ProvinceV1[]> {
    if (this.v1Data.length === 0) {
      throw new InternalServerErrorException(
        'Province V1 data not available. Please download data from API.',
      );
    }
    return {
      type: 'response',
      data: this.v1Data,
      message: 'Success',
      statusCode: 200,
    };
  }

  /**
   * Get V2 province data (After 07/2025 - 2 levels: Province -> Ward)
   * Returns data directly - response wrapper added by interceptor
   */
  getProvincesV2(): IBeforeTransformResponseType<ProvinceV2[]> {
    if (this.v2Data.length === 0) {
      throw new InternalServerErrorException(
        'Province V2 data not available. Please download data from API.',
      );
    }
    return {
      type: 'response',
      data: this.v2Data,
      message: 'Success',
      statusCode: 200,
    };
  }

  /**
   * Get province data by version
   * @param version - 'v1' or 'v2'
   */
  getProvincesByVersion(
    version: 'v1' | 'v2',
  ):
    | IBeforeTransformResponseType<ProvinceV1[]>
    | IBeforeTransformResponseType<ProvinceV2[]> {
    return version === 'v1' ? this.getProvincesV1() : this.getProvincesV2();
  }
}
