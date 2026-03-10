import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InventoryService } from './inventory.service';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  InventoryOverviewResponseDto,
  InventoryProductResponseDto,
  InventoryResponseDto,
  InventoryVariantResponseDto,
} from './dto/inventory-response.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { AdjustInventoryDto } from './dto/adjust-inventory.dto';
import { BulkAdjustInventoryDto } from './dto/bulk-adjust-inventory.dto';
import {
  ApiAdjustProductInventory,
  ApiAdjustVariantInventory,
  ApiBulkAdjustInventory,
  ApiGetInventoryOverview,
  ApiGetLowStockProducts,
  ApiGetLowStockVariants,
  ApiGetOutOfStockProducts,
  ApiGetOutOfStockVariants,
  ApiGetProductInventory,
  ApiGetVariantInventory,
  ApiUpdateProductInventory,
  ApiUpdateVariantInventory,
} from './decorators/inventory.decorators';

@ApiTags('Inventory Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // ─── Overview & Reports ──────────────────────────────────────────────────

  @Get('overview')
  @ApiGetInventoryOverview()
  getInventoryOverview(): Promise<
    IBeforeTransformResponseType<InventoryOverviewResponseDto>
  > {
    return this.inventoryService.getInventoryOverview();
  }

  @Get('low-stock/products')
  @ApiGetLowStockProducts()
  getLowStockProducts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryProductResponseDto>
  > {
    return this.inventoryService.getLowStockProducts(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Get('low-stock/variants')
  @ApiGetLowStockVariants()
  getLowStockVariants(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryVariantResponseDto>
  > {
    return this.inventoryService.getLowStockVariants(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Get('out-of-stock/products')
  @ApiGetOutOfStockProducts()
  getOutOfStockProducts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryProductResponseDto>
  > {
    return this.inventoryService.getOutOfStockProducts(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Get('out-of-stock/variants')
  @ApiGetOutOfStockVariants()
  getOutOfStockVariants(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryVariantResponseDto>
  > {
    return this.inventoryService.getOutOfStockVariants(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
  }

  @Post('bulk-adjust')
  @ApiBulkAdjustInventory()
  bulkAdjustInventory(
    @Body() dto: BulkAdjustInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto[]>> {
    return this.inventoryService.bulkAdjustInventory(dto);
  }

  // ─── Product-Level Inventory ─────────────────────────────────────────────

  @Get('product/:productId')
  @ApiGetProductInventory()
  getProductInventory(
    @Param('productId') productId: string,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    return this.inventoryService.getProductInventory(productId);
  }

  @Patch('product/:productId')
  @ApiUpdateProductInventory()
  updateProductInventory(
    @Param('productId') productId: string,
    @Body() dto: UpdateInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    return this.inventoryService.updateProductInventory(productId, dto);
  }

  @Post('product/:productId/adjust')
  @ApiAdjustProductInventory()
  adjustProductInventory(
    @Param('productId') productId: string,
    @Body() dto: AdjustInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    return this.inventoryService.adjustProductInventory(productId, dto);
  }

  // ─── Variant-Level Inventory ─────────────────────────────────────────────

  @Get('product/:productId/variant/:variantId')
  @ApiGetVariantInventory()
  getVariantInventory(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
  ): Promise<IBeforeTransformResponseType<InventoryVariantResponseDto>> {
    return this.inventoryService.getVariantInventory(productId, variantId);
  }

  @Patch('product/:productId/variant/:variantId')
  @ApiUpdateVariantInventory()
  updateVariantInventory(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() dto: UpdateInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryVariantResponseDto>> {
    return this.inventoryService.updateVariantInventory(
      productId,
      variantId,
      dto,
    );
  }

  @Post('product/:productId/variant/:variantId/adjust')
  @ApiAdjustVariantInventory()
  adjustVariantInventory(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() dto: AdjustInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryVariantResponseDto>> {
    return this.inventoryService.adjustVariantInventory(
      productId,
      variantId,
      dto,
    );
  }
}
