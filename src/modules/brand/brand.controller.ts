import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandResponseDto } from './dto/brand-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiCreateBrand,
  ApiGetBrand,
  ApiUpdateBrand,
  ApiDeleteBrand,
  ApiGetBrands,
} from './decorators/brand.decorators';

@ApiTags('Brand Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiGetBrands()
  getAllBrands(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<BrandResponseDto>> {
    return this.brandService.getAllBrands({ page, limit, search, order });
  }

  @Post()
  @ApiCreateBrand()
  createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() logo: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    return this.brandService.createBrand({
      createBrandDto,
      logo,
    });
  }

  @Get(':id')
  @ApiGetBrand()
  getBrand(
    @Param('id') brandId: string,
  ): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    return this.brandService.getBrandById(brandId);
  }

  @Patch(':id')
  @ApiUpdateBrand()
  updateBrand(
    @Param('id') brandId: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() logo: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    return this.brandService.updateBrand({
      brandId,
      updateBrandDto,
      logo,
    });
  }

  @Delete(':id')
  @ApiDeleteBrand()
  deleteBrand(
    @Param('id') brandId: string,
  ): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    return this.brandService.deleteBrand(brandId);
  }
}
