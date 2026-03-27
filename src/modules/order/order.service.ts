import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import {
  IBeforeTransformResponseType,
  IBeforeTransformPaginationResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  toResponseDto,
  toResponseDtoArray,
} from 'src/libs/utils/transform.utils';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, CancelOrderDto } from './dto/update-order.dto';
import { OrderResponseDto, OrderListItemDto } from './dto/order-response.dto';
import { orderSelect, orderListSelect } from 'src/libs/prisma/order-select';
import {
  OrderStatus,
  PaymentStatus,
  Prisma,
} from 'prisma/generated/prisma/client';
import { StatsService } from 'src/modules/stats/stats.service';

export interface GetOrdersParams {
  page?: number;
  limit?: number;
  userId?: string;
  status?: OrderStatus;
  orderNumber?: string;
  sortBy?: 'createdAt' | 'total' | 'orderNumber';
  order?: 'asc' | 'desc';
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly statsService: StatsService,
  ) {}

  /**
   * Tạo đơn hàng mới từ giỏ hàng hoặc danh sách sản phẩm
   */
  async createOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    try {
      // Validate địa chỉ giao hàng
      const shippingAddress = await this.prismaService.address.findFirst({
        where: {
          id: dto.shippingAddressId,
          userId,
        },
      });

      if (!shippingAddress) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ADDRESS_NOT_FOUND],
          ERROR_CODES.ADDRESS_NOT_FOUND,
        );
      }

      // Validate và tính toán giá cho từng item
      const orderItemsData = await Promise.all(
        dto.items.map(async (item) => {
          const variant = await this.prismaService.productVariant.findUnique({
            where: { id: item.variantId },
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  sku: true,
                  isActive: true,
                  basePrice: true,
                },
              },
              inventory: {
                select: {
                  quantity: true,
                  minStockQuantity: true,
                },
              },
            },
          });

          if (!variant || !variant.product.isActive) {
            throw new BusinessException(
              ERROR_MESSAGES[ERROR_CODES.PRODUCT_NOT_FOUND],
              ERROR_CODES.PRODUCT_NOT_FOUND,
            );
          }

          // Kiểm tra tồn kho
          const availableStock = variant.inventory?.quantity ?? 0;
          const minStock = variant.inventory?.minStockQuantity ?? -10;

          if (availableStock - item.quantity < minStock) {
            throw new BusinessException(
              ERROR_MESSAGES[ERROR_CODES.CART_ITEM_BACKORDER_LIMIT_REACHED],
              ERROR_CODES.CART_ITEM_BACKORDER_LIMIT_REACHED,
            );
          }

          // Kiểm tra flash sale
          const now = new Date();
          const flashSaleProduct =
            await this.prismaService.flashSaleProduct.findFirst({
              where: {
                variantId: item.variantId,
                isActive: true,
                flashSale: {
                  status: 'ACTIVE',
                  isActive: true,
                  startTime: { lte: now },
                  endTime: { gte: now },
                },
              },
              include: {
                flashSale: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            });

          let price = Number(variant.price ?? variant.product.basePrice ?? 0);
          let flashSaleId: string | undefined;

          // Nếu có flash sale, validate và sử dụng giá flash sale
          if (flashSaleProduct) {
            // Validate số lượng mua theo giới hạn flash sale
            if (item.quantity > flashSaleProduct.limitPerOrder) {
              throw new BusinessException(
                ERROR_MESSAGES[ERROR_CODES.CART_FS_LIMIT_EXCEEDED],
                ERROR_CODES.CART_FS_LIMIT_EXCEEDED,
              );
            }

            // Validate còn đủ hàng flash sale
            const remainingQuantity =
              flashSaleProduct.maxQuantity - flashSaleProduct.soldQuantity;
            if (item.quantity > remainingQuantity) {
              throw new BusinessException(
                ERROR_MESSAGES[ERROR_CODES.CART_FS_OUT_OF_STOCK],
                ERROR_CODES.CART_FS_OUT_OF_STOCK,
              );
            }

            // Sử dụng giá flash sale
            price = Number(flashSaleProduct.flashPrice);
            flashSaleId = flashSaleProduct.flashSale.id;
          }

          const total = price * item.quantity;

          return {
            productId: variant.product.id,
            variantId: variant.id,
            name: variant.product.name,
            sku: variant.sku,
            price,
            quantity: item.quantity,
            total,
            flashSaleId,
          };
        }),
      );

      // Tính toán tổng tiền
      let subtotal = orderItemsData.reduce(
        (sum, item) => sum + Number(item.total),
        0,
      );

      let discount = 0;
      let couponCode: string | undefined;

      // Áp dụng coupon nếu có
      if (dto.couponCode) {
        const coupon = await this.prismaService.coupon.findUnique({
          where: { code: dto.couponCode },
        });

        if (!coupon || !coupon.isActive) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_FOUND],
            ERROR_CODES.COUPON_NOT_FOUND,
          );
        }

        const now = new Date();
        if (now < coupon.startDate || now > coupon.endDate) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.COUPON_EXPIRED],
            ERROR_CODES.COUPON_EXPIRED,
          );
        }

        if (
          coupon.usageLimit !== null &&
          coupon.usedCount >= coupon.usageLimit
        ) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.COUPON_USAGE_LIMIT_REACHED],
            ERROR_CODES.COUPON_USAGE_LIMIT_REACHED,
          );
        }

        if (
          coupon.minPurchase !== null &&
          subtotal < Number(coupon.minPurchase)
        ) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.COUPON_MIN_PURCHASE_NOT_MET],
            ERROR_CODES.COUPON_MIN_PURCHASE_NOT_MET,
          );
        }

        // Tính discount
        if (coupon.type === 'FIXED') {
          discount = Math.min(Number(coupon.value), subtotal);
        } else if (coupon.type === 'PERCENTAGE') {
          discount = (subtotal * Number(coupon.value)) / 100;
          if (coupon.maxDiscount !== null) {
            discount = Math.min(discount, Number(coupon.maxDiscount));
          }
        }

        couponCode = coupon.code;
      }

      const tax = 0; // TODO: Implement tax calculation
      const shipping = 0; // TODO: Implement shipping calculation
      const total = subtotal + tax + shipping - discount;

      // Generate order number
      const orderNumber = await this.generateOrderNumber();

      // Tạo order trong transaction
      const order = await this.prismaService.$transaction(async (tx) => {
        // Tạo order
        const createdOrder = await tx.order.create({
          data: {
            userId,
            orderNumber,
            status: OrderStatus.PENDING,
            subtotal: new Prisma.Decimal(subtotal),
            tax: new Prisma.Decimal(tax),
            shipping: new Prisma.Decimal(shipping),
            discount: new Prisma.Decimal(discount),
            total: new Prisma.Decimal(total),
            shippingAddressId: dto.shippingAddressId,
            affiliateCode: dto.affiliateCode,
            couponCode,
            notes: dto.notes,
            items: {
              create: orderItemsData.map(
                ({ flashSaleId, ...itemData }) => itemData,
              ),
            },
            payments: {
              create: {
                method: dto.paymentMethod,
                amount: new Prisma.Decimal(total),
                status: PaymentStatus.PENDING,
              },
            },
          },
          select: orderSelect,
        });

        // Cập nhật inventory
        await Promise.all(
          dto.items.map((item) =>
            tx.productInventory.updateMany({
              where: { variantId: item.variantId },
              data: {
                quantity: {
                  decrement: item.quantity,
                },
              },
            }),
          ),
        );

        // Cập nhật flash sale sold quantity và tạo FlashSaleOrder
        const flashSaleIds = new Set(
          orderItemsData
            .filter((item) => item.flashSaleId)
            .map((item) => item.flashSaleId!),
        );

        for (const flashSaleId of flashSaleIds) {
          // Cập nhật sold quantity cho các flash sale products
          const flashSaleItems = orderItemsData.filter(
            (item) => item.flashSaleId === flashSaleId,
          );

          for (const item of flashSaleItems) {
            await tx.flashSaleProduct.updateMany({
              where: {
                flashSaleId,
                variantId: item.variantId,
              },
              data: {
                soldQuantity: {
                  increment: item.quantity,
                },
              },
            });
          }

          // Tạo FlashSaleOrder record
          await tx.flashSaleOrder.create({
            data: {
              flashSaleId,
              orderId: createdOrder.id,
            },
          });
        }

        // Cập nhật coupon usage nếu có
        if (couponCode) {
          await tx.coupon.update({
            where: { code: couponCode },
            data: {
              usedCount: { increment: 1 },
            },
          });

          // Tạo coupon usage record
          await tx.couponUsage.create({
            data: {
              couponId: (await tx.coupon.findUnique({
                where: { code: couponCode },
              }))!.id,
              orderId: createdOrder.id,
              discount: new Prisma.Decimal(discount),
            },
          });
        }

        // Xóa cart items nếu đặt hàng từ giỏ hàng
        const cart = await tx.cart.findUnique({
          where: { userId },
          select: { id: true },
        });

        if (cart) {
          await tx.cartItem.deleteMany({
            where: {
              cartId: cart.id,
              variantId: {
                in: dto.items.map((item) => item.variantId),
              },
            },
          });
        }

        return createdOrder;
      });

      // Fire-and-forget: Update stats (nếu có method này)
      // this.statsService.incrementOrderCount().catch((err) => {
      //   this.logger.error('Failed to update order stats', err);
      // });

      return {
        type: 'response',
        message: 'Tạo đơn hàng thành công',
        data: toResponseDto(OrderResponseDto, order),
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      this.logger.error('Failed to create order', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Lấy danh sách đơn hàng với phân trang và filter
   */
  async getOrders(
    params: GetOrdersParams,
  ): Promise<IBeforeTransformPaginationResponseType<OrderListItemDto>> {
    try {
      const {
        page = 1,
        limit = 10,
        userId,
        status,
        orderNumber,
        sortBy = 'createdAt',
        order = 'desc',
      } = params;

      const whereQuery: Prisma.OrderWhereInput = {
        ...(userId && { userId }),
        ...(status && { status }),
        ...(orderNumber && {
          orderNumber: { contains: orderNumber, mode: 'insensitive' },
        }),
      };

      const [orders, totalCount] = await Promise.all([
        this.prismaService.order.findMany({
          where: whereQuery,
          select: orderListSelect,
          orderBy: { [sortBy]: order },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.order.count({
          where: whereQuery,
        }),
      ]);

      const ordersWithItemCount = orders.map((order) => ({
        ...order,
        itemCount: order.items.length,
      }));

      const orderResponses = toResponseDtoArray(
        OrderListItemDto,
        ordersWithItemCount,
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách đơn hàng thành công',
        data: {
          items: orderResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      this.logger.error('Failed to get orders', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Lấy chi tiết đơn hàng
   */
  async getOrderById(
    orderId: string,
    userId?: string,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    try {
      const whereQuery: Prisma.OrderWhereUniqueInput = {
        id: orderId,
        ...(userId && { userId }),
      };

      const order = await this.prismaService.order.findUnique({
        where: whereQuery,
        select: orderSelect,
      });

      if (!order) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ORDER_NOT_FOUND],
          ERROR_CODES.ORDER_NOT_FOUND,
        );
      }

      return {
        type: 'response',
        message: 'Lấy thông tin đơn hàng thành công',
        data: toResponseDto(OrderResponseDto, order),
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      this.logger.error('Failed to get order', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Cập nhật trạng thái đơn hàng (Admin)
   */
  async updateOrder(
    orderId: string,
    dto: UpdateOrderDto,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    try {
      const existingOrder = await this.prismaService.order.findUnique({
        where: { id: orderId },
        select: { id: true, status: true },
      });

      if (!existingOrder) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ORDER_NOT_FOUND],
          ERROR_CODES.ORDER_NOT_FOUND,
        );
      }

      // Validate status transition
      if (dto.status) {
        this.validateStatusTransition(existingOrder.status, dto.status);
      }

      const updatedOrder = await this.prismaService.order.update({
        where: { id: orderId },
        data: {
          ...(dto.status && { status: dto.status }),
          ...(dto.notes !== undefined && { notes: dto.notes }),
        },
        select: orderSelect,
      });

      return {
        type: 'response',
        message: 'Cập nhật đơn hàng thành công',
        data: toResponseDto(OrderResponseDto, updatedOrder),
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      this.logger.error('Failed to update order', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Hủy đơn hàng
   */
  async cancelOrder(
    orderId: string,
    userId: string,
    dto: CancelOrderDto,
  ): Promise<IBeforeTransformResponseType<OrderResponseDto>> {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id: orderId, userId },
        select: {
          id: true,
          status: true,
          items: {
            select: {
              variantId: true,
              quantity: true,
            },
          },
        },
      });

      if (!order) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ORDER_NOT_FOUND],
          ERROR_CODES.ORDER_NOT_FOUND,
        );
      }

      // Chỉ cho phép hủy đơn ở trạng thái PENDING hoặc CONFIRMED
      const cancellableStatuses: OrderStatus[] = [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
      ];
      if (!cancellableStatuses.includes(order.status)) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.ORDER_CANNOT_BE_CANCELLED],
          ERROR_CODES.ORDER_CANNOT_BE_CANCELLED,
        );
      }

      const cancelledOrder = await this.prismaService.$transaction(
        async (tx) => {
          // Cập nhật trạng thái đơn hàng
          const updated = await tx.order.update({
            where: { id: orderId },
            data: {
              status: OrderStatus.CANCELLED,
              notes: dto.reason
                ? `Đã hủy: ${dto.reason}`
                : 'Đã hủy bởi khách hàng',
            },
            select: orderSelect,
          });

          // Hoàn lại inventory
          await Promise.all(
            order.items.map((item) =>
              tx.productInventory.updateMany({
                where: { variantId: item.variantId },
                data: {
                  quantity: {
                    increment: item.quantity,
                  },
                },
              }),
            ),
          );

          // Hoàn lại flash sale sold quantity nếu có
          const flashSaleOrder = await tx.flashSaleOrder.findUnique({
            where: { orderId },
            select: { flashSaleId: true },
          });

          if (flashSaleOrder) {
            // Hoàn lại sold quantity cho các flash sale products
            for (const item of order.items) {
              await tx.flashSaleProduct.updateMany({
                where: {
                  flashSaleId: flashSaleOrder.flashSaleId,
                  variantId: item.variantId,
                },
                data: {
                  soldQuantity: {
                    decrement: item.quantity,
                  },
                },
              });
            }
          }

          return updated;
        },
      );

      return {
        type: 'response',
        message: 'Hủy đơn hàng thành công',
        data: toResponseDto(OrderResponseDto, cancelledOrder),
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      this.logger.error('Failed to cancel order', error);
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  /**
   * Generate unique order number
   */
  private async generateOrderNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    // Format: ORD-YYMMDD-XXXX
    const prefix = `ORD-${year}${month}${day}`;

    // Đếm số đơn hàng trong ngày
    const count = await this.prismaService.order.count({
      where: {
        orderNumber: {
          startsWith: prefix,
        },
      },
    });

    const sequence = (count + 1).toString().padStart(4, '0');
    return `${prefix}-${sequence}`;
  }

  /**
   * Validate status transition
   */
  private validateStatusTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
  ): void {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.REFUNDED]: [],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.INVALID_ORDER_STATUS_TRANSITION],
        ERROR_CODES.INVALID_ORDER_STATUS_TRANSITION,
      );
    }
  }
}
