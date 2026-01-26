import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

/**
 * Service for managing product statistics
 * Handles syncing and updating pre-calculated product metrics
 */
@Injectable()
export class ProductStatsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Update stats for a single product
   * Call this when order status changes or review is added/updated
   */
  async updateProductStats(productId: string): Promise<void> {
    const [salesData, reviewData] = await this.prismaService.$transaction([
      // Get sales data from completed orders
      this.prismaService.orderItem.aggregate({
        where: {
          productId,
          order: {
            status: { in: ['DELIVERED', 'CONFIRMED', 'SHIPPED', 'PROCESSING'] },
          },
        },
        _sum: {
          quantity: true,
          total: true,
        },
        _max: {
          createdAt: true,
        },
      }),
      // Get review data
      this.prismaService.productReview.aggregate({
        where: {
          productId,
          isApproved: true,
        },
        _avg: {
          rating: true,
        },
        _count: {
          id: true,
        },
      }),
    ]);

    const statsData = {
      totalSold: salesData._sum.quantity || 0,
      totalRevenue: salesData._sum.total || new Prisma.Decimal(0),
      avgRating: reviewData._avg.rating
        ? new Prisma.Decimal(reviewData._avg.rating)
        : null,
      reviewCount: reviewData._count.id || 0,
      lastSoldAt: salesData._max.createdAt || null,
    };

    // Upsert stats record
    await this.prismaService.productStats.upsert({
      where: { productId },
      create: {
        productId,
        ...statsData,
      },
      update: statsData,
    });
  }

  /**
   * Update stats for multiple products
   * Useful for batch operations
   */
  async updateMultipleProductStats(productIds: string[]): Promise<void> {
    await Promise.all(productIds.map((id) => this.updateProductStats(id)));
  }

  /**
   * Sync stats for ALL products
   * Use this for initial migration or scheduled jobs
   */
  async syncAllProductStats(): Promise<{ synced: number }> {
    const products = await this.prismaService.product.findMany({
      where: { isActive: true },
      select: { id: true },
    });

    let synced = 0;
    const batchSize = 50;

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      await Promise.all(batch.map((p) => this.updateProductStats(p.id)));
      synced += batch.length;
      console.log(`Synced ${synced}/${products.length} product stats`);
    }

    return { synced };
  }

  /**
   * Increment view count for a product
   * Call this when product detail page is viewed
   */
  async incrementViewCount(productId: string): Promise<void> {
    await this.prismaService.productStats.upsert({
      where: { productId },
      create: {
        productId,
        viewCount: 1,
      },
      update: {
        viewCount: { increment: 1 },
      },
    });
  }

  /**
   * Get stats for a single product
   */
  async getProductStats(productId: string) {
    return this.prismaService.productStats.findUnique({
      where: { productId },
    });
  }

  /**
   * Get stats for multiple products
   */
  async getMultipleProductStats(productIds: string[]) {
    return this.prismaService.productStats.findMany({
      where: { productId: { in: productIds } },
    });
  }

  /**
   * Recalculate stats when an order status changes
   * Should be called by Order service when status is updated
   */
  async onOrderStatusChange(orderId: string): Promise<void> {
    const orderItems = await this.prismaService.orderItem.findMany({
      where: { orderId },
      select: { productId: true },
    });

    const productIds = [...new Set(orderItems.map((item) => item.productId))];
    await this.updateMultipleProductStats(productIds);
  }

  /**
   * Recalculate stats when a review is added or updated
   * Should be called by Review service
   */
  async onReviewChange(productId: string): Promise<void> {
    await this.updateProductStats(productId);
  }
}
