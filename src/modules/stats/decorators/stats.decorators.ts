import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiRoleProtectedOperation } from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import {
  AggregatedStatsDto,
  DailyStatsDto,
  OrderStatusBreakdownDto,
  OverviewStatsDto,
  RevenueChartDto,
  StatsPeriod,
  TopProductDto,
} from '../dto/stats-response.dto';

// Reusable period query param decorator
const ApiQueryPeriod = () =>
  ApiQuery({
    name: 'period',
    enum: StatsPeriod,
    required: false,
    description:
      'Aggregation granularity: day (default), week, month, year',
  });

const ApiQueryDateRange = () =>
  applyDecorators(
    ApiQuery({
      name: 'startDate',
      type: String,
      required: false,
      description: 'Start date (ISO string, e.g. 2025-01-01)',
    }),
    ApiQuery({
      name: 'endDate',
      type: String,
      required: false,
      description: 'End date (ISO string, e.g. 2025-12-31)',
    }),
  );

// ── Endpoint decorators ────────────────────────────────────────────────────────

export const ApiGetOverviewStats = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get overview stats for admin dashboard',
      description:
        'Returns real-time aggregated metrics: total users, orders, revenue, and products.',
      roles: [RolesLevel.ADMIN, RolesLevel.MANAGER],
    }),
    ApiResponse({ status: 200, type: OverviewStatsDto }),
  );

export const ApiGetDailyStats = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get daily stats snapshots',
      description:
        'Returns pre-aggregated daily snapshots stored in DailyStats table. Default: last 30 days.',
      roles: [RolesLevel.ADMIN, RolesLevel.MANAGER],
    }),
    ApiQueryDateRange(),
    ApiResponse({ status: 200, type: [DailyStatsDto] }),
  );

export const ApiGetAggregatedStats = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get stats aggregated by week / month / year',
      description:
        'Groups daily snapshots by week, month, or year. Default ranges: week→12 weeks, month→12 months, year→5 years.',
      roles: [RolesLevel.ADMIN, RolesLevel.MANAGER],
    }),
    ApiQueryPeriod(),
    ApiQueryDateRange(),
    ApiResponse({ status: 200, type: [AggregatedStatsDto] }),
  );

export const ApiGetRevenueChart = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get revenue chart data',
      description:
        'Revenue from completed orders grouped by day/week/month/year. Use period param to control granularity.',
      roles: [RolesLevel.ADMIN, RolesLevel.MANAGER],
    }),
    ApiQueryPeriod(),
    ApiQueryDateRange(),
    ApiResponse({ status: 200, type: RevenueChartDto }),
  );

export const ApiGetOrderStatusBreakdown = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get order status breakdown',
      description: 'Returns live count of orders grouped by status.',
      roles: [RolesLevel.ADMIN, RolesLevel.MANAGER],
    }),
    ApiResponse({ status: 200, type: OrderStatusBreakdownDto }),
  );

export const ApiGetTopProducts = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Get top selling products',
      description:
        'Returns top N products ranked by total sales quantity (all-time, from ProductStats table).',
      roles: [RolesLevel.ADMIN, RolesLevel.MANAGER],
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      description: 'Number of top products to return (default: 10)',
    }),
    ApiResponse({ status: 200, type: [TopProductDto] }),
  );

export const ApiSyncDailyStats = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Manually sync today daily stats snapshot',
      description:
        'Triggers a full recalculation and upsert of today's DailyStats row. Use sparingly — prefer event-driven updates.',
      roles: [RolesLevel.ADMIN],
    }),
    ApiResponse({ status: 200, description: 'Sync completed' }),
  );
