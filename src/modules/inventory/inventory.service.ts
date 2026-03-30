import { Injectable } from '@nestjs/common';
import { ProductInventoryDisplayStatus } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { withoutDeleted } from 'src/libs/prisma/soft-delete.helpers';
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
import { InventoryListQueryDto } from './dto/inventory-list-query.dto';
import { toResponseDtoArray } from 'src/libs/utils/transform.utils';
import {
  inventoryFullSelect,
  inventoryVariantFullSelect,
} from 'src/libs/prisma/product-inventory-select';

@Injectable()
export class InventoryService {
  constructor(private readonly prismaService: PrismaService) {}

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /** Calculate displayStatus from quantity unless an explicit override is given */
  private resolveDisplayStatus(
    quantity: number,
    _lowStockThreshold: number,
    explicitStatus?: ProductInventoryDisplayStatus,
  ): ProductInventoryDisplayStatus {
    if (explicitStatus) return explicitStatus;
    // Enum only has IN_STOCK / OUT_OF_STOCK — low-stock is determined via query
    if (quantity <= 0) return ProductInventoryDisplayStatus.OUT_OF_STOCK;
    return ProductInventoryDisplayStatus.IN_STOCK;
  }

  // ─── Product-Level Inventory ──────────────────────────────────────────────

  /**
   * Get inventory for a product's default variant.
   * After migration, all products have at least one variant (default variant).
   */
  async getProductInventory(
    productId: string,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    try {
      // Find default variant (prioritize -DEFAULT suffix, then first by sortOrder)
      const defaultVariant = await this.prismaService.productVariant.findFirst({
        where: withoutDeleted({
          productId,
          OR: [{ sku: { endsWith: '-DEFAULT' } }, { sortOrder: 0 }],
        }),
        orderBy: [
          { sku: 'asc' }, // Prioritize -DEFAULT suffix
          { sortOrder: 'asc' },
        ],
        select: { id: true },
      });

      if (!defaultVariant) {
        throw new BusinessException(
          'Sản phẩm không có variant nào',
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      // Get inventory for default variant
      const inventory = await this.prismaService.productInventory.findFirst({
        where: {
          productId,
          variantId: defaultVariant.id,
        },
        select: inventoryFullSelect,
      });

      if (!inventory) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_NOT_FOUND],
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      return {
        type: 'response',
        message: 'Lấy thông tin kho hàng thành công',
        data: inventory as unknown as InventoryResponseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Update inventory for a product's default variant (absolute quantity set).
   */
  async updateProductInventory(
    productId: string,
    dto: UpdateInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    try {
      // Find default variant
      const defaultVariant = await this.prismaService.productVariant.findFirst({
        where: withoutDeleted({
          productId,
          OR: [{ sku: { endsWith: '-DEFAULT' } }, { sortOrder: 0 }],
        }),
        orderBy: [{ sku: 'asc' }, { sortOrder: 'asc' }],
        select: { id: true },
      });

      if (!defaultVariant) {
        throw new BusinessException(
          'Sản phẩm không có variant nào',
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      const inventory = await this.prismaService.productInventory.findFirst({
        where: {
          productId,
          variantId: defaultVariant.id,
        },
        select: { id: true, quantity: true, lowStockThreshold: true },
      });

      if (!inventory) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_NOT_FOUND],
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      const newQuantity = dto.quantity ?? inventory.quantity;
      const newThreshold = dto.lowStockThreshold ?? inventory.lowStockThreshold;
      const newStatus = this.resolveDisplayStatus(
        newQuantity,
        newThreshold,
        dto.displayStatus,
      );

      const updated = await this.prismaService.productInventory.update({
        where: { id: inventory.id },
        data: {
          quantity: newQuantity,
          lowStockThreshold: newThreshold,
          displayStatus: newStatus,
        },
        select: inventoryFullSelect,
      });

      return {
        type: 'response',
        message: 'Cập nhật kho hàng thành công',
        data: updated as unknown as InventoryResponseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Adjust inventory for a product's default variant (relative delta).
   */
  async adjustProductInventory(
    productId: string,
    dto: AdjustInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    try {
      // Find default variant
      const defaultVariant = await this.prismaService.productVariant.findFirst({
        where: withoutDeleted({
          productId,
          OR: [{ sku: { endsWith: '-DEFAULT' } }, { sortOrder: 0 }],
        }),
        orderBy: [{ sku: 'asc' }, { sortOrder: 'asc' }],
        select: { id: true },
      });

      if (!defaultVariant) {
        throw new BusinessException(
          'Sản phẩm không có variant nào',
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      const inventory = await this.prismaService.productInventory.findFirst({
        where: {
          productId,
          variantId: defaultVariant.id,
        },
        select: { id: true, quantity: true, lowStockThreshold: true },
      });

      if (!inventory) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_NOT_FOUND],
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      const newQuantity = inventory.quantity + dto.delta;
      if (newQuantity < 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_INVALID_ADJUSTMENT],
          ERROR_CODES.INVENTORY_INVALID_ADJUSTMENT,
        );
      }

      const newStatus = this.resolveDisplayStatus(
        newQuantity,
        inventory.lowStockThreshold,
      );

      const updated = await this.prismaService.productInventory.update({
        where: { id: inventory.id },
        data: { quantity: newQuantity, displayStatus: newStatus },
        select: inventoryFullSelect,
      });

      return {
        type: 'response',
        message: 'Điều chỉnh kho hàng thành công',
        data: updated as unknown as InventoryResponseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ─── Variant-Level Inventory ──────────────────────────────────────────────

  /**
   * Get inventory for a specific variant.
   */
  async getVariantInventory(
    productId: string,
    variantId: string,
  ): Promise<IBeforeTransformResponseType<InventoryVariantResponseDto>> {
    try {
      const variant = await this.prismaService.productVariant.findFirst({
        where: withoutDeleted({ id: variantId, productId }),
        select: { id: true },
      });

      if (!variant) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_VARIANT_MISMATCH],
          ERROR_CODES.INVENTORY_VARIANT_MISMATCH,
        );
      }

      const inventory = await this.prismaService.productInventory.findFirst({
        where: { variantId },
        select: inventoryVariantFullSelect,
      });

      if (!inventory) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_NOT_FOUND],
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      return {
        type: 'response',
        message: 'Lấy thông tin kho hàng biến thể thành công',
        data: inventory as unknown as InventoryVariantResponseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Update inventory for a specific variant.
   */
  async updateVariantInventory(
    productId: string,
    variantId: string,
    dto: UpdateInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryVariantResponseDto>> {
    try {
      const variant = await this.prismaService.productVariant.findFirst({
        where: withoutDeleted({ id: variantId, productId }),
        select: { id: true },
      });

      if (!variant) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_VARIANT_MISMATCH],
          ERROR_CODES.INVENTORY_VARIANT_MISMATCH,
        );
      }

      const inventory = await this.prismaService.productInventory.findFirst({
        where: { variantId },
        select: { id: true, quantity: true, lowStockThreshold: true },
      });

      if (!inventory) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_NOT_FOUND],
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      const newQuantity = dto.quantity ?? inventory.quantity;
      const newThreshold = dto.lowStockThreshold ?? inventory.lowStockThreshold;
      const newStatus = this.resolveDisplayStatus(
        newQuantity,
        newThreshold,
        dto.displayStatus,
      );

      const updated = await this.prismaService.productInventory.update({
        where: { id: inventory.id },
        data: {
          quantity: newQuantity,
          lowStockThreshold: newThreshold,
          displayStatus: newStatus,
        },
        select: inventoryVariantFullSelect,
      });

      return {
        type: 'response',
        message: 'Cập nhật kho hàng biến thể thành công',
        data: updated as unknown as InventoryVariantResponseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Adjust inventory for a specific variant (relative delta).
   */
  async adjustVariantInventory(
    productId: string,
    variantId: string,
    dto: AdjustInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryVariantResponseDto>> {
    try {
      const variant = await this.prismaService.productVariant.findFirst({
        where: withoutDeleted({ id: variantId, productId }),
        select: { id: true },
      });

      if (!variant) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_VARIANT_MISMATCH],
          ERROR_CODES.INVENTORY_VARIANT_MISMATCH,
        );
      }

      const inventory = await this.prismaService.productInventory.findFirst({
        where: { variantId },
        select: { id: true, quantity: true, lowStockThreshold: true },
      });

      if (!inventory) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_NOT_FOUND],
          ERROR_CODES.INVENTORY_NOT_FOUND,
        );
      }

      const newQuantity = inventory.quantity + dto.delta;
      if (newQuantity < 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_INVALID_ADJUSTMENT],
          ERROR_CODES.INVENTORY_INVALID_ADJUSTMENT,
        );
      }

      const newStatus = this.resolveDisplayStatus(
        newQuantity,
        inventory.lowStockThreshold,
      );

      const updated = await this.prismaService.productInventory.update({
        where: { id: inventory.id },
        data: { quantity: newQuantity, displayStatus: newStatus },
        select: inventoryVariantFullSelect,
      });

      return {
        type: 'response',
        message: 'Điều chỉnh kho hàng biến thể thành công',
        data: updated as unknown as InventoryVariantResponseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ─── Dashboard / Overview ─────────────────────────────────────────────────

  /**
   * Get inventory overview for the admin dashboard.
   */
  async getInventoryOverview(): Promise<
    IBeforeTransformResponseType<InventoryOverviewResponseDto>
  > {
    try {
      const [totalProducts, totalVariants, statusGroups, totalQuantityResult] =
        await Promise.all([
          this.prismaService.product.count({ where: withoutDeleted() }),
          this.prismaService.productVariant.count({ where: withoutDeleted() }),
          this.prismaService.productInventory.groupBy({
            by: ['displayStatus'],
            _count: { id: true },
            where: {
              product: { isDeleted: false },
              variant: { isDeleted: false },
            },
          }),
          this.prismaService.productInventory.aggregate({
            _sum: { quantity: true },
            where: {
              product: { isDeleted: false },
              variant: { isDeleted: false },
            },
          }),
        ]);

      // Build status map
      const statusMap = Object.fromEntries(
        statusGroups.map((g) => [g.displayStatus, g._count.id]),
      );

      // Count low-stock properly: quantity > 0 AND quantity <= lowStockThreshold
      // Use raw count since Prisma can't compare two columns natively
      const lowStockCount = await this.prismaService.$queryRaw<
        { count: bigint }[]
      >`
        SELECT COUNT(*)::int as count
        FROM product_inventory pi
        INNER JOIN products p ON pi.product_id = p.id
        INNER JOIN product_variants pv ON pi.variant_id = pv.id
        WHERE pi.quantity > 0 
          AND pi.quantity <= pi.low_stock_threshold
          AND p.is_deleted = false
          AND pv.is_deleted = false
      `;

      const overview: InventoryOverviewResponseDto = {
        totalProducts,
        totalVariants,
        inStockCount: statusMap[ProductInventoryDisplayStatus.IN_STOCK] ?? 0,
        lowStockCount: Number(lowStockCount[0]?.count ?? 0),
        outOfStockCount:
          statusMap[ProductInventoryDisplayStatus.OUT_OF_STOCK] ?? 0,
        totalQuantity: Number(totalQuantityResult._sum.quantity ?? 0),
      };

      return {
        type: 'response',
        message: 'Lấy tổng quan kho hàng thành công',
        data: overview,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get all default variant inventory records with pagination, search and filter.
   * After migration, this returns inventory for products' default variants.
   */
  async getAllProducts(
    query: InventoryListQueryDto,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryProductResponseDto>
  > {
    try {
      const { page = 1, limit = 20, search, status } = query;
      const skip = (page - 1) * limit;

      // Build dynamic where clause for default variants
      const where = {
        variant: {
          isDeleted: false,
          OR: [{ sku: { endsWith: '-DEFAULT' } }, { sortOrder: 0 }],
        },
        product: {
          isDeleted: false,
        },
        ...(status && { displayStatus: status }),
        ...(search && {
          product: {
            isDeleted: false,
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { sku: { contains: search, mode: 'insensitive' as const } },
            ],
          },
        }),
      };

      const [total, items] = await Promise.all([
        this.prismaService.productInventory.count({ where }),
        this.prismaService.productInventory.findMany({
          where,
          select: inventoryFullSelect,
          skip,
          take: limit,
          orderBy: { updatedAt: 'desc' },
        }),
      ]);

      const mappedItems = toResponseDtoArray(
        InventoryProductResponseDto,
        items,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách kho hàng sản phẩm thành công',
        data: {
          items: mappedItems,
          totalCount: total,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get all variant-level inventory records (variantId IS NOT NULL) with pagination, search and filter.
   */
  async getAllVariants(
    query: InventoryListQueryDto,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryVariantResponseDto>
  > {
    try {
      const { page = 1, limit = 20, search, status } = query;
      const skip = (page - 1) * limit;

      // Build dynamic where clause
      const where = {
        variantId: { not: null as string | null },
        product: { isDeleted: false },
        variant: { isDeleted: false },
        ...(status && { displayStatus: status }),
        ...(search && {
          OR: [
            {
              product: {
                isDeleted: false,
                OR: [
                  { name: { contains: search, mode: 'insensitive' as const } },
                  { sku: { contains: search, mode: 'insensitive' as const } },
                ],
              },
            },
            {
              variant: {
                isDeleted: false,
                OR: [
                  { name: { contains: search, mode: 'insensitive' as const } },
                  { sku: { contains: search, mode: 'insensitive' as const } },
                ],
              },
            },
          ],
        }),
      };

      const [total, items] = await Promise.all([
        this.prismaService.productInventory.count({ where }),
        this.prismaService.productInventory.findMany({
          where,
          select: inventoryVariantFullSelect,
          skip,
          take: limit,
          orderBy: { updatedAt: 'desc' },
        }),
      ]);

      const mappedItems = toResponseDtoArray(
        InventoryVariantResponseDto,
        items,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách kho hàng biến thể thành công',
        data: {
          items: mappedItems,
          totalCount: total,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get low-stock inventory for default variants.
   * Raw SQL is used only to filter by column-to-column comparison (quantity <= low_stock_threshold),
   * then Prisma fetches full relations via inventoryFullSelect.
   */
  async getLowStockProducts(
    page = 1,
    limit = 20,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryProductResponseDto>
  > {
    try {
      const skip = (page - 1) * limit;

      // Step 1: Get matching IDs and total count via raw SQL (column-to-column comparison)
      // Query default variants (SKU ends with -DEFAULT or sortOrder = 0)
      const [idRows, totalCount] = await Promise.all([
        this.prismaService.$queryRaw<{ id: string }[]>`
          SELECT pi.id
          FROM product_inventory pi
          INNER JOIN product_variants pv ON pi.variant_id = pv.id
          INNER JOIN products p ON pi.product_id = p.id
          WHERE (pv.sku LIKE '%-DEFAULT' OR pv.sort_order = 0)
            AND pi.quantity > 0
            AND pi.quantity <= pi.low_stock_threshold
            AND p.is_deleted = false
            AND pv.is_deleted = false
          ORDER BY pi.quantity ASC
          LIMIT ${limit} OFFSET ${skip}
        `,
        this.prismaService.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::int as count
          FROM product_inventory pi
          INNER JOIN product_variants pv ON pi.variant_id = pv.id
          INNER JOIN products p ON pi.product_id = p.id
          WHERE (pv.sku LIKE '%-DEFAULT' OR pv.sort_order = 0)
            AND pi.quantity > 0
            AND pi.quantity <= pi.low_stock_threshold
            AND p.is_deleted = false
            AND pv.is_deleted = false
        `,
      ]);

      // Step 2: Fetch full data with relations using Prisma
      const ids = idRows.map((r) => r.id);
      const items = await this.prismaService.productInventory.findMany({
        where: { id: { in: ids } },
        select: inventoryFullSelect,
        orderBy: { quantity: 'asc' },
      });

      const mappedItems = toResponseDtoArray(
        InventoryProductResponseDto,
        items,
      );
      const total = Number(totalCount[0]?.count ?? 0);

      return {
        type: 'pagination',
        message: 'Lấy danh sách sản phẩm sắp hết hàng thành công',
        data: {
          items: mappedItems,
          totalCount: total,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get low-stock inventory for variant-level records (variantId IS NOT NULL).
   * Raw SQL is used only to filter by column-to-column comparison (quantity <= low_stock_threshold),
   * then Prisma fetches full relations via inventoryVariantFullSelect.
   */
  async getLowStockVariants(
    page = 1,
    limit = 20,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryVariantResponseDto>
  > {
    try {
      const skip = (page - 1) * limit;

      // Step 1: Get matching IDs and total count via raw SQL (column-to-column comparison)
      const [idRows, totalCount] = await Promise.all([
        this.prismaService.$queryRaw<{ id: string }[]>`
          SELECT pi.id
          FROM product_inventory pi
          INNER JOIN products p ON pi.product_id = p.id
          INNER JOIN product_variants pv ON pi.variant_id = pv.id
          WHERE pi.variant_id IS NOT NULL
            AND pi.quantity > 0
            AND pi.quantity <= pi.low_stock_threshold
            AND p.is_deleted = false
            AND pv.is_deleted = false
          ORDER BY pi.quantity ASC
          LIMIT ${limit} OFFSET ${skip}
        `,
        this.prismaService.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::int as count
          FROM product_inventory pi
          INNER JOIN products p ON pi.product_id = p.id
          INNER JOIN product_variants pv ON pi.variant_id = pv.id
          WHERE pi.variant_id IS NOT NULL
            AND pi.quantity > 0
            AND pi.quantity <= pi.low_stock_threshold
            AND p.is_deleted = false
            AND pv.is_deleted = false
        `,
      ]);

      // Step 2: Fetch full data with relations using Prisma
      const ids = idRows.map((r) => r.id);
      const items = await this.prismaService.productInventory.findMany({
        where: { id: { in: ids } },
        select: inventoryVariantFullSelect,
        orderBy: { quantity: 'asc' },
      });

      const mappedItems = toResponseDtoArray(
        InventoryVariantResponseDto,
        items,
      );
      const total = Number(totalCount[0]?.count ?? 0);

      return {
        type: 'pagination',
        message: 'Lấy danh sách biến thể sắp hết hàng thành công',
        data: {
          items: mappedItems,
          totalCount: total,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get out-of-stock inventory for default variants.
   */
  async getOutOfStockProducts(
    page = 1,
    limit = 20,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryProductResponseDto>
  > {
    try {
      const skip = (page - 1) * limit;

      // Query default variants that are out of stock
      const where = {
        displayStatus: ProductInventoryDisplayStatus.OUT_OF_STOCK,
        product: { isDeleted: false },
        variant: {
          isDeleted: false,
          OR: [{ sku: { endsWith: '-DEFAULT' } }, { sortOrder: 0 }],
        },
      };

      const [total, items] = await Promise.all([
        this.prismaService.productInventory.count({ where }),
        this.prismaService.productInventory.findMany({
          where,
          select: inventoryFullSelect,
          skip,
          take: limit,
          orderBy: { updatedAt: 'desc' },
        }),
      ]);

      const mappedItems = toResponseDtoArray(
        InventoryProductResponseDto,
        items,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách sản phẩm hết hàng thành công',
        data: {
          items: mappedItems,
          totalCount: total,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Get out-of-stock inventory for variant-level records (variantId IS NOT NULL).
   */
  async getOutOfStockVariants(
    page = 1,
    limit = 20,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryVariantResponseDto>
  > {
    try {
      const skip = (page - 1) * limit;

      const [total, items] = await Promise.all([
        this.prismaService.productInventory.count({
          where: {
            displayStatus: ProductInventoryDisplayStatus.OUT_OF_STOCK,
            variantId: { not: null },
            product: { isDeleted: false },
            variant: { isDeleted: false },
          },
        }),
        this.prismaService.productInventory.findMany({
          where: {
            displayStatus: ProductInventoryDisplayStatus.OUT_OF_STOCK,
            variantId: { not: null },
            product: { isDeleted: false },
            variant: { isDeleted: false },
          },
          select: inventoryVariantFullSelect,
          skip,
          take: limit,
          orderBy: { updatedAt: 'desc' },
        }),
      ]);

      const mappedItems = toResponseDtoArray(
        InventoryVariantResponseDto,
        items,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách biến thể hết hàng thành công',
        data: {
          items: mappedItems,
          totalCount: total,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ─── Bulk Adjust ──────────────────────────────────────────────────────────

  /**
   * Atomically adjust multiple inventory records in a single transaction.
   */
  async bulkAdjustInventory(
    dto: BulkAdjustInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto[]>> {
    try {
      const result = await this.prismaService.$transaction(async (tx) => {
        const updatedItems: InventoryResponseDto[] = [];

        for (const item of dto.items) {
          const inventory = await tx.productInventory.findUnique({
            where: { id: item.inventoryId },
            select: { id: true, quantity: true, lowStockThreshold: true },
          });

          if (!inventory) {
            throw new BusinessException(
              `${ERROR_MESSAGES[ERROR_CODES.INVENTORY_NOT_FOUND]}: ${item.inventoryId}`,
              ERROR_CODES.INVENTORY_NOT_FOUND,
            );
          }

          const newQuantity = inventory.quantity + item.delta;
          if (newQuantity < 0) {
            throw new BusinessException(
              `${ERROR_MESSAGES[ERROR_CODES.INVENTORY_INVALID_ADJUSTMENT]} (inventoryId: ${item.inventoryId})`,
              ERROR_CODES.INVENTORY_INVALID_ADJUSTMENT,
            );
          }

          const newStatus = this.resolveDisplayStatus(
            newQuantity,
            inventory.lowStockThreshold,
          );

          const updated = await tx.productInventory.update({
            where: { id: item.inventoryId },
            data: { quantity: newQuantity, displayStatus: newStatus },
            select: inventoryFullSelect,
          });

          updatedItems.push(updated as unknown as InventoryResponseDto);
        }

        return updatedItems;
      });

      return {
        type: 'response',
        message: `Điều chỉnh hàng loạt thành công (${result.length} items)`,
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) throw error;
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
