import { Prisma } from 'prisma/generated/prisma/client';
import { mediaSelect } from 'src/libs/prisma/media-select';

export const brandSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  logoMediaId: true,
  website: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  logoMedia: {
    select: mediaSelect,
  },
} satisfies Prisma.BrandSelect;

export type BrandSelect = Prisma.BrandGetPayload<{
  select: typeof brandSelect;
}>;
