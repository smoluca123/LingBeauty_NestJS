import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { BannerGroupResponseDto } from './dto/banner-response.dto';
import { ApiGetActiveBannerGroup } from './decorators/banner.decorators';

@ApiTags('Public Banner')
@Controller('public/banners')
export class BannerPublicController {
  constructor(private readonly bannerService: BannerService) {}

  @Get('active')
  @ApiGetActiveBannerGroup()
  getActiveBannerGroup(): Promise<
    IBeforeTransformResponseType<BannerGroupResponseDto>
  > {
    return this.bannerService.getActiveBannerGroup();
  }
}
