# Quick Start: Default Variants Migration

## TL;DR

Chạy 3 API calls này để migrate products sang default variant model:

```bash
# 1. Check status
curl -X GET http://localhost:3000/api/system/migration/default-variants/status \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# 2. Run migration (nếu needsMigration: true)
curl -X POST http://localhost:3000/api/system/migration/default-variants \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# 3. Verify (needsMigration phải là false)
curl -X GET http://localhost:3000/api/system/migration/default-variants/status \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Khi nào cần chạy migration?

Chạy migration nếu:

- ✅ Có products được tạo trước khi implement default variant
- ✅ Có flash sale products không có variantId
- ✅ Có product-level inventory (variantId = null)

Không cần chạy nếu:

- ❌ Database mới, chưa có data
- ❌ Tất cả products đã có variants
- ❌ Đã chạy migration rồi

## Checklist trước khi migrate

- [ ] Backup database
- [ ] Test trên staging environment
- [ ] Có admin token để call API
- [ ] Server đang chạy
- [ ] Không có users đang đặt hàng (optional, nhưng recommended)

## Backup Command

```bash
# PostgreSQL
pg_dump -U your_user -d your_database > backup_$(date +%Y%m%d_%H%M%S).sql

# MySQL
mysqldump -u your_user -p your_database > backup_$(date +%Y%m%d_%H%M%S).sql
```

## Expected Results

### Before Migration

```json
{
  "productsWithoutVariants": 15,
  "productLevelInventory": 15,
  "flashSaleProductsWithoutVariant": 3,
  "needsMigration": true
}
```

### After Migration

```json
{
  "productsWithoutVariants": 0,
  "productLevelInventory": 0,
  "flashSaleProductsWithoutVariant": 0,
  "needsMigration": false
}
```

## Troubleshooting

### "Unauthorized" error

→ Check admin token, đảm bảo user có role ADMIN

### "Duplicate SKU" error

→ Có product đã có variant với SKU `-DEFAULT`, rename hoặc xóa variant đó

### Migration takes too long

→ Bình thường với database lớn, đợi hoặc check logs

### Some products failed

→ Check `errors` array trong response, fix manually và chạy lại

## Rollback

```bash
# Restore từ backup
psql -U your_user -d your_database < backup_YYYYMMDD_HHMMSS.sql
```

## Need Help?

- 📖 Full docs: [default-variant-implementation.md](./default-variant-implementation.md)
- 🔧 API details: [migration-api-guide.md](./migration-api-guide.md)
- 📝 Check server logs: `tail -f logs/application.log`
