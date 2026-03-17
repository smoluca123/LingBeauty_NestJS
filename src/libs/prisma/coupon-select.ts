import { Prisma } from 'prisma/generated/prisma/client';

export const couponSelect = Prisma.validator<Prisma.CouponSelect>()({
  id: true,
  code: true,
  type: true,
  value: true,
  minPurchase: true,
  maxDiscount: true,
  usageLimit: true,
  usedCount: true,
  startDate: true,
  endDate: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

export type CouponSelect = Prisma.CouponGetPayload<{
  select: typeof couponSelect;
}>;
