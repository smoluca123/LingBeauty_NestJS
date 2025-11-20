import { Prisma } from 'prisma/generated/prisma/client';
import { mediaSelect } from 'src/libs/prisma/media-select';

export const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  username: true,
  avatarMediaId: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  isVerified: true,
  isBanned: true,
  isDeleted: true,
  isEmailVerified: true,
  isPhoneVerified: true,
  emailVerifiedAt: true,
  phoneVerifiedAt: true,
  avatarMedia: {
    select: mediaSelect,
  },
} satisfies Prisma.UserSelect;

export type UserSelect = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;
