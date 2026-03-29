# Soft Delete Implementation Guide

## Tổng quan

Thay vì sử dụng Prisma middleware (có vấn đề về type), chúng ta xử lý soft delete thủ công trong từng service bằng cách:

1. Thêm `isDeleted: false` vào tất cả queries
2. Sử dụng `update` thay vì `delete` để soft delete
3. Sử dụng helper functions để đơn giản hóa code

## Helper Functions

File: `server/src/libs/prisma/soft-delete.helpers.ts`

### 1. `withoutDeleted(where?)`

Thêm filter `isDeleted: false` vào where clause.

```typescript
import { withoutDeleted } from 'src/libs/prisma/soft-delete.helpers';

// Sử dụng
const users = await prisma.user.findMany({
  where: withoutDeleted({ email: 'test@example.com' }),
});

// Tương đương với:
const users = await prisma.user.findMany({
  where: {
    email: 'test@example.com',
    isDeleted: false,
  },
});
```

### 2. `withDeleted(where?)`

Query tất cả records bao gồm cả deleted.

```typescript
import { withDeleted } from 'src/libs/prisma/soft-delete.helpers';

// Query tất cả users kể cả deleted
const allUsers = await prisma.user.findMany({
  where: withDeleted({ email: 'test@example.com' }),
});
```

### 3. `onlyDeleted(where?)`

Query chỉ các records đã bị deleted.

```typescript
import { onlyDeleted } from 'src/libs/prisma/soft-delete.helpers';

// Query chỉ users đã bị xóa
const deletedUsers = await prisma.user.findMany({
  where: onlyDeleted({ email: 'test@example.com' }),
});
```

### 4. `softDeleteData()`

Trả về data object để soft delete.

```typescript
import { softDeleteData } from 'src/libs/prisma/soft-delete.helpers';

// Soft delete user
await prisma.user.update({
  where: { id: userId },
  data: softDeleteData(),
});

// Tương đương với:
await prisma.user.update({
  where: { id: userId },
  data: {
    isDeleted: true,
    deletedAt: new Date(),
  },
});
```

### 5. `restoreData()`

Trả về data object để restore record đã xóa.

```typescript
import { restoreData } from 'src/libs/prisma/soft-delete.helpers';

// Restore user
await prisma.user.update({
  where: { id: userId },
  data: restoreData(),
});

// Tương đương với:
await prisma.user.update({
  where: { id: userId },
  data: {
    isDeleted: false,
    deletedAt: null,
  },
});
```

## Quy tắc sử dụng

### 1. Tất cả findMany/findFirst queries

**PHẢI** thêm `isDeleted: false`:

```typescript
// ❌ SAI - Không filter deleted records
const users = await prisma.user.findMany({
  where: { email: 'test@example.com' },
});

// ✅ ĐÚNG - Filter deleted records
const users = await prisma.user.findMany({
  where: {
    email: 'test@example.com',
    isDeleted: false,
  },
});

// ✅ ĐÚNG - Sử dụng helper
const users = await prisma.user.findMany({
  where: withoutDeleted({ email: 'test@example.com' }),
});
```

### 2. findUnique queries

Thay `findUnique` bằng `findFirst` và thêm `isDeleted: false`:

```typescript
// ❌ SAI - findUnique không thể filter isDeleted
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// ✅ ĐÚNG - Dùng findFirst với isDeleted filter
const user = await prisma.user.findFirst({
  where: {
    id: userId,
    isDeleted: false,
  },
});
```

**Lưu ý**: `findUnique` chỉ hoạt động với unique fields (id, email, phone, username). Nếu cần filter thêm `isDeleted`, phải dùng `findFirst`.

### 3. count queries

**PHẢI** thêm `isDeleted: false`:

```typescript
// ❌ SAI
const count = await prisma.user.count({
  where: { isActive: true },
});

// ✅ ĐÚNG
const count = await prisma.user.count({
  where: {
    isActive: true,
    isDeleted: false,
  },
});
```

### 4. Delete operations

Thay `delete` bằng `update` với soft delete data:

```typescript
// ❌ SAI - Hard delete
await prisma.user.delete({
  where: { id: userId },
});

// ✅ ĐÚNG - Soft delete
await prisma.user.update({
  where: { id: userId },
  data: {
    isDeleted: true,
    deletedAt: new Date(),
  },
});

// ✅ ĐÚNG - Sử dụng helper
await prisma.user.update({
  where: { id: userId },
  data: softDeleteData(),
});
```

### 5. deleteMany operations

Thay `deleteMany` bằng `updateMany`:

```typescript
// ❌ SAI - Hard delete
await prisma.user.deleteMany({
  where: { isActive: false },
});

// ✅ ĐÚNG - Soft delete
await prisma.user.updateMany({
  where: { isActive: false },
  data: {
    isDeleted: true,
    deletedAt: new Date(),
  },
});

// ✅ ĐÚNG - Sử dụng helper
await prisma.user.updateMany({
  where: { isActive: false },
  data: softDeleteData(),
});
```

## Các models hỗ trợ soft delete

Các models sau có `isDeleted` và `deletedAt`:

- User
- Product
- ProductVariant
- Category
- Brand
- Media
- Order
- OrderItem
- Cart
- Payment
- ProductReview
- ReviewReply
- FlashSale
- Banner
- BannerGroup
- Promotion
- Coupon
- Address
- Wishlist
- SharedWishlist
- Affiliate
- AffiliateLink
- AffiliateCommission
- CommissionRate
- UserRole

## Ví dụ thực tế

### User Service

```typescript
// Get all active users (exclude deleted)
async getAllUsers() {
  return await this.prisma.user.findMany({
    where: {
      isDeleted: false, // Always add this
      isActive: true,
    },
  });
}

// Get user by ID (exclude deleted)
async getUserById(id: string) {
  return await this.prisma.user.findFirst({
    where: {
      id,
      isDeleted: false, // Always add this
    },
  });
}

// Soft delete user
async deleteUser(id: string) {
  return await this.prisma.user.update({
    where: { id },
    data: softDeleteData(),
  });
}

// Restore deleted user (Admin only)
async restoreUser(id: string) {
  return await this.prisma.user.update({
    where: { id },
    data: restoreData(),
  });
}

// Get all users including deleted (Admin only)
async getAllUsersIncludingDeleted() {
  return await this.prisma.user.findMany({
    // Don't add isDeleted filter
  });
}

// Get only deleted users (Admin only)
async getDeletedUsers() {
  return await this.prisma.user.findMany({
    where: {
      isDeleted: true,
    },
  });
}
```

### Product Service

```typescript
// Get active products
async getProducts() {
  return await this.prisma.product.findMany({
    where: {
      isDeleted: false,
      isActive: true,
    },
    include: {
      variants: {
        where: {
          isDeleted: false, // Also filter variants
        },
      },
    },
  });
}

// Soft delete product and its variants
async deleteProduct(id: string) {
  await this.prisma.$transaction([
    // Soft delete product
    this.prisma.product.update({
      where: { id },
      data: softDeleteData(),
    }),
    // Soft delete all variants
    this.prisma.productVariant.updateMany({
      where: { productId: id },
      data: softDeleteData(),
    }),
  ]);
}
```

### Order Service

```typescript
// Get user orders (exclude deleted)
async getUserOrders(userId: string) {
  return await this.prisma.order.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    include: {
      items: {
        where: {
          isDeleted: false, // Also filter order items
        },
      },
    },
  });
}

// Cancel order (soft delete)
async cancelOrder(id: string) {
  return await this.prisma.order.update({
    where: { id },
    data: {
      status: 'CANCELLED',
      ...softDeleteData(),
    },
  });
}
```

## Testing

### Test soft delete

```typescript
describe('Soft Delete', () => {
  it('should soft delete user', async () => {
    const user = await prisma.user.create({
      data: {
        /* ... */
      },
    });

    // Soft delete
    await prisma.user.update({
      where: { id: user.id },
      data: softDeleteData(),
    });

    // Should not find with normal query
    const found = await prisma.user.findFirst({
      where: { id: user.id, isDeleted: false },
    });
    expect(found).toBeNull();

    // Should find with deleted query
    const deleted = await prisma.user.findFirst({
      where: { id: user.id, isDeleted: true },
    });
    expect(deleted).toBeDefined();
    expect(deleted.deletedAt).toBeDefined();
  });

  it('should restore deleted user', async () => {
    // ... soft delete user first

    // Restore
    await prisma.user.update({
      where: { id: user.id },
      data: restoreData(),
    });

    // Should find with normal query
    const found = await prisma.user.findFirst({
      where: { id: user.id, isDeleted: false },
    });
    expect(found).toBeDefined();
    expect(found.deletedAt).toBeNull();
  });
});
```

## Migration từ hard delete sang soft delete

Nếu code cũ đang dùng hard delete:

```typescript
// Trước (hard delete)
await prisma.user.delete({ where: { id } });

// Sau (soft delete)
await prisma.user.update({
  where: { id },
  data: softDeleteData(),
});
```

## Lưu ý quan trọng

1. **Luôn thêm `isDeleted: false`** vào tất cả queries (trừ khi cần query deleted records)
2. **Không dùng `delete` hoặc `deleteMany`** - dùng `update`/`updateMany` với `softDeleteData()`
3. **Dùng `findFirst` thay vì `findUnique`** khi cần filter `isDeleted`
4. **Filter cascade**: Khi include relations, cũng phải filter `isDeleted` cho relations
5. **Admin features**: Cung cấp UI để admin xem và restore deleted records

## Performance

### Indexes

Đã thêm indexes cho `isDeleted` trong migration:

```sql
CREATE INDEX idx_users_is_deleted ON users(is_deleted) WHERE is_deleted = false;
CREATE INDEX idx_products_is_deleted ON products(is_deleted) WHERE is_deleted = false;
-- ... other tables
```

### Query optimization

```typescript
// ✅ GOOD - Index được sử dụng
const users = await prisma.user.findMany({
  where: { isDeleted: false },
});

// ⚠️ OK - Nhưng không tối ưu bằng
const users = await prisma.user.findMany({
  where: {
    OR: [{ isDeleted: false }, { isDeleted: null }],
  },
});
```

## Troubleshooting

### Vấn đề: Query trả về deleted records

**Nguyên nhân**: Quên thêm `isDeleted: false`

**Giải pháp**: Kiểm tra lại where clause

### Vấn đề: findUnique không hoạt động với isDeleted

**Nguyên nhân**: `findUnique` chỉ hoạt động với unique constraints

**Giải pháp**: Dùng `findFirst` thay vì `findUnique`

### Vấn đề: Cascade delete không hoạt động

**Nguyên nhân**: Đã đổi từ `Cascade` sang `Restrict`

**Giải pháp**: Phải soft delete child records trước, hoặc dùng transaction để soft delete cả parent và children

```typescript
await prisma.$transaction([
  prisma.orderItem.updateMany({
    where: { orderId: id },
    data: softDeleteData(),
  }),
  prisma.order.update({
    where: { id },
    data: softDeleteData(),
  }),
]);
```
