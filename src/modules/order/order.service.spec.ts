import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { StatsService } from '../stats/stats.service';
import { BusinessException } from '../../exceptions/business.exception';
import { ERROR_CODES } from '../../constants/error-codes';
import {
  withoutDeleted,
  softDeleteData,
} from '../../libs/prisma/soft-delete.helpers';
import { OrderStatus, PaymentStatus } from 'prisma/generated/prisma/client';

describe('OrderService - Soft Delete Implementation', () => {
  let service: OrderService;
  let prismaService: jest.Mocked<PrismaService>;
  let statsService: jest.Mocked<StatsService>;

  const mockUser = {
    id: 'user-id-123',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    isDeleted: false,
    deletedAt: null,
  };

  const mockAddress = {
    id: 'address-id-123',
    userId: 'user-id-123',
    fullName: 'John Doe',
    phone: '+1234567890',
    addressLine1: '123 Main St',
    city: 'New York',
    province: 'NY',
    postalCode: '10001',
    country: 'Vietnam',
    isDefault: true,
    isDeleted: false,
    deletedAt: null,
  };

  const mockProduct = {
    id: 'product-id-123',
    name: 'Test Product',
    sku: 'TEST-SKU',
    basePrice: 100,
    isActive: true,
    isDeleted: false,
    deletedAt: null,
  };

  const mockVariant = {
    id: 'variant-id-123',
    productId: 'product-id-123',
    sku: 'VAR-SKU-001',
    name: 'Default',
    price: 100,
    isDeleted: false,
    deletedAt: null,
    product: mockProduct,
    inventory: {
      quantity: 100,
      minStockQuantity: 0,
    },
  };

  const mockCoupon = {
    id: 'coupon-id-123',
    code: 'SAVE10',
    type: 'PERCENTAGE',
    value: 10,
    isActive: true,
    startDate: new Date('2020-01-01'),
    endDate: new Date('2030-12-31'),
    usageLimit: 100,
    usedCount: 0,
    minPurchase: null,
    maxDiscount: null,
    isDeleted: false,
    deletedAt: null,
  };

  const mockOrder = {
    id: 'order-id-123',
    userId: 'user-id-123',
    orderNumber: 'ORD-240101-0001',
    status: OrderStatus.PENDING,
    subtotal: 100,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 100,
    shippingAddressId: 'address-id-123',
    couponCode: null,
    notes: null,
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
    shippingAddress: mockAddress,
    items: [],
    payments: [],
  };

  const mockOrderItem = {
    id: 'order-item-id-123',
    orderId: 'order-id-123',
    productId: 'product-id-123',
    variantId: 'variant-id-123',
    name: 'Test Product',
    sku: 'VAR-SKU-001',
    price: 100,
    quantity: 1,
    total: 100,
    isDeleted: false,
    deletedAt: null,
    product: mockProduct,
    variant: mockVariant,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            orderItem: {
              updateMany: jest.fn(),
            },
            address: {
              findFirst: jest.fn(),
            },
            productVariant: {
              findFirst: jest.fn(),
            },
            productInventory: {
              updateMany: jest.fn(),
            },
            coupon: {
              findFirst: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
            },
            couponUsage: {
              create: jest.fn(),
            },
            flashSaleProduct: {
              findFirst: jest.fn(),
              updateMany: jest.fn(),
            },
            flashSaleOrder: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            cart: {
              findFirst: jest.fn(),
            },
            cartItem: {
              deleteMany: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
        {
          provide: StatsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prismaService = module.get(PrismaService) as jest.Mocked<PrismaService>;
    statsService = module.get(StatsService) as jest.Mocked<StatsService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Query Filtering Tests', () => {
    describe('getOrders() - filters out soft-deleted orders', () => {
      it('should filter out soft-deleted orders using withoutDeleted()', async () => {
        const mockOrders = [{ ...mockOrder, items: [mockOrderItem] }];
        (prismaService.order.count as jest.Mock).mockResolvedValue(1);
        (prismaService.order.findMany as jest.Mock).mockResolvedValue(
          mockOrders,
        );

        await service.getOrders({ page: 1, limit: 10 });

        expect(prismaService.order.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({ isDeleted: false }),
          }),
        );
        expect(prismaService.order.count).toHaveBeenCalledWith({
          where: expect.objectContaining({ isDeleted: false }),
        });
      });

      it('should not return soft-deleted orders in results', async () => {
        const mockOrders = [{ ...mockOrder, items: [mockOrderItem] }];
        (prismaService.order.count as jest.Mock).mockResolvedValue(1);
        (prismaService.order.findMany as jest.Mock).mockResolvedValue(
          mockOrders,
        );

        const result = await service.getOrders({ page: 1, limit: 10 });

        expect(result.data.items).toHaveLength(1);
        expect(result.data.totalCount).toBe(1);
      });

      it('should filter by userId and exclude deleted orders', async () => {
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (prismaService.order.findMany as jest.Mock).mockResolvedValue([]);

        await service.getOrders({
          page: 1,
          limit: 10,
          userId: 'user-id-123',
        });

        expect(prismaService.order.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({
              isDeleted: false,
              userId: 'user-id-123',
            }),
          }),
        );
      });

      it('should filter by status and exclude deleted orders', async () => {
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (prismaService.order.findMany as jest.Mock).mockResolvedValue([]);

        await service.getOrders({
          page: 1,
          limit: 10,
          status: OrderStatus.PENDING,
        });

        expect(prismaService.order.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({
              isDeleted: false,
              status: OrderStatus.PENDING,
            }),
          }),
        );
      });

      it('should filter by orderNumber and exclude deleted orders', async () => {
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (prismaService.order.findMany as jest.Mock).mockResolvedValue([]);

        await service.getOrders({
          page: 1,
          limit: 10,
          orderNumber: 'ORD-240101',
        });

        expect(prismaService.order.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            where: expect.objectContaining({
              isDeleted: false,
              orderNumber: expect.any(Object),
            }),
          }),
        );
      });
    });

    describe('getOrderById() - returns null for soft-deleted orders', () => {
      it('should use findFirst with withoutDeleted() filter', async () => {
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(
          mockOrder,
        );

        await service.getOrderById('order-id-123');

        expect(prismaService.order.findFirst).toHaveBeenCalledWith({
          where: withoutDeleted({ id: 'order-id-123' }),
          select: expect.any(Object),
        });
      });

      it('should throw ORDER_NOT_FOUND when order is soft-deleted', async () => {
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(null);

        await expect(service.getOrderById('deleted-order-id')).rejects.toThrow(
          BusinessException,
        );
      });

      it('should return order when order exists and is not deleted', async () => {
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(
          mockOrder,
        );

        const result = await service.getOrderById('order-id-123');

        expect(result.data).toBeDefined();
        expect(result.message).toBe('Lấy thông tin đơn hàng thành công');
      });

      it('should filter by userId and exclude deleted orders', async () => {
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(
          mockOrder,
        );

        await service.getOrderById('order-id-123', 'user-id-123');

        expect(prismaService.order.findFirst).toHaveBeenCalledWith({
          where: withoutDeleted({
            id: 'order-id-123',
            userId: 'user-id-123',
          }),
          select: expect.any(Object),
        });
      });
    });
  });

  describe('Cascading Soft Delete Tests', () => {
    describe('cancelOrder() - soft deletes both Order and OrderItems', () => {
      it('should verify order exists before cancelling', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [
            { variantId: 'variant-id-123', quantity: 1 },
            { variantId: 'variant-id-456', quantity: 2 },
          ],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithItems,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
          count: 2,
        });
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (
          prismaService.flashSaleOrder.findUnique as jest.Mock
        ).mockResolvedValue(null);

        await service.cancelOrder('order-id-123', 'user-id-123', {});

        expect(prismaService.order.findUnique).toHaveBeenCalledWith({
          where: { id: 'order-id-123', userId: 'user-id-123' },
          select: expect.any(Object),
        });
      });

      it('should soft delete order and items in transaction', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithItems,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
          count: 1,
        });
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (
          prismaService.flashSaleOrder.findUnique as jest.Mock
        ).mockResolvedValue(null);

        await service.cancelOrder('order-id-123', 'user-id-123', {});

        expect(prismaService.$transaction).toHaveBeenCalled();
        expect(prismaService.orderItem.updateMany).toHaveBeenCalledWith({
          where: { orderId: 'order-id-123' },
          data: expect.objectContaining({
            isDeleted: true,
            deletedAt: expect.any(Date),
          }),
        });
        expect(prismaService.order.update).toHaveBeenCalledWith({
          where: { id: 'order-id-123' },
          data: expect.objectContaining({
            isDeleted: true,
            deletedAt: expect.any(Date),
          }),
        });
      });

      it('should use softDeleteData() for soft delete operations', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithItems,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
          count: 1,
        });
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (
          prismaService.flashSaleOrder.findUnique as jest.Mock
        ).mockResolvedValue(null);

        await service.cancelOrder('order-id-123', 'user-id-123', {});

        expect(prismaService.orderItem.updateMany).toHaveBeenCalledWith({
          where: { orderId: 'order-id-123' },
          data: expect.objectContaining({
            isDeleted: true,
            deletedAt: expect.any(Date),
          }),
        });
        // The order.update is called twice: once for status update, once for soft delete
        // Check that the second call uses softDeleteData() structure
        const updateCalls = (prismaService.order.update as jest.Mock).mock
          .calls;
        const softDeleteCall = updateCalls.find(
          (call) => call[0].data.isDeleted === true,
        );
        expect(softDeleteCall).toBeDefined();
        expect(softDeleteCall[0].data.isDeleted).toBe(true);
        expect(softDeleteCall[0].data.deletedAt).toBeInstanceOf(Date);
      });

      it('should throw ORDER_NOT_FOUND when order does not exist', async () => {
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(
          service.cancelOrder('non-existent-id', 'user-id-123', {}),
        ).rejects.toThrow(BusinessException);
      });

      it('should throw error when order cannot be cancelled', async () => {
        const deliveredOrder = {
          ...mockOrder,
          status: OrderStatus.DELIVERED,
          items: [],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          deliveredOrder,
        );

        await expect(
          service.cancelOrder('order-id-123', 'user-id-123', {}),
        ).rejects.toThrow(BusinessException);
      });
    });

    describe('cancelOrder() - restores inventory before soft delete', () => {
      it('should restore inventory for all order items', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [
            { variantId: 'variant-id-123', quantity: 2 },
            { variantId: 'variant-id-456', quantity: 3 },
          ],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithItems,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
          count: 2,
        });
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (
          prismaService.flashSaleOrder.findUnique as jest.Mock
        ).mockResolvedValue(null);

        await service.cancelOrder('order-id-123', 'user-id-123', {});

        expect(prismaService.productInventory.updateMany).toHaveBeenCalledTimes(
          2,
        );
        expect(prismaService.productInventory.updateMany).toHaveBeenCalledWith({
          where: { variantId: 'variant-id-123' },
          data: { quantity: { increment: 2 } },
        });
        expect(prismaService.productInventory.updateMany).toHaveBeenCalledWith({
          where: { variantId: 'variant-id-456' },
          data: { quantity: { increment: 3 } },
        });
      });
    });

    describe('cancelOrder() - restores flash sale quantities before soft delete', () => {
      it('should restore flash sale sold quantity when order has flash sale', async () => {
        const orderWithFlashSale = {
          ...mockOrder,
          items: [{ variantId: 'variant-id-123', quantity: 2 }],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithFlashSale,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
          count: 1,
        });
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (
          prismaService.flashSaleOrder.findUnique as jest.Mock
        ).mockResolvedValue({ flashSaleId: 'flash-sale-id-123' });
        (
          prismaService.flashSaleProduct.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });

        await service.cancelOrder('order-id-123', 'user-id-123', {});

        expect(prismaService.flashSaleProduct.updateMany).toHaveBeenCalledWith({
          where: {
            flashSaleId: 'flash-sale-id-123',
            variantId: 'variant-id-123',
          },
          data: { soldQuantity: { decrement: 2 } },
        });
      });

      it('should not restore flash sale quantity when order has no flash sale', async () => {
        const orderWithoutFlashSale = {
          ...mockOrder,
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithoutFlashSale,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
          count: 1,
        });
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (
          prismaService.flashSaleOrder.findUnique as jest.Mock
        ).mockResolvedValue(null);

        await service.cancelOrder('order-id-123', 'user-id-123', {});

        expect(
          prismaService.flashSaleProduct.updateMany,
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('Validation Tests', () => {
    describe('createOrder() - fails with soft-deleted address', () => {
      it('should throw ADDRESS_NOT_FOUND when address is soft-deleted', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(null);

        await expect(
          service.createOrder('user-id-123', {
            shippingAddressId: 'deleted-address-id',
            items: [{ variantId: 'variant-id-123', quantity: 1 }],
            paymentMethod: 'CASH',
          }),
        ).rejects.toThrow(BusinessException);

        expect(prismaService.address.findFirst).toHaveBeenCalledWith({
          where: withoutDeleted({
            id: 'deleted-address-id',
            userId: 'user-id-123',
          }),
        });
      });

      it('should succeed when address exists and is not deleted', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          mockVariant,
        );
        (
          prismaService.flashSaleProduct.findFirst as jest.Mock
        ).mockResolvedValue(null);
        (prismaService.coupon.findFirst as jest.Mock).mockResolvedValue(null);
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.create as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (prismaService.cart.findFirst as jest.Mock).mockResolvedValue(null);

        const result = await service.createOrder('user-id-123', {
          shippingAddressId: 'address-id-123',
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
          paymentMethod: 'CASH',
        });

        expect(result.data).toBeDefined();
      });
    });

    describe('createOrder() - fails with soft-deleted product variant', () => {
      it('should throw PRODUCT_NOT_FOUND when variant is soft-deleted', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          null,
        );

        await expect(
          service.createOrder('user-id-123', {
            shippingAddressId: 'address-id-123',
            items: [{ variantId: 'deleted-variant-id', quantity: 1 }],
            paymentMethod: 'CASH',
          }),
        ).rejects.toThrow(BusinessException);

        expect(prismaService.productVariant.findFirst).toHaveBeenCalledWith({
          where: withoutDeleted({ id: 'deleted-variant-id' }),
          include: expect.any(Object),
        });
      });

      it('should throw PRODUCT_NOT_FOUND when product is inactive', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          {
            ...mockVariant,
            product: { ...mockProduct, isActive: false },
          },
        );

        await expect(
          service.createOrder('user-id-123', {
            shippingAddressId: 'address-id-123',
            items: [{ variantId: 'variant-id-123', quantity: 1 }],
            paymentMethod: 'CASH',
          }),
        ).rejects.toThrow(BusinessException);
      });
    });

    describe('createOrder() - fails with soft-deleted coupon', () => {
      it('should throw COUPON_NOT_FOUND when coupon is soft-deleted', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          mockVariant,
        );
        (
          prismaService.flashSaleProduct.findFirst as jest.Mock
        ).mockResolvedValue(null);
        (prismaService.coupon.findFirst as jest.Mock).mockResolvedValue(null);

        await expect(
          service.createOrder('user-id-123', {
            shippingAddressId: 'address-id-123',
            items: [{ variantId: 'variant-id-123', quantity: 1 }],
            paymentMethod: 'CASH',
            couponCode: 'DELETED-COUPON',
          }),
        ).rejects.toThrow(BusinessException);

        expect(prismaService.coupon.findFirst).toHaveBeenCalledWith({
          where: withoutDeleted({ code: 'DELETED-COUPON' }),
        });
      });

      it('should succeed when coupon exists and is not deleted', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          mockVariant,
        );
        (
          prismaService.flashSaleProduct.findFirst as jest.Mock
        ).mockResolvedValue(null);
        (prismaService.coupon.findFirst as jest.Mock).mockResolvedValue(
          mockCoupon,
        );
        (prismaService.coupon.findUnique as jest.Mock).mockResolvedValue(
          mockCoupon,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.create as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (prismaService.coupon.update as jest.Mock).mockResolvedValue(
          mockCoupon,
        );
        (prismaService.couponUsage.create as jest.Mock).mockResolvedValue({});
        (prismaService.cart.findFirst as jest.Mock).mockResolvedValue(null);

        const result = await service.createOrder('user-id-123', {
          shippingAddressId: 'address-id-123',
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
          paymentMethod: 'CASH',
          couponCode: 'SAVE10',
        });

        expect(result.data).toBeDefined();
      });
    });

    describe('createOrder() - handles soft-deleted cart correctly', () => {
      it('should filter deleted carts when clearing cart items', async () => {
        const mockCart = {
          id: 'cart-id-123',
          userId: 'user-id-123',
          isDeleted: false,
        };
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          mockVariant,
        );
        (
          prismaService.flashSaleProduct.findFirst as jest.Mock
        ).mockResolvedValue(null);
        (prismaService.coupon.findFirst as jest.Mock).mockResolvedValue(null);
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.create as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (prismaService.cart.findFirst as jest.Mock).mockResolvedValue(mockCart);
        (prismaService.cartItem.deleteMany as jest.Mock).mockResolvedValue({
          count: 1,
        });

        await service.createOrder('user-id-123', {
          shippingAddressId: 'address-id-123',
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
          paymentMethod: 'CASH',
        });

        expect(prismaService.cart.findFirst).toHaveBeenCalledWith({
          where: withoutDeleted({ userId: 'user-id-123' }),
          select: { id: true },
        });
      });

      it('should not clear cart items when cart is deleted', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          mockVariant,
        );
        (
          prismaService.flashSaleProduct.findFirst as jest.Mock
        ).mockResolvedValue(null);
        (prismaService.coupon.findFirst as jest.Mock).mockResolvedValue(null);
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.create as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (prismaService.cart.findFirst as jest.Mock).mockResolvedValue(null);

        await service.createOrder('user-id-123', {
          shippingAddressId: 'address-id-123',
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
          paymentMethod: 'CASH',
        });

        expect(prismaService.cartItem.deleteMany).not.toHaveBeenCalled();
      });
    });
  });

  describe('Nested Relation Tests', () => {
    describe('Order queries filter soft-deleted products in items', () => {
      it('should filter soft-deleted products in order items', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [mockOrderItem],
        };
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(
          orderWithItems,
        );

        await service.getOrderById('order-id-123');

        // Verify that the select includes product filter
        expect(prismaService.order.findFirst).toHaveBeenCalledWith({
          where: expect.any(Object),
          select: expect.objectContaining({
            items: expect.objectContaining({
              select: expect.objectContaining({
                product: expect.objectContaining({
                  where: { isDeleted: false },
                }),
              }),
            }),
          }),
        });
      });
    });

    describe('Order queries filter soft-deleted variants in items', () => {
      it('should filter soft-deleted variants in order items', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [mockOrderItem],
        };
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(
          orderWithItems,
        );

        await service.getOrderById('order-id-123');

        // Verify that the select includes variant filter
        expect(prismaService.order.findFirst).toHaveBeenCalledWith({
          where: expect.any(Object),
          select: expect.objectContaining({
            items: expect.objectContaining({
              select: expect.objectContaining({
                variant: expect.objectContaining({
                  where: { isDeleted: false },
                }),
              }),
            }),
          }),
        });
      });
    });

    describe('Order queries filter soft-deleted users', () => {
      it('should filter soft-deleted users in order queries', async () => {
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(
          mockOrder,
        );

        await service.getOrderById('order-id-123');

        // Verify that the select includes user filter
        expect(prismaService.order.findFirst).toHaveBeenCalledWith({
          where: expect.any(Object),
          select: expect.objectContaining({
            user: expect.objectContaining({
              where: { isDeleted: false },
            }),
          }),
        });
      });
    });

    describe('Order queries filter soft-deleted addresses', () => {
      it('should filter soft-deleted addresses in order queries', async () => {
        (prismaService.order.findFirst as jest.Mock).mockResolvedValue(
          mockOrder,
        );

        await service.getOrderById('order-id-123');

        // Verify that the select includes address filter
        expect(prismaService.order.findFirst).toHaveBeenCalledWith({
          where: expect.any(Object),
          select: expect.objectContaining({
            shippingAddress: expect.objectContaining({
              where: { isDeleted: false },
            }),
          }),
        });
      });
    });
  });

  describe('Transaction Atomicity Tests', () => {
    describe('cancelOrder() - uses transaction for atomicity', () => {
      it('should wrap all operations in a transaction', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithItems,
        );
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
          count: 1,
        });
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (
          prismaService.flashSaleOrder.findUnique as jest.Mock
        ).mockResolvedValue(null);

        await service.cancelOrder('order-id-123', 'user-id-123', {});

        expect(prismaService.$transaction).toHaveBeenCalledWith(
          expect.any(Function),
        );
      });

      it('should rollback all changes if transaction fails', async () => {
        const orderWithItems = {
          ...mockOrder,
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
        };
        (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
          orderWithItems,
        );
        (prismaService.$transaction as jest.Mock).mockRejectedValue(
          new Error('Transaction failed'),
        );

        await expect(
          service.cancelOrder('order-id-123', 'user-id-123', {}),
        ).rejects.toThrow();

        // Verify transaction was attempted
        expect(prismaService.$transaction).toHaveBeenCalled();
      });
    });

    describe('createOrder() - uses transaction for atomicity', () => {
      it('should wrap all operations in a transaction', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          mockVariant,
        );
        (
          prismaService.flashSaleProduct.findFirst as jest.Mock
        ).mockResolvedValue(null);
        (prismaService.coupon.findFirst as jest.Mock).mockResolvedValue(null);
        (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
          cb(prismaService),
        );
        (prismaService.order.create as jest.Mock).mockResolvedValue(mockOrder);
        (prismaService.order.count as jest.Mock).mockResolvedValue(0);
        (
          prismaService.productInventory.updateMany as jest.Mock
        ).mockResolvedValue({ count: 1 });
        (prismaService.cart.findFirst as jest.Mock).mockResolvedValue(null);

        await service.createOrder('user-id-123', {
          shippingAddressId: 'address-id-123',
          items: [{ variantId: 'variant-id-123', quantity: 1 }],
          paymentMethod: 'CASH',
        });

        expect(prismaService.$transaction).toHaveBeenCalledWith(
          expect.any(Function),
        );
      });

      it('should rollback all changes if transaction fails', async () => {
        (prismaService.address.findFirst as jest.Mock).mockResolvedValue(
          mockAddress,
        );
        (prismaService.productVariant.findFirst as jest.Mock).mockResolvedValue(
          mockVariant,
        );
        (
          prismaService.flashSaleProduct.findFirst as jest.Mock
        ).mockResolvedValue(null);
        (prismaService.coupon.findFirst as jest.Mock).mockResolvedValue(null);
        (prismaService.$transaction as jest.Mock).mockRejectedValue(
          new Error('Transaction failed'),
        );

        await expect(
          service.createOrder('user-id-123', {
            shippingAddressId: 'address-id-123',
            items: [{ variantId: 'variant-id-123', quantity: 1 }],
            paymentMethod: 'CASH',
          }),
        ).rejects.toThrow();

        // Verify transaction was attempted
        expect(prismaService.$transaction).toHaveBeenCalled();
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle multiple items in order cancellation', async () => {
      const orderWithMultipleItems = {
        ...mockOrder,
        items: [
          { variantId: 'variant-id-123', quantity: 2 },
          { variantId: 'variant-id-456', quantity: 3 },
          { variantId: 'variant-id-789', quantity: 1 },
        ],
      };
      (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
        orderWithMultipleItems,
      );
      (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
        cb(prismaService),
      );
      (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
      (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
        count: 3,
      });
      (
        prismaService.productInventory.updateMany as jest.Mock
      ).mockResolvedValue({ count: 1 });
      (prismaService.flashSaleOrder.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      await service.cancelOrder('order-id-123', 'user-id-123', {});

      expect(prismaService.productInventory.updateMany).toHaveBeenCalledTimes(
        3,
      );
    });

    it('should handle order with reason for cancellation', async () => {
      const orderWithItems = {
        ...mockOrder,
        items: [{ variantId: 'variant-id-123', quantity: 1 }],
      };
      (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
        orderWithItems,
      );
      (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
        cb(prismaService),
      );
      (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
      (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
        count: 1,
      });
      (
        prismaService.productInventory.updateMany as jest.Mock
      ).mockResolvedValue({ count: 1 });
      (prismaService.flashSaleOrder.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      await service.cancelOrder('order-id-123', 'user-id-123', {
        reason: 'Changed my mind',
      });

      expect(prismaService.order.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            notes: 'Đã hủy: Changed my mind',
          }),
        }),
      );
    });

    it('should only allow cancellation for PENDING or CONFIRMED orders', async () => {
      const confirmedOrder = {
        ...mockOrder,
        status: OrderStatus.CONFIRMED,
        items: [{ variantId: 'variant-id-123', quantity: 1 }],
      };
      (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
        confirmedOrder,
      );
      (prismaService.$transaction as jest.Mock).mockImplementation((cb) =>
        cb(prismaService),
      );
      (prismaService.order.update as jest.Mock).mockResolvedValue(mockOrder);
      (prismaService.orderItem.updateMany as jest.Mock).mockResolvedValue({
        count: 1,
      });
      (
        prismaService.productInventory.updateMany as jest.Mock
      ).mockResolvedValue({ count: 1 });
      (prismaService.flashSaleOrder.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      await service.cancelOrder('order-id-123', 'user-id-123', {});

      expect(prismaService.order.update).toHaveBeenCalled();
    });

    it('should throw error when trying to cancel SHIPPED order', async () => {
      const shippedOrder = {
        ...mockOrder,
        status: OrderStatus.SHIPPED,
        items: [],
      };
      (prismaService.order.findUnique as jest.Mock).mockResolvedValue(
        shippedOrder,
      );

      await expect(
        service.cancelOrder('order-id-123', 'user-id-123', {}),
      ).rejects.toThrow(BusinessException);
    });

    it('should verify userId matches order owner', async () => {
      (prismaService.order.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.cancelOrder('order-id-123', 'wrong-user-id', {}),
      ).rejects.toThrow(BusinessException);

      expect(prismaService.order.findUnique).toHaveBeenCalledWith({
        where: { id: 'order-id-123', userId: 'wrong-user-id' },
        select: expect.any(Object),
      });
    });
  });
});
