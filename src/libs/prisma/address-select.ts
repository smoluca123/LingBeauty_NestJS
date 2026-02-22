import { Prisma } from 'prisma/generated/prisma';

export const addressSelect = {
  id: true,
  userId: true,
  fullName: true,
  phone: true,
  province: true,
  city: true,
  country: true,
  postalCode: true,
  addressLine1: true,
  addressLine2: true,
  isDefault: true,
  createdAt: true,
  updatedAt: true,
  type: true,
} satisfies Prisma.AddressSelect;

export type AddressSelect = Prisma.AddressGetPayload<{
  select: typeof addressSelect;
}>;
