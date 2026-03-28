import { Prisma } from 'prisma/generated/prisma/client';
import {
  productImageSelect,
  productSelect,
  productVariantSelect,
} from './product-select';

// // Simplified product select for wishlist items
// export const wishlistItemProductSelect = {
//   id: true,
//   name: true,
//   slug: true,
//   sku: true,
//   basePrice: true,
//   comparePrice: true,
//   isActive: true,
//   images: {
//     select: productImageSelect,
//     where: { isPrimary: true },
//     take: 1,
//   },
// } satisfies Prisma.ProductSelect;

// Full wishlist item select
export const wishlistItemSelect = {
  id: true,
  userId: true,
  productId: true,
  variantId: true,
  note: true,
  createdAt: true,
  updatedAt: true,
  product: {
    select: productSelect,
  },
  variant: {
    select: productVariantSelect,
  },
} satisfies Prisma.WishlistSelect;

export type WishlistItemSelect = Prisma.WishlistGetPayload<{
  select: typeof wishlistItemSelect;
}>;

// Shared wishlist select
export const sharedWishlistSelect = {
  id: true,
  userId: true,
  shareToken: true,
  title: true,
  description: true,
  isPublic: true,
  expiresAt: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.SharedWishlistSelect;

export type SharedWishlistSelect = Prisma.SharedWishlistGetPayload<{
  select: typeof sharedWishlistSelect;
}>;
