# Soft Delete Implementation Progress

## Tổng quan

Đang trong quá trình cập nhật tất cả các service để sử dụng soft delete helpers thống nhất.

## ✅ Đã hoàn thành (4/15+ services)

### 1. ✅ user.service.ts

- **User methods**: 10+ methods đã cập nhật
- **Address methods**: 6 methods đã cập nhật
- **Status**: Hoàn thành 100%

### 2. ✅ wishlist.service.ts

- **Methods**: 10+ methods đã cập nhật
- **Soft delete**: Wishlist items, SharedWishlist
- **Status**: Hoàn thành 100%

### 3. ✅ cart.service.ts

- **Methods**: 8 methods đã cập nhật
- **Note**: CartItem không có soft delete, chỉ Cart có
- **Status**: Hoàn thành 100%

### 4. ✅ review.service.ts

- **Methods**: 3 methods đã cập nhật (deleteReview, adminDeleteReview, deleteReviewReply)
- **Note**: ReviewImage không có soft delete (hard delete)
- **Status**: Hoàn thành các delete methods

## 🔄 Đang cần cập nhật (11+ services)

### Priority 1 - Critical Services

#### 1. product.service.ts

**Ước tính**: 20+ methods cần cập nhật

- [ ] Product CRUD với soft delete
- [ ] ProductVariant CRUD với soft delete
- [ ] Category CRUD với soft delete
- [ ] Brand CRUD với soft delete
- [ ] Filter queries với `withoutDeleted()`
- [ ] Hard delete → Soft delete conversion

#### 2. order.service.ts

**Ước tính**: 10+ methods cần cập nhật

- [ ] Order queries với `withoutDeleted()`
- [ ] OrderItem queries với `withoutDeleted()`
- [ ] Soft delete orders
- [ ] Cart cleanup với soft delete

#### 3. auth.service.ts

**Ước tính**: 5+ methods cần cập nhật

- [ ] User login/register queries
- [ ] Password reset queries
- [ ] Email verification queries
- [ ] Filter deleted users

### Priority 2 - Important Services

#### 4. banner.service.ts

**Ước tính**: 8+ methods cần cập nhật

- [ ] Banner CRUD với soft delete
- [ ] BannerGroup CRUD với soft delete
- [ ] Query active banners

#### 5. coupon.service.ts

**Ước tính**: 6+ methods cần cập nhật

- [ ] Coupon CRUD với soft delete
- [ ] Validate coupon availability
- [ ] Query active coupons

#### 6. flash-sale.service.ts

**Ước tính**: 6+ methods cần cập nhật

- [ ] FlashSale CRUD với soft delete
- [ ] Query active flash sales
- [ ] FlashSaleProduct management

### Priority 3 - Supporting Services

#### 7. storage.service.ts

**Ước tính**: 3+ methods cần cập nhật

- [ ] Media queries với `withoutDeleted()`
- [ ] Soft delete media
- [ ] Media cleanup

#### 8. stats.service.ts

**Ước tính**: 5+ methods cần cập nhật

- [ ] Count queries với `withoutDeleted()`
- [ ] User stats
- [ ] Product stats
- [ ] Order stats
- [ ] Review stats

#### 9. product-question.service.ts

**Ước tính**: 4+ methods cần cập nhật

- [ ] Question CRUD
- [ ] Answer CRUD
- [ ] Query questions

#### 10. category.service.ts

**Ước tính**: 5+ methods cần cập nhật

- [ ] Category CRUD với soft delete
- [ ] Query active categories
- [ ] Category tree

#### 11. brand.service.ts

**Ước tính**: 5+ methods cần cập nhật

- [ ] Brand CRUD với soft delete
- [ ] Query active brands

## Tiến độ tổng thể

```
Đã hoàn thành:  4/15+ services (26%)
Đang thực hiện: 0 services
Chờ cập nhật:   11+ services (74%)
```

## Ước tính thời gian

- **Đã hoàn thành**: ~4 services (2-3 giờ)
- **Còn lại**: ~11 services
- **Ước tính**: 6-8 giờ nữa để hoàn thành tất cả

## Các bước tiếp theo

1. ✅ Hoàn thành user.service.ts
2. ✅ Hoàn thành wishlist.service.ts
3. ✅ Hoàn thành cart.service.ts
4. ✅ Hoàn thành review.service.ts (delete methods)
5. 🔄 Tiếp tục với product.service.ts (service lớn nhất)
6. 🔄 Tiếp tục với order.service.ts
7. 🔄 Tiếp tục với auth.service.ts
8. 🔄 Các service còn lại theo priority

## Notes

- Tất cả các bảng có `isDeleted` và `deletedAt` đã được migrate
- Helper functions hoạt động tốt và đã được test
- Code nhất quán và dễ maintain hơn
- Performance tốt nhờ indexes đã được thêm
