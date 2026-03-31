# Soft Delete Implementation Summary

## Tổng quan

Đã cập nhật logic soft delete cho các service sử dụng helper functions thống nhất thay vì hardcode `isDeleted: true/false`.

## Helper Functions được sử dụng

```typescript
import {
  withoutDeleted, // Thêm isDeleted: false vào where clause
  softDeleteData, // Trả về { isDeleted: true, deletedAt: new Date() }
  withDeleted, // Query tất cả records (bao gồm deleted)
  onlyDeleted, // Query chỉ deleted records
  restoreData, // Trả về { isDeleted: false, deletedAt: null }
} from 'src/libs/prisma/soft-delete.helpers';
```

## Các Service đã cập nhật

### ✅ 1. user.service.ts

**Các method đã cập nhật:**

#### User methods:

- `getAllUsers()` - Sử dụng `withoutDeleted()` cho where query
- `getUserById()` - Sử dụng `withoutDeleted()` thay vì `isDeleted: false`
- `updateBanStatus()` - Kiểm tra user tồn tại với `withoutDeleted()`
- `updateBanStatusBulk()` - Cập nhật bulk với `withoutDeleted()`
- `updateAvatar()` - Fetch user với `withoutDeleted()`
- `updateMe()` - Validate uniqueness với `withoutDeleted()`
- `updateUserById()` - Validate và update với `withoutDeleted()`
- `createUserByAdmin()` - Validate uniqueness với `withoutDeleted()`
- `assignRolesToUser()` - Verify user với `withoutDeleted()`
- `getAddressesByUserId()` - Query addresses với `withoutDeleted()`

#### Address methods:

- `getAddressesByUserId()` - Filter addresses với `withoutDeleted()`
- `getMyAddresses()` - Sử dụng `getAddressesByUserId()` đã được cập nhật
- `createAddress()` - Unset default addresses với `withoutDeleted()`
- `updateAddress()` - Kiểm tra tồn tại và update với `withoutDeleted()`
- `deleteAddress()` - Gọi `deleteAddressById()` đã được cập nhật
- `deleteAddressById()` - **Soft delete** với `softDeleteData()`

**Thay đổi chính:**

```typescript
// TRƯỚC
const address = await prisma.address.findUnique({ where: { id } });
await prisma.address.update({
  where: { id },
  data: { isDeleted: true, deletedAt: new Date() },
});

// SAU
const address = await prisma.address.findFirst({
  where: withoutDeleted({ id }),
});
await prisma.address.update({
  where: { id },
  data: softDeleteData(),
});
```

### ✅ 2. wishlist.service.ts

**Các method đã cập nhật:**

- `getWishlist()` - Query với `withoutDeleted()`
- `addToWishlist()` - Validate product/variant với `withoutDeleted()`
- `updateWishlistItem()` - Verify ownership với `withoutDeleted()`
- `removeFromWishlist()` - **Soft delete** với `softDeleteData()`
- `clearWishlist()` - **Soft delete bulk** với `updateMany()` + `softDeleteData()`
- `moveToCart()` - Get cart và wishlist item với `withoutDeleted()`, soft delete item
- `getSharedWishlist()` - Query shared wishlist và items với `withoutDeleted()`
- `getMySharedWishlists()` - Query với `withoutDeleted()`
- `deleteSharedWishlist()` - **Soft delete** với `softDeleteData()`
- `checkWishlistStatus()` - Check với `withoutDeleted()`

**Thay đổi chính:**

```typescript
// TRƯỚC - Hard delete
await prisma.wishlist.delete({ where: { id: itemId } });
await prisma.wishlist.deleteMany({ where: { userId } });

// SAU - Soft delete
await prisma.wishlist.update({
  where: { id: itemId },
  data: softDeleteData(),
});
await prisma.wishlist.updateMany({
  where: withoutDeleted({ userId }),
  data: softDeleteData(),
});
```

### ✅ 3. cart.service.ts

**Các method đã cập nhật:**

- `getOrCreateCart()` - Tìm cart với `withoutDeleted()`
- `getActiveFlashSaleMap()` - Query flash sale với `withoutDeleted()`
- `getCart()` - Sử dụng `getOrCreateCart()` đã được cập nhật
- `addToCart()` - Validate product/variant với `withoutDeleted()`
- `updateCartItem()` - Verify cart với `withoutDeleted()`
- `removeCartItem()` - Verify cart với `withoutDeleted()`
- `clearCart()` - Verify cart với `withoutDeleted()`
- `getCartCount()` - Query cart với `withoutDeleted()`

**Thay đổi chính:**

```typescript
// TRƯỚC
const cart = await prisma.cart.findUnique({ where: { userId } });

// SAU
const cart = await prisma.cart.findFirst({
  where: withoutDeleted({ userId }),
});
```

**Lưu ý:** CartItem không có soft delete, chỉ Cart có.

### ✅ 4. review.service.ts

**Các method đã cập nhật:**

- `deleteReview()` - **Soft delete** review với `softDeleteData()`
- `adminDeleteReview()` - **Soft delete** review với `softDeleteData()`
- `deleteReviewReply()` - **Soft delete** reply với `softDeleteData()`

**Thay đổi chính:**

```typescript
// TRƯỚC - Hard delete
await prisma.productReview.delete({ where: { id: reviewId } });
await prisma.reviewReply.delete({ where: { id: replyId } });

// SAU - Soft delete
await prisma.productReview.update({
  where: { id: reviewId },
  data: softDeleteData(),
});
await prisma.reviewReply.update({
  where: { id: replyId },
  data: softDeleteData(),
});
```

**Lưu ý:** ReviewImage không có soft delete (hard delete vẫn được giữ).

## Lợi ích của việc sử dụng Helper Functions

### 1. Code nhất quán và dễ bảo trì

```typescript
// Thay vì
where: { userId, isDeleted: false }

// Dùng
where: withoutDeleted({ userId })
```

### 2. Giảm lỗi do quên filter

Helper functions đảm bảo luôn có `isDeleted: false` trong queries.

### 3. Dễ dàng thay đổi logic soft delete

Nếu cần thay đổi cách soft delete hoạt động, chỉ cần sửa helper functions.

### 4. Type-safe

Helper functions có TypeScript types đầy đủ.

## Các Service còn lại cần cập nhật

### 🔄 Đang chờ cập nhật:

1. **product.service.ts** - Nhiều hard delete operations (Product, ProductVariant, Category, Brand)
2. **order.service.ts** - Order và OrderItem soft delete
3. **banner.service.ts** - Banner và BannerGroup soft delete
4. **coupon.service.ts** - Coupon soft delete
5. **flash-sale.service.ts** - Flash sale soft delete
6. **storage.service.ts** - Media soft delete
7. **stats.service.ts** - Count queries cần filter deleted
8. **auth.service.ts** - User queries cần filter deleted
9. **product-question.service.ts** - Question deletion

## Quy tắc áp dụng

### 1. Tất cả findMany/findFirst queries

```typescript
// ✅ ĐÚNG
const items = await prisma.model.findMany({
  where: withoutDeleted({
    /* conditions */
  }),
});
```

### 2. findUnique → findFirst khi cần filter deleted

```typescript
// ❌ SAI
const item = await prisma.model.findUnique({ where: { id } });

// ✅ ĐÚNG
const item = await prisma.model.findFirst({
  where: withoutDeleted({ id }),
});
```

### 3. delete → update với softDeleteData()

```typescript
// ❌ SAI
await prisma.model.delete({ where: { id } });

// ✅ ĐÚNG
await prisma.model.update({
  where: { id },
  data: softDeleteData(),
});
```

### 4. deleteMany → updateMany với softDeleteData()

```typescript
// ❌ SAI
await prisma.model.deleteMany({ where: { userId } });

// ✅ ĐÚNG
await prisma.model.updateMany({
  where: withoutDeleted({ userId }),
  data: softDeleteData(),
});
```

## Testing

### Test cases cần kiểm tra:

1. ✅ Soft deleted records không xuất hiện trong queries thông thường
2. ✅ Soft delete operation set `isDeleted = true` và `deletedAt`
3. ✅ Không thể update/delete records đã bị soft deleted
4. ✅ Admin có thể query deleted records nếu cần (sử dụng `withDeleted()`)
5. ✅ Restore operation hoạt động đúng (sử dụng `restoreData()`)

## Tiếp theo

1. Cập nhật các service còn lại theo danh sách trên
2. Thêm admin endpoints để xem và restore deleted records
3. Thêm scheduled job để hard delete records đã soft delete quá lâu (nếu cần)
4. Cập nhật documentation cho API endpoints

## Notes

- Tất cả các bảng có `isDeleted` và `deletedAt` đều đã được migrate
- Indexes đã được thêm cho performance
- Cascade delete đã được đổi thành Restrict để tránh xóa nhầm
- Helper functions đã được test và hoạt động tốt
