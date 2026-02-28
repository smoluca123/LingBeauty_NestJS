import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StatsService } from './stats.service';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import {
  AggregatedStatsDto,
  DailyStatsDto,
  OrderStatusBreakdownDto,
  OverviewStatsDto,
  RevenueChartDto,
  StatsPeriod,
  TopProductDto,
} from './dto/stats-response.dto';
import {
  ApiGetAggregatedStats,
  ApiGetDailyStats,
  ApiGetOrderStatusBreakdown,
  ApiGetOverviewStats,
  ApiGetRevenueChart,
  ApiGetTopProducts,
  ApiSyncDailyStats,
} from './decorators/stats.decorators';

@ApiTags('Admin Stats')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // ── Overview ────────────────────────────────────────────────────────────────

  @Get('overview')
  @ApiGetOverviewStats()
  async getOverviewStats(): Promise<
    IBeforeTransformResponseType<OverviewStatsDto>
  > {
    const data = await this.statsService.getOverviewStats();
    return {
      type: 'response',
      message: 'Lấy thống kê tổng quan thành công',
      data,
    };
  }

  // ── Daily snapshots ─────────────────────────────────────────────────────────

  /**
   * GET /stats/daily?startDate=&endDate=
   * Raw daily snapshots stored in DailyStats table.
   */
  @Get('daily')
  @ApiGetDailyStats()
  async getDailyStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<IBeforeTransformResponseType<DailyStatsDto[]>> {
    const data = await this.statsService.getDailyStats(startDate, endDate);
    return {
      type: 'response',
      message: 'Lấy thống kê hàng ngày thành công',
      data,
    };
  }

  // ── Aggregated (week / month / year) ────────────────────────────────────────

  /**
   * GET /stats/aggregated?period=week&startDate=&endDate=
   * Groups daily rows by week, month, or year.
   *
   * period options:
   *  - week   → label format "YYYY-WNN" (ISO week)
   *  - month  → label format "YYYY-MM"
   *  - year   → label format "YYYY"
   */
  @Get('aggregated')
  @ApiGetAggregatedStats()
  async getAggregatedStats(
    @Query('period') period?: StatsPeriod,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<IBeforeTransformResponseType<AggregatedStatsDto[]>> {
    const resolvedPeriod = period ?? StatsPeriod.MONTH;
    const data = await this.statsService.getAggregatedStats(
      resolvedPeriod,
      startDate,
      endDate,
    );
    return {
      type: 'response',
      message: `Lấy thống kê theo ${resolvedPeriod} thành công`,
      data,
    };
  }

  // ── Revenue chart ───────────────────────────────────────────────────────────

  /**
   * GET /stats/revenue-chart?period=day&startDate=&endDate=
   * Revenue from CONFIRMED+DELIVERED orders grouped by period.
   */
  @Get('revenue-chart')
  @ApiGetRevenueChart()
  async getRevenueChart(
    @Query('period') period?: StatsPeriod,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<IBeforeTransformResponseType<RevenueChartDto>> {
    const data = await this.statsService.getRevenueChart(
      period ?? StatsPeriod.DAY,
      startDate,
      endDate,
    );
    return {
      type: 'response',
      message: 'Lấy biểu đồ doanh thu thành công',
      data,
    };
  }

  // ── Order status breakdown ──────────────────────────────────────────────────

  @Get('orders/breakdown')
  @ApiGetOrderStatusBreakdown()
  async getOrderStatusBreakdown(): Promise<
    IBeforeTransformResponseType<OrderStatusBreakdownDto>
  > {
    const data = await this.statsService.getOrderStatusBreakdown();
    return {
      type: 'response',
      message: 'Lấy thống kê trạng thái đơn hàng thành công',
      data,
    };
  }

  // ── Top products ────────────────────────────────────────────────────────────

  @Get('products/top')
  @ApiGetTopProducts()
  async getTopProducts(
    @Query('limit') limit?: number,
  ): Promise<IBeforeTransformResponseType<TopProductDto[]>> {
    const topLimit = limit ? Number(limit) : 10;
    const data = await this.statsService.getTopProducts(topLimit);
    return {
      type: 'response',
      message: 'Lấy sản phẩm bán chạy thành công',
      data,
    };
  }

  // ── Manual sync ─────────────────────────────────────────────────────────────

  @Post('sync')
  @ApiSyncDailyStats()
  async syncTodayStats(): Promise<
    IBeforeTransformResponseType<{ message: string }>
  > {
    await this.statsService.syncTodaySnapshot();
    return {
      type: 'response',
      message: 'Đồng bộ thống kê hôm nay thành công',
      data: { message: 'Đồng bộ thống kê thành công' },
    };
  }
}
