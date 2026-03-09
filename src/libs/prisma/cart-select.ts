import { Prisma } from 'prisma/generated/prisma/client';
import { mediaSelect } from './media-select';
import { productImageSelect } from './product-select';

// Select for cart item's product snapshot
export const cartItemProductSelect = {
  id: true,
  name: true,
  slug: true,
  sku: true,
  basePrice: true,
  comparePrice: true,
  isActive: true,
  images: {
    select: productImageSelect,
    orderBy: [{ isPrimary: 'desc' as const }, { sortOrder: 'asc' as const }],
    take: 1,
  },
  // Product-level inventory — used when cart item has no variant (no-variant products)
  inventory: {
    select: { quantity: true, displayStatus: true, minStockQuantity: true },
    where: { variantId: null },
    take: 1,
  },
} satisfies Prisma.ProductSelect;

// Select for cart item's variant snapshot
export const cartItemVariantSelect = {
  id: true,
  sku: true,
  name: true,
  color: true,
  size: true,
  type: true,
  price: true,
  inventory: {
    select: {
      quantity: true,
      displayStatus: true,
      minStockQuantity: true,
    },
  },
} satisfies Prisma.ProductVariantSelect;

// Full cart item select
export const cartItemSelect = {
  id: true,
  cartId: true,
  productId: true,
  variantId: true,
  quantity: true,
  createdAt: true,
  updatedAt: true,
  product: {
    select: cartItemProductSelect,
  },
  variant: {
    select: cartItemVariantSelect,
  },
} satisfies Prisma.CartItemSelect;

export type CartItemSelect = Prisma.CartItemGetPayload<{
  select: typeof cartItemSelect;
}>;

// Full cart select
export const cartSelect = {
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  items: {
    select: cartItemSelect,
    orderBy: { createdAt: 'desc' as const },
  },
} satisfies Prisma.CartSelect;

export type CartSelect = Prisma.CartGetPayload<{
  select: typeof cartSelect;
}>;
