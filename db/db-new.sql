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

 Date: 14/06/2026 20:42:29
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
-- Type structure for BlogCommentReportReason
-- ----------------------------
DROP TYPE IF EXISTS "public"."BlogCommentReportReason";
CREATE TYPE "public"."BlogCommentReportReason" AS ENUM (
  'SPAM',
  'INAPPROPRIATE',
  'HARASSMENT',
  'MISINFORMATION',
  'OTHER'
);
ALTER TYPE "public"."BlogCommentReportReason" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for BlogCommentReportStatus
-- ----------------------------
DROP TYPE IF EXISTS "public"."BlogCommentReportStatus";
CREATE TYPE "public"."BlogCommentReportStatus" AS ENUM (
  'PENDING',
  'REVIEWED',
  'RESOLVED',
  'REJECTED'
);
ALTER TYPE "public"."BlogCommentReportStatus" OWNER TO "_f0b6369f8abe5380";

-- ----------------------------
-- Type structure for BlogPostStatus
-- ----------------------------
DROP TYPE IF EXISTS "public"."BlogPostStatus";
CREATE TYPE "public"."BlogPostStatus" AS ENUM (
  'DRAFT',
  'PUBLISHED'
);
ALTER TYPE "public"."BlogPostStatus" OWNER TO "_f0b6369f8abe5380";

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
  'GENERAL_IMAGE',
  'BLOG_TOPIC_IMAGE',
  'BLOG_POST_IMAGE'
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
-- Type structure for ProductType
-- ----------------------------
DROP TYPE IF EXISTS "public"."ProductType";
CREATE TYPE "public"."ProductType" AS ENUM (
  'INVENTORY',
  'AFFILIATE'
);
ALTER TYPE "public"."ProductType" OWNER TO "_f0b6369f8abe5380";

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
  "type" "public"."AddressType" NOT NULL DEFAULT 'HOME'::"AddressType",
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of addresses
-- ----------------------------
INSERT INTO "public"."addresses" VALUES ('6cbfbb4b-cedf-480e-b3fa-8ff4010c6d4e', '2a36312f-f039-4e10-8346-44189bf87362', 'bububcha', '0356645875', '1A Burton Hills Boulevard', '', 'Huyện Bảo Lâm', 'Tỉnh Cao Bằng', 'Xã Lý Bôn', 'Vietnam', 'f', '2026-04-07 09:39:54.573', '2026-04-07 09:39:54.573', 'HOME', NULL, 'f');
INSERT INTO "public"."addresses" VALUES ('3a90605b-bb9f-4f0e-ab76-adb3bba122fe', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'Kan Tan', '3090557033', 'hcm33', '', 'Quận Ba Đình', 'Thành phố Hà Nội', 'Phường Trúc Bạch', 'Vietnam', 'f', '2026-02-16 09:43:42.703', '2026-02-24 06:37:53.545', 'HOME', NULL, 'f');
INSERT INTO "public"."addresses" VALUES ('2d7a9b06-68a9-4104-8694-8242151a6923', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'Ebe Lingg', '0359719793', 'ngõ 158a phú thái tân thịnh', '', 'Thành phố Thái Nguyên', 'Tỉnh Thái Nguyên', 'Phường Tân Thịnh', 'Vietnam', 't', '2026-02-20 15:28:08.506', '2026-02-28 14:33:48.068', 'HOME', NULL, 'f');
INSERT INTO "public"."addresses" VALUES ('3982c640-31d2-4686-abea-def0f0297cea', '2a36312f-f039-4e10-8346-44189bf87362', 'Phồ Thanh Dụng', '03636363636', '120 , Yên Lãng ', '', 'Quận Hà Đông', 'Thành phố Hà Nội', 'Phường Mộ Lao', 'Vietnam', 't', '2026-03-28 05:19:06.819', '2026-03-28 05:19:06.819', 'HOME', NULL, 'f');
INSERT INTO "public"."addresses" VALUES ('b087bbb9-2f6f-4cf2-8f2b-9cd6fb0d13ed', '2a36312f-f039-4e10-8346-44189bf87362', 'bảo hiểm y tế', '0356645875', '1A Burton Hills Boulevard', '', 'Huyện Mèo Vạc', 'Tỉnh Hà Giang', 'Xã Pải Lủng', 'Vietnam', 'f', '2026-04-07 09:11:09.448', '2026-04-07 09:11:53.238', 'HOME', '2026-04-07 09:11:53.236', 't');
INSERT INTO "public"."addresses" VALUES ('0f889060-b4e5-484e-bd11-920f60f881e9', '2a36312f-f039-4e10-8346-44189bf87362', 'Phu Ng', '0356645875', '1A Burton Hills Boulevard', '', 'Huyện Bảo Lâm', 'Tỉnh Cao Bằng', 'Xã Lý Bôn', 'Vietnam', 'f', '2026-04-07 09:12:20.153', '2026-04-07 09:12:20.153', 'HOME', NULL, 'f');
INSERT INTO "public"."addresses" VALUES ('d263d262-c886-4276-a1d6-106bb753d2e2', '2a36312f-f039-4e10-8346-44189bf87362', 'bububcha', '0356645875', '1A Burton Hills Boulevard', '', 'Huyện Đồng Văn', 'Tỉnh Hà Giang', 'Xã Má Lé', 'Vietnam', 'f', '2026-04-07 09:13:12.887', '2026-04-07 09:13:12.887', 'HOME', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
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
-- Records of banner_group_mappings
-- ----------------------------
INSERT INTO "public"."banner_group_mappings" VALUES ('acc54833-0fea-4cec-acf1-b26b1e51f41b', '78b90b89-7961-447d-bbee-e18601d852ed', '78e55817-81ee-4312-923e-f8ab28960ffd', 1, '2026-01-07 10:11:41.897');
INSERT INTO "public"."banner_group_mappings" VALUES ('e32b2655-b051-4245-9b4f-703a6ca415d9', 'f44429dc-f589-4a87-af6a-1a2b2d1f9742', '78e55817-81ee-4312-923e-f8ab28960ffd', 2, '2026-01-07 10:11:41.973');
INSERT INTO "public"."banner_group_mappings" VALUES ('2a30d1f7-5010-4545-ac93-e3fc0a4236d0', 'd2247869-a03c-4e79-8c39-f29034941f24', '78e55817-81ee-4312-923e-f8ab28960ffd', 3, '2026-01-07 10:11:42.048');
INSERT INTO "public"."banner_group_mappings" VALUES ('2b26a1aa-a058-43ab-9303-d10630f9dc11', '03d3c99e-0f44-4a47-8fcf-88ffc9182282', '78e55817-81ee-4312-923e-f8ab28960ffd', 1, '2026-01-07 10:11:42.15');
INSERT INTO "public"."banner_group_mappings" VALUES ('a5abb252-9367-42cd-8293-0c9a3d09f435', '39632dd3-fcb2-44c0-a202-a27bd5060275', '78e55817-81ee-4312-923e-f8ab28960ffd', 2, '2026-01-07 10:11:42.222');
INSERT INTO "public"."banner_group_mappings" VALUES ('0ef6cb84-d7ba-44a9-88bf-1f4eaa2916aa', '5410b9f1-2d80-4d51-99ee-325ae5c24116', '058ad3c5-be6a-410e-9d06-394ae17bea12', 0, '2026-03-16 08:32:05.237');
INSERT INTO "public"."banner_group_mappings" VALUES ('63944053-1bfc-4e41-98c2-e631d9c03d10', 'f84dcb74-6dd9-4914-9aa2-c4ba3b026ccf', '058ad3c5-be6a-410e-9d06-394ae17bea12', 0, '2026-03-16 08:32:36.15');
INSERT INTO "public"."banner_group_mappings" VALUES ('103392e6-53a7-4334-be7f-cbb13068739c', '2a702013-cea1-4a94-8d9b-13065342bf78', '058ad3c5-be6a-410e-9d06-394ae17bea12', 0, '2026-03-16 08:40:05.701');
INSERT INTO "public"."banner_group_mappings" VALUES ('781f125b-d12f-435a-bef1-aa224185f219', '866d9dbf-3fca-44e1-8a6a-41f4c7c3d98f', '058ad3c5-be6a-410e-9d06-394ae17bea12', 1, '2026-03-16 08:40:14.522');
INSERT INTO "public"."banner_group_mappings" VALUES ('4d847a0a-1119-491d-839a-48ff177a8df9', '7e66e6d1-f9c9-48a7-aa0b-a9c406666d40', '058ad3c5-be6a-410e-9d06-394ae17bea12', 0, '2026-03-16 09:08:34.15');
INSERT INTO "public"."banner_group_mappings" VALUES ('badbfbe1-9339-43cc-a7d3-4445bace1189', 'ef82cd6f-6131-4005-ad2a-4110d28a5caa', '058ad3c5-be6a-410e-9d06-394ae17bea12', 0, '2026-03-16 09:13:05.916');
INSERT INTO "public"."banner_group_mappings" VALUES ('02a0797b-d28d-4c33-bc89-efbee99cf10f', '547f5e59-9403-4745-a190-d65728447a1c', '058ad3c5-be6a-410e-9d06-394ae17bea12', 0, '2026-03-17 07:06:22.902');
INSERT INTO "public"."banner_group_mappings" VALUES ('6ca86e94-8bc5-412f-83bd-28780bc24de4', 'f44429dc-f589-4a87-af6a-1a2b2d1f9742', '058ad3c5-be6a-410e-9d06-394ae17bea12', 2, '2026-03-18 06:21:19.994');
INSERT INTO "public"."banner_group_mappings" VALUES ('e33e04c1-562e-4182-a67c-e8693c48fb04', '547f5e59-9403-4745-a190-d65728447a1c', '07496266-01b0-4212-9133-48e551a40aec', 3, '2026-03-19 08:35:16.283');
INSERT INTO "public"."banner_group_mappings" VALUES ('ee5cbe4c-2817-4976-8b64-30da41fadb51', '7e66e6d1-f9c9-48a7-aa0b-a9c406666d40', '07496266-01b0-4212-9133-48e551a40aec', 4, '2026-03-19 09:12:51.02');
INSERT INTO "public"."banner_group_mappings" VALUES ('b78bb28d-c423-44bf-959e-f7112b81c9d4', 'ef82cd6f-6131-4005-ad2a-4110d28a5caa', '07496266-01b0-4212-9133-48e551a40aec', 5, '2026-03-19 09:12:53.747');
INSERT INTO "public"."banner_group_mappings" VALUES ('b147f871-c4dd-43f8-afe1-7ff56dd3ea6d', '82f22a69-29b5-4893-afc8-34862a5dcdd2', 'd8b8ae6b-a067-4d34-ae6c-11748d1ba682', 0, '2026-03-26 09:46:22.92');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of banner_groups
-- ----------------------------
INSERT INTO "public"."banner_groups" VALUES ('78e55817-81ee-4312-923e-f8ab28960ffd', 'Homepage Main Banners', 'homepage-main', 'Main banner group for homepage display', 't', NULL, NULL, '2026-01-07 10:11:41.818', '2026-01-07 10:11:41.818', NULL, 'f');
INSERT INTO "public"."banner_groups" VALUES ('058ad3c5-be6a-410e-9d06-394ae17bea12', 'banner tet 2026 clone 3', 'banner-tet-2026- clon clon', 'agsg', 't', '2026-03-15 00:00:00', '2026-03-17 00:00:00', '2026-03-15 15:31:35.255', '2026-03-18 06:46:43.829', NULL, 'f');
INSERT INTO "public"."banner_groups" VALUES ('07496266-01b0-4212-9133-48e551a40aec', 'banner lễ 30/4', 'banner-le-3004', '30/4', 't', '2026-04-30 00:00:00', '2026-05-03 00:00:00', '2026-03-18 06:47:49.252', '2026-03-18 06:47:49.252', NULL, 'f');
INSERT INTO "public"."banner_groups" VALUES ('d8b8ae6b-a067-4d34-ae6c-11748d1ba682', 'Banner 22-3 22-4', 'banner-22-3-22-4', 'Banner 22-3 22-4', 't', '2026-03-22 00:00:00', '2026-04-22 00:00:00', '2026-03-26 09:23:09.709', '2026-03-26 09:23:09.709', NULL, 'f');
INSERT INTO "public"."banner_groups" VALUES ('67f045d8-49be-4d52-9f09-e0cef8ff9c67', 'Giỗ tổ hùng vương', 'gio-to-hung-vuong', 'gio to hung vuong', 't', NULL, NULL, '2026-03-29 14:29:04.351', '2026-03-30 09:51:44.751', '2026-03-30 09:51:44.683', 't');

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
  "gradient_to" varchar(50) COLLATE "pg_catalog"."default",
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of banners
-- ----------------------------
INSERT INTO "public"."banners" VALUES ('78b90b89-7961-447d-bbee-e18601d852ed', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-01-07 10:11:41.858', '2026-01-07 10:27:59.025', '#ffe4f0', '#fff5fb', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('f44429dc-f589-4a87-af6a-1a2b2d1f9742', 'TEXT', 'MAIN_CAROUSEL', 'Ưu đãi hôm nay', 'Giảm đến 50% sản phẩm chăm sóc da', 'Chọn ngay routine phù hợp cho làn da của bạn với deal siêu hời.', 'Giảm đến -50%', 'Khám phá ngay', '/products', 'Áp dụng cho sản phẩm được gắn nhãn Flash Sale.', NULL, 't', '2026-01-07 10:11:41.937', '2026-01-07 10:11:41.937', '#e0f2ff', '#ffffff', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('d2247869-a03c-4e79-8c39-f29034941f24', 'TEXT', 'MAIN_CAROUSEL', 'Hội viên mới', 'Tặng voucher 50K cho đơn đầu tiên', 'Đăng ký tài khoản để nhận thêm nhiều ưu đãi cực dễ thương.', 'Voucher 50K', 'Đăng ký ngay', '/auth/register', 'Áp dụng cho đơn từ 299K.', NULL, 't', '2026-01-07 10:11:42.01', '2026-01-07 10:11:42.01', '#fff4e0', '#ffffff', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('03d3c99e-0f44-4a47-8fcf-88ffc9182282', 'TEXT', 'SIDE_TOP', 'Sạch sâu nhưng vẫn dịu nhẹ', 'Combo làm sạch da 100%', 'Làm sạch nhiều lớp makeup, không khô căng.', 'Chỉ từ 58K', 'Xem ngay', '/products', NULL, NULL, 't', '2026-01-07 10:11:42.085', '2026-01-07 10:11:42.085', '#e5f6ff', '#ffffff', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('39632dd3-fcb2-44c0-a202-a27bd5060275', 'TEXT', 'SIDE_BOTTOM', 'Độc quyền tại Beauty Box', 'Kem nền Mesh Blur mịn lì', 'Hiệu ứng blur mờ mịn, che phủ cho lớp nền tự nhiên.', 'Mua kèm nhận quà tặng', 'Xem ngay', '/products', NULL, NULL, 't', '2026-01-07 10:11:42.186', '2026-01-07 10:11:42.186', '#f4e6ff', '#ffffff', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('5410b9f1-2d80-4d51-99ee-325ae5c24116', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:32:04.951', '2026-03-16 08:32:04.951', '#ffe4f0', '#fff5fb', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('f84dcb74-6dd9-4914-9aa2-c4ba3b026ccf', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH2', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:32:35.69', '2026-03-16 08:32:35.69', '#ffe4f0', '#fff5fb', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('2a702013-cea1-4a94-8d9b-13065342bf78', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH3', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:40:05.523', '2026-03-16 08:40:05.523', '#ffe4f0', '#fff5fb', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('866d9dbf-3fca-44e1-8a6a-41f4c7c3d98f', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH4', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:40:14.356', '2026-03-16 08:40:14.356', '#ffe4f0', '#fff5fb', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('7e66e6d1-f9c9-48a7-aa0b-a9c406666d40', 'IMAGE', 'SIDE_TOP', 'Beauty Box', 'abccc', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', '3a84f7f1-965b-49f9-a369-f969bf79d8bd', 't', '2026-03-16 09:08:33.879', '2026-03-16 09:08:33.879', '#ffe4f0', '#fff5fb', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('ef82cd6f-6131-4005-ad2a-4110d28a5caa', 'IMAGE', 'SIDE_TOP', 'Beauty Box', 'abccc', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', '4fa17852-82f9-402f-8e80-535304ada5c4', 't', '2026-03-16 09:13:05.525', '2026-03-16 09:13:05.525', '#ffe4f0', '#fff5fb', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('547f5e59-9403-4745-a190-d65728447a1c', 'IMAGE', 'SIDE_TOP', '1bc', 'ahiahi', 'ahihi', 'ahihi', 'aduduu', NULL, NULL, 'dddf1a70-67a3-44ea-84f5-93c465647995', 't', '2026-03-17 07:06:22.89', '2026-03-19 09:14:41.618', '#FF6B9D', '#FF8E53', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('82f22a69-29b5-4893-afc8-34862a5dcdd2', 'IMAGE', 'MAIN_CAROUSEL', NULL, 'Banner chính 1', '1aa', NULL, NULL, '#', NULL, '2dac9985-4763-4b8c-b13c-cae32dd9f933', 't', '2026-03-26 09:46:22.871', '2026-03-26 10:11:05.17', '#FF6B9D', '#FF8E53', NULL, 'f');
INSERT INTO "public"."banners" VALUES ('04c17816-aab5-46f3-bcb0-a07e9c2c429b', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', 'd1073a47-7ea5-49c9-983f-922533b21276', 't', '2026-03-30 09:11:47.879', '2026-03-30 09:32:36.583', '#ffe4f0', '#fff5fb', '2026-03-30 09:32:36.578', 't');

-- ----------------------------
-- Table structure for blog_comment_reports
-- ----------------------------
DROP TABLE IF EXISTS "public"."blog_comment_reports";
CREATE TABLE "public"."blog_comment_reports" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "comment_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "reporter_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "reason" "public"."BlogCommentReportReason" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "status" "public"."BlogCommentReportStatus" NOT NULL DEFAULT 'PENDING'::"BlogCommentReportStatus",
  "reviewed_by" text COLLATE "pg_catalog"."default",
  "reviewed_at" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of blog_comment_reports
-- ----------------------------
INSERT INTO "public"."blog_comment_reports" VALUES ('8d20954b-39c6-404d-b19e-4b6a7d830f82', '53da85e1-d3c2-4ed3-b9d3-f42cd2c1c20d', '2a36312f-f039-4e10-8346-44189bf87362', 'HARASSMENT', 'ádfasdfads', 'PENDING', '2a36312f-f039-4e10-8346-44189bf87362', '2026-04-06 04:19:24.005', '2026-04-04 04:20:56.152', '2026-04-06 04:19:24.007');

-- ----------------------------
-- Table structure for blog_comments
-- ----------------------------
DROP TABLE IF EXISTS "public"."blog_comments";
CREATE TABLE "public"."blog_comments" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "post_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "parent_id" text COLLATE "pg_catalog"."default",
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "is_deleted" bool NOT NULL DEFAULT false,
  "deleted_at" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of blog_comments
-- ----------------------------
INSERT INTO "public"."blog_comments" VALUES ('53da85e1-d3c2-4ed3-b9d3-f42cd2c1c20d', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, 'hi', 'f', NULL, '2026-04-03 10:09:23.9', '2026-04-03 10:16:27.127');
INSERT INTO "public"."blog_comments" VALUES ('a0f18e5d-762e-46dc-8c94-315c44a88f1f', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'shop scam', 't', '2026-04-06 04:10:52.683', '2026-04-04 04:20:26.258', '2026-04-06 04:10:52.684');
INSERT INTO "public"."blog_comments" VALUES ('78bac1cf-78c1-4cde-9aaf-4bb6989443d3', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '53da85e1-d3c2-4ed3-b9d3-f42cd2c1c20d', 'hihihihi', 'f', NULL, '2026-04-03 10:16:31.558', '2026-04-06 05:03:36.908');
INSERT INTO "public"."blog_comments" VALUES ('6d771ab1-a7f1-4479-89ac-ad516abd63f4', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'shop cute', 't', '2026-04-06 05:21:21.437', '2026-04-06 05:19:46.355', '2026-04-06 05:21:21.438');
INSERT INTO "public"."blog_comments" VALUES ('e04a08f1-da75-44e5-bef8-bdd7e2f09c7c', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, '.', 't', '2026-04-10 07:45:55.7', '2026-04-10 07:45:35.892', '2026-04-10 07:45:55.7');
INSERT INTO "public"."blog_comments" VALUES ('190f6675-b92a-404d-9965-4bce35ec0fdd', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, '123', 't', '2026-04-10 07:47:04.315', '2026-04-10 07:46:07.551', '2026-04-10 07:47:04.316');
INSERT INTO "public"."blog_comments" VALUES ('4baad382-33ad-4a0d-9d04-ae133d32bb44', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, '.', 't', '2026-04-10 07:52:05.617', '2026-04-10 07:51:58.193', '2026-04-10 07:52:05.617');
INSERT INTO "public"."blog_comments" VALUES ('f285ec85-519e-46a2-9bed-6393301e6a39', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, '..', 't', '2026-04-10 07:57:38.802', '2026-04-10 07:57:36.072', '2026-04-10 07:57:38.802');
INSERT INTO "public"."blog_comments" VALUES ('0392f3bb-23ba-4817-b5c9-70c5ce696ecf', '2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, '123', 't', '2026-04-12 16:16:16.284', '2026-04-12 16:16:10.944', '2026-04-12 16:16:16.285');

-- ----------------------------
-- Table structure for blog_posts
-- ----------------------------
DROP TABLE IF EXISTS "public"."blog_posts";
CREATE TABLE "public"."blog_posts" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "slug" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "excerpt" varchar(500) COLLATE "pg_catalog"."default",
  "topic_id" text COLLATE "pg_catalog"."default",
  "author_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "featured_image_id" text COLLATE "pg_catalog"."default",
  "status" "public"."BlogPostStatus" NOT NULL DEFAULT 'DRAFT'::"BlogPostStatus",
  "tags" text[] COLLATE "pg_catalog"."default" DEFAULT ARRAY[]::text[],
  "view_count" int4 NOT NULL DEFAULT 0,
  "meta_title" varchar(255) COLLATE "pg_catalog"."default",
  "meta_description" varchar(500) COLLATE "pg_catalog"."default",
  "is_deleted" bool NOT NULL DEFAULT false,
  "deleted_at" timestamp(3),
  "published_at" timestamp(3),
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of blog_posts
-- ----------------------------
INSERT INTO "public"."blog_posts" VALUES ('ca334163-ea65-459b-bfc5-3975c522c5b2', '10 Bước Chăm Sóc Da Cơ Bản Cho Làn Da Khỏe Đẹp', '10-buoc-cham-soc-da-co-ban-cho-lan-da-khoe-djep', '
            <h2>Giới thiệu</h2>
            <p>Chăm sóc da là một phần quan trọng trong thói quen làm đẹp hàng ngày. Một làn da khỏe mạnh không chỉ giúp bạn tự tin hơn mà còn phản ánh sức khỏe tổng thể của cơ thể.</p>
            
            <h2>10 Bước Chăm Sóc Da</h2>
            <ol>
              <li><strong>Tẩy trang:</strong> Loại bỏ hoàn toàn lớp trang điểm và bụi bẩn</li>
              <li><strong>Rửa mặt:</strong> Làm sạch sâu với sữa rửa mặt phù hợp</li>
              <li><strong>Toner:</strong> Cân bằng độ pH cho da</li>
              <li><strong>Essence:</strong> Cung cấp dưỡng chất cho da</li>
              <li><strong>Serum:</strong> Điều trị các vấn đề da chuyên sâu</li>
              <li><strong>Kem mắt:</strong> Chăm sóc vùng da mỏng manh quanh mắt</li>
              <li><strong>Kem dưỡng:</strong> Khóa ẩm và nuôi dưỡng da</li>
              <li><strong>Kem chống nắng:</strong> Bảo vệ da khỏi tia UV (ban ngày)</li>
              <li><strong>Mặt nạ:</strong> Chăm sóc đặc biệt 2-3 lần/tuần</li>
              <li><strong>Tẩy tế bào chết:</strong> Loại bỏ da chết 1-2 lần/tuần</li>
            </ol>
            
            <h2>Kết luận</h2>
            <p>Kiên trì thực hiện đầy đủ các bước chăm sóc da sẽ giúp bạn có được làn da khỏe đẹp, rạng rỡ.</p>
          ', 'Hướng dẫn chi tiết 10 bước chăm sóc da cơ bản giúp bạn có làn da khỏe đẹp, rạng rỡ mỗi ngày.', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, 'PUBLISHED', '{"chăm sóc da",skincare,"làm đẹp","da khỏe"}', 0, '10 Bước Chăm Sóc Da Cơ Bản Cho Làn Da Khỏe Đẹp', 'Hướng dẫn chi tiết 10 bước chăm sóc da cơ bản giúp bạn có làn da khỏe đẹp, rạng rỡ mỗi ngày.', 'f', NULL, '2026-03-30 22:04:41.888', '2026-03-30 22:04:41.892', '2026-03-30 22:04:41.892');
INSERT INTO "public"."blog_posts" VALUES ('65413b4e-5fc6-4049-ab78-187b9518beb0', '5 Cách Phục Hồi Tóc Hư Tổn Tại Nhà Hiệu Quả', '5-cach-phuc-hoi-toc-hu-ton-tai-nha-hieu-qua', '
            <h2>Nguyên nhân tóc hư tổn</h2>
            <p>Tóc hư tổn có thể do nhiều nguyên nhân: nhuộm, uốn, duỗi, sấy nhiệt độ cao, thiếu dưỡng chất, tác động môi trường...</p>
            
            <h2>5 Cách phục hồi tóc tại nhà</h2>
            
            <h3>1. Ủ tóc bằng dầu dừa</h3>
            <p>Dầu dừa giàu acid béo, giúp nuôi dưỡng tóc từ sâu bên trong. Thoa dầu dừa lên tóc, ủ 30 phút rồi gội sạch.</p>
            
            <h3>2. Mặt nạ trứng gà</h3>
            <p>Trứng gà giàu protein, giúp phục hồi cấu trúc tóc. Đánh 1-2 quả trứng, thoa lên tóc, ủ 20 phút.</p>
            
            <h3>3. Dưỡng tóc bằng bơ</h3>
            <p>Bơ chứa vitamin E, giúp tóc mềm mượt. Nghiền bơ chín, thoa lên tóc, ủ 30 phút.</p>
            
            <h3>4. Xả tóc bằng giấm táo</h3>
            <p>Giấm táo giúp cân bằng pH, làm tóc bóng mượt. Pha loãng giấm táo với nước, xả sau khi gội.</p>
            
            <h3>5. Sử dụng serum dưỡng tóc</h3>
            <p>Serum chứa keratin, argan oil giúp phục hồi tóc nhanh chóng. Thoa lên tóc ẩm sau khi gội.</p>
            
            <h2>Lưu ý</h2>
            <ul>
              <li>Hạn chế sử dụng nhiệt độ cao</li>
              <li>Cắt tỉa đầu tóc định kỳ</li>
              <li>Dùng dầu gội phù hợp với tóc hư tổn</li>
              <li>Uống đủ nước, ăn nhiều rau xanh</li>
            </ul>
          ', '5 phương pháp đơn giản, hiệu quả giúp phục hồi tóc hư tổn ngay tại nhà với nguyên liệu tự nhiên.', 'ee9a9387-fafa-4821-80d4-4dbc09561d12', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, 'PUBLISHED', '{"chăm sóc tóc","tóc hư tổn","phục hồi tóc","làm đẹp tự nhiên"}', 0, '5 Cách Phục Hồi Tóc Hư Tổn Tại Nhà Hiệu Quả', '5 phương pháp đơn giản, hiệu quả giúp phục hồi tóc hư tổn ngay tại nhà với nguyên liệu tự nhiên.', 'f', NULL, '2026-03-30 22:04:42.103', '2026-03-30 22:04:42.105', '2026-03-30 22:04:42.105');
INSERT INTO "public"."blog_posts" VALUES ('027b8e82-f4f7-46fd-92bd-29905eba35d5', 'Xu Hướng Trang Điểm 2024: Tự Nhiên Và Tươi Tắn', 'xu-huong-trang-djiem-2024-tu-nhien-va-tuoi-tan', '
            <h2>Xu hướng trang điểm năm 2024</h2>
            <p>Năm 2024 đánh dấu sự trở lại của phong cách trang điểm tự nhiên, tôn vinh vẻ đẹp nguyên bản của mỗi người.</p>
            
            <h2>Các xu hướng nổi bật</h2>
            
            <h3>1. No-Makeup Makeup</h3>
            <p>Trang điểm như không trang điểm, tập trung vào làn da trong suốt, tự nhiên với lớp nền mỏng nhẹ.</p>
            
            <h3>2. Dewy Skin</h3>
            <p>Làn da ẩm mượt, căng bóng tự nhiên thay vì lớp phấn mờ hoàn toàn.</p>
            
            <h3>3. Soft Glam</h3>
            <p>Trang điểm nhẹ nhàng nhưng vẫn nổi bật với màu mắt pastel, môi nude hồng.</p>
            
            <h3>4. Bold Lips</h3>
            <p>Môi đậm màu trở lại với các tông đỏ, cam, nâu đất.</p>
            
            <h3>5. Natural Brows</h3>
            <p>Lông mày tự nhiên, rậm rạp thay vì vẽ quá sắc nét.</p>
            
            <h2>Sản phẩm cần có</h2>
            <ul>
              <li>Kem nền nhẹ hoặc BB cream</li>
              <li>Highlighter dạng lỏng</li>
              <li>Phấn má hồng tự nhiên</li>
              <li>Son dưỡng có màu</li>
              <li>Mascara làm dài mi</li>
            </ul>
          ', 'Khám phá các xu hướng trang điểm hot nhất năm 2024 với phong cách tự nhiên, tươi tắn và tôn vinh vẻ đẹp nguyên bản.', '15c13b75-30e4-460c-909b-876abe917cc2', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, 'PUBLISHED', '{"trang điểm",makeup,"xu hướng 2024","làm đẹp"}', 1, 'Xu Hướng Trang Điểm 2024: Tự Nhiên Và Tươi Tắn', 'Khám phá các xu hướng trang điểm hot nhất năm 2024 với phong cách tự nhiên, tươi tắn và tôn vinh vẻ đẹp nguyên bản.', 'f', NULL, '2026-03-30 22:04:42', '2026-03-30 22:04:42.002', '2026-06-09 21:42:57.838');
INSERT INTO "public"."blog_posts" VALUES ('64b6ccd5-353c-45a0-972c-2e7bf09a045e', 'Bí Quyết Trang Điểm Lâu Trôi Cho Ngày Dài', 'bi-quyet-trang-djiem-lau-troi-cho-ngay-dai', '
            <h2>Chuẩn bị da trước khi trang điểm</h2>
            <p>Làn da được chuẩn bị kỹ càng là nền tảng cho lớp trang điểm lâu trôi.</p>
            
            <h2>Các bước trang điểm lâu trôi</h2>
            
            <h3>Bước 1: Dưỡng da</h3>
            <p>Làm sạch, toner, serum và kem dưỡng ẩm. Đợi 5-10 phút để da hấp thụ hoàn toàn.</p>
            
            <h3>Bước 2: Primer</h3>
            <p>Sử dụng primer phù hợp với loại da để tạo lớp nền mịn màng, giúp makeup bám tốt hơn.</p>
            
            <h3>Bước 3: Kem nền</h3>
            <p>Chọn kem nền long-wear, thoa mỏng nhiều lớp thay vì một lớp dày.</p>
            
            <h3>Bước 4: Che khuyết điểm</h3>
            <p>Dùng concealer che khuyết điểm, set bằng phấn phủ mỏng.</p>
            
            <h3>Bước 5: Phấn phủ</h3>
            <p>Set toàn bộ lớp nền bằng phấn phủ, tập trung vào vùng chữ T.</p>
            
            <h3>Bước 6: Trang điểm mắt</h3>
            <p>Dùng eye primer trước khi đánh phấn mắt. Chọn phấn mắt dạng cream hoặc long-wear.</p>
            
            <h3>Bước 7: Son môi</h3>
            <p>Dùng chì kẻ môi, thoa son, thấm giấy ăn, phủ phấn, thoa lại lớp son thứ 2.</p>
            
            <h3>Bước 8: Setting spray</h3>
            <p>Xịt setting spray để khóa lớp makeup, giúp lâu trôi cả ngày.</p>
            
            <h2>Mẹo thêm</h2>
            <ul>
              <li>Giấy thấm dầu thay vì phủ phấn nhiều lần</li>
              <li>Mang theo son và phấn phủ để touch-up</li>
              <li>Tránh chạm tay vào mặt</li>
            </ul>
          ', 'Hướng dẫn chi tiết các bước và bí quyết trang điểm lâu trôi, giúp bạn tự tin suốt cả ngày dài.', '15c13b75-30e4-460c-909b-876abe917cc2', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, 'PUBLISHED', '{"trang điểm","makeup lâu trôi","mẹo makeup","làm đẹp"}', 1, 'Bí Quyết Trang Điểm Lâu Trôi Cho Ngày Dài', 'Hướng dẫn chi tiết các bước và bí quyết trang điểm lâu trôi, giúp bạn tự tin suốt cả ngày dài.', 'f', NULL, '2026-03-30 22:04:42.052', '2026-03-30 22:04:42.054', '2026-06-11 15:45:22.354');
INSERT INTO "public"."blog_posts" VALUES ('08b69cbd-f357-46db-af30-04fb739f8169', 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'miffy-chinh-hang-dja-co-mat-tai-lingbeauty', '<p><strong>MIFFY</strong><br><strong>NGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LAN</strong></p><p><br></p><p style="text-align: justify;"><br>Miffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ cười hình chữ X đặc trưng, Miffy mang đến cảm giác bình yên, trong trẻo và gần gũi ngay từ ánh nhìn đầu tiên.<br><br>Được sáng tạo bởi họa sĩ Dick Bruna, Miffy đại diện cho thế giới tuổi thơ giản dị, nơi mọi điều đều nhẹ nhàng, tích cực và đầy yêu thương. Trong thế giới hiện đại đầy màu sắc và chuyển động nhanh, Miffy nhắc chúng ta sống chậm lại một chút. Để yêu thương nhiều hơn. Để tận hưởng từng khoảnh khắc rất đỗi đời thường – cùng gia đình, cùng con trẻ, cùng chính mình.<br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/4f8782cc-1283-4c9b-83d3-27697d3d921d.webp"></p><h2 style="text-align: justify;"><strong><br>CHẤT LIỆU &amp; SỰ AN TOÀN</strong></h2><p style="text-align: justify;">Miffy tin rằng những điều chạm vào tuổi thơ cần thật dịu dàng và an tâm. Miffy luôn đặt sự an toàn và cảm giác dễ chịu lên hàng đầu trong từng sản phẩm.</p><h3 style="text-align: justify;"><strong>Chất liệu</strong></h3><p style="text-align: justify;">- Vải mềm mại, thân thiện với làn da</p><p style="text-align: justify;">- Không gây kích ứng</p><p style="text-align: justify;">- Phù hợp sử dụng hằng ngày cho cả trẻ em và người lớn</p><h3 style="text-align: justify;"><strong>Phù hợp với từng độ tuổi</strong></h3><p style="text-align: justify;">- Đồ chơi nhồi bông: An toàn cho bé từ 0+, mềm mại, dễ ôm, dễ vệ sinh</p><h3 style="text-align: justify;"><strong>Sản phẩm móc khóa (có móc kim loại):</strong></h3><p>Phù hợp cho trẻ từ 3 tuổi trở lên (3+) và người lớn</p><p style="text-align: justify;">Mỗi sản phẩm đều được thiết kế để vừa đáng yêu, vừa yên tâm khi sử dụng.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/505741f1-e912-489b-88d7-c7974bda1152.webp"></p><h2 style="text-align: justify;"><strong><br>NHỮNG SẢN PHẨM NỔI BẬT MIFFY</strong></h2><p style="text-align: justify;"></p><p style="text-align: justify;">- <strong>Thú bông Miffy </strong>– Mềm mại, dễ ôm, người bạn nhỏ đồng hành cùng giấc ngủ</p><p style="text-align: justify;">- <strong>Móc khóa Miffy </strong>– Nhỏ gọn, xinh xắn, điểm nhấn dễ thương cho balo, túi xách</p><p style="text-align: justify;">- <strong>Áo Miffy </strong>– phong cách tối giản, nhẹ nhàng cho mọi lứa tuổi</p><p style="text-align: justify;">Mỗi sản phẩm là một cách Miffy ở bên – thật gần, thật tự nhiên.</p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/a41a53fa-1e81-4ee1-ae13-010d6d92fef2.webp"></p><h2><strong><br>MINI BAG KEYCHAIN BLINDBOX</strong></h2><p style="text-align: justify;">Mở hộp và khám phá phiên bản Miffy khác biệt. Móc khóa bí ẩn mang đến trải nghiệm mở hộp đầy thú vị với 6 phiên bản độc đáo cùng 1 phiên bản secret hiếm có.</p><p style="text-align: justify;">Móc khóa xinh xắn kích thước 13cm, tô iểm cho túi xách, balo hay chìa khóa. Hoàn hảo cho fan Miffy và những ai yêu thích đồ sưu tập.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/d7ebc895-c39a-476f-a823-3a2f9cc0b029.webp"></p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p></p><p><br></p><p style="text-align: justify;"><strong>MIFFY – NHỎ XINH NHƯNG ĐỦ ĐỂ YÊU</strong></p><p style="text-align: justify;"></p><p style="text-align: justify;">Miffy tin rằng hạnh phúc đến từ những điều giản dị.</p><p style="text-align: justify;">Một món đồ nhỏ.</p><p style="text-align: justify;">Một người bạn dễ thương.</p><p style="text-align: justify;">Một khoảnh khắc bình yên trong ngày.<br><br><br><em>Beauty Box mong bạn kết nối cùng Miffy qua những sản phẩm đáng yêu, mang lại trải nghiệm ngọt ngào và gần gũi mỗi ngày. Hãy để Miffy làm bạn đồng hành trong cuộc sống của bạn</em></p>', NULL, 'ee9a9387-fafa-4821-80d4-4dbc09561d12', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'MIFFYNGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LANMiffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ ', 't', '2026-03-31 06:37:07.54', NULL, '2026-03-31 06:00:10.8', '2026-03-31 06:37:07.54');
INSERT INTO "public"."blog_posts" VALUES ('22ee8235-4cbd-41cc-9d35-9b075242861b', 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY1', 'miffy-chinh-hang-dja-co-mat-tai-lingbeauty1', '<p><strong>MIFFY</strong><br><strong>NGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LAN</strong></p><p><br></p><p style="text-align: justify;"><br>Miffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ cười hình chữ X đặc trưng, Miffy mang đến cảm giác bình yên, trong trẻo và gần gũi ngay từ ánh nhìn đầu tiên.<br><br>Được sáng tạo bởi họa sĩ Dick Bruna, Miffy đại diện cho thế giới tuổi thơ giản dị, nơi mọi điều đều nhẹ nhàng, tích cực và đầy yêu thương. Trong thế giới hiện đại đầy màu sắc và chuyển động nhanh, Miffy nhắc chúng ta sống chậm lại một chút. Để yêu thương nhiều hơn. Để tận hưởng từng khoảnh khắc rất đỗi đời thường – cùng gia đình, cùng con trẻ, cùng chính mình.<br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/4f8782cc-1283-4c9b-83d3-27697d3d921d.webp"></p><h2 style="text-align: justify;"><strong><br>CHẤT LIỆU &amp; SỰ AN TOÀN</strong></h2><p style="text-align: justify;">Miffy tin rằng những điều chạm vào tuổi thơ cần thật dịu dàng và an tâm. Miffy luôn đặt sự an toàn và cảm giác dễ chịu lên hàng đầu trong từng sản phẩm.</p><h3 style="text-align: justify;"><strong>Chất liệu</strong></h3><p style="text-align: justify;">- Vải mềm mại, thân thiện với làn da</p><p style="text-align: justify;">- Không gây kích ứng</p><p style="text-align: justify;">- Phù hợp sử dụng hằng ngày cho cả trẻ em và người lớn</p><h3 style="text-align: justify;"><strong>Phù hợp với từng độ tuổi</strong></h3><p style="text-align: justify;">- Đồ chơi nhồi bông: An toàn cho bé từ 0+, mềm mại, dễ ôm, dễ vệ sinh</p><h3 style="text-align: justify;"><strong>Sản phẩm móc khóa (có móc kim loại):</strong></h3><p>Phù hợp cho trẻ từ 3 tuổi trở lên (3+) và người lớn</p><p style="text-align: justify;">Mỗi sản phẩm đều được thiết kế để vừa đáng yêu, vừa yên tâm khi sử dụng.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/505741f1-e912-489b-88d7-c7974bda1152.webp"></p><h2 style="text-align: justify;"><strong><br>NHỮNG SẢN PHẨM NỔI BẬT MIFFY</strong></h2><p style="text-align: justify;"></p><p style="text-align: justify;">- <strong>Thú bông Miffy </strong>– Mềm mại, dễ ôm, người bạn nhỏ đồng hành cùng giấc ngủ</p><p style="text-align: justify;">- <strong>Móc khóa Miffy </strong>– Nhỏ gọn, xinh xắn, điểm nhấn dễ thương cho balo, túi xách</p><p style="text-align: justify;">- <strong>Áo Miffy </strong>– phong cách tối giản, nhẹ nhàng cho mọi lứa tuổi</p><p style="text-align: justify;">Mỗi sản phẩm là một cách Miffy ở bên – thật gần, thật tự nhiên.</p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/a41a53fa-1e81-4ee1-ae13-010d6d92fef2.webp"></p><h2><strong><br>MINI BAG KEYCHAIN BLINDBOX</strong></h2><p style="text-align: justify;">Mở hộp và khám phá phiên bản Miffy khác biệt. Móc khóa bí ẩn mang đến trải nghiệm mở hộp đầy thú vị với 6 phiên bản độc đáo cùng 1 phiên bản secret hiếm có.</p><p style="text-align: justify;">Móc khóa xinh xắn kích thước 13cm, tô iểm cho túi xách, balo hay chìa khóa. Hoàn hảo cho fan Miffy và những ai yêu thích đồ sưu tập.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/d7ebc895-c39a-476f-a823-3a2f9cc0b029.webp"></p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p></p><p><br></p><p style="text-align: justify;"><strong>MIFFY – NHỎ XINH NHƯNG ĐỦ ĐỂ YÊU</strong></p><p style="text-align: justify;"></p><p style="text-align: justify;">Miffy tin rằng hạnh phúc đến từ những điều giản dị.</p><p style="text-align: justify;">Một món đồ nhỏ.</p><p style="text-align: justify;">Một người bạn dễ thương.</p><p style="text-align: justify;">Một khoảnh khắc bình yên trong ngày.<br><br><br><em>Beauty Box mong bạn kết nối cùng Miffy qua những sản phẩm đáng yêu, mang lại trải nghiệm ngọt ngào và gần gũi mỗi ngày. Hãy để Miffy làm bạn đồng hành trong cuộc sống của bạn</em></p>', NULL, 'ee9a9387-fafa-4821-80d4-4dbc09561d12', '2a36312f-f039-4e10-8346-44189bf87362', '06344b44-5a3b-4355-8a1c-eddb87d78d14', 'DRAFT', '{}', 0, 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY1', 'MIFFYNGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LANMiffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ ', 't', '2026-03-31 06:15:17.446', NULL, '2026-03-31 06:04:32.345', '2026-03-31 06:15:17.448');
INSERT INTO "public"."blog_posts" VALUES ('2f979fe8-fadd-43b5-b623-37466b4ff44d', 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'miffy-chinh-hang-dja-co-mat-tai-lingbeauty-ezpedj', '<p><strong>MIFFY</strong><br><strong>NGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LAN</strong></p><p><br></p><p style="text-align: justify;"><br>Miffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ cười hình chữ X đặc trưng, Miffy mang đến cảm giác bình yên, trong trẻo và gần gũi ngay từ ánh nhìn đầu tiên.<br><br>Được sáng tạo bởi họa sĩ Dick Bruna, Miffy đại diện cho thế giới tuổi thơ giản dị, nơi mọi điều đều nhẹ nhàng, tích cực và đầy yêu thương. Trong thế giới hiện đại đầy màu sắc và chuyển động nhanh, Miffy nhắc chúng ta sống chậm lại một chút. Để yêu thương nhiều hơn. Để tận hưởng từng khoảnh khắc rất đỗi đời thường – cùng gia đình, cùng con trẻ, cùng chính mình.<br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/4f8782cc-1283-4c9b-83d3-27697d3d921d.webp"></p><h2 style="text-align: justify;"><strong><br>CHẤT LIỆU &amp; SỰ AN TOÀN</strong></h2><p style="text-align: justify;">Miffy tin rằng những điều chạm vào tuổi thơ cần thật dịu dàng và an tâm. Miffy luôn đặt sự an toàn và cảm giác dễ chịu lên hàng đầu trong từng sản phẩm.</p><h3 style="text-align: justify;"><strong>Chất liệu</strong></h3><p style="text-align: justify;">- Vải mềm mại, thân thiện với làn da</p><p style="text-align: justify;">- Không gây kích ứng</p><p style="text-align: justify;">- Phù hợp sử dụng hằng ngày cho cả trẻ em và người lớn</p><h3 style="text-align: justify;"><strong>Phù hợp với từng độ tuổi</strong></h3><p style="text-align: justify;">- Đồ chơi nhồi bông: An toàn cho bé từ 0+, mềm mại, dễ ôm, dễ vệ sinh</p><h3 style="text-align: justify;"><strong>Sản phẩm móc khóa (có móc kim loại):</strong></h3><p>Phù hợp cho trẻ từ 3 tuổi trở lên (3+) và người lớn</p><p style="text-align: justify;">Mỗi sản phẩm đều được thiết kế để vừa đáng yêu, vừa yên tâm khi sử dụng.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/505741f1-e912-489b-88d7-c7974bda1152.webp"></p><h2 style="text-align: justify;"><strong><br>NHỮNG SẢN PHẨM NỔI BẬT MIFFY</strong></h2><p style="text-align: justify;"></p><p style="text-align: justify;">- <strong>Thú bông Miffy </strong>– Mềm mại, dễ ôm, người bạn nhỏ đồng hành cùng giấc ngủ</p><p style="text-align: justify;">- <strong>Móc khóa Miffy </strong>– Nhỏ gọn, xinh xắn, điểm nhấn dễ thương cho balo, túi xách</p><p style="text-align: justify;">- <strong>Áo Miffy </strong>– phong cách tối giản, nhẹ nhàng cho mọi lứa tuổi</p><p style="text-align: justify;">Mỗi sản phẩm là một cách Miffy ở bên – thật gần, thật tự nhiên.</p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/a41a53fa-1e81-4ee1-ae13-010d6d92fef2.webp"></p><h2><strong><br>MINI BAG KEYCHAIN BLINDBOX</strong></h2><p style="text-align: justify;">Mở hộp và khám phá phiên bản Miffy khác biệt. Móc khóa bí ẩn mang đến trải nghiệm mở hộp đầy thú vị với 6 phiên bản độc đáo cùng 1 phiên bản secret hiếm có.</p><p style="text-align: justify;">Móc khóa xinh xắn kích thước 13cm, tô iểm cho túi xách, balo hay chìa khóa. Hoàn hảo cho fan Miffy và những ai yêu thích đồ sưu tập.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/d7ebc895-c39a-476f-a823-3a2f9cc0b029.webp"></p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p></p><p><br></p><p style="text-align: justify;"><strong>MIFFY – NHỎ XINH NHƯNG ĐỦ ĐỂ YÊU</strong></p><p style="text-align: justify;"></p><p style="text-align: justify;">Miffy tin rằng hạnh phúc đến từ những điều giản dị.</p><p style="text-align: justify;">Một món đồ nhỏ.</p><p style="text-align: justify;">Một người bạn dễ thương.</p><p style="text-align: justify;">Một khoảnh khắc bình yên trong ngày.<br><br><br><em>Beauty Box mong bạn kết nối cùng Miffy qua những sản phẩm đáng yêu, mang lại trải nghiệm ngọt ngào và gần gũi mỗi ngày. Hãy để Miffy làm bạn đồng hành trong cuộc sống của bạn</em></p>', NULL, 'ee9a9387-fafa-4821-80d4-4dbc09561d12', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'PUBLISHED', '{}', 0, 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'MIFFYNGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LANMiffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ ', 't', '2026-03-31 07:32:43.641', '2026-03-31 06:58:32.423', '2026-03-31 06:58:32.698', '2026-03-31 07:32:43.643');
INSERT INTO "public"."blog_posts" VALUES ('5fb8e97c-888e-4378-a9ab-7d3a10f33e21', 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'miffy-chinh-hang-dja-co-mat-tai-lingbeauty-z45cis', '<p><strong>MIFFY</strong><br><strong>NGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LAN</strong></p><p><br></p><p style="text-align: justify;"><br>Miffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ cười hình chữ X đặc trưng, Miffy mang đến cảm giác bình yên, trong trẻo và gần gũi ngay từ ánh nhìn đầu tiên.<br><br>Được sáng tạo bởi họa sĩ Dick Bruna, Miffy đại diện cho thế giới tuổi thơ giản dị, nơi mọi điều đều nhẹ nhàng, tích cực và đầy yêu thương. Trong thế giới hiện đại đầy màu sắc và chuyển động nhanh, Miffy nhắc chúng ta sống chậm lại một chút. Để yêu thương nhiều hơn. Để tận hưởng từng khoảnh khắc rất đỗi đời thường – cùng gia đình, cùng con trẻ, cùng chính mình.<br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/4f8782cc-1283-4c9b-83d3-27697d3d921d.webp"></p><h2 style="text-align: justify;"><strong><br>CHẤT LIỆU &amp; SỰ AN TOÀN</strong></h2><p style="text-align: justify;">Miffy tin rằng những điều chạm vào tuổi thơ cần thật dịu dàng và an tâm. Miffy luôn đặt sự an toàn và cảm giác dễ chịu lên hàng đầu trong từng sản phẩm.</p><h3 style="text-align: justify;"><strong>Chất liệu</strong></h3><p style="text-align: justify;">- Vải mềm mại, thân thiện với làn da</p><p style="text-align: justify;">- Không gây kích ứng</p><p style="text-align: justify;">- Phù hợp sử dụng hằng ngày cho cả trẻ em và người lớn</p><h3 style="text-align: justify;"><strong>Phù hợp với từng độ tuổi</strong></h3><p style="text-align: justify;">- Đồ chơi nhồi bông: An toàn cho bé từ 0+, mềm mại, dễ ôm, dễ vệ sinh</p><h3 style="text-align: justify;"><strong>Sản phẩm móc khóa (có móc kim loại):</strong></h3><p>Phù hợp cho trẻ từ 3 tuổi trở lên (3+) và người lớn</p><p style="text-align: justify;">Mỗi sản phẩm đều được thiết kế để vừa đáng yêu, vừa yên tâm khi sử dụng.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/505741f1-e912-489b-88d7-c7974bda1152.webp"></p><h2 style="text-align: justify;"><strong><br>NHỮNG SẢN PHẨM NỔI BẬT MIFFY</strong></h2><p style="text-align: justify;"></p><p style="text-align: justify;">- <strong>Thú bông Miffy </strong>– Mềm mại, dễ ôm, người bạn nhỏ đồng hành cùng giấc ngủ</p><p style="text-align: justify;">- <strong>Móc khóa Miffy </strong>– Nhỏ gọn, xinh xắn, điểm nhấn dễ thương cho balo, túi xách</p><p style="text-align: justify;">- <strong>Áo Miffy </strong>– phong cách tối giản, nhẹ nhàng cho mọi lứa tuổi</p><p style="text-align: justify;">Mỗi sản phẩm là một cách Miffy ở bên – thật gần, thật tự nhiên.</p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/a41a53fa-1e81-4ee1-ae13-010d6d92fef2.webp"></p><h2><strong><br>MINI BAG KEYCHAIN BLINDBOX</strong></h2><p style="text-align: justify;">Mở hộp và khám phá phiên bản Miffy khác biệt. Móc khóa bí ẩn mang đến trải nghiệm mở hộp đầy thú vị với 6 phiên bản độc đáo cùng 1 phiên bản secret hiếm có.</p><p style="text-align: justify;">Móc khóa xinh xắn kích thước 13cm, tô iểm cho túi xách, balo hay chìa khóa. Hoàn hảo cho fan Miffy và những ai yêu thích đồ sưu tập.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/d7ebc895-c39a-476f-a823-3a2f9cc0b029.webp"></p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p></p><p><br></p><p style="text-align: justify;"><strong>MIFFY – NHỎ XINH NHƯNG ĐỦ ĐỂ YÊU</strong></p><p style="text-align: justify;"></p><p style="text-align: justify;">Miffy tin rằng hạnh phúc đến từ những điều giản dị.</p><p style="text-align: justify;">Một món đồ nhỏ.</p><p style="text-align: justify;">Một người bạn dễ thương.</p><p style="text-align: justify;">Một khoảnh khắc bình yên trong ngày.<br><br><br><em>Beauty Box mong bạn kết nối cùng Miffy qua những sản phẩm đáng yêu, mang lại trải nghiệm ngọt ngào và gần gũi mỗi ngày. Hãy để Miffy làm bạn đồng hành trong cuộc sống của bạn</em></p>', NULL, 'ee9a9387-fafa-4821-80d4-4dbc09561d12', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'PUBLISHED', '{}', 0, 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'MIFFYNGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LANMiffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ ', 't', '2026-03-31 07:32:46.734', '2026-03-31 06:58:40.176', '2026-03-31 06:58:40.179', '2026-03-31 07:32:46.734');
INSERT INTO "public"."blog_posts" VALUES ('7abab084-4e8f-4818-bc72-1b97841a34ce', '123123', '123123', '<p>123123</p>', '123123', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{11,222}', 0, '123123', '123123', 't', '2026-03-31 07:49:52.063', NULL, '2026-03-31 07:48:36.129', '2026-03-31 07:49:52.063');
INSERT INTO "public"."blog_posts" VALUES ('2b97dc72-bf03-4285-9bf6-5cce334f1205', '123', '123-bwfbej', '<p>123</p>', '123', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, '123', '123', 't', '2026-03-31 08:06:46.422', NULL, '2026-03-31 07:52:16.247', '2026-03-31 08:06:46.422');
INSERT INTO "public"."blog_posts" VALUES ('41e6d501-b94d-4d69-aee2-b52fb6213e0d', '123', '123-n276ti', '<p>123</p>', '123', 'ee9a9387-fafa-4821-80d4-4dbc09561d12', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, '123', '123', 't', '2026-03-31 08:06:49.165', NULL, '2026-03-31 07:51:07.719', '2026-03-31 08:06:49.165');
INSERT INTO "public"."blog_posts" VALUES ('5e2e8ede-24e6-4611-ae51-93e6d4498963', '123', '123', '<p>123</p>', '1234', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, '123', '123', 't', '2026-03-31 08:06:58.024', NULL, '2026-03-31 07:50:12.54', '2026-03-31 08:06:58.024');
INSERT INTO "public"."blog_posts" VALUES ('e4a48800-3fb3-4650-a93e-25e36a97b4d5', '123', '123-cqg50l', '<p>123</p>', '123', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, '123', '123', 't', '2026-03-31 08:08:10.635', NULL, '2026-03-31 08:07:14.337', '2026-03-31 08:08:10.635');
INSERT INTO "public"."blog_posts" VALUES ('a6839634-e2a1-46b3-a942-9aa9ed71eea1', '123123', '123123-2nzzxr', '<p>123</p>', '123', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', '2a36312f-f039-4e10-8346-44189bf87362', '407b9a1c-ab06-4fa6-9161-57da187d47e6', 'DRAFT', '{}', 0, '123123', '123', 't', '2026-03-31 14:12:05.529', NULL, '2026-03-31 08:08:30.055', '2026-03-31 14:12:05.529');
INSERT INTO "public"."blog_posts" VALUES ('6c2f2769-9a71-4f09-9a51-e7ae43431550', 'ebeling ❤️😍😍💕💕💕', 'ebeling', '<p>fasdfsafas</p>', NULL, '5689eccc-09d2-49c3-8802-d0e8e121ac87', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'PUBLISHED', '{}', 0, 'ebeling ❤️😍😍💕💕💕', 'fasdfsafas', 't', '2026-03-31 14:17:49.711', '2026-03-31 14:12:39.549', '2026-03-31 14:12:39.551', '2026-03-31 14:17:49.711');
INSERT INTO "public"."blog_posts" VALUES ('4c6e77bd-5eaa-4879-af80-5f1d6a65ead2', 'ebeling ❤️😍😍💕💕💕', 'ebeling-4fkryv', '<p>fasdfsafas</p>', NULL, '5689eccc-09d2-49c3-8802-d0e8e121ac87', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'PUBLISHED', '{}', 0, 'ebeling ❤️😍😍💕💕💕', 'fasdfsafas', 't', '2026-03-31 14:17:53.212', '2026-03-31 14:12:47.901', '2026-03-31 14:12:47.903', '2026-03-31 14:17:53.212');
INSERT INTO "public"."blog_posts" VALUES ('8b4510a9-b03b-4247-bf53-01b4638d096d', 'ebeling ❤️😍😍💕💕💕', 'ebeling-qbb062', '<p>fasdfsafas</p>', NULL, '5689eccc-09d2-49c3-8802-d0e8e121ac87', '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'PUBLISHED', '{}', 0, 'ebeling ❤️😍😍💕💕💕', 'fasdfsafas', 't', '2026-03-31 14:17:57.44', '2026-03-31 14:15:19.33', '2026-03-31 14:15:19.332', '2026-03-31 14:17:57.441');
INSERT INTO "public"."blog_posts" VALUES ('95e84488-43b2-404f-9554-e98dd8dabe69', 'ebeling ❤️😍😍💕💕💕', 'ebeling-1s3xbh', '<p>fasdfsafas</p>', NULL, '5689eccc-09d2-49c3-8802-d0e8e121ac87', '2a36312f-f039-4e10-8346-44189bf87362', '4354cace-ce70-486b-899a-d575caddb917', 'PUBLISHED', '{}', 0, 'ebeling ❤️😍😍💕💕💕', 'fasdfsafas', 't', '2026-03-31 14:39:39.337', '2026-03-31 14:17:39.595', '2026-03-31 14:17:39.598', '2026-03-31 14:39:39.338');
INSERT INTO "public"."blog_posts" VALUES ('34907158-4dce-471e-a5c7-c14a74c42c7f', 'LInh xinh dep', 'linh-xinh-dep-qe060u', '<p style="text-align: right;">sdfsafasdfasdfasf</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'LInh xinh dep', 'sdfsafasdfasdfasf', 't', '2026-03-31 14:29:24.271', NULL, '2026-03-31 14:23:47.053', '2026-03-31 14:29:24.272');
INSERT INTO "public"."blog_posts" VALUES ('904986c8-04d6-4c05-b558-c8c652cb999e', 'LInh xinh dep', 'linh-xinh-dep-6hxk2f', '<p style="text-align: right;">sdfsafasdfasdfasf</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'LInh xinh dep', 'sdfsafasdfasdfasf', 't', '2026-03-31 14:29:33.992', NULL, '2026-03-31 14:22:45.435', '2026-03-31 14:29:33.993');
INSERT INTO "public"."blog_posts" VALUES ('0cf570e9-e010-4558-955c-2991fdaac3d0', 'LInh xinh dep', 'linh-xinh-dep-jntxg2', '<p style="text-align: right;">sdfsafasdfasdfasf</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'LInh xinh dep', 'sdfsafasdfasdfasf', 't', '2026-03-31 14:29:39.177', NULL, '2026-03-31 14:18:32.197', '2026-03-31 14:29:39.177');
INSERT INTO "public"."blog_posts" VALUES ('f09847af-ba30-413a-8d82-ac76f48c53a3', 'LInh xinh dep', 'linh-xinh-dep', '<p style="text-align: right;">sdfsafasdfasdfasf</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'LInh xinh dep', 'sdfsafasdfasdfasf', 't', '2026-03-31 14:29:43.109', NULL, '2026-03-31 14:18:31.069', '2026-03-31 14:29:43.109');
INSERT INTO "public"."blog_posts" VALUES ('2caa0fa4-4d57-41ff-abd4-4f3c34c193c5', 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'miffy-chinh-hang-dja-co-mat-tai-lingbeauty-yz7nch', '<p><strong>MIFFY</strong><br><strong>NGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LAN</strong></p><p><br></p><p style="text-align: justify;"><br>Miffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ cười hình chữ X đặc trưng, Miffy mang đến cảm giác bình yên, trong trẻo và gần gũi ngay từ ánh nhìn đầu tiên.<br><br>Được sáng tạo bởi họa sĩ Dick Bruna, Miffy đại diện cho thế giới tuổi thơ giản dị, nơi mọi điều đều nhẹ nhàng, tích cực và đầy yêu thương. Trong thế giới hiện đại đầy màu sắc và chuyển động nhanh, Miffy nhắc chúng ta sống chậm lại một chút. Để yêu thương nhiều hơn. Để tận hưởng từng khoảnh khắc rất đỗi đời thường – cùng gia đình, cùng con trẻ, cùng chính mình.<br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/4f8782cc-1283-4c9b-83d3-27697d3d921d.webp"></p><h2 style="text-align: justify;"><strong><br>CHẤT LIỆU &amp; SỰ AN TOÀN</strong></h2><p style="text-align: justify;">Miffy tin rằng những điều chạm vào tuổi thơ cần thật dịu dàng và an tâm. Miffy luôn đặt sự an toàn và cảm giác dễ chịu lên hàng đầu trong từng sản phẩm.</p><h3 style="text-align: justify;"><strong>Chất liệu</strong></h3><p style="text-align: justify;">- Vải mềm mại, thân thiện với làn da</p><p style="text-align: justify;">- Không gây kích ứng</p><p style="text-align: justify;">- Phù hợp sử dụng hằng ngày cho cả trẻ em và người lớn</p><h3 style="text-align: justify;"><strong>Phù hợp với từng độ tuổi</strong></h3><p style="text-align: justify;">- Đồ chơi nhồi bông: An toàn cho bé từ 0+, mềm mại, dễ ôm, dễ vệ sinh</p><h3 style="text-align: justify;"><strong>Sản phẩm móc khóa (có móc kim loại):</strong></h3><p>Phù hợp cho trẻ từ 3 tuổi trở lên (3+) và người lớn</p><p style="text-align: justify;">Mỗi sản phẩm đều được thiết kế để vừa đáng yêu, vừa yên tâm khi sử dụng.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/505741f1-e912-489b-88d7-c7974bda1152.webp"></p><h2 style="text-align: justify;"><strong><br>NHỮNG SẢN PHẨM NỔI BẬT MIFFY</strong></h2><p style="text-align: justify;"></p><p style="text-align: justify;">- <strong>Thú bông Miffy </strong>– Mềm mại, dễ ôm, người bạn nhỏ đồng hành cùng giấc ngủ</p><p style="text-align: justify;">- <strong>Móc khóa Miffy </strong>– Nhỏ gọn, xinh xắn, điểm nhấn dễ thương cho balo, túi xách</p><p style="text-align: justify;">- <strong>Áo Miffy </strong>– phong cách tối giản, nhẹ nhàng cho mọi lứa tuổi</p><p style="text-align: justify;">Mỗi sản phẩm là một cách Miffy ở bên – thật gần, thật tự nhiên.</p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/a41a53fa-1e81-4ee1-ae13-010d6d92fef2.webp"></p><h2><strong><br>MINI BAG KEYCHAIN BLINDBOX</strong></h2><p style="text-align: justify;">Mở hộp và khám phá phiên bản Miffy khác biệt. Móc khóa bí ẩn mang đến trải nghiệm mở hộp đầy thú vị với 6 phiên bản độc đáo cùng 1 phiên bản secret hiếm có.</p><p style="text-align: justify;">Móc khóa xinh xắn kích thước 13cm, tô iểm cho túi xách, balo hay chìa khóa. Hoàn hảo cho fan Miffy và những ai yêu thích đồ sưu tập.</p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/d7ebc895-c39a-476f-a823-3a2f9cc0b029.webp"></p><p><br></p><p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2f7bd7b5-68d4-4206-a3af-c6e7302c8948.webp"></p><p></p><p><br></p><p style="text-align: justify;"><strong>MIFFY – NHỎ XINH NHƯNG ĐỦ ĐỂ YÊU</strong></p><p style="text-align: justify;"></p><p style="text-align: justify;">Miffy tin rằng hạnh phúc đến từ những điều giản dị.</p><p style="text-align: justify;">Một món đồ nhỏ.</p><p style="text-align: justify;">Một người bạn dễ thương.</p><p style="text-align: justify;">Một khoảnh khắc bình yên trong ngày.<br><br><br><em>Beauty Box mong bạn kết nối cùng Miffy qua những sản phẩm đáng yêu, mang lại trải nghiệm ngọt ngào và gần gũi mỗi ngày. Hãy để Miffy làm bạn đồng hành trong cuộc sống của bạn</em></p>', NULL, 'ee9a9387-fafa-4821-80d4-4dbc09561d12', '2a36312f-f039-4e10-8346-44189bf87362', '34cabe77-9366-4ae1-99c6-e09275cbff67', 'PUBLISHED', '{}', 28, 'MIFFY CHÍNH HÃNG ĐÃ CÓ MẶT TẠI  LINGBEAUTY', 'MIFFYNGƯỜI BẠN NHỎ ĐẾN TỪ HÀ LANMiffy là chú thỏ trắng nhỏ nhắn đến từ Hà Lan, được yêu mến trên toàn thế giới suốt hơn 70 năm qua. Với đôi mắt tròn xinh và nụ ', 'f', NULL, '2026-03-31 07:20:29.634', '2026-03-31 07:20:30.143', '2026-05-15 14:37:02.844');
INSERT INTO "public"."blog_posts" VALUES ('b6ee2729-6606-4f86-bcad-3a4c5b445668', 'ádfasd', 'adfasd', '<p>ádfas</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', '72044288-e62b-47fd-87f7-8de1b95eb3be', 'DRAFT', '{}', 0, 'ádfasd', 'ádfas', 't', '2026-03-31 14:39:16.437', NULL, '2026-03-31 14:38:56.622', '2026-03-31 14:39:16.437');
INSERT INTO "public"."blog_posts" VALUES ('2ab8561f-a239-4b54-a00f-8e7c2d554338', 'sfasdf', 'sfasdf-g54z96', '<p>àdadsfsadfadsf</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'sfasdf', 'àdadsfsadfadsf', 't', '2026-03-31 14:39:21.311', NULL, '2026-03-31 14:35:30.648', '2026-03-31 14:39:21.312');
INSERT INTO "public"."blog_posts" VALUES ('64f4c827-358b-478a-94b4-698920e4e5c0', 'sfasdf', 'sfasdf', '<p>àdadsfsadfadsf</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'sfasdf', 'àdadsfsadfadsf', 't', '2026-03-31 14:39:27.721', NULL, '2026-03-31 14:32:23.523', '2026-03-31 14:39:27.722');
INSERT INTO "public"."blog_posts" VALUES ('3b0a1425-c8fd-4cb8-b82c-c53641e49799', 'sdfdasfa', 'sdfdasfa', '<p>sfasdfasf</p>', NULL, NULL, '2a36312f-f039-4e10-8346-44189bf87362', NULL, 'DRAFT', '{}', 0, 'sdfdasfa', 'sfasdfasf', 't', '2026-03-31 14:39:33.536', NULL, '2026-03-31 14:30:05.608', '2026-03-31 14:39:33.536');
INSERT INTO "public"."blog_posts" VALUES ('6b12e4de-36ab-4112-b065-0f2c8f239436', 'Cách Chọn Kem Chống Nắng Phù Hợp Với Từng Loại Da', 'cach-chon-kem-chong-nang-phu-hop-voi-tung-loai-da', '
            <h2>Tại sao cần chống nắng?</h2>
            <p>Kem chống nắng là bước quan trọng nhất trong quy trình chăm sóc da. Tia UV không chỉ gây cháy nắng mà còn là nguyên nhân chính gây lão hóa da, nám, tàn nhang và ung thư da.</p>
            
            <h2>Chọn kem chống nắng theo loại da</h2>
            
            <h3>Da dầu</h3>
            <p>Nên chọn kem chống nắng dạng gel, không dầu, có khả năng kiểm soát dầu. Tìm các sản phẩm có chứa silica, niacinamide.</p>
            
            <h3>Da khô</h3>
            <p>Ưu tiên kem chống nắng dạng cream, có thành phần dưỡng ẩm như hyaluronic acid, glycerin, ceramide.</p>
            
            <h3>Da nhạy cảm</h3>
            <p>Chọn kem chống nắng vật lý (physical sunscreen) với zinc oxide hoặc titanium dioxide, không chứa hương liệu và cồn.</p>
            
            <h3>Da hỗn hợp</h3>
            <p>Có thể dùng kem chống nắng dạng lotion nhẹ, cân bằng độ ẩm.</p>
            
            <h2>Lưu ý khi sử dụng</h2>
            <ul>
              <li>Thoa kem chống nắng 15-30 phút trước khi ra ngoài</li>
              <li>Sử dụng đủ lượng (khoảng 2mg/cm²)</li>
              <li>Thoa lại sau mỗi 2 giờ hoặc sau khi tiếp xúc với nước</li>
              <li>Chọn SPF tối thiểu 30 PA+++</li>
            </ul>
          ', 'Hướng dẫn chi tiết cách chọn và sử dụng kem chống nắng phù hợp với từng loại da để bảo vệ da tối ưu.', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, 'PUBLISHED', '{"kem chống nắng","chống nắng","bảo vệ da",SPF}', 3, 'Cách Chọn Kem Chống Nắng Phù Hợp Với Từng Loại Da', 'Hướng dẫn chi tiết cách chọn và sử dụng kem chống nắng phù hợp với từng loại da để bảo vệ da tối ưu.', 'f', NULL, '2026-03-30 22:04:41.948', '2026-03-30 22:04:41.95', '2026-06-10 00:42:32.752');
INSERT INTO "public"."blog_posts" VALUES ('ff0e4a02-d014-404d-9fd8-cbbd9109eca5', 'Top 10 Nguyên Liệu Tự Nhiên Làm Đẹp Da Hiệu Quả2', 'top-10-nguyen-lieu-tu-nhien-lam-djep-da-hieu-qua2', '<h2>Làm đẹp từ thiên nhiên</h2>
            <p>Thiên nhiên cung cấp vô số nguyên liệu quý giá giúp làm đẹp da an toàn, hiệu quả và tiết kiệm.</p>
            
            <h2>10 Nguyên liệu tự nhiên</h2>
            
            <h3>1. Mật ong</h3>
            <p>Kháng khuẩn, dưỡng ẩm, làm sáng da. Thoa trực tiếp hoặc pha với sữa chua.</p>
            
            <h3>2. Nha đam (Aloe Vera)</h3>
            <p>Làm dịu da, trị mụn, dưỡng ẩm. Lấy gel nha đam thoa lên da.</p>
            
            <h3>3. Nghệ</h3>
            <p>Kháng viêm, làm sáng da, trị thâm. Pha bột nghệ với sữa tươi hoặc mật ong.</p>
            
            <h3>4. Chanh</h3>
            <p>Vitamin C, làm sáng da, se khít lỗ chân lông. Pha loãng nước chanh trước khi dùng.</p>
            
            <h3>5. Dầu dừa</h3>
            <p>Dưỡng ẩm sâu, chống lão hóa. Massage nhẹ lên da.</p>
            
            <h3>6. Cà chua</h3>
            <p>Lycopene chống oxy hóa, làm sáng da. Cắt lát mỏng đắp lên mặt.</p>
            
            <h3>7. Dưa leo</h3>
            <p>Làm dịu, dưỡng ẩm, giảm bọng mắt. Cắt lát đắp lên da.</p>
            
            <h3>8. Bơ</h3>
            <p>Vitamin E, dưỡng ẩm, chống lão hóa. Nghiền bơ thoa lên da.</p>
            
            <h3>9. Yến mạch</h3>
            <p>Tẩy tế bào chết nhẹ nhàng, làm dịu da. Pha với sữa chua hoặc mật ong.</p>
            
            <h3>10. Trà xanh</h3>
            <p>Chống oxy hóa, giảm viêm, se khít lỗ chân lông. Dùng nước trà xanh làm toner.</p>
            
            <h2>Lưu ý</h2>
            <p>Test thử trên da tay trước khi dùng. Ngưng sử dụng nếu có dấu hiệu kích ứng.</p>', 'Khám phá 10 nguyên liệu tự nhiên dễ tìm, giúp làm đẹp da hiệu quả, an toàn và tiết kiệm chi phí.', '3b4fe281-7a6d-4ce6-a88b-bb66416c0e17', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', NULL, 'PUBLISHED', '{"làm đẹp tự nhiên","nguyên liệu tự nhiên","chăm sóc da","mặt nạ tự nhiên"}', 2, 'Top 10 Nguyên Liệu Tự Nhiên Làm Đẹp Da Hiệu Quả', 'Khám phá 10 nguyên liệu tự nhiên dễ tìm, giúp làm đẹp da hiệu quả, an toàn và tiết kiệm chi phí.', 'f', NULL, '2026-03-30 22:04:42.157', '2026-03-30 22:04:42.159', '2026-06-14 02:40:09.051');

-- ----------------------------
-- Table structure for blog_topics
-- ----------------------------
DROP TABLE IF EXISTS "public"."blog_topics";
CREATE TABLE "public"."blog_topics" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "slug" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "parent_id" text COLLATE "pg_catalog"."default",
  "image_media_id" text COLLATE "pg_catalog"."default",
  "is_active" bool NOT NULL DEFAULT true,
  "is_deleted" bool NOT NULL DEFAULT false,
  "deleted_at" timestamp(3),
  "sort_order" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of blog_topics
-- ----------------------------
INSERT INTO "public"."blog_topics" VALUES ('11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', 'Chăm sóc da', 'cham-soc-da', 'Hướng dẫn và mẹo chăm sóc da toàn diện', NULL, NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.31', '2026-03-30 22:04:41.31');
INSERT INTO "public"."blog_topics" VALUES ('d3e390b3-bb55-4973-8836-250704bf1713', 'Da khô', 'da-kho', 'Chăm sóc da khô hiệu quả', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.368', '2026-03-30 22:04:41.368');
INSERT INTO "public"."blog_topics" VALUES ('e2d9a2b4-c93d-415b-af71-53531d220ffa', 'Da dầu', 'da-dau', 'Giải pháp cho da dầu', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.42', '2026-03-30 22:04:41.42');
INSERT INTO "public"."blog_topics" VALUES ('d8e0ab70-4ebf-447f-9bb9-b03f2507098a', 'Da nhạy cảm', 'da-nhay-cam', 'Chăm sóc da nhạy cảm', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.471', '2026-03-30 22:04:41.471');
INSERT INTO "public"."blog_topics" VALUES ('15c13b75-30e4-460c-909b-876abe917cc2', 'Trang điểm', 'trang-djiem', 'Kỹ thuật và xu hướng trang điểm', NULL, NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.522', '2026-03-30 22:04:41.522');
INSERT INTO "public"."blog_topics" VALUES ('2508addc-6db0-4701-94e5-86e8fcb9a07a', 'Trang điểm cơ bản', 'trang-djiem-co-ban', 'Hướng dẫn trang điểm cho người mới', '15c13b75-30e4-460c-909b-876abe917cc2', NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.576', '2026-03-30 22:04:41.576');
INSERT INTO "public"."blog_topics" VALUES ('e8ac59ae-2cea-4626-abfc-58f0e12913eb', 'Trang điểm dự tiệc', 'trang-djiem-du-tiec', 'Makeup cho các sự kiện đặc biệt', '15c13b75-30e4-460c-909b-876abe917cc2', NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.629', '2026-03-30 22:04:41.629');
INSERT INTO "public"."blog_topics" VALUES ('ee9a9387-fafa-4821-80d4-4dbc09561d12', 'Chăm sóc tóc', 'cham-soc-toc', 'Bí quyết có mái tóc đẹp', NULL, NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.682', '2026-03-30 22:04:41.682');
INSERT INTO "public"."blog_topics" VALUES ('8e91846b-1d10-47e5-9dde-b4da0d62e8ee', 'Tóc khô xơ', 'toc-kho-xo', 'Phục hồi tóc hư tổn', 'ee9a9387-fafa-4821-80d4-4dbc09561d12', NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.733', '2026-03-30 22:04:41.733');
INSERT INTO "public"."blog_topics" VALUES ('af398888-cf1b-422b-a5b5-c36d55c3ec2b', 'Tóc gàu', 'toc-gau', 'Giải pháp trị gàu hiệu quả', 'ee9a9387-fafa-4821-80d4-4dbc09561d12', NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.784', '2026-03-30 22:04:41.784');
INSERT INTO "public"."blog_topics" VALUES ('3b4fe281-7a6d-4ce6-a88b-bb66416c0e17', 'Làm đẹp tự nhiên', 'lam-djep-tu-nhien', 'Phương pháp làm đẹp từ thiên nhiên', NULL, NULL, 't', 'f', NULL, 0, '2026-03-30 22:04:41.834', '2026-03-30 22:04:41.834');
INSERT INTO "public"."blog_topics" VALUES ('305f19ad-782a-406d-887b-081a16671c1d', 'sản phẩm', 'san-pham-pg9f0i', NULL, NULL, 'c51e78a0-07d8-4574-9208-5f514b83ae2c', 't', 'f', NULL, 0, '2026-03-31 09:17:47.812', '2026-03-31 09:17:48.515');
INSERT INTO "public"."blog_topics" VALUES ('2099594a-a6b4-485b-89b5-9707b4e1c7ac', 'Sản phảm', 'san-pham', 'Tips and tricks for beauty care', NULL, NULL, 't', 't', '2026-03-31 09:21:08.457', 0, '2026-03-31 09:07:24.824', '2026-03-31 09:21:08.458');
INSERT INTO "public"."blog_topics" VALUES ('78501b76-f104-4646-a72e-224d9927af80', 'sản phẩm', 'san-pham-ozdvii', NULL, NULL, NULL, 't', 't', '2026-03-31 09:21:14.797', 0, '2026-03-31 09:16:22.501', '2026-03-31 09:21:14.797');
INSERT INTO "public"."blog_topics" VALUES ('4459bb4b-c886-4c62-9b0d-4379baa391ba', 'sản phẩm', 'san-pham-49mk7s', NULL, NULL, NULL, 't', 't', '2026-03-31 09:21:27.461', 0, '2026-03-31 09:16:09.24', '2026-03-31 09:21:27.461');
INSERT INTO "public"."blog_topics" VALUES ('74966637-ad3c-4032-9f86-3b9e446418f9', 'test', 'test', 'ahihi', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', '6bb09655-2de8-463a-a571-1c405789711f', 't', 'f', NULL, 0, '2026-03-31 09:30:14.296', '2026-03-31 09:30:14.943');
INSERT INTO "public"."blog_topics" VALUES ('0164c9f4-a160-44a3-8a62-e41781b45ce8', '123', '123', '123', '11d0e2e3-e9a7-4166-8e46-ad40f5ee2537', NULL, 't', 'f', NULL, 0, '2026-03-31 10:04:27.624', '2026-03-31 10:04:27.624');
INSERT INTO "public"."blog_topics" VALUES ('59cfc1d1-0ca2-49fd-8ba8-c200323e4fc1', 'Linh  nhung   size XL ❤️💕❤️💕😍', 'linh-nhung-size-xl', NULL, NULL, 'ed0474ee-fef0-49c8-8e20-490993a06bc5', 't', 'f', NULL, 0, '2026-03-31 14:10:53.214', '2026-03-31 14:10:53.798');
INSERT INTO "public"."blog_topics" VALUES ('a0469722-1587-4002-b280-50101ad6fc4d', 'LInh ❤️💕', 'linh', NULL, '0164c9f4-a160-44a3-8a62-e41781b45ce8', '8b85a973-e2fa-4b9a-ace7-a896083dfc93', 't', 't', '2026-03-31 14:11:21.175', 0, '2026-03-31 13:48:23.569', '2026-03-31 14:11:21.176');
INSERT INTO "public"."blog_topics" VALUES ('5689eccc-09d2-49c3-8802-d0e8e121ac87', 'LInh ❤️💕', 'linh-s1s7ax', NULL, '59cfc1d1-0ca2-49fd-8ba8-c200323e4fc1', 'fad3e2c2-687f-4f33-8eb3-da63f6050f42', 't', 'f', NULL, 0, '2026-03-31 14:11:39.676', '2026-03-31 14:11:40.361');

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
  "logo_media_id" text COLLATE "pg_catalog"."default",
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of brands
-- ----------------------------
INSERT INTO "public"."brands" VALUES ('e6f24ef7-0eff-467e-93b6-14b51af43723', 'CLIO', 'clio', 'Thương hiệu CLIO', NULL, 't', '2025-11-20 15:29:58.904', '2025-11-20 15:29:58.904', '8bb07459-85f1-4fc2-8cd4-3d38451d7d20', NULL, 'f');
INSERT INTO "public"."brands" VALUES ('3897d67d-23e5-49e7-8533-f64d910e3780', 'GOODAL', 'goodal', 'Thương hiệu GOODAL', NULL, 't', '2025-11-20 15:35:30.136', '2025-11-20 15:35:30.136', '641426b7-bd5e-4e81-8227-70466d492621', NULL, 'f');
INSERT INTO "public"."brands" VALUES ('7931cc87-0c28-46a3-b2d0-4f073e0d8cd4', 'BANILA CO', 'banila-co', 'Thương hiệu BANILA CO', NULL, 't', '2025-12-15 11:24:19.768', '2025-12-15 11:24:19.768', '8e0865a8-f770-419d-b6f4-87127c5452ff', NULL, 'f');
INSERT INTO "public"."brands" VALUES ('cc214951-a62b-4650-b06a-11d3848bcb03', 'AHC', 'ahc', 'Thương hiệu AHC', NULL, 't', '2025-11-20 15:28:56.617', '2026-03-06 15:06:04.897', '775e73e3-c1d3-4d69-971e-143980ffec74', NULL, 'f');
INSERT INTO "public"."brands" VALUES ('cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 'AMUSE', 'amuse', 'Thương hiệu mỹ phẩm thuần chay AMUSE Hàn Quốc là cái tên đang ngày càng trở nên phổ biến trong cộng đồng yêu thích làm đẹp, đặc biệt là tại thị trường Hàn Quốc và các quốc gia châu Á. Với tiêu chí mang lại những sản phẩm chất lượng, an toàn và hiệu quả, AMUSE đã nhanh chóng chiếm được lòng tin của người tiêu dùng nhờ vào việc kết hợp giữa các thành phần thiên nhiên và công nghệ hiện đại.', NULL, 't', '2026-03-06 15:04:07.27', '2026-03-07 10:06:46.137', '491bad73-2031-4362-b4d1-e72a037d0ed9', NULL, 'f');
INSERT INTO "public"."brands" VALUES ('8f5daaa9-472c-41e6-8cc9-09d7ddeb90fb', 'THE WHOO', 'the-whoo', '<p>Thương hiệu <a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/collections/whoo"><strong>Whoo</strong></a> (còn gọi là The History of Whoo) là biểu tượng của sự kết hợp hoàn hảo giữa truyền thống Đông y và công nghệ hiện đại trong lĩnh vực chăm sóc da. Được phát triển bởi LG Household &amp; Health Care, Whoo mang đến những sản phẩm chăm sóc sắc đẹp cao cấp, lấy cảm hứng từ bí quyết làm đẹp hoàng cung Hàn Quốc.</p><h2 style="text-align: left;"><strong>Lịch Sử và Triết Lý Thương Hiệu của Whoo</strong></h2><p style="text-align: left;">The History of Whoo ra đời với mục tiêu tái hiện lại những phương pháp làm đẹp của các nữ hoàng và hoàng hậu trong cung đình xưa kia. Thương hiệu này không chỉ đơn thuần là các sản phẩm chăm sóc da, mà còn là những tuyệt phẩm kết tinh từ trí tuệ và nghệ thuật Đông y. Triết lý của Whoo là mang đến sự cân bằng và hòa hợp cho làn da, giúp phụ nữ hiện đại sở hữu vẻ đẹp thanh tao và sang trọng như những bậc nữ hoàng xưa.</p><h2 style="text-align: left;"><strong>Công Thức Độc Đáo của Whoo</strong></h2><p style="text-align: left;"><br>Các sản phẩm của Whoo được chế tác từ những thành phần thảo dược quý hiếm và công thức bí truyền từ cung đình Hàn Quốc, kết hợp với công nghệ hiện đại. Những thành phần chính như:</p><ul><li><p><strong>Nhân Sâm Hoàng Cung:</strong> Tăng cường sinh lực và tái tạo làn da.</p></li><li><p><strong>Đông Trùng Hạ Thảo:</strong> Chống lão hóa và cung cấp dưỡng chất sâu cho da.</p></li><li><p><strong>Ngọc Trai và Vàng:</strong> Làm sáng da và tăng độ đàn hồi.</p></li></ul><p style="text-align: left;">Mỗi sản phẩm của Whoo không chỉ là sự kết hợp của các thành phần quý giá, mà còn là quá trình nghiên cứu kỹ lưỡng để đảm bảo hiệu quả và an toàn cho người sử dụng.</p><h2 style="text-align: left;"><strong>Sản Phẩm Đa Dạng của Whoo</strong></h2><p style="text-align: left;"><br>Whoo mang đến một loạt các sản phẩm chăm sóc da và trang điểm đa dạng, bao gồm:</p><ul><li><p><strong>Bộ Sản Phẩm Chăm Sóc Da Chuyên Sâu:</strong> Bao gồm các dòng sản phẩm chống lão hóa, dưỡng trắng, và cung cấp độ ẩm sâu.</p></li><li><p><strong>Mặt Nạ Dưỡng Da:</strong> Đem lại sự tươi trẻ và mịn màng ngay sau lần sử dụng đầu tiên.</p></li><li><p><strong>Sản Phẩm Trang Điểm:</strong> Kết hợp giữa dưỡng da và trang điểm, giúp mang lại vẻ đẹp tự nhiên và lâu trôi.</p></li></ul><h2 style="text-align: left;"><strong>Thiết Kế Sang Trọng của Whoo</strong></h2><p style="text-align: left;"><br>Không chỉ nổi bật với chất lượng vượt trội, các sản phẩm của Whoo còn được thiết kế với bao bì sang trọng, lấy cảm hứng từ nghệ thuật và văn hóa cung đình Hàn Quốc. Mỗi sản phẩm đều mang vẻ đẹp tinh tế, đẳng cấp, là món quà hoàn hảo dành tặng cho chính bản thân hoặc những người thân yêu.</p><h2 style="text-align: left;"><strong>Cam Kết Chất Lượng của Whoo</strong></h2><p style="text-align: left;">Whoo luôn cam kết mang đến những sản phẩm chất lượng cao, an toàn và hiệu quả. Thương hiệu này đã và đang không ngừng nghiên cứu và phát triển để đáp ứng nhu cầu ngày càng cao của người tiêu dùng, đồng thời duy trì giá trị truyền thống và bản sắc văn hóa Hàn Quốc.<br><br>The History of Whoo không chỉ là một thương hiệu mỹ phẩm cao cấp, mà còn là biểu tượng của sự sang trọng và tinh hoa Đông y. Với sự kết hợp hoàn hảo giữa truyền thống và hiện đại, Whoo mang đến cho phái đẹp những sản phẩm chăm sóc da đẳng cấp, giúp tôn vinh và duy trì vẻ đẹp trường tồn theo thời gian.<br>Hãy khám phá và trải nghiệm sản phẩm của Whoo để cảm nhận sự khác biệt và vẻ đẹp tuyệt vời từ thương hiệu danh tiếng này!</p><p style="text-align: left;"><br></p>', NULL, 't', '2026-03-29 14:43:18.142', '2026-03-29 14:43:49.136', '13aad462-a703-4b93-bba3-c01f93f4dc5c', NULL, 'f');
INSERT INTO "public"."brands" VALUES ('69f9198f-b5c8-4256-bf11-b4d0cd4540e7', 'DEAR DAHLIA', 'dear-dahlia', '<h2 style="text-align: left;"><strong>Giới Thiệu Về Thương Hiệu Dear Dahlia</strong></h2><p style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/collections/dear-dahlia"><strong>Dear Dahlia</strong></a> là một thương hiệu mỹ phẩm cao cấp từ Hàn Quốc, nổi bật với triết lý làm đẹp kết hợp giữa sự tinh tế và thiên nhiên. Được lấy cảm hứng từ vẻ đẹp của hoa thược dược (Dahlia), Dear Dahlia không chỉ mang đến những sản phẩm trang điểm chất lượng mà còn tập trung vào việc chăm sóc da một cách an toàn và hiệu quả.</p><h2 style="text-align: left;"><strong>Triết Lý và Cam Kết Của Dear Dahlia</strong></h2><p style="text-align: left;">Dear Dahlia cam kết sử dụng các thành phần tự nhiên, lành tính và an toàn cho làn da. Sản phẩm của Dear Dahlia không chứa các chất gây hại như parabens, phthalates, và sulfates. Thương hiệu này tự hào là mỹ phẩm thuần chay và không thử nghiệm trên động vật (cruelty-free), mang lại sự an tâm cho người tiêu dùng.</p><h2 style="text-align: left;"><strong>Sản Phẩm Nổi Bật Của Dear Dahlia</strong></h2><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/son-thoi-hieu-ung-ban-mo-dear-dahlia-lip-paradise-intense-satin-3-8g"><strong>Lip Paradise Intense Satin:</strong></a></h3><p style="text-align: left;">Dòng son môi cao cấp với thiết kế vỏ lục giác sang trọng, chất son satin mềm mượt, lên màu chuẩn và dưỡng ẩm tốt. Sản phẩm giúp đôi môi luôn mềm mại và quyến rũ suốt cả ngày dài.</p><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/ma-hong-2-in-1-dear-dahlia-blooming-edition-paradise-dual-palette-blusher-duo-mix-blossom-palace-4g"><strong>Blooming Edition Dual Palette</strong></a><strong>:</strong></h3><p style="text-align: left;">Bảng màu đa năng kết hợp giữa phấn mắt và phấn má, giúp tạo nên vẻ đẹp hoàn hảo và tinh tế. Sản phẩm có kết cấu mịn màng, dễ tán và bền màu.</p><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/kem-nen-trang-diem-dear-dahlia-skin-paradise-pure-moisture-cushion-foundation-14ml"><strong>Skin Paradise Pure Moisture Cushion</strong></a><strong>:</strong></h3><p style="text-align: left;"><br>Phấn nước dưỡng ẩm với khả năng che phủ hoàn hảo, mang lại làn da căng mịn, rạng rỡ. Sản phẩm chứa các thành phần dưỡng chất từ thiên nhiên, giúp bảo vệ và nuôi dưỡng da suốt cả ngày.</p><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/blooming-edition-bang-mau-mat-da-hieu-ung-dear-dahlia-secret-garden-palette-9-8g"><strong>Secret Garden Palette</strong></a><strong>:</strong></h3><p style="text-align: left;"><br>Bảng phấn mắt với các gam màu tươi sáng và sang trọng, giúp tạo nên những phong cách trang điểm đa dạng. Sản phẩm có độ bám cao và không gây khô da vùng mắt.</p><p style="text-align: left;"></p><h2 style="text-align: left;"><strong>Đặc Điểm Nổi Bật Của Dear Dahlia</strong></h2><ul><li><p><strong>Thành Phần Thiên Nhiên</strong>: Dear Dahlia sử dụng các thành phần chiết xuất từ hoa thược dược và các loại thực vật tự nhiên, mang lại hiệu quả làm đẹp an toàn và bền vững.</p></li><li><p><strong>Thiết Kế Sang Trọng</strong>: Sản phẩm của Dear Dahlia luôn được thiết kế tinh tế và sang trọng, từ bao bì đến chất lượng sản phẩm.</p></li><li><p><strong>Thân Thiện Với Môi Trường</strong>: Dear Dahlia cam kết bảo vệ môi trường bằng cách sử dụng các thành phần thuần chay và không thử nghiệm trên động vật.</p></li></ul><h2 style="text-align: left;"><strong>Mua Sắm Mỹ Phẩm Dear Dahlia Tại BeautyBox</strong></h2><p style="text-align: left;">Để trải nghiệm các sản phẩm chất lượng từ <strong>Dear Dahlia</strong>, hãy đến với <strong>BeautyBox</strong> - địa chỉ tin cậy cung cấp mỹ phẩm chính hãng. Tại đây, bạn sẽ được tận hưởng những lợi ích vượt trội:</p><ol><li><p><strong>Cam Kết Chính Hãng</strong>: BeautyBox chỉ cung cấp sản phẩm Dear Dahlia chính hãng, đảm bảo chất lượng và an toàn cho người dùng.</p></li><li><p><strong>Giá Cả Hấp Dẫn</strong>: Tại BeautyBox, bạn sẽ tìm thấy những sản phẩm Dear Dahlia với giá cả cạnh tranh cùng nhiều chương trình khuyến mãi hấp dẫn.</p></li><li><p><strong>Dịch Vụ Tư Vấn Chuyên Nghiệp</strong>: Đội ngũ nhân viên giàu kinh nghiệm sẽ giúp bạn lựa chọn những sản phẩm phù hợp nhất với nhu cầu của mình.</p></li><li><p><strong>Giao Hàng Nhanh Chóng</strong>: Hệ thống giao hàng linh hoạt và nhanh chóng của BeautyBox giúp bạn nhận được sản phẩm trong thời gian ngắn nhất.</p></li><li><p><strong>Chính Sách Đổi Trả Rõ Ràng</strong>: BeautyBox có chính sách đổi trả hàng linh hoạt, hỗ trợ khách hàng khi gặp vấn đề với sản phẩm.</p></li></ol><h2 style="text-align: left;"><strong>Hãy Đến Với BeautyBox Ngay Hôm Nay!</strong></h2><p style="text-align: left;">Đừng bỏ lỡ cơ hội trải nghiệm các sản phẩm trang điểm và chăm sóc da cao cấp từ <strong>Dear Dahlia</strong> tại <a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/">BeautyBox</a>. Hãy đến trực tiếp cửa hàng hoặc truy cập trang web của BeautyBox để mua sắm trực tuyến và tận hưởng vẻ đẹp tinh tế cùng <strong>Dear Dahlia</strong>. Đội ngũ BeautyBox luôn sẵn sàng phục vụ bạn với sự tận tâm và chuyên nghiệp nhất!Giới Thiệu Về Thương Hiệu Dear Dahlia</p><p style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/collections/dear-dahlia"><strong>Dear Dahlia</strong></a> là một thương hiệu mỹ phẩm cao cấp từ Hàn Quốc, nổi bật với triết lý làm đẹp kết hợp giữa sự tinh tế và thiên nhiên. Được lấy cảm hứng từ vẻ đẹp của hoa thược dược (Dahlia), Dear Dahlia không chỉ mang đến những sản phẩm trang điểm chất lượng mà còn tập trung vào việc chăm sóc da một cách an toàn và hiệu quả.</p><h2 style="text-align: left;"><strong>Triết Lý và Cam Kết Của Dear Dahlia</strong></h2><p style="text-align: left;">Dear Dahlia cam kết sử dụng các thành phần tự nhiên, lành tính và an toàn cho làn da. Sản phẩm của Dear Dahlia không chứa các chất gây hại như parabens, phthalates, và sulfates. Thương hiệu này tự hào là mỹ phẩm thuần chay và không thử nghiệm trên động vật (cruelty-free), mang lại sự an tâm cho người tiêu dùng.</p><h2 style="text-align: left;"><strong>Sản Phẩm Nổi Bật Của Dear Dahlia</strong></h2><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/son-thoi-hieu-ung-ban-mo-dear-dahlia-lip-paradise-intense-satin-3-8g"><strong>Lip Paradise Intense Satin:</strong></a></h3><p style="text-align: left;">Dòng son môi cao cấp với thiết kế vỏ lục giác sang trọng, chất son satin mềm mượt, lên màu chuẩn và dưỡng ẩm tốt. Sản phẩm giúp đôi môi luôn mềm mại và quyến rũ suốt cả ngày dài.</p><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/ma-hong-2-in-1-dear-dahlia-blooming-edition-paradise-dual-palette-blusher-duo-mix-blossom-palace-4g"><strong>Blooming Edition Dual Palette</strong></a><strong>:</strong></h3><p style="text-align: left;">Bảng màu đa năng kết hợp giữa phấn mắt và phấn má, giúp tạo nên vẻ đẹp hoàn hảo và tinh tế. Sản phẩm có kết cấu mịn màng, dễ tán và bền màu.</p><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/kem-nen-trang-diem-dear-dahlia-skin-paradise-pure-moisture-cushion-foundation-14ml"><strong>Skin Paradise Pure Moisture Cushion</strong></a><strong>:</strong></h3><p style="text-align: left;"><br>Phấn nước dưỡng ẩm với khả năng che phủ hoàn hảo, mang lại làn da căng mịn, rạng rỡ. Sản phẩm chứa các thành phần dưỡng chất từ thiên nhiên, giúp bảo vệ và nuôi dưỡng da suốt cả ngày.</p><h3 style="text-align: left;"><a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/products/blooming-edition-bang-mau-mat-da-hieu-ung-dear-dahlia-secret-garden-palette-9-8g"><strong>Secret Garden Palette</strong></a><strong>:</strong></h3><p style="text-align: left;"><br>Bảng phấn mắt với các gam màu tươi sáng và sang trọng, giúp tạo nên những phong cách trang điểm đa dạng. Sản phẩm có độ bám cao và không gây khô da vùng mắt.</p><p style="text-align: left;"></p><h2 style="text-align: left;"><strong>Đặc Điểm Nổi Bật Của Dear Dahlia</strong></h2><ul><li><p><strong>Thành Phần Thiên Nhiên</strong>: Dear Dahlia sử dụng các thành phần chiết xuất từ hoa thược dược và các loại thực vật tự nhiên, mang lại hiệu quả làm đẹp an toàn và bền vững.</p></li><li><p><strong>Thiết Kế Sang Trọng</strong>: Sản phẩm của Dear Dahlia luôn được thiết kế tinh tế và sang trọng, từ bao bì đến chất lượng sản phẩm.</p></li><li><p><strong>Thân Thiện Với Môi Trường</strong>: Dear Dahlia cam kết bảo vệ môi trường bằng cách sử dụng các thành phần thuần chay và không thử nghiệm trên động vật.</p></li></ul><h2 style="text-align: left;"><strong>Mua Sắm Mỹ Phẩm Dear Dahlia Tại BeautyBox</strong></h2><p style="text-align: left;">Để trải nghiệm các sản phẩm chất lượng từ <strong>Dear Dahlia</strong>, hãy đến với <strong>BeautyBox</strong> - địa chỉ tin cậy cung cấp mỹ phẩm chính hãng. Tại đây, bạn sẽ được tận hưởng những lợi ích vượt trội:</p><ol><li><p><strong>Cam Kết Chính Hãng</strong>: BeautyBox chỉ cung cấp sản phẩm Dear Dahlia chính hãng, đảm bảo chất lượng và an toàn cho người dùng.</p></li><li><p><strong>Giá Cả Hấp Dẫn</strong>: Tại BeautyBox, bạn sẽ tìm thấy những sản phẩm Dear Dahlia với giá cả cạnh tranh cùng nhiều chương trình khuyến mãi hấp dẫn.</p></li><li><p><strong>Dịch Vụ Tư Vấn Chuyên Nghiệp</strong>: Đội ngũ nhân viên giàu kinh nghiệm sẽ giúp bạn lựa chọn những sản phẩm phù hợp nhất với nhu cầu của mình.</p></li><li><p><strong>Giao Hàng Nhanh Chóng</strong>: Hệ thống giao hàng linh hoạt và nhanh chóng của BeautyBox giúp bạn nhận được sản phẩm trong thời gian ngắn nhất.</p></li><li><p><strong>Chính Sách Đổi Trả Rõ Ràng</strong>: BeautyBox có chính sách đổi trả hàng linh hoạt, hỗ trợ khách hàng khi gặp vấn đề với sản phẩm.</p></li></ol><h2 style="text-align: left;"><strong>Hãy Đến Với BeautyBox Ngay Hôm Nay!</strong></h2><p style="text-align: left;">Đừng bỏ lỡ cơ hội trải nghiệm các sản phẩm trang điểm và chăm sóc da cao cấp từ <strong>Dear Dahlia</strong> tại <a target="" rel="noopener noreferrer" class="text-primary-pink underline" href="https://beautybox.com.vn/">BeautyBox</a>. Hãy đến trực tiếp cửa hàng hoặc truy cập trang web của BeautyBox để mua sắm trực tuyến và tận hưởng vẻ đẹp tinh tế cùng <strong>Dear Dahlia</strong>. Đội ngũ BeautyBox luôn sẵn sàng phục vụ bạn với sự tận tâm và chuyên nghiệp nhất</p>', NULL, 't', '2026-03-30 07:29:56.062', '2026-03-30 07:29:56.062', '7333ed69-9f0b-463e-8e7f-31b42752978f', NULL, 'f');

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
-- Records of cart_items
-- ----------------------------
INSERT INTO "public"."cart_items" VALUES ('bfb9231f-d7e6-4a18-8051-d610f29fd4ef', '78e836a3-94e9-4aa6-a600-ceb8ae17a759', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '1db18ed7-865b-4d69-87b8-c88656eff292', 1, '2026-04-30 10:39:43.55', '2026-04-30 10:39:43.55');

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS "public"."carts";
CREATE TABLE "public"."carts" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of carts
-- ----------------------------
INSERT INTO "public"."carts" VALUES ('463cf7ef-dc9d-42ed-a452-b09c75664118', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '2026-02-28 18:47:24.66', '2026-02-28 18:47:24.66', NULL, 'f');
INSERT INTO "public"."carts" VALUES ('6a11a171-e7a6-4eed-88d0-29bf7b38ee72', '2a36312f-f039-4e10-8346-44189bf87362', '2026-03-10 13:50:48.789', '2026-03-10 13:50:48.789', NULL, 'f');
INSERT INTO "public"."carts" VALUES ('3fdcb00a-4600-4dcd-8323-159f616bffaf', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', '2026-04-07 08:42:19.608', '2026-04-07 08:42:19.608', NULL, 'f');
INSERT INTO "public"."carts" VALUES ('495e2e09-a63b-46e7-a69e-9b3e38b26b9d', '4ab98db7-dbb1-4caf-b154-9f50bf631502', '2026-04-12 16:20:00.504', '2026-04-12 16:20:00.504', NULL, 'f');
INSERT INTO "public"."carts" VALUES ('78e836a3-94e9-4aa6-a600-ceb8ae17a759', 'b8416ee5-1a94-4d76-9911-6046649eb9fb', '2026-04-29 13:29:46.949', '2026-04-29 13:29:46.949', NULL, 'f');

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
  "brand_id" text COLLATE "pg_catalog"."default",
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" VALUES ('39f1cbdc-41c6-4d11-b785-94cbf1996177', 'Brand AHC', 'brand-ahc', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-11-20 16:14:33.087', '2025-11-20 16:14:33.087', NULL, 'BRAND', 'cc214951-a62b-4650-b06a-11d3848bcb03', NULL, 'f');
INSERT INTO "public"."categories" VALUES ('dbc5203a-0900-4f46-8a22-62b57a5bb4eb', 'Brand CLIO', 'brand-clio', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-11-20 16:15:34.088', '2025-11-20 16:15:34.088', NULL, 'BRAND', 'e6f24ef7-0eff-467e-93b6-14b51af43723', NULL, 'f');
INSERT INTO "public"."categories" VALUES ('667b465a-a3bd-4e2a-bf57-4107839bfe96', 'Brand GOODAL', 'brand-goodal', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-11-20 16:16:15.936', '2025-11-20 16:16:15.936', NULL, 'BRAND', '3897d67d-23e5-49e7-8533-f64d910e3780', NULL, 'f');
INSERT INTO "public"."categories" VALUES ('c5a94906-24f5-476b-a490-d677f1e8b802', 'Khuyến mãi hot', 'khuyen-mai-hot', 'Sản phẩm khuyến mãi hot', NULL, 't', 0, '2025-11-20 16:26:04.251', '2025-11-20 16:26:04.251', NULL, 'CATEGORY', NULL, NULL, 'f');
INSERT INTO "public"."categories" VALUES ('ed8f42b0-197a-4706-8df0-03fc4b636c2c', 'Sản phẩm cao cấp', 'san-pham-cao-cap', 'Sản phẩm cao cấp', NULL, 't', 0, '2025-11-20 16:26:25.934', '2025-11-20 16:26:25.934', NULL, 'CATEGORY', NULL, NULL, 'f');
INSERT INTO "public"."categories" VALUES ('efa526c6-f7ea-48e3-a3df-edbcf1b280bd', 'Trang điểm', 'trang-djiem', 'Sản phẩm trang điểm', NULL, 't', 0, '2025-11-20 16:27:06.057', '2025-11-20 16:27:06.057', NULL, 'CATEGORY', NULL, NULL, 'f');
INSERT INTO "public"."categories" VALUES ('22efe8cc-9307-491f-8a4e-52164998b55b', 'Chăm sóc da', 'cham-soc-da', 'Sản phẩm chăm sóc da', NULL, 't', 0, '2025-11-20 16:27:17.029', '2025-11-20 16:27:17.029', NULL, 'CATEGORY', NULL, NULL, 'f');
INSERT INTO "public"."categories" VALUES ('f09c0ea5-6508-4f53-befd-5ce727ffcbed', 'Chăm sóc cá nhân', 'cham-soc-ca-nhan', 'Sản phẩm chăm sóc cá nhân', NULL, 't', 0, '2025-11-20 16:27:41.433', '2025-11-20 16:27:41.433', NULL, 'CATEGORY', NULL, NULL, 'f');
INSERT INTO "public"."categories" VALUES ('1c7e487b-4c22-4e87-9f8a-53a626a1da8b', 'Sản phẩm mới', 'san-pham-moi', 'Sản phẩm mới', NULL, 't', 0, '2025-11-20 16:27:59.256', '2025-11-20 16:27:59.256', NULL, 'CATEGORY', NULL, NULL, 'f');
INSERT INTO "public"."categories" VALUES ('0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 'Thương hiệu', 'thuong-hieu', 'Các thương hiệu mỹ phẩm', NULL, 't', -1, '2025-11-20 11:42:49.357', '2025-11-20 11:42:49.357', NULL, 'CATEGORY', NULL, NULL, 'f');
INSERT INTO "public"."categories" VALUES ('b8f869d0-ff9e-4b2b-9166-a4f0ec743c38', 'Brand BANILA CO', 'brand-banila-co', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-12-15 11:25:51.838', '2025-12-15 11:25:51.838', NULL, 'BRAND', '7931cc87-0c28-46a3-b2d0-4f073e0d8cd4', NULL, 'f');
INSERT INTO "public"."categories" VALUES ('cf9a2786-010e-4ce7-936a-aaad063f07bf', 'DEAR DAHLIA', 'dear-dahlia', '<p style="text-align: left;"><strong>DEAR DAHLIA</strong></p><p><br></p>', '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2026-03-30 07:30:59.233', '2026-03-30 07:30:59.233', '015b94eb-40ce-4f27-a10c-6e14534e7a89', 'BRAND', '69f9198f-b5c8-4256-bf11-b4d0cd4540e7', NULL, 'f');
INSERT INTO "public"."categories" VALUES ('7540b59a-d659-42d6-8663-2e8249451a00', 'amuse', 'amuse', 'amuse', '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2026-03-06 14:18:37.707', '2026-03-30 07:33:10.603', '6cbc59f0-8f6a-4e44-a69b-3f008a56c6f1', 'BRAND', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
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
INSERT INTO "public"."coupon_usages" VALUES ('c872eddc-3c61-4f95-a20e-e8eba296d9ce', '5ba55801-dd9f-463d-95b3-2f86763f9e7d', '41794ec8-335d-45fb-a75c-00d7c9f37342', 10000.00, '2026-03-29 14:25:35.084');
INSERT INTO "public"."coupon_usages" VALUES ('71a01bce-80a2-41a1-bcf3-40b5bd89fcbb', '472aa2ca-bd9f-42dc-a6ea-67e4bd216936', '8e110219-bbbb-49bb-a1b9-9f6f5e907d2e', 36000.00, '2026-04-12 16:18:50.847');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of coupons
-- ----------------------------
INSERT INTO "public"."coupons" VALUES ('e62e587d-19bf-49ed-a1b7-340da021e3bf', 'WELCOME10', 'PERCENTAGE', 10.00, 200000.00, 50000.00, 100, 0, '2025-01-01 00:00:00', '2026-03-31 23:59:59', 't', '2026-03-16 19:10:26.063', '2026-03-16 19:10:26.063', NULL, 'f');
INSERT INTO "public"."coupons" VALUES ('5ba55801-dd9f-463d-95b3-2f86763f9e7d', 'LINGTHAINGUYEN', 'PERCENTAGE', 10.00, 100000.00, 10000.00, 1, 1, '2026-03-19 00:00:00', '2026-04-18 00:00:00', 't', '2026-03-19 07:51:44.429', '2026-03-29 17:49:05.696', '2026-03-29 17:49:05.696', 'f');
INSERT INTO "public"."coupons" VALUES ('472aa2ca-bd9f-42dc-a6ea-67e4bd216936', 'LINGDETHUONG', 'FIXED', 36000.00, 100000.00, NULL, 36, 1, '2026-03-19 00:00:00', '2026-04-18 00:00:00', 't', '2026-03-19 07:50:41.578', '2026-04-12 16:18:50.839', NULL, 'f');

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
-- Records of daily_stats
-- ----------------------------
INSERT INTO "public"."daily_stats" VALUES ('32f8109a-3d2b-4ed5-a85d-bf86654d30ca', '2026-03-01', 0, 0, 5, 0, 0, 0, 0, 0.00, 3, 0, 0, 0, 0, '2026-03-01 14:29:07.418', '2026-03-01 14:29:10.663');
INSERT INTO "public"."daily_stats" VALUES ('b4b7a5ff-43d5-4299-a9c2-5b5b28671bba', '2026-03-02', 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, 0, 0, '2026-03-02 09:33:16.543', '2026-03-02 09:33:16.543');
INSERT INTO "public"."daily_stats" VALUES ('64b5c011-ab35-4cd3-9b9c-c5e2169149a7', '2026-03-18', 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, 0, 0, '2026-03-18 17:27:11.603', '2026-03-18 17:27:11.603');
INSERT INTO "public"."daily_stats" VALUES ('27f316b7-f6c5-4011-8025-4ddebeed2971', '2026-03-20', 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, 0, 10, '2026-03-20 08:48:13.353', '2026-03-20 14:21:11.131');
INSERT INTO "public"."daily_stats" VALUES ('530e1b43-6f49-4f7d-8f76-51a6af5ed291', '2026-03-21', 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, 1, 1, '2026-03-21 07:32:26.174', '2026-03-21 08:06:04.353');
INSERT INTO "public"."daily_stats" VALUES ('2924a283-f645-4ab1-8bbd-b7528604597a', '2026-03-26', 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, 0, 0, '2026-03-26 14:38:10.134', '2026-03-26 14:38:10.134');
INSERT INTO "public"."daily_stats" VALUES ('992b0e92-7691-499e-9308-c39a93291b58', '2026-03-29', 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, 0, 2, '2026-03-29 14:23:39.219', '2026-03-29 14:23:40.434');
INSERT INTO "public"."daily_stats" VALUES ('25c5276e-da2b-40e6-b93c-1b6142f3d1b1', '2026-04-12', 1, 0, 1, 0, 0, 0, 0, 0.00, 0, 0, 0, 0, 0, '2026-04-12 16:14:47.76', '2026-04-12 16:19:59.09');
INSERT INTO "public"."daily_stats" VALUES ('10b13981-9d67-4282-9ccf-423757742781', '2026-04-29', 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, 0, 0, '2026-04-29 13:29:44.858', '2026-04-29 13:29:44.858');

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
INSERT INTO "public"."email_verification_logs" VALUES ('1f1cd63b-bea0-4307-ac4b-e02de9a1699d', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'SEND_OTP', '::1', 'node', NULL, '2026-01-30 08:15:50.364');
INSERT INTO "public"."email_verification_logs" VALUES ('083dba60-44d2-4fec-b05d-85a4a530c205', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'SEND_OTP', '::ffff:127.0.0.6', 'node', NULL, '2026-01-30 08:28:50.767');
INSERT INTO "public"."email_verification_logs" VALUES ('c979bea3-1e7e-4676-a1d6-d234c6b4004d', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'RESEND_OTP', '::ffff:127.0.0.6', 'node', NULL, '2026-01-30 08:28:50.777');
INSERT INTO "public"."email_verification_logs" VALUES ('d78c64a5-df4d-482c-b3ca-10b98722fd3d', '2a36312f-f039-4e10-8346-44189bf87362', 'ogyminecraft497@gmail.com', 'SEND_OTP', '::ffff:127.0.0.6', 'node', NULL, '2026-01-30 08:29:25.252');
INSERT INTO "public"."email_verification_logs" VALUES ('e8922dba-bcd2-4370-8543-0031dae2f978', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'VERIFY_SUCCESS', '::ffff:127.0.0.6', 'node', NULL, '2026-01-30 08:29:35.603');
INSERT INTO "public"."email_verification_logs" VALUES ('8d974851-d679-4325-b916-eee2123daef1', '2a36312f-f039-4e10-8346-44189bf87362', 'ogyminecraft497@gmail.com', 'SEND_OTP', '::ffff:127.0.0.6', 'node', NULL, '2026-01-30 08:30:04.922');
INSERT INTO "public"."email_verification_logs" VALUES ('49649797-fb62-4e05-a5e7-0bef208979b3', '2a36312f-f039-4e10-8346-44189bf87362', 'ogyminecraft497@gmail.com', 'SEND_OTP', '::ffff:127.0.0.6', 'node', NULL, '2026-01-31 13:04:20.784');
INSERT INTO "public"."email_verification_logs" VALUES ('d70875f5-2e6b-4829-9280-79abc9c71fc7', '2a36312f-f039-4e10-8346-44189bf87362', 'ogyminecraft497@gmail.com', 'SEND_OTP', '::ffff:127.0.0.6', 'node', NULL, '2026-02-05 04:39:09.006');
INSERT INTO "public"."email_verification_logs" VALUES ('daafa05f-b428-49e6-9d97-4c04d914ea42', '2a36312f-f039-4e10-8346-44189bf87362', 'ogyminecraft497@gmail.com', 'VERIFY_SUCCESS', '::ffff:127.0.0.6', 'node', NULL, '2026-02-05 04:39:36.619');
INSERT INTO "public"."email_verification_logs" VALUES ('6aafa951-c804-4676-b6c5-7c66772eeadb', '4ab98db7-dbb1-4caf-b154-9f50bf631502', 'ngoclinkk202@gmail.com', 'SEND_OTP', '127.0.0.6', 'node', NULL, '2026-04-12 16:20:05.007');
INSERT INTO "public"."email_verification_logs" VALUES ('4b78f504-43c3-41e2-8c10-c8dc6ec4e90f', '4ab98db7-dbb1-4caf-b154-9f50bf631502', 'ngoclinkk202@gmail.com', 'VERIFY_SUCCESS', '127.0.0.6', 'node', NULL, '2026-04-12 16:20:17.399');
INSERT INTO "public"."email_verification_logs" VALUES ('54fca77e-2045-40b8-aee3-ee64dadec928', 'b8416ee5-1a94-4d76-9911-6046649eb9fb', 'duyatd2@gmail.com', 'SEND_OTP', '127.0.0.6', 'node', NULL, '2026-04-29 13:29:52.967');
INSERT INTO "public"."email_verification_logs" VALUES ('fa53a200-3e88-414b-b84c-17b5ee6ad4c1', 'b8416ee5-1a94-4d76-9911-6046649eb9fb', 'duyatd2@gmail.com', 'VERIFY_SUCCESS', '127.0.0.6', 'node', NULL, '2026-04-29 13:30:26.144');

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
INSERT INTO "public"."flash_sale_orders" VALUES ('270f795a-c213-4e16-a214-9287acb9da57', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', '02a246ae-a28b-402e-bd4c-6af5e0fe4e7f', '2026-03-27 04:08:08.588');
INSERT INTO "public"."flash_sale_orders" VALUES ('e7eb9b81-f4dc-4b97-9800-8e9f1aab2df3', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', '0906e456-fc12-4411-97b2-9ef7654447c5', '2026-03-27 05:17:57.746');
INSERT INTO "public"."flash_sale_orders" VALUES ('50445c39-1a59-4efa-a3f9-7f24e1a1c4da', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'c3a5d834-8bff-4d7f-90b1-a31269ee57dd', '2026-03-27 16:24:57.815');
INSERT INTO "public"."flash_sale_orders" VALUES ('0ecc36f7-bd88-4d03-8683-d090ecb41f1f', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'a6f1dc86-7150-4755-97ee-1504b220417f', '2026-03-27 16:36:58.385');
INSERT INTO "public"."flash_sale_orders" VALUES ('c547fa8f-a2f7-4be7-8282-8ed427c59c79', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', '11bcd9c6-3ded-46aa-9b60-d8a2b30be176', '2026-03-28 05:20:13.11');
INSERT INTO "public"."flash_sale_orders" VALUES ('c43a18a4-8f90-4065-8205-a35ae74a7e77', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'e4e00669-977c-4e91-b90a-708fd4640b65', '2026-04-09 07:33:35.956');
INSERT INTO "public"."flash_sale_orders" VALUES ('73028463-e12e-4a08-ba3f-cd0410948888', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', '8e110219-bbbb-49bb-a1b9-9f6f5e907d2e', '2026-04-12 16:18:50.833');
INSERT INTO "public"."flash_sale_orders" VALUES ('1eebf247-0f59-4771-a14f-2a183d6762cc', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'b9378311-ea26-4919-97ec-f6f7496d5b62', '2026-04-17 16:11:56.857');

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
-- Records of flash_sale_products
-- ----------------------------
INSERT INTO "public"."flash_sale_products" VALUES ('65f14578-af54-4812-9afc-6399574dc818', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '15feeed5-0d9e-4da1-88ff-50c8fb95aa09', 646400.00, 808000.00, 100, 0, 2, 0, 't', '2026-03-20 07:52:54.197', '2026-03-20 07:52:54.197');
INSERT INTO "public"."flash_sale_products" VALUES ('a6deaf49-c361-4544-8384-5909a69965aa', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', '2aa54c6a-7c94-4f1c-aca5-2c0ed3ab5581', 187600.00, 234500.00, 100, 0, 2, 0, 't', '2026-03-20 07:52:54.177', '2026-03-26 17:56:09.701');
INSERT INTO "public"."flash_sale_products" VALUES ('357d360b-2c01-4ec1-a52c-1e2277226d42', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '1db18ed7-865b-4d69-87b8-c88656eff292', 646400.00, 808000.00, 100, 1, 2, 0, 't', '2026-03-20 07:52:54.24', '2026-03-27 05:17:57.703');
INSERT INTO "public"."flash_sale_products" VALUES ('7bd40673-b1cb-4eef-9ca2-ec417f0229d9', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'c876a2fe-40da-4f5c-9ff8-9478c3ecd93e', 646400.00, 808000.00, 100, 0, 2, 0, 't', '2026-03-20 07:52:54.232', '2026-03-27 16:25:20.577');
INSERT INTO "public"."flash_sale_products" VALUES ('9ed0516e-b28e-4a07-b732-8fdef050f040', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'd004cc21-a835-4d5f-a949-3bf9db98ccbd', 646400.00, 808000.00, 100, 2, 2, 0, 't', '2026-03-20 07:52:54.223', '2026-03-27 16:36:58.342');
INSERT INTO "public"."flash_sale_products" VALUES ('eb1d7782-36d4-42fc-a7d6-8f1a04f4257a', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 120000.00, 150000.00, 100, 5, 2, 0, 't', '2026-03-20 07:52:54.188', '2026-04-17 16:11:56.852');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of flash_sales
-- ----------------------------
INSERT INTO "public"."flash_sales" VALUES ('b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'sale 26-50', '65+6+56+56+5+', 'sale-26-5', NULL, '2026-03-15 21:22:00', '2027-07-09 09:22:00', 'ACTIVE', 't', 0, '2026-03-19 15:24:51.708', '2026-03-20 07:57:03.651', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3)
)
;

-- ----------------------------
-- Records of media
-- ----------------------------
INSERT INTO "public"."media" VALUES ('641426b7-bd5e-4e81-8227-70466d492621', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/goodal_logo_1763652927676_30430e7c.jpeg?wrap=0', 'uploads/public/brands/goodal_logo_1763652927676_30430e7c.jpeg', 'goodal_logo.jpeg', 'image/jpeg', 16687, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:35:29.405', '2025-11-20 15:35:29.405', NULL);
INSERT INTO "public"."media" VALUES ('e7f83aa3-c559-4c4c-b63f-1ef329b0bb9d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426304582-aspui9m7m87.jpg', 'uploads/public/avatars/1762426304582-aspui9m7m87.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-06 10:51:46.768', '2025-11-06 10:51:46.768', NULL);
INSERT INTO "public"."media" VALUES ('33b7e124-d2eb-468c-a2f7-63dd148d87c4', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426324714-1wgs3w9tddd.jpg', 'uploads/public/avatars/1762426324714-1wgs3w9tddd.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-06 10:52:05.562', '2025-11-06 10:52:05.562', NULL);
INSERT INTO "public"."media" VALUES ('2d212443-ba68-4a4f-a918-edda4245cdd3', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426337066-z6k4ndatsvc.jpg', 'uploads/public/avatars/1762426337066-z6k4ndatsvc.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-06 10:52:17.541', '2025-11-06 10:52:17.541', NULL);
INSERT INTO "public"."media" VALUES ('1fe86513-30a4-49b9-b9b5-531711308435', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/1762426405256-ehfr9jk9vi6.jpg?wrap=0', 'uploads/public/avatars/1762426405256-ehfr9jk9vi6.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 't', '2025-11-06 10:53:26.143', '2025-11-06 11:16:42.867', NULL);
INSERT INTO "public"."media" VALUES ('e8cd3ded-a0c2-4fc2-8520-6c5182e30f13', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/IMG_17_1763650664311_c827f313.jpg?wrap=0', 'uploads/public/avatars/IMG_17_1763650664311_c827f313.jpg', 'IMG_17.jpg', 'image/jpeg', 509639, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2025-11-20 14:57:45.217', '2025-11-20 14:57:45.217', NULL);
INSERT INTO "public"."media" VALUES ('698a3566-0e24-42e6-9ca4-a80a72f43e29', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/ahc_logo_1763651462182_680d754e.jpg?wrap=0', 'uploads/public/brands/ahc_logo_1763651462182_680d754e.jpg', 'ahc_logo.jpg', 'image/jpeg', 157174, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:11:03.008', '2025-11-20 15:11:03.008', NULL);
INSERT INTO "public"."media" VALUES ('8bb07459-85f1-4fc2-8cd4-3d38451d7d20', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/clio_logo_1763652596520_05d5cbb6.png?wrap=0', 'uploads/public/brands/clio_logo_1763652596520_05d5cbb6.png', 'clio_logo.png', 'image/png', 4856, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:29:58.283', '2025-11-20 15:29:58.283', NULL);
INSERT INTO "public"."media" VALUES ('97d155ca-2324-47e6-9429-e6b738fd6f20', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/94dcc7ac-37c6-4674-a900-2409f7646ff7_1764116494845_f9fcd7c8.webp?wrap=0', 'uploads/public/products/images/94dcc7ac-37c6-4674-a900-2409f7646ff7_1764116494845_f9fcd7c8.webp', '94dcc7ac-37c6-4674-a900-2409f7646ff7.webp', 'image/webp', 33166, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:21:35.513', '2025-11-26 00:21:35.513', NULL);
INSERT INTO "public"."media" VALUES ('3516e5df-87cb-4f52-bad0-2420e3036ca7', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/3fcbe193-818f-434f-b259-13a39274d73a_1764116652495_d6cfef4f.webp?wrap=0', 'uploads/public/products/images/3fcbe193-818f-434f-b259-13a39274d73a_1764116652495_d6cfef4f.webp', '3fcbe193-818f-434f-b259-13a39274d73a.webp', 'image/webp', 24638, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:24:13.093', '2025-11-26 00:24:13.093', NULL);
INSERT INTO "public"."media" VALUES ('fd832ba8-3bce-4bb0-9122-2ccb74403d0d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/122d881a-e59e-4f58-b1c4-138ac96014cf_1764116660519_54d8a4fb.webp?wrap=0', 'uploads/public/products/images/122d881a-e59e-4f58-b1c4-138ac96014cf_1764116660519_54d8a4fb.webp', '122d881a-e59e-4f58-b1c4-138ac96014cf.webp', 'image/webp', 44870, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:24:21.085', '2025-11-26 00:24:21.085', NULL);
INSERT INTO "public"."media" VALUES ('04527ab6-be79-4d0e-9421-53f3fbd5714a', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/86884b3c-cc62-4cc3-9546-25e2944ae6f5_1764116673787_d59be7b5.webp?wrap=0', 'uploads/public/products/images/86884b3c-cc62-4cc3-9546-25e2944ae6f5_1764116673787_d59be7b5.webp', '86884b3c-cc62-4cc3-9546-25e2944ae6f5.webp', 'image/webp', 52870, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 00:24:34.248', '2025-11-26 00:24:34.248', NULL);
INSERT INTO "public"."media" VALUES ('c237d4f4-ba8f-4c23-a07d-13830f1b3abb', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/57ffd5ee-58bc-453b-85a7-c79e40512432_1764187697608_072906bb.webp?wrap=0', 'uploads/public/products/images/57ffd5ee-58bc-453b-85a7-c79e40512432_1764187697608_072906bb.webp', '57ffd5ee-58bc-453b-85a7-c79e40512432.webp', 'image/webp', 26080, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 20:08:18.253', '2025-11-26 20:08:18.253', NULL);
INSERT INTO "public"."media" VALUES ('faaa90a2-20b3-421a-adc8-2b3f05c4020c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/3855656f-79ce-4979-bc9b-537bfbdc07c1_1764188914439_d0ab94b5.webp?wrap=0', 'uploads/public/products/images/3855656f-79ce-4979-bc9b-537bfbdc07c1_1764188914439_d0ab94b5.webp', '3855656f-79ce-4979-bc9b-537bfbdc07c1.webp', 'image/webp', 25148, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 20:28:35.065', '2025-11-26 20:28:35.065', NULL);
INSERT INTO "public"."media" VALUES ('2323711b-bf6c-4ba5-9c98-d5578de86c51', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/86523562-0f74-4211-b71b-0367509c6de3_1764190788447_5c261108.webp?wrap=0', 'uploads/public/products/images/86523562-0f74-4211-b71b-0367509c6de3_1764190788447_5c261108.webp', '86523562-0f74-4211-b71b-0367509c6de3.webp', 'image/webp', 24990, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 20:59:49.091', '2025-11-26 20:59:49.091', NULL);
INSERT INTO "public"."media" VALUES ('af6fc1ed-389d-466c-a399-96bd6a54081e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/3636b9b0-b9ef-4ad9-9b35-0f41952ec397_1764190972088_6cd37b32.webp?wrap=0', 'uploads/public/products/images/3636b9b0-b9ef-4ad9-9b35-0f41952ec397_1764190972088_6cd37b32.webp', '3636b9b0-b9ef-4ad9-9b35-0f41952ec397.webp', 'image/webp', 26564, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 21:02:52.676', '2025-11-26 21:02:52.676', NULL);
INSERT INTO "public"."media" VALUES ('0361956d-2c9d-4b73-aa5a-b59d3d7ff55d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/b2e040d7-f100-4a1a-8c4e-2aeff579b98b_1764191034130_acb9ef13.webp?wrap=0', 'uploads/public/products/images/b2e040d7-f100-4a1a-8c4e-2aeff579b98b_1764191034130_acb9ef13.webp', 'b2e040d7-f100-4a1a-8c4e-2aeff579b98b.webp', 'image/webp', 25338, 'PRODUCT_IMAGE', NULL, 'f', '2025-11-26 21:03:54.678', '2025-11-26 21:03:54.678', NULL);
INSERT INTO "public"."media" VALUES ('8e0865a8-f770-419d-b6f4-87127c5452ff', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/bannila_co_logo_1765797858931_22b99e88.jpg?wrap=0', 'uploads/public/brands/bannila_co_logo_1765797858931_22b99e88.jpg', 'bannila_co_logo.jpg', 'image/jpeg', 9703, 'BRAND_LOGO', NULL, 'f', '2025-12-15 11:24:19.683', '2025-12-15 11:24:19.683', NULL);
INSERT INTO "public"."media" VALUES ('93b74795-9f5b-4bf5-9193-f1a2c9a11205', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/c336f484-4500-4598-aa8d-b2a3d6ce591a_1765808599261_ebedd2c7.webp?wrap=0', 'uploads/public/products/images/c336f484-4500-4598-aa8d-b2a3d6ce591a_1765808599261_ebedd2c7.webp', 'c336f484-4500-4598-aa8d-b2a3d6ce591a.webp', 'image/webp', 29450, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:23:20.142', '2025-12-15 14:23:20.142', NULL);
INSERT INTO "public"."media" VALUES ('8afdff26-9b46-4445-b850-e105bb624399', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/5328896f-664a-4cc8-81c6-27c34b1d8743_1765808662686_19c0f03c.webp?wrap=0', 'uploads/public/products/images/5328896f-664a-4cc8-81c6-27c34b1d8743_1765808662686_19c0f03c.webp', '5328896f-664a-4cc8-81c6-27c34b1d8743.webp', 'image/webp', 73822, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:24:23.465', '2025-12-15 14:24:23.465', NULL);
INSERT INTO "public"."media" VALUES ('1f9c440b-c6db-4aba-8d6b-7e3bb60f12da', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4913a444-f4fb-44be-81b4-7c29e83b8c35_1765808694346_b1c39e6b.webp?wrap=0', 'uploads/public/products/images/4913a444-f4fb-44be-81b4-7c29e83b8c35_1765808694346_b1c39e6b.webp', '4913a444-f4fb-44be-81b4-7c29e83b8c35.webp', 'image/webp', 75360, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:24:54.749', '2025-12-15 14:24:54.749', NULL);
INSERT INTO "public"."media" VALUES ('a54d63a1-a90d-4f5a-8749-edc4771bf2dd', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808702422_54f8f207.webp?wrap=0', 'uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808702422_54f8f207.webp', '0e34ab51-dc56-4602-9be4-b4153722c685.webp', 'image/webp', 379558, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:25:02.904', '2025-12-15 14:25:02.904', NULL);
INSERT INTO "public"."media" VALUES ('51cf6d29-40b9-499e-ab5c-6576ccf5cf8c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808712974_0d0340e9.webp?wrap=0', 'uploads/public/products/images/0e34ab51-dc56-4602-9be4-b4153722c685_1765808712974_0d0340e9.webp', '0e34ab51-dc56-4602-9be4-b4153722c685.webp', 'image/webp', 379558, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:25:13.403', '2025-12-15 14:25:13.403', NULL);
INSERT INTO "public"."media" VALUES ('480b2336-be28-4228-aa38-324dd4d012e8', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6c1a45e3-e490-46cd-87f4-0f6e7aa6ee5b_1765809294668_ff38ddd7.webp?wrap=0', 'uploads/public/products/images/6c1a45e3-e490-46cd-87f4-0f6e7aa6ee5b_1765809294668_ff38ddd7.webp', '6c1a45e3-e490-46cd-87f4-0f6e7aa6ee5b.webp', 'image/webp', 171070, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:34:55.333', '2025-12-15 14:34:55.333', NULL);
INSERT INTO "public"."media" VALUES ('013c9414-683e-4780-a976-e00a9bf9bee2', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6efe75e8-8628-455e-849e-f7216409233f_1765809310448_a104b93d.webp?wrap=0', 'uploads/public/products/images/6efe75e8-8628-455e-849e-f7216409233f_1765809310448_a104b93d.webp', '6efe75e8-8628-455e-849e-f7216409233f.webp', 'image/webp', 83742, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:35:10.878', '2025-12-15 14:35:10.878', NULL);
INSERT INTO "public"."media" VALUES ('58554a57-901f-47f5-9a4e-49352a361f24', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4b4e0676-9d94-4cc6-b745-99f02e6a3a75_1765809320998_bfc354a2.webp?wrap=0', 'uploads/public/products/images/4b4e0676-9d94-4cc6-b745-99f02e6a3a75_1765809320998_bfc354a2.webp', '4b4e0676-9d94-4cc6-b745-99f02e6a3a75.webp', 'image/webp', 69812, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:35:21.407', '2025-12-15 14:35:21.407', NULL);
INSERT INTO "public"."media" VALUES ('ca430cfc-9edb-47c8-9d0d-323bbc9f9931', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/104f5eba-2ca6-439b-8ab0-cdf22cd2099f_1765809353657_f55a0ae4.webp?wrap=0', 'uploads/public/products/images/104f5eba-2ca6-439b-8ab0-cdf22cd2099f_1765809353657_f55a0ae4.webp', '104f5eba-2ca6-439b-8ab0-cdf22cd2099f.webp', 'image/webp', 45048, 'PRODUCT_IMAGE', NULL, 'f', '2025-12-15 14:35:54.062', '2025-12-15 14:35:54.062', NULL);
INSERT INTO "public"."media" VALUES ('4ca3ddff-7026-47a5-a48c-d314d9862d9d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6bbe0616-da7f-404f-8fdb-b4193d5340aa_1768575060781_42bdd28c.webp?wrap=0', 'uploads/public/products/images/6bbe0616-da7f-404f-8fdb-b4193d5340aa_1768575060781_42bdd28c.webp', '6bbe0616-da7f-404f-8fdb-b4193d5340aa.webp', 'image/webp', 34572, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:51:01.378', '2026-01-16 14:51:01.378', NULL);
INSERT INTO "public"."media" VALUES ('ba554aab-bac5-4fd0-afa8-13e9370ecda2', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/80f5b227-afbe-4758-bacc-4fb30f990aca_1768575108286_5002c051.webp?wrap=0', 'uploads/public/products/images/80f5b227-afbe-4758-bacc-4fb30f990aca_1768575108286_5002c051.webp', '80f5b227-afbe-4758-bacc-4fb30f990aca.webp', 'image/webp', 27612, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:51:48.667', '2026-01-16 14:51:48.667', NULL);
INSERT INTO "public"."media" VALUES ('3bfc4091-8470-42f8-8bc7-516374f0079d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/623f1866-8508-4694-83ef-ec42fe199c3f_1768575116998_3940a001.webp?wrap=0', 'uploads/public/products/images/623f1866-8508-4694-83ef-ec42fe199c3f_1768575116998_3940a001.webp', '623f1866-8508-4694-83ef-ec42fe199c3f.webp', 'image/webp', 67536, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:51:57.391', '2026-01-16 14:51:57.391', NULL);
INSERT INTO "public"."media" VALUES ('43fec89f-1a85-4474-ba07-98d32427f543', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6793d560-b196-473d-a314-64261ffd44e9_1768575261440_571fe1c7.webp?wrap=0', 'uploads/public/products/images/6793d560-b196-473d-a314-64261ffd44e9_1768575261440_571fe1c7.webp', '6793d560-b196-473d-a314-64261ffd44e9.webp', 'image/webp', 90832, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:54:21.995', '2026-01-16 14:54:21.995', NULL);
INSERT INTO "public"."media" VALUES ('c5a64d7f-1538-4ade-a96c-80495edae6f1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/443f1a00-a0f5-481c-a7db-3acaf19e59a8_1768575276418_01cc294e.webp?wrap=0', 'uploads/public/products/images/443f1a00-a0f5-481c-a7db-3acaf19e59a8_1768575276418_01cc294e.webp', '443f1a00-a0f5-481c-a7db-3acaf19e59a8.webp', 'image/webp', 62262, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:54:36.781', '2026-01-16 14:54:36.781', NULL);
INSERT INTO "public"."media" VALUES ('f2617e59-bff0-4aa0-868a-66e04bf6794e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/8d3e788e-774f-4e23-97b0-d3cff075c309_1768575298297_2d8d95a4.webp?wrap=0', 'uploads/public/products/images/8d3e788e-774f-4e23-97b0-d3cff075c309_1768575298297_2d8d95a4.webp', '8d3e788e-774f-4e23-97b0-d3cff075c309.webp', 'image/webp', 49644, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:54:58.685', '2026-01-16 14:54:58.685', NULL);
INSERT INTO "public"."media" VALUES ('c4892fcf-b2ea-4e14-98de-0d1bbd85b065', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/895f53ab-79a1-4fdc-bf0a-8955499a2231_1768581424976_2d308fd3.webp?wrap=0', 'uploads/public/products/images/895f53ab-79a1-4fdc-bf0a-8955499a2231_1768581424976_2d308fd3.webp', '895f53ab-79a1-4fdc-bf0a-8955499a2231.webp', 'image/webp', 25370, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:37:05.634', '2026-01-16 16:37:05.634', NULL);
INSERT INTO "public"."media" VALUES ('31373689-5eb4-4356-9df5-bb535173fd1c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/06778f31-b3bc-42e8-8962-e5d277fd3e6d_1768582243151_d1b46c28.webp?wrap=0', 'uploads/public/products/images/06778f31-b3bc-42e8-8962-e5d277fd3e6d_1768582243151_d1b46c28.webp', '06778f31-b3bc-42e8-8962-e5d277fd3e6d.webp', 'image/webp', 29948, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:50:43.7', '2026-01-16 16:50:43.7', NULL);
INSERT INTO "public"."media" VALUES ('0fb7a1fa-ab9b-459b-a3f2-c6ba7f54b548', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/9c09befe-e91d-4baa-8e5b-bc391df34884_1768582348686_ac695b88.webp?wrap=0', 'uploads/public/products/images/9c09befe-e91d-4baa-8e5b-bc391df34884_1768582348686_ac695b88.webp', '9c09befe-e91d-4baa-8e5b-bc391df34884.webp', 'image/webp', 29600, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:52:29.287', '2026-01-16 16:52:29.287', NULL);
INSERT INTO "public"."media" VALUES ('6b98ccf3-38bc-4ff8-9ffd-4956d893c820', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/81ca6f2f-4e9d-48d5-9a61-e0307989984f_1768582526837_996ba74b.webp?wrap=0', 'uploads/public/products/images/81ca6f2f-4e9d-48d5-9a61-e0307989984f_1768582526837_996ba74b.webp', '81ca6f2f-4e9d-48d5-9a61-e0307989984f.webp', 'image/webp', 29936, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:55:27.459', '2026-01-16 16:55:27.459', NULL);
INSERT INTO "public"."media" VALUES ('8ebebdfa-0db0-4118-81cf-bc48534eaa3d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/b524c0ed-9855-4eef-ad44-18d28dd1f033_1768582618218_6976775f.webp?wrap=0', 'uploads/public/products/images/b524c0ed-9855-4eef-ad44-18d28dd1f033_1768582618218_6976775f.webp', 'b524c0ed-9855-4eef-ad44-18d28dd1f033.webp', 'image/webp', 30376, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:56:58.848', '2026-01-16 16:56:58.848', NULL);
INSERT INTO "public"."media" VALUES ('775e73e3-c1d3-4d69-971e-143980ffec74', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/ahc_logo_1763652535912_b453a9fa.jpg?wrap=0', 'uploads/public/brands/ahc_logo_1763652535912_b453a9fa.jpg', 'ahc_logo.jpg', 'image/jpeg', 157174, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:28:56.523', '2025-11-20 15:28:56.523', NULL);
INSERT INTO "public"."media" VALUES ('810ae089-deb6-47c1-831e-176e8eb564a1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772130786989_301df642.jpg?wrap=0', 'uploads/public/avatars/avatar_1772130786989_301df642.jpg', 'avatar.jpg', 'image/jpeg', 7770, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 18:33:07.6', '2026-02-26 18:33:07.6', NULL);
INSERT INTO "public"."media" VALUES ('1f8976c7-2119-428c-bb0d-1506b9b47f31', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772132507177_3f2bcdb3.jpg?wrap=0', 'uploads/public/avatars/avatar_1772132507177_3f2bcdb3.jpg', 'avatar.jpg', 'image/jpeg', 7770, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:01:48.003', '2026-02-26 19:01:48.003', NULL);
INSERT INTO "public"."media" VALUES ('53d14074-5e0e-4278-8e72-ea0eacf577d5', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772132524298_03798207.jpg?wrap=0', 'uploads/public/avatars/avatar_1772132524298_03798207.jpg', 'avatar.jpg', 'image/jpeg', 10188, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:02:04.981', '2026-02-26 19:02:04.981', NULL);
INSERT INTO "public"."media" VALUES ('4244262a-35a0-48ca-98b9-0da089193399', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772132719725_c768327b.jpg?wrap=0', 'uploads/public/avatars/avatar_1772132719725_c768327b.jpg', 'avatar.jpg', 'image/jpeg', 262931, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:05:20.385', '2026-02-26 19:05:20.385', NULL);
INSERT INTO "public"."media" VALUES ('510ac388-76b1-4158-954d-ef3e7753d31a', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772133022827_9f956f4c.jpg?wrap=0', 'uploads/public/avatars/avatar_1772133022827_9f956f4c.jpg', 'avatar.jpg', 'image/jpeg', 265031, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:10:24.174', '2026-02-26 19:10:24.174', NULL);
INSERT INTO "public"."media" VALUES ('408744ad-04cc-43ae-ab05-6ed93523a2ae', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772271746153_1c8097fe.jpg', 'uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772271746153_1c8097fe.jpg', '626841724_2413912335695335_7804545622247521577_n.jpg', 'image/jpeg', 234292, 'PRODUCT_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-02-28 09:42:26.889', '2026-02-28 09:42:26.889', NULL);
INSERT INTO "public"."media" VALUES ('ee884c15-44f0-403e-b068-d3db39924a19', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/1368890_1772272114187_3e60f911.jpeg?wrap=0', 'uploads/public/products/images/1368890_1772272114187_3e60f911.jpeg', '1368890.jpeg', 'image/jpeg', 428995, 'PRODUCT_IMAGE', NULL, 'f', '2026-02-28 09:48:34.9', '2026-02-28 09:48:34.9', NULL);
INSERT INTO "public"."media" VALUES ('6b6873d8-68bf-46a0-bc43-c25f0e03a125', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772272399151_9a1795c2.jpg?wrap=0', 'uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772272399151_9a1795c2.jpg', '626841724_2413912335695335_7804545622247521577_n.jpg', 'image/jpeg', 234292, 'PRODUCT_IMAGE', NULL, 'f', '2026-02-28 09:53:19.603', '2026-02-28 09:53:19.603', NULL);
INSERT INTO "public"."media" VALUES ('cafaa4d2-2469-44f2-bacc-25fef84d3224', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772525128560_8144ee95.webp?wrap=0', 'uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772525128560_8144ee95.webp', '764378ac-a400-481e-bbf1-c374ec9b5764.webp', 'image/webp', 9744, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-03 08:05:29.052', '2026-03-03 08:05:29.052', NULL);
INSERT INTO "public"."media" VALUES ('64934987-a102-44f6-9e23-4892a88b4171', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/A__nh_ma__n_hi__nh_2026-01-28_lu__c_19.26.33_1772525292267_566c7c2a.png?wrap=0', 'uploads/public/products/images/A__nh_ma__n_hi__nh_2026-01-28_lu__c_19.26.33_1772525292267_566c7c2a.png', 'AÌnh maÌn hiÌnh 2026-01-28 luÌc 19.26.33.png', 'image/png', 1139368, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-03 08:08:12.906', '2026-03-03 08:08:12.906', NULL);
INSERT INTO "public"."media" VALUES ('43299dec-ccc3-4e38-aee3-77c9a3a65d85', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/616397375_2307700436383076_7581925367816276636_n_1772525305393_d2de7690.jpg?wrap=0', 'uploads/public/products/images/616397375_2307700436383076_7581925367816276636_n_1772525305393_d2de7690.jpg', '616397375_2307700436383076_7581925367816276636_n.jpg', 'image/jpeg', 1094606, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-03 08:08:26.062', '2026-03-03 08:08:26.062', NULL);
INSERT INTO "public"."media" VALUES ('b2f7d0f5-dc37-4ded-aacb-ae822ce9ec7e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772603652310_14c5ec30.webp?wrap=0', 'uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772603652310_14c5ec30.webp', '764378ac-a400-481e-bbf1-c374ec9b5764.webp', 'image/webp', 9744, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 05:54:12.819', '2026-03-04 05:54:12.819', NULL);
INSERT INTO "public"."media" VALUES ('caca0b7b-b4a8-4557-a2f7-63b789275d16', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/1368890_1772613504022_67ba7b0a.jpeg?wrap=0', 'uploads/public/products/images/1368890_1772613504022_67ba7b0a.jpeg', '1368890.jpeg', 'image/jpeg', 428995, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 08:38:24.49', '2026-03-04 08:38:24.49', NULL);
INSERT INTO "public"."media" VALUES ('f54aa404-5d93-4915-bbdb-cbb11612c5e8', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772614819013_16d47751.webp?wrap=0', 'uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772614819013_16d47751.webp', '764378ac-a400-481e-bbf1-c374ec9b5764.webp', 'image/webp', 9744, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 09:00:19.682', '2026-03-04 09:00:19.682', NULL);
INSERT INTO "public"."media" VALUES ('879d7d92-3e6f-4c33-8fac-b1a52a9d8745', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/9a27aa617cb9fc5ff3216e84a68e5fc3_1772617009156_09cc7cfa.jpg?wrap=0', 'uploads/public/products/images/9a27aa617cb9fc5ff3216e84a68e5fc3_1772617009156_09cc7cfa.jpg', '9a27aa617cb9fc5ff3216e84a68e5fc3.jpg', 'image/jpeg', 144986, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 09:36:49.662', '2026-03-04 09:36:49.662', NULL);
INSERT INTO "public"."media" VALUES ('8a6ede51-d96a-491b-a89c-bc7a19109de1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/IMG_20251025_171143_1772698977480_7d01dcd7.png?wrap=0', 'uploads/public/products/images/IMG_20251025_171143_1772698977480_7d01dcd7.png', 'IMG_20251025_171143.png', 'image/png', 1923555, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-05 08:22:58.926', '2026-03-05 08:22:58.926', NULL);
INSERT INTO "public"."media" VALUES ('53160ffb-e0e6-4362-a96a-524e0ef658a0', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/images_1772698991945_88db7803.jpg?wrap=0', 'uploads/public/products/images/images_1772698991945_88db7803.jpg', 'images.jpg', 'image/jpeg', 294520, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-05 08:23:12.361', '2026-03-05 08:23:12.361', NULL);
INSERT INTO "public"."media" VALUES ('c419e524-30f1-49d9-b259-93545c2f85d0', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772776394232_b760ce18.webp?wrap=0', 'uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772776394232_b760ce18.webp', '42e25a05-e70e-4e54-a4d7-391dd31583ad.webp', 'image/webp', 21936, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-06 05:53:14.7', '2026-03-06 05:53:14.7', NULL);
INSERT INTO "public"."media" VALUES ('a73f450e-d690-49b6-8420-07902b16da34', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772805496446_c625476a.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772805496446_c625476a.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b.webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 13:58:16.96', '2026-03-06 13:58:16.96', NULL);
INSERT INTO "public"."media" VALUES ('676991a0-132c-4798-a9ac-5f831a89db79', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772805559701_1c4cca05.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772805559701_1c4cca05.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b (1).webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 13:59:20.224', '2026-03-06 13:59:20.224', NULL);
INSERT INTO "public"."media" VALUES ('4c84c9c7-84af-4d68-82b9-3e1d9af3ae78', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772805707689_ba2cbcdf.webp?wrap=0', 'uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772805707689_ba2cbcdf.webp', '42e25a05-e70e-4e54-a4d7-391dd31583ad.webp', 'image/webp', 21936, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-06 14:01:48.101', '2026-03-06 14:01:48.101', NULL);
INSERT INTO "public"."media" VALUES ('6cbc59f0-8f6a-4e44-a69b-3f008a56c6f1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772806717047_bd0dd5b0.webp?wrap=0', 'uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772806717047_bd0dd5b0.webp', '42e25a05-e70e-4e54-a4d7-391dd31583ad.webp', 'image/webp', 21936, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-06 14:18:37.692', '2026-03-06 14:18:37.692', NULL);
INSERT INTO "public"."media" VALUES ('491bad73-2031-4362-b4d1-e72a037d0ed9', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/vn-11134216-7ras8-m3yoigp7pgi7d8_tn_1772809446754_4b2fcc61.jpg?wrap=0', 'uploads/public/brands/vn-11134216-7ras8-m3yoigp7pgi7d8_tn_1772809446754_4b2fcc61.jpg', 'vn-11134216-7ras8-m3yoigp7pgi7d8_tn.jpg', 'image/jpeg', 6495, 'BRAND_LOGO', NULL, 'f', '2026-03-06 15:04:07.223', '2026-03-06 15:04:07.223', NULL);
INSERT INTO "public"."media" VALUES ('176384a8-fafc-4522-a9e5-f256f215c338', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772809793732_decac314.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772809793732_decac314.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b.webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 15:09:54.149', '2026-03-06 15:09:54.149', NULL);
INSERT INTO "public"."media" VALUES ('7494920f-d885-47f9-8e45-30c30f0c531c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a9_1772810057992_5af04eb9.jpg?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a9_1772810057992_5af04eb9.jpg', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a9.jpg', 'image/jpeg', 91709, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 15:14:18.39', '2026-03-06 15:14:18.39', NULL);
INSERT INTO "public"."media" VALUES ('41af639e-ab67-4468-8ac0-8e899f1e485e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772810333574_ecf146e3.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772810333574_ecf146e3.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b (1).webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 15:18:54.069', '2026-03-06 15:18:54.069', NULL);
INSERT INTO "public"."media" VALUES ('d765833f-3edb-47b4-bcd6-2c0af71d4bc3', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773651246244_eb217f4e.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773651246244_eb217f4e.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 08:54:07.667', '2026-03-16 08:54:07.667', NULL);
INSERT INTO "public"."media" VALUES ('9f3abdbd-bd03-4e32-9b6b-41b7107868df', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773651382559_abb88d15.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773651382559_abb88d15.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 08:56:24.253', '2026-03-16 08:56:24.253', NULL);
INSERT INTO "public"."media" VALUES ('d0bc407f-f7dc-4fb8-b414-ad4e5f383086', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773651545788_ea9c25e6.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773651545788_ea9c25e6.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 08:59:06.382', '2026-03-16 08:59:06.382', NULL);
INSERT INTO "public"."media" VALUES ('3a84f7f1-965b-49f9-a369-f969bf79d8bd', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652112557_8f0dc0c9.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652112557_8f0dc0c9.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:08:33.831', '2026-03-16 09:08:33.831', NULL);
INSERT INTO "public"."media" VALUES ('4fa17852-82f9-402f-8e80-535304ada5c4', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652384796_d24a1c73.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652384796_d24a1c73.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:13:05.47', '2026-03-16 09:13:05.47', NULL);
INSERT INTO "public"."media" VALUES ('dddf1a70-67a3-44ea-84f5-93c465647995', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/do_shisha_1773731182268_ffd5495a.webp?wrap=0', 'uploads/public/banners/images/do_shisha_1773731182268_ffd5495a.webp', 'do_shisha.webp', 'image/webp', 262442, 'BANNER_IMAGE', NULL, 'f', '2026-03-17 07:06:22.797', '2026-03-17 07:06:22.797', NULL);
INSERT INTO "public"."media" VALUES ('9020bce4-f347-4dce-bc23-aa699a903f7e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652275397_874bc983.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652275397_874bc983.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:11:16.01', '2026-03-16 09:11:16.01', NULL);
INSERT INTO "public"."media" VALUES ('c7344039-1504-4ad6-ae6a-ca8cd5f60b5c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652203632_d61e5a0f.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652203632_d61e5a0f.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:10:06.063', '2026-03-16 09:10:06.063', NULL);
INSERT INTO "public"."media" VALUES ('f5125a9e-c480-4802-a782-480b00138fca', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/image_background_screenshot_for_stack_1773739698722_93d7672a.png?wrap=0', 'uploads/public/banners/images/image_background_screenshot_for_stack_1773739698722_93d7672a.png', 'image_background_screenshot_for_stack.png', 'image/png', 1950277, 'BANNER_IMAGE', NULL, 'f', '2026-03-17 09:28:20.357', '2026-03-17 09:28:20.357', NULL);
INSERT INTO "public"."media" VALUES ('f36e928a-b6c8-4f21-b6cf-0f67bb59edeb', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/438293719_423347727110950_4655747533506456618_n__2__1774011858704_9459682f.jpg?wrap=0', 'uploads/public/avatars/438293719_423347727110950_4655747533506456618_n__2__1774011858704_9459682f.jpg', '438293719_423347727110950_4655747533506456618_n (2).jpg', 'image/jpeg', 465055, 'AVATAR', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-20 13:04:19.483', '2026-03-20 13:04:19.483', NULL);
INSERT INTO "public"."media" VALUES ('5f27fafb-436e-4a1e-9460-d1bedf308ee6', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/channels4_profile_1774183121445_3e20ae5e.jpg?wrap=0', 'uploads/public/general/images/channels4_profile_1774183121445_3e20ae5e.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'GENERAL_IMAGE', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-03-22 12:38:43.339', '2026-03-22 12:38:43.339', NULL);
INSERT INTO "public"."media" VALUES ('d7082e4b-d8fc-4682-8e94-611dd29b2601', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/channels4_profile_1774183915010_58af2ac5.jpg?wrap=0', 'uploads/public/general/images/channels4_profile_1774183915010_58af2ac5.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'GENERAL_IMAGE', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-03-22 12:51:55.72', '2026-03-22 12:51:55.72', NULL);
INSERT INTO "public"."media" VALUES ('b48375bc-a6a2-40f2-802e-156946b5fe7c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/69a40152405e6_1774187756879_84efc279.jpg?wrap=0', 'uploads/public/general/images/69a40152405e6_1774187756879_84efc279.jpg', '69a40152405e6.jpg', 'image/jpeg', 433274, 'GENERAL_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-22 13:55:57.391', '2026-03-22 13:55:57.391', NULL);
INSERT INTO "public"."media" VALUES ('95a66b86-d23d-4a1d-83b8-dad6b443ae5a', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/69a40152405e6_1774187788258_4b60a188.jpg?wrap=0', 'uploads/public/general/images/69a40152405e6_1774187788258_4b60a188.jpg', '69a40152405e6.jpg', 'image/jpeg', 433274, 'GENERAL_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-22 13:56:28.626', '2026-03-22 13:56:28.626', NULL);
INSERT INTO "public"."media" VALUES ('2dac9985-4763-4b8c-b13c-cae32dd9f933', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/289a71d7-d708-43cd-92ee-7a16ccf4a561_1774518380741_5e9b8886.webp?wrap=0', 'uploads/public/banners/images/289a71d7-d708-43cd-92ee-7a16ccf4a561_1774518380741_5e9b8886.webp', '289a71d7-d708-43cd-92ee-7a16ccf4a561.webp', 'image/webp', 127074, 'BANNER_IMAGE', NULL, 'f', '2026-03-26 09:46:22.821', '2026-03-26 09:46:22.821', NULL);
INSERT INTO "public"."media" VALUES ('34c09faa-34fa-4c08-a113-29e75ee29a0e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/pngtree-cute-cow-cartoon-vector-png-image_5057875_1774536770321_0c42cf32.jpg?wrap=0', 'uploads/public/products/images/pngtree-cute-cow-cartoon-vector-png-image_5057875_1774536770321_0c42cf32.jpg', 'pngtree-cute-cow-cartoon-vector-png-image_5057875.jpg', 'image/jpeg', 89440, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-26 14:52:50.82', '2026-03-26 14:52:50.82', NULL);
INSERT INTO "public"."media" VALUES ('701952c8-2222-4b54-87dc-de951f1d77d0', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b_1774685027301_3a36aac5.webp?wrap=0', 'uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b_1774685027301_3a36aac5.webp', '4cc88c2c-1049-4407-8091-e42394452b5b.webp', 'image/webp', 102858, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:03:47.836', '2026-03-28 08:03:47.836', NULL);
INSERT INTO "public"."media" VALUES ('f3daa491-cc07-4988-8a1f-57149db13ddb', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b__1__1774685027420_b5a74439.webp?wrap=0', 'uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b__1__1774685027420_b5a74439.webp', '4cc88c2c-1049-4407-8091-e42394452b5b (1).webp', 'image/webp', 102858, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:03:47.833', '2026-03-28 08:03:47.833', NULL);
INSERT INTO "public"."media" VALUES ('e585624d-0d42-42f5-a5b1-5118c74ba3fe', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774685027217_65758d2e.webp?wrap=0', 'uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774685027217_65758d2e.webp', 'e7cd2392-0f50-485c-9fad-b560875d2e9f.webp', 'image/webp', 46364, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:03:47.909', '2026-03-28 08:03:47.909', NULL);
INSERT INTO "public"."media" VALUES ('42b757f8-257f-4cf7-b130-63b8a19dbf2f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/1312e610-8b26-4408-bc8e-4a9cb49b0e96_1774685468143_7e900bf0.webp?wrap=0', 'uploads/public/products/images/1312e610-8b26-4408-bc8e-4a9cb49b0e96_1774685468143_7e900bf0.webp', '1312e610-8b26-4408-bc8e-4a9cb49b0e96.webp', 'image/webp', 36234, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:11:08.608', '2026-03-28 08:11:08.608', NULL);
INSERT INTO "public"."media" VALUES ('825ec6a2-1c64-4549-b775-4eec4f46002f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/ddfac2c2-87cc-4214-b642-2775a6891fc1_1774686170267_48213e0f.webp?wrap=0', 'uploads/public/products/images/ddfac2c2-87cc-4214-b642-2775a6891fc1_1774686170267_48213e0f.webp', 'ddfac2c2-87cc-4214-b642-2775a6891fc1.webp', 'image/webp', 36900, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:22:50.734', '2026-03-28 08:22:50.734', NULL);
INSERT INTO "public"."media" VALUES ('807b2fb6-7dee-44c6-a7b6-ea6afd00c922', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/51e65aef-c5fa-4ab9-8776-534426997123_1774686294846_2af96b33.webp?wrap=0', 'uploads/public/products/images/51e65aef-c5fa-4ab9-8776-534426997123_1774686294846_2af96b33.webp', '51e65aef-c5fa-4ab9-8776-534426997123.webp', 'image/webp', 39488, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:24:55.225', '2026-03-28 08:24:55.225', NULL);
INSERT INTO "public"."media" VALUES ('c10ae4de-2ad3-47da-9702-3334a889d74f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/8cd91ebf-d6dc-4a62-99aa-e41c21fca30b_1774686445320_27fea8f7.webp?wrap=0', 'uploads/public/products/images/8cd91ebf-d6dc-4a62-99aa-e41c21fca30b_1774686445320_27fea8f7.webp', '8cd91ebf-d6dc-4a62-99aa-e41c21fca30b.webp', 'image/webp', 36348, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:27:25.767', '2026-03-28 08:27:25.767', NULL);
INSERT INTO "public"."media" VALUES ('51ad43ba-65b1-49f9-bccb-4ab139915b1c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/7c61053d-6b55-4f52-9d87-437e4c0c61d5_1774687098873_1489e0b8.webp?wrap=0', 'uploads/public/products/images/7c61053d-6b55-4f52-9d87-437e4c0c61d5_1774687098873_1489e0b8.webp', '7c61053d-6b55-4f52-9d87-437e4c0c61d5.webp', 'image/webp', 34988, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:38:19.24', '2026-03-28 08:38:19.24', NULL);
INSERT INTO "public"."media" VALUES ('8890c5f8-2a48-48e9-a77a-10cf1ec59e8b', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/9ddc33fc-799e-43c9-92ac-b565431d908e_1774687192004_3c83cc39.webp?wrap=0', 'uploads/public/products/images/9ddc33fc-799e-43c9-92ac-b565431d908e_1774687192004_3c83cc39.webp', '9ddc33fc-799e-43c9-92ac-b565431d908e.webp', 'image/webp', 34838, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:39:52.393', '2026-03-28 08:39:52.393', NULL);
INSERT INTO "public"."media" VALUES ('e50a9f7a-ac92-4a84-a8bb-82967c41e553', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/d8208594-31a9-48e9-a97b-c5075b63ebe6_1774687829965_e6cc9ef8.webp?wrap=0', 'uploads/public/products/images/d8208594-31a9-48e9-a97b-c5075b63ebe6_1774687829965_e6cc9ef8.webp', 'd8208594-31a9-48e9-a97b-c5075b63ebe6.webp', 'image/webp', 36792, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:50:31.604', '2026-03-28 08:50:31.604', NULL);
INSERT INTO "public"."media" VALUES ('806a3ce3-2086-41b4-8705-d753fab552e1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/f3a96cdb-eb16-421d-b43a-59a4d8a14dd7_1774687899160_60c5a2a8.webp?wrap=0', 'uploads/public/products/images/f3a96cdb-eb16-421d-b43a-59a4d8a14dd7_1774687899160_60c5a2a8.webp', 'f3a96cdb-eb16-421d-b43a-59a4d8a14dd7.webp', 'image/webp', 35900, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:51:40.252', '2026-03-28 08:51:40.252', NULL);
INSERT INTO "public"."media" VALUES ('8cbb787c-eba8-4032-98bb-df2e71e41581', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/796175fb-0559-4215-a4df-60fa9a76edc0_1774687975614_50f1b55d.webp?wrap=0', 'uploads/public/products/images/796175fb-0559-4215-a4df-60fa9a76edc0_1774687975614_50f1b55d.webp', '796175fb-0559-4215-a4df-60fa9a76edc0.webp', 'image/webp', 37230, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:52:56.695', '2026-03-28 08:52:56.695', NULL);
INSERT INTO "public"."media" VALUES ('43c4e910-918a-4f94-b6d8-e63a3d3c0f3f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/c1314b9a-ff75-4f6d-a6dc-863363a73648_1774688035931_714e71fb.webp?wrap=0', 'uploads/public/products/images/c1314b9a-ff75-4f6d-a6dc-863363a73648_1774688035931_714e71fb.webp', 'c1314b9a-ff75-4f6d-a6dc-863363a73648.webp', 'image/webp', 35370, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:53:56.98', '2026-03-28 08:53:56.98', NULL);
INSERT INTO "public"."media" VALUES ('c06b081a-ae35-4e75-a914-4de431a9f129', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774688345020_679cb33f.webp?wrap=0', 'uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774688345020_679cb33f.webp', 'e7cd2392-0f50-485c-9fad-b560875d2e9f.webp', 'image/webp', 46364, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:59:06.224', '2026-03-28 08:59:06.224', NULL);
INSERT INTO "public"."media" VALUES ('d0d91f28-86c4-414c-ae6e-66f2d4a9523b', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/236fc58c-8599-40f5-ae93-50bb246fa84e_1774688429971_8b5afa68.webp?wrap=0', 'uploads/public/products/images/236fc58c-8599-40f5-ae93-50bb246fa84e_1774688429971_8b5afa68.webp', '236fc58c-8599-40f5-ae93-50bb246fa84e.webp', 'image/webp', 90976, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 09:00:31.058', '2026-03-28 09:00:31.058', NULL);
INSERT INTO "public"."media" VALUES ('13aad462-a703-4b93-bba3-c01f93f4dc5c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795397492_0aaa067c.jpg?wrap=0', 'uploads/public/brands/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795397492_0aaa067c.jpg', 'share-image-1-f5e75e5de1169342a782ada9658c0816.jpg', 'image/jpeg', 81295, 'BRAND_LOGO', NULL, 'f', '2026-03-29 14:43:18.09', '2026-03-29 14:43:18.09', NULL);
INSERT INTO "public"."media" VALUES ('b2a9f1f8-91b6-448e-b329-c943ca7ffb09', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795519646_e0d2daf5.jpg?wrap=0', 'uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795519646_e0d2daf5.jpg', 'share-image-1-f5e75e5de1169342a782ada9658c0816.jpg', 'image/jpeg', 81295, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-29 14:45:20.05', '2026-03-29 14:45:20.05', NULL);
INSERT INTO "public"."media" VALUES ('60b194f2-0d9d-4da0-8ada-2cc63b7b0ac3', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795519642_9d692a4d.jpg?wrap=0', 'uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795519642_9d692a4d.jpg', 'share-image-1-f5e75e5de1169342a782ada9658c0816.jpg', 'image/jpeg', 81295, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-29 14:45:20.052', '2026-03-29 14:45:20.052', NULL);
INSERT INTO "public"."media" VALUES ('26ccd8d4-5699-44d7-8f4d-443b120abcac', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795520362_f95b13b6.jpg?wrap=0', 'uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774795520362_f95b13b6.jpg', 'share-image-1-f5e75e5de1169342a782ada9658c0816.jpg', 'image/jpeg', 81295, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-29 14:45:20.795', '2026-03-29 14:45:20.795', NULL);
INSERT INTO "public"."media" VALUES ('6582fce5-24d1-46ab-9f22-ea2640352af7', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774796472573_f340d04a.jpg?wrap=0', 'uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774796472573_f340d04a.jpg', 'share-image-1-f5e75e5de1169342a782ada9658c0816.jpg', 'image/jpeg', 81295, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-29 15:01:13.238', '2026-03-29 15:01:13.238', NULL);
INSERT INTO "public"."media" VALUES ('ce947970-f00a-482b-bcb5-4412877acdc6', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774796472968_d1906835.jpg?wrap=0', 'uploads/public/categories/share-image-1-f5e75e5de1169342a782ada9658c0816_1774796472968_d1906835.jpg', 'share-image-1-f5e75e5de1169342a782ada9658c0816.jpg', 'image/jpeg', 81295, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-29 15:01:13.68', '2026-03-29 15:01:13.68', NULL);
INSERT INTO "public"."media" VALUES ('7333ed69-9f0b-463e-8e7f-31b42752978f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774855795584_7a40a512.webp?wrap=0', 'uploads/public/brands/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774855795584_7a40a512.webp', 'deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4.webp', 'image/webp', 14456, 'BRAND_LOGO', NULL, 'f', '2026-03-30 07:29:56.014', '2026-03-30 07:29:56.014', NULL);
INSERT INTO "public"."media" VALUES ('015b94eb-40ce-4f27-a10c-6e14534e7a89', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774855858565_cfcfa34a.webp?wrap=0', 'uploads/public/categories/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774855858565_cfcfa34a.webp', 'deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4.webp', 'image/webp', 14456, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-30 07:30:59.009', '2026-03-30 07:30:59.009', NULL);
INSERT INTO "public"."media" VALUES ('0a6f748e-0e09-4fd5-9571-37ae64c7bc6c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774855858943_95c0cdf7.webp?wrap=0', 'uploads/public/categories/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774855858943_95c0cdf7.webp', 'deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4.webp', 'image/webp', 14456, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-30 07:30:59.533', '2026-03-30 07:30:59.533', NULL);
INSERT INTO "public"."media" VALUES ('d1073a47-7ea5-49c9-983f-922533b21276', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774861907393_3f428c0c.webp?wrap=0', 'uploads/public/banners/images/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774861907393_3f428c0c.webp', 'deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4.webp', 'image/webp', 14456, 'BANNER_IMAGE', NULL, 'f', '2026-03-30 09:11:47.83', '2026-03-30 09:11:47.83', NULL);
INSERT INTO "public"."media" VALUES ('82702940-5539-497f-a345-4e822ea1d734', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1774866924775_715e0557.jpg?wrap=0', 'uploads/public/avatars/avatar_1774866924775_715e0557.jpg', 'avatar.jpg', 'image/jpeg', 269689, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-03-30 10:35:26.249', '2026-03-30 10:35:26.249', NULL);
INSERT INTO "public"."media" VALUES ('06344b44-5a3b-4355-8a1c-eddb87d78d14', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774937635307_7da69125.webp?wrap=0', 'uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774937635307_7da69125.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_POST_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-31 06:13:55.86', '2026-03-31 06:13:55.86', NULL);
INSERT INTO "public"."media" VALUES ('d27cdacf-2c2e-4324-be98-8f4cadb9d1a1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774942346806_59ea10cc.webp?wrap=0', 'uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774942346806_59ea10cc.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_POST_IMAGE', NULL, 'f', '2026-03-31 07:32:27.247', '2026-03-31 07:32:27.247', NULL);
INSERT INTO "public"."media" VALUES ('407b9a1c-ab06-4fa6-9161-57da187d47e6', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774946863678_f602c007.webp?wrap=0', 'uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774946863678_f602c007.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_POST_IMAGE', NULL, 'f', '2026-03-31 08:47:44.043', '2026-03-31 08:47:44.043', NULL);
INSERT INTO "public"."media" VALUES ('fc70a8b5-61e9-44e8-acb7-44dd866f4703', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/posts/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774946930455_16beba55.webp?wrap=0', 'uploads/public/blog/posts/deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4_1774946930455_16beba55.webp', 'deardahlia_sns_logo_249b9bc3-745e-4965-8014-1ddcceab8ad4.webp', 'image/webp', 14456, 'BLOG_POST_IMAGE', NULL, 'f', '2026-03-31 08:48:50.847', '2026-03-31 08:48:50.847', NULL);
INSERT INTO "public"."media" VALUES ('34cabe77-9366-4ae1-99c6-e09275cbff67', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/posts/miffy_1774947379591_e4f6117d.webp?wrap=0', 'uploads/public/blog/posts/miffy_1774947379591_e4f6117d.webp', 'miffy.webp', 'image/webp', 73430, 'BLOG_POST_IMAGE', NULL, 'f', '2026-03-31 08:56:20.129', '2026-03-31 08:56:20.129', NULL);
INSERT INTO "public"."media" VALUES ('c51e78a0-07d8-4574-9208-5f514b83ae2c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774948668125_018af1b9.webp?wrap=0', 'uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774948668125_018af1b9.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_TOPIC_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-31 09:17:48.506', '2026-03-31 09:17:48.506', NULL);
INSERT INTO "public"."media" VALUES ('6bb09655-2de8-463a-a571-1c405789711f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774949414476_83ac4330.webp?wrap=0', 'uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774949414476_83ac4330.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_TOPIC_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-31 09:30:14.935', '2026-03-31 09:30:14.935', NULL);
INSERT INTO "public"."media" VALUES ('8b85a973-e2fa-4b9a-ace7-a896083dfc93', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774964904730_4e2dfaa9.webp?wrap=0', 'uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774964904730_4e2dfaa9.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_TOPIC_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-31 13:48:25.143', '2026-03-31 13:48:25.143', NULL);
INSERT INTO "public"."media" VALUES ('ed0474ee-fef0-49c8-8e20-490993a06bc5', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/topics/pngtree-cute-cow-cartoon-vector-png-image_5057875_1774966253413_47c9e7cc.jpg?wrap=0', 'uploads/public/blog/topics/pngtree-cute-cow-cartoon-vector-png-image_5057875_1774966253413_47c9e7cc.jpg', 'pngtree-cute-cow-cartoon-vector-png-image_5057875.jpg', 'image/jpeg', 89440, 'BLOG_TOPIC_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-31 14:10:53.789', '2026-03-31 14:10:53.789', NULL);
INSERT INTO "public"."media" VALUES ('fad3e2c2-687f-4f33-8eb3-da63f6050f42', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774966299961_8538a44e.webp?wrap=0', 'uploads/public/blog/topics/de3db823-07e6-45b3-8835-f6d45505340c_1774966299961_8538a44e.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_TOPIC_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-31 14:11:40.352', '2026-03-31 14:11:40.352', NULL);
INSERT INTO "public"."media" VALUES ('4354cace-ce70-486b-899a-d575caddb917', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774966688529_ef055b3e.webp?wrap=0', 'uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774966688529_ef055b3e.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_POST_IMAGE', NULL, 'f', '2026-03-31 14:18:09.054', '2026-03-31 14:18:09.054', NULL);
INSERT INTO "public"."media" VALUES ('72044288-e62b-47fd-87f7-8de1b95eb3be', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774967937796_656708ee.webp?wrap=0', 'uploads/public/blog/posts/de3db823-07e6-45b3-8835-f6d45505340c_1774967937796_656708ee.webp', 'de3db823-07e6-45b3-8835-f6d45505340c.webp', 'image/webp', 160118, 'BLOG_POST_IMAGE', NULL, 'f', '2026-03-31 14:38:58.165', '2026-03-31 14:38:58.165', NULL);
INSERT INTO "public"."media" VALUES ('3a7d9eda-c56d-431c-be91-d67a925a93bc', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1776010633345_cd9ca1a0.jpg?wrap=0', 'uploads/public/avatars/avatar_1776010633345_cd9ca1a0.jpg', 'avatar.jpg', 'image/jpeg', 74049, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-04-12 16:17:13.966', '2026-04-12 16:17:13.966', NULL);

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
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of order_items
-- ----------------------------
INSERT INTO "public"."order_items" VALUES ('e7f91667-7022-4029-b0cc-c4070cc9f00d', '02a246ae-a28b-402e-bd4c-6af5e0fe4e7f', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'SKU-001-RED', 120000.00, 1, 120000.00, '2026-03-27 04:08:07.29', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('19d5604f-8c78-4a63-99c1-c062c1f39884', '0906e456-fc12-4411-97b2-9ef7654447c5', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '1db18ed7-865b-4d69-87b8-c88656eff292', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '79102357', 646400.00, 1, 646400.00, '2026-03-27 05:17:56.321', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('e9bb4408-b2ba-408f-ab85-7921393136b1', 'c3a5d834-8bff-4d7f-90b1-a31269ee57dd', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'c876a2fe-40da-4f5c-9ff8-9478c3ecd93e', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '77286589', 646400.00, 2, 1292800.00, '2026-03-27 16:24:56.53', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('ba53a774-2f00-42b6-9fa1-2e35ffb8e560', 'a6f1dc86-7150-4755-97ee-1504b220417f', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'd004cc21-a835-4d5f-a949-3bf9db98ccbd', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '95183175', 646400.00, 2, 1292800.00, '2026-03-27 16:36:56.916', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('5d2b990a-7d3b-4074-9d57-3512734f6757', '11bcd9c6-3ded-46aa-9b60-d8a2b30be176', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'SKU-001-RED', 120000.00, 2, 240000.00, '2026-03-28 05:20:12.949', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('3d8a6040-0c1a-4b0a-9670-3ce510e9ec02', '41794ec8-335d-45fb-a75c-00d7c9f37342', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '804bd14c-c2bf-45ee-8ffe-73642ae69076', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', '28870565', 339150.00, 1, 339150.00, '2026-03-29 14:25:34.85', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('54ba0177-0222-40f1-a009-eee55a30b0b1', '41794ec8-335d-45fb-a75c-00d7c9f37342', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'c1284bd1-507f-4e54-9e00-52d80295d31c', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', '52880154', 339150.00, 1, 339150.00, '2026-03-29 14:25:34.85', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('0c16fcc1-1c63-469e-b6ea-fdc1ae6f4253', 'e4e00669-977c-4e91-b90a-708fd4640b65', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '4f2c1c1b-7a25-420a-b239-ab90002503a2', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', '87185538', 349000.00, 1, 349000.00, '2026-04-09 07:33:34.408', '2026-04-09 07:34:55.778', 't');
INSERT INTO "public"."order_items" VALUES ('aeb01713-7a6b-4e60-8ce0-7b5da648255c', 'e4e00669-977c-4e91-b90a-708fd4640b65', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'a6334c84-e558-418d-9e1a-3aab6ef68f2d', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', '97474538', 339150.00, 1, 339150.00, '2026-04-09 07:33:34.408', '2026-04-09 07:34:55.778', 't');
INSERT INTO "public"."order_items" VALUES ('fa1f0c37-ef7d-4e41-b9b4-f9f9903a224e', 'e4e00669-977c-4e91-b90a-708fd4640b65', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'SKU-001-RED', 120000.00, 2, 240000.00, '2026-04-09 07:33:34.408', '2026-04-09 07:34:55.778', 't');
INSERT INTO "public"."order_items" VALUES ('002df8f3-794e-42f7-8af9-13911f2e728f', '8e110219-bbbb-49bb-a1b9-9f6f5e907d2e', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '16d13d2a-fce2-4d21-a72c-9e2cb7a75202', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', '11025156', 349000.00, 3, 1047000.00, '2026-04-12 16:18:50.392', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('5bcfbf56-b9a8-4528-8404-e09326d962dd', '8e110219-bbbb-49bb-a1b9-9f6f5e907d2e', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'f34b4e2c-b599-425b-a999-afc485e3674f', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', '95440379-DEFAULT', 515755.00, 1, 515755.00, '2026-04-12 16:18:50.392', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('de62ecd3-c9d0-4cfb-82d6-6a0dc15fc6e3', '8e110219-bbbb-49bb-a1b9-9f6f5e907d2e', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'SKU-001-RED', 120000.00, 1, 120000.00, '2026-04-12 16:18:50.392', NULL, 'f');
INSERT INTO "public"."order_items" VALUES ('deb663b9-d912-480f-8b6d-08fe45f1d364', '1bbe7eeb-e41b-4e83-ac1f-dc03a8164612', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'f336f788-48a5-4f02-89e6-f5349001a1b3', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', '59178447', 349000.00, 1, 349000.00, '2026-04-17 14:15:26.09', '2026-04-17 14:15:36.23', 't');
INSERT INTO "public"."order_items" VALUES ('3abd7098-8fdf-4504-b82e-8c801fdd147c', '5219f58c-2599-4737-a9ca-17389b2bf633', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '7022882b-0227-4ac0-9664-ab942692394c', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', '71707677', 339150.00, 1, 339150.00, '2026-04-17 14:16:30.379', '2026-04-17 14:31:19.771', 't');
INSERT INTO "public"."order_items" VALUES ('a0e7cb42-3ffa-4090-ba82-2059d9e112fb', '7aa6ac9f-baee-4645-b9f7-02cca6b2f739', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'f34b4e2c-b599-425b-a999-afc485e3674f', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', '95440379-DEFAULT', 515755.00, 1, 515755.00, '2026-04-17 14:33:18.912', '2026-04-17 14:40:02.056', 't');
INSERT INTO "public"."order_items" VALUES ('80d63b69-6b80-47fc-9512-2d1d45d8284d', 'b9378311-ea26-4919-97ec-f6f7496d5b62', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'SKU-001-RED', 120000.00, 2, 240000.00, '2026-04-17 16:11:56.586', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO "public"."orders" VALUES ('02a246ae-a28b-402e-bd4c-6af5e0fe4e7f', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0001', 'CANCELLED', 120000.00, 0.00, 0.00, 0.00, 120000.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-03-27 04:08:07.29', '2026-03-27 04:20:22.562', NULL, 'f');
INSERT INTO "public"."orders" VALUES ('0906e456-fc12-4411-97b2-9ef7654447c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0002', 'SHIPPED', 646400.00, 0.00, 0.00, 0.00, 646400.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, '', '2026-03-27 05:17:56.321', '2026-03-27 15:28:46.356', NULL, 'f');
INSERT INTO "public"."orders" VALUES ('c3a5d834-8bff-4d7f-90b1-a31269ee57dd', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0003', 'CANCELLED', 1292800.00, 0.00, 0.00, 0.00, 1292800.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-03-27 16:24:56.53', '2026-03-27 16:25:19.315', NULL, 'f');
INSERT INTO "public"."orders" VALUES ('a6f1dc86-7150-4755-97ee-1504b220417f', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0004', 'PENDING', 1292800.00, 0.00, 0.00, 0.00, 1292800.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, NULL, '2026-03-27 16:36:56.916', '2026-03-27 16:36:56.916', NULL, 'f');
INSERT INTO "public"."orders" VALUES ('11bcd9c6-3ded-46aa-9b60-d8a2b30be176', '2a36312f-f039-4e10-8346-44189bf87362', 'ORD-260328-0001', 'CONFIRMED', 240000.00, 0.00, 0.00, 0.00, 240000.00, '3982c640-31d2-4686-abea-def0f0297cea', NULL, NULL, '', '2026-03-28 05:20:12.949', '2026-03-28 06:37:58.708', NULL, 'f');
INSERT INTO "public"."orders" VALUES ('e4e00669-977c-4e91-b90a-708fd4640b65', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260409-0001', 'CANCELLED', 928150.00, 0.00, 0.00, 0.00, 928150.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-04-09 07:33:34.408', '2026-04-09 07:34:55.807', '2026-04-09 07:34:55.806', 't');
INSERT INTO "public"."orders" VALUES ('41794ec8-335d-45fb-a75c-00d7c9f37342', '2a36312f-f039-4e10-8346-44189bf87362', 'ORD-260329-0001', 'SHIPPED', 678300.00, 0.00, 0.00, 10000.00, 668300.00, '3982c640-31d2-4686-abea-def0f0297cea', NULL, 'LINGTHAINGUYEN', '', '2026-03-29 14:25:34.85', '2026-04-09 07:39:50.346', NULL, 'f');
INSERT INTO "public"."orders" VALUES ('8e110219-bbbb-49bb-a1b9-9f6f5e907d2e', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260412-0001', 'CONFIRMED', 1682755.00, 0.00, 0.00, 36000.00, 1646755.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, 'LINGDETHUONG', '', '2026-04-12 16:18:50.392', '2026-04-12 16:19:21.788', NULL, 'f');
INSERT INTO "public"."orders" VALUES ('1bbe7eeb-e41b-4e83-ac1f-dc03a8164612', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260417-0001', 'CANCELLED', 349000.00, 0.00, 0.00, 0.00, 349000.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-04-17 14:15:26.09', '2026-04-17 14:15:36.234', '2026-04-17 14:15:36.233', 't');
INSERT INTO "public"."orders" VALUES ('5219f58c-2599-4737-a9ca-17389b2bf633', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260417-0002', 'CANCELLED', 339150.00, 0.00, 0.00, 0.00, 339150.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-04-17 14:16:30.379', '2026-04-17 14:31:19.774', '2026-04-17 14:31:19.773', 't');
INSERT INTO "public"."orders" VALUES ('7aa6ac9f-baee-4645-b9f7-02cca6b2f739', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260417-0003', 'CANCELLED', 515755.00, 0.00, 0.00, 0.00, 515755.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-04-17 14:33:18.912', '2026-04-17 14:40:02.059', '2026-04-17 14:40:02.059', 't');
INSERT INTO "public"."orders" VALUES ('b9378311-ea26-4919-97ec-f6f7496d5b62', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260417-0004', 'PENDING', 240000.00, 0.00, 0.00, 0.00, 240000.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, NULL, '2026-04-17 16:11:56.586', '2026-04-17 16:11:56.586', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of payments
-- ----------------------------
INSERT INTO "public"."payments" VALUES ('3003a574-fd1b-43a2-848d-4546b1b68c46', '02a246ae-a28b-402e-bd4c-6af5e0fe4e7f', 'COD', 120000.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 04:08:07.29', '2026-03-27 04:08:07.29', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('c32b508c-f990-447a-aec1-6ef65793d782', '0906e456-fc12-4411-97b2-9ef7654447c5', 'COD', 646400.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 05:17:56.321', '2026-03-27 05:17:56.321', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('dac54517-19c6-4ed6-9a1a-87c1b7a2aafa', 'c3a5d834-8bff-4d7f-90b1-a31269ee57dd', 'BANK_TRANSFER', 1292800.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 16:24:56.53', '2026-03-27 16:24:56.53', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('ed2e8627-59b9-4e0b-be8a-7f0fa3daacd7', 'a6f1dc86-7150-4755-97ee-1504b220417f', 'COD', 1292800.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 16:36:56.916', '2026-03-27 16:36:56.916', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('9b123174-2487-4a3e-85bf-640208a2d04b', '11bcd9c6-3ded-46aa-9b60-d8a2b30be176', 'COD', 240000.00, 'PENDING', NULL, NULL, NULL, '2026-03-28 05:20:12.949', '2026-03-28 05:20:12.949', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('9797d5fb-979f-4eb4-aa37-77a75c12b39e', '41794ec8-335d-45fb-a75c-00d7c9f37342', 'COD', 668300.00, 'PENDING', NULL, NULL, NULL, '2026-03-29 14:25:34.85', '2026-03-29 14:25:34.85', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('a6bf7cbb-6439-48a1-8321-6f6622fe1ea8', 'e4e00669-977c-4e91-b90a-708fd4640b65', 'COD', 928150.00, 'PENDING', NULL, NULL, NULL, '2026-04-09 07:33:34.408', '2026-04-09 07:33:34.408', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('f7bcb83b-bb6f-457b-93c7-e5a69d8a9bfd', '8e110219-bbbb-49bb-a1b9-9f6f5e907d2e', 'COD', 1646755.00, 'PENDING', NULL, NULL, NULL, '2026-04-12 16:18:50.392', '2026-04-12 16:18:50.392', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('daecb4c9-88f8-4328-af23-923d75ccde0d', '1bbe7eeb-e41b-4e83-ac1f-dc03a8164612', 'COD', 349000.00, 'PENDING', NULL, NULL, NULL, '2026-04-17 14:15:26.09', '2026-04-17 14:15:26.09', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('7eef66e2-b12d-47e9-b571-7437ce3c0753', '5219f58c-2599-4737-a9ca-17389b2bf633', 'COD', 339150.00, 'PENDING', NULL, NULL, NULL, '2026-04-17 14:16:30.379', '2026-04-17 14:16:30.379', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('b8772bc2-2a91-4aad-91c7-ed62db2791b7', '7aa6ac9f-baee-4645-b9f7-02cca6b2f739', 'COD', 515755.00, 'PENDING', NULL, NULL, NULL, '2026-04-17 14:33:18.912', '2026-04-17 14:33:18.912', NULL, 'f');
INSERT INTO "public"."payments" VALUES ('2d81eab7-18f3-46f6-ab6b-510ac4112bcb', 'b9378311-ea26-4919-97ec-f6f7496d5b62', 'COD', 240000.00, 'PENDING', NULL, NULL, NULL, '2026-04-17 16:11:56.586', '2026-04-17 16:11:56.586', NULL, 'f');

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
INSERT INTO "public"."product_badges" VALUES ('63d2ccc4-1246-4c0f-87e8-03fd2eba7575', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'New', 0, 't', 'INFO', 'NEW', '2026-01-16 16:58:44.428', '2026-01-16 16:58:44.428');
INSERT INTO "public"."product_badges" VALUES ('df66979f-5840-4562-88e0-30bd6cd710ff', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', 'free ship extra', 0, 't', 'NEUTRAL', 'FREESHIPPING', '2026-03-26 14:54:04.85', '2026-03-26 14:55:18.16');
INSERT INTO "public"."product_badges" VALUES ('223dc9f3-82be-4ffa-8f25-56f0d0fc8054', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'HOT', 0, 't', 'INFO', 'SALE', '2026-04-18 04:32:26.751', '2026-04-18 04:32:26.751');

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
INSERT INTO "public"."product_categories" VALUES ('d9d14d10-21db-4303-9977-9e24b32b1c57', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '39f1cbdc-41c6-4d11-b785-94cbf1996177', '2026-02-28 06:45:45.209');
INSERT INTO "public"."product_categories" VALUES ('dafe33cd-994f-4474-a4bd-b27f1a16c6c5', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', '2026-03-06 15:08:58.296');
INSERT INTO "public"."product_categories" VALUES ('a8dc284c-4aef-4f5f-9fe2-4c4409116124', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', '2026-03-28 07:35:21.272');
INSERT INTO "public"."product_categories" VALUES ('784e45a6-1282-4d22-9beb-9312a2bb88ad', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', '22efe8cc-9307-491f-8a4e-52164998b55b', '2026-03-28 07:35:21.272');
INSERT INTO "public"."product_categories" VALUES ('2b3609ab-8354-44af-b512-36416bd18184', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', 'f09c0ea5-6508-4f53-befd-5ce727ffcbed', '2026-03-28 07:35:21.272');
INSERT INTO "public"."product_categories" VALUES ('a2711ad7-2adf-424c-b7ac-862930674a35', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', 'ed8f42b0-197a-4706-8df0-03fc4b636c2c', '2026-03-28 07:35:21.272');
INSERT INTO "public"."product_categories" VALUES ('9d083ad1-ae4d-4070-99b1-8540ac8faef9', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', '1c7e487b-4c22-4e87-9f8a-53a626a1da8b', '2026-03-28 07:35:21.272');
INSERT INTO "public"."product_categories" VALUES ('b7f73889-55ac-4548-ba92-81300399f35e', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', '2026-03-28 08:00:12.399');
INSERT INTO "public"."product_categories" VALUES ('e09039de-916c-4ef5-be10-13a35f0484ae', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'f09c0ea5-6508-4f53-befd-5ce727ffcbed', '2026-03-28 08:00:12.399');
INSERT INTO "public"."product_categories" VALUES ('46761d7a-2fde-405d-9ec2-ed12179b5b26', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'ed8f42b0-197a-4706-8df0-03fc4b636c2c', '2026-03-28 08:00:12.399');
INSERT INTO "public"."product_categories" VALUES ('cdd4ee2d-e7e7-4b6e-add2-a45fcadf9f9e', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'efa526c6-f7ea-48e3-a3df-edbcf1b280bd', '2026-03-28 08:00:12.399');
INSERT INTO "public"."product_categories" VALUES ('191721f8-7143-498a-b55c-aa5955babbc1', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '1c7e487b-4c22-4e87-9f8a-53a626a1da8b', '2026-03-28 08:00:12.399');

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
INSERT INTO "public"."product_images" VALUES ('5637fa8b-33e1-42c3-886e-c59c6f4cb229', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Primary image', 0, 't', '2026-01-16 14:51:01.605', '4ca3ddff-7026-47a5-a48c-d314d9862d9d', NULL);
INSERT INTO "public"."product_images" VALUES ('3dff85d2-36e4-4a45-96a9-a3d080080d9f', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Primary image', 1, 'f', '2026-01-16 14:51:48.759', 'ba554aab-bac5-4fd0-afa8-13e9370ecda2', NULL);
INSERT INTO "public"."product_images" VALUES ('4bff8bb5-ff19-453a-a66c-ecec1f085c36', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Primary image', 2, 'f', '2026-01-16 14:51:57.482', '3bfc4091-8470-42f8-8bc7-516374f0079d', NULL);
INSERT INTO "public"."product_images" VALUES ('b0d291cd-2f89-4b93-8f77-cf69753245f5', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 3, 'f', '2026-01-16 14:54:22.073', '43fec89f-1a85-4474-ba07-98d32427f543', NULL);
INSERT INTO "public"."product_images" VALUES ('bbde4c7d-180b-4726-8a4f-6abb0d7be03f', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 4, 'f', '2026-01-16 14:54:36.863', 'c5a64d7f-1538-4ade-a96c-80495edae6f1', NULL);
INSERT INTO "public"."product_images" VALUES ('61e6bb4d-cf7a-49b9-94ab-acf7278178ff', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 5, 'f', '2026-01-16 14:54:58.762', 'f2617e59-bff0-4aa0-868a-66e04bf6794e', NULL);
INSERT INTO "public"."product_images" VALUES ('4448d922-3a16-4013-8883-c018e11e822d', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 6, 'f', '2026-01-16 16:37:05.71', 'c4892fcf-b2ea-4e14-98de-0d1bbd85b065', NULL);
INSERT INTO "public"."product_images" VALUES ('cdf9c012-58a0-4192-81e7-e7a16e3926f7', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 7, 'f', '2026-01-16 16:50:43.807', '31373689-5eb4-4356-9df5-bb535173fd1c', '15feeed5-0d9e-4da1-88ff-50c8fb95aa09');
INSERT INTO "public"."product_images" VALUES ('f50be763-704e-45aa-868f-a6a8eec5e410', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 8, 'f', '2026-01-16 16:52:29.379', '0fb7a1fa-ab9b-459b-a3f2-c6ba7f54b548', 'd004cc21-a835-4d5f-a949-3bf9db98ccbd');
INSERT INTO "public"."product_images" VALUES ('4cb98471-3964-4e7e-8bd7-ac5e724b2054', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 9, 'f', '2026-01-16 16:55:27.53', '6b98ccf3-38bc-4ff8-9ffd-4956d893c820', 'c876a2fe-40da-4f5c-9ff8-9478c3ecd93e');
INSERT INTO "public"."product_images" VALUES ('9c69bfd1-40c8-4745-b2ae-3600b1d5200e', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'Image', 10, 'f', '2026-01-16 16:56:58.918', '8ebebdfa-0db0-4118-81cf-bc48534eaa3d', '1db18ed7-865b-4d69-87b8-c88656eff292');
INSERT INTO "public"."product_images" VALUES ('b558e542-1d02-4459-b8de-eb0f223a6207', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', NULL, 0, 't', '2026-03-06 15:14:18.402', '7494920f-d885-47f9-8e45-30c30f0c531c', NULL);
INSERT INTO "public"."product_images" VALUES ('acca5394-646a-46a7-b1ec-876d2574ebb1', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', NULL, 1, 'f', '2026-03-06 15:18:54.082', '41af639e-ab67-4468-8ac0-8e899f1e485e', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73');
INSERT INTO "public"."product_images" VALUES ('a5c9c32e-1e83-42c5-b008-deead8839bfb', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', NULL, 2, 'f', '2026-03-26 14:52:50.836', '34c09faa-34fa-4c08-a113-29e75ee29a0e', NULL);
INSERT INTO "public"."product_images" VALUES ('68a1aff9-ef6b-4f78-b7c9-974862ee5b6e', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 0, 't', '2026-03-28 08:03:47.902', 'f3daa491-cc07-4988-8a1f-57149db13ddb', NULL);
INSERT INTO "public"."product_images" VALUES ('f071ad8f-ebbd-4b57-91ed-64425ff0987e', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 3, 'f', '2026-03-28 08:11:08.621', '42b757f8-257f-4cf7-b130-63b8a19dbf2f', '216e5791-6703-4900-8404-b0eecf62aa6a');
INSERT INTO "public"."product_images" VALUES ('503a7989-1b98-48d2-b513-298f0cb2d735', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 4, 'f', '2026-03-28 08:22:50.746', '825ec6a2-1c64-4549-b775-4eec4f46002f', '7d630e2b-2c6c-4196-9dce-213502188d51');
INSERT INTO "public"."product_images" VALUES ('c3407425-b5f7-4861-9995-4aaeec56afa4', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 6, 'f', '2026-03-28 08:27:26.029', 'c10ae4de-2ad3-47da-9702-3334a889d74f', '35e1c255-66df-452a-bb90-55944f0225ac');
INSERT INTO "public"."product_images" VALUES ('5d56178b-f266-41b3-a524-54259019db50', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 5, 'f', '2026-03-28 08:24:55.238', '807b2fb6-7dee-44c6-a7b6-ea6afd00c922', 'e6fd98f3-9220-433b-b0de-3da630b7a669');
INSERT INTO "public"."product_images" VALUES ('21ec3748-e070-4d5d-bd1d-64a5640dd4d6', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 7, 'f', '2026-03-28 08:38:19.252', '51ad43ba-65b1-49f9-bccb-4ab139915b1c', 'c54735fd-2658-4c3a-86d6-afd8516c5bd5');
INSERT INTO "public"."product_images" VALUES ('6c42748a-f807-42aa-aa7e-f68b589a9885', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 8, 'f', '2026-03-28 08:39:52.405', '8890c5f8-2a48-48e9-a77a-10cf1ec59e8b', '8aa2f5bf-71c4-43da-b298-310133aad55d');
INSERT INTO "public"."product_images" VALUES ('b3a666ae-bdb1-4312-8d88-fbae0b20f47a', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 9, 'f', '2026-03-28 08:50:31.616', 'e50a9f7a-ac92-4a84-a8bb-82967c41e553', '804bd14c-c2bf-45ee-8ffe-73642ae69076');
INSERT INTO "public"."product_images" VALUES ('36640a72-2663-4454-97a5-78bc286b0fed', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 10, 'f', '2026-03-28 08:51:40.264', '806a3ce3-2086-41b4-8705-d753fab552e1', 'a6334c84-e558-418d-9e1a-3aab6ef68f2d');
INSERT INTO "public"."product_images" VALUES ('a3a7d6e2-f82a-41aa-96ce-6155b1ba46c2', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 11, 'f', '2026-03-28 08:52:56.709', '8cbb787c-eba8-4032-98bb-df2e71e41581', '7022882b-0227-4ac0-9664-ab942692394c');
INSERT INTO "public"."product_images" VALUES ('0541e974-74b3-4ac1-9a67-9281cc3f05cc', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 12, 'f', '2026-03-28 08:53:56.992', '43c4e910-918a-4f94-b6d8-e63a3d3c0f3f', '67344a6a-9a15-4aea-8b89-c19152778212');
INSERT INTO "public"."product_images" VALUES ('8a51cf99-4d3b-45d8-9d89-fc8e5fe00aaa', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 2, 'f', '2026-03-28 08:59:06.237', 'c06b081a-ae35-4e75-a914-4de431a9f129', NULL);
INSERT INTO "public"."product_images" VALUES ('ee49ae96-6fa2-4b02-9dcd-5ae07b86facf', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, 1, 'f', '2026-03-28 09:00:31.069', 'd0d91f28-86c4-414c-ae6e-66f2d4a9523b', NULL);

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
-- Records of product_inventory
-- ----------------------------
INSERT INTO "public"."product_inventory" VALUES ('5d434e9a-eae1-4241-afff-22ad937f051f', '35e1c255-66df-452a-bb90-55944f0225ac', 100, 10, '2026-03-28 08:27:16.342', '2026-03-28 08:32:33.312', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('ceefbd45-1f3c-4d5e-925a-4483f81a7f82', '8caffe21-d0f6-421d-9068-a824440187a8', 0, 10, '2025-11-26 20:23:53.559', '2025-11-26 20:23:53.559', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('68d93a5e-01dd-4acd-8d2c-85f2cc27eb6b', 'ebaf26c3-df7d-4b74-9f7e-302676d919fb', 1000, 10, '2026-03-28 08:34:59.317', '2026-03-28 08:34:59.317', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('6d76d7b9-b61a-4649-957c-433ce85c6f1f', 'c54735fd-2658-4c3a-86d6-afd8516c5bd5', 1000, 10, '2026-03-28 08:38:01.016', '2026-03-28 08:38:01.016', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('a219d8e2-6136-4a81-a271-38baaf594d29', '7022882b-0227-4ac0-9664-ab942692394c', 100, 10, '2026-03-28 08:52:40.463', '2026-04-17 14:31:19.764', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('1af6ac81-54ed-47fe-b2e8-a589242b0a18', '8aa2f5bf-71c4-43da-b298-310133aad55d', 100, 10, '2026-03-28 08:39:22.605', '2026-03-28 08:39:22.605', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('20d519d0-7324-4f7c-9cfa-a52c1e965283', '67344a6a-9a15-4aea-8b89-c19152778212', 100, 10, '2026-03-28 08:53:36.265', '2026-03-28 08:53:36.265', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('9616db54-479d-4ff4-82a6-63b19facc12e', '2aa54c6a-7c94-4f1c-aca5-2c0ed3ab5581', 10, 10, '2026-03-26 17:56:09.579', '2026-03-26 17:56:09.579', 'IN_STOCK', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', -10);
INSERT INTO "public"."product_inventory" VALUES ('f60b8205-f343-4fcb-ae81-d0af3a4e98e1', '804bd14c-c2bf-45ee-8ffe-73642ae69076', 99, 10, '2026-03-28 08:45:56.193', '2026-03-29 14:25:35.066', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('a55cb5ef-1148-452d-8a7c-7d2252792c1a', 'c1284bd1-507f-4e54-9e00-52d80295d31c', 99, 10, '2026-03-28 08:32:19.222', '2026-03-29 14:25:35.071', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('6013c6db-2a72-4eb6-b1b4-e603ff92b023', '1db18ed7-865b-4d69-87b8-c88656eff292', 99, 10, '2026-01-16 16:56:38.31', '2026-03-27 05:17:57.66', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('5c8b369c-1be4-4b5c-bb21-dbc49e8f718f', '15feeed5-0d9e-4da1-88ff-50c8fb95aa09', 0, 10, '2026-01-16 16:41:38.562', '2026-01-16 16:41:38.562', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('c0427b61-6126-4583-b3a2-a0bbec8b10e7', 'c7bba2e6-f70b-4688-a3e7-1a9d238112a5', 0, 10, '2025-11-26 21:02:23.644', '2025-11-26 21:02:23.644', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('d6572365-d0d9-4378-8e4c-4a88f467a5e3', 'c876a2fe-40da-4f5c-9ff8-9478c3ecd93e', 100, 10, '2026-01-16 16:55:07.123', '2026-03-27 16:25:20.498', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('a8f45c8b-759a-4e1c-bb92-55a754fe60d9', 'd004cc21-a835-4d5f-a949-3bf9db98ccbd', 518, 10, '2026-01-16 16:51:29.543', '2026-03-27 16:36:58.298', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('0ac356db-07e5-4dcd-befe-c7e053de6878', 'f34b4e2c-b599-425b-a999-afc485e3674f', 9, 10, '2026-03-26 17:56:09.332', '2026-04-17 14:40:02.05', 'IN_STOCK', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', -10);
INSERT INTO "public"."product_inventory" VALUES ('7e1cab43-9790-41ba-b43f-116d92807477', '216e5791-6703-4900-8404-b0eecf62aa6a', 125, 10, '2026-03-28 08:10:16.541', '2026-03-28 08:10:16.541', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('1e3d3bb6-b611-4e6d-a78b-39b54e309c03', '7d630e2b-2c6c-4196-9dce-213502188d51', 100, 10, '2026-03-28 08:22:21.242', '2026-03-28 08:22:21.242', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('29023227-0932-47cc-aca8-cfcc164dc13a', '4f2c1c1b-7a25-420a-b239-ab90002503a2', 0, 10, '2025-11-26 20:04:58.042', '2026-04-09 07:34:55.461', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('ba22549d-f9b9-4bd3-b490-9f2344456c04', 'a6334c84-e558-418d-9e1a-3aab6ef68f2d', 100, 10, '2026-03-28 08:51:18.956', '2026-04-09 07:34:55.56', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('b902e703-7c10-44cf-b907-06c45676b711', '16d13d2a-fce2-4d21-a72c-9e2cb7a75202', -3, 10, '2025-11-26 20:58:38.476', '2026-04-12 16:18:50.816', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('12006b0d-ae8b-4c29-8951-bfd7d31d282d', 'f336f788-48a5-4f02-89e6-f5349001a1b3', 0, 10, '2025-11-26 21:03:23.963', '2026-04-17 14:15:36.205', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('7d024ab0-f04a-4818-bec1-31a141dffba3', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 95, 10, '2026-03-06 15:18:37.512', '2026-04-17 16:11:56.847', 'IN_STOCK', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', -10);
INSERT INTO "public"."product_inventory" VALUES ('15ad2b7d-7a73-4a84-b2f4-f57521fe12e5', 'e6fd98f3-9220-433b-b0de-3da630b7a669', 254, 10, '2026-03-28 08:00:12.488', '2026-04-18 07:00:51.947', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of product_questions
-- ----------------------------
INSERT INTO "public"."product_questions" VALUES ('a4969f73-22b8-4196-9718-2363ab41acfa', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '2a36312f-f039-4e10-8346-44189bf87362', 'tốt ko?', 'cái này sài tốt á bạn , không có gây kích wungs da', '2a36312f-f039-4e10-8346-44189bf87362', 'ANSWERED', 't', '2026-03-23 13:51:08.657', '2026-03-26 14:35:27.915', NULL, 'f');
INSERT INTO "public"."product_questions" VALUES ('88755dc1-239c-4622-aac0-2dc5f4865d14', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '123', NULL, NULL, 'PENDING', 't', '2026-03-30 19:56:39.05', '2026-03-30 19:57:10.393', '2026-03-30 19:57:10.39', 't');
INSERT INTO "public"."product_questions" VALUES ('3d66013a-2b5c-42cc-9648-b3cba4f76ced', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '12344', NULL, NULL, 'PENDING', 't', '2026-03-30 19:59:22.383', '2026-03-30 19:59:29.854', '2026-03-30 19:59:29.854', 't');
INSERT INTO "public"."product_questions" VALUES ('50cc7b0b-be76-4ebc-9d6c-34035c0dff69', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '2a36312f-f039-4e10-8346-44189bf87362', 'cái này sài có kích ứng không shop', 'không nha b', '2a36312f-f039-4e10-8346-44189bf87362', 'ANSWERED', 't', '2026-03-29 14:17:44.158', '2026-03-31 08:44:41.91', NULL, 'f');
INSERT INTO "public"."product_questions" VALUES ('fa22fbd3-00e2-4181-9a85-1d0d1d0287ae', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'có tốt ko?', NULL, NULL, 'PENDING', 't', '2026-04-12 16:15:15.253', '2026-04-12 16:15:15.253', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of product_reviews
-- ----------------------------
INSERT INTO "public"."product_reviews" VALUES ('df20b098-7bc5-4e1d-b81f-4ae187149be2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '2a36312f-f039-4e10-8346-44189bf87362', 1, 'Great product!', 'I really love this product. It works perfectly for my skin.', 'f', 't', 1, '2026-03-21 08:05:44.349', '2026-03-29 14:23:39.187', NULL, 'f');
INSERT INTO "public"."product_reviews" VALUES ('504c0305-dbb8-477a-a85b-2aeb500b4459', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 5, 'cung  dd', 'good', 'f', 't', 1, '2026-03-18 17:27:11.003', '2026-03-29 14:23:39.74', NULL, 'f');
INSERT INTO "public"."product_reviews" VALUES ('f169ca31-ad22-4460-a802-cbbbcb71ab6f', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 5, 'Đỉnh nha mấy bà', '', 'f', 't', 0, '2026-01-06 08:28:18.993', '2026-03-29 14:23:40.408', NULL, 'f');
INSERT INTO "public"."product_reviews" VALUES ('75fe421e-fb0c-4fb9-b51e-9bd25052fe18', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 5, 'tốt', 'tốt lắm', 'f', 'f', 0, '2026-04-12 16:14:47.685', '2026-04-12 16:14:47.685', NULL, 'f');

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
INSERT INTO "public"."product_stats" VALUES ('fac0fe7b-5fb1-46c7-b144-648aa91cc26d', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 0, 0.00, 5.00, 1, 0, NULL, '2026-01-06 07:52:03.789', '2026-03-29 14:23:39.803');
INSERT INTO "public"."product_stats" VALUES ('6b6188fb-21c4-41ce-b659-75ab57f64ac3', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 0, 0.00, 3.00, 2, 0, NULL, '2026-01-06 07:52:03.741', '2026-03-29 14:23:40.446');

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
  "display_type" "public"."VariantDisplayType" NOT NULL DEFAULT 'COLOR'::"VariantDisplayType",
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of product_variants
-- ----------------------------
INSERT INTO "public"."product_variants" VALUES ('4f2c1c1b-7a25-420a-b239-ab90002503a2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '87185538', '19C Light - da trắng sáng (tone da lạnh beige pink)', '#fee7da', NULL, 'Standard', 349000.00, 0, '2025-11-26 20:04:58.042', '2025-11-26 20:04:58.042', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('7d630e2b-2c6c-4196-9dce-213502188d51', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '49834183', '02 Breeze - hồng tươi tắn', '#FF8087', NULL, 'color', 339150.00, 1, '2026-03-28 08:22:21.242', '2026-03-28 08:22:21.242', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('67344a6a-9a15-4aea-8b89-c19152778212', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '18890077', '07 Rose Water - hồng hoa hồng', '#D56980', NULL, NULL, 339150.00, 6, '2026-03-28 08:53:36.265', '2026-03-28 08:53:36.265', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('8caffe21-d0f6-421d-9068-a824440187a8', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '78006188', '21C Lingerie - da trắng hồng (tone lạnh beige pink)', '#fdd8c4', NULL, 'Standard', 349000.00, 1, '2025-11-26 20:23:53.559', '2025-11-26 20:27:46.593', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('16d13d2a-fce2-4d21-a72c-9e2cb7a75202', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '11025156', '21N linen - da sáng tự nhiên (tone beige yellow)', '#fee1c4', NULL, 'Standard', 349000.00, 2, '2025-11-26 20:58:38.476', '2025-11-26 20:58:38.476', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('c7bba2e6-f70b-4688-a3e7-1a9d238112a5', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '11994898', '23N Ginger - da trung bình (tone tự nhiên beige yellow)', '#ffdab4', NULL, 'Standard', 349000.00, 3, '2025-11-26 21:02:23.644', '2025-11-26 21:02:23.644', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('f336f788-48a5-4f02-89e6-f5349001a1b3', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '59178447', '19N Porcelain - Da trắng sáng (tone da tự nhiên beige yellow)', '#fee0c5', NULL, 'Standard', 349000.00, 4, '2025-11-26 21:03:23.963', '2025-11-26 21:03:23.963', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('15feeed5-0d9e-4da1-88ff-50c8fb95aa09', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '80766492', '21 Rosé', '#f1cfbd', NULL, 'Standard', 808000.00, 0, '2026-01-16 16:41:38.562', '2026-01-16 16:41:38.562', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('d004cc21-a835-4d5f-a949-3bf9db98ccbd', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '95183175', 'No.21 Ivory', '#f1d3b8', NULL, 'Standard', 808000.00, 1, '2026-01-16 16:51:29.543', '2026-01-16 16:51:29.543', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('c876a2fe-40da-4f5c-9ff8-9478c3ecd93e', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '77286589', '22 Natural', '#e8ccb1', NULL, 'Standard', 808000.00, 2, '2026-01-16 16:55:07.123', '2026-01-16 16:55:07.123', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('1db18ed7-865b-4d69-87b8-c88656eff292', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '79102357', '23 Medium', '#eac8ab', NULL, 'Standard', 808000.00, 3, '2026-01-16 16:56:38.31', '2026-01-16 16:56:38.31', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('ebaf26c3-df7d-4b74-9f7e-302676d919fb', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '25802001', '08 Amethyst - hồng tím nhạt', '#EA97AB', NULL, 'color', 339150.00, 7, '2026-03-28 08:34:59.317', '2026-03-28 08:34:59.317', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('216e5791-6703-4900-8404-b0eecf62aa6a', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '63708644', '03 Healthy Boksoonga - hồng đào nude', '#E8ACB4', NULL, 'color', 339150.00, 2, '2026-03-28 08:10:16.541', '2026-03-28 08:10:16.541', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('f34b4e2c-b599-425b-a999-afc485e3674f', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', '95440379-DEFAULT', 'Mặc định', NULL, NULL, NULL, 515755.00, 0, '2026-03-26 17:56:09.286', '2026-03-26 17:56:09.286', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('2aa54c6a-7c94-4f1c-aca5-2c0ed3ab5581', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', 'XPL-9624-DEFAULT', 'Mặc định', NULL, NULL, NULL, 234500.00, 0, '2026-03-26 17:56:09.539', '2026-03-26 17:56:09.539', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('7022882b-0227-4ac0-9664-ab942692394c', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '71707677', '04 Pomelo Nude - cam nude', '#FBB0AA', NULL, NULL, 339150.00, 3, '2026-03-28 08:52:40.463', '2026-03-28 08:52:40.463', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('8aa2f5bf-71c4-43da-b298-310133aad55d', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '21468913', '09 Mauve Grape - tím nho', '#CC93A4', NULL, 'color', 339150.00, 8, '2026-03-28 08:39:22.605', '2026-03-28 08:39:22.605', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('c54735fd-2658-4c3a-86d6-afd8516c5bd5', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '22527551', '10 Peach Bunny - hồng đào nhạt', '#E79D9A', NULL, 'color', 339150.00, 9, '2026-03-28 08:38:01.016', '2026-03-28 08:38:01.016', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('c1284bd1-507f-4e54-9e00-52d80295d31c', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '52880154', '05 Strawberry - hồng dâu', '#E96E9D', NULL, 'color', 339150.00, 4, '2026-03-28 08:32:19.222', '2026-03-28 08:32:19.222', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('35e1c255-66df-452a-bb90-55944f0225ac', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '20689546', '06 Fig Dew - hồng đất', '#CB5B57', NULL, 'color', 339150.00, 5, '2026-03-28 08:27:16.342', '2026-03-28 08:32:33.301', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('804bd14c-c2bf-45ee-8ffe-73642ae69076', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '28870565', '12 Sunday - hồng đỏ', '#E53C51', NULL, NULL, 339150.00, 10, '2026-03-28 08:45:56.193', '2026-03-28 08:45:56.193', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('a6334c84-e558-418d-9e1a-3aab6ef68f2d', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '97474538', '13 Dew Boksoonga - hồng nude', '#F7B7AB', NULL, NULL, 339150.00, 11, '2026-03-28 08:51:18.956', '2026-03-28 08:51:18.956', 'COLOR', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', 'SKU-001-RED', 'Red - Size M', '#d01966', 'M', 'Standard', 289000.00, 0, '2026-03-06 15:18:37.512', '2026-04-17 15:48:10.581', 'IMAGE', NULL, 'f');
INSERT INTO "public"."product_variants" VALUES ('e6fd98f3-9220-433b-b0de-3da630b7a669', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '88846591-DEFAULT 123', '01 La Vie En Coral - hồng san hô 123', '#FB7F73', NULL, 'color', 339150.00, 0, '2026-03-28 08:00:12.399', '2026-04-18 07:00:51.927', 'COLOR', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false,
  "affiliate_link" varchar(1000) COLLATE "pg_catalog"."default",
  "affiliate_source" varchar(255) COLLATE "pg_catalog"."default",
  "product_type" "public"."ProductType" NOT NULL DEFAULT 'INVENTORY'::"ProductType"
)
;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO "public"."products" VALUES ('6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'kem-mat-va-mat-ahc-mo-nam-lam-djeu-mau-da-pro-shot-gluta-ctivation-bright-3-30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', '95440379', 'cc214951-a62b-4650-b06a-11d3848bcb03', 515755.00, 542900.00, 't', 'f', 30.00, 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml giá rẻ', '2025-12-15 14:07:55.1', '2025-12-15 14:07:55.1', NULL, 'f', NULL, NULL, 'INVENTORY');
INSERT INTO "public"."products" VALUES ('f387017f-3306-404a-8a15-584a4d3bf7c9', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', 'kem-nen-li-min-muot-da-banila-co-covericious-power-fit-foundation-30ml-(phien-ban-moi)', 'Sản phẩm trang điểm tuyệt vời của thương hiệu Banila Co, chuyên gia trong việc tạo lớp nền make-up hoàn hảo giúp cho đi từng lỗ chân lông, duy trì độ che phủ ưu việt trong nhiều giờ liền. Nhờ chất kem siêu mỏng và dễ phân tán khi lên da, nhanh chóng bám vào bề mặt và tạo nên lớp nền bền chặt mịn màng khi thoa, che lấp những vùng xỉn màu, thô ráp. Banila Co Covericious Power Fit Foundation giúp tạo ra diện mạo da mới đều màu, mịn màng và trẻ trung hơn.', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '11206214', '7931cc87-0c28-46a3-b2d0-4f073e0d8cd4', 3660000.00, 808000.00, 't', 't', 30.00, 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '2026-01-16 14:44:58.072', '2026-02-28 06:45:45.245', NULL, 'f', NULL, NULL, 'INVENTORY');
INSERT INTO "public"."products" VALUES ('139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 'kem-nen-che-khuyet-djiem-clio-kill-cover-founwear-foundation-the-original-35ml', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', '14554829', 'e6f24ef7-0eff-467e-93b6-14b51af43723', 349000.00, 399000.00, 't', 't', 50.00, 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', '2025-11-24 23:18:57.297', '2025-11-24 23:18:57.297', NULL, 'f', NULL, NULL, 'INVENTORY');
INSERT INTO "public"."products" VALUES ('e6d50dd9-7784-4f8a-82f4-2c84403a050c', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'son-thach-bong-thuan-chay-amuse-jel-fit-tint-3.8g', '<p><strong><em>Công dụng chính</em></strong><em>: Son tint với công thức Jel-fit độc đáo vừa giúp duy trì màu sắc lâu trôi suốt 12h, đồng thời tạo hiệu ứng môi căng mướt, tươi tắn đầy sức sống.</em></p><p><strong><em>Hiệu ứng:</em></strong><em> bóng</em></p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/14d384ff-977c-4bff-a60d-9ff156068ab3.webp"><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/d585c1bd-d5c5-49aa-afee-a90183aec6eb.webp"><p></p>', 'lorrem', 'SON-2604', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 289000.00, NULL, 't', 't', 38.00, NULL, NULL, '2026-03-06 15:08:58.296', '2026-03-19 13:36:49.757', NULL, 'f', NULL, NULL, 'INVENTORY');
INSERT INTO "public"."products" VALUES ('f3f7b181-034e-4e28-846e-0a14ac37a821', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', 'son-nuoc-bong-thuan-chay-amuse-dew-tint-4g', '<p style="text-align:center"><strong><em>Công dụng chính:</em></strong><em> Son tint Amuse mang đến màu sắc trong trẻo, sống động, nhẹ nhàng tô điểm cho đôi môi căng mướt với lớp màu không nhòe hay bết dính nhờ lớp phủ nước.</em></p><p style="text-align:center"><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/a7875436-1c69-4b07-a392-093164537347.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/06e7726a-644a-4a62-aefd-9502d2661c2e.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/9ce20549-672c-4391-8a13-f3c1c324cdad.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/ea48541a-3950-4863-a806-3065a9cdcde5.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/ede09350-4d94-4b7c-ac3b-35488a263f50.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/999bfca7-fcce-4e08-b737-685ef2ce16bf.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/23ef3cfa-ff34-4b3d-be94-c76dda1b9c89.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2672e9a7-fb55-45a5-89f8-3f531a2be0db.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/03166339-2040-4b5f-bee5-22aa9e424c63.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/573dcd10-9570-4936-ac54-4f748cea2427.webp" /></p><p style="text-align:center"></p><p style="text-align:center">Sở hữu son nước bóng Amuse Dew Tint giúp đôi môi của bạn trông căng bóng rạng rỡ. Sản phẩm tạo hiệu ứng môi đầy đặn, không rãnh môi, không khô sạm nhờ chứa các thành phần dưỡng ẩm và kết cấu 3 lớp nước- dầu-nước.</p><p style="text-align:center">Đây là son môi thuần chay Amuse được lấy cảm hứng từ những cánh hoa đang nở, đầy màu sắc và rạng rỡ. Chứa đến 35% dưỡng chất cung cấp độ ẩm, mang đến lớp màu trong suốt, dewy glow cực kỳ tươi tắn với hiệu ứng nhẹ nhàng, bền màu suốt cả ngày mà không bị trôi.</p><p style="text-align:center">Với phiên bản cải tiến mới từ dòng son bán chạy nhất của Amuse, son Dew Tint bám màu tốt hơn, hạn chế xỉn màu son và duy trì độ bóng lâu dài. Sở hữu 12 tông màu đa dạng với nhiều undertone, có thiết kế độc đáo với hình tượng cúc daisy mang lại vẻ ngoài xinh xắn nổi bật khi mới nhìn vào thỏi son nước này.</p><h2 style="text-align:center"><strong>Điểm nổi bật của son nước Amuse Dew Tint</strong></h2><p style="text-align:center">- Son tint chứa 35% nước mang lại độ bóng mướt tự nhiên trên môi. Kết cấu tươi mát và nhẹ nhàng bám chặt vào môi bạn, với cấu trúc ba thành phần nước-dầu-nước</p><p style="text-align:center">- Tạo lớp phủ bóng trên môi và màu sắc trong như nước mang đến cho đôi môi bạn vẻ tươi tắn và màu sắc lâu trôi</p><p style="text-align:center">- Sở hữu bảng màu sắc tươi tắn, rạng rỡ của Amuse giúp màu sắc tự nhiên của đôi môi rạng rỡ</p><p style="text-align:center">- Son đạt chứng nhận thuần chay từ Eve Vegan của Pháp.</p><p style="text-align:center">- Thiết kế trong suốt mang tính biểu tượng của Amuse với thân vỏ trong suốt, nắp đậy được mô phỏng hình cánh hoa, kết hợp các màu sắc trong trẻo của cánh hoa sương.</p><p style="text-align:center">- Chứa thành phần: chiết xuất từ ​​xoài giúp môi bạn mềm mại và ẩm mượt; Chiết xuất từ ​​táo và Vitamin E acetate bảo vệ môi bạn khỏi môi trường bên ngoài.</p><h2 style="text-align:center"><strong>Bảng màu son Dew Tint</strong></h2><p style="text-align:center">01 La Vie En Coral: hồng san hô</p><p style="text-align:center">02 Breeze: hồng tươi tắn</p><p style="text-align:center">03 Healthy Boksoonga: hồng đào nude</p><p style="text-align:center">04 Pomelo Nude: cam nude</p><p style="text-align:center">05 Strawberry: hồng dâu</p><p style="text-align:center">06 Fig Dew: hồng đất</p><p style="text-align:center">07 Rose Water: hồng hoa hồng</p><p style="text-align:center">08 Amethyst: hồng tím nhạt</p><p style="text-align:center">09 Mauve Grape: tím nho</p><p style="text-align:center">10 Peach Bunny: hồng đào nhạt</p><p style="text-align:center">12 Sunday: hồng đỏ</p><p style="text-align:center">13 Dew Boksoonga: hồng nude</p><p style="text-align:center"><em>*Màu son lên môi sẽ khác nhau, tùy vào sắc độ môi của mỗi người. Đối với các dòng son Amuse, màu son thực tế sẽ có màu khác (nhạt hơn, vì kết cấu dạng tint cho sắc thái trong trẻo, tự nhiên hơn) so với màu vỏ son bên ngoài. Do đó, khách hàng cần tham khảo kỹ trước khi chọn mua</em></p><h2 style="text-align:center"><strong>Hướng dẫn sử dụng</strong></h2><p style="text-align:center">Thoa trực tiếp lên môi, theo sở thích tô lòng môi hoặc full môi</p>', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', '88846591', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 339150.00, NULL, 't', 't', 4.00, NULL, NULL, '2026-03-28 08:00:12.399', '2026-03-28 08:00:12.399', NULL, 'f', NULL, NULL, 'INVENTORY');
INSERT INTO "public"."products" VALUES ('9b34afd5-72e9-46f6-aaff-9e3c18e0d197', '(Pleasure - xạ hương) Kem Dưỡng Tay Thuần Chay Amuse Vegan Soybean Hand Cream 50ml (HSD dưới 12 tháng)', '(pleasure-xa-huong)-kem-duong-tay-thuan-chay-amuse-vegan-soybean-hand-cream-50ml-(hsd-duoi-12-thang)', '<p><img class="rounded-lg max-w-full h-auto" src="https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/69a40152405e6_1774187788258_4b60a188.jpg?wrap=0" /><strong>Điểm</strong> <strong>nổi bật </strong>của kem dưỡng tay Amuse Vegan Soybean Hand Cream Kem dưỡng tay thuần chay được chiết từ đậu, loại hạt giàu dưỡng chất giúp giúp dưỡng ẩm và chăm sóc vùng da tay đàn hồi, mềm mại, mịn màng hơn. Với hơn 5.000 ppm ceramide đậu nành được tạo ra bằng cách lên men đậu xanh (từ đảo Jeju, Hàn Quốc) sẽ tập trung cải thiện sự mệt mỏi, khô nứt của đôi bàn tay Amuse Vegan Soybean Hand Cream chứa các chiết xuất bơ hạt mỡ, panthenol &amp; Ceramide giúp cấp ẩm vượt trội,</p><p style="text-align:center"><img class="rounded-lg max-w-full h-auto" src="https://i.pinimg.com/1200x/f4/ff/89/f4ff891c866fe0a74f0e07f57c5a91a6.jpg" /></p><h2 style="text-align:center">dưỡng ẩm sâu cho vùng da tay khô, nứt nẻ. Sản</h2><p style="text-align:center"><img class="rounded-lg max-w-full h-auto" src="https://i.pinimg.com/736x/a5/e1/7d/a5e17d50989f4bbf5d28614557e147db.jpg" /></p><h2 style="text-align:center">phẩm cải thiện nếp nhăn và vùng chai sạm ở tay, giúp đôi tay bạn khỏe mạnh và tươi trẻ với thành phần sạch và không gây dị ứng.</h2><p style="text-align:center"></p><p style="text-align:center">#skincare</p><p style="text-align:center"></p>', '(Pleasure - xạ hương) Kem Dưỡng Tay Thuần Chay Amuse Vegan Soybean Hand Cream 50ml (HSD dưới 12 tháng)', 'XPL-9624', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 234500.00, NULL, 't', 't', NULL, NULL, NULL, '2026-03-10 13:43:35.582', '2026-03-29 08:14:42.15', '2026-03-29 08:14:42.109', 't', NULL, NULL, 'INVENTORY');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of promotions
-- ----------------------------

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
-- Records of review_helpful
-- ----------------------------
INSERT INTO "public"."review_helpful" VALUES ('414cd1c0-921e-4215-a0eb-1d7c65cbff60', '504c0305-dbb8-477a-a85b-2aeb500b4459', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 't', '2026-03-18 17:34:22.093');
INSERT INTO "public"."review_helpful" VALUES ('45c67dda-e31d-4251-9395-8085f5adca2b', 'df20b098-7bc5-4e1d-b81f-4ae187149be2', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 't', '2026-03-25 16:39:43.488');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of review_replies
-- ----------------------------
INSERT INTO "public"."review_replies" VALUES ('b8cb3afb-6864-4e6c-99c5-dd140d3f0ed6', '504c0305-dbb8-477a-a85b-2aeb500b4459', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '.', 'f', '2026-03-19 07:37:15.525', '2026-03-19 07:37:15.525', NULL, 'f');
INSERT INTO "public"."review_replies" VALUES ('4845b332-a70b-437e-9ae2-d14d7f0ce067', '504c0305-dbb8-477a-a85b-2aeb500b4459', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'hay', 'f', '2026-03-20 08:53:48.943', '2026-03-20 08:53:48.943', NULL, 'f');
INSERT INTO "public"."review_replies" VALUES ('bafcf398-f1e3-475c-bfa7-a7bb53907be3', '504c0305-dbb8-477a-a85b-2aeb500b4459', '2a36312f-f039-4e10-8346-44189bf87362', 'Cảm ơn bạn đã đánh giá!', 'f', '2026-03-20 08:54:29.278', '2026-03-20 08:54:29.278', NULL, 'f');
INSERT INTO "public"."review_replies" VALUES ('c7aef156-c706-493b-8eaa-0de168b19198', 'f169ca31-ad22-4460-a802-cbbbcb71ab6f', '2a36312f-f039-4e10-8346-44189bf87362', 'Cảm on bạn đã tin tưởng  sản phẩm của bên mình nah', 'f', '2026-03-20 08:58:32.856', '2026-03-20 08:58:32.856', NULL, 'f');
INSERT INTO "public"."review_replies" VALUES ('33881db5-99ce-45b5-853a-c6b2be1dc107', 'f169ca31-ad22-4460-a802-cbbbcb71ab6f', '2a36312f-f039-4e10-8346-44189bf87362', 'cảm on bạn đã tin dùng sản phẩm nha .,. bạn cần hỗ twoj gì cú  nhắn  cho nhân viên cskh nha', 'f', '2026-03-21 08:00:49.712', '2026-03-21 08:00:49.712', NULL, 'f');
INSERT INTO "public"."review_replies" VALUES ('d58be8ef-ed09-435c-b33d-d6e6a83e8c63', 'f169ca31-ad22-4460-a802-cbbbcb71ab6f', '2a36312f-f039-4e10-8346-44189bf87362', 'shop cảm on bạn nhiều nha', 'f', '2026-03-21 08:18:08.565', '2026-03-21 08:18:08.565', NULL, 'f');
INSERT INTO "public"."review_replies" VALUES ('139d0b9c-eac4-40b8-9e0f-ea7bfccff7fd', '75fe421e-fb0c-4fb9-b51e-9bd25052fe18', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'hi', 'f', '2026-04-12 16:14:59.676', '2026-04-12 16:14:59.676', NULL, 'f');

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of shared_wishlists
-- ----------------------------
INSERT INTO "public"."shared_wishlists" VALUES ('63dd199e-42f9-40fd-bdd2-d21a4f8c8f93', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'dadda3b486e3957c3d84353c4597a879', NULL, NULL, 't', '2026-04-28 16:13:00', 4, '2026-03-28 16:14:23.283', '2026-03-28 16:53:49.948', NULL, 'f');
INSERT INTO "public"."shared_wishlists" VALUES ('7d3a6552-6d15-4eb4-9b71-32c9f686063f', '2a36312f-f039-4e10-8346-44189bf87362', 'c2620a090424c07885b0414687a8abc3', NULL, NULL, 't', NULL, 0, '2026-03-29 15:39:53.387', '2026-03-29 15:39:53.387', NULL, 'f');
INSERT INTO "public"."shared_wishlists" VALUES ('eeb38e6c-a8b6-4064-8f31-5b0a3b415f1e', '2a36312f-f039-4e10-8346-44189bf87362', '6ac94c23576723bf2aa5ad51832f34a8', NULL, NULL, 't', NULL, 0, '2026-03-29 15:39:58.104', '2026-03-29 15:39:58.104', NULL, 'f');
INSERT INTO "public"."shared_wishlists" VALUES ('89221a23-f6db-444f-89df-592db59aa90f', '2a36312f-f039-4e10-8346-44189bf87362', '6a3bf8d84397aec5f0c0c0aad50c2220', NULL, NULL, 't', NULL, 3, '2026-03-29 15:40:06.698', '2026-03-29 15:42:58.317', NULL, 'f');

-- ----------------------------
-- Table structure for user_avatars
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_avatars";
CREATE TABLE "public"."user_avatars" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "media_id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of user_avatars
-- ----------------------------
INSERT INTO "public"."user_avatars" VALUES ('70d924fb-9203-436b-8f2c-9d6145afb35a', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '3a7d9eda-c56d-431c-be91-d67a925a93bc', '2026-03-30 10:35:26.299', '2026-04-12 16:17:13.978');

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
INSERT INTO "public"."user_role_assignments" VALUES ('019ad73b-4b16-706d-94b3-f76930948e51', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '019ad71c-0363-77dd-8909-2bb9f6360eff', '2025-11-30 23:43:53.845', '2025-11-30 23:43:53.845');
INSERT INTO "public"."user_role_assignments" VALUES ('d1f7f430-5d1b-4b8d-8b88-b7cce8b411aa', '24a11dc4-296e-4acb-badf-6d7929d3f7c8', '019ad71b-5d94-7788-8816-5c28161bd32b', '2025-12-11 10:03:26.466', '2025-12-11 10:03:26.466');
INSERT INTO "public"."user_role_assignments" VALUES ('f5146403-c60b-476c-a2c8-72a43d566268', '56832406-b274-47e6-b3fd-4f8e604253e6', '019ad71b-5d94-7788-8816-5c28161bd32b', '2026-02-26 15:40:17.167', '2026-02-26 15:40:17.167');
INSERT INTO "public"."user_role_assignments" VALUES ('37ada17c-0436-4940-b9d7-56ab02d29be4', '2a36312f-f039-4e10-8346-44189bf87362', '019ad71c-0363-77dd-8909-2bb9f6360eff', '2026-01-26 09:47:57.23', '2026-01-26 09:47:57.23');
INSERT INTO "public"."user_role_assignments" VALUES ('d0c3d28e-6898-44e9-916f-1999861c7540', '31a61d3a-1812-4d2d-b8e4-4d27b82eb011', '019ad71c-0363-7ddb-8b7c-fc270e6c33d6', '2026-03-26 14:38:45.734', '2026-03-26 14:38:45.734');
INSERT INTO "public"."user_role_assignments" VALUES ('386aeceb-67b0-439d-a769-52f09887601f', 'edfd5d77-bd20-4aec-ae70-4a2976847fa3', '019ad71b-5d94-7788-8816-5c28161bd32b', '2026-03-29 08:06:57.546', '2026-03-29 08:06:57.546');
INSERT INTO "public"."user_role_assignments" VALUES ('1b0e13d5-a7a0-4823-98fd-60abd5bad5b2', '4ab98db7-dbb1-4caf-b154-9f50bf631502', '019ad71b-5d94-7788-8816-5c28161bd32b', '2026-04-17 15:59:06.538', '2026-04-17 15:59:06.538');
INSERT INTO "public"."user_role_assignments" VALUES ('e40f0c2c-4e7e-433c-970b-d037989e02e6', 'b8416ee5-1a94-4d76-9911-6046649eb9fb', '019ad71b-5d94-7788-8816-5c28161bd32b', '2026-04-29 13:29:44.79', '2026-04-29 13:29:44.79');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_roles";
CREATE TABLE "public"."user_roles" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "name" "public"."RoleName" NOT NULL DEFAULT 'CLIENT'::"RoleName",
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO "public"."user_roles" VALUES ('019ad71b-5d94-7788-8816-5c28161bd32b', '2025-12-01 06:31:56', '2025-12-01 06:32:00', 'CLIENT', NULL, 'f');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-7ddb-8b7c-fc270e6c33d6', '2025-12-01 06:32:37', '2025-12-01 06:32:39', 'AGENCY', NULL, 'f');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-77dd-8909-2bb9f6360eff', '2025-12-01 06:38:51', '2025-12-01 06:38:54', 'ADMINISTRATOR', NULL, 'f');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-789f-8218-cf4a01088597', '2025-12-01 06:32:37', '2025-12-01 06:32:39', 'CLIENT', NULL, 'f');

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
  "deleted_at" timestamp(3),
  "mediaId" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES ('2a36312f-f039-4e10-8346-44189bf87362', 'ogyminecraft497@gmail.com', 'Lý', 'Vân Tư', '0363636363', 'yukidev2005', '$2b$10$kj2m97sva9IfBNUz/LynDe4XhDHvmHA2sFDg7QUWCjKENWDRkuXra', '2026-01-26 09:47:57.23', '2026-04-18 04:27:11.519', '2026-02-05 04:39:36.61', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYTM2MzEyZi1mMDM5LTRlMTAtODM0Ni00NDE4OWJmODczNjIiLCJ1c2VybmFtZSI6Inl1a2lkZXYyMDA1IiwiaWF0IjoxNzc2NDg2NDMxLCJleHAiOjE3NzkwNzg0MzF9.-FR_L2ZnzMrtbQzLPg8xhw8Wzgfq31QG36IcsSjCLa0', NULL, NULL);
INSERT INTO "public"."users" VALUES ('56832406-b274-47e6-b3fd-4f8e604253e6', 'devyuki2005@imail.edu.vnde', 'Uyển Nhi', 'Nguyễn Ngọc', '0363639639636', 'yeudauvai3003', '$2b$10$YkNCwrKG0qMSb2DDAluCNeMsUJ6sKwVU4aqrxv5rd3GBcW6Vv7JKe', '2026-02-26 15:40:17.167', '2026-02-26 15:40:17.167', NULL, 't', 'f', 'f', 'f', 'f', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES ('4f1a4a71-8afc-4609-9f21-97c5e25f816a', 'alovuavu222@gmail.com', 'pham thi', ' yen vy', '036363636', 'vyyyy', '$2b$10$TfGcm1ifVE2LC9jbePscSufY8Tnv92Rlu7cHQMV6EdlSj1JoPaneW', '2026-03-02 09:33:16.426', '2026-03-26 14:36:18.307', '2026-03-02 09:33:16.424', 'f', 't', 'f', 'f', 'f', 'f', '2026-03-02 09:33:16.424', NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES ('24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'Nguyễn', 'Lu', '0123456789', 'lucan1', '$2b$10$3RgYDM3n9/3tGFwszsqk5eYVIZid89huDbKVxfYOW.v0mqdqEcYvG', '2025-12-11 10:03:26.466', '2026-04-07 08:42:17.819', '2025-12-11 10:29:43.927', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNGExMWRjNC0yOTZlLTRhY2ItYmFkZi02ZDc5MjlkM2Y3YzgiLCJ1c2VybmFtZSI6Imx1Y2FuMSIsImlhdCI6MTc3NTU1MTMzNywiZXhwIjoxNzc4MTQzMzM3fQ.vDt9_ZPTviO866iFPzYE5xJzaYJKR8txCqFzFYv8hdI', NULL, NULL);
INSERT INTO "public"."users" VALUES ('31a61d3a-1812-4d2d-b8e4-4d27b82eb011', 'ogyminecraft497+taybocha@gmail.com', 'Độ', 'Phùng Thanh', '0356618545', 'taybocha3636', '$2b$10$2eojdX27emt7c3ihsoYc0OPve3X/VnEPHkSiLCWLfYba5pXHtjwNe', '2026-03-26 14:38:09.846', '2026-03-26 14:38:45.553', NULL, 't', 'f', 'f', 't', 't', 't', NULL, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES ('b8416ee5-1a94-4d76-9911-6046649eb9fb', 'duyatd2@gmail.com', 'Nguyễn', 'Quang Duy', '+84868816266', 'duyatd2', '$2b$10$io.xys9WgXi/CK3yqv3ZBea4QkNMWIl2/qOLNLFDIrnU3axet.8K6', '2026-04-29 13:29:44.79', '2026-04-29 13:30:26.134', '2026-04-29 13:30:26.133', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiODQxNmVlNS0xYTk0LTRkNzYtOTkxMS02MDQ2NjQ5ZWI5ZmIiLCJ1c2VybmFtZSI6ImR1eWF0ZDIiLCJpYXQiOjE3Nzc0NjkzODQsImV4cCI6MTc4MDA2MTM4NH0.cwJrZoztJndJwGlB8snhAc2iuFQeKK_pK00cedpO0Es', NULL, NULL);
INSERT INTO "public"."users" VALUES ('4ab98db7-dbb1-4caf-b154-9f50bf631502', 'ngoclinkk202@gmail.com', 'Lương', 'Kiều Linh', '0359719793', 'Ling', '$2b$10$S./1u2hvso4xm2w0EMIBAOCfDJZ/XAjzEtfx9cV..H.MTl8U6n4ce', '2026-04-12 16:19:59.026', '2026-04-17 15:59:06.371', '2026-04-12 16:20:17.389', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YWI5OGRiNy1kYmIxLTRjYWYtYjE1NC05ZjUwYmY2MzE1MDIiLCJ1c2VybmFtZSI6IkxpbmciLCJpYXQiOjE3NzYwMTA3OTksImV4cCI6MTc3ODYwMjc5OX0.aD9Y7ljLDtEgcJtIppesRISbbSl0CcpHZ7eKuEcDkGc', NULL, NULL);
INSERT INTO "public"."users" VALUES ('edfd5d77-bd20-4aec-ae70-4a2976847fa3', 'user1@example.com', 'John', 'Doe', '+1234567891', 'user1', '$2b$10$NhJ/s.Ms5lToR8JCwLzhC.5rqk4EM3mu9ImcX482sM0MYfXdkgogO', '2025-11-30 23:43:53.845', '2026-03-29 08:06:57.266', NULL, 't', 'f', 'f', 't', 't', 't', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZGZkNWQ3Ny1iZDIwLTRhZWMtYWU3MC00YTI5NzY4NDdmYTMiLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzY0NTQ3NTMzLCJleHAiOjE3NjcxMzk1MzN9.BcHzJUFFqqVZmaAleh30ZGnnFXnVKDVuAEokqht-y24', NULL, NULL);
INSERT INTO "public"."users" VALUES ('bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'Hàn Tiểu', 'Ling', '+1234567890', 'htligz', '$2b$10$P2vJiwVIE4TIJ7fW9cYaXe24qV8W0QnjsgmN8KwpZCRUC5VpGKile', '2025-11-05 17:44:38.293', '2026-04-17 16:11:38.19', '2026-01-30 08:29:35.591', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZDlmZGNjMS01MjQ3LTQ5YTItOWVkNC0xZjAwNWRkNDdjZDIiLCJ1c2VybmFtZSI6Imh0bGlneiIsImlhdCI6MTc3NjQ0MjI5OCwiZXhwIjoxNzc5MDM0Mjk4fQ.o7F0h2MVth7HFPvdLtRLVdPpNRs48tGsR6rPFuf3pgQ', NULL, NULL);

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
  "updated_at" timestamp(3) NOT NULL,
  "deleted_at" timestamp(3),
  "is_deleted" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of wishlists
-- ----------------------------
INSERT INTO "public"."wishlists" VALUES ('47d39153-3fb4-47a9-83cb-4f35792524b1', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', NULL, NULL, '2026-03-28 16:59:30.786', '2026-03-28 16:59:30.786', NULL, 'f');
INSERT INTO "public"."wishlists" VALUES ('1ea64cf6-3d18-42c8-ab5b-846f973e566b', '2a36312f-f039-4e10-8346-44189bf87362', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', NULL, NULL, '2026-03-29 15:39:21.071', '2026-03-29 15:39:21.071', NULL, 'f');
INSERT INTO "public"."wishlists" VALUES ('13b547e3-8f4c-4fa3-ae84-ad46e8692dad', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', NULL, '2026-03-30 10:08:39.999', '2026-03-30 10:08:44.407', '2026-03-30 10:08:44.406', 't');
INSERT INTO "public"."wishlists" VALUES ('3be00c20-23c0-4e31-9406-5f4f3d12fcbb', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', NULL, NULL, '2026-03-28 16:59:30.653', '2026-04-09 08:05:14.552', '2026-04-09 08:05:14.547', 't');
INSERT INTO "public"."wishlists" VALUES ('759952ef-fa51-4262-b360-04ca92b5b8b1', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', NULL, NULL, '2026-04-09 08:05:16.352', '2026-04-09 08:05:16.352', NULL, 'f');
INSERT INTO "public"."wishlists" VALUES ('0fd38bc8-1a7b-4607-87fd-f445480f54a0', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f3f7b181-034e-4e28-846e-0a14ac37a821', NULL, NULL, '2026-04-09 08:12:17.778', '2026-04-09 08:12:20.034', '2026-04-09 08:12:20.034', 't');

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
CREATE INDEX "addresses_is_deleted_idx" ON "public"."addresses" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "affiliate_commissions_is_deleted_idx" ON "public"."affiliate_commissions" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "affiliate_links_is_deleted_idx" ON "public"."affiliate_links" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "affiliates_is_deleted_idx" ON "public"."affiliates" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "banner_groups_is_deleted_idx" ON "public"."banner_groups" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "banners_is_deleted_idx" ON "public"."banners" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "banners_position_idx" ON "public"."banners" USING btree (
  "position" "pg_catalog"."enum_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table banners
-- ----------------------------
ALTER TABLE "public"."banners" ADD CONSTRAINT "banners_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table blog_comment_reports
-- ----------------------------
CREATE INDEX "blog_comment_reports_comment_id_idx" ON "public"."blog_comment_reports" USING btree (
  "comment_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_comment_reports_created_at_idx" ON "public"."blog_comment_reports" USING btree (
  "created_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "blog_comment_reports_reporter_id_idx" ON "public"."blog_comment_reports" USING btree (
  "reporter_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_comment_reports_status_idx" ON "public"."blog_comment_reports" USING btree (
  "status" "pg_catalog"."enum_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table blog_comment_reports
-- ----------------------------
ALTER TABLE "public"."blog_comment_reports" ADD CONSTRAINT "blog_comment_reports_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table blog_comments
-- ----------------------------
CREATE INDEX "blog_comments_created_at_idx" ON "public"."blog_comments" USING btree (
  "created_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "blog_comments_is_deleted_idx" ON "public"."blog_comments" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "blog_comments_parent_id_idx" ON "public"."blog_comments" USING btree (
  "parent_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_comments_post_id_idx" ON "public"."blog_comments" USING btree (
  "post_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_comments_user_id_idx" ON "public"."blog_comments" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table blog_comments
-- ----------------------------
ALTER TABLE "public"."blog_comments" ADD CONSTRAINT "blog_comments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table blog_posts
-- ----------------------------
CREATE INDEX "blog_posts_author_id_idx" ON "public"."blog_posts" USING btree (
  "author_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_posts_is_deleted_idx" ON "public"."blog_posts" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "blog_posts_published_at_idx" ON "public"."blog_posts" USING btree (
  "published_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "blog_posts_slug_idx" ON "public"."blog_posts" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "public"."blog_posts" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_posts_status_idx" ON "public"."blog_posts" USING btree (
  "status" "pg_catalog"."enum_ops" ASC NULLS LAST
);
CREATE INDEX "blog_posts_topic_id_idx" ON "public"."blog_posts" USING btree (
  "topic_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table blog_posts
-- ----------------------------
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table blog_topics
-- ----------------------------
CREATE INDEX "blog_topics_image_media_id_idx" ON "public"."blog_topics" USING btree (
  "image_media_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_topics_is_deleted_idx" ON "public"."blog_topics" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "blog_topics_parent_id_idx" ON "public"."blog_topics" USING btree (
  "parent_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "blog_topics_slug_idx" ON "public"."blog_topics" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "blog_topics_slug_key" ON "public"."blog_topics" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table blog_topics
-- ----------------------------
ALTER TABLE "public"."blog_topics" ADD CONSTRAINT "blog_topics_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table brands
-- ----------------------------
CREATE INDEX "brands_is_deleted_idx" ON "public"."brands" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "carts_is_deleted_idx" ON "public"."carts" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "categories_is_deleted_idx" ON "public"."categories" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "commission_rates_is_deleted_idx" ON "public"."commission_rates" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "coupons_is_deleted_idx" ON "public"."coupons" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "flash_sales_is_deleted_idx" ON "public"."flash_sales" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "media_is_deleted_idx" ON "public"."media" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "order_items_is_deleted_idx" ON "public"."order_items" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "orders_is_deleted_idx" ON "public"."orders" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "payments_is_deleted_idx" ON "public"."payments" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "product_questions_is_deleted_idx" ON "public"."product_questions" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "product_reviews_is_deleted_idx" ON "public"."product_reviews" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "product_variants_is_deleted_idx" ON "public"."product_variants" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "products_is_deleted_idx" ON "public"."products" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "products_product_type_idx" ON "public"."products" USING btree (
  "product_type" "pg_catalog"."enum_ops" ASC NULLS LAST
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
CREATE INDEX "promotions_is_deleted_idx" ON "public"."promotions" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "review_replies_is_deleted_idx" ON "public"."review_replies" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "shared_wishlists_is_deleted_idx" ON "public"."shared_wishlists" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
-- Indexes structure for table user_avatars
-- ----------------------------
CREATE INDEX "user_avatars_media_id_idx" ON "public"."user_avatars" USING btree (
  "media_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "user_avatars_user_id_idx" ON "public"."user_avatars" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "user_avatars_user_id_key" ON "public"."user_avatars" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user_avatars
-- ----------------------------
ALTER TABLE "public"."user_avatars" ADD CONSTRAINT "user_avatars_pkey" PRIMARY KEY ("id");

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
CREATE INDEX "user_roles_is_deleted_idx" ON "public"."user_roles" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
CREATE INDEX "users_email_idx" ON "public"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "users_email_key" ON "public"."users" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "users_is_deleted_idx" ON "public"."users" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
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
CREATE INDEX "wishlists_is_deleted_idx" ON "public"."wishlists" USING btree (
  "is_deleted" "pg_catalog"."bool_ops" ASC NULLS LAST
);
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
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table affiliate_commissions
-- ----------------------------
ALTER TABLE "public"."affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."affiliate_commissions" ADD CONSTRAINT "affiliate_commissions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table affiliate_links
-- ----------------------------
ALTER TABLE "public"."affiliate_links" ADD CONSTRAINT "affiliate_links_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "public"."affiliates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table affiliates
-- ----------------------------
ALTER TABLE "public"."affiliates" ADD CONSTRAINT "affiliates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table banner_group_mappings
-- ----------------------------
ALTER TABLE "public"."banner_group_mappings" ADD CONSTRAINT "banner_group_mappings_banner_group_id_fkey" FOREIGN KEY ("banner_group_id") REFERENCES "public"."banner_groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."banner_group_mappings" ADD CONSTRAINT "banner_group_mappings_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "public"."banners" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table banners
-- ----------------------------
ALTER TABLE "public"."banners" ADD CONSTRAINT "banners_image_media_id_fkey" FOREIGN KEY ("image_media_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table blog_comment_reports
-- ----------------------------
ALTER TABLE "public"."blog_comment_reports" ADD CONSTRAINT "blog_comment_reports_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."blog_comments" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."blog_comment_reports" ADD CONSTRAINT "blog_comment_reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."blog_comment_reports" ADD CONSTRAINT "blog_comment_reports_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table blog_comments
-- ----------------------------
ALTER TABLE "public"."blog_comments" ADD CONSTRAINT "blog_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_comments" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."blog_comments" ADD CONSTRAINT "blog_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."blog_comments" ADD CONSTRAINT "blog_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table blog_posts
-- ----------------------------
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_featured_image_id_fkey" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."blog_posts" ADD CONSTRAINT "blog_posts_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."blog_topics" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table blog_topics
-- ----------------------------
ALTER TABLE "public"."blog_topics" ADD CONSTRAINT "blog_topics_image_media_id_fkey" FOREIGN KEY ("image_media_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."blog_topics" ADD CONSTRAINT "blog_topics_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_topics" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table brands
-- ----------------------------
ALTER TABLE "public"."brands" ADD CONSTRAINT "brands_logo_media_id_fkey" FOREIGN KEY ("logo_media_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table cart_items
-- ----------------------------
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table carts
-- ----------------------------
ALTER TABLE "public"."carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_image_media_id_fkey" FOREIGN KEY ("image_media_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table commission_rates
-- ----------------------------
ALTER TABLE "public"."commission_rates" ADD CONSTRAINT "commission_rates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table coupon_usages
-- ----------------------------
ALTER TABLE "public"."coupon_usages" ADD CONSTRAINT "coupon_usages_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."coupon_usages" ADD CONSTRAINT "coupon_usages_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table email_verification_logs
-- ----------------------------
ALTER TABLE "public"."email_verification_logs" ADD CONSTRAINT "email_verification_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table flash_sale_orders
-- ----------------------------
ALTER TABLE "public"."flash_sale_orders" ADD CONSTRAINT "flash_sale_orders_flash_sale_id_fkey" FOREIGN KEY ("flash_sale_id") REFERENCES "public"."flash_sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."flash_sale_orders" ADD CONSTRAINT "flash_sale_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table flash_sale_products
-- ----------------------------
ALTER TABLE "public"."flash_sale_products" ADD CONSTRAINT "flash_sale_products_flash_sale_id_fkey" FOREIGN KEY ("flash_sale_id") REFERENCES "public"."flash_sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."flash_sale_products" ADD CONSTRAINT "flash_sale_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."flash_sale_products" ADD CONSTRAINT "flash_sale_products_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table media
-- ----------------------------
ALTER TABLE "public"."media" ADD CONSTRAINT "media_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table order_items
-- ----------------------------
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
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
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_badges
-- ----------------------------
ALTER TABLE "public"."product_badges" ADD CONSTRAINT "product_badges_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_categories
-- ----------------------------
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_images
-- ----------------------------
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_inventory
-- ----------------------------
ALTER TABLE "public"."product_inventory" ADD CONSTRAINT "product_inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."product_inventory" ADD CONSTRAINT "product_inventory_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_questions
-- ----------------------------
ALTER TABLE "public"."product_questions" ADD CONSTRAINT "product_questions_answered_by_fkey" FOREIGN KEY ("answered_by") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."product_questions" ADD CONSTRAINT "product_questions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."product_questions" ADD CONSTRAINT "product_questions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_reviews
-- ----------------------------
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."product_reviews" ADD CONSTRAINT "product_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_stats
-- ----------------------------
ALTER TABLE "public"."product_stats" ADD CONSTRAINT "product_stats_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table product_variants
-- ----------------------------
ALTER TABLE "public"."product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table products
-- ----------------------------
ALTER TABLE "public"."products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table promotion_products
-- ----------------------------
ALTER TABLE "public"."promotion_products" ADD CONSTRAINT "promotion_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."promotion_products" ADD CONSTRAINT "promotion_products_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table review_helpful
-- ----------------------------
ALTER TABLE "public"."review_helpful" ADD CONSTRAINT "review_helpful_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."review_helpful" ADD CONSTRAINT "review_helpful_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table review_images
-- ----------------------------
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."review_images" ADD CONSTRAINT "review_images_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table review_replies
-- ----------------------------
ALTER TABLE "public"."review_replies" ADD CONSTRAINT "review_replies_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."review_replies" ADD CONSTRAINT "review_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table shared_wishlists
-- ----------------------------
ALTER TABLE "public"."shared_wishlists" ADD CONSTRAINT "shared_wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table user_avatars
-- ----------------------------
ALTER TABLE "public"."user_avatars" ADD CONSTRAINT "user_avatars_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "public"."media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."user_avatars" ADD CONSTRAINT "user_avatars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table user_role_assignments
-- ----------------------------
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."user_roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."user_role_assignments" ADD CONSTRAINT "user_role_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "public"."media" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table wishlists
-- ----------------------------
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."wishlists" ADD CONSTRAINT "wishlists_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "public"."product_variants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
