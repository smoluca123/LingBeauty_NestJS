import { Prisma } from 'prisma/generated/prisma/client';
import { mediaSelect } from 'src/libs/prisma/media-select';
import { userSelect } from 'src/libs/prisma/user-select';

export const blogTopicSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  parentId: true,
  imageMediaId: true,
  isActive: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
  imageMedia: {
    select: mediaSelect,
  },
  children: {
    where: { isDeleted: false },
    select: {
      id: true,
      name: true,
      slug: true,
      sortOrder: true,
    },
  },
} satisfies Prisma.BlogTopicSelect;

export type BlogTopicSelect = Prisma.BlogTopicGetPayload<{
  select: typeof blogTopicSelect;
}>;

export const blogPostSelect = {
  id: true,
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  topicId: true,
  authorId: true,
  featuredImageId: true,
  status: true,
  tags: true,
  viewCount: true,
  metaTitle: true,
  metaDescription: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  topic: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  author: {
    select: userSelect,
  },
  featuredImage: {
    select: mediaSelect,
  },
} satisfies Prisma.BlogPostSelect;

export type BlogPostSelect = Prisma.BlogPostGetPayload<{
  select: typeof blogPostSelect;
}>;
