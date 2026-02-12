import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProvincesService } from './provinces.service';
import type { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { ProvinceV1, ProvinceV2 } from './types/province.types';
import {
  ApiGetProvincesV1,
  ApiGetProvincesV2,
  ApiGetProvincesByVersion,
} from './decorators/provinces.decorators';

/**
 * Provinces Controller
 * Public endpoints for Vietnamese administrative division data
 * No authentication required
 */
@ApiTags('Provinces')
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  /**
   * Get V1 province data (Before administrative merger - 3 levels)
   * @returns Province array with districts and wards
   */
  @Get('v1')
  @ApiGetProvincesV1()
  getProvincesV1(): IBeforeTransformResponseType<ProvinceV1[]> {
    return this.provincesService.getProvincesV1();
  }

  /**
   * Get V2 province data (After administrative merger - 2 levels)
   * @returns Province array with wards directly
   */
  @Get('v2')
  @ApiGetProvincesV2()
  getProvincesV2(): IBeforeTransformResponseType<ProvinceV2[]> {
    return this.provincesService.getProvincesV2();
  }

  /**
   * Get province data by version parameter
   * @param version - 'v1' or 'v2'
   */
  @Get(':version')
  @ApiGetProvincesByVersion()
  getProvincesByVersion(
    @Param('version') version: string,
  ):
    | IBeforeTransformResponseType<ProvinceV1[]>
    | IBeforeTransformResponseType<ProvinceV2[]> {
    if (version !== 'v1' && version !== 'v2') {
      throw new BadRequestException(
        `Invalid version "${version}". Supported versions: v1, v2`,
      );
    }
    return this.provincesService.getProvincesByVersion(version);
  }
}
