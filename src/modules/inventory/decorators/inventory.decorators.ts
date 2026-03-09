import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  ApiProtectedAuthOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import { ApiQueryLimitAndPage } from 'src/decorators/pagination.decorators';
import {
  InventoryOverviewResponseDto,
  InventoryProductResponseDto,
  InventoryResponseDto,
  InventoryVariantResponseDto,
} from '../dto/inventory-response.dto';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { AdjustInventoryDto } from '../dto/adjust-inventory.dto';
import { BulkAdjustInventoryDto } from '../dto/bulk-adjust-inventory.dto';

// ─── Overview & Reports ────────────────────────────────────────────────────

export const ApiGetInventoryOverview = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get inventory overview',
      description:
        'Returns aggregate inventory stats: total products, variants, in-stock, low-stock, out-of-stock count and total quantity.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({ status: 200, type: InventoryOverviewResponseDto }),
  );

export const ApiGetLowStockProducts = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get low-stock products (no variant)',
      description:
        'Returns paginated list of product-level inventory (variantId IS NULL) where quantity > 0 AND quantity <= lowStockThreshold.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiQueryLimitAndPage(),
    ApiResponse({ status: 200, type: [InventoryProductResponseDto] }),
  );

export const ApiGetLowStockVariants = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get low-stock variants',
      description:
        'Returns paginated list of variant-level inventory (variantId IS NOT NULL) where quantity > 0 AND quantity <= lowStockThreshold.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiQueryLimitAndPage(),
    ApiResponse({ status: 200, type: [InventoryVariantResponseDto] }),
  );

export const ApiGetOutOfStockProducts = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get out-of-stock products (no variant)',
      description:
        'Returns paginated list of product-level inventory (variantId IS NULL) with OUT_OF_STOCK display status.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiQueryLimitAndPage(),
    ApiResponse({ status: 200, type: [InventoryProductResponseDto] }),
  );

export const ApiGetOutOfStockVariants = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get out-of-stock variants',
      description:
        'Returns paginated list of variant-level inventory (variantId IS NOT NULL) with OUT_OF_STOCK display status.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiQueryLimitAndPage(),
    ApiResponse({ status: 200, type: [InventoryVariantResponseDto] }),
  );

export const ApiBulkAdjustInventory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Bulk adjust inventory',
      description:
        'Atomically adjust quantity for multiple inventory records in a single transaction. All items succeed or all roll back.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiBody({ type: BulkAdjustInventoryDto }),
    ApiResponse({ status: 200, type: [InventoryResponseDto] }),
  );

// ─── Product-Level Inventory ───────────────────────────────────────────────

export const ApiGetProductInventory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get product-level inventory',
      description:
        'Get inventory for a simple product (no variants). Returns INVENTORY_PRODUCT_HAS_VARIANTS if the product has variants.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({ name: 'productId', description: 'Product ID', type: String }),
    ApiResponse({ status: 200, type: InventoryResponseDto }),
  );

export const ApiUpdateProductInventory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update product-level inventory',
      description:
        'Set absolute quantity and/or update displayStatus / lowStockThreshold for a simple product.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({ name: 'productId', description: 'Product ID', type: String }),
    ApiBody({ type: UpdateInventoryDto }),
    ApiResponse({ status: 200, type: InventoryResponseDto }),
  );

export const ApiAdjustProductInventory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Adjust product-level inventory',
      description:
        'Increase or decrease quantity by a relative delta value. Result cannot be negative.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({ name: 'productId', description: 'Product ID', type: String }),
    ApiBody({ type: AdjustInventoryDto }),
    ApiResponse({ status: 200, type: InventoryResponseDto }),
  );

// ─── Variant-Level Inventory ───────────────────────────────────────────────

export const ApiGetVariantInventory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get variant-level inventory',
      description: 'Get inventory for a specific product variant.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({ name: 'productId', description: 'Product ID', type: String }),
    ApiParam({ name: 'variantId', description: 'Variant ID', type: String }),
    ApiResponse({ status: 200, type: InventoryVariantResponseDto }),
  );

export const ApiUpdateVariantInventory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update variant-level inventory',
      description:
        'Set absolute quantity and/or update displayStatus / lowStockThreshold for a variant.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({ name: 'productId', description: 'Product ID', type: String }),
    ApiParam({ name: 'variantId', description: 'Variant ID', type: String }),
    ApiBody({ type: UpdateInventoryDto }),
    ApiResponse({ status: 200, type: InventoryResponseDto }),
  );

export const ApiAdjustVariantInventory = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Adjust variant-level inventory',
      description:
        'Increase or decrease variant quantity by a relative delta value. Result cannot be negative.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiParam({ name: 'productId', description: 'Product ID', type: String }),
    ApiParam({ name: 'variantId', description: 'Variant ID', type: String }),
    ApiBody({ type: AdjustInventoryDto }),
    ApiResponse({ status: 200, type: InventoryResponseDto }),
  );
