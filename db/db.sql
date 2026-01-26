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

 Date: 07/01/2026 16:57:16
*/


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
-- Records of banner_groups
-- ----------------------------
INSERT INTO "public"."banner_groups" VALUES ('0a219a4a-68d1-4bbe-b503-437ea8a1dc46', 'Homepage Main Banners', 'homepage-main', 'Main banner group for homepage display', 't', NULL, NULL, '2026-01-07 09:43:16.522', '2026-01-07 09:43:16.522');

-- ----------------------------
-- Table structure for banners
-- ----------------------------
DROP TABLE IF EXISTS "public"."banners";
CREATE TABLE "public"."banners" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "group_id" text COLLATE "pg_catalog"."default" NOT NULL,
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
  "sort_order" int4 NOT NULL DEFAULT 0,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "gradient_from" varchar(50) COLLATE "pg_catalog"."default",
  "gradient_to" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of banners
-- ----------------------------
INSERT INTO "public"."banners" VALUES ('8ea486b6-6d7c-489d-a723-84884277d97e', '0a219a4a-68d1-4bbe-b503-437ea8a1dc46', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products', 'Số lượng quà tặng có hạn.', NULL, 1, 't', '2026-01-07 09:43:16.572', '2026-01-07 09:43:16.572', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('e77c5661-58cb-4a83-8634-a7aeca84cfed', '0a219a4a-68d1-4bbe-b503-437ea8a1dc46', 'TEXT', 'MAIN_CAROUSEL', 'Ưu đãi hôm nay', 'Giảm đến 50% sản phẩm chăm sóc da', 'Chọn ngay routine phù hợp cho làn da của bạn với deal siêu hời.', 'Giảm đến -50%', 'Khám phá ngay', '/products', 'Áp dụng cho sản phẩm được gắn nhãn Flash Sale.', NULL, 2, 't', '2026-01-07 09:43:16.621', '2026-01-07 09:43:16.621', '#e0f2ff', '#ffffff');
INSERT INTO "public"."banners" VALUES ('3475cb56-4b4f-4c02-a516-6c98002fbaa3', '0a219a4a-68d1-4bbe-b503-437ea8a1dc46', 'TEXT', 'MAIN_CAROUSEL', 'Hội viên mới', 'Tặng voucher 50K cho đơn đầu tiên', 'Đăng ký tài khoản để nhận thêm nhiều ưu đãi cực dễ thương.', 'Voucher 50K', 'Đăng ký ngay', '/auth/register', 'Áp dụng cho đơn từ 299K.', NULL, 3, 't', '2026-01-07 09:43:16.667', '2026-01-07 09:43:16.667', '#fff4e0', '#ffffff');
INSERT INTO "public"."banners" VALUES ('bfabf64f-dc08-49e6-ab29-9cb764e03934', '0a219a4a-68d1-4bbe-b503-437ea8a1dc46', 'TEXT', 'SIDE_TOP', 'Sạch sâu nhưng vẫn dịu nhẹ', 'Combo làm sạch da 100%', 'Làm sạch nhiều lớp makeup, không khô căng.', 'Chỉ từ 58K', 'Xem ngay', '/products', NULL, NULL, 1, 't', '2026-01-07 09:43:16.715', '2026-01-07 09:43:16.715', '#e5f6ff', '#ffffff');
INSERT INTO "public"."banners" VALUES ('998849fe-26d9-44c8-8d13-848071e82213', '0a219a4a-68d1-4bbe-b503-437ea8a1dc46', 'TEXT', 'SIDE_BOTTOM', 'Độc quyền tại Beauty Box', 'Kem nền Mesh Blur mịn lì', 'Hiệu ứng blur mờ mịn, che phủ cho lớp nền tự nhiên.', 'Mua kèm nhận quà tặng', 'Xem ngay', '/products', NULL, NULL, 2, 't', '2026-01-07 09:43:16.766', '2026-01-07 09:43:16.766', '#f4e6ff', '#ffffff');

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
INSERT INTO "public"."brands" VALUES ('7931cc87-0c28-46a3-b2d0-4f073e0d8cd4', 'BANILA CO', 'banila-co', 'Thương hiệu BANILA CO', NULL, 't', '2025-12-15 11:24:19.768', '2025-12-15 11:24:19.768', '8e0865a8-f770-419d-b6f4-87127c5452ff');

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
INSERT INTO "public"."categories" VALUES ('b8f869d0-ff9e-4b2b-9166-a4f0ec743c38', 'Brand BANILA CO', 'brand-banila-co', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-12-15 11:25:51.838', '2025-12-15 11:25:51.838', NULL, 'BRAND', '7931cc87-0c28-46a3-b2d0-4f073e0d8cd4');

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
-- Records of email_verification_logs
-- ----------------------------
INSERT INTO "public"."email_verification_logs" VALUES ('0018c0da-cc23-43a7-a430-11a3c45fa7d0', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'SEND_OTP', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 13:59:44.441');
INSERT INTO "public"."email_verification_logs" VALUES ('42870143-a5d0-44d6-9fb6-9c97f64171ea', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'VERIFY_SUCCESS', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:00:26.52');
INSERT INTO "public"."email_verification_logs" VALUES ('75b00b9f-6bdd-4ba8-9ebd-18a028785f4b', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'SEND_OTP', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:04:56.981');
INSERT INTO "public"."email_verification_logs" VALUES ('ba21a23d-1606-492d-82e6-6c836e52459e', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'SEND_OTP', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:05:02.036');
INSERT INTO "public"."email_verification_logs" VALUES ('ba163799-c5cb-442b-b2e6-a8ebc1e761ba', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'SEND_OTP', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:05:15.351');
INSERT INTO "public"."email_verification_logs" VALUES ('d53c7f55-8947-4057-8c35-cb455ce825b7', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'RESEND_OTP', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:05:15.395');
INSERT INTO "public"."email_verification_logs" VALUES ('e9ed0c26-534a-42c6-a999-d958ff31bbd6', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'RATE_LIMITED', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:05:18.412');
INSERT INTO "public"."email_verification_logs" VALUES ('b0c99b30-7ee5-4055-bbf6-3da82f702fd9', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'RATE_LIMITED', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:05:20.702');
INSERT INTO "public"."email_verification_logs" VALUES ('47fbead4-92dd-4001-bd0d-6acbc87bd8a9', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'RATE_LIMITED', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:05:21.825');
INSERT INTO "public"."email_verification_logs" VALUES ('0f90a110-3044-497a-b026-1c3e09020781', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'RATE_LIMITED', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:05:22.82');
INSERT INTO "public"."email_verification_logs" VALUES ('3f24acfe-cad5-4c77-8431-1fa7abe3145a', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'VERIFY_SUCCESS', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', NULL, '2025-12-09 14:06:15.971');
INSERT INTO "public"."email_verification_logs" VALUES ('c0ace6bf-fc23-4af1-a00b-fca4e80860f5', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'SEND_OTP', '::1', 'node', NULL, '2025-12-11 10:24:25.65');
INSERT INTO "public"."email_verification_logs" VALUES ('0092b784-c278-4236-90c5-b6737fab5a9f', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'SEND_OTP', '::1', 'node', NULL, '2025-12-11 10:25:56.015');
INSERT INTO "public"."email_verification_logs" VALUES ('da780633-8201-4b1d-8b4a-9010699bf6ef', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'SEND_OTP', '::1', 'node', NULL, '2025-12-11 10:26:29.494');
INSERT INTO "public"."email_verification_logs" VALUES ('bb8b850d-3486-4d84-9d87-b2e1ed5432cd', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'RATE_LIMITED', '::1', 'node', NULL, '2025-12-11 10:28:08.851');
INSERT INTO "public"."email_verification_logs" VALUES ('f736761b-ae90-4694-af8e-570dde887d6b', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'RATE_LIMITED', '::1', 'node', NULL, '2025-12-11 10:28:24.041');
INSERT INTO "public"."email_verification_logs" VALUES ('67482bf9-bdc0-4e67-9d01-e7e1759dabe3', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'SEND_OTP', '::1', 'node', NULL, '2025-12-11 10:29:30.12');
INSERT INTO "public"."email_verification_logs" VALUES ('35ebdb43-89d6-4d08-83df-f49d6dfa8ce9', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'VERIFY_SUCCESS', '::1', 'node', NULL, '2025-12-11 10:29:44.009');

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
INSERT INTO "public"."media" VALUES ('8e0865a8-f770-419d-b6f4-87127c5452ff', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/bannila_co_logo_1765797858931_22b99e88.jpg?wrap=0', 'uploads/public/brands/bannila_co_logo_1765797858931_22b99e88.jpg', 'bannila_co_logo.jpg', 'image/jpeg', 9703, 'BRAND_LOGO', NULL, 'f', '2025-12-15 11:24:19.683', '2025-12-15 11:24:19.683');
INSERT INTO "public"."media" VALUES ('93b74795-9f5b-4bf5-9193-f1a2c9a11205', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/c336f484-4500-4598-aa8d-b2a3d6ce591a_1765808599261_ebedd2c7.webp?wrap=0', 'uploads/public/products/images/c336f484-4500-4598-aa8d-b2a3d6ce591a_1765808599261_ebedd2c7.webp', 'c336f484-4500-4598-aa8d-b2a3d6ce591a.webp', 'image/webp', 29450, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:23:20.142', '2025-12-15 14:23:20.142');
INSERT INTO "public"."media" VALUES ('8afdff26-9b46-4445-b850-e105bb624399', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/5328896f-664a-4cc8-81c6-27c34b1d8743_1765808662686_19c0f03c.webp?wrap=0', 'uploads/public/products/images/5328896f-664a-4cc8-81c6-27c34b1d8743_1765808662686_19c0f03c.webp', '5328896f-664a-4cc8-81c6-27c34b1d8743.webp', 'image/webp', 73822, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:24:23.465', '2025-12-15 14:24:23.465');
INSERT INTO "public"."media" VALUES ('1f9c440b-c6db-4aba-8d6b-7e3bb60f12da', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4913a444-f4fb-44be-81b4-7c29e83b8c35_1765808694346_b1c39e6b.webp?wrap=0', 'uploads/public/products/images/4913a444-f4fb-44be-81b4-7c29e83b8c35_1765808694346_b1c39e6b.webp', '4913a444-f4fb-44be-81b4-7c29e83b8c35.webp', 'image/webp', 75360, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:24:54.749', '2025-12-15 14:24:54.749');
INSERT INTO "public"."media" VALUES ('a54d63a1-a90d-4f5a-8749-edc4771bf2dd', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808702422_54f8f207.webp?wrap=0', 'uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808702422_54f8f207.webp', '0e34ab51-dc56-4602-9be4-b4153722c685.webp', 'image/webp', 379558, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:25:02.904', '2025-12-15 14:25:02.904');
INSERT INTO "public"."media" VALUES ('51cf6d29-40b9-499e-ab5c-6576ccf5cf8c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808712974_0d0340e9.webp?wrap=0', 'uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808712974_0d0340e9.webp', '0e34ab51-dc56-4602-9be4-b4153722c685.webp', 'image/webp', 379558, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:25:13.403', '2025-12-15 14:25:13.403');
INSERT INTO "public"."media" VALUES ('480b2336-be28-4228-aa38-324dd4d012e8', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6c1a45e3-e490-46cd-87f4-0f6e7aa6ee5b_1765809294668_ff38ddd7.webp?wrap=0', 'uploads/public/products/images/6c1a45e3-e490-46cd-87f4-0f6e7aa6ee5b_1765809294668_ff38ddd7.webp', '6c1a45e3-e490-46cd-87f4-0f6e7aa6ee5b.webp', 'image/webp', 171070, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:34:55.333', '2025-12-15 14:34:55.333');
INSERT INTO "public"."media" VALUES ('013c9414-683e-4780-a976-e00a9bf9bee2', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6efe75e8-8628-455e-849e-f7216409233f_1765809310448_a104b93d.webp?wrap=0', 'uploads/public/products/images/6efe75e8-8628-455e-849e-f7216409233f_1765809310448_a104b93d.webp', '6efe75e8-8628-455e-849e-f7216409233f.webp', 'image/webp', 83742, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:35:10.878', '2025-12-15 14:35:10.878');
INSERT INTO "public"."media" VALUES ('58554a57-901f-47f5-9a4e-49352a361f24', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4b4e0676-9d94-4cc6-b745-99f02e6a3a75_1765809320998_bfc354a2.webp?wrap=0', 'uploads/public/products/images/4b4e0676-9d94-4cc6-b745-99f02e6a3a75_1765809320998_bfc354a2.webp', '4b4e0676-9d94-4cc6-b745-99f02e6a3a75.webp', 'image/webp', 69812, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:35:21.407', '2025-12-15 14:35:21.407');
INSERT INTO "public"."media" VALUES ('ca430cfc-9edb-47c8-9d0d-323bbc9f9931', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/104f5eba-2ca6-439b-8ab0-cdf22cd2099f_1765809353657_f55a0ae4.webp?wrap=0', 'uploads/public/products/images/104f5eba-2ca6-439b-8ab0-cdf22cd2099f_1765809353657_f55a0ae4.webp', '104f5eba-2ca6-439b-8ab0-cdf22cd2099f.webp', 'image/webp', 45048, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:35:54.062', '2025-12-15 14:35:54.062');

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
INSERT INTO "public"."product_categories" VALUES ('4907c35d-d456-4dda-bb72-2263311ecb04', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', '39f1cbdc-41c6-4d11-b785-94cbf1996177', '2025-12-15 14:07:55.1');

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
INSERT INTO "public"."product_images" VALUES ('7d2fcc0c-a915-42ad-bf60-6412cf2cb991', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Primary product image', 0, 't', '2025-12-15 14:23:20.383', '93b74795-9f5b-4bf5-9193-f1a2c9a11205', NULL);
INSERT INTO "public"."product_images" VALUES ('d3d79607-a44a-4b6b-a6ca-3ed6a3e7705e', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Product image 2', 1, 'f', '2025-12-15 14:24:23.562', '8afdff26-9b46-4445-b850-e105bb624399', NULL);
INSERT INTO "public"."product_images" VALUES ('39d82a35-aba3-42c9-a78f-aa16632b14d9', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Product image 3', 2, 'f', '2025-12-15 14:24:54.846', '1f9c440b-c6db-4aba-8d6b-7e3bb60f12da', NULL);
INSERT INTO "public"."product_images" VALUES ('b1cfbd3f-8337-4bb4-a119-6b2dbb2c7edf', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Product image 4', 3, 'f', '2025-12-15 14:25:02.996', 'a54d63a1-a90d-4f5a-8749-edc4771bf2dd', NULL);
INSERT INTO "public"."product_images" VALUES ('677d188a-71e5-4e50-b4a4-13a46764a59f', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Product image 5', 4, 'f', '2025-12-15 14:34:55.543', '480b2336-be28-4228-aa38-324dd4d012e8', NULL);
INSERT INTO "public"."product_images" VALUES ('a9f26590-06d2-4e28-a82d-ba7751ac75be', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Product image 6', 5, 'f', '2025-12-15 14:35:10.971', '013c9414-683e-4780-a976-e00a9bf9bee2', NULL);
INSERT INTO "public"."product_images" VALUES ('aa9083a5-111f-4fa3-9360-d0c027ce3681', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Product image 7', 6, 'f', '2025-12-15 14:35:21.498', '58554a57-901f-47f5-9a4e-49352a361f24', NULL);
INSERT INTO "public"."product_images" VALUES ('8c1e6765-5ac4-4551-9e4b-429b161e0710', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Product image 8', 7, 'f', '2025-12-15 14:35:54.158', 'ca430cfc-9edb-47c8-9d0d-323bbc9f9931', NULL);

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
INSERT INTO "public"."product_reviews" VALUES ('f169ca31-ad22-4460-a802-cbbbcb71ab6f', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 5, 'Đỉnh nha mấy bà', '', 'f', 'f', 0, '2026-01-06 08:28:18.993', '2026-01-06 08:28:18.993');
INSERT INTO "public"."product_reviews" VALUES ('332c312d-a9d7-4375-a90d-26ffd0c865ca', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 5, '', '', 'f', 't', 0, '2026-01-06 08:52:34.019', '2026-01-07 06:23:24.737');

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
-- Records of product_stats
-- ----------------------------
INSERT INTO "public"."product_stats" VALUES ('6b6188fb-21c4-41ce-b659-75ab57f64ac3', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 0, 0.00, NULL, 0, 0, NULL, '2026-01-06 07:52:03.741', '2026-01-06 08:52:02.988');
INSERT INTO "public"."product_stats" VALUES ('fac0fe7b-5fb1-46c7-b144-648aa91cc26d', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 0, 0.00, 5.00, 1, 0, NULL, '2026-01-06 07:52:03.789', '2026-01-07 06:23:25.235');

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
INSERT INTO "public"."products" VALUES ('6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'kem-mat-va-mat-ahc-mo-nam-lam-djeu-mau-da-pro-shot-gluta-ctivation-bright-3-30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', '95440379', 'cc214951-a62b-4650-b06a-11d3848bcb03', 515755.00, 542900.00, 't', 'f', 30.00, 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml giá rẻ', '2025-12-15 14:07:55.1', '2025-12-15 14:07:55.1');

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
INSERT INTO "public"."user_role_assignments" VALUES ('4988c9a6-2f45-4676-a52e-9339ac61bc72', 'edfd5d77-bd20-4aec-ae70-4a2976847fa3', '019ad71b-5d94-7788-8816-5c28161bd32b', '2025-11-30 23:43:53.845', '2025-11-30 23:43:53.845');
INSERT INTO "public"."user_role_assignments" VALUES ('019ad73b-4b16-706d-94b3-f76930948e51', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '019ad71c-0363-77dd-8909-2bb9f6360eff', '2025-11-30 23:43:53.845', '2025-11-30 23:43:53.845');
INSERT INTO "public"."user_role_assignments" VALUES ('d1f7f430-5d1b-4b8d-8b88-b7cce8b411aa', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', '019ad71b-5d94-7788-8816-5c28161bd32b', '2025-12-11 10:03:26.466', '2025-12-11 10:03:26.466');

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
INSERT INTO "public"."user_roles" VALUES ('019ad71b-5d94-7788-8816-5c28161bd32b', 'Khách hàng', '2025-12-01 06:31:56', '2025-12-01 06:32:00');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-789f-8218-cf4a01088597', 'Cộng tác viên', '2025-12-01 06:32:37', '2025-12-01 06:32:39');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-7ddb-8b7c-fc270e6c33d6', 'Đại lý', '2025-12-01 06:32:37', '2025-12-01 06:32:39');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-77dd-8909-2bb9f6360eff', 'Quản trị viên', '2025-12-01 06:38:51', '2025-12-01 06:38:54');

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
INSERT INTO "public"."users" VALUES ('edfd5d77-bd20-4aec-ae70-4a2976847fa3', 'user1@example.com', 'John', 'Doe', '+1234567891', 'user1', '$2b$10$NhJ/s.Ms5lToR8JCwLzhC.5rqk4EM3mu9ImcX482sM0MYfXdkgogO', '2025-11-30 23:43:53.845', '2025-12-01 00:05:33.414', NULL, 't', 'f', 'f', 'f', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZGZkNWQ3Ny1iZDIwLTRhZWMtYWU3MC00YTI5NzY4NDdmYTMiLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzY0NTQ3NTMzLCJleHAiOjE3NjcxMzk1MzN9.BcHzJUFFqqVZmaAleh30ZGnnFXnVKDVuAEokqht-y24', NULL);
INSERT INTO "public"."users" VALUES ('24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'Nguyễn', 'Lu', '0123456789', 'lucan1', '$2b$10$3RgYDM3n9/3tGFwszsqk5eYVIZid89huDbKVxfYOW.v0mqdqEcYvG', '2025-12-11 10:03:26.466', '2025-12-11 10:29:43.93', '2025-12-11 10:29:43.927', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNGExMWRjNC0yOTZlLTRhY2ItYmFkZi02ZDc5MjlkM2Y3YzgiLCJ1c2VybmFtZSI6Imx1Y2FuMSIsImlhdCI6MTc2NTQ0ODYxNywiZXhwIjoxNzY4MDQwNjE3fQ.MtSC0YTOA4uwmuZjHT0TGr55g8nGOPgc3etxdnXHLJE', NULL);
INSERT INTO "public"."users" VALUES ('bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'Hàn Tiểu', 'Ling', '+1234567890', 'htligz', '$2b$10$K4ifXXbH4EpLt7Y9yNvLa.L6nB.hXejOFpyPf0mIDNkEcknpCX8rC', '2025-11-05 17:44:38.293', '2026-01-06 08:14:42.237', '2025-12-09 14:06:15.871', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZDlmZGNjMS01MjQ3LTQ5YTItOWVkNC0xZjAwNWRkNDdjZDIiLCJ1c2VybmFtZSI6Imh0bGlneiIsImlhdCI6MTc2NzY4NzI4MiwiZXhwIjoxNzcwMjc5MjgyfQ.AAQJVCRY2b9kzFsw4XJ8aTETUX_M1bHGuLs2sGENwus', 'e8cd3ded-a0c2-4fc2-8520-6c5182e30f13');

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
CREATE INDEX "banners_group_id_idx" ON "public"."banners" USING btree (
  "group_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
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
-- Foreign Keys structure for table banners
-- ----------------------------
ALTER TABLE "public"."banners" ADD CONSTRAINT "banners_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."banner_groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
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
ALTER TABLE "public"."product_inventory" ADD CONSTRAINT "product_inventory_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Foreign Keys structure for table review_images
-- ----------------------------
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table user_role_assignments
-- ----------------------------
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."user_roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_avatar_media_id_fkey" FOREIGN KEY ("avatar_media_id") REFERENCES "public"."media" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
