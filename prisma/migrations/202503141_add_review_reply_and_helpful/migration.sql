-- Migration: Add ReviewReply and ReviewHelpful tables
-- Created: 2025-03-14

-- Create ReviewReply table
CREATE TABLE "review_replies" (
    "id" TEXT NOT NULL,
    "review_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_replies_pkey" PRIMARY KEY ("id")
);

-- Create ReviewHelpful table
CREATE TABLE "review_helpful" (
    "id" TEXT NOT NULL,
    "review_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_helpful" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_helpful_pkey" PRIMARY KEY ("id")
);

-- Create unique index for ReviewHelpful (one mark per user per review)
CREATE UNIQUE INDEX "review_helpful_review_id_user_id_key" ON "review_helpful"("review_id", "user_id");

-- Create indexes for ReviewReply
CREATE INDEX "review_replies_review_id_idx" ON "review_replies"("review_id");
CREATE INDEX "review_replies_user_id_idx" ON "review_replies"("user_id");

-- Create indexes for ReviewHelpful
CREATE INDEX "review_helpful_review_id_idx" ON "review_helpful"("review_id");
CREATE INDEX "review_helpful_user_id_idx" ON "review_helpful"("user_id");

-- Add foreign key constraints
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_review_id_fkey" 
    FOREIGN KEY ("review_id") REFERENCES "product_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "review_helpful" ADD CONSTRAINT "review_helpful_review_id_fkey" 
    FOREIGN KEY ("review_id") REFERENCES "product_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "review_helpful" ADD CONSTRAINT "review_helpful_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
