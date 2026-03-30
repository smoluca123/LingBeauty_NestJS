import { Prisma } from 'prisma/generated/prisma/client';
import { mediaSelect } from 'src/libs/prisma/media-select';

export const userRoleSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserRoleSelect;
export type UserRoleSelectType = Prisma.UserRoleGetPayload<{
  select: typeof userRoleSelect;
}>;

export const userRoleAssignmentsSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  roleId: true,
  role: {
    select: userRoleSelect,
  },
} satisfies Prisma.UserRoleAssignmentSelect;

export const userAvatarSelect = {
  id: true,
  mediaId: true,
  createdAt: true,
  updatedAt: true,
  media: {
    select: mediaSelect,
  },
} satisfies Prisma.UserAvatarSelect;

export type UserAvatarSelectType = Prisma.UserAvatarGetPayload<{
  select: typeof userAvatarSelect;
}>;

export const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  username: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  isVerified: true,
  isBanned: true,
  isEmailVerified: true,
  isPhoneVerified: true,
  emailVerifiedAt: true,
  phoneVerifiedAt: true,
  avatar: {
    select: userAvatarSelect,
  },
  roleAssignments: {
    select: userRoleAssignmentsSelect,
  },
} satisfies Prisma.UserSelect;

export type UserSelectType = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;
