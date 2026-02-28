import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

// ── Period enum ───────────────────────────────────────────────────────────────

export enum StatsPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

// ── Overview summary ──────────────────────────────────────────────────────────

export class OverviewStatsDto {
  @ApiProperty({ description: 'Total users in system' })
  @Expose()
  totalUsers: number;

  @ApiProperty({ description: 'New users today' })
  @Expose()
  newUsersToday: number;

  @ApiProperty({ description: 'New users this month' })
  @Expose()
  newUsersThisMonth: number;

  @ApiProperty({ description: 'Total orders in system' })
  @Expose()
  totalOrders: number;

  @ApiProperty({ description: 'Pending orders' })
  @Expose()
  pendingOrders: number;

  @ApiProperty({ description: 'Total revenue (string decimal)' })
  @Expose()
  totalRevenue: string;

  @ApiProperty({ description: 'Revenue today (string decimal)' })
  @Expose()
  revenueToday: string;

  @ApiProperty({ description: 'Revenue this month (string decimal)' })
  @Expose()
  revenueThisMonth: string;

  @ApiProperty({ description: 'Total active products' })
  @Expose()
  totalProducts: number;

  @ApiProperty({ description: 'Total reviews' })
  @Expose()
  totalReviews: number;
}

// ── Daily stats snapshot ─────────────────────────────────────────────────────

export class DailyStatsDto {
  @ApiProperty()
  @Expose()
  date: string; // ISO date string (YYYY-MM-DD)

  @ApiProperty()
  @Expose()
  newUsers: number;

  @ApiProperty()
  @Expose()
  totalUsers: number;

  @ApiProperty()
  @Expose()
  totalOrders: number;

  @ApiProperty()
  @Expose()
  confirmedOrders: number;

  @ApiProperty()
  @Expose()
  cancelledOrders: number;

  @ApiProperty()
  @Expose()
  deliveredOrders: number;

  @ApiProperty()
  @Expose()
  revenue: string;

  @ApiProperty()
  @Expose()
  totalProducts: number;

  @ApiProperty()
  @Expose()
  newProducts: number;

  @ApiProperty()
  @Expose()
  totalItemsSold: number;

  @ApiProperty()
  @Expose()
  newReviews: number;

  @ApiProperty()
  @Expose()
  approvedReviews: number;
}

// ── Aggregated period stats (week / month / year) ─────────────────────────────
// Computed by grouping DailyStats rows; no extra DB tables needed.

export class AggregatedStatsDto {
  @ApiProperty({
    description:
      'Period label. Format: "YYYY-WNN" (week), "YYYY-MM" (month), "YYYY" (year)',
    example: '2025-W04',
  })
  @Expose()
  periodLabel: string;

  @ApiProperty({ description: 'Start date of this period (YYYY-MM-DD)' })
  @Expose()
  startDate: string;

  @ApiProperty({ description: 'End date of this period (YYYY-MM-DD)' })
  @Expose()
  endDate: string;

  @ApiProperty({ description: 'Sum of new users in period' })
  @Expose()
  newUsers: number;

  @ApiProperty({ description: 'Sum of total orders in period' })
  @Expose()
  totalOrders: number;

  @ApiProperty({ description: 'Sum of confirmed orders in period' })
  @Expose()
  confirmedOrders: number;

  @ApiProperty({ description: 'Sum of cancelled orders in period' })
  @Expose()
  cancelledOrders: number;

  @ApiProperty({ description: 'Sum of delivered orders in period' })
  @Expose()
  deliveredOrders: number;

  @ApiProperty({ description: 'Sum of revenue in period (string decimal)' })
  @Expose()
  revenue: string;

  @ApiProperty({ description: 'Sum of new products in period' })
  @Expose()
  newProducts: number;

  @ApiProperty({ description: 'Sum of items sold in period' })
  @Expose()
  totalItemsSold: number;

  @ApiProperty({ description: 'Sum of new reviews in period' })
  @Expose()
  newReviews: number;

  @ApiProperty({ description: 'Sum of approved reviews in period' })
  @Expose()
  approvedReviews: number;
}

// ── Revenue chart data ────────────────────────────────────────────────────────

export class RevenueChartItemDto {
  @ApiProperty({
    description: 'Period label (date, week, month or year depending on period)',
  })
  @Expose()
  label: string;

  @ApiProperty()
  @Expose()
  revenue: string;

  @ApiProperty()
  @Expose()
  orders: number;
}

export class RevenueChartDto {
  @ApiProperty({ type: [RevenueChartItemDto] })
  @Expose()
  @Type(() => RevenueChartItemDto)
  items: RevenueChartItemDto[];

  @ApiProperty()
  @Expose()
  totalRevenue: string;

  @ApiProperty()
  @Expose()
  totalOrders: number;
}

// ── Order status breakdown ────────────────────────────────────────────────────

export class OrderStatusBreakdownDto {
  @ApiProperty()
  @Expose()
  pending: number;

  @ApiProperty()
  @Expose()
  confirmed: number;

  @ApiProperty()
  @Expose()
  processing: number;

  @ApiProperty()
  @Expose()
  shipped: number;

  @ApiProperty()
  @Expose()
  delivered: number;

  @ApiProperty()
  @Expose()
  cancelled: number;

  @ApiProperty()
  @Expose()
  refunded: number;
}

// ── Top product item ──────────────────────────────────────────────────────────

export class TopProductDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  totalSold: number;

  @ApiProperty()
  @Expose()
  revenue: string;

  @ApiProperty()
  @Expose()
  avgRating: string | null;

  @ApiProperty()
  @Expose()
  reviewCount: number;
}
