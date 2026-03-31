# Soft Delete Migration Plan

## Mục tiêu

Cập nhật tất cả các service để sử dụng soft delete helpers một cách nhất quán thay vì hardcode `isDeleted: true/false`.

## Các helper functions cần sử dụng

```typescript
import {
  withoutDeleted, // Thêm isDeleted: false vào where
  withDeleted, // Query tất cả (bao gồm deleted)
  onlyDeleted, // Query chỉ deleted records
  softDeleteData, // Data để soft delete
  restoreData, // Data để restore
} from 'src/libs/prisma/soft-delete.helpers';
```

## Quy tắc chuyển đổi

### 1. findMany/findFirst với isDeleted: false

```typescript
// TRƯỚC
const users = await prisma.user.findMany({
  where: {
    email: 'test@example.com',
    isDeleted: false,
  },
});

// SAU
const users = await prisma.user.findMany({
  where: withoutDeleted({
    email: 'test@example.com',
  }),
});
```

### 2. findUnique → findFirst với soft delete

```typescript
// TRƯỚC
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// SAU (nếu cần filter deleted)
const user = await prisma.user.findFirst({
  where: withoutDeleted({ id: userId }),
});
```

### 3. Soft delete operation

```typescript
// TRƯỚC
await prisma.user.update({
  where: { id: userId },
  data: {
    isDeleted: true,
    deletedAt: new Date(),
  },
});

// SAU
await prisma.user.update({
  where: { id: userId },
  data: softDeleteData(),
});
```

### 4. Restore operation

```typescript
// TRƯỚC
await prisma.user.update({
  where: { id: userId },
  data: {
    isDeleted: false,
    deletedAt: null,
  },
});

// SAU
await prisma.user.update({
  where: { id: userId },
  data: restoreData(),
});
```

## Danh sách service cần cập nhật

### ✅ Đã hoàn thành

- [x] user.service.ts - Address methods (đã cập nhật)

### 🔄 Đang cần cập nhật

#### 1. user.service.ts - User methods

- [ ] getAllUsers() - line 74
- [ ] getUserById() - line 131
- [ ] updateBanStatus() - line 160
- [ ] updateBanStatusBulk() - line 207, 219
- [ ] updateAvatar() - line 283
- [ ] updateMe() - line 312, 328, 343, 358
- [ ] updateUserById() - line 422, 438, 453, 468
- [ ] getAddressesByUserId() - line 571 (đã cập nhật)
- [ ] createUserByAdmin() - line 932, 947, 962
- [ ] assignRolesToUser() - line 1056

#### 2. auth.service.ts

- [ ] Kiểm tra và cập nhật các query với isDeleted

#### 3. storage.service.ts

- [ ] getMediaById() - line 152

#### 4. stats.service.ts

- [ ] Các count queries - line 96, 407

#### 5. Các service khác cần kiểm tra

- [ ] product.service.ts
- [ ] category.service.ts
- [ ] brand.service.ts
- [ ] order.service.ts
- [ ] cart.service.ts
- [ ] review.service.ts
- [ ] wishlist.service.ts
- [ ] banner.service.ts
- [ ] coupon.service.ts
- [ ] flash-sale.service.ts

## Tiến độ

- Đã hoàn thành: 1/15+ services
- Đang thực hiện: user.service.ts (Address methods)
- Tiếp theo: user.service.ts (User methods)
