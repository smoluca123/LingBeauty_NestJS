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

 Date: 29/03/2026 00:54:23
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
  "updated_at" timestamp(3) NOT NULL,
  "type" "public"."AddressType" NOT NULL DEFAULT 'HOME'::"AddressType"
)
;

-- ----------------------------
-- Records of addresses
-- ----------------------------
INSERT INTO "public"."addresses" VALUES ('3a90605b-bb9f-4f0e-ab76-adb3bba122fe', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'Kan Tan', '3090557033', 'hcm33', '', 'Quận Ba Đình', 'Thành phố Hà Nội', 'Phường Trúc Bạch', 'Vietnam', 'f', '2026-02-16 09:43:42.703', '2026-02-24 06:37:53.545', 'HOME');
INSERT INTO "public"."addresses" VALUES ('2d7a9b06-68a9-4104-8694-8242151a6923', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'Ebe Lingg', '0359719793', 'ngõ 158a phú thái tân thịnh', '', 'Thành phố Thái Nguyên', 'Tỉnh Thái Nguyên', 'Phường Tân Thịnh', 'Vietnam', 't', '2026-02-20 15:28:08.506', '2026-02-28 14:33:48.068', 'HOME');
INSERT INTO "public"."addresses" VALUES ('3982c640-31d2-4686-abea-def0f0297cea', '2a36312f-f039-4e10-8346-44189bf87362', 'Phồ Thanh Dụng', '03636363636', '120 , Yên Lãng ', '', 'Quận Hà Đông', 'Thành phố Hà Nội', 'Phường Mộ Lao', 'Vietnam', 't', '2026-03-28 05:19:06.819', '2026-03-28 05:19:06.819', 'HOME');

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
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of banner_groups
-- ----------------------------
INSERT INTO "public"."banner_groups" VALUES ('78e55817-81ee-4312-923e-f8ab28960ffd', 'Homepage Main Banners', 'homepage-main', 'Main banner group for homepage display', 't', NULL, NULL, '2026-01-07 10:11:41.818', '2026-01-07 10:11:41.818');
INSERT INTO "public"."banner_groups" VALUES ('058ad3c5-be6a-410e-9d06-394ae17bea12', 'banner tet 2026 clone 3', 'banner-tet-2026- clon clon', 'agsg', 't', '2026-03-15 00:00:00', '2026-03-17 00:00:00', '2026-03-15 15:31:35.255', '2026-03-18 06:46:43.829');
INSERT INTO "public"."banner_groups" VALUES ('07496266-01b0-4212-9133-48e551a40aec', 'banner lễ 30/4', 'banner-le-3004', '30/4', 't', '2026-04-30 00:00:00', '2026-05-03 00:00:00', '2026-03-18 06:47:49.252', '2026-03-18 06:47:49.252');
INSERT INTO "public"."banner_groups" VALUES ('d8b8ae6b-a067-4d34-ae6c-11748d1ba682', 'Banner 22-3 22-4', 'banner-22-3-22-4', 'Banner 22-3 22-4', 't', '2026-03-22 00:00:00', '2026-04-22 00:00:00', '2026-03-26 09:23:09.709', '2026-03-26 09:23:09.709');

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
-- Records of banners
-- ----------------------------
INSERT INTO "public"."banners" VALUES ('78b90b89-7961-447d-bbee-e18601d852ed', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-01-07 10:11:41.858', '2026-01-07 10:27:59.025', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('f44429dc-f589-4a87-af6a-1a2b2d1f9742', 'TEXT', 'MAIN_CAROUSEL', 'Ưu đãi hôm nay', 'Giảm đến 50% sản phẩm chăm sóc da', 'Chọn ngay routine phù hợp cho làn da của bạn với deal siêu hời.', 'Giảm đến -50%', 'Khám phá ngay', '/products', 'Áp dụng cho sản phẩm được gắn nhãn Flash Sale.', NULL, 't', '2026-01-07 10:11:41.937', '2026-01-07 10:11:41.937', '#e0f2ff', '#ffffff');
INSERT INTO "public"."banners" VALUES ('d2247869-a03c-4e79-8c39-f29034941f24', 'TEXT', 'MAIN_CAROUSEL', 'Hội viên mới', 'Tặng voucher 50K cho đơn đầu tiên', 'Đăng ký tài khoản để nhận thêm nhiều ưu đãi cực dễ thương.', 'Voucher 50K', 'Đăng ký ngay', '/auth/register', 'Áp dụng cho đơn từ 299K.', NULL, 't', '2026-01-07 10:11:42.01', '2026-01-07 10:11:42.01', '#fff4e0', '#ffffff');
INSERT INTO "public"."banners" VALUES ('03d3c99e-0f44-4a47-8fcf-88ffc9182282', 'TEXT', 'SIDE_TOP', 'Sạch sâu nhưng vẫn dịu nhẹ', 'Combo làm sạch da 100%', 'Làm sạch nhiều lớp makeup, không khô căng.', 'Chỉ từ 58K', 'Xem ngay', '/products', NULL, NULL, 't', '2026-01-07 10:11:42.085', '2026-01-07 10:11:42.085', '#e5f6ff', '#ffffff');
INSERT INTO "public"."banners" VALUES ('39632dd3-fcb2-44c0-a202-a27bd5060275', 'TEXT', 'SIDE_BOTTOM', 'Độc quyền tại Beauty Box', 'Kem nền Mesh Blur mịn lì', 'Hiệu ứng blur mờ mịn, che phủ cho lớp nền tự nhiên.', 'Mua kèm nhận quà tặng', 'Xem ngay', '/products', NULL, NULL, 't', '2026-01-07 10:11:42.186', '2026-01-07 10:11:42.186', '#f4e6ff', '#ffffff');
INSERT INTO "public"."banners" VALUES ('5410b9f1-2d80-4d51-99ee-325ae5c24116', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:32:04.951', '2026-03-16 08:32:04.951', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('f84dcb74-6dd9-4914-9aa2-c4ba3b026ccf', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH2', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:32:35.69', '2026-03-16 08:32:35.69', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('2a702013-cea1-4a94-8d9b-13065342bf78', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH3', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:40:05.523', '2026-03-16 08:40:05.523', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('866d9dbf-3fca-44e1-8a6a-41f4c7c3d98f', 'TEXT', 'MAIN_CAROUSEL', 'Beauty Box', 'FLASH SALE RINH QUÀ LINH ĐÌNH4', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', NULL, 't', '2026-03-16 08:40:14.356', '2026-03-16 08:40:14.356', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('7e66e6d1-f9c9-48a7-aa0b-a9c406666d40', 'IMAGE', 'SIDE_TOP', 'Beauty Box', 'abccc', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', '3a84f7f1-965b-49f9-a369-f969bf79d8bd', 't', '2026-03-16 09:08:33.879', '2026-03-16 09:08:33.879', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('ef82cd6f-6131-4005-ad2a-4110d28a5caa', 'IMAGE', 'SIDE_TOP', 'Beauty Box', 'abccc', 'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.', 'Mua 1 tặng 3', 'Mua ngay', '/products/flash-sale', 'Số lượng quà tặng có hạn.', '4fa17852-82f9-402f-8e80-535304ada5c4', 't', '2026-03-16 09:13:05.525', '2026-03-16 09:13:05.525', '#ffe4f0', '#fff5fb');
INSERT INTO "public"."banners" VALUES ('547f5e59-9403-4745-a190-d65728447a1c', 'IMAGE', 'SIDE_TOP', '1bc', 'ahiahi', 'ahihi', 'ahihi', 'aduduu', NULL, NULL, 'dddf1a70-67a3-44ea-84f5-93c465647995', 't', '2026-03-17 07:06:22.89', '2026-03-19 09:14:41.618', '#FF6B9D', '#FF8E53');
INSERT INTO "public"."banners" VALUES ('82f22a69-29b5-4893-afc8-34862a5dcdd2', 'IMAGE', 'MAIN_CAROUSEL', NULL, 'Banner chính 1', '1aa', NULL, NULL, '#', NULL, '2dac9985-4763-4b8c-b13c-cae32dd9f933', 't', '2026-03-26 09:46:22.871', '2026-03-26 10:11:05.17', '#FF6B9D', '#FF8E53');

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
INSERT INTO "public"."brands" VALUES ('e6f24ef7-0eff-467e-93b6-14b51af43723', 'CLIO', 'clio', 'Thương hiệu CLIO', NULL, 't', '2025-11-20 15:29:58.904', '2025-11-20 15:29:58.904', '8bb07459-85f1-4fc2-8cd4-3d38451d7d20');
INSERT INTO "public"."brands" VALUES ('3897d67d-23e5-49e7-8533-f64d910e3780', 'GOODAL', 'goodal', 'Thương hiệu GOODAL', NULL, 't', '2025-11-20 15:35:30.136', '2025-11-20 15:35:30.136', '641426b7-bd5e-4e81-8227-70466d492621');
INSERT INTO "public"."brands" VALUES ('7931cc87-0c28-46a3-b2d0-4f073e0d8cd4', 'BANILA CO', 'banila-co', 'Thương hiệu BANILA CO', NULL, 't', '2025-12-15 11:24:19.768', '2025-12-15 11:24:19.768', '8e0865a8-f770-419d-b6f4-87127c5452ff');
INSERT INTO "public"."brands" VALUES ('cc214951-a62b-4650-b06a-11d3848bcb03', 'AHC', 'ahc', 'Thương hiệu AHC', NULL, 't', '2025-11-20 15:28:56.617', '2026-03-06 15:06:04.897', '775e73e3-c1d3-4d69-971e-143980ffec74');
INSERT INTO "public"."brands" VALUES ('cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 'AMUSE', 'amuse', 'Thương hiệu mỹ phẩm thuần chay AMUSE Hàn Quốc là cái tên đang ngày càng trở nên phổ biến trong cộng đồng yêu thích làm đẹp, đặc biệt là tại thị trường Hàn Quốc và các quốc gia châu Á. Với tiêu chí mang lại những sản phẩm chất lượng, an toàn và hiệu quả, AMUSE đã nhanh chóng chiếm được lòng tin của người tiêu dùng nhờ vào việc kết hợp giữa các thành phần thiên nhiên và công nghệ hiện đại.', NULL, 't', '2026-03-06 15:04:07.27', '2026-03-07 10:06:46.137', '491bad73-2031-4362-b4d1-e72a037d0ed9');

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
INSERT INTO "public"."cart_items" VALUES ('10acda0b-88b2-42aa-8c5a-59072f8d0b25', '463cf7ef-dc9d-42ed-a452-b09c75664118', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 2, '2026-03-28 10:08:01.081', '2026-03-28 10:08:06.116');
INSERT INTO "public"."cart_items" VALUES ('5dd20288-3310-4ab7-a90e-01fed3ee2f3f', '6a11a171-e7a6-4eed-88d0-29bf7b38ee72', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'c1284bd1-507f-4e54-9e00-52d80295d31c', 1, '2026-03-28 10:12:26.081', '2026-03-28 10:12:26.081');
INSERT INTO "public"."cart_items" VALUES ('d2d2ca42-b534-4f2f-847d-6eb801a75c34', '6a11a171-e7a6-4eed-88d0-29bf7b38ee72', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '804bd14c-c2bf-45ee-8ffe-73642ae69076', 1, '2026-03-28 14:53:34.634', '2026-03-28 14:53:34.634');
INSERT INTO "public"."cart_items" VALUES ('ec09a63c-5748-4496-8b10-b8dfd4b14ca3', '463cf7ef-dc9d-42ed-a452-b09c75664118', 'f3f7b181-034e-4e28-846e-0a14ac37a821', 'a6334c84-e558-418d-9e1a-3aab6ef68f2d', 1, '2026-03-28 15:17:15.782', '2026-03-28 15:17:15.782');
INSERT INTO "public"."cart_items" VALUES ('6acd006a-8b35-469a-9359-033ee8996c1c', '463cf7ef-dc9d-42ed-a452-b09c75664118', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '4f2c1c1b-7a25-420a-b239-ab90002503a2', 1, '2026-03-28 16:10:19.806', '2026-03-28 16:10:19.806');

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
INSERT INTO "public"."carts" VALUES ('463cf7ef-dc9d-42ed-a452-b09c75664118', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '2026-02-28 18:47:24.66', '2026-02-28 18:47:24.66');
INSERT INTO "public"."carts" VALUES ('6a11a171-e7a6-4eed-88d0-29bf7b38ee72', '2a36312f-f039-4e10-8346-44189bf87362', '2026-03-10 13:50:48.789', '2026-03-10 13:50:48.789');

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
INSERT INTO "public"."categories" VALUES ('1c7e487b-4c22-4e87-9f8a-53a626a1da8b', 'Sản phẩm mới', 'san-pham-moi', 'Sản phẩm mới', NULL, 't', 0, '2025-11-20 16:27:59.256', '2025-11-20 16:27:59.256', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 'Thương hiệu', 'thuong-hieu', 'Các thương hiệu mỹ phẩm', NULL, 't', -1, '2025-11-20 11:42:49.357', '2025-11-20 11:42:49.357', NULL, 'CATEGORY', NULL);
INSERT INTO "public"."categories" VALUES ('b8f869d0-ff9e-4b2b-9166-a4f0ec743c38', 'Brand BANILA CO', 'brand-banila-co', NULL, '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2025-12-15 11:25:51.838', '2025-12-15 11:25:51.838', NULL, 'BRAND', '7931cc87-0c28-46a3-b2d0-4f073e0d8cd4');
INSERT INTO "public"."categories" VALUES ('7540b59a-d659-42d6-8663-2e8249451a00', 'amuse', 'amuse', 'amuse', '0b5bf4d6-7af2-4e0f-94fb-8383ce06f33c', 't', 0, '2026-03-06 14:18:37.707', '2026-03-06 15:07:37.969', '6cbc59f0-8f6a-4e44-a69b-3f008a56c6f1', 'BRAND', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25');

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
INSERT INTO "public"."coupons" VALUES ('e62e587d-19bf-49ed-a1b7-340da021e3bf', 'WELCOME10', 'PERCENTAGE', 10.00, 200000.00, 50000.00, 100, 0, '2025-01-01 00:00:00', '2026-03-31 23:59:59', 't', '2026-03-16 19:10:26.063', '2026-03-16 19:10:26.063');
INSERT INTO "public"."coupons" VALUES ('472aa2ca-bd9f-42dc-a6ea-67e4bd216936', 'LINGDETHUONG', 'FIXED', 36000.00, 100000.00, NULL, 36, 0, '2026-03-19 00:00:00', '2026-04-18 00:00:00', 't', '2026-03-19 07:50:41.578', '2026-03-19 07:50:41.578');
INSERT INTO "public"."coupons" VALUES ('5ba55801-dd9f-463d-95b3-2f86763f9e7d', 'LINGTHAINGUYEN', 'PERCENTAGE', 10.00, 100000.00, 10000.00, 1, 0, '2026-03-19 00:00:00', '2026-04-18 00:00:00', 't', '2026-03-19 07:51:44.429', '2026-03-19 07:53:02.454');

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
INSERT INTO "public"."flash_sale_products" VALUES ('eb1d7782-36d4-42fc-a7d6-8f1a04f4257a', 'b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 120000.00, 150000.00, 100, 2, 2, 0, 't', '2026-03-20 07:52:54.188', '2026-03-28 05:20:13.106');

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
INSERT INTO "public"."flash_sales" VALUES ('b8c32f86-75ed-4339-9321-d8abbbd2dda2', 'sale 26-50', '65+6+56+56+5+', 'sale-26-5', NULL, '2026-03-15 21:22:00', '2027-07-09 09:22:00', 'ACTIVE', 't', 0, '2026-03-19 15:24:51.708', '2026-03-20 07:57:03.651');

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
INSERT INTO "public"."media" VALUES ('4ca3ddff-7026-47a5-a48c-d314d9862d9d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6bbe0616-da7f-404f-8fdb-b4193d5340aa_1768575060781_42bdd28c.webp?wrap=0', 'uploads/public/products/images/6bbe0616-da7f-404f-8fdb-b4193d5340aa_1768575060781_42bdd28c.webp', '6bbe0616-da7f-404f-8fdb-b4193d5340aa.webp', 'image/webp', 34572, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:51:01.378', '2026-01-16 14:51:01.378');
INSERT INTO "public"."media" VALUES ('ba554aab-bac5-4fd0-afa8-13e9370ecda2', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/80f5b227-afbe-4758-bacc-4fb30f990aca_1768575108286_5002c051.webp?wrap=0', 'uploads/public/products/images/80f5b227-afbe-4758-bacc-4fb30f990aca_1768575108286_5002c051.webp', '80f5b227-afbe-4758-bacc-4fb30f990aca.webp', 'image/webp', 27612, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:51:48.667', '2026-01-16 14:51:48.667');
INSERT INTO "public"."media" VALUES ('3bfc4091-8470-42f8-8bc7-516374f0079d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/623f1866-8508-4694-83ef-ec42fe199c3f_1768575116998_3940a001.webp?wrap=0', 'uploads/public/products/images/623f1866-8508-4694-83ef-ec42fe199c3f_1768575116998_3940a001.webp', '623f1866-8508-4694-83ef-ec42fe199c3f.webp', 'image/webp', 67536, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:51:57.391', '2026-01-16 14:51:57.391');
INSERT INTO "public"."media" VALUES ('43fec89f-1a85-4474-ba07-98d32427f543', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/6793d560-b196-473d-a314-64261ffd44e9_1768575261440_571fe1c7.webp?wrap=0', 'uploads/public/products/images/6793d560-b196-473d-a314-64261ffd44e9_1768575261440_571fe1c7.webp', '6793d560-b196-473d-a314-64261ffd44e9.webp', 'image/webp', 90832, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:54:21.995', '2026-01-16 14:54:21.995');
INSERT INTO "public"."media" VALUES ('c5a64d7f-1538-4ade-a96c-80495edae6f1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/443f1a00-a0f5-481c-a7db-3acaf19e59a8_1768575276418_01cc294e.webp?wrap=0', 'uploads/public/products/images/443f1a00-a0f5-481c-a7db-3acaf19e59a8_1768575276418_01cc294e.webp', '443f1a00-a0f5-481c-a7db-3acaf19e59a8.webp', 'image/webp', 62262, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:54:36.781', '2026-01-16 14:54:36.781');
INSERT INTO "public"."media" VALUES ('f2617e59-bff0-4aa0-868a-66e04bf6794e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/8d3e788e-774f-4e23-97b0-d3cff075c309_1768575298297_2d8d95a4.webp?wrap=0', 'uploads/public/products/images/8d3e788e-774f-4e23-97b0-d3cff075c309_1768575298297_2d8d95a4.webp', '8d3e788e-774f-4e23-97b0-d3cff075c309.webp', 'image/webp', 49644, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 14:54:58.685', '2026-01-16 14:54:58.685');
INSERT INTO "public"."media" VALUES ('c4892fcf-b2ea-4e14-98de-0d1bbd85b065', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/895f53ab-79a1-4fdc-bf0a-8955499a2231_1768581424976_2d308fd3.webp?wrap=0', 'uploads/public/products/images/895f53ab-79a1-4fdc-bf0a-8955499a2231_1768581424976_2d308fd3.webp', '895f53ab-79a1-4fdc-bf0a-8955499a2231.webp', 'image/webp', 25370, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:37:05.634', '2026-01-16 16:37:05.634');
INSERT INTO "public"."media" VALUES ('31373689-5eb4-4356-9df5-bb535173fd1c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/06778f31-b3bc-42e8-8962-e5d277fd3e6d_1768582243151_d1b46c28.webp?wrap=0', 'uploads/public/products/images/06778f31-b3bc-42e8-8962-e5d277fd3e6d_1768582243151_d1b46c28.webp', '06778f31-b3bc-42e8-8962-e5d277fd3e6d.webp', 'image/webp', 29948, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:50:43.7', '2026-01-16 16:50:43.7');
INSERT INTO "public"."media" VALUES ('0fb7a1fa-ab9b-459b-a3f2-c6ba7f54b548', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/9c09befe-e91d-4baa-8e5b-bc391df34884_1768582348686_ac695b88.webp?wrap=0', 'uploads/public/products/images/9c09befe-e91d-4baa-8e5b-bc391df34884_1768582348686_ac695b88.webp', '9c09befe-e91d-4baa-8e5b-bc391df34884.webp', 'image/webp', 29600, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:52:29.287', '2026-01-16 16:52:29.287');
INSERT INTO "public"."media" VALUES ('6b98ccf3-38bc-4ff8-9ffd-4956d893c820', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/81ca6f2f-4e9d-48d5-9a61-e0307989984f_1768582526837_996ba74b.webp?wrap=0', 'uploads/public/products/images/81ca6f2f-4e9d-48d5-9a61-e0307989984f_1768582526837_996ba74b.webp', '81ca6f2f-4e9d-48d5-9a61-e0307989984f.webp', 'image/webp', 29936, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:55:27.459', '2026-01-16 16:55:27.459');
INSERT INTO "public"."media" VALUES ('8ebebdfa-0db0-4118-81cf-bc48534eaa3d', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/b524c0ed-9855-4eef-ad44-18d28dd1f033_1768582618218_6976775f.webp?wrap=0', 'uploads/public/products/images/b524c0ed-9855-4eef-ad44-18d28dd1f033_1768582618218_6976775f.webp', 'b524c0ed-9855-4eef-ad44-18d28dd1f033.webp', 'image/webp', 30376, 'PRODUCT_IMAGE', NULL, 'f', '2026-01-16 16:56:58.848', '2026-01-16 16:56:58.848');
INSERT INTO "public"."media" VALUES ('775e73e3-c1d3-4d69-971e-143980ffec74', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/ahc_logo_1763652535912_b453a9fa.jpg?wrap=0', 'uploads/public/brands/ahc_logo_1763652535912_b453a9fa.jpg', 'ahc_logo.jpg', 'image/jpeg', 157174, 'BRAND_LOGO', NULL, 'f', '2025-11-20 15:28:56.523', '2025-11-20 15:28:56.523');
INSERT INTO "public"."media" VALUES ('810ae089-deb6-47c1-831e-176e8eb564a1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772130786989_301df642.jpg?wrap=0', 'uploads/public/avatars/avatar_1772130786989_301df642.jpg', 'avatar.jpg', 'image/jpeg', 7770, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 18:33:07.6', '2026-02-26 18:33:07.6');
INSERT INTO "public"."media" VALUES ('1f8976c7-2119-428c-bb0d-1506b9b47f31', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772132507177_3f2bcdb3.jpg?wrap=0', 'uploads/public/avatars/avatar_1772132507177_3f2bcdb3.jpg', 'avatar.jpg', 'image/jpeg', 7770, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:01:48.003', '2026-02-26 19:01:48.003');
INSERT INTO "public"."media" VALUES ('53d14074-5e0e-4278-8e72-ea0eacf577d5', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772132524298_03798207.jpg?wrap=0', 'uploads/public/avatars/avatar_1772132524298_03798207.jpg', 'avatar.jpg', 'image/jpeg', 10188, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:02:04.981', '2026-02-26 19:02:04.981');
INSERT INTO "public"."media" VALUES ('4244262a-35a0-48ca-98b9-0da089193399', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772132719725_c768327b.jpg?wrap=0', 'uploads/public/avatars/avatar_1772132719725_c768327b.jpg', 'avatar.jpg', 'image/jpeg', 262931, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:05:20.385', '2026-02-26 19:05:20.385');
INSERT INTO "public"."media" VALUES ('510ac388-76b1-4158-954d-ef3e7753d31a', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/avatar_1772133022827_9f956f4c.jpg?wrap=0', 'uploads/public/avatars/avatar_1772133022827_9f956f4c.jpg', 'avatar.jpg', 'image/jpeg', 265031, 'AVATAR', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-02-26 19:10:24.174', '2026-02-26 19:10:24.174');
INSERT INTO "public"."media" VALUES ('408744ad-04cc-43ae-ab05-6ed93523a2ae', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772271746153_1c8097fe.jpg', 'uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772271746153_1c8097fe.jpg', '626841724_2413912335695335_7804545622247521577_n.jpg', 'image/jpeg', 234292, 'PRODUCT_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-02-28 09:42:26.889', '2026-02-28 09:42:26.889');
INSERT INTO "public"."media" VALUES ('ee884c15-44f0-403e-b068-d3db39924a19', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/1368890_1772272114187_3e60f911.jpeg?wrap=0', 'uploads/public/products/images/1368890_1772272114187_3e60f911.jpeg', '1368890.jpeg', 'image/jpeg', 428995, 'PRODUCT_IMAGE', NULL, 'f', '2026-02-28 09:48:34.9', '2026-02-28 09:48:34.9');
INSERT INTO "public"."media" VALUES ('6b6873d8-68bf-46a0-bc43-c25f0e03a125', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772272399151_9a1795c2.jpg?wrap=0', 'uploads/public/products/images/626841724_2413912335695335_7804545622247521577_n_1772272399151_9a1795c2.jpg', '626841724_2413912335695335_7804545622247521577_n.jpg', 'image/jpeg', 234292, 'PRODUCT_IMAGE', NULL, 'f', '2026-02-28 09:53:19.603', '2026-02-28 09:53:19.603');
INSERT INTO "public"."media" VALUES ('cafaa4d2-2469-44f2-bacc-25fef84d3224', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772525128560_8144ee95.webp?wrap=0', 'uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772525128560_8144ee95.webp', '764378ac-a400-481e-bbf1-c374ec9b5764.webp', 'image/webp', 9744, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-03 08:05:29.052', '2026-03-03 08:05:29.052');
INSERT INTO "public"."media" VALUES ('64934987-a102-44f6-9e23-4892a88b4171', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/A__nh_ma__n_hi__nh_2026-01-28_lu__c_19.26.33_1772525292267_566c7c2a.png?wrap=0', 'uploads/public/products/images/A__nh_ma__n_hi__nh_2026-01-28_lu__c_19.26.33_1772525292267_566c7c2a.png', 'AÌnh maÌn hiÌnh 2026-01-28 luÌc 19.26.33.png', 'image/png', 1139368, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-03 08:08:12.906', '2026-03-03 08:08:12.906');
INSERT INTO "public"."media" VALUES ('43299dec-ccc3-4e38-aee3-77c9a3a65d85', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/616397375_2307700436383076_7581925367816276636_n_1772525305393_d2de7690.jpg?wrap=0', 'uploads/public/products/images/616397375_2307700436383076_7581925367816276636_n_1772525305393_d2de7690.jpg', '616397375_2307700436383076_7581925367816276636_n.jpg', 'image/jpeg', 1094606, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-03 08:08:26.062', '2026-03-03 08:08:26.062');
INSERT INTO "public"."media" VALUES ('b2f7d0f5-dc37-4ded-aacb-ae822ce9ec7e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772603652310_14c5ec30.webp?wrap=0', 'uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772603652310_14c5ec30.webp', '764378ac-a400-481e-bbf1-c374ec9b5764.webp', 'image/webp', 9744, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 05:54:12.819', '2026-03-04 05:54:12.819');
INSERT INTO "public"."media" VALUES ('caca0b7b-b4a8-4557-a2f7-63b789275d16', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/1368890_1772613504022_67ba7b0a.jpeg?wrap=0', 'uploads/public/products/images/1368890_1772613504022_67ba7b0a.jpeg', '1368890.jpeg', 'image/jpeg', 428995, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 08:38:24.49', '2026-03-04 08:38:24.49');
INSERT INTO "public"."media" VALUES ('f54aa404-5d93-4915-bbdb-cbb11612c5e8', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772614819013_16d47751.webp?wrap=0', 'uploads/public/products/images/764378ac-a400-481e-bbf1-c374ec9b5764_1772614819013_16d47751.webp', '764378ac-a400-481e-bbf1-c374ec9b5764.webp', 'image/webp', 9744, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 09:00:19.682', '2026-03-04 09:00:19.682');
INSERT INTO "public"."media" VALUES ('879d7d92-3e6f-4c33-8fac-b1a52a9d8745', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/9a27aa617cb9fc5ff3216e84a68e5fc3_1772617009156_09cc7cfa.jpg?wrap=0', 'uploads/public/products/images/9a27aa617cb9fc5ff3216e84a68e5fc3_1772617009156_09cc7cfa.jpg', '9a27aa617cb9fc5ff3216e84a68e5fc3.jpg', 'image/jpeg', 144986, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-04 09:36:49.662', '2026-03-04 09:36:49.662');
INSERT INTO "public"."media" VALUES ('8a6ede51-d96a-491b-a89c-bc7a19109de1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/IMG_20251025_171143_1772698977480_7d01dcd7.png?wrap=0', 'uploads/public/products/images/IMG_20251025_171143_1772698977480_7d01dcd7.png', 'IMG_20251025_171143.png', 'image/png', 1923555, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-05 08:22:58.926', '2026-03-05 08:22:58.926');
INSERT INTO "public"."media" VALUES ('53160ffb-e0e6-4362-a96a-524e0ef658a0', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/images_1772698991945_88db7803.jpg?wrap=0', 'uploads/public/products/images/images_1772698991945_88db7803.jpg', 'images.jpg', 'image/jpeg', 294520, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-05 08:23:12.361', '2026-03-05 08:23:12.361');
INSERT INTO "public"."media" VALUES ('c419e524-30f1-49d9-b259-93545c2f85d0', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772776394232_b760ce18.webp?wrap=0', 'uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772776394232_b760ce18.webp', '42e25a05-e70e-4e54-a4d7-391dd31583ad.webp', 'image/webp', 21936, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-06 05:53:14.7', '2026-03-06 05:53:14.7');
INSERT INTO "public"."media" VALUES ('a73f450e-d690-49b6-8420-07902b16da34', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772805496446_c625476a.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772805496446_c625476a.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b.webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 13:58:16.96', '2026-03-06 13:58:16.96');
INSERT INTO "public"."media" VALUES ('676991a0-132c-4798-a9ac-5f831a89db79', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772805559701_1c4cca05.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772805559701_1c4cca05.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b (1).webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 13:59:20.224', '2026-03-06 13:59:20.224');
INSERT INTO "public"."media" VALUES ('4c84c9c7-84af-4d68-82b9-3e1d9af3ae78', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772805707689_ba2cbcdf.webp?wrap=0', 'uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772805707689_ba2cbcdf.webp', '42e25a05-e70e-4e54-a4d7-391dd31583ad.webp', 'image/webp', 21936, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-06 14:01:48.101', '2026-03-06 14:01:48.101');
INSERT INTO "public"."media" VALUES ('6cbc59f0-8f6a-4e44-a69b-3f008a56c6f1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772806717047_bd0dd5b0.webp?wrap=0', 'uploads/public/categories/42e25a05-e70e-4e54-a4d7-391dd31583ad_1772806717047_bd0dd5b0.webp', '42e25a05-e70e-4e54-a4d7-391dd31583ad.webp', 'image/webp', 21936, 'CATEGORY_IMAGE', NULL, 'f', '2026-03-06 14:18:37.692', '2026-03-06 14:18:37.692');
INSERT INTO "public"."media" VALUES ('491bad73-2031-4362-b4d1-e72a037d0ed9', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/brands/vn-11134216-7ras8-m3yoigp7pgi7d8_tn_1772809446754_4b2fcc61.jpg?wrap=0', 'uploads/public/brands/vn-11134216-7ras8-m3yoigp7pgi7d8_tn_1772809446754_4b2fcc61.jpg', 'vn-11134216-7ras8-m3yoigp7pgi7d8_tn.jpg', 'image/jpeg', 6495, 'BRAND_LOGO', NULL, 'f', '2026-03-06 15:04:07.223', '2026-03-06 15:04:07.223');
INSERT INTO "public"."media" VALUES ('176384a8-fafc-4522-a9e5-f256f215c338', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772809793732_decac314.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b_1772809793732_decac314.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b.webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 15:09:54.149', '2026-03-06 15:09:54.149');
INSERT INTO "public"."media" VALUES ('7494920f-d885-47f9-8e45-30c30f0c531c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a9_1772810057992_5af04eb9.jpg?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a9_1772810057992_5af04eb9.jpg', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a9.jpg', 'image/jpeg', 91709, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 15:14:18.39', '2026-03-06 15:14:18.39');
INSERT INTO "public"."media" VALUES ('41af639e-ab67-4468-8ac0-8e899f1e485e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772810333574_ecf146e3.webp?wrap=0', 'uploads/public/products/images/bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b__1__1772810333574_ecf146e3.webp', 'bf8a3fb7-7c2b-432d-ac5b-8dd525a95c1b (1).webp', 'image/webp', 31152, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-06 15:18:54.069', '2026-03-06 15:18:54.069');
INSERT INTO "public"."media" VALUES ('d765833f-3edb-47b4-bcd6-2c0af71d4bc3', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773651246244_eb217f4e.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773651246244_eb217f4e.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 08:54:07.667', '2026-03-16 08:54:07.667');
INSERT INTO "public"."media" VALUES ('9f3abdbd-bd03-4e32-9b6b-41b7107868df', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773651382559_abb88d15.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773651382559_abb88d15.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 08:56:24.253', '2026-03-16 08:56:24.253');
INSERT INTO "public"."media" VALUES ('d0bc407f-f7dc-4fb8-b414-ad4e5f383086', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773651545788_ea9c25e6.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773651545788_ea9c25e6.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 08:59:06.382', '2026-03-16 08:59:06.382');
INSERT INTO "public"."media" VALUES ('3a84f7f1-965b-49f9-a369-f969bf79d8bd', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652112557_8f0dc0c9.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652112557_8f0dc0c9.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:08:33.831', '2026-03-16 09:08:33.831');
INSERT INTO "public"."media" VALUES ('4fa17852-82f9-402f-8e80-535304ada5c4', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652384796_d24a1c73.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652384796_d24a1c73.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:13:05.47', '2026-03-16 09:13:05.47');
INSERT INTO "public"."media" VALUES ('dddf1a70-67a3-44ea-84f5-93c465647995', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/do_shisha_1773731182268_ffd5495a.webp?wrap=0', 'uploads/public/banners/images/do_shisha_1773731182268_ffd5495a.webp', 'do_shisha.webp', 'image/webp', 262442, 'BANNER_IMAGE', NULL, 'f', '2026-03-17 07:06:22.797', '2026-03-17 07:06:22.797');
INSERT INTO "public"."media" VALUES ('9020bce4-f347-4dce-bc23-aa699a903f7e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652275397_874bc983.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652275397_874bc983.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:11:16.01', '2026-03-16 09:11:16.01');
INSERT INTO "public"."media" VALUES ('c7344039-1504-4ad6-ae6a-ca8cd5f60b5c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/channels4_profile_1773652203632_d61e5a0f.jpg?wrap=0', 'uploads/public/banners/images/channels4_profile_1773652203632_d61e5a0f.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'BANNER_IMAGE', NULL, 'f', '2026-03-16 09:10:06.063', '2026-03-16 09:10:06.063');
INSERT INTO "public"."media" VALUES ('f5125a9e-c480-4802-a782-480b00138fca', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/image_background_screenshot_for_stack_1773739698722_93d7672a.png?wrap=0', 'uploads/public/banners/images/image_background_screenshot_for_stack_1773739698722_93d7672a.png', 'image_background_screenshot_for_stack.png', 'image/png', 1950277, 'BANNER_IMAGE', NULL, 'f', '2026-03-17 09:28:20.357', '2026-03-17 09:28:20.357');
INSERT INTO "public"."media" VALUES ('f36e928a-b6c8-4f21-b6cf-0f67bb59edeb', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/avatars/438293719_423347727110950_4655747533506456618_n__2__1774011858704_9459682f.jpg?wrap=0', 'uploads/public/avatars/438293719_423347727110950_4655747533506456618_n__2__1774011858704_9459682f.jpg', '438293719_423347727110950_4655747533506456618_n (2).jpg', 'image/jpeg', 465055, 'AVATAR', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-20 13:04:19.483', '2026-03-20 13:04:19.483');
INSERT INTO "public"."media" VALUES ('5f27fafb-436e-4a1e-9460-d1bedf308ee6', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/channels4_profile_1774183121445_3e20ae5e.jpg?wrap=0', 'uploads/public/general/images/channels4_profile_1774183121445_3e20ae5e.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'GENERAL_IMAGE', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-03-22 12:38:43.339', '2026-03-22 12:38:43.339');
INSERT INTO "public"."media" VALUES ('d7082e4b-d8fc-4682-8e94-611dd29b2601', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/channels4_profile_1774183915010_58af2ac5.jpg?wrap=0', 'uploads/public/general/images/channels4_profile_1774183915010_58af2ac5.jpg', 'channels4_profile.jpg', 'image/jpeg', 39727, 'GENERAL_IMAGE', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'f', '2026-03-22 12:51:55.72', '2026-03-22 12:51:55.72');
INSERT INTO "public"."media" VALUES ('b48375bc-a6a2-40f2-802e-156946b5fe7c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/69a40152405e6_1774187756879_84efc279.jpg?wrap=0', 'uploads/public/general/images/69a40152405e6_1774187756879_84efc279.jpg', '69a40152405e6.jpg', 'image/jpeg', 433274, 'GENERAL_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-22 13:55:57.391', '2026-03-22 13:55:57.391');
INSERT INTO "public"."media" VALUES ('95a66b86-d23d-4a1d-83b8-dad6b443ae5a', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/69a40152405e6_1774187788258_4b60a188.jpg?wrap=0', 'uploads/public/general/images/69a40152405e6_1774187788258_4b60a188.jpg', '69a40152405e6.jpg', 'image/jpeg', 433274, 'GENERAL_IMAGE', '2a36312f-f039-4e10-8346-44189bf87362', 'f', '2026-03-22 13:56:28.626', '2026-03-22 13:56:28.626');
INSERT INTO "public"."media" VALUES ('2dac9985-4763-4b8c-b13c-cae32dd9f933', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/banners/images/289a71d7-d708-43cd-92ee-7a16ccf4a561_1774518380741_5e9b8886.webp?wrap=0', 'uploads/public/banners/images/289a71d7-d708-43cd-92ee-7a16ccf4a561_1774518380741_5e9b8886.webp', '289a71d7-d708-43cd-92ee-7a16ccf4a561.webp', 'image/webp', 127074, 'BANNER_IMAGE', NULL, 'f', '2026-03-26 09:46:22.821', '2026-03-26 09:46:22.821');
INSERT INTO "public"."media" VALUES ('34c09faa-34fa-4c08-a113-29e75ee29a0e', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/pngtree-cute-cow-cartoon-vector-png-image_5057875_1774536770321_0c42cf32.jpg?wrap=0', 'uploads/public/products/images/pngtree-cute-cow-cartoon-vector-png-image_5057875_1774536770321_0c42cf32.jpg', 'pngtree-cute-cow-cartoon-vector-png-image_5057875.jpg', 'image/jpeg', 89440, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-26 14:52:50.82', '2026-03-26 14:52:50.82');
INSERT INTO "public"."media" VALUES ('701952c8-2222-4b54-87dc-de951f1d77d0', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b_1774685027301_3a36aac5.webp?wrap=0', 'uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b_1774685027301_3a36aac5.webp', '4cc88c2c-1049-4407-8091-e42394452b5b.webp', 'image/webp', 102858, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:03:47.836', '2026-03-28 08:03:47.836');
INSERT INTO "public"."media" VALUES ('f3daa491-cc07-4988-8a1f-57149db13ddb', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b__1__1774685027420_b5a74439.webp?wrap=0', 'uploads/public/products/images/4cc88c2c-1049-4407-8091-e42394452b5b__1__1774685027420_b5a74439.webp', '4cc88c2c-1049-4407-8091-e42394452b5b (1).webp', 'image/webp', 102858, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:03:47.833', '2026-03-28 08:03:47.833');
INSERT INTO "public"."media" VALUES ('e585624d-0d42-42f5-a5b1-5118c74ba3fe', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774685027217_65758d2e.webp?wrap=0', 'uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774685027217_65758d2e.webp', 'e7cd2392-0f50-485c-9fad-b560875d2e9f.webp', 'image/webp', 46364, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:03:47.909', '2026-03-28 08:03:47.909');
INSERT INTO "public"."media" VALUES ('42b757f8-257f-4cf7-b130-63b8a19dbf2f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/1312e610-8b26-4408-bc8e-4a9cb49b0e96_1774685468143_7e900bf0.webp?wrap=0', 'uploads/public/products/images/1312e610-8b26-4408-bc8e-4a9cb49b0e96_1774685468143_7e900bf0.webp', '1312e610-8b26-4408-bc8e-4a9cb49b0e96.webp', 'image/webp', 36234, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:11:08.608', '2026-03-28 08:11:08.608');
INSERT INTO "public"."media" VALUES ('825ec6a2-1c64-4549-b775-4eec4f46002f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/ddfac2c2-87cc-4214-b642-2775a6891fc1_1774686170267_48213e0f.webp?wrap=0', 'uploads/public/products/images/ddfac2c2-87cc-4214-b642-2775a6891fc1_1774686170267_48213e0f.webp', 'ddfac2c2-87cc-4214-b642-2775a6891fc1.webp', 'image/webp', 36900, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:22:50.734', '2026-03-28 08:22:50.734');
INSERT INTO "public"."media" VALUES ('807b2fb6-7dee-44c6-a7b6-ea6afd00c922', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/51e65aef-c5fa-4ab9-8776-534426997123_1774686294846_2af96b33.webp?wrap=0', 'uploads/public/products/images/51e65aef-c5fa-4ab9-8776-534426997123_1774686294846_2af96b33.webp', '51e65aef-c5fa-4ab9-8776-534426997123.webp', 'image/webp', 39488, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:24:55.225', '2026-03-28 08:24:55.225');
INSERT INTO "public"."media" VALUES ('c10ae4de-2ad3-47da-9702-3334a889d74f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/8cd91ebf-d6dc-4a62-99aa-e41c21fca30b_1774686445320_27fea8f7.webp?wrap=0', 'uploads/public/products/images/8cd91ebf-d6dc-4a62-99aa-e41c21fca30b_1774686445320_27fea8f7.webp', '8cd91ebf-d6dc-4a62-99aa-e41c21fca30b.webp', 'image/webp', 36348, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:27:25.767', '2026-03-28 08:27:25.767');
INSERT INTO "public"."media" VALUES ('51ad43ba-65b1-49f9-bccb-4ab139915b1c', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/7c61053d-6b55-4f52-9d87-437e4c0c61d5_1774687098873_1489e0b8.webp?wrap=0', 'uploads/public/products/images/7c61053d-6b55-4f52-9d87-437e4c0c61d5_1774687098873_1489e0b8.webp', '7c61053d-6b55-4f52-9d87-437e4c0c61d5.webp', 'image/webp', 34988, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:38:19.24', '2026-03-28 08:38:19.24');
INSERT INTO "public"."media" VALUES ('8890c5f8-2a48-48e9-a77a-10cf1ec59e8b', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/9ddc33fc-799e-43c9-92ac-b565431d908e_1774687192004_3c83cc39.webp?wrap=0', 'uploads/public/products/images/9ddc33fc-799e-43c9-92ac-b565431d908e_1774687192004_3c83cc39.webp', '9ddc33fc-799e-43c9-92ac-b565431d908e.webp', 'image/webp', 34838, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:39:52.393', '2026-03-28 08:39:52.393');
INSERT INTO "public"."media" VALUES ('e50a9f7a-ac92-4a84-a8bb-82967c41e553', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/d8208594-31a9-48e9-a97b-c5075b63ebe6_1774687829965_e6cc9ef8.webp?wrap=0', 'uploads/public/products/images/d8208594-31a9-48e9-a97b-c5075b63ebe6_1774687829965_e6cc9ef8.webp', 'd8208594-31a9-48e9-a97b-c5075b63ebe6.webp', 'image/webp', 36792, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:50:31.604', '2026-03-28 08:50:31.604');
INSERT INTO "public"."media" VALUES ('806a3ce3-2086-41b4-8705-d753fab552e1', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/f3a96cdb-eb16-421d-b43a-59a4d8a14dd7_1774687899160_60c5a2a8.webp?wrap=0', 'uploads/public/products/images/f3a96cdb-eb16-421d-b43a-59a4d8a14dd7_1774687899160_60c5a2a8.webp', 'f3a96cdb-eb16-421d-b43a-59a4d8a14dd7.webp', 'image/webp', 35900, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:51:40.252', '2026-03-28 08:51:40.252');
INSERT INTO "public"."media" VALUES ('8cbb787c-eba8-4032-98bb-df2e71e41581', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/796175fb-0559-4215-a4df-60fa9a76edc0_1774687975614_50f1b55d.webp?wrap=0', 'uploads/public/products/images/796175fb-0559-4215-a4df-60fa9a76edc0_1774687975614_50f1b55d.webp', '796175fb-0559-4215-a4df-60fa9a76edc0.webp', 'image/webp', 37230, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:52:56.695', '2026-03-28 08:52:56.695');
INSERT INTO "public"."media" VALUES ('43c4e910-918a-4f94-b6d8-e63a3d3c0f3f', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/c1314b9a-ff75-4f6d-a6dc-863363a73648_1774688035931_714e71fb.webp?wrap=0', 'uploads/public/products/images/c1314b9a-ff75-4f6d-a6dc-863363a73648_1774688035931_714e71fb.webp', 'c1314b9a-ff75-4f6d-a6dc-863363a73648.webp', 'image/webp', 35370, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:53:56.98', '2026-03-28 08:53:56.98');
INSERT INTO "public"."media" VALUES ('c06b081a-ae35-4e75-a914-4de431a9f129', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774688345020_679cb33f.webp?wrap=0', 'uploads/public/products/images/e7cd2392-0f50-485c-9fad-b560875d2e9f_1774688345020_679cb33f.webp', 'e7cd2392-0f50-485c-9fad-b560875d2e9f.webp', 'image/webp', 46364, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 08:59:06.224', '2026-03-28 08:59:06.224');
INSERT INTO "public"."media" VALUES ('d0d91f28-86c4-414c-ae6e-66f2d4a9523b', 'https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/products/images/236fc58c-8599-40f5-ae93-50bb246fa84e_1774688429971_8b5afa68.webp?wrap=0', 'uploads/public/products/images/236fc58c-8599-40f5-ae93-50bb246fa84e_1774688429971_8b5afa68.webp', '236fc58c-8599-40f5-ae93-50bb246fa84e.webp', 'image/webp', 90976, 'PRODUCT_IMAGE', NULL, 'f', '2026-03-28 09:00:31.058', '2026-03-28 09:00:31.058');

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
INSERT INTO "public"."order_items" VALUES ('e7f91667-7022-4029-b0cc-c4070cc9f00d', '02a246ae-a28b-402e-bd4c-6af5e0fe4e7f', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'SKU-001-RED', 120000.00, 1, 120000.00, '2026-03-27 04:08:07.29');
INSERT INTO "public"."order_items" VALUES ('19d5604f-8c78-4a63-99c1-c062c1f39884', '0906e456-fc12-4411-97b2-9ef7654447c5', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '1db18ed7-865b-4d69-87b8-c88656eff292', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '79102357', 646400.00, 1, 646400.00, '2026-03-27 05:17:56.321');
INSERT INTO "public"."order_items" VALUES ('e9bb4408-b2ba-408f-ab85-7921393136b1', 'c3a5d834-8bff-4d7f-90b1-a31269ee57dd', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'c876a2fe-40da-4f5c-9ff8-9478c3ecd93e', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '77286589', 646400.00, 2, 1292800.00, '2026-03-27 16:24:56.53');
INSERT INTO "public"."order_items" VALUES ('ba53a774-2f00-42b6-9fa1-2e35ffb8e560', 'a6f1dc86-7150-4755-97ee-1504b220417f', 'f387017f-3306-404a-8a15-584a4d3bf7c9', 'd004cc21-a835-4d5f-a949-3bf9db98ccbd', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '95183175', 646400.00, 2, 1292800.00, '2026-03-27 16:36:56.916');
INSERT INTO "public"."order_items" VALUES ('5d2b990a-7d3b-4074-9d57-3512734f6757', '11bcd9c6-3ded-46aa-9b60-d8a2b30be176', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'SKU-001-RED', 120000.00, 2, 240000.00, '2026-03-28 05:20:12.949');

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
INSERT INTO "public"."orders" VALUES ('02a246ae-a28b-402e-bd4c-6af5e0fe4e7f', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0001', 'CANCELLED', 120000.00, 0.00, 0.00, 0.00, 120000.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-03-27 04:08:07.29', '2026-03-27 04:20:22.562');
INSERT INTO "public"."orders" VALUES ('0906e456-fc12-4411-97b2-9ef7654447c5', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0002', 'SHIPPED', 646400.00, 0.00, 0.00, 0.00, 646400.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, '', '2026-03-27 05:17:56.321', '2026-03-27 15:28:46.356');
INSERT INTO "public"."orders" VALUES ('c3a5d834-8bff-4d7f-90b1-a31269ee57dd', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0003', 'CANCELLED', 1292800.00, 0.00, 0.00, 0.00, 1292800.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, 'Đã hủy bởi khách hàng', '2026-03-27 16:24:56.53', '2026-03-27 16:25:19.315');
INSERT INTO "public"."orders" VALUES ('a6f1dc86-7150-4755-97ee-1504b220417f', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'ORD-260327-0004', 'PENDING', 1292800.00, 0.00, 0.00, 0.00, 1292800.00, '2d7a9b06-68a9-4104-8694-8242151a6923', NULL, NULL, NULL, '2026-03-27 16:36:56.916', '2026-03-27 16:36:56.916');
INSERT INTO "public"."orders" VALUES ('11bcd9c6-3ded-46aa-9b60-d8a2b30be176', '2a36312f-f039-4e10-8346-44189bf87362', 'ORD-260328-0001', 'CONFIRMED', 240000.00, 0.00, 0.00, 0.00, 240000.00, '3982c640-31d2-4686-abea-def0f0297cea', NULL, NULL, '', '2026-03-28 05:20:12.949', '2026-03-28 06:37:58.708');

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
INSERT INTO "public"."payments" VALUES ('3003a574-fd1b-43a2-848d-4546b1b68c46', '02a246ae-a28b-402e-bd4c-6af5e0fe4e7f', 'COD', 120000.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 04:08:07.29', '2026-03-27 04:08:07.29');
INSERT INTO "public"."payments" VALUES ('c32b508c-f990-447a-aec1-6ef65793d782', '0906e456-fc12-4411-97b2-9ef7654447c5', 'COD', 646400.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 05:17:56.321', '2026-03-27 05:17:56.321');
INSERT INTO "public"."payments" VALUES ('dac54517-19c6-4ed6-9a1a-87c1b7a2aafa', 'c3a5d834-8bff-4d7f-90b1-a31269ee57dd', 'BANK_TRANSFER', 1292800.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 16:24:56.53', '2026-03-27 16:24:56.53');
INSERT INTO "public"."payments" VALUES ('ed2e8627-59b9-4e0b-be8a-7f0fa3daacd7', 'a6f1dc86-7150-4755-97ee-1504b220417f', 'COD', 1292800.00, 'PENDING', NULL, NULL, NULL, '2026-03-27 16:36:56.916', '2026-03-27 16:36:56.916');
INSERT INTO "public"."payments" VALUES ('9b123174-2487-4a3e-85bf-640208a2d04b', '11bcd9c6-3ded-46aa-9b60-d8a2b30be176', 'COD', 240000.00, 'PENDING', NULL, NULL, NULL, '2026-03-28 05:20:12.949', '2026-03-28 05:20:12.949');

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
INSERT INTO "public"."product_inventory" VALUES ('a55cb5ef-1148-452d-8a7c-7d2252792c1a', 'c1284bd1-507f-4e54-9e00-52d80295d31c', 100, 10, '2026-03-28 08:32:19.222', '2026-03-28 08:32:19.222', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('5d434e9a-eae1-4241-afff-22ad937f051f', '35e1c255-66df-452a-bb90-55944f0225ac', 100, 10, '2026-03-28 08:27:16.342', '2026-03-28 08:32:33.312', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('b902e703-7c10-44cf-b907-06c45676b711', '16d13d2a-fce2-4d21-a72c-9e2cb7a75202', 0, 10, '2025-11-26 20:58:38.476', '2025-11-26 20:58:38.476', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('ceefbd45-1f3c-4d5e-925a-4483f81a7f82', '8caffe21-d0f6-421d-9068-a824440187a8', 0, 10, '2025-11-26 20:23:53.559', '2025-11-26 20:23:53.559', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('68d93a5e-01dd-4acd-8d2c-85f2cc27eb6b', 'ebaf26c3-df7d-4b74-9f7e-302676d919fb', 1000, 10, '2026-03-28 08:34:59.317', '2026-03-28 08:34:59.317', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('6d76d7b9-b61a-4649-957c-433ce85c6f1f', 'c54735fd-2658-4c3a-86d6-afd8516c5bd5', 1000, 10, '2026-03-28 08:38:01.016', '2026-03-28 08:38:01.016', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('29023227-0932-47cc-aca8-cfcc164dc13a', '4f2c1c1b-7a25-420a-b239-ab90002503a2', 0, 10, '2025-11-26 20:04:58.042', '2025-11-26 20:04:58.042', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('1af6ac81-54ed-47fe-b2e8-a589242b0a18', '8aa2f5bf-71c4-43da-b298-310133aad55d', 100, 10, '2026-03-28 08:39:22.605', '2026-03-28 08:39:22.605', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('f60b8205-f343-4fcb-ae81-d0af3a4e98e1', '804bd14c-c2bf-45ee-8ffe-73642ae69076', 100, 10, '2026-03-28 08:45:56.193', '2026-03-28 08:45:56.193', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('ba22549d-f9b9-4bd3-b490-9f2344456c04', 'a6334c84-e558-418d-9e1a-3aab6ef68f2d', 100, 10, '2026-03-28 08:51:18.956', '2026-03-28 08:51:18.956', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('a219d8e2-6136-4a81-a271-38baaf594d29', '7022882b-0227-4ac0-9664-ab942692394c', 100, 10, '2026-03-28 08:52:40.463', '2026-03-28 08:52:40.463', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('20d519d0-7324-4f7c-9cfa-a52c1e965283', '67344a6a-9a15-4aea-8b89-c19152778212', 100, 10, '2026-03-28 08:53:36.265', '2026-03-28 08:53:36.265', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('0ac356db-07e5-4dcd-befe-c7e053de6878', 'f34b4e2c-b599-425b-a999-afc485e3674f', 10, 10, '2026-03-26 17:56:09.332', '2026-03-26 17:56:09.332', 'IN_STOCK', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', -10);
INSERT INTO "public"."product_inventory" VALUES ('9616db54-479d-4ff4-82a6-63b19facc12e', '2aa54c6a-7c94-4f1c-aca5-2c0ed3ab5581', 10, 10, '2026-03-26 17:56:09.579', '2026-03-26 17:56:09.579', 'IN_STOCK', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', -10);
INSERT INTO "public"."product_inventory" VALUES ('6013c6db-2a72-4eb6-b1b4-e603ff92b023', '1db18ed7-865b-4d69-87b8-c88656eff292', 99, 10, '2026-01-16 16:56:38.31', '2026-03-27 05:17:57.66', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('5c8b369c-1be4-4b5c-bb21-dbc49e8f718f', '15feeed5-0d9e-4da1-88ff-50c8fb95aa09', 0, 10, '2026-01-16 16:41:38.562', '2026-01-16 16:41:38.562', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('12006b0d-ae8b-4c29-8951-bfd7d31d282d', 'f336f788-48a5-4f02-89e6-f5349001a1b3', 0, 10, '2025-11-26 21:03:23.963', '2025-11-26 21:03:23.963', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('c0427b61-6126-4583-b3a2-a0bbec8b10e7', 'c7bba2e6-f70b-4688-a3e7-1a9d238112a5', 0, 10, '2025-11-26 21:02:23.644', '2025-11-26 21:02:23.644', 'IN_STOCK', '139e4863-8f90-4cc4-8aad-3cb004a0759c', -10);
INSERT INTO "public"."product_inventory" VALUES ('d6572365-d0d9-4378-8e4c-4a88f467a5e3', 'c876a2fe-40da-4f5c-9ff8-9478c3ecd93e', 100, 10, '2026-01-16 16:55:07.123', '2026-03-27 16:25:20.498', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('a8f45c8b-759a-4e1c-bb92-55a754fe60d9', 'd004cc21-a835-4d5f-a949-3bf9db98ccbd', 518, 10, '2026-01-16 16:51:29.543', '2026-03-27 16:36:58.298', 'IN_STOCK', 'f387017f-3306-404a-8a15-584a4d3bf7c9', -10);
INSERT INTO "public"."product_inventory" VALUES ('7d024ab0-f04a-4818-bec1-31a141dffba3', '67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 98, 10, '2026-03-06 15:18:37.512', '2026-03-28 05:20:13.103', 'IN_STOCK', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', -10);
INSERT INTO "public"."product_inventory" VALUES ('7e1cab43-9790-41ba-b43f-116d92807477', '216e5791-6703-4900-8404-b0eecf62aa6a', 125, 10, '2026-03-28 08:10:16.541', '2026-03-28 08:10:16.541', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('1e3d3bb6-b611-4e6d-a78b-39b54e309c03', '7d630e2b-2c6c-4196-9dce-213502188d51', 100, 10, '2026-03-28 08:22:21.242', '2026-03-28 08:22:21.242', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);
INSERT INTO "public"."product_inventory" VALUES ('15ad2b7d-7a73-4a84-b2f4-f57521fe12e5', 'e6fd98f3-9220-433b-b0de-3da630b7a669', 254, 10, '2026-03-28 08:00:12.488', '2026-03-28 08:24:33.072', 'IN_STOCK', 'f3f7b181-034e-4e28-846e-0a14ac37a821', -10);

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
-- Records of product_questions
-- ----------------------------
INSERT INTO "public"."product_questions" VALUES ('a4969f73-22b8-4196-9718-2363ab41acfa', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '2a36312f-f039-4e10-8346-44189bf87362', 'tốt ko?', 'cái này sài tốt á bạn , không có gây kích wungs da', '2a36312f-f039-4e10-8346-44189bf87362', 'ANSWERED', 't', '2026-03-23 13:51:08.657', '2026-03-26 14:35:27.915');

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
INSERT INTO "public"."product_reviews" VALUES ('504c0305-dbb8-477a-a85b-2aeb500b4459', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 5, 'cung  dd', 'good', 'f', 't', 1, '2026-03-18 17:27:11.003', '2026-03-20 14:21:11.072');
INSERT INTO "public"."product_reviews" VALUES ('f169ca31-ad22-4460-a802-cbbbcb71ab6f', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 5, 'Đỉnh nha mấy bà', '', 'f', 't', 0, '2026-01-06 08:28:18.993', '2026-03-21 07:32:26.117');
INSERT INTO "public"."product_reviews" VALUES ('df20b098-7bc5-4e1d-b81f-4ae187149be2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '2a36312f-f039-4e10-8346-44189bf87362', 1, 'Great product!', 'I really love this product. It works perfectly for my skin.', 'f', 't', 1, '2026-03-21 08:05:44.349', '2026-03-25 16:39:43.528');

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
INSERT INTO "public"."product_stats" VALUES ('fac0fe7b-5fb1-46c7-b144-648aa91cc26d', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 0, 0.00, 5.00, 1, 0, NULL, '2026-01-06 07:52:03.789', '2026-03-20 14:21:11.151');
INSERT INTO "public"."product_stats" VALUES ('6b6188fb-21c4-41ce-b659-75ab57f64ac3', '139e4863-8f90-4cc4-8aad-3cb004a0759c', 0, 0.00, 3.00, 2, 0, NULL, '2026-01-06 07:52:03.741', '2026-03-21 08:06:04.391');

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
-- Records of product_variants
-- ----------------------------
INSERT INTO "public"."product_variants" VALUES ('804bd14c-c2bf-45ee-8ffe-73642ae69076', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '28870565', '12 Sunday - hồng đỏ', '#E53C51', NULL, NULL, 339150.00, 0, '2026-03-28 08:45:56.193', '2026-03-28 08:45:56.193', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('a6334c84-e558-418d-9e1a-3aab6ef68f2d', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '97474538', '13 Dew Boksoonga - hồng nude', '#F7B7AB', NULL, NULL, 339150.00, 0, '2026-03-28 08:51:18.956', '2026-03-28 08:51:18.956', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('7022882b-0227-4ac0-9664-ab942692394c', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '71707677', '04 Pomelo Nude - cam nude', '#FBB0AA', NULL, NULL, 339150.00, 0, '2026-03-28 08:52:40.463', '2026-03-28 08:52:40.463', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('67344a6a-9a15-4aea-8b89-c19152778212', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '18890077', '07 Rose Water - hồng hoa hồng', '#D56980', NULL, NULL, 339150.00, 0, '2026-03-28 08:53:36.265', '2026-03-28 08:53:36.265', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('4f2c1c1b-7a25-420a-b239-ab90002503a2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '87185538', '19C Light - da trắng sáng (tone da lạnh beige pink)', '#fee7da', NULL, 'Standard', 349000.00, 0, '2025-11-26 20:04:58.042', '2025-11-26 20:04:58.042', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('8caffe21-d0f6-421d-9068-a824440187a8', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '78006188', '21C Lingerie - da trắng hồng (tone lạnh beige pink)', '#fdd8c4', NULL, 'Standard', 349000.00, 1, '2025-11-26 20:23:53.559', '2025-11-26 20:27:46.593', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('16d13d2a-fce2-4d21-a72c-9e2cb7a75202', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '11025156', '21N linen - da sáng tự nhiên (tone beige yellow)', '#fee1c4', NULL, 'Standard', 349000.00, 2, '2025-11-26 20:58:38.476', '2025-11-26 20:58:38.476', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('c7bba2e6-f70b-4688-a3e7-1a9d238112a5', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '11994898', '23N Ginger - da trung bình (tone tự nhiên beige yellow)', '#ffdab4', NULL, 'Standard', 349000.00, 3, '2025-11-26 21:02:23.644', '2025-11-26 21:02:23.644', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('f336f788-48a5-4f02-89e6-f5349001a1b3', '139e4863-8f90-4cc4-8aad-3cb004a0759c', '59178447', '19N Porcelain - Da trắng sáng (tone da tự nhiên beige yellow)', '#fee0c5', NULL, 'Standard', 349000.00, 4, '2025-11-26 21:03:23.963', '2025-11-26 21:03:23.963', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('15feeed5-0d9e-4da1-88ff-50c8fb95aa09', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '80766492', '21 Rosé', '#f1cfbd', NULL, 'Standard', 808000.00, 0, '2026-01-16 16:41:38.562', '2026-01-16 16:41:38.562', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('d004cc21-a835-4d5f-a949-3bf9db98ccbd', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '95183175', 'No.21 Ivory', '#f1d3b8', NULL, 'Standard', 808000.00, 1, '2026-01-16 16:51:29.543', '2026-01-16 16:51:29.543', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('c876a2fe-40da-4f5c-9ff8-9478c3ecd93e', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '77286589', '22 Natural', '#e8ccb1', NULL, 'Standard', 808000.00, 2, '2026-01-16 16:55:07.123', '2026-01-16 16:55:07.123', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('1db18ed7-865b-4d69-87b8-c88656eff292', 'f387017f-3306-404a-8a15-584a4d3bf7c9', '79102357', '23 Medium', '#eac8ab', NULL, 'Standard', 808000.00, 3, '2026-01-16 16:56:38.31', '2026-01-16 16:56:38.31', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('67ed2f93-57c0-4dc5-8ed7-c2b3df5dec73', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', 'SKU-001-RED', 'Red - Size M', '#d01966', 'M', 'Standard', 150000.00, 0, '2026-03-06 15:18:37.512', '2026-03-10 05:48:27.469', 'IMAGE');
INSERT INTO "public"."product_variants" VALUES ('f34b4e2c-b599-425b-a999-afc485e3674f', '6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', '95440379-DEFAULT', 'Mặc định', NULL, NULL, NULL, 515755.00, 0, '2026-03-26 17:56:09.286', '2026-03-26 17:56:09.286', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('2aa54c6a-7c94-4f1c-aca5-2c0ed3ab5581', '9b34afd5-72e9-46f6-aaff-9e3c18e0d197', 'XPL-9624-DEFAULT', 'Mặc định', NULL, NULL, NULL, 234500.00, 0, '2026-03-26 17:56:09.539', '2026-03-26 17:56:09.539', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('216e5791-6703-4900-8404-b0eecf62aa6a', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '63708644', '03 Healthy Boksoonga - hồng đào nude', '#E8ACB4', NULL, 'color', 339150.00, 0, '2026-03-28 08:10:16.541', '2026-03-28 08:10:16.541', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('7d630e2b-2c6c-4196-9dce-213502188d51', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '49834183', '02 Breeze - hồng tươi tắn', '#FF8087', NULL, NULL, 339150.00, 0, '2026-03-28 08:22:21.242', '2026-03-28 08:22:21.242', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('e6fd98f3-9220-433b-b0de-3da630b7a669', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '88846591-DEFAULT', '01 La Vie En Coral - hồng san hô', '#FB7F73', NULL, NULL, 339150.00, 0, '2026-03-28 08:00:12.399', '2026-03-28 08:24:33.059', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('c1284bd1-507f-4e54-9e00-52d80295d31c', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '52880154', '05 Strawberry - hồng dâu', '#E96E9D', NULL, NULL, 339150.00, 0, '2026-03-28 08:32:19.222', '2026-03-28 08:32:19.222', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('35e1c255-66df-452a-bb90-55944f0225ac', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '20689546', '06 Fig Dew - hồng đất', '#CB5B57', NULL, NULL, 339150.00, 0, '2026-03-28 08:27:16.342', '2026-03-28 08:32:33.301', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('ebaf26c3-df7d-4b74-9f7e-302676d919fb', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '25802001', '08 Amethyst - hồng tím nhạt', '#EA97AB', NULL, NULL, 339150.00, 0, '2026-03-28 08:34:59.317', '2026-03-28 08:34:59.317', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('c54735fd-2658-4c3a-86d6-afd8516c5bd5', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '22527551', '10 Peach Bunny - hồng đào nhạt', '#E79D9A', NULL, NULL, 339150.00, 0, '2026-03-28 08:38:01.016', '2026-03-28 08:38:01.016', 'COLOR');
INSERT INTO "public"."product_variants" VALUES ('8aa2f5bf-71c4-43da-b298-310133aad55d', 'f3f7b181-034e-4e28-846e-0a14ac37a821', '21468913', '09 Mauve Grape - tím nho', '#CC93A4', NULL, NULL, 339150.00, 0, '2026-03-28 08:39:22.605', '2026-03-28 08:39:22.605', 'COLOR');

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
INSERT INTO "public"."products" VALUES ('6a8a8632-289e-4ff3-8afd-b4b8c77d64d3', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'kem-mat-va-mat-ahc-mo-nam-lam-djeu-mau-da-pro-shot-gluta-ctivation-bright-3-30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', '95440379', 'cc214951-a62b-4650-b06a-11d3848bcb03', 515755.00, 542900.00, 't', 'f', 30.00, 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml', 'Kem Mắt Và Mặt AHC Mờ Nám, Làm Đều Màu Da Pro Shot Gluta-Ctivation Bright 3 30ml giá rẻ', '2025-12-15 14:07:55.1', '2025-12-15 14:07:55.1');
INSERT INTO "public"."products" VALUES ('f387017f-3306-404a-8a15-584a4d3bf7c9', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', 'kem-nen-li-min-muot-da-banila-co-covericious-power-fit-foundation-30ml-(phien-ban-moi)', 'Sản phẩm trang điểm tuyệt vời của thương hiệu Banila Co, chuyên gia trong việc tạo lớp nền make-up hoàn hảo giúp cho đi từng lỗ chân lông, duy trì độ che phủ ưu việt trong nhiều giờ liền. Nhờ chất kem siêu mỏng và dễ phân tán khi lên da, nhanh chóng bám vào bề mặt và tạo nên lớp nền bền chặt mịn màng khi thoa, che lấp những vùng xỉn màu, thô ráp. Banila Co Covericious Power Fit Foundation giúp tạo ra diện mạo da mới đều màu, mịn màng và trẻ trung hơn.', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '11206214', '7931cc87-0c28-46a3-b2d0-4f073e0d8cd4', 3660000.00, 808000.00, 't', 't', 30.00, 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', 'Kem Nền Lì, Mịn Mướt Da Banila Co Covericious Power Fit Foundation 30Ml (phiên bản mới)', '2026-01-16 14:44:58.072', '2026-02-28 06:45:45.245');
INSERT INTO "public"."products" VALUES ('139e4863-8f90-4cc4-8aad-3cb004a0759c', 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 'kem-nen-che-khuyet-djiem-clio-kill-cover-founwear-foundation-the-original-35ml', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', '14554829', 'e6f24ef7-0eff-467e-93b6-14b51af43723', 349000.00, 399000.00, 't', 't', 50.00, 'Kem Nền Che Khuyết Điểm Clio Kill Cover Founwear Foundation The Original 35ml', 'Kem nền Clio Kill Cover Founwear Foundation The Original nổi bật với khả năng che phủ mỏng nhẹ và hoàn hảo, bền màu và bảo vệ da khỏi tác hại của tia UV.​ The Original sở hữu công thức  mới kem mỏng nhẹ, tạo lớp nền trông rất tự nhiên, nhẹ & mỏng mịn trên da, mang đến hiệu ứng da rạng rỡ, mượt mà', '2025-11-24 23:18:57.297', '2025-11-24 23:18:57.297');
INSERT INTO "public"."products" VALUES ('e6d50dd9-7784-4f8a-82f4-2c84403a050c', 'Son Thạch Bóng Thuần Chay Amuse Jel-Fit Tint 3.8g', 'son-thach-bong-thuan-chay-amuse-jel-fit-tint-3.8g', '<p><strong><em>Công dụng chính</em></strong><em>: Son tint với công thức Jel-fit độc đáo vừa giúp duy trì màu sắc lâu trôi suốt 12h, đồng thời tạo hiệu ứng môi căng mướt, tươi tắn đầy sức sống.</em></p><p><strong><em>Hiệu ứng:</em></strong><em> bóng</em></p><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/14d384ff-977c-4bff-a60d-9ff156068ab3.webp"><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/d585c1bd-d5c5-49aa-afee-a90183aec6eb.webp"><p></p>', 'lorrem', 'SON-2604', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 289000.00, NULL, 't', 't', 38.00, NULL, NULL, '2026-03-06 15:08:58.296', '2026-03-19 13:36:49.757');
INSERT INTO "public"."products" VALUES ('9b34afd5-72e9-46f6-aaff-9e3c18e0d197', '(Pleasure - xạ hương) Kem Dưỡng Tay Thuần Chay Amuse Vegan Soybean Hand Cream 50ml (HSD dưới 12 tháng)', '(pleasure-xa-huong)-kem-duong-tay-thuan-chay-amuse-vegan-soybean-hand-cream-50ml-(hsd-duoi-12-thang)', '<p><img class="rounded-lg max-w-full h-auto" src="https://link.storjshare.io/s/jwit43cwbeakiaqcsijm4chhehta/lingbeauty/uploads/public/general/images/69a40152405e6_1774187788258_4b60a188.jpg?wrap=0" /><strong>Điểm</strong> <strong>nổi bật </strong>của kem dưỡng tay Amuse Vegan Soybean Hand Cream Kem dưỡng tay thuần chay được chiết từ đậu, loại hạt giàu dưỡng chất giúp giúp dưỡng ẩm và chăm sóc vùng da tay đàn hồi, mềm mại, mịn màng hơn. Với hơn 5.000 ppm ceramide đậu nành được tạo ra bằng cách lên men đậu xanh (từ đảo Jeju, Hàn Quốc) sẽ tập trung cải thiện sự mệt mỏi, khô nứt của đôi bàn tay Amuse Vegan Soybean Hand Cream chứa các chiết xuất bơ hạt mỡ, panthenol &amp; Ceramide giúp cấp ẩm vượt trội,</p><p style="text-align:center"><img class="rounded-lg max-w-full h-auto" src="https://i.pinimg.com/1200x/f4/ff/89/f4ff891c866fe0a74f0e07f57c5a91a6.jpg" /></p><h2 style="text-align:center">dưỡng ẩm sâu cho vùng da tay khô, nứt nẻ. Sản</h2><p style="text-align:center"><img class="rounded-lg max-w-full h-auto" src="https://i.pinimg.com/736x/a5/e1/7d/a5e17d50989f4bbf5d28614557e147db.jpg" /></p><h2 style="text-align:center">phẩm cải thiện nếp nhăn và vùng chai sạm ở tay, giúp đôi tay bạn khỏe mạnh và tươi trẻ với thành phần sạch và không gây dị ứng.</h2><p style="text-align:center"></p><p style="text-align:center">#skincare</p><p style="text-align:center"></p>', '(Pleasure - xạ hương) Kem Dưỡng Tay Thuần Chay Amuse Vegan Soybean Hand Cream 50ml (HSD dưới 12 tháng)', 'XPL-9624', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 234500.00, NULL, 't', 't', NULL, NULL, NULL, '2026-03-10 13:43:35.582', '2026-03-26 06:51:18.885');
INSERT INTO "public"."products" VALUES ('f3f7b181-034e-4e28-846e-0a14ac37a821', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', 'son-nuoc-bong-thuan-chay-amuse-dew-tint-4g', '<p style="text-align:center"><strong><em>Công dụng chính:</em></strong><em> Son tint Amuse mang đến màu sắc trong trẻo, sống động, nhẹ nhàng tô điểm cho đôi môi căng mướt với lớp màu không nhòe hay bết dính nhờ lớp phủ nước.</em></p><p style="text-align:center"><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/a7875436-1c69-4b07-a392-093164537347.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/06e7726a-644a-4a62-aefd-9502d2661c2e.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/9ce20549-672c-4391-8a13-f3c1c324cdad.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/ea48541a-3950-4863-a806-3065a9cdcde5.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/ede09350-4d94-4b7c-ac3b-35488a263f50.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/999bfca7-fcce-4e08-b737-685ef2ce16bf.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/23ef3cfa-ff34-4b3d-be94-c76dda1b9c89.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/2672e9a7-fb55-45a5-89f8-3f531a2be0db.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/03166339-2040-4b5f-bee5-22aa9e424c63.webp" /><img class="rounded-lg max-w-full h-auto" src="https://image.hsv-tech.io/bbx/common/573dcd10-9570-4936-ac54-4f748cea2427.webp" /></p><p style="text-align:center"></p><p style="text-align:center">Sở hữu son nước bóng Amuse Dew Tint giúp đôi môi của bạn trông căng bóng rạng rỡ. Sản phẩm tạo hiệu ứng môi đầy đặn, không rãnh môi, không khô sạm nhờ chứa các thành phần dưỡng ẩm và kết cấu 3 lớp nước- dầu-nước.</p><p style="text-align:center">Đây là son môi thuần chay Amuse được lấy cảm hứng từ những cánh hoa đang nở, đầy màu sắc và rạng rỡ. Chứa đến 35% dưỡng chất cung cấp độ ẩm, mang đến lớp màu trong suốt, dewy glow cực kỳ tươi tắn với hiệu ứng nhẹ nhàng, bền màu suốt cả ngày mà không bị trôi.</p><p style="text-align:center">Với phiên bản cải tiến mới từ dòng son bán chạy nhất của Amuse, son Dew Tint bám màu tốt hơn, hạn chế xỉn màu son và duy trì độ bóng lâu dài. Sở hữu 12 tông màu đa dạng với nhiều undertone, có thiết kế độc đáo với hình tượng cúc daisy mang lại vẻ ngoài xinh xắn nổi bật khi mới nhìn vào thỏi son nước này.</p><h2 style="text-align:center"><strong>Điểm nổi bật của son nước Amuse Dew Tint</strong></h2><p style="text-align:center">- Son tint chứa 35% nước mang lại độ bóng mướt tự nhiên trên môi. Kết cấu tươi mát và nhẹ nhàng bám chặt vào môi bạn, với cấu trúc ba thành phần nước-dầu-nước</p><p style="text-align:center">- Tạo lớp phủ bóng trên môi và màu sắc trong như nước mang đến cho đôi môi bạn vẻ tươi tắn và màu sắc lâu trôi</p><p style="text-align:center">- Sở hữu bảng màu sắc tươi tắn, rạng rỡ của Amuse giúp màu sắc tự nhiên của đôi môi rạng rỡ</p><p style="text-align:center">- Son đạt chứng nhận thuần chay từ Eve Vegan của Pháp.</p><p style="text-align:center">- Thiết kế trong suốt mang tính biểu tượng của Amuse với thân vỏ trong suốt, nắp đậy được mô phỏng hình cánh hoa, kết hợp các màu sắc trong trẻo của cánh hoa sương.</p><p style="text-align:center">- Chứa thành phần: chiết xuất từ ​​xoài giúp môi bạn mềm mại và ẩm mượt; Chiết xuất từ ​​táo và Vitamin E acetate bảo vệ môi bạn khỏi môi trường bên ngoài.</p><h2 style="text-align:center"><strong>Bảng màu son Dew Tint</strong></h2><p style="text-align:center">01 La Vie En Coral: hồng san hô</p><p style="text-align:center">02 Breeze: hồng tươi tắn</p><p style="text-align:center">03 Healthy Boksoonga: hồng đào nude</p><p style="text-align:center">04 Pomelo Nude: cam nude</p><p style="text-align:center">05 Strawberry: hồng dâu</p><p style="text-align:center">06 Fig Dew: hồng đất</p><p style="text-align:center">07 Rose Water: hồng hoa hồng</p><p style="text-align:center">08 Amethyst: hồng tím nhạt</p><p style="text-align:center">09 Mauve Grape: tím nho</p><p style="text-align:center">10 Peach Bunny: hồng đào nhạt</p><p style="text-align:center">12 Sunday: hồng đỏ</p><p style="text-align:center">13 Dew Boksoonga: hồng nude</p><p style="text-align:center"><em>*Màu son lên môi sẽ khác nhau, tùy vào sắc độ môi của mỗi người. Đối với các dòng son Amuse, màu son thực tế sẽ có màu khác (nhạt hơn, vì kết cấu dạng tint cho sắc thái trong trẻo, tự nhiên hơn) so với màu vỏ son bên ngoài. Do đó, khách hàng cần tham khảo kỹ trước khi chọn mua</em></p><h2 style="text-align:center"><strong>Hướng dẫn sử dụng</strong></h2><p style="text-align:center">Thoa trực tiếp lên môi, theo sở thích tô lòng môi hoặc full môi</p>', 'Son Nước Bóng Thuần Chay Amuse Dew Tint 4g', '88846591', 'cddce1ef-8fd4-438a-bd1d-d3eee302fe25', 339150.00, NULL, 't', 't', 4.00, NULL, NULL, '2026-03-28 08:00:12.399', '2026-03-28 08:00:12.399');

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
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of review_replies
-- ----------------------------
INSERT INTO "public"."review_replies" VALUES ('b8cb3afb-6864-4e6c-99c5-dd140d3f0ed6', '504c0305-dbb8-477a-a85b-2aeb500b4459', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '.', 'f', '2026-03-19 07:37:15.525', '2026-03-19 07:37:15.525');
INSERT INTO "public"."review_replies" VALUES ('4845b332-a70b-437e-9ae2-d14d7f0ce067', '504c0305-dbb8-477a-a85b-2aeb500b4459', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'hay', 'f', '2026-03-20 08:53:48.943', '2026-03-20 08:53:48.943');
INSERT INTO "public"."review_replies" VALUES ('bafcf398-f1e3-475c-bfa7-a7bb53907be3', '504c0305-dbb8-477a-a85b-2aeb500b4459', '2a36312f-f039-4e10-8346-44189bf87362', 'Cảm ơn bạn đã đánh giá!', 'f', '2026-03-20 08:54:29.278', '2026-03-20 08:54:29.278');
INSERT INTO "public"."review_replies" VALUES ('c7aef156-c706-493b-8eaa-0de168b19198', 'f169ca31-ad22-4460-a802-cbbbcb71ab6f', '2a36312f-f039-4e10-8346-44189bf87362', 'Cảm on bạn đã tin tưởng  sản phẩm của bên mình nah', 'f', '2026-03-20 08:58:32.856', '2026-03-20 08:58:32.856');
INSERT INTO "public"."review_replies" VALUES ('33881db5-99ce-45b5-853a-c6b2be1dc107', 'f169ca31-ad22-4460-a802-cbbbcb71ab6f', '2a36312f-f039-4e10-8346-44189bf87362', 'cảm on bạn đã tin dùng sản phẩm nha .,. bạn cần hỗ twoj gì cú  nhắn  cho nhân viên cskh nha', 'f', '2026-03-21 08:00:49.712', '2026-03-21 08:00:49.712');
INSERT INTO "public"."review_replies" VALUES ('d58be8ef-ed09-435c-b33d-d6e6a83e8c63', 'f169ca31-ad22-4460-a802-cbbbcb71ab6f', '2a36312f-f039-4e10-8346-44189bf87362', 'shop cảm on bạn nhiều nha', 'f', '2026-03-21 08:18:08.565', '2026-03-21 08:18:08.565');

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
-- Records of shared_wishlists
-- ----------------------------
INSERT INTO "public"."shared_wishlists" VALUES ('63dd199e-42f9-40fd-bdd2-d21a4f8c8f93', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'dadda3b486e3957c3d84353c4597a879', NULL, NULL, 't', '2026-04-28 16:13:00', 4, '2026-03-28 16:14:23.283', '2026-03-28 16:53:49.948');

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
INSERT INTO "public"."user_role_assignments" VALUES ('f5146403-c60b-476c-a2c8-72a43d566268', '56832406-b274-47e6-b3fd-4f8e604253e6', '019ad71b-5d94-7788-8816-5c28161bd32b', '2026-02-26 15:40:17.167', '2026-02-26 15:40:17.167');
INSERT INTO "public"."user_role_assignments" VALUES ('37ada17c-0436-4940-b9d7-56ab02d29be4', '2a36312f-f039-4e10-8346-44189bf87362', '019ad71c-0363-77dd-8909-2bb9f6360eff', '2026-01-26 09:47:57.23', '2026-01-26 09:47:57.23');
INSERT INTO "public"."user_role_assignments" VALUES ('d0c3d28e-6898-44e9-916f-1999861c7540', '31a61d3a-1812-4d2d-b8e4-4d27b82eb011', '019ad71c-0363-7ddb-8b7c-fc270e6c33d6', '2026-03-26 14:38:45.734', '2026-03-26 14:38:45.734');

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
-- Records of user_roles
-- ----------------------------
INSERT INTO "public"."user_roles" VALUES ('019ad71b-5d94-7788-8816-5c28161bd32b', '2025-12-01 06:31:56', '2025-12-01 06:32:00', 'CLIENT');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-7ddb-8b7c-fc270e6c33d6', '2025-12-01 06:32:37', '2025-12-01 06:32:39', 'AGENCY');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-77dd-8909-2bb9f6360eff', '2025-12-01 06:38:51', '2025-12-01 06:38:54', 'ADMINISTRATOR');
INSERT INTO "public"."user_roles" VALUES ('019ad71c-0363-789f-8218-cf4a01088597', '2025-12-01 06:32:37', '2025-12-01 06:32:39', 'CLIENT');

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
INSERT INTO "public"."users" VALUES ('edfd5d77-bd20-4aec-ae70-4a2976847fa3', 'user1@example.com', 'John', 'Doe', '+1234567891', 'user1', '$2b$10$NhJ/s.Ms5lToR8JCwLzhC.5rqk4EM3mu9ImcX482sM0MYfXdkgogO', '2025-11-30 23:43:53.845', '2026-03-02 09:20:07.159', NULL, 't', 'f', 'f', 'f', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZGZkNWQ3Ny1iZDIwLTRhZWMtYWU3MC00YTI5NzY4NDdmYTMiLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzY0NTQ3NTMzLCJleHAiOjE3NjcxMzk1MzN9.BcHzJUFFqqVZmaAleh30ZGnnFXnVKDVuAEokqht-y24', NULL);
INSERT INTO "public"."users" VALUES ('24a11dc4-296e-4acb-badf-6d7929d3f7c8', 'lucan1@lingdethuong.com', 'Nguyễn', 'Lu', '0123456789', 'lucan1', '$2b$10$3RgYDM3n9/3tGFwszsqk5eYVIZid89huDbKVxfYOW.v0mqdqEcYvG', '2025-12-11 10:03:26.466', '2025-12-11 10:29:43.93', '2025-12-11 10:29:43.927', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNGExMWRjNC0yOTZlLTRhY2ItYmFkZi02ZDc5MjlkM2Y3YzgiLCJ1c2VybmFtZSI6Imx1Y2FuMSIsImlhdCI6MTc2NTQ0ODYxNywiZXhwIjoxNzY4MDQwNjE3fQ.MtSC0YTOA4uwmuZjHT0TGr55g8nGOPgc3etxdnXHLJE', NULL);
INSERT INTO "public"."users" VALUES ('56832406-b274-47e6-b3fd-4f8e604253e6', 'devyuki2005@imail.edu.vnde', 'Uyển Nhi', 'Nguyễn Ngọc', '0363639639636', 'yeudauvai3003', '$2b$10$YkNCwrKG0qMSb2DDAluCNeMsUJ6sKwVU4aqrxv5rd3GBcW6Vv7JKe', '2026-02-26 15:40:17.167', '2026-02-26 15:40:17.167', NULL, 't', 'f', 'f', 'f', 'f', 'f', NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES ('4f1a4a71-8afc-4609-9f21-97c5e25f816a', 'alovuavu222@gmail.com', 'pham thi', ' yen vy', '036363636', 'vyyyy', '$2b$10$TfGcm1ifVE2LC9jbePscSufY8Tnv92Rlu7cHQMV6EdlSj1JoPaneW', '2026-03-02 09:33:16.426', '2026-03-26 14:36:18.307', '2026-03-02 09:33:16.424', 'f', 't', 'f', 'f', 'f', 'f', '2026-03-02 09:33:16.424', NULL, NULL);
INSERT INTO "public"."users" VALUES ('31a61d3a-1812-4d2d-b8e4-4d27b82eb011', 'ogyminecraft497+taybocha@gmail.com', 'Độ', 'Phùng Thanh', '0356618545', 'taybocha3636', '$2b$10$2eojdX27emt7c3ihsoYc0OPve3X/VnEPHkSiLCWLfYba5pXHtjwNe', '2026-03-26 14:38:09.846', '2026-03-26 14:38:45.553', NULL, 't', 'f', 'f', 't', 't', 't', NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES ('bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'admin@lingdethuong.com', 'Hàn Tiểu', 'Ling', '+1234567890', 'htligz', '$2b$10$P2vJiwVIE4TIJ7fW9cYaXe24qV8W0QnjsgmN8KwpZCRUC5VpGKile', '2025-11-05 17:44:38.293', '2026-03-28 05:48:03.254', '2026-01-30 08:29:35.591', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZDlmZGNjMS01MjQ3LTQ5YTItOWVkNC0xZjAwNWRkNDdjZDIiLCJ1c2VybmFtZSI6Imh0bGlneiIsImlhdCI6MTc3NDY3Njg4MywiZXhwIjoxNzc3MjY4ODgzfQ.TlVdrI7OE3fX-99iXYqI5ks3YVWiJ0E1HJMKN2caNN4', '510ac388-76b1-4158-954d-ef3e7753d31a');
INSERT INTO "public"."users" VALUES ('2a36312f-f039-4e10-8346-44189bf87362', 'ogyminecraft497@gmail.com', 'Lý', 'Vân Tư', '0363636363', 'yukidev2005', '$2b$10$kj2m97sva9IfBNUz/LynDe4XhDHvmHA2sFDg7QUWCjKENWDRkuXra', '2026-01-26 09:47:57.23', '2026-03-28 07:13:42.338', '2026-02-05 04:39:36.61', 't', 'f', 'f', 't', 'f', 'f', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYTM2MzEyZi1mMDM5LTRlMTAtODM0Ni00NDE4OWJmODczNjIiLCJ1c2VybmFtZSI6Inl1a2lkZXYyMDA1IiwiaWF0IjoxNzc0NjgyMDIyLCJleHAiOjE3NzcyNzQwMjJ9.jjep0yf2_Xxisv7kGGitqFK1a_1Di8SL3s5yMaG8lgs', 'f36e928a-b6c8-4f21-b6cf-0f67bb59edeb');

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
-- Records of wishlists
-- ----------------------------
INSERT INTO "public"."wishlists" VALUES ('3be00c20-23c0-4e31-9406-5f4f3d12fcbb', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', '139e4863-8f90-4cc4-8aad-3cb004a0759c', NULL, NULL, '2026-03-28 16:59:30.653', '2026-03-28 16:59:30.653');
INSERT INTO "public"."wishlists" VALUES ('47d39153-3fb4-47a9-83cb-4f35792524b1', 'bd9fdcc1-5247-49a2-9ed4-1f005dd47cd2', 'e6d50dd9-7784-4f8a-82f4-2c84403a050c', NULL, NULL, '2026-03-28 16:59:30.786', '2026-03-28 16:59:30.786');

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
