# Migration: Add Default Variants

## Mục đích

Migration này đảm bảo mọi sản phẩm đều có ít nhất một variant, giải quyết vấn đề với flash sale và order cho sản phẩm không có variant.

## ⚠️ RECOMMENDED: Sử dụng Migration API

Thay vì chạy SQL script này trực tiếp, **strongly recommend** sử dụng Migration API để an toàn hơn:

```bash
# 1. Check status
GET /api/system/migration/default-variants/status

# 2. Run migration
POST /api/system/migration/default-variants

# 3. Verify
GET /api/system/migration/default-variants/status
```

**Lợi ích của API:**

- ✅ Transaction safety (mỗi product trong 1 transaction riêng)
- ✅ Error handling tốt hơn (1 product fail không ảnh hưởng các products khác)
- ✅ Detailed logging và progress tracking
- ✅ Có thể chạy lại nhiều lần (idempotent)
- ✅ Không cần access trực tiếp vào database

**Chi tiết:** Xem [Migration API Guide](../docs/migration-api-guide.md)

**Quick start:** Xem [MIGRATION-QUICK-START.md](../docs/MIGRATION-QUICK-START.md)

---

## SQL Script (Alternative Method)

Nếu không thể sử dụng API (ví dụ: server không chạy được), có thể chạy SQL script này.

## Thay đổi

### 1. Schema Changes

- `FlashSaleProduct.variantId`: Từ `String?` → `String` (bắt buộc)
- Mọi product giờ đều có ít nhất 1 variant (default variant)

### 2. Product Service Changes

- Khi tạo product mới mà không có variants, tự động tạo default variant:
  - SKU: `{PRODUCT_SKU}-DEFAULT`
  - Name: `Mặc định`
  - Price: Lấy từ `basePrice` của product
  - Inventory: Migrate từ product-level sang variant-level

### 3. Flash Sale Service Changes

- Khi thêm product vào flash sale mà không có `variantId`:
  - Tự động tìm default variant (ưu tiên SKU có suffix `-DEFAULT`)
  - Nếu không tìm thấy variant nào → throw error

## Cách chạy migration

### Bước 1: Backup database

```bash
pg_dump -U your_user -d your_database > backup_before_default_variants.sql
```

### Bước 2: Chạy SQL migration

```bash
psql -U your_user -d your_database -f server/prisma/migrations/add-default-variants.sql
```

### Bước 3: Update Prisma schema và generate client

```bash
cd server
npx prisma generate
```

### Bước 4: Restart server

```bash
npm run start:dev
```

## Kiểm tra sau migration

### 1. Kiểm tra products có default variant

```sql
-- Tất cả products phải có ít nhất 1 variant
SELECT p.id, p.name, p.sku, COUNT(pv.id) as variant_count
FROM products p
LEFT JOIN product_variants pv ON pv.product_id = p.id
GROUP BY p.id, p.name, p.sku
HAVING COUNT(pv.id) = 0;
-- Kết quả phải rỗng
```

### 2. Kiểm tra inventory đã migrate

```sql
-- Không còn product-level inventory (variant_id IS NULL)
SELECT * FROM product_inventory WHERE variant_id IS NULL;
-- Kết quả phải rỗng
```

### 3. Kiểm tra flash sale products

```sql
-- Tất cả flash sale products phải có variant_id
SELECT * FROM flash_sale_products WHERE variant_id IS NULL;
-- Kết quả phải rỗng
```

## Rollback (nếu cần)

Nếu có vấn đề, restore từ backup:

```bash
psql -U your_user -d your_database < backup_before_default_variants.sql
```

Sau đó revert code changes:

```bash
git revert <commit_hash>
```

## Lưu ý

1. **Existing products**: Migration tự động tạo default variant cho products hiện có
2. **New products**: Service tự động tạo default variant khi tạo product mới
3. **Flash sale**: Giờ có thể thêm product vào flash sale mà không cần chỉ định variantId
4. **Order/Cart**: Logic không thay đổi, vẫn yêu cầu variantId như cũ
5. **API compatibility**: Frontend có thể không truyền variantId khi thêm product vào flash sale

## Testing

Sau khi migration, test các scenarios:

1. ✅ Tạo product mới không có variants → Tự động có default variant
2. ✅ Tạo product mới có variants → Hoạt động bình thường
3. ✅ Thêm product vào flash sale không có variantId → Tự động dùng default variant
4. ✅ Thêm product vào flash sale có variantId → Hoạt động bình thường
5. ✅ Tạo order với flash sale product → Hoạt động bình thường
6. ✅ Kiểm tra inventory của default variant → Đúng số lượng
