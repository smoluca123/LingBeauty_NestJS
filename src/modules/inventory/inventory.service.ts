import { Injectable } from '@nestjs/common';
import { ProductInventoryDisplayStatus } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
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
  productInventorySelect,
  productSummarySelect,
  variantSummarySelect,
} from 'src/libs/prisma/product-select';
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
   * Get inventory for a simple product (no variants).
   * Throws INVENTORY_PRODUCT_HAS_VARIANTS if the product has variants.
   */
  async getProductInventory(
    productId: string,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    try {
      const variantCount = await this.prismaService.productVariant.count({
        where: { productId },
      });

      if (variantCount > 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.INVENTORY_PRODUCT_HAS_VARIANTS],
          ERROR_CODES.INVENTORY_PRODUCT_HAS_VARIANTS,
        );
      }

      const inventory = await this.prismaService.productInventory.findFirst({
        where: { productId, variantId: null },
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
   * Update inventory for a simple product (absolute quantity set).
   */
  async updateProductInventory(
    productId: string,
    dto: UpdateInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    try {
      const inventory = await this.prismaService.productInventory.findFirst({
        where: { productId, variantId: null },
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
   * Adjust inventory for a simple product (relative delta).
   */
  async adjustProductInventory(
    productId: string,
    dto: AdjustInventoryDto,
  ): Promise<IBeforeTransformResponseType<InventoryResponseDto>> {
    try {
      const inventory = await this.prismaService.productInventory.findFirst({
        where: { productId, variantId: null },
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
        where: { id: variantId, productId },
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
        where: { id: variantId, productId },
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
        where: { id: variantId, productId },
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
          this.prismaService.product.count(),
          this.prismaService.productVariant.count(),
          this.prismaService.productInventory.groupBy({
            by: ['displayStatus'],
            _count: { id: true },
          }),
          this.prismaService.productInventory.aggregate({
            _sum: { quantity: true },
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
        FROM product_inventory
        WHERE quantity > 0 AND quantity <= low_stock_threshold
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
   * Get low-stock inventory for simple products (no variant, variantId IS NULL).
   */
  async getLowStockProducts(
    page = 1,
    limit = 20,
  ): Promise<IBeforeTransformPaginationResponseType<InventoryResponseDto>> {
    try {
      const skip = (page - 1) * limit;

      // Prisma can't compare two columns — use raw SQL for the WHERE clause
      const [items, totalCount] = await Promise.all([
        this.prismaService.$queryRaw<any[]>`
          SELECT
            pi.id, pi.product_id as "productId", pi.variant_id as "variantId",
            pi.quantity, pi.display_status as "displayStatus",
            pi.low_stock_threshold as "lowStockThreshold",
            pi.created_at as "createdAt", pi.updated_at as "updatedAt"
          FROM product_inventory pi
          WHERE pi.variant_id IS NULL
            AND pi.quantity > 0
            AND pi.quantity <= pi.low_stock_threshold
          ORDER BY pi.quantity ASC
          LIMIT ${limit} OFFSET ${skip}
        `,
        this.prismaService.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::int as count
          FROM product_inventory
          WHERE variant_id IS NULL
            AND quantity > 0
            AND quantity <= low_stock_threshold
        `,
      ]);

      const mappedItems = toResponseDtoArray(InventoryResponseDto, items);
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
   */
  async getLowStockVariants(
    page = 1,
    limit = 20,
  ): Promise<IBeforeTransformPaginationResponseType<InventoryResponseDto>> {
    try {
      const skip = (page - 1) * limit;

      const [items, totalCount] = await Promise.all([
        this.prismaService.$queryRaw<any[]>`
          SELECT
            pi.id, pi.product_id as "productId", pi.variant_id as "variantId",
            pi.quantity, pi.display_status as "displayStatus",
            pi.low_stock_threshold as "lowStockThreshold",
            pi.created_at as "createdAt", pi.updated_at as "updatedAt"
          FROM product_inventory pi
          WHERE pi.variant_id IS NOT NULL
            AND pi.quantity > 0
            AND pi.quantity <= pi.low_stock_threshold
          ORDER BY pi.quantity ASC
          LIMIT ${limit} OFFSET ${skip}
        `,
        this.prismaService.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*)::int as count
          FROM product_inventory
          WHERE variant_id IS NOT NULL
            AND quantity > 0
            AND quantity <= low_stock_threshold
        `,
      ]);

      const mappedItems = toResponseDtoArray(InventoryResponseDto, items);
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
   * Get out-of-stock inventory for simple products (variantId IS NULL).
   */
  async getOutOfStockProducts(
    page = 1,
    limit = 20,
  ): Promise<
    IBeforeTransformPaginationResponseType<InventoryProductResponseDto>
  > {
    try {
      const skip = (page - 1) * limit;

      const [total, items] = await Promise.all([
        this.prismaService.productInventory.count({
          where: {
            displayStatus: ProductInventoryDisplayStatus.OUT_OF_STOCK,
            variantId: null,
          },
        }),
        this.prismaService.productInventory.findMany({
          where: {
            displayStatus: ProductInventoryDisplayStatus.OUT_OF_STOCK,
            variantId: null,
          },
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
          },
        }),
        this.prismaService.productInventory.findMany({
          where: {
            displayStatus: ProductInventoryDisplayStatus.OUT_OF_STOCK,
            variantId: { not: null },
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

  // ─── Private Mappers ──────────────────────────────────────────────────────

  /** Map raw SQL row to InventoryResponseDto shape */
  // private mapRawToInventoryDto(row: any): InventoryResponseDto {
  //   return {
  //     id: row.id,
  //     productId: row.productId,
  //     variantId: row.variantId ?? null,
  //     quantity: row.quantity,
  //     displayStatus: row.displayStatus,
  //     lowStockThreshold: row.lowStockThreshold,
  //     createdAt: row.createdAt,
  //     updatedAt: row.updatedAt,
  //     product: row.p_id
  //       ? { id: row.p_id, name: row.p_name, sku: row.p_sku }
  //       : undefined,
  //     variant: row.v_id
  //       ? { id: row.v_id, name: row.v_name, sku: row.v_sku }
  //       : null,
  //   };
  // }
}
