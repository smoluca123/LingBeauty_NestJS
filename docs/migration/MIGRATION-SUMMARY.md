# Default Variants Migration - Summary

## Vấn đề đã giải quyết

Flash sale và order không hoạt động với sản phẩm không có variant (simple products).

## Giải pháp

Đảm bảo mọi product đều có ít nhất 1 variant (default variant).

## Thay đổi Code

### 1. Product Service

- ✅ Tự động tạo default variant khi tạo product mới không có variants
- ✅ SKU: `{PRODUCT_SKU}-DEFAULT`, Name: `Mặc định`

### 2. Flash Sale Service

- ✅ Tự động chọn default variant nếu không chỉ định variantId
- ✅ Ưu tiên variant có SKU kết thúc bằng `-DEFAULT`

### 3. Schema

- ✅ `FlashSaleProduct.variantId`: `String?` → `String` (required)

### 4. Migration API

- ✅ `GET /api/system/migration/default-variants/status` - Check status
- ✅ `POST /api/system/migration/default-variants` - Run migration

## Files Changed

```
server/
├── src/modules/
│   ├── product/product.service.ts          # Auto-create default variant
│   ├── flash-sale/flash-sale.service.ts    # Auto-select default variant
│   └── system/
│       ├── system.service.ts               # Migration logic
│       ├── system.controller.ts            # Migration endpoints
│       └── system.module.ts                # Import PrismaModule
├── prisma/
│   ├── schema/flashsale.prisma             # variantId required
│   └── migrations/
│       ├── add-default-variants.sql        # SQL migration script
│       └── README-default-variants.md      # SQL migration guide
└── docs/
    ├── default-variant-implementation.md   # Full documentation
    ├── migration-api-guide.md              # API usage guide
    └── MIGRATION-QUICK-START.md            # Quick reference
```

## Migration cho Database Hiện Có

### Option 1: Migration API (Recommended)

```bash
# 1. Check
curl -X GET http://localhost:3000/api/system/migration/default-variants/status \
  -H "Authorization: Bearer ADMIN_TOKEN"

# 2. Backup
pg_dump -U user -d db > backup.sql

# 3. Migrate
curl -X POST http://localhost:3000/api/system/migration/default-variants \
  -H "Authorization: Bearer ADMIN_TOKEN"

# 4. Verify
curl -X GET http://localhost:3000/api/system/migration/default-variants/status \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Option 2: SQL Script

```bash
# 1. Backup
pg_dump -U user -d db > backup.sql

# 2. Run SQL
psql -U user -d db -f server/prisma/migrations/add-default-variants.sql

# 3. Generate Prisma
cd server && npx prisma generate

# 4. Restart
npm run start:dev
```

## Testing Checklist

- [ ] Products mới không có variants → Tự động có default variant
- [ ] Products mới có variants → Hoạt động bình thường
- [ ] Products cũ đã có default variant sau migration
- [ ] Flash sale không cần variantId → Dùng default variant
- [ ] Flash sale có variantId → Hoạt động bình thường
- [ ] Order với flash sale product → Hoạt động bình thường
- [ ] Inventory đúng cho default variants

## Rollback

```bash
# Restore database
psql -U user -d db < backup.sql

# Revert code
git revert <commit-hash>

# Regenerate Prisma
cd server && npx prisma generate
```

## Documentation

- 📖 **Full docs**: [docs/default-variant-implementation.md](./docs/default-variant-implementation.md)
- 🚀 **Quick start**: [docs/MIGRATION-QUICK-START.md](./docs/MIGRATION-QUICK-START.md)
- 🔧 **API guide**: [docs/migration-api-guide.md](./docs/migration-api-guide.md)
- 💾 **SQL guide**: [prisma/migrations/README-default-variants.md](./prisma/migrations/README-default-variants.md)

## Support

Nếu gặp vấn đề:

1. Check server logs: `tail -f logs/application.log`
2. Check migration status API
3. Review error messages trong migration response
4. Restore từ backup nếu cần

## Next Steps

Sau khi migration:

1. ✅ Test tạo products mới
2. ✅ Test flash sale với products cũ
3. ✅ Test order flow
4. ✅ Update frontend nếu cần (hide default variant trong UI)
5. ✅ Monitor production logs
