import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrderService, GetOrdersParams } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, CancelOrderDto } from './dto/update-order.dto';
import { OrderResponseDto, OrderListItemDto } from './dto/order-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiCreateOrder,
  ApiGetOrders,
  ApiGetMyOrders,
  ApiGetOrder,
  ApiUpdateOrder,
  ApiCancelOrder,
} from './decorators/order.decorators';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { OrderStatus } from 'prisma/generated/prisma/client';

@ApiTags('Order Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * POST /order
   * Tạo đơn hàng mới
   */
  @Post()
  @ApiCreateOrder()
  createOrder(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    return this.orderService.createOrder(
      decodedAccessToken.userId,
      createOrderDto,
    );
  }

  /**
   * GET /order/my-orders
   * Lấy danh sách đơn hàng của người dùng hiện tại
   */
  @Get('my-orders')
  @ApiGetMyOrders()
  getMyOrders(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: OrderStatus,
  ): Promise<IBeforeTransformPaginationResponseType<OrderListItemDto>> {
    const params: GetOrdersParams = {
      page,
      limit,
      status,
      userId: decodedAccessToken.userId,
    };
    return this.orderService.getOrders(params);
  }

  /**
   * GET /order/:orderId
   * Lấy chi tiết đơn hàng
   */
  @Get(':orderId')
  @ApiGetOrder()
  getOrder(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('orderId') orderId: string,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    return this.orderService.getOrderById(orderId, decodedAccessToken.userId);
  }

  /**
   * POST /order/:orderId/cancel
   * Hủy đơn hàng
   */
  @Post(':orderId/cancel')
  @ApiCancelOrder()
  cancelOrder(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Param('orderId') orderId: string,
    @Body() cancelOrderDto: CancelOrderDto,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    return this.orderService.cancelOrder(
      orderId,
      decodedAccessToken.userId,
      cancelOrderDto,
    );
  }

  /**
   * GET /order (Admin only)
   * Lấy danh sách tất cả đơn hàng
   */
  @Get()
  @UseGuards(RoleGuard)
  @Roles([3]) // Admin role
  @ApiGetOrders()
  getAllOrders(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('userId') userId?: string,
    @Query('status') status?: OrderStatus,
    @Query('orderNumber') orderNumber?: string,
    @Query('sortBy') sortBy?: 'createdAt' | 'total' | 'orderNumber',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<OrderListItemDto>> {
    const params: GetOrdersParams = {
      page,
      limit,
      userId,
      status,
      orderNumber,
      sortBy,
      order,
    };
    return this.orderService.getOrders(params);
  }

  /**
   * PATCH /order/:orderId (Admin only)
   * Cập nhật đơn hàng
   */
  @Patch(':orderId')
  @UseGuards(RoleGuard)
  @Roles([3]) // Admin role
  @ApiUpdateOrder()
  updateOrder(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }
}
