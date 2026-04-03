import { Prisma } from 'prisma/generated/prisma/client';
import { userSelect } from './user-select';

export const blogCommentSelect = {
  id: true,
  postId: true,
  userId: true,
  parentId: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
} satisfies Prisma.BlogCommentSelect;

export const blogCommentWithRepliesSelect = {
  ...blogCommentSelect,
  replies: {
    select: blogCommentSelect,
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: 'asc' as const,
    },
  },
} satisfies Prisma.BlogCommentSelect;

export const commentReportSelect = {
  id: true,
  commentId: true,
  reporterId: true,
  reason: true,
  description: true,
  status: true,
  reviewedBy: true,
  reviewedAt: true,
  createdAt: true,
  updatedAt: true,
  reporter: {
    select: userSelect,
  },
  reviewer: {
    select: userSelect,
  },
  comment: {
    select: {
      id: true,
      content: true,
      postId: true,
    },
  },
} satisfies Prisma.BlogCommentReportSelect;

export type BlogCommentSelectType = Prisma.BlogCommentGetPayload<{
  select: typeof blogCommentSelect;
}>;

export type BlogCommentWithRepliesSelectType = Prisma.BlogCommentGetPayload<{
  select: typeof blogCommentWithRepliesSelect;
}>;

export type CommentReportSelectType = Prisma.BlogCommentReportGetPayload<{
  select: typeof commentReportSelect;
}>;
