# Migration API Guide - Default Variants

## Tổng quan

API endpoints để migrate products hiện có sang default variant model. Thay vì chạy SQL script trực tiếp, bạn có thể sử dụng API này để thực hiện migration an toàn hơn.

## Endpoints

### 1. Check Migration Status

Kiểm tra xem có cần migration không.

**Endpoint:** `GET /api/system/migration/default-variants/status`

**Auth:** Required (Admin only)

**Response:**

```json
{
  "type": "response",
  "message": "Migration status checked",
  "data": {
    "productsWithoutVariants": 15,
    "productLevelInventory": 15,
    "flashSaleProductsWithoutVariant": 3,
    "needsMigration": true
  }
}
```

**Fields:**

- `productsWithoutVariants`: Số products chưa có variant nào
- `productLevelInventory`: Số inventory records ở product-level (variantId = null)
- `flashSaleProductsWithoutVariant`: Số flash sale products chưa có variantId
- `needsMigration`: `true` nếu cần chạy migration

### 2. Run Migration

Thực hiện migration để tạo default variants.

**Endpoint:** `POST /api/system/migration/default-variants`

**Auth:** Required (Admin only)

**Response:**

```json
{
  "type": "response",
  "message": "Migration completed",
  "data": {
    "productsProcessed": 15,
    "variantsCreated": 15,
    "inventoryMigrated": 15,
    "inventoryDeleted": 15,
    "flashSaleProductsUpdated": 3,
    "errors": []
  }
}
```

**Fields:**

- `productsProcessed`: Số products đã xử lý thành công
- `variantsCreated`: Số default variants đã tạo
- `inventoryMigrated`: Số inventory records đã migrate sang variant-level
- `inventoryDeleted`: Số product-level inventory đã xóa
- `flashSaleProductsUpdated`: Số flash sale products đã update variantId
- `errors`: Array các lỗi nếu có (migration vẫn tiếp tục với products khác)

## Workflow

### Bước 1: Kiểm tra status

```bash
curl -X GET http://localhost:3000/api/system/migration/default-variants/status \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

Nếu `needsMigration: true`, tiếp tục bước 2.

### Bước 2: Chạy migration

```bash
curl -X POST http://localhost:3000/api/system/migration/default-variants \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Bước 3: Verify

Kiểm tra lại status để đảm bảo migration thành công:

```bash
curl -X GET http://localhost:3000/api/system/migration/default-variants/status \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

Kết quả mong đợi:

```json
{
  "data": {
    "productsWithoutVariants": 0,
    "productLevelInventory": 0,
    "flashSaleProductsWithoutVariant": 0,
    "needsMigration": false
  }
}
```

## Migration Process

Migration thực hiện các bước sau cho mỗi product:

1. **Tạo default variant**
   - SKU: `{PRODUCT_SKU}-DEFAULT`
   - Name: `Mặc định`
   - Price: Lấy từ `product.basePrice`
   - Sort order: 0

2. **Migrate inventory** (nếu có)
   - Tạo variant-level inventory với cùng thông tin
   - Xóa product-level inventory cũ

3. **Update flash sale products** (nếu có)
   - Set `variantId` = default variant ID
   - Giữ nguyên các thông tin khác

## Transaction Safety

- Mỗi product được xử lý trong một transaction riêng
- Nếu 1 product fail, các products khác vẫn tiếp tục
- Errors được log và trả về trong response
- Có thể chạy lại migration nhiều lần (idempotent)

## Error Handling

Nếu có lỗi trong quá trình migration:

```json
{
  "data": {
    "productsProcessed": 12,
    "variantsCreated": 12,
    "errors": [
      "Failed to process product PROD-001: Duplicate SKU",
      "Failed to process product PROD-005: Inventory not found"
    ]
  }
}
```

Các products bị lỗi có thể:

1. Fix manually trong database
2. Hoặc chạy lại migration sau khi fix issue

## Testing với Postman/Thunder Client

### 1. Check Status

```http
GET http://localhost:3000/api/system/migration/default-variants/status
Authorization: Bearer {{admin_token}}
```

### 2. Run Migration

```http
POST http://localhost:3000/api/system/migration/default-variants
Authorization: Bearer {{admin_token}}
```

## Rollback

Nếu cần rollback sau khi migration:

1. **Restore từ backup** (recommended):

   ```bash
   pg_dump -U user -d database > backup_before_migration.sql
   psql -U user -d database < backup_before_migration.sql
   ```

2. **Manual rollback** (nếu không có backup):
   - Xóa variants có SKU kết thúc bằng `-DEFAULT`
   - Restore inventory từ variant-level về product-level
   - Update flash sale products về variantId = null

## Best Practices

1. **Backup trước khi migrate**

   ```bash
   pg_dump -U user -d database > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Test trên staging environment trước**

3. **Chạy vào thời điểm ít traffic**

4. **Monitor logs** trong quá trình migration

   ```bash
   tail -f logs/application.log | grep "default variants migration"
   ```

5. **Verify sau migration**
   - Check status endpoint
   - Test tạo order với flash sale products
   - Test tạo product mới

## Troubleshooting

### Issue: "Duplicate SKU" error

**Cause:** Product đã có variant với SKU `{PRODUCT_SKU}-DEFAULT`

**Solution:**

- Rename existing variant
- Hoặc xóa nếu là test data

### Issue: "Inventory not found" error

**Cause:** Product không có inventory record

**Solution:**

- Migration sẽ skip inventory migration
- Variant vẫn được tạo
- Có thể tạo inventory manually sau

### Issue: Migration timeout

**Cause:** Quá nhiều products cần migrate

**Solution:**

- Tăng timeout trong code
- Hoặc migrate theo batch (modify code để accept limit parameter)

## Performance

- **Small database** (<1000 products): ~1-2 phút
- **Medium database** (1000-10000 products): ~5-10 phút
- **Large database** (>10000 products): ~15-30 phút

Migration chạy trong transaction nên có thể mất thời gian với database lớn.

## Security

- Chỉ ADMIN role mới có quyền chạy migration
- Endpoint được protect bởi JWT auth + Role guard
- Logs được ghi lại để audit

## Monitoring

Check server logs để theo dõi progress:

```
[SystemService] Starting default variants migration...
[SystemService] Found 15 products without variants
[SystemService] Created default variant for product PROD-001
[SystemService] Migrated inventory for product PROD-001
[SystemService] Updated 1 flash sale products for PROD-001
[SystemService] Created default variant for product PROD-002
...
[SystemService] Migration completed successfully
```
