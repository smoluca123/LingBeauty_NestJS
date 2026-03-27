import { Prisma } from 'prisma/generated/prisma/client';
import { userSelect } from './user-select';
import { productSelect, productVariantSelect } from './product-select';
import { addressSelect } from './address-select';

// Select for order item
export const orderItemSelect = {
  id: true,
  orderId: true,
  productId: true,
  variantId: true,
  name: true,
  sku: true,
  price: true,
  quantity: true,
  total: true,
  createdAt: true,
  product: {
    select: productSelect,
  },
  variant: {
    select: productVariantSelect,
  },
} satisfies Prisma.OrderItemSelect;

export type OrderItemSelectType = Prisma.OrderItemGetPayload<{
  select: typeof orderItemSelect;
}>;

// Select for payment
export const orderPaymentSelect = {
  id: true,
  orderId: true,
  method: true,
  amount: true,
  status: true,
  transactionId: true,
  paidAt: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PaymentSelect;

export type OrderPaymentSelectType = Prisma.PaymentGetPayload<{
  select: typeof orderPaymentSelect;
}>;

// Full order select
export const orderSelect = {
  id: true,
  userId: true,
  orderNumber: true,
  status: true,
  subtotal: true,
  tax: true,
  shipping: true,
  discount: true,
  total: true,
  shippingAddressId: true,
  affiliateCode: true,
  couponCode: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
  shippingAddress: {
    select: addressSelect,
  },
  items: {
    select: orderItemSelect,
    orderBy: { createdAt: 'asc' as const },
  },
  payments: {
    select: orderPaymentSelect,
    orderBy: { createdAt: 'desc' as const },
  },
} satisfies Prisma.OrderSelect;

export type OrderSelectType = Prisma.OrderGetPayload<{
  select: typeof orderSelect;
}>;

// Minimal order select for list views
export const orderListSelect = {
  id: true,
  userId: true,
  orderNumber: true,
  status: true,
  total: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  },
  items: {
    select: {
      id: true,
      quantity: true,
    },
  },
} satisfies Prisma.OrderSelect;

export type OrderListSelectType = Prisma.OrderGetPayload<{
  select: typeof orderListSelect;
}>;
