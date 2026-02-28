import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  AggregatedStatsDto,
  DailyStatsDto,
  OrderStatusBreakdownDto,
  OverviewStatsDto,
  RevenueChartDto,
  StatsPeriod,
  TopProductDto,
} from './dto/stats-response.dto';

// ── Date helpers ───────────────────────────────────────────────────────────────

/** Normalize a Date to midnight UTC — used as the unique key for each daily row. */
function toMidnightUTC(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/** Today at midnight UTC. */
function today(): Date {
  return toMidnightUTC(new Date());
}

/** ISO week number (ISO 8601) and year for a given date. */
function getISOWeek(date: Date): { year: number; week: number } {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  // Thursday in current week decides the year
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  const jan4 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week =
    1 +
    Math.round(
      ((d.getTime() - jan4.getTime()) / 86400000 -
        3 +
        ((jan4.getUTCDay() + 6) % 7)) /
        7,
    );
  return { year: d.getUTCFullYear(), week };
}

/** Build the period label string for each grouping mode. */
function buildPeriodLabel(date: Date, period: StatsPeriod): string {
  const d = new Date(date);
  switch (period) {
    case StatsPeriod.WEEK: {
      const { year, week } = getISOWeek(d);
      return `${year}-W${String(week).padStart(2, '0')}`;
    }
    case StatsPeriod.MONTH:
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    case StatsPeriod.YEAR:
      return `${d.getUTCFullYear()}`;
    default:
      return d.toISOString().split('T')[0];
  }
}

// ── Service ────────────────────────────────────────────────────────────────────

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ── Real-time overview ───────────────────────────────────────────────────────

  /**
   * Get real-time overview stats by running live aggregate queries.
   * Used for dashboard summary cards.
   */
  async getOverviewStats(): Promise<OverviewStatsDto> {
    const now = new Date();
    const startOfToday = toMidnightUTC(now);
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );

    const [
      totalUsers,
      newUsersToday,
      newUsersThisMonth,
      totalOrders,
      pendingOrders,
      totalRevenue,
      revenueToday,
      revenueThisMonth,
      totalProducts,
      totalReviews,
    ] = await this.prismaService.$transaction([
      this.prismaService.user.count({ where: { isDeleted: false } }),
      this.prismaService.user.count({
        where: { createdAt: { gte: startOfToday } },
      }),
      this.prismaService.user.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      this.prismaService.order.count(),
      this.prismaService.order.count({ where: { status: 'PENDING' } }),
      this.prismaService.order.aggregate({
        where: { status: { in: ['DELIVERED', 'CONFIRMED'] } },
        _sum: { total: true },
      }),
      this.prismaService.order.aggregate({
        where: {
          status: { in: ['DELIVERED', 'CONFIRMED'] },
          createdAt: { gte: startOfToday },
        },
        _sum: { total: true },
      }),
      this.prismaService.order.aggregate({
        where: {
          status: { in: ['DELIVERED', 'CONFIRMED'] },
          createdAt: { gte: startOfMonth },
        },
        _sum: { total: true },
      }),
      this.prismaService.product.count({ where: { isActive: true } }),
      this.prismaService.productReview.count(),
    ]);

    return {
      totalUsers,
      newUsersToday,
      newUsersThisMonth,
      totalOrders,
      pendingOrders,
      totalRevenue: (
        totalRevenue._sum.total ?? new Prisma.Decimal(0)
      ).toString(),
      revenueToday: (
        revenueToday._sum.total ?? new Prisma.Decimal(0)
      ).toString(),
      revenueThisMonth: (
        revenueThisMonth._sum.total ?? new Prisma.Decimal(0)
      ).toString(),
      totalProducts,
      totalReviews,
    };
  }

  // ── Daily snapshots ──────────────────────────────────────────────────────────

  /**
   * Get stored daily snapshots within a date range (default: last 30 days).
   */
  async getDailyStats(
    startDate?: string,
    endDate?: string,
  ): Promise<DailyStatsDto[]> {
    const end = endDate ? toMidnightUTC(new Date(endDate)) : today();
    const start = startDate
      ? toMidnightUTC(new Date(startDate))
      : new Date(end.getTime() - 29 * 24 * 60 * 60 * 1000);

    const rows = await this.prismaService.dailyStats.findMany({
      where: { date: { gte: start, lte: end } },
      orderBy: { date: 'asc' },
    });

    return rows.map((row) => ({
      date: row.date.toISOString().split('T')[0],
      newUsers: row.newUsers,
      totalUsers: row.totalUsers,
      totalOrders: row.totalOrders,
      confirmedOrders: row.confirmedOrders,
      cancelledOrders: row.cancelledOrders,
      deliveredOrders: row.deliveredOrders,
      revenue: row.revenue.toString(),
      totalProducts: row.totalProducts,
      newProducts: row.newProducts,
      totalItemsSold: row.totalItemsSold,
      newReviews: row.newReviews,
      approvedReviews: row.approvedReviews,
    }));
  }

  // ── Aggregated period stats ──────────────────────────────────────────────────

  /**
   * Aggregate DailyStats rows by week, month, or year.
   *
   * Default ranges:
   *  - week  → last 12 weeks
   *  - month → last 12 months
   *  - year  → last 5 years
   *
   * No extra tables required — sums daily rows on the fly.
   */
  async getAggregatedStats(
    period: StatsPeriod,
    startDate?: string,
    endDate?: string,
  ): Promise<AggregatedStatsDto[]> {
    const end = endDate ? toMidnightUTC(new Date(endDate)) : today();
    const start = startDate
      ? toMidnightUTC(new Date(startDate))
      : this.getDefaultStartDate(period, end);

    const rows = await this.prismaService.dailyStats.findMany({
      where: { date: { gte: start, lte: end } },
      orderBy: { date: 'asc' },
    });

    // Group rows by period label in application layer
    const groupMap = new Map<
      string,
      { rows: typeof rows; start: Date; end: Date }
    >();

    for (const row of rows) {
      const label = buildPeriodLabel(row.date, period);
      const existing = groupMap.get(label);
      if (existing) {
        existing.rows.push(row);
        if (row.date < existing.start) existing.start = row.date;
        if (row.date > existing.end) existing.end = row.date;
      } else {
        groupMap.set(label, { rows: [row], start: row.date, end: row.date });
      }
    }

    // Reduce each group into a single AggregatedStatsDto
    return Array.from(groupMap.entries()).map(([label, group]) => {
      const sumRevenue = group.rows.reduce(
        (acc, r) => acc.plus(r.revenue),
        new Prisma.Decimal(0),
      );

      return {
        periodLabel: label,
        startDate: group.start.toISOString().split('T')[0],
        endDate: group.end.toISOString().split('T')[0],
        newUsers: group.rows.reduce((s, r) => s + r.newUsers, 0),
        totalOrders: group.rows.reduce((s, r) => s + r.totalOrders, 0),
        confirmedOrders: group.rows.reduce((s, r) => s + r.confirmedOrders, 0),
        cancelledOrders: group.rows.reduce((s, r) => s + r.cancelledOrders, 0),
        deliveredOrders: group.rows.reduce((s, r) => s + r.deliveredOrders, 0),
        revenue: sumRevenue.toString(),
        newProducts: group.rows.reduce((s, r) => s + r.newProducts, 0),
        totalItemsSold: group.rows.reduce((s, r) => s + r.totalItemsSold, 0),
        newReviews: group.rows.reduce((s, r) => s + r.newReviews, 0),
        approvedReviews: group.rows.reduce((s, r) => s + r.approvedReviews, 0),
      };
    });
  }

  // ── Revenue chart ────────────────────────────────────────────────────────────

  /**
   * Revenue chart data grouped by the specified period.
   * Reads directly from Orders table for accuracy.
   * Supports day / week / month / year granularity.
   */
  async getRevenueChart(
    period: StatsPeriod = StatsPeriod.DAY,
    startDate?: string,
    endDate?: string,
  ): Promise<RevenueChartDto> {
    const end = endDate
      ? new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 24 * 60 * 60 * 1000);
    const start = startDate
      ? new Date(startDate)
      : this.getDefaultStartDate(period, new Date());

    const orders = await this.prismaService.order.findMany({
      where: {
        status: { in: ['DELIVERED', 'CONFIRMED'] },
        createdAt: { gte: start, lte: end },
      },
      select: { total: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    // Group into period buckets
    const groupMap = new Map<
      string,
      { revenue: Prisma.Decimal; orders: number }
    >();
    for (const order of orders) {
      const label = buildPeriodLabel(order.createdAt, period);
      const existing = groupMap.get(label);
      if (existing) {
        existing.revenue = existing.revenue.plus(order.total);
        existing.orders += 1;
      } else {
        groupMap.set(label, {
          revenue: new Prisma.Decimal(order.total),
          orders: 1,
        });
      }
    }

    const items = Array.from(groupMap.entries()).map(([label, data]) => ({
      label,
      revenue: data.revenue.toString(),
      orders: data.orders,
    }));

    const totalRevenue = items
      .reduce(
        (sum, item) => sum.plus(new Prisma.Decimal(item.revenue)),
        new Prisma.Decimal(0),
      )
      .toString();

    const totalOrders = items.reduce((s, i) => s + i.orders, 0);

    return { items, totalRevenue, totalOrders };
  }

  // ── Order status breakdown ───────────────────────────────────────────────────

  /** Live count of orders grouped by status. */
  async getOrderStatusBreakdown(): Promise<OrderStatusBreakdownDto> {
    const statuses = [
      'PENDING',
      'CONFIRMED',
      'PROCESSING',
      'SHIPPED',
      'DELIVERED',
      'CANCELLED',
      'REFUNDED',
    ] as const;

    const counts = await this.prismaService.$transaction(
      statuses.map((status) =>
        this.prismaService.order.count({ where: { status } }),
      ),
    );

    const [
      pending,
      confirmed,
      processing,
      shipped,
      delivered,
      cancelled,
      refunded,
    ] = counts;

    return {
      pending,
      confirmed,
      processing,
      shipped,
      delivered,
      cancelled,
      refunded,
    };
  }

  // ── Top products ─────────────────────────────────────────────────────────────

  /** Top N products by total sales using pre-calculated ProductStats. */
  async getTopProducts(limit = 10): Promise<TopProductDto[]> {
    const rows = await this.prismaService.productStats.findMany({
      take: limit,
      orderBy: { totalSold: 'desc' },
      include: {
        product: { select: { id: true, name: true, slug: true } },
      },
    });

    return rows.map((row) => ({
      id: row.product.id,
      name: row.product.name,
      slug: row.product.slug,
      totalSold: row.totalSold,
      revenue: row.totalRevenue.toString(),
      avgRating: row.avgRating?.toString() ?? null,
      reviewCount: row.reviewCount,
    }));
  }

  // ── Snapshot management ──────────────────────────────────────────────────────

  /**
   * Upsert today's DailyStats snapshot.
   * Run after significant domain events or by a daily cron job.
   */
  async syncTodaySnapshot(): Promise<void> {
    const date = today();
    const startOfToday = date;
    const endOfToday = new Date(date.getTime() + 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      newUsers,
      totalOrders,
      confirmedOrders,
      cancelledOrders,
      deliveredOrders,
      revenueAgg,
      totalProducts,
      newProducts,
      itemsSoldAgg,
      newReviews,
      approvedReviews,
    ] = await this.prismaService.$transaction([
      this.prismaService.user.count({ where: { isDeleted: false } }),
      this.prismaService.user.count({
        where: { createdAt: { gte: startOfToday, lt: endOfToday } },
      }),
      this.prismaService.order.count({
        where: { createdAt: { gte: startOfToday, lt: endOfToday } },
      }),
      this.prismaService.order.count({
        where: {
          status: 'CONFIRMED',
          createdAt: { gte: startOfToday, lt: endOfToday },
        },
      }),
      this.prismaService.order.count({
        where: {
          status: 'CANCELLED',
          createdAt: { gte: startOfToday, lt: endOfToday },
        },
      }),
      this.prismaService.order.count({
        where: {
          status: 'DELIVERED',
          createdAt: { gte: startOfToday, lt: endOfToday },
        },
      }),
      this.prismaService.order.aggregate({
        where: {
          status: { in: ['DELIVERED', 'CONFIRMED'] },
          createdAt: { gte: startOfToday, lt: endOfToday },
        },
        _sum: { total: true },
      }),
      this.prismaService.product.count({ where: { isActive: true } }),
      this.prismaService.product.count({
        where: { createdAt: { gte: startOfToday, lt: endOfToday } },
      }),
      this.prismaService.orderItem.aggregate({
        where: {
          order: {
            status: { in: ['DELIVERED', 'CONFIRMED'] },
            createdAt: { gte: startOfToday, lt: endOfToday },
          },
        },
        _sum: { quantity: true },
      }),
      this.prismaService.productReview.count({
        where: { createdAt: { gte: startOfToday, lt: endOfToday } },
      }),
      this.prismaService.productReview.count({
        where: {
          isApproved: true,
          updatedAt: { gte: startOfToday, lt: endOfToday },
        },
      }),
    ]);

    const snapshotData = {
      newUsers,
      totalUsers,
      totalOrders,
      confirmedOrders,
      cancelledOrders,
      deliveredOrders,
      revenue: revenueAgg._sum.total ?? new Prisma.Decimal(0),
      totalProducts,
      newProducts,
      totalItemsSold: itemsSoldAgg._sum.quantity ?? 0,
      newReviews,
      approvedReviews,
    };

    await this.prismaService.dailyStats.upsert({
      where: { date },
      create: { date, ...snapshotData },
      update: snapshotData,
    });

    this.logger.log(
      `Daily stats synced for ${date.toISOString().split('T')[0]}`,
    );
  }

  // ── Incremental event helpers ─────────────────────────────────────────────────

  /** Call after a new user registers (auth register or admin create). */
  async onUserCreated(): Promise<void> {
    await this.upsertTodayField({
      newUsers: { increment: 1 },
      totalUsers: { increment: 1 },
    });
  }

  /** Call after an order is placed. */
  async onOrderPlaced(): Promise<void> {
    await this.upsertTodayField({ totalOrders: { increment: 1 } });
  }

  /**
   * Call after an order status changes.
   * Updates the relevant status counter and revenue if applicable.
   */
  async onOrderStatusChanged(
    orderId: string,
    newStatus: string,
  ): Promise<void> {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId },
      select: { total: true },
    });
    if (!order) return;

    const statusCountField = this.getStatusCountField(newStatus);
    const revenueField =
      newStatus === 'DELIVERED' || newStatus === 'CONFIRMED'
        ? { revenue: { increment: order.total } }
        : {};

    await this.upsertTodayField({
      ...(statusCountField ? { [statusCountField]: { increment: 1 } } : {}),
      ...revenueField,
    });
  }

  /** Call after a product is created. */
  async onProductCreated(): Promise<void> {
    await this.upsertTodayField({
      newProducts: { increment: 1 },
      totalProducts: { increment: 1 },
    });
  }

  /** Call after a review is created. */
  async onReviewCreated(): Promise<void> {
    await this.upsertTodayField({ newReviews: { increment: 1 } });
  }

  /** Call after admin approves a review. */
  async onReviewApproved(): Promise<void> {
    await this.upsertTodayField({ approvedReviews: { increment: 1 } });
  }

  // ── Private helpers ───────────────────────────────────────────────────────────

  /**
   * Upsert today's DailyStats row with the given partial update.
   * Creates the row with all-zero defaults if not yet present.
   */
  private async upsertTodayField(
    updateData: Prisma.DailyStatsUpdateInput,
  ): Promise<void> {
    const date = today();
    try {
      await this.prismaService.dailyStats.upsert({
        where: { date },
        create: { date },
        update: updateData,
      });
    } catch (err) {
      // Non-critical: log but don't fail the main request
      this.logger.error('Failed to update daily stats', err);
    }
  }

  /** Map an order status string to its DailyStats count field name. */
  private getStatusCountField(status: string): string | null {
    const map: Record<string, string> = {
      CONFIRMED: 'confirmedOrders',
      CANCELLED: 'cancelledOrders',
      DELIVERED: 'deliveredOrders',
    };
    return map[status] ?? null;
  }

  /** Default lookback range for each aggregation period. */
  private getDefaultStartDate(period: StatsPeriod, endDate: Date): Date {
    const d = new Date(endDate);
    switch (period) {
      case StatsPeriod.DAY:
        return new Date(d.getTime() - 29 * 24 * 60 * 60 * 1000); // 30 days
      case StatsPeriod.WEEK:
        return new Date(d.getTime() - 84 * 24 * 60 * 60 * 1000); // 12 weeks
      case StatsPeriod.MONTH:
        d.setUTCMonth(d.getUTCMonth() - 11);
        d.setUTCDate(1);
        return toMidnightUTC(d); // 12 months
      case StatsPeriod.YEAR:
        d.setUTCFullYear(d.getUTCFullYear() - 4);
        d.setUTCMonth(0);
        d.setUTCDate(1);
        return toMidnightUTC(d); // 5 years
    }
  }
}
