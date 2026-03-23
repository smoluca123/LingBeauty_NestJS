import { Prisma } from 'prisma/generated/prisma/client';
import { productImageSelect } from './product-select';
import { userSelect } from './user-select';

export const questionSelect: Prisma.ProductQuestionSelect = {
  id: true,
  productId: true,
  userId: true,
  question: true,
  answer: true,
  answeredBy: true,
  status: true,
  isPublic: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
  answeredByUser: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
};

export const questionWithProductSelect: Prisma.ProductQuestionSelect = {
  ...questionSelect,
  product: {
    select: {
      id: true,
      name: true,
      slug: true,
      //   thumbnail: true,
      images: {
        select: productImageSelect,
      },
    },
  },
};

export const questionPublicSelect: Prisma.ProductQuestionSelect = {
  id: true,
  userId: true,
  productId: true,
  question: true,
  answer: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
  answeredByUser: {
    select: userSelect,
  },
};
