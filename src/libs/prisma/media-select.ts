import { Prisma } from 'prisma/generated/prisma/client';

export const mediaSelect = {
  id: true,
  url: true,
  type: true,
  mimetype: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.MediaSelect;

export type MediaSelect = Prisma.MediaGetPayload<{
  select: typeof mediaSelect;
}>;
