-- Add soft delete fields to product_questions table
ALTER TABLE "product_questions" ADD COLUMN "is_deleted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "product_questions" ADD COLUMN "deleted_at" TIMESTAMP(3);

-- Create index on is_deleted for query performance
CREATE INDEX "product_questions_is_deleted_idx" ON "product_questions"("is_deleted");
