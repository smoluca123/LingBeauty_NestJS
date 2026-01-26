import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerGroupDto } from './dto/create-banner-group.dto';
import { UpdateBannerGroupDto } from './dto/update-banner-group.dto';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  BannerGroupResponseDto,
  BannerResponseDto,
} from './dto/banner-response.dto';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { normalizePaginationParams } from 'src/libs/utils/utils';
import {
  ApiGetAllBannerGroups,
  ApiGetBannerGroupById,
  ApiCreateBannerGroup,
  ApiUpdateBannerGroup,
  ApiDeleteBannerGroup,
  ApiCreateBanner,
  ApiCreateBannerWithUpload,
  ApiUpdateBanner,
  ApiUpdateBannerWithUpload,
  ApiDeleteBanner,
} from './decorators/banner.decorators';

@ApiTags('Banner Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // ============== Banner Group Endpoints ==============

  @Get()
  @ApiGetAllBannerGroups()
  getAllBannerGroups(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<IBeforeTransformPaginationResponseType<BannerGroupResponseDto>> {
    const { page: normalizedPage, limit: normalizedLimit } =
      normalizePaginationParams({ page, limit });
    return this.bannerService.getAllBannerGroups({
      page: normalizedPage,
      limit: normalizedLimit,
    });
  }

  @Get('group/:id')
  @ApiGetBannerGroupById()
  getBannerGroupById(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    return this.bannerService.getBannerGroupById(id);
  }

  @Post('group')
  @ApiCreateBannerGroup()
  createBannerGroup(
    @Body() dto: CreateBannerGroupDto,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    return this.bannerService.createBannerGroup(dto);
  }

  @Patch('group/:id')
  @ApiUpdateBannerGroup()
  updateBannerGroup(
    @Param('id') id: string,
    @Body() dto: UpdateBannerGroupDto,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    return this.bannerService.updateBannerGroup(id, dto);
  }

  @Delete('group/:id')
  @ApiDeleteBannerGroup()
  deleteBannerGroup(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.bannerService.deleteBannerGroup(id);
  }

  // ============== Banner Item Endpoints ==============

  @Post('group/:groupId/items')
  @ApiCreateBanner()
  createBanner(
    @Param('groupId') groupId: string,
    @Body() dto: CreateBannerDto,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    return this.bannerService.createBanner(groupId, dto);
  }

  @Post('group/:groupId/items/upload')
  @ApiCreateBannerWithUpload()
  @UseInterceptors(FileInterceptor('file'))
  createBannerWithUpload(
    @Param('groupId') groupId: string,
    @Body() dto: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    return this.bannerService.createBannerWithUpload(
      groupId,
      dto,
      file,
      decodedAccessToken.userId,
    );
  }

  @Patch('item/:id')
  @ApiUpdateBanner()
  updateBanner(
    @Param('id') id: string,
    @Body() dto: UpdateBannerDto,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    return this.bannerService.updateBanner(id, dto);
  }

  @Patch('item/:id/upload')
  @ApiUpdateBannerWithUpload()
  @UseInterceptors(FileInterceptor('file'))
  updateBannerWithUpload(
    @Param('id') id: string,
    @Body() dto: UpdateBannerDto,
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    return this.bannerService.updateBannerWithUpload(
      id,
      dto,
      file,
      decodedAccessToken.userId,
    );
  }

  @Delete('item/:id')
  @ApiDeleteBanner()
  deleteBanner(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.bannerService.deleteBanner(id);
  }

  // ============== Seed Endpoint ==============

  @Post('seed')
  @ApiOperation({
    summary: 'Seed banner data',
    description: 'Seed banner data with realistic content from UI (Admin only)',
  })
  @ApiResponse({
    status: 201,
    description: 'Banner data seeded successfully',
  })
  seedBanners(): Promise<
    IBeforeTransformResponseType<{ message: string; count: number }>
  > {
    return this.bannerService.seedBanners();
  }
}
