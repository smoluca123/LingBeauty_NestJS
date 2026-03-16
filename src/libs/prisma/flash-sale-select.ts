import { Prisma } from 'prisma/generated/prisma/client';
import { productSelect, productVariantSelect } from './product-select';

export const flashSaleProductSelect = {
  id: true,
  flashSaleId: true,
  productId: true,
  variantId: true,
  flashPrice: true,
  originalPrice: true,
  maxQuantity: true,
  soldQuantity: true,
  limitPerOrder: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  product: {
    select: productSelect,
  },
  variant: {
    select: productVariantSelect,
  },
} satisfies Prisma.FlashSaleProductSelect;

export const flashSaleSelect = {
  id: true,
  name: true,
  description: true,
  slug: true,
  banner: true,
  startTime: true,
  endTime: true,
  status: true,
  isActive: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
  products: {
    select: flashSaleProductSelect,
    orderBy: {
      sortOrder: 'asc' as const,
    },
  },
} satisfies Prisma.FlashSaleSelect;

export type FlashSaleSelect = Prisma.FlashSaleGetPayload<{
  select: typeof flashSaleSelect;
}>;

export type FlashSaleProductSelect = Prisma.FlashSaleProductGetPayload<{
  select: typeof flashSaleProductSelect;
}>;
