import { Prisma } from 'prisma/generated/prisma';
import { mediaSelect } from 'src/libs/prisma/media-select';
import { productSelect } from 'src/libs/prisma/product-select';
import { userSelect } from 'src/libs/prisma/user-select';

export const reviewImageSelect = {
  id: true,
  reviewId: true,
  mediaId: true,
  alt: true,
  createdAt: true,
  media: {
    select: mediaSelect,
  },
};

export type ReviewImageSelectType = Prisma.ReviewImageGetPayload<{
  select: typeof reviewImageSelect;
}>;

export const reviewImageWithProductSelect = {
  ...reviewImageSelect,
  product: {
    select: productSelect,
  },
};

export type ReviewImageWithProductSelectType = Prisma.ReviewImageGetPayload<{
  select: typeof reviewImageWithProductSelect;
}>;

export const reviewReplySelect = {
  id: true,
  reviewId: true,
  userId: true,
  content: true,
  isAdmin: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
} satisfies Prisma.ReviewReplySelect;

export type ReviewReplySelectType = Prisma.ReviewReplyGetPayload<{
  select: typeof reviewReplySelect;
}>;

export const reviewSelect = {
  id: true,
  productId: true,
  userId: true,
  rating: true,
  title: true,
  comment: true,
  isVerified: true,
  isApproved: true,
  helpfulCount: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
  reviewImages: {
    select: reviewImageSelect,
  },
  replies: {
    select: reviewReplySelect,
  },
};

export type ReviewSelectType = Prisma.ProductReviewGetPayload<{
  select: typeof reviewSelect;
}>;

export const reviewWithProductSelect = {
  ...reviewSelect,
  product: {
    select: productSelect,
  },
};

export type ReviewWithProductSelectType = Prisma.ProductReviewGetPayload<{
  select: typeof reviewWithProductSelect;
}>;

// Select for public reviews (without sensitive data)
export const reviewPublicSelect = {
  id: true,
  productId: true,
  userId: true,
  rating: true,
  title: true,
  comment: true,
  isVerified: true,
  helpfulCount: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
  reviewImages: {
    select: reviewImageSelect,
  },
  replies: {
    select: reviewReplySelect,
  },
};

export type ReviewPublicSelectType = Prisma.ProductReviewGetPayload<{
  select: typeof reviewPublicSelect;
}>;
