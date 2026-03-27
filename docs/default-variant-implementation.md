# Default Variant Implementation

## Tổng quan

Giải pháp này đảm bảo mọi sản phẩm đều có ít nhất một variant, giải quyết vấn đề với flash sale và order cho sản phẩm không có variant.

## Vấn đề ban đầu

- Flash sale và order yêu cầu `variantId` bắt buộc
- Một số sản phẩm không có variant (simple products)
- Schema cho phép `FlashSaleProduct.variantId` nullable → gây confusion
- Logic xử lý phức tạp khi phải handle cả 2 trường hợp: có/không có variant

## Giải pháp

### Nguyên tắc: "Mọi product đều có ít nhất 1 variant"

1. **Product Creation**: Tự động tạo default variant nếu không có variants
2. **Flash Sale**: Tự động chọn default variant nếu không chỉ định variantId
3. **Schema**: `FlashSaleProduct.variantId` giờ là required (không nullable)
4. **Migration**: Tạo default variant cho products hiện có

## Chi tiết thay đổi

### 1. Product Service (`product.service.ts`)

**Trước:**

```typescript
// Nếu không có variants → tạo product-level inventory
if (!variants) {
  await prisma.productInventory.create({
    data: {
      productId: product.id,
      variantId: null, // ❌ Product-level inventory
      quantity: dto.quantity,
    },
  });
}
```

**Sau:**

```typescript
// Luôn tạo ít nhất 1 variant
const variantsToCreate =
  dto.variants?.length > 0
    ? dto.variants
    : [
        {
          sku: `${productSku}-DEFAULT`,
          name: 'Mặc định',
          price: dto.basePrice,
          sortOrder: 0,
        },
      ];

// Tạo product với variants
await prisma.product.create({
  data: {
    ...productData,
    variants: {
      create: variantsToCreate,
    },
  },
});

// Tạo inventory cho tất cả variants (bao gồm default variant)
await prisma.productInventory.createMany({
  data: createdVariants.map((v) => ({
    productId: product.id,
    variantId: v.id, // ✅ Variant-level inventory
    quantity: getQuantityForVariant(v.sku),
  })),
});
```

### 2. Flash Sale Service (`flash-sale.service.ts`)

**Trước:**

```typescript
await prisma.flashSaleProduct.create({
  data: {
    flashSaleId: id,
    productId: dto.productId,
    variantId: dto.variantId, // ❌ Có thể null
    ...
  }
});
```

**Sau:**

```typescript
// Tự động lấy default variant nếu không có variantId
let variantId = dto.variantId;
if (!variantId) {
  const defaultVariant = await prisma.productVariant.findFirst({
    where: {
      productId: dto.productId,
      OR: [
        { sku: { endsWith: '-DEFAULT' } },
        { sortOrder: 0 }
      ]
    },
    orderBy: [
      { sku: 'asc' },
      { sortOrder: 'asc' }
    ]
  });

  if (!defaultVariant) {
    throw new Error('Product không có variant nào');
  }
  variantId = defaultVariant.id;
}

await prisma.flashSaleProduct.create({
  data: {
    flashSaleId: id,
    productId: dto.productId,
    variantId: variantId, // ✅ Luôn có giá trị
    ...
  }
});
```

### 3. Schema Changes (`flashsale.prisma`)

**Trước:**

```prisma
model FlashSaleProduct {
  variantId String? @map("variant_id")  // ❌ Nullable
  variant   ProductVariant? @relation(...)
}
```

**Sau:**

```prisma
model FlashSaleProduct {
  variantId String @map("variant_id")  // ✅ Required
  variant   ProductVariant @relation(...)
}
```

### 4. Migration SQL

File: `server/prisma/migrations/add-default-variants.sql`

Các bước:

1. Tạo default variants cho products chưa có variant
2. Migrate product-level inventory → variant-level inventory
3. Xóa product-level inventory cũ
4. Update flash sale products để reference default variant

## Cách sử dụng

### Tạo product mới

**Simple product (không có variants):**

```typescript
POST /api/admin/products
{
  "name": "Sản phẩm đơn giản",
  "sku": "SIMPLE-001",
  "basePrice": 100000,
  "quantity": 50,
  // Không cần truyền variants
}

// → Tự động tạo variant:
// {
//   sku: "SIMPLE-001-DEFAULT",
//   name: "Mặc định",
//   price: 100000
// }
```

**Product có variants:**

```typescript
POST /api/admin/products
{
  "name": "Áo thun",
  "sku": "SHIRT-001",
  "basePrice": 150000,
  "variants": [
    { sku: "SHIRT-001-RED-M", name: "Đỏ - M", price: 150000 },
    { sku: "SHIRT-001-RED-L", name: "Đỏ - L", price: 150000 }
  ]
}

// → Tạo 2 variants như bình thường
```

### Thêm product vào flash sale

**Không chỉ định variant (dùng default):**

```typescript
POST /api/admin/flash-sales/:id/products
{
  "productId": "product-uuid",
  // Không cần truyền variantId
  "flashPrice": 80000,
  "originalPrice": 100000,
  "maxQuantity": 100
}

// → Tự động dùng default variant
```

**Chỉ định variant cụ thể:**

```typescript
POST /api/admin/flash-sales/:id/products
{
  "productId": "product-uuid",
  "variantId": "variant-uuid", // ✅ Chỉ định variant
  "flashPrice": 120000,
  "originalPrice": 150000,
  "maxQuantity": 50
}
```

## Migration cho database hiện có

### Bước 1: Backup

```bash
pg_dump -U user -d database > backup.sql
```

### Bước 2: Chạy migration

```bash
psql -U user -d database -f server/prisma/migrations/add-default-variants.sql
```

### Bước 3: Generate Prisma client

```bash
cd server
npx prisma generate
```

### Bước 4: Restart server

```bash
npm run start:dev
```

## Testing checklist

- [ ] Tạo product mới không có variants → Có default variant
- [ ] Tạo product mới có variants → Hoạt động bình thường
- [ ] Products cũ đã có default variant sau migration
- [ ] Inventory đã migrate sang variant-level
- [ ] Thêm product vào flash sale không có variantId → Dùng default variant
- [ ] Thêm product vào flash sale có variantId → Hoạt động bình thường
- [ ] Tạo order với flash sale product → Hoạt động bình thường
- [ ] Cart với flash sale product → Hoạt động bình thường

## Lợi ích

1. **Đơn giản hóa logic**: Không cần handle trường hợp null variantId
2. **Consistency**: Mọi product đều có cùng structure
3. **Flash sale dễ dàng**: Có thể thêm bất kỳ product nào vào flash sale
4. **Order/Cart đơn giản**: Luôn có variantId để reference
5. **Inventory management**: Thống nhất ở variant-level

## Lưu ý

1. **Default variant naming**: SKU có suffix `-DEFAULT` để dễ identify
2. **Backward compatibility**: API vẫn cho phép không truyền variantId
3. **Frontend**: Có thể cần update UI để hiển thị/ẩn default variant
4. **Performance**: Không ảnh hưởng đáng kể (chỉ thêm 1 variant cho simple products)
5. **Data integrity**: Migration đảm bảo không mất dữ liệu inventory

## Migration cho database hiện có

### Option 1: Sử dụng Migration API (Recommended)

**Bước 1: Check status**

```bash
GET /api/system/migration/default-variants/status
Authorization: Bearer {ADMIN_TOKEN}
```

**Bước 2: Backup database**

```bash
pg_dump -U user -d database > backup_$(date +%Y%m%d_%H%M%S).sql
```

**Bước 3: Run migration**

```bash
POST /api/system/migration/default-variants
Authorization: Bearer {ADMIN_TOKEN}
```

**Bước 4: Verify**

```bash
GET /api/system/migration/default-variants/status
# Kết quả: needsMigration: false
```

Chi tiết xem: [Migration API Guide](./migration-api-guide.md)

### Option 2: Sử dụng SQL Script (Alternative)

**Bước 1: Backup**

```bash
pg_dump -U user -d database > backup.sql
```

**Bước 2: Chạy migration**

```bash
psql -U user -d database -f server/prisma/migrations/add-default-variants.sql
```

**Bước 3: Generate Prisma client**

```bash
cd server
npx prisma generate
```

**Bước 4: Restart server**

```bash
npm run start:dev
```

## Rollback

Nếu cần rollback:

```bash
# Restore database
psql -U user -d database < backup.sql

# Revert code
git revert <commit-hash>

# Regenerate Prisma client
cd server
npx prisma generate
```
