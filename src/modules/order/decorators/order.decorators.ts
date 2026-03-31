import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { OrderResponseDto, OrderListItemDto } from '../dto/order-response.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto, CancelOrderDto } from '../dto/update-order.dto';
import { ApiProtectedAuthOperation } from 'src/decorators/api.decorators';

export function ApiCreateOrder() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Create new order',
      description: 'Create order from product list and shipping address',
    }),
    ApiBody({ type: CreateOrderDto }),
    ApiResponse({
      status: 201,
      description: 'Order created successfully',
      type: OrderResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Invalid data' }),
    ApiResponse({
      status: 404,
      description: 'Product or address not found',
    }),
  );
}

export function ApiGetOrders() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all orders',
      description: 'Get list of orders with pagination and filters',
    }),
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ApiQuery({ name: 'limit', required: false, type: Number, example: 10 }),
    ApiQuery({
      name: 'status',
      required: false,
      enum: [
        'PENDING',
        'CONFIRMED',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'REFUNDED',
      ],
    }),
    ApiQuery({ name: 'orderNumber', required: false, type: String }),
    ApiQuery({ name: 'userId', required: false, type: String }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: ['createdAt', 'total', 'orderNumber'],
    }),
    ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] }),
    ApiResponse({
      status: 200,
      description: 'Orders retrieved successfully',
      type: [OrderListItemDto],
    }),
  );
}

export function ApiGetMyOrders() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get my orders',
      description: 'Get list of orders for current user',
    }),
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ApiQuery({ name: 'limit', required: false, type: Number, example: 10 }),
    ApiQuery({
      name: 'status',
      required: false,
      enum: [
        'PENDING',
        'CONFIRMED',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'REFUNDED',
      ],
    }),
    ApiResponse({
      status: 200,
      description: 'Orders retrieved successfully',
      type: [OrderListItemDto],
    }),
  );
}

export function ApiGetOrder() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Get order details',
      description: 'Get detailed information of an order',
    }),
    ApiParam({ name: 'orderId', type: String, description: 'Order ID' }),
    ApiResponse({
      status: 200,
      description: 'Order retrieved successfully',
      type: OrderResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Order not found' }),
  );
}

export function ApiUpdateOrder() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update order (Admin)',
      description: 'Update order status or notes',
    }),
    ApiParam({ name: 'orderId', type: String, description: 'Order ID' }),
    ApiBody({ type: UpdateOrderDto }),
    ApiResponse({
      status: 200,
      description: 'Order updated successfully',
      type: OrderResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Order not found' }),
  );
}

export function ApiCancelOrder() {
  return applyDecorators(
    ApiProtectedAuthOperation({
      summary: 'Cancel order',
      description: 'Cancel order (only allowed in PENDING or CONFIRMED status)',
    }),
    ApiParam({ name: 'orderId', type: String, description: 'Order ID' }),
    ApiBody({ type: CancelOrderDto }),
    ApiResponse({
      status: 200,
      description: 'Order cancelled successfully',
      type: OrderResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Order not found' }),
    ApiResponse({
      status: 400,
      description: 'Cannot cancel order in current status',
    }),
  );
}
