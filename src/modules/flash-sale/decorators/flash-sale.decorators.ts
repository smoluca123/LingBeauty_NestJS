import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FlashSaleResponseDto, FlashSaleProductResponseDto } from '../dto/flash-sale-response.dto';
import { CreateFlashSaleDto, UpdateFlashSaleDto, AddFlashSaleProductDto, UpdateFlashSaleProductDto } from '../dto/flash-sale.dto';

// ============== Public Endpoints ==============

export function ApiGetCurrentFlashSale() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get current flash sale',
      description: 'Get the currently active flash sale, if any',
    }),
    ApiResponse({
      status: 200,
      description: 'Current flash sale retrieved successfully',
      type: FlashSaleResponseDto,
    }),
  );
}

export function ApiGetUpcomingFlashSales() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get upcoming flash sales',
      description: 'Get a list of upcoming flash sales',
    }),
    ApiResponse({
      status: 200,
      description: 'Upcoming flash sales retrieved successfully',
      type: [FlashSaleResponseDto],
    }),
  );
}

// ============== Admin Flash Sale Endpoints ==============

export function ApiCreateFlashSale() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create flash sale',
      description: 'Create a new flash sale event (Admin)',
    }),
    ApiBody({ type: CreateFlashSaleDto }),
    ApiResponse({
      status: 201,
      description: 'Flash sale created successfully',
      type: FlashSaleResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
  );
}

export function ApiGetAllFlashSales() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all flash sales',
      description: 'Get all flash sales with pagination (Admin)',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Items per page',
    }),
    ApiResponse({
      status: 200,
      description: 'Flash sales retrieved successfully',
    }),
  );
}

export function ApiGetFlashSaleById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get flash sale by ID',
      description: 'Get details of a specific flash sale (Admin)',
    }),
    ApiParam({ name: 'id', description: 'Flash sale ID' }),
    ApiResponse({
      status: 200,
      description: 'Flash sale retrieved successfully',
      type: FlashSaleResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Flash sale not found' }),
  );
}

export function ApiUpdateFlashSale() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update flash sale',
      description: 'Update flash sale details (Admin)',
    }),
    ApiParam({ name: 'id', description: 'Flash sale ID' }),
    ApiBody({ type: UpdateFlashSaleDto }),
    ApiResponse({
      status: 200,
      description: 'Flash sale updated successfully',
      type: FlashSaleResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Flash sale not found' }),
  );
}

export function ApiDeleteFlashSale() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete flash sale',
      description: 'Delete a flash sale (Admin)',
    }),
    ApiParam({ name: 'id', description: 'Flash sale ID' }),
    ApiResponse({
      status: 200,
      description: 'Flash sale deleted successfully',
    }),
    ApiResponse({ status: 404, description: 'Flash sale not found' }),
  );
}

// ============== Flash Sale Product Endpoints ==============

export function ApiAddProductsToFlashSale() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add products to flash sale',
      description: 'Add multiple products to a flash sale (Admin)',
    }),
    ApiParam({ name: 'id', description: 'Flash sale ID' }),
    ApiBody({ type: [AddFlashSaleProductDto] }),
    ApiResponse({
      status: 201,
      description: 'Products added to flash sale successfully',
      type: [FlashSaleProductResponseDto]
    }),
    ApiResponse({ status: 404, description: 'Flash sale not found' }),
  );
}

export function ApiUpdateFlashSaleProduct() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update flash sale product',
      description: 'Update a product in a flash sale (Admin)',
    }),
    ApiParam({ name: 'id', description: 'Flash sale ID' }),
    ApiParam({ name: 'productId', description: 'Product ID' }),
    ApiQuery({ name: 'variantId', required: false, description: 'Variant ID (optional)' }),
    ApiBody({ type: UpdateFlashSaleProductDto }),
    ApiResponse({
      status: 200,
      description: 'Flash sale product updated successfully',
      type: FlashSaleProductResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Flash sale product not found' }),
  );
}

export function ApiRemoveProductFromFlashSale() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove product from flash sale',
      description: 'Remove a product from a flash sale (Admin)',
    }),
    ApiParam({ name: 'id', description: 'Flash sale ID' }),
    ApiParam({ name: 'productId', description: 'Product ID' }),
    ApiQuery({ name: 'variantId', required: false, description: 'Variant ID (optional)' }),
    ApiResponse({
      status: 200,
      description: 'Product removed from flash sale successfully',
    }),
    ApiResponse({ status: 404, description: 'Flash sale product not found' }),
  );
}
