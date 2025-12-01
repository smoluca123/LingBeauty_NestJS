import { Prisma } from 'prisma/generated/prisma/client';
import { mediaSelect } from 'src/libs/prisma/media-select';

export const userRoleSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserRoleSelect;
export type UserRoleSelectt = Prisma.UserRoleGetPayload<{
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
  roleAssignments: {
    select: userRoleAssignmentsSelect,
  },
} satisfies Prisma.UserSelect;

export type UserSelect = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;
