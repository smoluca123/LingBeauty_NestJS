import { Prisma } from 'prisma/generated/prisma';
import {
  productInventorySelect,
  productSummarySelect,
  variantSummarySelect,
} from 'src/libs/prisma/product-select';

/** Select shape for product-level inventory (variantId IS NULL) */
export const inventoryFullSelect = {
  ...productInventorySelect,
  product: {
    select: productSummarySelect,
  },
} satisfies Prisma.ProductInventorySelect;

/** Select shape for variant-level inventory (variantId IS NOT NULL) */
export const inventoryVariantFullSelect = {
  ...productInventorySelect,
  variant: {
    select: variantSummarySelect,
  },
  product: {
    select: productSummarySelect,
  },
} satisfies Prisma.ProductInventorySelect;
