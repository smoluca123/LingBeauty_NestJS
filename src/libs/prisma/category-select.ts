import { Prisma } from 'prisma/generated/prisma/client';
import { brandSelect } from 'src/libs/prisma/brand-select';
import { mediaSelect } from 'src/libs/prisma/media-select';

export const categorySelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  imageMediaId: true,
  parentId: true,
  type: true,
  brand: {
    select: brandSelect,
  },
  isActive: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
  imageMedia: {
    select: mediaSelect,
  },
} satisfies Prisma.CategorySelect;

export type CategorySelect = Prisma.CategoryGetPayload<{
  select: typeof categorySelect;
}>;

export const categoryWithChildrenSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  imageMediaId: true,
  parentId: true,
  isActive: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
  imageMedia: {
    select: mediaSelect,
  },
  children: {
    select: categorySelect,
  },
} satisfies Prisma.CategorySelect;

export type CategoryWithChildrenSelect = Prisma.CategoryGetPayload<{
  select: typeof categoryWithChildrenSelect;
}>;

export const categoryTreeSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  imageMediaId: true,
  parentId: true,
  isActive: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
  imageMedia: {
    select: mediaSelect,
  },
  children: {
    select: categorySelect,
  },
} satisfies Prisma.CategorySelect;

export type CategoryTreeSelect = Prisma.CategoryGetPayload<{
  select: typeof categoryTreeSelect;
}>;
