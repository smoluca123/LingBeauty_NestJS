/*
 Navicat Premium Data Transfer

 Source Server         : lingbeauty
 Source Server Type    : PostgreSQL
 Source Server Version : 170006 (170006)
 Source Host           : primary.lingbeauty--qjr8p8k7zs4l.addon.code.run:29615
 Source Catalog        : _ad28d54ceb16
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170006 (170006)
 File Encoding         : 65001

 Date: 29/03/2026 01:40:30
*/


-- ----------------------------
-- Type structure for AddressType
-- ----------------------------
DROP TYPE IF EXISTS "public"."AddressType";
CREATE TYPE "public"."AddressType" AS ENUM (
  'HOME',
  'OFFICE',
  'OTHER'
);
ALTER TYPE "public"."AddressType" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for BannerPosition
-- ----------------------------
DROP TYPE IF EXISTS "public"."BannerPosition";
CREATE TYPE "public"."BannerPosition" AS ENUM (
  'MAIN_CAROUSEL',
  'SIDE_TOP',
  'SIDE_BOTTOM'
);
ALTER TYPE "public"."BannerPosition" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for BannerType
-- ----------------------------
DROP TYPE IF EXISTS "public"."BannerType";
CREATE TYPE "public"."BannerType" AS ENUM (
  'TEXT',
  'IMAGE'
);
ALTER TYPE "public"."BannerType" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for CateGoryType
-- ----------------------------
DROP TYPE IF EXISTS "public"."CateGoryType";
CREATE TYPE "public"."CateGoryType" AS ENUM (
  'BRAND',
  'CATEGORY'
);
ALTER TYPE "public"."CateGoryType" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for EmailVerificationAction
-- ----------------------------
DROP TYPE IF EXISTS "public"."EmailVerificationAction";
CREATE TYPE "public"."EmailVerificationAction" AS ENUM (
  'SEND_OTP',
  'RESEND_OTP',
  'VERIFY_SUCCESS',
  'VERIFY_FAILED',
  'RATE_LIMITED'
);
ALTER TYPE "public"."EmailVerificationAction" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for FlashSaleStatus
-- ----------------------------
DROP TYPE IF EXISTS "public"."FlashSaleStatus";
CREATE TYPE "public"."FlashSaleStatus" AS ENUM (
  'UPCOMING',
  'ACTIVE',
  'ENDED',
  'CANCELLED'
);
ALTER TYPE "public"."FlashSaleStatus" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for MediaType
-- ----------------------------
DROP TYPE IF EXISTS "public"."MediaType";
CREATE TYPE "public"."MediaType" AS ENUM (
  'PRODUCT_IMAGE',
  'PRODUCT_VIDEO',
  'REVIEW_IMAGE',
  'REVIEW_VIDEO',
  'AVATAR',
  'CATEGORY_IMAGE',
  'BRAND_LOGO',
  'BANNER_IMAGE',
  'GENERAL_IMAGE'
);
ALTER TYPE "public"."MediaType" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for OrderStatus
-- ----------------------------
DROP TYPE IF EXISTS "public"."OrderStatus";
CREATE TYPE "public"."OrderStatus" AS ENUM (
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED'
);
ALTER TYPE "public"."OrderStatus" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for PaymentMethod
-- ----------------------------
DROP TYPE IF EXISTS "public"."PaymentMethod";
CREATE TYPE "public"."PaymentMethod" AS ENUM (
  'COD',
  'BANK_TRANSFER',
  'CREDIT_CARD',
  'E_WALLET',
  'MOMO',
  'ZALOPAY'
);
ALTER TYPE "public"."PaymentMethod" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for PaymentStatus
-- ----------------------------
DROP TYPE IF EXISTS "public"."PaymentStatus";
CREATE TYPE "public"."PaymentStatus" AS ENUM (
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
  'REFUNDED'
);
ALTER TYPE "public"."PaymentStatus" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for ProductBadgeType
-- ----------------------------
DROP TYPE IF EXISTS "public"."ProductBadgeType";
CREATE TYPE "public"."ProductBadgeType" AS ENUM (
  'NEW',
  'SALE',
  'BEST_SELLER',
  'FREESHIPPING'
);
ALTER TYPE "public"."ProductBadgeType" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for ProductBadgeVariant
-- ----------------------------
DROP TYPE IF EXISTS "public"."ProductBadgeVariant";
CREATE TYPE "public"."ProductBadgeVariant" AS ENUM (
  'PRIMARY',
  'INFO',
  'NEUTRAL'
);
ALTER TYPE "public"."ProductBadgeVariant" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for ProductInventoryDisplayStatus
-- ----------------------------
DROP TYPE IF EXISTS "public"."ProductInventoryDisplayStatus";
CREATE TYPE "public"."ProductInventoryDisplayStatus" AS ENUM (
  'IN_STOCK',
  'OUT_OF_STOCK'
);
ALTER TYPE "public"."ProductInventoryDisplayStatus" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for ProductQuestionStatus
-- ----------------------------
DROP TYPE IF EXISTS "public"."ProductQuestionStatus";
CREATE TYPE "public"."ProductQuestionStatus" AS ENUM (
  'PENDING',
  'ANSWERED'
);
ALTER TYPE "public"."ProductQuestionStatus" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for RoleName
-- ----------------------------
DROP TYPE IF EXISTS "public"."RoleName";
CREATE TYPE "public"."RoleName" AS ENUM (
  'CLIENT',
  'COLLABORATOR',
  'AGENCY',
  'ADMINISTRATOR'
);
ALTER TYPE "public"."RoleName" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for VariantDisplayType
-- ----------------------------
DROP TYPE IF EXISTS "public"."VariantDisplayType";
CREATE TYPE "public"."VariantDisplayType" AS ENUM (
  'COLOR',
  'IMAGE'
);
ALTER TYPE "public"."VariantDisplayType" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Table structure for addresses
-- ----------------------------
DROP TABLE IF EXISTS "public"."addresses";
CREATE TABLE "public"."addresses" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "full_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "address_line1" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "address_line2" varchar(255) COLLATE "pg_catalog"."default",
  "city" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "province" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "postal_code" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "country" varchar(100) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'Vietnam'::character varying,
  "is_default" bool NOT NULL DEFAULT false,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "type" "public"."AddressType" NOT NULL DEFAULT 'HOME'::"AddressType"
)
;

-- ----------------------------
-- Table structure for affiliate_commissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."affiliate_commissions";
CREATE TABLE "public"."affiliate_commissions" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "affiliate_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "order_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "amount" numeric(10,2) NOT NULL,
  "rate" numeric(5,2) NOT NULL,
  "status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'pending'::character varying,
  "paid_at" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for affiliate_links
-- ----------------------------
DROP TABLE IF EXISTS "public"."affiliate_links";
CREATE TABLE "public"."affiliate_links" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "affiliate_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default",
  "url" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "clicks" int4 NOT NULL DEFAULT 0,
  "conversions" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for affiliates
-- ----------------------------
DROP TABLE IF EXISTS "public"."affiliates";
CREATE TABLE "public"."affiliates" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'pending'::character varying,
  "total_earnings" numeric(10,2) NOT NULL DEFAULT 0,
  "paid_earnings" numeric(10,2) NOT NULL DEFAULT 0,
  "pending_earnings" numeric(10,2) NOT NULL DEFAULT 0,
  "bank_account" varchar(255) COLLATE "pg_catalog"."default",
  "bank_name" varchar(255) COLLATE "pg_catalog"."default",
  "account_holder" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for auth_codes
-- ----------------------------
DROP TABLE IF EXISTS "public"."auth_codes";
CREATE TABLE "public"."auth_codes" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "auth_code" text COLLATE "pg_catalog"."default",
  "role_level" int4 DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for banner_group_mappings
-- ----------------------------
DROP TABLE IF EXISTS "public"."banner_group_mappings";
CREATE TABLE "public"."banner_group_mappings" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "banner_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "banner_group_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "sort_order" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for banner_groups
-- ----------------------------
DROP TABLE IF EXISTS "public"."banner_groups";
CREATE TABLE "public"."banner_groups" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "slug" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "is_active" bool NOT NULL DEFAULT true,
  "start_date" timestamp(3),
  "end_date" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for banners
-- ----------------------------
DROP TABLE IF EXISTS "public"."banners";
CREATE TABLE "public"."banners" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "type" "public"."BannerType" NOT NULL DEFAULT 'TEXT'::"BannerType",
  "position" "public"."BannerPosition" NOT NULL DEFAULT 'MAIN_CAROUSEL'::"BannerPosition",
  "badge" varchar(100) COLLATE "pg_catalog"."default",
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "highlight" varchar(255) COLLATE "pg_catalog"."default",
  "cta_text" varchar(100) COLLATE "pg_catalog"."default",
  "cta_link" varchar(500) COLLATE "pg_catalog"."default",
  "sub_label" varchar(255) COLLATE "pg_catalog"."default",
  "image_media_id" text COLLATE "pg_catalog"."default",
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "gradient_from" varchar(50) COLLATE "pg_catalog"."default",
  "gradient_to" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for brands
-- ----------------------------
DROP TABLE IF EXISTS "public"."brands";
CREATE TABLE "public"."brands" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "slug" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "website" varchar(500) COLLATE "pg_catalog"."default",
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "logo_media_id" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for cart_items
-- ----------------------------
DROP TABLE IF EXISTS "public"."cart_items";
CREATE TABLE "public"."cart_items" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "cart_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default",
  "quantity" int4 NOT NULL DEFAULT 1,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS "public"."carts";
CREATE TABLE "public"."carts" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "slug" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "parent_id" text COLLATE "pg_catalog"."default",
  "is_active" bool NOT NULL DEFAULT true,
  "sort_order" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "image_media_id" text COLLATE "pg_catalog"."default",
  "type" "public"."CateGoryType" NOT NULL DEFAULT 'CATEGORY'::"CateGoryType",
  "brand_id" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for commission_rates
-- ----------------------------
DROP TABLE IF EXISTS "public"."commission_rates";
CREATE TABLE "public"."commission_rates" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default",
  "category_id" text COLLATE "pg_catalog"."default",
  "rate" numeric(5,2) NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for coupon_usages
-- ----------------------------
DROP TABLE IF EXISTS "public"."coupon_usages";
CREATE TABLE "public"."coupon_usages" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "coupon_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "order_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "discount" numeric(10,2) NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for coupons
-- ----------------------------
DROP TABLE IF EXISTS "public"."coupons";
CREATE TABLE "public"."coupons" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "value" numeric(10,2) NOT NULL,
  "min_purchase" numeric(10,2),
  "max_discount" numeric(10,2),
  "usage_limit" int4,
  "used_count" int4 NOT NULL DEFAULT 0,
  "start_date" timestamp(3) NOT NULL,
  "end_date" timestamp(3) NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for daily_stats
-- ----------------------------
DROP TABLE IF EXISTS "public"."daily_stats";
CREATE TABLE "public"."daily_stats" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "date" date NOT NULL,
  "new_users" int4 NOT NULL DEFAULT 0,
  "active_users" int4 NOT NULL DEFAULT 0,
  "total_users" int4 NOT NULL DEFAULT 0,
  "total_orders" int4 NOT NULL DEFAULT 0,
  "confirmed_orders" int4 NOT NULL DEFAULT 0,
  "cancelled_orders" int4 NOT NULL DEFAULT 0,
  "delivered_orders" int4 NOT NULL DEFAULT 0,
  "revenue" numeric(15,2) NOT NULL DEFAULT 0,
  "total_products" int4 NOT NULL DEFAULT 0,
  "new_products" int4 NOT NULL DEFAULT 0,
  "total_items_sold" int4 NOT NULL DEFAULT 0,
  "new_reviews" int4 NOT NULL DEFAULT 0,
  "approved_reviews" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for email_verification_logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."email_verification_logs";
CREATE TABLE "public"."email_verification_logs" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "action" "public"."EmailVerificationAction" NOT NULL,
  "ip_address" varchar(45) COLLATE "pg_catalog"."default",
  "user_agent" text COLLATE "pg_catalog"."default",
  "metadata" jsonb,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for flash_sale_orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."flash_sale_orders";
CREATE TABLE "public"."flash_sale_orders" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "flash_sale_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "order_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for flash_sale_products
-- ----------------------------
DROP TABLE IF EXISTS "public"."flash_sale_products";
CREATE TABLE "public"."flash_sale_products" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "flash_sale_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "flash_price" numeric(10,2) NOT NULL,
  "original_price" numeric(10,2) NOT NULL,
  "max_quantity" int4 NOT NULL,
  "sold_quantity" int4 NOT NULL DEFAULT 0,
  "limit_per_order" int4 NOT NULL DEFAULT 1,
  "sort_order" int4 NOT NULL DEFAULT 0,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for flash_sales
-- ----------------------------
DROP TABLE IF EXISTS "public"."flash_sales";
CREATE TABLE "public"."flash_sales" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "slug" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "banner" varchar(500) COLLATE "pg_catalog"."default",
  "start_time" timestamp(3) NOT NULL,
  "end_time" timestamp(3) NOT NULL,
  "status" "public"."FlashSaleStatus" NOT NULL DEFAULT 'UPCOMING'::"FlashSaleStatus",
  "is_active" bool NOT NULL DEFAULT true,
  "sort_order" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for media
-- ----------------------------
DROP TABLE IF EXISTS "public"."media";
CREATE TABLE "public"."media" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "url" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "key" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "filename" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mimetype" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "size" int4 NOT NULL,
  "type" "public"."MediaType" NOT NULL,
  "uploaded_by_id" text COLLATE "pg_catalog"."default",
  "is_deleted" bool NOT NULL DEFAULT false,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_items";
CREATE TABLE "public"."order_items" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "order_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "sku" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "price" numeric(10,2) NOT NULL,
  "quantity" int4 NOT NULL DEFAULT 1,
  "total" numeric(10,2) NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."orders";
CREATE TABLE "public"."orders" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "order_number" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING'::"OrderStatus",
  "subtotal" numeric(10,2) NOT NULL,
  "tax" numeric(10,2) NOT NULL DEFAULT 0,
  "shipping" numeric(10,2) NOT NULL DEFAULT 0,
  "discount" numeric(10,2) NOT NULL DEFAULT 0,
  "total" numeric(10,2) NOT NULL,
  "shipping_address_id" text COLLATE "pg_catalog"."default",
  "affiliate_code" varchar(50) COLLATE "pg_catalog"."default",
  "coupon_code" varchar(50) COLLATE "pg_catalog"."default",
  "notes" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS "public"."payments";
CREATE TABLE "public"."payments" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "order_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "method" "public"."PaymentMethod" NOT NULL,
  "amount" numeric(10,2) NOT NULL,
  "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING'::"PaymentStatus",
  "transaction_id" varchar(255) COLLATE "pg_catalog"."default",
  "payment_data" text COLLATE "pg_catalog"."default",
  "paid_at" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for product_badges
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_badges";
CREATE TABLE "public"."product_badges" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "sort_order" int4 NOT NULL DEFAULT 0,
  "is_active" bool NOT NULL DEFAULT true,
  "variant" "public"."ProductBadgeVariant" NOT NULL DEFAULT 'INFO'::"ProductBadgeVariant",
  "type" "public"."ProductBadgeType" NOT NULL DEFAULT 'NEW'::"ProductBadgeType",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for product_categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_categories";
CREATE TABLE "public"."product_categories" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "category_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for product_images
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_images";
CREATE TABLE "public"."product_images" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "alt" varchar(255) COLLATE "pg_catalog"."default",
  "sort_order" int4 NOT NULL DEFAULT 0,
  "is_primary" bool NOT NULL DEFAULT false,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "media_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for product_inventory
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_inventory";
CREATE TABLE "public"."product_inventory" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default",
  "quantity" int4 NOT NULL DEFAULT 0,
  "low_stock_threshold" int4 NOT NULL DEFAULT 10,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "display_status" "public"."ProductInventoryDisplayStatus" NOT NULL DEFAULT 'IN_STOCK'::"ProductInventoryDisplayStatus",
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "min_stock_quantity" int4 NOT NULL DEFAULT '-10'::integer
)
;

-- ----------------------------
-- Table structure for product_questions
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_questions";
CREATE TABLE "public"."product_questions" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "question" text COLLATE "pg_catalog"."default" NOT NULL,
  "answer" text COLLATE "pg_catalog"."default",
  "answered_by" text COLLATE "pg_catalog"."default",
  "status" "public"."ProductQuestionStatus" NOT NULL DEFAULT 'PENDING'::"ProductQuestionStatus",
  "is_public" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for product_reviews
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_reviews";
CREATE TABLE "public"."product_reviews" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "rating" int2 NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "comment" text COLLATE "pg_catalog"."default",
  "is_verified" bool NOT NULL DEFAULT false,
  "is_approved" bool NOT NULL DEFAULT false,
  "helpful_count" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for product_stats
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_stats";
CREATE TABLE "public"."product_stats" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "total_sold" int4 NOT NULL DEFAULT 0,
  "total_revenue" numeric(15,2) NOT NULL DEFAULT 0,
  "avg_rating" numeric(3,2),
  "review_count" int4 NOT NULL DEFAULT 0,
  "view_count" int4 NOT NULL DEFAULT 0,
  "last_sold_at" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for product_variants
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_variants";
CREATE TABLE "public"."product_variants" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "sku" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "color" varchar(100) COLLATE "pg_catalog"."default",
  "size" varchar(100) COLLATE "pg_catalog"."default",
  "type" varchar(100) COLLATE "pg_catalog"."default",
  "price" numeric(10,2) NOT NULL,
  "sort_order" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "display_type" "public"."VariantDisplayType" NOT NULL DEFAULT 'COLOR'::"VariantDisplayType"
)
;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS "public"."products";
CREATE TABLE "public"."products" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "slug" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "short_desc" varchar(500) COLLATE "pg_catalog"."default",
  "sku" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "brand_id" text COLLATE "pg_catalog"."default",
  "base_price" numeric(10,2) NOT NULL,
  "compare_price" numeric(10,2),
  "is_active" bool NOT NULL DEFAULT true,
  "is_featured" bool NOT NULL DEFAULT false,
  "weight" numeric(8,2),
  "meta_title" varchar(255) COLLATE "pg_catalog"."default",
  "meta_desc" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for promotion_products
-- ----------------------------
DROP TABLE IF EXISTS "public"."promotion_products";
CREATE TABLE "public"."promotion_products" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "promotion_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for promotions
-- ----------------------------
DROP TABLE IF EXISTS "public"."promotions";
CREATE TABLE "public"."promotions" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "value" numeric(10,2) NOT NULL,
  "min_purchase" numeric(10,2),
  "max_discount" numeric(10,2),
  "start_date" timestamp(3) NOT NULL,
  "end_date" timestamp(3) NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for review_helpful
-- ----------------------------
DROP TABLE IF EXISTS "public"."review_helpful";
CREATE TABLE "public"."review_helpful" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "review_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "is_helpful" bool NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Table structure for review_images
-- ----------------------------
DROP TABLE IF EXISTS "public"."review_images";
CREATE TABLE "public"."review_images" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "review_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "alt" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "media_id" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for review_replies
-- ----------------------------
DROP TABLE IF EXISTS "public"."review_replies";
CREATE TABLE "public"."review_replies" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "review_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "is_admin" bool NOT NULL DEFAULT false,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for shared_wishlists
-- ----------------------------
DROP TABLE IF EXISTS "public"."shared_wishlists";
CREATE TABLE "public"."shared_wishlists" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "share_token" text COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "is_public" bool NOT NULL DEFAULT false,
  "expires_at" timestamp(3),
  "view_count" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for user_role_assignments
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_role_assignments";
CREATE TABLE "public"."user_role_assignments" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "role_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles";
CREATE TABLE "public"."user_roles" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "name" "public"."RoleName" NOT NULL DEFAULT 'CLIENT'::"RoleName"
)
;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "email" text COLLATE "pg_catalog"."default" NOT NULL,
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "last_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone" text COLLATE "pg_catalog"."default" NOT NULL,
  "username" text COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "email_verified_at" timestamp(3),
  "is_active" bool NOT NULL DEFAULT true,
  "is_banned" bool NOT NULL DEFAULT false,
  "is_deleted" bool NOT NULL DEFAULT false,
  "is_email_verified" bool NOT NULL DEFAULT false,
  "is_phone_verified" bool NOT NULL DEFAULT false,
  "is_verified" bool NOT NULL DEFAULT false,
  "phone_verified_at" timestamp(3),
  "refresh_token" text COLLATE "pg_catalog"."default",
  "avatar_media_id" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for wishlists
-- ----------------------------
DROP TABLE IF EXISTS "public"."wishlists";
CREATE TABLE "public"."wishlists" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default",
  "note" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Function structure for pg_stat_kcache
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pg_stat_kcache"(OUT "queryid" int8, OUT "top" bool, OUT "userid" oid, OUT "dbid" oid, OUT "plan_reads" int8, OUT "plan_writes" int8, OUT "plan_user_time" float8, OUT "plan_system_time" float8, OUT "plan_minflts" int8, OUT "plan_majflts" int8, OUT "plan_nswaps" int8, OUT "plan_msgsnds" int8, OUT "plan_msgrcvs" int8, OUT "plan_nsignals" int8, OUT "plan_nvcsws" int8, OUT "plan_nivcsws" int8, OUT "exec_reads" int8, OUT "exec_writes" int8, OUT "exec_user_time" float8, OUT "exec_system_time" float8, OUT "exec_minflts" int8, OUT "exec_majflts" int8, OUT "exec_nswaps" int8, OUT "exec_msgsnds" int8, OUT "exec_msgrcvs" int8, OUT "exec_nsignals" int8, OUT "exec_nvcsws" int8, OUT "exec_nivcsws" int8, OUT "stats_since" timestamptz);
CREATE OR REPLACE FUNCTION "public"."pg_stat_kcache"(OUT "queryid" int8, OUT "top" bool, OUT "userid" oid, OUT "dbid" oid, OUT "plan_reads" int8, OUT "plan_writes" int8, OUT "plan_user_time" float8, OUT "plan_system_time" float8, OUT "plan_minflts" int8, OUT "plan_majflts" int8, OUT "plan_nswaps" int8, OUT "plan_msgsnds" int8, OUT "plan_msgrcvs" int8, OUT "plan_nsignals" int8, OUT "plan_nvcsws" int8, OUT "plan_nivcsws" int8, OUT "exec_reads" int8, OUT "exec_writes" int8, OUT "exec_user_time" float8, OUT "exec_system_time" float8, OUT "exec_minflts" int8, OUT "exec_majflts" int8, OUT "exec_nswaps" int8, OUT "exec_msgsnds" int8, OUT "exec_msgrcvs" int8, OUT "exec_nsignals" int8, OUT "exec_nvcsws" int8, OUT "exec_nivcsws" int8, OUT "stats_since" timestamptz)
  RETURNS SETOF "pg_catalog"."record" AS '$libdir/pg_stat_kcache', 'pg_stat_kcache_2_3'
  LANGUAGE c VOLATILE
  COST 1000
  ROWS 1000;

-- ----------------------------
-- Function structure for pg_stat_kcache_reset
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pg_stat_kcache_reset"();
CREATE OR REPLACE FUNCTION "public"."pg_stat_kcache_reset"()
  RETURNS "pg_catalog"."void" AS '$libdir/pg_stat_kcache', 'pg_stat_kcache_reset'
  LANGUAGE c VOLATILE
  COST 1000;

-- ----------------------------
-- Function structure for pg_stat_statements
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pg_stat_statements"("showtext" bool, OUT "userid" oid, OUT "dbid" oid, OUT "toplevel" bool, OUT "queryid" int8, OUT "query" text, OUT "plans" int8, OUT "total_plan_time" float8, OUT "min_plan_time" float8, OUT "max_plan_time" float8, OUT "mean_plan_time" float8, OUT "stddev_plan_time" float8, OUT "calls" int8, OUT "total_exec_time" float8, OUT "min_exec_time" float8, OUT "max_exec_time" float8, OUT "mean_exec_time" float8, OUT "stddev_exec_time" float8, OUT "rows" int8, OUT "shared_blks_hit" int8, OUT "shared_blks_read" int8, OUT "shared_blks_dirtied" int8, OUT "shared_blks_written" int8, OUT "local_blks_hit" int8, OUT "local_blks_read" int8, OUT "local_blks_dirtied" int8, OUT "local_blks_written" int8, OUT "temp_blks_read" int8, OUT "temp_blks_written" int8, OUT "shared_blk_read_time" float8, OUT "shared_blk_write_time" float8, OUT "local_blk_read_time" float8, OUT "local_blk_write_time" float8, OUT "temp_blk_read_time" float8, OUT "temp_blk_write_time" float8, OUT "wal_records" int8, OUT "wal_fpi" int8, OUT "wal_bytes" numeric, OUT "jit_functions" int8, OUT "jit_generation_time" float8, OUT "jit_inlining_count" int8, OUT "jit_inlining_time" float8, OUT "jit_optimization_count" int8, OUT "jit_optimization_time" float8, OUT "jit_emission_count" int8, OUT "jit_emission_time" float8, OUT "jit_deform_count" int8, OUT "jit_deform_time" float8, OUT "stats_since" timestamptz, OUT "minmax_stats_since" timestamptz);
CREATE OR REPLACE FUNCTION "public"."pg_stat_statements"(IN "showtext" bool, OUT "userid" oid, OUT "dbid" oid, OUT "toplevel" bool, OUT "queryid" int8, OUT "query" text, OUT "plans" int8, OUT "total_plan_time" float8, OUT "min_plan_time" float8, OUT "max_plan_time" float8, OUT "mean_plan_time" float8, OUT "stddev_plan_time" float8, OUT "calls" int8, OUT "total_exec_time" float8, OUT "min_exec_time" float8, OUT "max_exec_time" float8, OUT "mean_exec_time" float8, OUT "stddev_exec_time" float8, OUT "rows" int8, OUT "shared_blks_hit" int8, OUT "shared_blks_read" int8, OUT "shared_blks_dirtied" int8, OUT "shared_blks_written" int8, OUT "local_blks_hit" int8, OUT "local_blks_read" int8, OUT "local_blks_dirtied" int8, OUT "local_blks_written" int8, OUT "temp_blks_read" int8, OUT "temp_blks_written" int8, OUT "shared_blk_read_time" float8, OUT "shared_blk_write_time" float8, OUT "local_blk_read_time" float8, OUT "local_blk_write_time" float8, OUT "temp_blk_read_time" float8, OUT "temp_blk_write_time" float8, OUT "wal_records" int8, OUT "wal_fpi" int8, OUT "wal_bytes" numeric, OUT "jit_functions" int8, OUT "jit_generation_time" float8, OUT "jit_inlining_count" int8, OUT "jit_inlining_time" float8, OUT "jit_optimization_count" int8, OUT "jit_optimization_time" float8, OUT "jit_emission_count" int8, OUT "jit_emission_time" float8, OUT "jit_deform_count" int8, OUT "jit_deform_time" float8, OUT "stats_since" timestamptz, OUT "minmax_stats_since" timestamptz)
  RETURNS SETOF "pg_catalog"."record" AS '$libdir/pg_stat_statements', 'pg_stat_statements_1_11'
  LANGUAGE c VOLATILE STRICT
  COST 1
  ROWS 1000;

-- ----------------------------
-- Function structure for pg_stat_statements_info
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pg_stat_statements_info"(OUT "dealloc" int8, OUT "stats_reset" timestamptz);
CREATE OR REPLACE FUNCTION "public"."pg_stat_statements_info"(OUT "dealloc" int8, OUT "stats_reset" timestamptz)
  RETURNS "pg_catalog"."record" AS '$libdir/pg_stat_statements', 'pg_stat_statements_info'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for pg_stat_statements_reset
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."pg_stat_statements_reset"("userid" oid, "dbid" oid, "queryid" int8, "minmax_only" bool);
CREATE OR REPLACE FUNCTION "public"."pg_stat_statements_reset"("userid" oid=0, "dbid" oid=0, "queryid" int8=0, "minmax_only" bool=false)
  RETURNS "pg_catalog"."timestamptz" AS '$libdir/pg_stat_statements', 'pg_stat_statements_reset_1_11'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- View structure for pg_stat_statements
-- ----------------------------
DROP VIEW IF EXISTS "public"."pg_stat_statements";
CREATE VIEW "public"."pg_stat_statements" AS  SELECT userid,
    dbid,
    toplevel,
    queryid,
    query,
    plans,
    total_plan_time,
    min_plan_time,
    max_plan_time,
    mean_plan_time,
    stddev_plan_time,
    calls,
    total_exec_time,
    min_exec_time,
    max_exec_time,
    mean_exec_time,
    stddev_exec_time,
    rows,
    shared_blks_hit,
    shared_blks_read,
    shared_blks_dirtied,
    shared_blks_written,
    local_blks_hit,
    local_blks_read,
    local_blks_dirtied,
    local_blks_written,
    temp_blks_read,
    temp_blks_written,
    shared_blk_read_time,
    shared_blk_write_time,
    local_blk_read_time,
    local_blk_write_time,
    temp_blk_read_time,
    temp_blk_write_time,
    wal_records,
    wal_fpi,
    wal_bytes,
    jit_functions,
    jit_generation_time,
    jit_inlining_count,
    jit_inlining_time,
    jit_optimization_count,
    jit_optimization_time,
    jit_emission_count,
    jit_emission_time,
    jit_deform_count,
    jit_deform_time,
    stats_since,
    minmax_stats_since
   FROM pg_stat_statements(true) pg_stat_statements(userid, dbid, toplevel, queryid, query, plans, total_plan_time, min_plan_time, max_plan_time, mean_plan_time, stddev_plan_time, calls, total_exec_time, min_exec_time, max_exec_time, mean_exec_time, stddev_exec_time, rows, shared_blks_hit, shared_blks_read, shared_blks_dirtied, shared_blks_written, local_blks_hit, local_blks_read, local_blks_dirtied, local_blks_written, temp_blks_read, temp_blks_written, shared_blk_read_time, shared_blk_write_time, local_blk_read_time, local_blk_write_time, temp_blk_read_time, temp_blk_write_time, wal_records, wal_fpi, wal_bytes, jit_functions, jit_generation_time, jit_inlining_count, jit_inlining_time, jit_optimization_count, jit_optimization_time, jit_emission_count, jit_emission_time, jit_deform_count, jit_deform_time, stats_since, minmax_stats_since);

-- ----------------------------
-- View structure for pg_stat_kcache_detail
-- ----------------------------
DROP VIEW IF EXISTS "public"."pg_stat_kcache_detail";
CREATE VIEW "public"."pg_stat_kcache_detail" AS  SELECT s.query,
    k.top,
    d.datname,
    r.rolname,
    k.plan_user_time,
    k.plan_system_time,
    k.plan_minflts,
    k.plan_majflts,
    k.plan_nswaps,
    k.plan_reads,
    k.plan_reads / current_setting('block_size'::text)::integer AS plan_reads_blks,
    k.plan_writes,
    k.plan_writes / current_setting('block_size'::text)::integer AS plan_writes_blks,
    k.plan_msgsnds,
    k.plan_msgrcvs,
    k.plan_nsignals,
    k.plan_nvcsws,
    k.plan_nivcsws,
    k.exec_user_time,
    k.exec_system_time,
    k.exec_minflts,
    k.exec_majflts,
    k.exec_nswaps,
    k.exec_reads,
    k.exec_reads / current_setting('block_size'::text)::integer AS exec_reads_blks,
    k.exec_writes,
    k.exec_writes / current_setting('block_size'::text)::integer AS exec_writes_blks,
    k.exec_msgsnds,
    k.exec_msgrcvs,
    k.exec_nsignals,
    k.exec_nvcsws,
    k.exec_nivcsws,
    k.stats_since
   FROM pg_stat_kcache() k(queryid, top, userid, dbid, plan_reads, plan_writes, plan_user_time, plan_system_time, plan_minflts, plan_majflts, plan_nswaps, plan_msgsnds, plan_msgrcvs, plan_nsignals, plan_nvcsws, plan_nivcsws, exec_reads, exec_writes, exec_user_time, exec_system_time, exec_minflts, exec_majflts, exec_nswaps, exec_msgsnds, exec_msgrcvs, exec_nsignals, exec_nvcsws, exec_nivcsws, stats_since)
     JOIN pg_stat_statements s ON k.queryid = s.queryid AND k.dbid = s.dbid AND k.userid = s.userid
     JOIN pg_database d ON d.oid = s.dbid
     JOIN pg_roles r ON r.oid = s.userid;

-- ----------------------------
-- View structure for pg_stat_statements_info
-- ----------------------------
DROP VIEW IF EXISTS "public"."pg_stat_statements_info";
CREATE VIEW "public"."pg_stat_statements_info" AS  SELECT dealloc,
    stats_reset
   FROM pg_stat_statements_info() pg_stat_statements_info(dealloc, stats_reset);

-- ----------------------------
-- View structure for pg_stat_kcache
-- ----------------------------
DROP VIEW IF EXISTS "public"."pg_stat_kcache";
CREATE VIEW "public"."pg_stat_kcache" AS  SELECT datname,
    sum(plan_user_time) AS plan_user_time,
    sum(plan_system_time) AS plan_system_time,
    sum(plan_minflts) AS plan_minflts,
    sum(plan_majflts) AS plan_majflts,
    sum(plan_nswaps) AS plan_nswaps,
    sum(plan_reads) AS plan_reads,
    sum(plan_reads_blks) AS plan_reads_blks,
    sum(plan_writes) AS plan_writes,
    sum(plan_writes_blks) AS plan_writes_blks,
    sum(plan_msgsnds) AS plan_msgsnds,
    sum(plan_msgrcvs) AS plan_msgrcvs,
    sum(plan_nsignals) AS plan_nsignals,
    sum(plan_nvcsws) AS plan_nvcsws,
    sum(plan_nivcsws) AS plan_nivcsws,
    sum(exec_user_time) AS exec_user_time,
    sum(exec_system_time) AS exec_system_time,
    sum(exec_minflts) AS exec_minflts,
    sum(exec_majflts) AS exec_majflts,
    sum(exec_nswaps) AS exec_nswaps,
    sum(exec_reads) AS exec_reads,
    sum(exec_reads_blks) AS exec_reads_blks,
    sum(exec_writes) AS exec_writes,
    sum(exec_writes_blks) AS exec_writes_blks,
    sum(exec_msgsnds) AS exec_msgsnds,
    sum(exec_msgrcvs) AS exec_msgrcvs,
    sum(exec_nsignals) AS exec_nsignals,
    sum(exec_nvcsws) AS exec_nvcsws,
    sum(exec_nivcsws) AS exec_nivcsws,
    min(stats_since) AS stats_since
   FROM pg_stat_kcache_detail
  WHERE top IS TRUE
  GROUP BY datname;

-- ----------------------------
-- Indexes structure for table addresses
-- ----------------------------
CREATE INDEX "addresses_user_id_idx" ON "public"."addresses" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table addresses
-- ----------------------------
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table affiliate_commissions
-- ----------------------------
CREATE INDEX "affiliate_commissions_affiliate_id_idx" ON "public"."affiliate_commissions" USING btree (
  "affiliate_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "affiliate_commissions_order_id_idx" ON "public"."affiliate_commissions" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "affiliate_commissions_status_idx" ON "public"."affiliate_commissions" USING btree (
  "status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table affiliate_commissions
-- ----------------------------
ALTER TABLE "public"."affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table affiliate_links
-- ----------------------------
CREATE INDEX "affiliate_links_affiliate_id_idx" ON "public"."affiliate_links" USING btree (
  "affiliate_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "affiliate_links_product_id_idx" ON "public"."affiliate_links" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table affiliate_links
-- ----------------------------
ALTER TABLE "public"."affiliate_links" ADD CONSTRAINT "affiliate_links_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table affiliates
-- ----------------------------
CREATE INDEX "affiliates_code_idx" ON "public"."affiliates" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "affiliates_code_key" ON "public"."affiliates" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "affiliates_user_id_idx" ON "public"."affiliates" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "affiliates_user_id_key" ON "public"."affiliates" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table affiliates
-- ----------------------------
ALTER TABLE "public"."affiliates" ADD CONSTRAINT "affiliates_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table auth_codes
-- ----------------------------
CREATE INDEX "auth_codes_auth_code_idx" ON "public"."auth_codes" USING btree (
  "auth_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table auth_codes
-- ----------------------------
ALTER TABLE "public"."auth_codes" ADD CONSTRAINT "auth_codes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table banner_group_mappings
-- ----------------------------
CREATE INDEX "banner_group_mappings_banner_group_id_idx" ON "public"."banner_group_mappings" USING btree (
  "banner_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "banner_group_mappings_banner_id_banner_group_id_key" ON "public"."banner_group_mappings" USING btree (
  "banner_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "banner_group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "banner_group_mappings_banner_id_idx" ON "public"."banner_group_mappings" USING btree (
  "banner_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table banner_group_mappings
-- ----------------------------
ALTER TABLE "public"."banner_group_mappings" ADD CONSTRAINT "banner_group_mappings_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table banner_groups
-- ----------------------------
CREATE INDEX "banner_groups_is_active_idx" ON "public"."banner_groups" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "banner_groups_slug_idx" ON "public"."banner_groups" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "banner_groups_slug_key" ON "public"."banner_groups" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table banner_groups
-- ----------------------------
ALTER TABLE "public"."banner_groups" ADD CONSTRAINT "banner_groups_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table banners
-- ----------------------------
CREATE INDEX "banners_is_active_idx" ON "public"."banners" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "banners_position_idx" ON "public"."banners" USING btree (
  "position" "pg_catalog"."enum_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table banners
-- ----------------------------
ALTER TABLE "public"."banners" ADD CONSTRAINT "banners_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table brands
-- ----------------------------
CREATE INDEX "brands_logo_media_id_idx" ON "public"."brands" USING btree (
  "logo_media_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "brands_slug_idx" ON "public"."brands" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "brands_slug_key" ON "public"."brands" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table brands
-- ----------------------------
ALTER TABLE "public"."brands" ADD CONSTRAINT "brands_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table cart_items
-- ----------------------------
CREATE INDEX "cart_items_cart_id_idx" ON "public"."cart_items" USING btree (
  "cart_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "cart_items_cart_id_variant_id_key" ON "public"."cart_items" USING btree (
  "cart_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "cart_items_product_id_idx" ON "public"."cart_items" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "cart_items_variant_id_idx" ON "public"."cart_items" USING btree (
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table cart_items
-- ----------------------------
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table carts
-- ----------------------------
CREATE UNIQUE INDEX "carts_user_id_key" ON "public"."carts" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table carts
-- ----------------------------
ALTER TABLE "public"."carts" ADD CONSTRAINT "carts_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table categories
-- ----------------------------
CREATE INDEX "categories_image_media_id_idx" ON "public"."categories" USING btree (
  "image_media_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "categories_parent_id_idx" ON "public"."categories" USING btree (
  "parent_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "categories_slug_idx" ON "public"."categories" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "categories_slug_key" ON "public"."categories" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table commission_rates
-- ----------------------------
CREATE INDEX "commission_rates_category_id_idx" ON "public"."commission_rates" USING btree (
  "category_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "commission_rates_product_id_idx" ON "public"."commission_rates" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table commission_rates
-- ----------------------------
ALTER TABLE "public"."commission_rates" ADD CONSTRAINT "commission_rates_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table coupon_usages
-- ----------------------------
CREATE INDEX "coupon_usages_coupon_id_idx" ON "public"."coupon_usages" USING btree (
  "coupon_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "coupon_usages_order_id_idx" ON "public"."coupon_usages" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "coupon_usages_order_id_key" ON "public"."coupon_usages" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table coupon_usages
-- ----------------------------
ALTER TABLE "public"."coupon_usages" ADD CONSTRAINT "coupon_usages_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table coupons
-- ----------------------------
CREATE INDEX "coupons_code_idx" ON "public"."coupons" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "coupons_code_key" ON "public"."coupons" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "coupons_end_date_idx" ON "public"."coupons" USING btree (
  "end_date" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "coupons_is_active_idx" ON "public"."coupons" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "coupons_start_date_idx" ON "public"."coupons" USING btree (
  "start_date" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table coupons
-- ----------------------------
ALTER TABLE "public"."coupons" ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table daily_stats
-- ----------------------------
CREATE INDEX "daily_stats_date_idx" ON "public"."daily_stats" USING btree (
  "date" "pg_catalog"."date_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "daily_stats_date_key" ON "public"."daily_stats" USING btree (
  "date" "pg_catalog"."date_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table daily_stats
-- ----------------------------
ALTER TABLE "public"."daily_stats" ADD CONSTRAINT "daily_stats_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table email_verification_logs
-- ----------------------------
CREATE INDEX "email_verification_logs_action_idx" ON "public"."email_verification_logs" USING btree (
  "action" "pg_catalog"."enum_ops" ASC NULLS LAST
);
CREATE INDEX "email_verification_logs_created_at_idx" ON "public"."email_verification_logs" USING btree (
  "created_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "email_verification_logs_email_idx" ON "public"."email_verification_logs" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "email_verification_logs_user_id_idx" ON "public"."email_verification_logs" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table email_verification_logs
-- ----------------------------
ALTER TABLE "public"."email_verification_logs" ADD CONSTRAINT "email_verification_logs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table flash_sale_orders
-- ----------------------------
CREATE INDEX "flash_sale_orders_flash_sale_id_idx" ON "public"."flash_sale_orders" USING btree (
  "flash_sale_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sale_orders_order_id_idx" ON "public"."flash_sale_orders" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "flash_sale_orders_order_id_key" ON "public"."flash_sale_orders" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table flash_sale_orders
-- ----------------------------
ALTER TABLE "public"."flash_sale_orders" ADD CONSTRAINT "flash_sale_orders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table flash_sale_products
-- ----------------------------
CREATE INDEX "flash_sale_products_flash_sale_id_idx" ON "public"."flash_sale_products" USING btree (
  "flash_sale_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "flash_sale_products_flash_sale_id_product_id_variant_id_key" ON "public"."flash_sale_products" USING btree (
  "flash_sale_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sale_products_is_active_idx" ON "public"."flash_sale_products" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sale_products_product_id_idx" ON "public"."flash_sale_products" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sale_products_variant_id_idx" ON "public"."flash_sale_products" USING btree (
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table flash_sale_products
-- ----------------------------
ALTER TABLE "public"."flash_sale_products" ADD CONSTRAINT "flash_sale_products_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table flash_sales
-- ----------------------------
CREATE INDEX "flash_sales_end_time_idx" ON "public"."flash_sales" USING btree (
  "end_time" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sales_is_active_idx" ON "public"."flash_sales" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sales_slug_idx" ON "public"."flash_sales" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "flash_sales_slug_key" ON "public"."flash_sales" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sales_start_time_idx" ON "public"."flash_sales" USING btree (
  "start_time" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "flash_sales_status_idx" ON "public"."flash_sales" USING btree (
  "status" "pg_catalog"."enum_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table flash_sales
-- ----------------------------
ALTER TABLE "public"."flash_sales" ADD CONSTRAINT "flash_sales_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table media
-- ----------------------------
CREATE INDEX "media_key_idx" ON "public"."media" USING btree (
  "key" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "media_type_idx" ON "public"."media" USING btree (
  "type" "pg_catalog"."enum_ops" ASC NULLS LAST
);
CREATE INDEX "media_uploaded_by_id_idx" ON "public"."media" USING btree (
  "uploaded_by_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table media
-- ----------------------------
ALTER TABLE "public"."media" ADD CONSTRAINT "media_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table order_items
-- ----------------------------
CREATE INDEX "order_items_order_id_idx" ON "public"."order_items" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "order_items_product_id_idx" ON "public"."order_items" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "order_items_variant_id_idx" ON "public"."order_items" USING btree (
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table order_items
-- ----------------------------
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table orders
-- ----------------------------
CREATE INDEX "orders_affiliate_code_idx" ON "public"."orders" USING btree (
  "affiliate_code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "orders_order_number_idx" ON "public"."orders" USING btree (
  "order_number" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "orders_order_number_key" ON "public"."orders" USING btree (
  "order_number" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "orders_status_idx" ON "public"."orders" USING btree (
  "status" "pg_catalog"."enum_ops" ASC NULLS LAST
);
CREATE INDEX "orders_user_id_idx" ON "public"."orders" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table payments
-- ----------------------------
CREATE INDEX "payments_order_id_idx" ON "public"."payments" USING btree (
  "order_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "payments_status_idx" ON "public"."payments" USING btree (
  "status" "pg_catalog"."enum_ops" ASC NULLS LAST
);
CREATE INDEX "payments_transaction_id_idx" ON "public"."payments" USING btree (
  "transaction_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "payments_transaction_id_key" ON "public"."payments" USING btree (
  "transaction_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table payments
-- ----------------------------
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_badges
-- ----------------------------
CREATE INDEX "product_badges_product_id_idx" ON "public"."product_badges" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_badges
-- ----------------------------
ALTER TABLE "public"."product_badges" ADD CONSTRAINT "product_badges_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_categories
-- ----------------------------
CREATE INDEX "product_categories_category_id_idx" ON "public"."product_categories" USING btree (
  "category_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "product_categories_product_id_category_id_key" ON "public"."product_categories" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "category_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_categories_product_id_idx" ON "public"."product_categories" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_categories
-- ----------------------------
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_images
-- ----------------------------
CREATE INDEX "product_images_media_id_idx" ON "public"."product_images" USING btree (
  "media_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_images_product_id_idx" ON "public"."product_images" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_images_variant_id_idx" ON "public"."product_images" USING btree (
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_images
-- ----------------------------
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_inventory
-- ----------------------------
CREATE INDEX "product_inventory_product_id_idx" ON "public"."product_inventory" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_inventory_variant_id_idx" ON "public"."product_inventory" USING btree (
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "product_inventory_variant_id_key" ON "public"."product_inventory" USING btree (
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_inventory
-- ----------------------------
ALTER TABLE "public"."product_inventory" ADD CONSTRAINT "product_inventory_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_questions
-- ----------------------------
CREATE INDEX "product_questions_product_id_idx" ON "public"."product_questions" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_questions_status_idx" ON "public"."product_questions" USING btree (
  "status" "pg_catalog"."enum_ops" ASC NULLS LAST
);
CREATE INDEX "product_questions_user_id_idx" ON "public"."product_questions" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_questions
-- ----------------------------
ALTER TABLE "public"."product_questions" ADD CONSTRAINT "product_questions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_reviews
-- ----------------------------
CREATE INDEX "product_reviews_product_id_idx" ON "public"."product_reviews" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "product_reviews_product_id_user_id_key" ON "public"."product_reviews" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_reviews_rating_idx" ON "public"."product_reviews" USING btree (
  "rating" "pg_catalog"."int2_ops" ASC NULLS LAST
);
CREATE INDEX "product_reviews_user_id_idx" ON "public"."product_reviews" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_reviews
-- ----------------------------
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_stats
-- ----------------------------
CREATE INDEX "product_stats_avg_rating_idx" ON "public"."product_stats" USING btree (
  "avg_rating" "pg_catalog"."numeric_ops" ASC NULLS LAST
);
CREATE INDEX "product_stats_product_id_idx" ON "public"."product_stats" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "product_stats_product_id_key" ON "public"."product_stats" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_stats_total_sold_idx" ON "public"."product_stats" USING btree (
  "total_sold" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_stats
-- ----------------------------
ALTER TABLE "public"."product_stats" ADD CONSTRAINT "product_stats_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_variants
-- ----------------------------
CREATE INDEX "product_variants_product_id_idx" ON "public"."product_variants" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "product_variants_sku_idx" ON "public"."product_variants" USING btree (
  "sku" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "product_variants_sku_key" ON "public"."product_variants" USING btree (
  "sku" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table product_variants
-- ----------------------------
ALTER TABLE "public"."product_variants" ADD CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table products
-- ----------------------------
CREATE INDEX "products_brand_id_idx" ON "public"."products" USING btree (
  "brand_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "products_sku_idx" ON "public"."products" USING btree (
  "sku" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "products_sku_key" ON "public"."products" USING btree (
  "sku" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "products_slug_idx" ON "public"."products" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "products_slug_key" ON "public"."products" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table products
-- ----------------------------
ALTER TABLE "public"."products" ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table promotion_products
-- ----------------------------
CREATE INDEX "promotion_products_product_id_idx" ON "public"."promotion_products" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "promotion_products_promotion_id_idx" ON "public"."promotion_products" USING btree (
  "promotion_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "promotion_products_promotion_id_product_id_key" ON "public"."promotion_products" USING btree (
  "promotion_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table promotion_products
-- ----------------------------
ALTER TABLE "public"."promotion_products" ADD CONSTRAINT "promotion_products_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table promotions
-- ----------------------------
CREATE INDEX "promotions_end_date_idx" ON "public"."promotions" USING btree (
  "end_date" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "promotions_is_active_idx" ON "public"."promotions" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "promotions_start_date_idx" ON "public"."promotions" USING btree (
  "start_date" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table promotions
-- ----------------------------
ALTER TABLE "public"."promotions" ADD CONSTRAINT "promotions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table review_helpful
-- ----------------------------
CREATE INDEX "review_helpful_review_id_idx" ON "public"."review_helpful" USING btree (
  "review_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "review_helpful_review_id_user_id_key" ON "public"."review_helpful" USING btree (
  "review_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "review_helpful_user_id_idx" ON "public"."review_helpful" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table review_helpful
-- ----------------------------
ALTER TABLE "public"."review_helpful" ADD CONSTRAINT "review_helpful_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table review_images
-- ----------------------------
CREATE INDEX "review_images_media_id_idx" ON "public"."review_images" USING btree (
  "media_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "review_images_review_id_idx" ON "public"."review_images" USING btree (
  "review_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table review_images
-- ----------------------------
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table review_replies
-- ----------------------------
CREATE INDEX "review_replies_review_id_idx" ON "public"."review_replies" USING btree (
  "review_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "review_replies_user_id_idx" ON "public"."review_replies" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table review_replies
-- ----------------------------
ALTER TABLE "public"."review_replies" ADD CONSTRAINT "review_replies_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table shared_wishlists
-- ----------------------------
CREATE INDEX "shared_wishlists_share_token_idx" ON "public"."shared_wishlists" USING btree (
  "share_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "shared_wishlists_share_token_key" ON "public"."shared_wishlists" USING btree (
  "share_token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "shared_wishlists_user_id_idx" ON "public"."shared_wishlists" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table shared_wishlists
-- ----------------------------
ALTER TABLE "public"."shared_wishlists" ADD CONSTRAINT "shared_wishlists_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user_role_assignments
-- ----------------------------
CREATE INDEX "user_role_assignments_role_id_idx" ON "public"."user_role_assignments" USING btree (
  "role_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "user_role_assignments_user_id_idx" ON "public"."user_role_assignments" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "user_role_assignments_user_id_role_id_key" ON "public"."user_role_assignments" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "role_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user_role_assignments
-- ----------------------------
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user_roles
-- ----------------------------
CREATE INDEX "user_roles_name_idx" ON "public"."user_roles" USING btree (
  "name" "pg_catalog"."enum_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user_roles
-- ----------------------------
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------
CREATE INDEX "users_avatar_media_id_idx" ON "public"."users" USING btree (
  "avatar_media_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "users_email_idx" ON "public"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "users_email_key" ON "public"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "users_phone_idx" ON "public"."users" USING btree (
  "phone" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users" USING btree (
  "phone" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "users_username_idx" ON "public"."users" USING btree (
  "username" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "users_username_key" ON "public"."users" USING btree (
  "username" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table wishlists
-- ----------------------------
CREATE INDEX "wishlists_product_id_idx" ON "public"."wishlists" USING btree (
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "wishlists_user_id_idx" ON "public"."wishlists" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "wishlists_user_id_product_id_variant_id_key" ON "public"."wishlists" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "product_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "variant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table wishlists
-- ----------------------------
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table addresses
-- ----------------------------
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table affiliate_commissions
-- ----------------------------
ALTER TABLE "public"."affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table affiliate_links
-- ----------------------------
ALTER TABLE "public"."affiliate_links" ADD CONSTRAINT "affiliate_links_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table affiliates
-- ----------------------------
ALTER TABLE "public"."affiliates" ADD CONSTRAINT "affiliates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table banner_group_mappings
-- ----------------------------
ALTER TABLE "public"."banner_group_mappings" ADD CONSTRAINT "banner_group_mappings_banner_group_id_fkey" FOREIGN KEY ("banner_group_id") REFERENCES "public"."banner_groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."banner_group_mappings" ADD CONSTRAINT "banner_group_mappings_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "public"."banners" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table banners
-- ----------------------------
ALTER TABLE "public"."banners" ADD CONSTRAINT "banners_image_media_id_fkey" FOREIGN KEY ("image_media_id") REFERENCES "public"."media" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table brands
-- ----------------------------
ALTER TABLE "public"."brands" ADD CONSTRAINT "brands_logo_media_id_fkey" FOREIGN KEY ("logo_media_id") REFERENCES "public"."media" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table cart_items
-- ----------------------------
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table carts
-- ----------------------------
ALTER TABLE "public"."carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_image_media_id_fkey" FOREIGN KEY ("image_media_id") REFERENCES "public"."media" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table commission_rates
-- ----------------------------
ALTER TABLE "public"."commission_rates" ADD CONSTRAINT "commission_rates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table coupon_usages
-- ----------------------------
ALTER TABLE "public"."coupon_usages" ADD CONSTRAINT "coupon_usages_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."coupon_usages" ADD CONSTRAINT "coupon_usages_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table email_verification_logs
-- ----------------------------
ALTER TABLE "public"."email_verification_logs" ADD CONSTRAINT "email_verification_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table flash_sale_orders
-- ----------------------------
ALTER TABLE "public"."flash_sale_orders" ADD CONSTRAINT "flash_sale_orders_flash_sale_id_fkey" FOREIGN KEY ("flash_sale_id") REFERENCES "public"."flash_sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."flash_sale_orders" ADD CONSTRAINT "flash_sale_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table flash_sale_products
-- ----------------------------
ALTER TABLE "public"."flash_sale_products" ADD CONSTRAINT "flash_sale_products_flash_sale_id_fkey" FOREIGN KEY ("flash_sale_id") REFERENCES "public"."flash_sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."flash_sale_products" ADD CONSTRAINT "flash_sale_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."flash_sale_products" ADD CONSTRAINT "flash_sale_products_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table media
-- ----------------------------
ALTER TABLE "public"."media" ADD CONSTRAINT "media_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table order_items
-- ----------------------------
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."addresses" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table payments
-- ----------------------------
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_badges
-- ----------------------------
ALTER TABLE "public"."product_badges" ADD CONSTRAINT "product_badges_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_categories
-- ----------------------------
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_images
-- ----------------------------
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_inventory
-- ----------------------------
ALTER TABLE "public"."product_inventory" ADD CONSTRAINT "product_inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."product_inventory" ADD CONSTRAINT "product_inventory_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_questions
-- ----------------------------
ALTER TABLE "public"."product_questions" ADD CONSTRAINT "product_questions_answered_by_fkey" FOREIGN KEY ("answered_by") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."product_questions" ADD CONSTRAINT "product_questions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."product_questions" ADD CONSTRAINT "product_questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_reviews
-- ----------------------------
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_stats
-- ----------------------------
ALTER TABLE "public"."product_stats" ADD CONSTRAINT "product_stats_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_variants
-- ----------------------------
ALTER TABLE "public"."product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table products
-- ----------------------------
ALTER TABLE "public"."products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table promotion_products
-- ----------------------------
ALTER TABLE "public"."promotion_products" ADD CONSTRAINT "promotion_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."promotion_products" ADD CONSTRAINT "promotion_products_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table review_helpful
-- ----------------------------
ALTER TABLE "public"."review_helpful" ADD CONSTRAINT "review_helpful_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."review_helpful" ADD CONSTRAINT "review_helpful_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table review_images
-- ----------------------------
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table review_replies
-- ----------------------------
ALTER TABLE "public"."review_replies" ADD CONSTRAINT "review_replies_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."review_replies" ADD CONSTRAINT "review_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table shared_wishlists
-- ----------------------------
ALTER TABLE "public"."shared_wishlists" ADD CONSTRAINT "shared_wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table user_role_assignments
-- ----------------------------
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."user_roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_avatar_media_id_fkey" FOREIGN KEY ("avatar_media_id") REFERENCES "public"."media" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table wishlists
-- ----------------------------
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
