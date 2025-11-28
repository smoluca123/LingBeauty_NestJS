/*
 Navicat Premium Data Transfer

 Source Server         : lingbeauty
 Source Server Type    : PostgreSQL
 Source Server Version : 170005 (170005)
 Source Host           : primary.lingbeauty--qjr8p8k7zs4l.addon.code.run:29615
 Source Catalog        : _ad28d54ceb16
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170005 (170005)
 File Encoding         : 65001

 Date: 29/11/2025 02:56:41
*/


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
  'BRAND_LOGO'
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
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of addresses
-- ----------------------------
INSERT INTO "public"."addresses" VALUES ('c8c19925-d3a6-4e43-b14a-d25268b41a24', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'Nguyen Van A', '+84123456789', '123 Nguyen Hue Street', 'Apartment 4B', 'Ho Chi Minh City', 'Ho Chi Minh', '700000', 'Vietnam', 'f', '2025-11-08 17:23:42.455', '2025-11-08 17:23:42.455');
INSERT INTO "public"."addresses" VALUES ('0d04dfb1-b70a-40c3-a84a-fac49de343ea', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'Nguyen Van A', '+84123456789', '123 Nguyen Hue Street', 'Apartment 4B', 'Ho Chi Minh City', 'Ho Chi Minh', '700000', 'Vietnam', 't', '2025-11-08 17:23:46.98', '2025-11-08 17:24:15.7');
INSERT INTO "public"."addresses" VALUES ('6e18a41f-fff5-4113-9396-8d22c2df9c00', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'Nguyen Van A', '+84123456789', '123 Nguyen Hue Street', 'Apartment 4B', 'Ho Chi Minh City', 'Ho Chi Minh', '700000', 'Vietnam', 'f', '2025-11-08 17:26:13.04', '2025-11-08 17:26:13.04');

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
-- Records of affiliate_commissions
-- ----------------------------

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
-- Records of affiliate_links
-- ----------------------------

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
-- Records of affiliates
-- ----------------------------

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
-- Records of auth_codes
-- ----------------------------
INSERT INTO "public"."auth_codes" VALUES ('b7893e2b-5b76-48f8-82c8-cc6b10f7a2eb', 'SMOTeam', 3, '2025-11-04 04:16:30', '2025-11-04 04:16:32');

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
-- Records of brands
-- ----------------------------
INSERT INTO "public"."brands" VALUES ('cc214951-a62b-4650-b06a-11d3848bcb03', 'AHC', 'ahc', 'Thương hiệu AHC', NULL, 't', '2025-11-20 15:28:56.617', '2025-11-20 15:28:56.617', '775e73e3-c1d3-4d69-971e-143980ffec74');
INSERT INTO "public"."brands" VALUES ('e6f24ef7-0eff-467e-93b6-14b51af43723', 'CLIO', 'clio', 'Thương hiệu CLIO', NULL, 't', '2025-11-20 15:29:58.904', '2025-11-20 15:29:58.904', '8bb07459-85f1-4fc2-8cd4-3d38451d7d20');
INSERT INTO "public"."brands" VALUES ('3897d67d-23e5-49e7-8533-f64d910e3780', 'GOODAL', 'goodal', 'Thương hiệu GOODAL', NULL, 't', '2025-11-20 15:35:30.136', '2025-11-20 15:35:30.136', '641426b7-bd5e-4e81-8227-70466d492621');

-- ----------------------------
-- Table structure for cart_items
-- ----------------------------
DROP TABLE IF EXISTS "public"."cart_items";
CREATE TABLE "public"."cart_items" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "cart_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "quantity" int4 NOT NULL DEFAULT 1,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of cart_items
-- ----------------------------

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
-- Records of carts
-- ----------------------------

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
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" VALUES ('39f1cbdc-41c6-4d11-b785-94cbf1996177', 'Brand AHC', 'brand-ahc', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-11-20 16:14:33.087', '2025-11-20 16:14:33.087', NULL, 'BRAND', 'cc214951-a62b-4650-b06a-11d3848bcb03');
INSERT INTO "public"."categories" VALUES ('dbc5203a-0900-4f46-8a22-62b57a5bb4eb', 'Brand CLIO', 'brand-clio', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-11-20 16:15:34.088', '2025-11-20 16:15:34.088', NULL, 'BRAND', 'e6f24ef7-0eff-467e-93b6-14b51af43723');
INSERT INTO "public"."categories" VALUES ('667b465a-a3bd-4e2a-bf57-4107839bfe96', 'Brand GOODAL', 'brand-goodal', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-11-20 16:16:15.936', '2025-11-20 16:16:15.936', NULL, 'BRAND', '3897d67d-23e5-49e7-8533-f64d910e3780');
INSERT INTO "public"."categories" VALUES ('c5a94906-24f5-476b-a490-d677f1e8b802', 'Khuyến mãi hot', 'khuyen-mai-hot', 'Sản phẩm khuyến mãi hot', NULL, 't', 0, '2025-11-20 16:26:04.251', '2025-11-20 16:26:04.251', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('ed8f42b0-197a-4706-8df0-03fc4b636c2c', 'Sản phẩm cao cấp', 'san-pham-cao-cap', 'Sản phẩm cao cấp', NULL, 't', 0, '2025-11-20 16:26:25.934', '2025-11-20 16:26:25.934', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('efa526c6-f7ea-48e3-a3df-edbcf1b280bd', 'Trang điểm', 'trang-djiem', 'Sản phẩm trang điểm', NULL, 't', 0, '2025-11-20 16:27:06.057', '2025-11-20 16:27:06.057', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('22efe8cc-9307-491f-8a4e-52164998b55b', 'Chăm sóc da', 'cham-soc-da', 'Sản phẩm chăm sóc da', NULL, 't', 0, '2025-11-20 16:27:17.029', '2025-11-20 16:27:17.029', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('f09c0ea5-6508-4f53-befd-5ce727ffcbed', 'Chăm sóc cá nhân', 'cham-soc-ca-nhan', 'Sản phẩm chăm sóc cá nhân', NULL, 't', 0, '2025-11-20 16:27:41.433', '2025-11-20 16:27:41.433', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('74fbe677-684d-4872-9f3b-3ba19e513821', 'Chăm sóc cơ thể', 'cham-soc-co-the', 'Sản phẩm chăm sóc cơ thể', NULL, 't', 0, '2025-11-20 16:27:49.486', '2025-11-20 16:27:49.486', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('1c7e487b-4c22-4e87-9f8a-53a626a1da8b', 'Sản phẩm mới', 'san-pham-moi', 'Sản phẩm mới', NULL, 't', 0, '2025-11-20 16:27:59.256', '2025-11-20 16:27:59.256', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 'Thương hiệu', 'thuong-hieu', 'Các thương hiệu mỹ phẩm', NULL, 't', -1, '2025-11-20 11:42:49.357', '2025-11-20 11:42:49.357', NULL, 'CATEGORY', NULL);

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
-- Records of commission_rates
-- ----------------------------

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
-- Records of coupon_usages
-- ----------------------------

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
-- Records of coupons
-- ----------------------------

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
-- Records of flash_sale_orders
-- ----------------------------

-- ----------------------------
-- Table structure for flash_sale_products
-- ----------------------------
DROP TABLE IF EXISTS "public"."flash_sale_products";
CREATE TABLE "public"."flash_sale_products" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "flash_sale_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "product_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default",
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
-- Records of flash_sale_products
-- ----------------------------

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
-- Records of flash_sales
-- ----------------------------

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
-- Records of media
-- ----------------------------
INSERT INTO "public"."media" VALUES ('641426b7-bd5e-4e81-8227-70466d492621', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/goodal_logo_1763652927676_30430e7c.jpeg?wrap=0', 'uploads/public/brands/goodal_logo_1763652927676_30430e7c.jpeg', 'goodal_logo.jpeg', 'image/jpeg', 16687, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:35:29.405', '2025-11-20 15:35:29.405');
INSERT INTO "public"."media" VALUES ('e7f83aa3-c559-4c4c-b63f-1ef329b0bb9d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426304582-aspui9m7m87.jpg', 'uploads/public/avatars/1762426304582-aspui9m7m87.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-06 10:51:46.768', '2025-11-06 10:51:46.768');
INSERT INTO "public"."media" VALUES ('33b7e124-d2eb-468c-a2f7-63dd148d87c4', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426324714-1wgs3w9tddd.jpg', 'uploads/public/avatars/1762426324714-1wgs3w9tddd.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-06 10:52:05.562', '2025-11-06 10:52:05.562');
INSERT INTO "public"."media" VALUES ('2d212443-ba68-4a4f-a918-edda4245cdd3', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426337066-z6k4ndatsvc.jpg', 'uploads/public/avatars/1762426337066-z6k4ndatsvc.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-06 10:52:17.541', '2025-11-06 10:52:17.541');
INSERT INTO "public"."media" VALUES ('1fe86513-30a4-49b9-b9b5-531711308435', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426405256-ehfr9jk9vi6.jpg?wrap=0', 'uploads/public/avatars/1762426405256-ehfr9jk9vi6.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 't', '2025-11-06 10:53:26.143', '2025-11-06 11:16:42.867');
INSERT INTO "public"."media" VALUES ('e8cd3ded-a0c2-4fc2-8520-6c5182e30f13', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/IMG_17_1763650664311_c827f313.jpg?wrap=0', 'uploads/public/avatars/IMG_17_1763650664311_c827f313.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-20 14:57:45.217', '2025-11-20 14:57:45.217');
INSERT INTO "public"."media" VALUES ('698a3566-0e24-42e6-9ca4-a80a72f43e29', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/ahc_logo_1763651462182_680d754e.jpg?wrap=0', 'uploads/public/brands/ahc_logo_1763651462182_680d754e.jpg', 'ahc_logo.jpg', 'image/jpeg', 157174, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:11:03.008', '2025-11-20 15:11:03.008');
INSERT INTO "public"."media" VALUES ('775e73e3-c1d3-4d69-971e-143980ffec74', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/ahc_logo_1763652535912_b453a9fa.jpg?wrap=0', 'uploads/public/brands/ahc_logo_1763652535912_b453a9fa.jpg', 'ahc_logo.jpg', 'image/jpeg', 157174, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:28:56.523', '2025-11-20 15:28:56.523');
INSERT INTO "public"."media" VALUES ('8bb07459-85f1-4fc2-8cd4-3d38451d7d20', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/clio_logo_1763652596520_05d5cbb6.png?wrap=0', 'uploads/public/brands/clio_logo_1763652596520_05d5cbb6.png', 'clio_logo.png', 'image/png', 4856, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:29:58.283', '2025-11-20 15:29:58.283');
INSERT INTO "public"."media" VALUES ('97d155ca-2324-47e6-9429-e6b738fd6f20', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/94dcc7ac-37c6-4674-a900-2409f7646ff7_1764116494845_f9fcd7c8.webp?wrap=0', 'uploads/public/products/images/94dcc7ac-37c6-4674-a900-2409f7646ff7_1764116494845_f9fcd7c8.webp', '94dcc7ac-37c6-4674-a900-2409f7646ff7.webp', 'image/webp', 33166, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:21:35.513', '2025-11-26 00:21:35.513');
INSERT INTO "public"."media" VALUES ('3516e5df-87cb-4f52-bad0-2420e3036ca7', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/3fcbe193-818f-434f-b259-13a39274d73a_1764116652495_d6cfef4f.webp?wrap=0', 'uploads/public/products/images/3fcbe193-818f-434f-b259-13a39274d73a_1764116652495_d6cfef4f.webp', '3fcbe193-818f-434f-b259-13a39274d73a.webp', 'image/webp', 24638, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:24:13.093', '2025-11-26 00:24:13.093');
INSERT INTO "public"."media" VALUES ('fd832ba8-3bce-4bb0-9122-2ccb74403d0d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/122d881a-e59e-4f58-b1c4-138ac96014cf_1764116660519_54d8a4fb.webp?wrap=0', 'uploads/public/products/images/122d881a-e59e-4f58-b1c4-138ac96014cf_1764116660519_54d8a4fb.webp', '122d881a-e59e-4f58-b1c4-138ac96014cf.webp', 'image/webp', 44870, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:24:21.085', '2025-11-26 00:24:21.085');
INSERT INTO "public"."media" VALUES ('04527ab6-be79-4d0e-9421-53f3fbd5714a', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/86884b3c-cc62-4cc3-9546-25e2944ae6f5_1764116673787_d59be7b5.webp?wrap=0', 'uploads/public/products/images/86884b3c-cc62-4cc3-9546-25e2944ae6f5_1764116673787_d59be7b5.webp', '86884b3c-cc62-4cc3-9546-25e2944ae6f5.webp', 'image/webp', 52870, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:24:34.248', '2025-11-26 00:24:34.248');
INSERT INTO "public"."media" VALUES ('c237d4f4-ba8f-4c23-a07d-13830f1b3abb', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/57ffd5ee-58bc-453b-85a7-c79e40512432_1764187697608_072906bb.webp?wrap=0', 'uploads/public/products/images/57ffd5ee-58bc-453b-85a7-c79e40512432_1764187697608_072906bb.webp', '57ffd5ee-58bc-453b-85a7-c79e40512432.webp', 'image/webp', 26080, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 20:08:18.253', '2025-11-26 20:08:18.253');
INSERT INTO "public"."media" VALUES ('faaa90a2-20b3-421a-adc8-2b3f05c4020c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/3855656f-79ce-4979-bc9b-537bfbdc07c1_1764188914439_d0ab94b5.webp?wrap=0', 'uploads/public/products/images/3855656f-79ce-4979-bc9b-537bfbdc07c1_1764188914439_d0ab94b5.webp', '3855656f-79ce-4979-bc9b-537bfbdc07c1.webp', 'image/webp', 25148, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 20:28:35.065', '2025-11-26 20:28:35.065');
INSERT INTO "public"."media" VALUES ('2323711b-bf6c-4ba5-9c98-d5578de86c51', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/86523562-0f74-4211-b71b-0367509c6de3_1764190788447_5c261108.webp?wrap=0', 'uploads/public/products/images/86523562-0f74-4211-b71b-0367509c6de3_1764190788447_5c261108.webp', '86523562-0f74-4211-b71b-0367509c6de3.webp', 'image/webp', 24990, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 20:59:49.091', '2025-11-26 20:59:49.091');
INSERT INTO "public"."media" VALUES ('af6fc1ed-389d-466c-a399-96bd6a54081e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/3636b9b0-b9ef-4ad9-9b35-0f41952ec397_1764190972088_6cd37b32.webp?wrap=0', 'uploads/public/products/images/3636b9b0-b9ef-4ad9-9b35-0f41952ec397_1764190972088_6cd37b32.webp', '3636b9b0-b9ef-4ad9-9b35-0f41952ec397.webp', 'image/webp', 26564, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 21:02:52.676', '2025-11-26 21:02:52.676');
INSERT INTO "public"."media" VALUES ('0361956d-2c9d-4b73-aa5a-b59d3d7ff55d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/b2e040d7-f100-4a1a-8c4e-2aeff579b98b_1764191034130_acb9ef13.webp?wrap=0', 'uploads/public/products/images/b2e040d7-f100-4a1a-8c4e-2aeff579b98b_1764191034130_acb9ef13.webp', 'b2e040d7-f100-4a1a-8c4e-2aeff579b98b.webp', 'image/webp', 25338, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 21:03:54.678', '2025-11-26 21:03:54.678');

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
-- Records of order_items
-- ----------------------------

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
-- Records of orders
-- ----------------------------

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
-- Records of payments
-- ----------------------------

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
-- Records of product_badges
-- ----------------------------
INSERT INTO "public"."product_badges" VALUES ('e92b7eee-821c-4de8-94a6-96a3e786359c', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'New', 0, 't', 'INFO', 'NEW', '2025-11-28 19:41:36.846', '2025-11-28 19:41:36.846');

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
-- Records of product_categories
-- ----------------------------
INSERT INTO "public"."product_categories" VALUES ('9007f361-5f47-4513-9cb3-dc2a6115c04f', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '22efe8cc-9307-491f-8a4e-52164998b55b', '2025-11-24 23:18:57.297');

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
-- Records of product_images
-- ----------------------------
INSERT INTO "public"."product_images" VALUES ('10a4692b-1e00-45af-9272-e43b5f3cdcd1', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Ảnh chính kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 0, 't', '2025-11-26 00:21:35.71', '97d155ca-2324-47e6-9429-e6b738fd6f20', NULL);
INSERT INTO "public"."product_images" VALUES ('e998f06c-70be-4400-9257-a6283c13e9db', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Ảnh kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 1, 'f', '2025-11-26 00:24:13.177', '3516e5df-87cb-4f52-bad0-2420e3036ca7', NULL);
INSERT INTO "public"."product_images" VALUES ('93bdf59c-1666-4780-b0df-721c6af55048', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Ảnh kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 2, 'f', '2025-11-26 00:24:21.165', 'fd832ba8-3bce-4bb0-9122-2ccb74403d0d', NULL);
INSERT INTO "public"."product_images" VALUES ('c6d9b090-2820-40d4-9961-f176bf6a5443', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Ảnh kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 3, 'f', '2025-11-26 00:24:34.32', '04527ab6-be79-4d0e-9421-53f3fbd5714a', NULL);
INSERT INTO "public"."product_images" VALUES ('58847760-c469-4ff8-b241-787bdd594730', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml màu 19C Light - da trắng sáng (tone da lạnh beige pink)', 4, 'f', '2025-11-26 20:08:18.328', 'c237d4f4-ba8f-4c23-a07d-13830f1b3abb', '4f2c1c1b-7a25-420a-b239-ab90002503a2');
INSERT INTO "public"."product_images" VALUES ('28164e79-b958-42a0-aca0-1eae4861f267', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml màu 21C Lingerie - da trắng hồng (tone lạnh beige pink)', 5, 'f', '2025-11-26 20:28:35.147', 'faaa90a2-20b3-421a-adc8-2b3f05c4020c', '8caffe21-d0f6-421d-9068-a824440187a8');
INSERT INTO "public"."product_images" VALUES ('4c4c03d2-ca9f-4d5a-b2b9-eaff37c73aa0', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml màu 21N linen - da sáng tự nhiên (tone beige yellow)', 6, 'f', '2025-11-26 20:59:49.164', '2323711b-bf6c-4ba5-9c98-d5578de86c51', '16d13d2a-fce2-4d21-a72c-9e2cb7a75202');
INSERT INTO "public"."product_images" VALUES ('b97ff9f6-6aef-4592-b03c-4470c97c2fdf', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml màu 23N Ginger - da trung bình (tone tự nhiên beige yellow)', 7, 'f', '2025-11-26 21:02:52.747', 'af6fc1ed-389d-466c-a399-96bd6a54081e', 'c7bba2e6-f70b-4688-a3e7-1a9d238112a5');
INSERT INTO "public"."product_images" VALUES ('89b63fdc-4a97-474d-8df7-c6ee050ec4d8', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml màu 19N Porcelain - Da trắng sáng (tone da tự nhiên beige yellow)', 8, 'f', '2025-11-26 21:03:54.749', '0361956d-2c9d-4b73-aa5a-b59d3d7ff55d', 'f336f788-48a5-4f02-89e6-f5349001a1b3');

-- ----------------------------
-- Table structure for product_inventory
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_inventory";
CREATE TABLE "public"."product_inventory" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "variant_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "quantity" int4 NOT NULL DEFAULT 0,
  "display_status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'in_stock'::character varying,
  "low_stock_threshold" int4 NOT NULL DEFAULT 10,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of product_inventory
-- ----------------------------
INSERT INTO "public"."product_inventory" VALUES ('29023227-0932-47cc-aca8-cfcc164dc13a', '4f2c1c1b-7a25-420a-b239-ab90002503a2', 100, 'in_stock', 10, '2025-11-26 20:04:58.042', '2025-11-26 20:04:58.042');
INSERT INTO "public"."product_inventory" VALUES ('ceefbd45-1f3c-4d5e-925a-4483f81a7f82', '8caffe21-d0f6-421d-9068-a824440187a8', 100, 'in_stock', 10, '2025-11-26 20:23:53.559', '2025-11-26 20:23:53.559');
INSERT INTO "public"."product_inventory" VALUES ('b902e703-7c10-44cf-b907-06c45676b711', '16d13d2a-fce2-4d21-a72c-9e2cb7a75202', 100, 'in_stock', 10, '2025-11-26 20:58:38.476', '2025-11-26 20:58:38.476');
INSERT INTO "public"."product_inventory" VALUES ('c0427b61-6126-4583-b3a2-a0bbec8b10e7', 'c7bba2e6-f70b-4688-a3e7-1a9d238112a5', 100, 'in_stock', 10, '2025-11-26 21:02:23.644', '2025-11-26 21:02:23.644');
INSERT INTO "public"."product_inventory" VALUES ('12006b0d-ae8b-4c29-8951-bfd7d31d282d', 'f336f788-48a5-4f02-89e6-f5349001a1b3', 100, 'in_stock', 10, '2025-11-26 21:03:23.963', '2025-11-26 21:03:23.963');

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
-- Records of product_reviews
-- ----------------------------

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
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of product_variants
-- ----------------------------
INSERT INTO "public"."product_variants" VALUES ('4f2c1c1b-7a25-420a-b239-ab90002503a2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '87185538', '19C Light - da trắng sáng (tone da lạnh beige pink)', '#fee7da', NULL, 'Standard', 349000.00, 0, '2025-11-26 20:04:58.042', '2025-11-26 20:04:58.042');
INSERT INTO "public"."product_variants" VALUES ('8caffe21-d0f6-421d-9068-a824440187a8', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '78006188', '21C Lingerie - da trắng hồng (tone lạnh beige pink)', '#fdd8c4', NULL, 'Standard', 349000.00, 1, '2025-11-26 20:23:53.559', '2025-11-26 20:27:46.593');
INSERT INTO "public"."product_variants" VALUES ('16d13d2a-fce2-4d21-a72c-9e2cb7a75202', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '11025156', '21N linen - da sáng tự nhiên (tone beige yellow)', '#fee1c4', NULL, 'Standard', 349000.00, 2, '2025-11-26 20:58:38.476', '2025-11-26 20:58:38.476');
INSERT INTO "public"."product_variants" VALUES ('c7bba2e6-f70b-4688-a3e7-1a9d238112a5', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '11994898', '23N Ginger - da trung bình (tone tự nhiên beige yellow)', '#ffdab4', NULL, 'Standard', 349000.00, 3, '2025-11-26 21:02:23.644', '2025-11-26 21:02:23.644');
INSERT INTO "public"."product_variants" VALUES ('f336f788-48a5-4f02-89e6-f5349001a1b3', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '59178447', '19N Porcelain - Da trắng sáng (tone da tự nhiên beige yellow)', '#fee0c5', NULL, 'Standard', 349000.00, 4, '2025-11-26 21:03:23.963', '2025-11-26 21:03:23.963');

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
-- Records of products
-- ----------------------------
INSERT INTO "public"."products" VALUES ('139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 'kem-nen-che-khuyet-djiem-clio-kill-cover-founwear-foundation-the-original-35ml', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', '14554829', 'e6f24ef7-0eff-467e-93b6-14b51af43723', 349000.00, 399000.00, 't', 't', 50.00, 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', '2025-11-24 23:18:57.297', '2025-11-24 23:18:57.297');

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
-- Records of promotion_products
-- ----------------------------

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
-- Records of promotions
-- ----------------------------

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
-- Records of review_images
-- ----------------------------

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
-- Records of user_role_assignments
-- ----------------------------

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles";
CREATE TABLE "public"."user_roles" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of user_roles
-- ----------------------------

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
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES ('bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'Hàn Tiểu', 'Ling', '+1234567890', 'htligz', '$2b$10$2LgIgalzreWaEjHSLVbkl.Q07yOdzhcXGRbqEVZRs9OmiTSBFQe9O', '2025-11-05 17:44:38.293', '2025-11-20 15:28:07.229', '2025-11-05 19:21:19.973', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZDlmZGNjMS01MjQ3LTQ5YTItOWVkNC0xZjAwNWRkNDdjZDIiLCJ1c2VybmFtZSI6Imh0bGlneiIsImlhdCI6MTc2MzY1MjQ4NywiZXhwIjoxNzY2MjQ0NDg3fQ.uprWyKw5vOHqnC5hfJMi7ZChlhUs4PrfPozHF6wkkB8', 'e8cd3ded-a0c2-4fc2-8520-6c5182e30f13');

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
-- View structure for pg_stat_statements_info
-- ----------------------------
DROP VIEW IF EXISTS "public"."pg_stat_statements_info";
CREATE VIEW "public"."pg_stat_statements_info" AS  SELECT dealloc,
    stats_reset
   FROM pg_stat_statements_info() pg_stat_statements_info(dealloc, stats_reset);

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
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
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
ALTER TABLE "public"."product_inventory" ADD CONSTRAINT "product_inventory_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_reviews
-- ----------------------------
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Foreign Keys structure for table review_images
-- ----------------------------
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table user_role_assignments
-- ----------------------------
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_avatar_media_id_fkey" FOREIGN KEY ("avatar_media_id") REFERENCES "public"."media" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
