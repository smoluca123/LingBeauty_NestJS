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
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FlashSaleService } from './flash-sale.service';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { FlashSaleResponseDto, FlashSaleProductResponseDto } from './dto/flash-sale-response.dto';
import {
  CreateFlashSaleDto,
  UpdateFlashSaleDto,
  AddFlashSaleProductDto,
  UpdateFlashSaleProductDto,
} from './dto/flash-sale.dto';
import {
  ApiGetCurrentFlashSale,
  ApiGetUpcomingFlashSales,
  ApiCreateFlashSale,
  ApiGetAllFlashSales,
  ApiGetFlashSaleById,
  ApiUpdateFlashSale,
  ApiDeleteFlashSale,
  ApiAddProductsToFlashSale,
  ApiUpdateFlashSaleProduct,
  ApiRemoveProductFromFlashSale,
} from './decorators/flash-sale.decorators';

@ApiTags('Flash Sale')
@Controller('flash-sales')
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  // --- Public Endpoints ---
  @Get('current')
  @ApiGetCurrentFlashSale()
  getCurrentFlashSale(): Promise<IBeforeTransformResponseType<FlashSaleResponseDto | null>> {
    return this.flashSaleService.getCurrentFlashSale();
  }

  @Get('upcoming')
  @ApiGetUpcomingFlashSales()
  getUpcomingFlashSales(): Promise<IBeforeTransformResponseType<FlashSaleResponseDto[]>> {
    return this.flashSaleService.getUpcomingFlashSales();
  }

  // --- Admin Endpoints ---
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreateFlashSale()
  createFlashSale(@Body() dto: CreateFlashSaleDto): Promise<IBeforeTransformResponseType<FlashSaleResponseDto>> {
    return this.flashSaleService.createFlashSale(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiGetAllFlashSales()
  getAllFlashSales(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<IBeforeTransformPaginationResponseType<FlashSaleResponseDto>> {
    return this.flashSaleService.getAllFlashSales({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiGetFlashSaleById()
  getFlashSaleById(@Param('id') id: string): Promise<IBeforeTransformResponseType<FlashSaleResponseDto>> {
    return this.flashSaleService.getFlashSaleById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiUpdateFlashSale()
  updateFlashSale(
    @Param('id') id: string,
    @Body() dto: UpdateFlashSaleDto,
  ): Promise<IBeforeTransformResponseType<FlashSaleResponseDto>> {
    return this.flashSaleService.updateFlashSale(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiDeleteFlashSale()
  deleteFlashSale(@Param('id') id: string): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.flashSaleService.deleteFlashSale(id);
  }

  // --- Manage Products in Flash Sale ---
  @Post(':id/products')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiAddProductsToFlashSale()
  addProductsToFlashSale(
    @Param('id') id: string,
    @Body() dtos: AddFlashSaleProductDto[],
  ): Promise<IBeforeTransformResponseType<FlashSaleProductResponseDto[]>> {
    return this.flashSaleService.addProductsToFlashSale(id, dtos);
  }

  @Put(':id/products/:productId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiUpdateFlashSaleProduct()
  updateFlashSaleProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Query('variantId') variantId: string,
    @Body() dto: UpdateFlashSaleProductDto,
  ): Promise<IBeforeTransformResponseType<FlashSaleProductResponseDto>> {
    return this.flashSaleService.updateFlashSaleProduct(id, productId, variantId, dto);
  }

  @Delete(':id/products/:productId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiRemoveProductFromFlashSale()
  removeProductFromFlashSale(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Query('variantId') variantId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.flashSaleService.removeProductFromFlashSale(id, productId, variantId);
  }
}
