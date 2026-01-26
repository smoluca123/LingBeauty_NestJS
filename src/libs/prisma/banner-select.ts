import { Prisma } from 'prisma/generated/prisma/client';
import { mediaSelect } from './media-select';

export const bannerSelect = {
  id: true,
  type: true,
  position: true,
  badge: true,
  title: true,
  description: true,
  highlight: true,
  ctaText: true,
  ctaLink: true,
  subLabel: true,
  gradientFrom: true,
  gradientTo: true,
  imageMediaId: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  imageMedia: {
    select: mediaSelect,
  },
  groups: {
    select: {
      bannerGroupId: true,
    },
  },
} satisfies Prisma.BannerSelect;

export type BannerSelect = Prisma.BannerGetPayload<{
  select: typeof bannerSelect;
}>;

export const bannerGroupSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  isActive: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
  banners: {
    select: {
      id: true,
      bannerId: true,
      bannerGroupId: true,
      sortOrder: true,
      createdAt: true,
      banner: {
        select: bannerSelect,
      },
    },
    orderBy: {
      sortOrder: 'asc' as const,
    },
  },
} satisfies Prisma.BannerGroupSelect;

export type BannerGroupSelect = Prisma.BannerGroupGetPayload<{
  select: typeof bannerGroupSelect;
}>;
