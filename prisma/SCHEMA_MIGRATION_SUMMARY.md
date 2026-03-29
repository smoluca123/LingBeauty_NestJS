# Schema Migration Summary

## Ngày thực hiện: 2026-03-29

## Mục tiêu

Cải thiện tính toàn vẹn dữ liệu và dễ dàng migration/dump database bằng cách:

1. Thay đổi `onDelete: Cascade` → `onDelete: Restrict` cho các bảng quan trọng
2. Thêm soft delete (`isDeleted`, `deletedAt`) cho tất cả bảng chính
3. Tách riêng User avatar thành bảng riêng để tránh circular dependency với Media

---

## 1. Thay đổi onDelete Policy

### Từ Cascade → Restrict

**Lý do**: Cascade delete có thể gây mất dữ liệu quan trọng không mong muốn. Restrict đảm bảo phải xử lý dữ liệu liên quan trước khi xóa.

#### Các bảng đã thay đổi:

**User Relations:**

- `User` → `Cart`: Cascade → Restrict
- `User` → `Address`: Cascade → Restrict
- `User` → `Affiliate`: Cascade → Restrict
- `User` → `Order`: Không có onDelete → Restrict
- `User` → `ProductReview`: Cascade → Restrict
- `User` → `ReviewReply`: Cascade → Restrict
- `User` → `ReviewHelpful`: Cascade → Restrict
- `User` → `Wishlist`: Cascade → Restrict
- `User` → `SharedWishlist`: Cascade → Restrict
- `User` → `ProductQuestion`: Cascade → Restrict
- `User` → `EmailVerificationLog`: Cascade → Restrict
- `UserRoleAssignment` → `User`: Cascade → Restrict
- `UserRoleAssignment` → `UserRole`: Cascade → Restrict

**Product Relations:**

- `Product` → `ProductVariant`: Cascade → Restrict
- `Product` → `ProductImage`: Cascade → Restrict
- `Product` → `ProductInventory`: Cascade → Restrict
- `Product` → `ProductCategory`: Cascade → Restrict
- `Product` → `ProductQuestion`: Cascade → Restrict
- `Product` → `ProductReview`: Cascade → Restrict
- `Product` → `OrderItem`: Cascade → Restrict
- `Product` → `CartItem`: Cascade → Restrict
- `Product` → `Wishlist`: Cascade → Restrict
- `Product` → `FlashSaleProduct`: Cascade → Restrict
- `Product` → `PromotionProduct`: Cascade → Restrict
- `Product` → `CommissionRate`: Cascade → Restrict

**ProductVariant Relations:**

- `ProductVariant` → `ProductImage`: Cascade → Restrict
- `ProductVariant` → `OrderItem`: Không có onDelete → Restrict
- `ProductVariant` → `CartItem`: Cascade → Restrict
- `ProductVariant` → `Wishlist`: Cascade → Restrict
- `ProductVariant` → `FlashSaleProduct`: Cascade → Restrict

**Category & Brand:**

- `Category` → `ProductCategory`: Cascade → Restrict
- `Category` → `Media` (imageMedia): SetNull → Restrict
- `Brand` → `Media` (logoMedia): SetNull → Restrict

**Media Relations:**

- `Media` → `ProductImage`: Cascade → Restrict
- `Media` → `ReviewImage`: Cascade → Restrict
- `Media` → `Banner`: SetNull → Restrict

**Order Relations:**

- `Order` → `OrderItem`: Cascade → Restrict
- `Order` → `Payment`: Cascade → Restrict
- `Order` → `AffiliateCommission`: Cascade → Restrict
- `Order` → `CouponUsage`: Cascade → Restrict
- `Order` → `FlashSaleOrder`: Cascade → Restrict

**Review Relations:**

- `ProductReview` → `ReviewImage`: Cascade → Restrict
- `ProductReview` → `ReviewReply`: Cascade → Restrict
- `ProductReview` → `ReviewHelpful`: Cascade → Restrict

**Cart Relations:**

- `Cart` → `CartItem`: Không thay đổi (giữ Cascade vì cart items không quan trọng)

**FlashSale Relations:**

- `FlashSale` → `FlashSaleProduct`: Cascade → Restrict
- `FlashSale` → `FlashSaleOrder`: Cascade → Restrict

**Banner Relations:**

- `Banner` → `BannerGroupMapping`: Cascade → Restrict
- `BannerGroup` → `BannerGroupMapping`: Cascade → Restrict

**Promotion Relations:**

- `Promotion` → `PromotionProduct`: Cascade → Restrict
- `Coupon` → `CouponUsage`: Cascade → Restrict

**Affiliate Relations:**

- `Affiliate` → `AffiliateLink`: Cascade → Restrict
- `Affiliate` → `AffiliateCommission`: Cascade → Restrict

---

## 2. Thêm Soft Delete

### Các trường đã thêm:

- `isDeleted Boolean @default(false)`
- `deletedAt DateTime?`
- Index trên `isDeleted` để tối ưu query

### Các bảng đã thêm soft delete:

#### Core Tables:

- ✅ `User` (đã có `isDeleted`, thêm `deletedAt`)
- ✅ `Product`
- ✅ `ProductVariant`
- ✅ `Category`
- ✅ `Brand`
- ✅ `Media` (đã có `isDeleted`, thêm `deletedAt`)

#### Order & Payment:

- ✅ `Order`
- ✅ `OrderItem`
- ✅ `Cart`
- ✅ `Payment`

#### Review & Rating:

- ✅ `ProductReview`
- ✅ `ReviewReply`

#### Marketing:

- ✅ `FlashSale`
- ✅ `Banner`
- ✅ `BannerGroup`
- ✅ `Promotion`
- ✅ `Coupon`

#### User Data:

- ✅ `Address`
- ✅ `Wishlist`
- ✅ `SharedWishlist`

#### Affiliate:

- ✅ `Affiliate`
- ✅ `AffiliateLink`
- ✅ `AffiliateCommission`
- ✅ `CommissionRate`

#### System:

- ✅ `UserRole`

### Các bảng KHÔNG cần soft delete:

- `CartItem` - Dữ liệu tạm thời
- `ProductImage` - Metadata, không cần lưu lịch sử
- `ReviewImage` - Metadata
- `ReviewHelpful` - Interaction data
- `ProductCategory` - Junction table
- `ProductInventory` - Real-time data
- `ProductStats` - Aggregated data
- `DailyStats` - Aggregated data
- `BannerGroupMapping` - Junction table
- `PromotionProduct` - Junction table
- `CouponUsage` - Transaction record
- `FlashSaleProduct` - Campaign data
- `FlashSaleOrder` - Transaction record
- `ProductQuestion` - Có thể xem xét thêm sau
- `EmailVerificationLog` - Audit log
- `AuthCode` - Temporary data
- `UserRoleAssignment` - Junction table

---

## 3. Tách User Avatar

### Vấn đề cũ:

```prisma
// User model
model User {
  avatarMediaId String?
  avatarMedia   Media? @relation("UserAvatar", ...)
  uploadedMedia Media[] @relation("UserUploadedMedia")
}

// Media model
model Media {
  uploadedById String?
  uploadedBy   User? @relation("UserUploadedMedia", ...)
  userAvatars  User[] @relation("UserAvatar")
}
```

**Vấn đề**: Circular dependency - User phụ thuộc Media, Media phụ thuộc User

### Giải pháp mới:

```prisma
// User model - Loại bỏ avatarMediaId
model User {
  avatar        UserAvatar?
  uploadedMedia Media[] @relation("UserUploadedMedia")
}

// Bảng mới - UserAvatar
model UserAvatar {
  id        String   @id @default(uuid())
  userId    String   @unique
  mediaId   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  media Media @relation("UserAvatarMedia", fields: [mediaId], references: [id], onDelete: Restrict)
}

// Media model - Thay đổi relation
model Media {
  uploadedBy  User? @relation("UserUploadedMedia", ...)
  userAvatars UserAvatar[] @relation("UserAvatarMedia")
}
```

**Lợi ích**:

- ✅ Loại bỏ circular dependency
- ✅ Dễ dàng migration/dump database
- ✅ Có thể thêm metadata cho avatar (upload date, version, etc.)
- ✅ Dễ dàng track lịch sử thay đổi avatar

---

## 4. Migration Steps

### Bước 1: Backup Database

```bash
pg_dump -U postgres -d lingbeauty > backup_before_migration.sql
```

### Bước 2: Tạo Migration

```bash
cd server
npx prisma migrate dev --name schema_improvements_restrict_and_soft_delete
```

### Bước 3: Data Migration cho UserAvatar

Cần tạo script migration để chuyển dữ liệu từ `User.avatarMediaId` sang bảng `UserAvatar`:

```sql
-- Migration script
INSERT INTO user_avatars (id, user_id, media_id, created_at, updated_at)
SELECT
  gen_random_uuid(),
  id as user_id,
  avatar_media_id as media_id,
  NOW() as created_at,
  NOW() as updated_at
FROM users
WHERE avatar_media_id IS NOT NULL;

-- Sau khi migrate xong, có thể drop column (optional)
-- ALTER TABLE users DROP COLUMN avatar_media_id;
```

### Bước 4: Update Application Code

Cần update code ở các nơi sử dụng `user.avatarMedia`:

**Trước:**

```typescript
const user = await prisma.user.findUnique({
  where: { id },
  include: { avatarMedia: true },
});
const avatarUrl = user.avatarMedia?.url;
```

**Sau:**

```typescript
const user = await prisma.user.findUnique({
  where: { id },
  include: {
    avatar: {
      include: { media: true },
    },
  },
});
const avatarUrl = user.avatar?.media?.url;
```

### Bước 5: Update Soft Delete Queries

Thêm filter `isDeleted: false` vào tất cả queries:

```typescript
// Trước
const products = await prisma.product.findMany();

// Sau
const products = await prisma.product.findMany({
  where: { isDeleted: false },
});
```

Hoặc sử dụng Prisma middleware để tự động filter:

```typescript
prisma.$use(async (params, next) => {
  if (params.action === 'findMany' || params.action === 'findFirst') {
    params.args.where = {
      ...params.args.where,
      isDeleted: false,
    };
  }
  return next(params);
});
```

---

## 5. Breaking Changes & Cần Lưu Ý

### ⚠️ Breaking Changes:

1. **User Avatar Access Pattern Changed**
   - Cần update tất cả code truy cập `user.avatarMedia`
   - API responses có thể thay đổi structure

2. **Delete Operations**
   - Không thể xóa trực tiếp các entity có foreign key references
   - Phải xóa/update child records trước
   - Hoặc implement soft delete thay vì hard delete

3. **Query Performance**
   - Cần thêm `isDeleted: false` vào queries
   - Có thể ảnh hưởng performance nếu không có index

### 🔍 Cần Test Kỹ:

1. User registration/login flow
2. Product CRUD operations
3. Order creation/cancellation
4. Review submission
5. Cart operations
6. Avatar upload/update
7. Admin delete operations
8. Data export/import

---

## 6. Rollback Plan

Nếu có vấn đề, rollback bằng cách:

```bash
# Restore database từ backup
psql -U postgres -d lingbeauty < backup_before_migration.sql

# Revert Prisma schema
git checkout HEAD~1 server/prisma/schema/

# Regenerate Prisma client
cd server
npx prisma generate
```

---

## 7. Next Steps (Đề xuất cho tương lai)

1. **Implement Audit Trail**
   - Track who deleted what and when
   - Store deletion reason

2. **Add Restore Functionality**
   - Admin UI để restore soft-deleted records
   - Bulk restore operations

3. **Archive Old Data**
   - Move old soft-deleted records to archive tables
   - Keep main tables clean

4. **Optimize Queries**
   - Create filtered indexes: `CREATE INDEX idx_products_active ON products(id) WHERE is_deleted = false;`
   - Use database views for active records

5. **Add Cascade Soft Delete**
   - Khi soft delete Product, tự động soft delete các ProductVariant
   - Implement ở application layer hoặc database triggers

---

## Tổng Kết

✅ Đã thay đổi 50+ foreign key constraints từ Cascade sang Restrict
✅ Đã thêm soft delete cho 20+ bảng chính
✅ Đã tách UserAvatar thành bảng riêng, loại bỏ circular dependency
✅ Database giờ đây an toàn hơn và dễ migration hơn

**Lưu ý quan trọng**: Cần test kỹ và update application code trước khi deploy lên production!
