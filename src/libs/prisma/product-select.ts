import { Prisma } from 'prisma/generated/prisma/client';
import { brandSelect } from 'src/libs/prisma/brand-select';
import { categorySelect } from 'src/libs/prisma/category-select';
import { mediaSelect } from 'src/libs/prisma/media-select';

export const productInventorySelect = {
  id: true,
  productId: true,
  variantId: true,
  quantity: true,
  displayStatus: true,
  lowStockThreshold: true,
  minStockQuantity: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProductInventorySelect;

export type ProductInventory = Prisma.ProductInventoryGetPayload<{
  select: typeof productInventorySelect;
}>;

export const productImageSelect = {
  id: true,
  productId: true,
  variantId: true,
  mediaId: true,
  alt: true,
  sortOrder: true,
  isPrimary: true,
  media: {
    select: mediaSelect,
  },
} satisfies Prisma.ProductImageSelect;

export type ProductImage = Prisma.ProductImageGetPayload<{
  select: typeof productImageSelect;
}>;

// Minimal variant info for embedding in inventory/order responses
export const variantSummarySelect = {
  id: true,
  sku: true,
  name: true,
  color: true,
  size: true,
  type: true,
  price: true,
  displayType: true,
  images: {
    select: productImageSelect,
    orderBy: [{ isPrimary: 'desc' as const }, { sortOrder: 'asc' as const }],
    take: 1,
  },
} satisfies Prisma.ProductVariantSelect;

export type VariantSummary = Prisma.ProductVariantGetPayload<{
  select: typeof variantSummarySelect;
}>;

export const productVariantSelect = {
  id: true,
  sku: true,
  name: true,
  color: true,
  size: true,
  type: true,
  price: true,
  sortOrder: true,
  displayType: true,
  inventory: {
    select: productInventorySelect,
  },
  images: {
    select: productImageSelect,
    orderBy: [{ isPrimary: 'desc' as const }, { sortOrder: 'asc' as const }],
  },
} satisfies Prisma.ProductVariantSelect;

export type ProductVariantSelect = Prisma.ProductVariantGetPayload<{
  select: typeof productVariantSelect;
}>;

export const productBadgeSelect = {
  id: true,
  productId: true,
  name: true,
  sortOrder: true,
  isActive: true,
  variant: true,
  type: true,
} satisfies Prisma.ProductBadgeSelect;

export type ProductBadge = Prisma.ProductBadgeGetPayload<{
  select: typeof productBadgeSelect;
}>;

export const productStatsSelect = {
  totalSold: true,
  totalRevenue: true,
  avgRating: true,
  reviewCount: true,
  viewCount: true,
  lastSoldAt: true,
} satisfies Prisma.ProductStatsSelect;

export type ProductStatsSelect = Prisma.ProductStatsGetPayload<{
  select: typeof productStatsSelect;
}>;

// Minimal product info for embedding in inventory/variant responses
export const productSummarySelect = {
  id: true,
  name: true,
  slug: true,
  sku: true,
  basePrice: true,
  comparePrice: true,
  isActive: true,
  brand: {
    select: brandSelect,
  },
  images: {
    select: productImageSelect,
    orderBy: [{ isPrimary: 'desc' as const }, { sortOrder: 'asc' as const }],
    take: 1,
  },
} satisfies Prisma.ProductSelect;

export type ProductSummary = Prisma.ProductGetPayload<{
  select: typeof productSummarySelect;
}>;

export const productSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  shortDesc: true,
  sku: true,
  brandId: true,
  basePrice: true,
  comparePrice: true,
  isActive: true,
  isFeatured: true,
  weight: true,
  metaTitle: true,
  metaDesc: true,
  createdAt: true,
  updatedAt: true,
  productCategories: {
    select: {
      category: {
        select: categorySelect,
      },
    },
  },
  brand: {
    select: brandSelect,
  },
  images: {
    select: productImageSelect,
    orderBy: [{ isPrimary: 'desc' as const }, { sortOrder: 'asc' as const }],
  },
  variants: {
    select: productVariantSelect,
    orderBy: {
      sortOrder: 'asc' as const,
    },
  },
  badges: {
    select: productBadgeSelect,
    orderBy: {
      sortOrder: 'asc' as const,
    },
  },
  stats: {
    select: productStatsSelect,
  },
  // Product-level inventory (for products without variants)
  inventory: {
    select: productInventorySelect,
    where: { variantId: null },
    take: 1,
  },
} satisfies Prisma.ProductSelect;

export type ProductSelect = Prisma.ProductGetPayload<{
  select: typeof productSelect;
}>;

// Simplified select for list view (without variants details)
export const productListSelect = {
  ...productSelect,
  // productCategories: {
  //   select: {
  //     category: {
  //       select: categorySelect,
  //     },
  //   },
  // },
  // brand: {
  //   select: brandSelect,
  // },
  // images: {
  //   select: productImageSelect,
  //   orderBy: {
  //     sortOrder: 'asc' as const,
  //   },
  //   // where: {
  //   //   isPrimary: true,
  //   // },
  //   // take: 1,
  // },
  // variants: {
  //   select: productVariantSelect,
  // },
} satisfies Prisma.ProductSelect;

export type ProductListSelect = Prisma.ProductGetPayload<{
  select: typeof productListSelect;
}>;
