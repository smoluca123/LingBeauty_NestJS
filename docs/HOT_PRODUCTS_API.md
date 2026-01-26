# 🔥 Hot/Best-Selling Products API

## Tổng quan

Endpoint này cho phép Frontend lấy danh sách sản phẩm **HOT** hoặc **bán chạy** dựa trên nhiều tiêu chí khác nhau. API được thiết kế linh hoạt để đáp ứng nhiều nhu cầu hiển thị sản phẩm nổi bật trên website.

## Endpoint

```
GET /api/v1/public/products/hot
```

> ⚠️ **Lưu ý**: Đây là endpoint **public** - không yêu cầu authentication.

---

## Các tiêu chí đánh giá sản phẩm HOT/Bán chạy

### 1. 📊 **SALES** - Dựa trên số lượng bán

Sản phẩm được xếp hạng theo **tổng số lượng đã bán** từ các đơn hàng thành công.

**Cách tính:**

- Lấy tổng `quantity` từ bảng `OrderItem`
- Chỉ tính các đơn hàng có trạng thái: `DELIVERED`, `CONFIRMED`, `SHIPPED`, `PROCESSING`
- Hỗ trợ lọc theo khoảng thời gian (7 ngày, 30 ngày, 90 ngày, hoặc tất cả)

**Use case:** Hiển thị "Top sản phẩm bán chạy nhất"

---

### 2. 💰 **REVENUE** - Dựa trên doanh thu

Sản phẩm được xếp hạng theo **tổng doanh thu** sinh ra.

**Cách tính:**

- Lấy tổng `total` từ bảng `OrderItem`
- Áp dụng các điều kiện tương tự như SALES

**Use case:** Hiển thị "Sản phẩm mang lại doanh thu cao nhất"

---

### 3. ⭐ **RATING** - Dựa trên điểm đánh giá

Sản phẩm được xếp hạng theo **rating trung bình cao nhất**.

**Cách tính:**

- Tính `AVG(rating)` từ bảng `ProductReview`
- Chỉ tính các review đã được duyệt (`isApproved = true`)
- Yêu cầu ít nhất 1 review
- Có thể lọc theo rating tối thiểu (ví dụ: chỉ lấy SP có rating ≥ 4 sao)

**Use case:** Hiển thị "Sản phẩm được đánh giá cao nhất"

---

### 4. 📝 **REVIEWS** - Dựa trên số lượng review

Sản phẩm được xếp hạng theo **số lượng đánh giá nhiều nhất**.

**Cách tính:**

- Đếm số review đã được duyệt
- Có thể lọc chỉ tính review có rating ≥ minRating

**Use case:** Hiển thị "Sản phẩm được quan tâm nhiều nhất"

---

### 5. 🏷️ **BADGE** - Admin đánh dấu BEST_SELLER

Sản phẩm có badge `BEST_SELLER` được gán bởi Admin.

**Cách hoạt động:**

- Admin tạo badge với `type: 'BEST_SELLER'` cho sản phẩm
- API lọc các sản phẩm có badge này và `isActive = true`

**Use case:** Admin muốn kiểm soát thủ công sản phẩm nào hiển thị là "Bán chạy"

---

### 6. ✨ **FEATURED** - Sản phẩm nổi bật

Sản phẩm có flag `isFeatured = true`.

**Cách hoạt động:**

- Admin đánh dấu sản phẩm là Featured khi tạo/sửa sản phẩm
- API lọc các sản phẩm có `isFeatured = true`

**Use case:** Hiển thị "Sản phẩm nổi bật của cửa hàng"

---

### 7. 🎯 **COMPOSITE** - Điểm tổng hợp (Mặc định)

Kết hợp nhiều yếu tố với trọng số để tính **điểm tổng hợp**.

**Công thức:**

```
CompositeScore = (salesScore × 0.4) + (ratingScore × 0.3) + (reviewCountScore × 0.2) + (featuredBonus × 0.1)
```

**Chi tiết:**
| Yếu tố | Trọng số | Mô tả |
|--------|----------|-------|
| Sales Score | 40% | Số lượng bán / Max số lượng bán |
| Rating Score | 30% | Rating trung bình / 5 |
| Review Count Score | 20% | Số review / Max số review |
| Featured Bonus | 10% | 1 nếu isFeatured hoặc có badge BEST_SELLER |

**Use case:** Hiển thị "Sản phẩm HOT" với đánh giá cân bằng nhiều yếu tố

---

## Query Parameters

| Parameter    | Type   | Default     | Mô tả                                       |
| ------------ | ------ | ----------- | ------------------------------------------- |
| `limit`      | number | 10          | Số sản phẩm trả về (1-50)                   |
| `criteria`   | enum   | `composite` | Tiêu chí xếp hạng (xem bên trên)            |
| `period`     | enum   | `30d`       | Khoảng thời gian: `7d`, `30d`, `90d`, `all` |
| `categoryId` | string | -           | Lọc theo danh mục                           |
| `brandId`    | string | -           | Lọc theo thương hiệu                        |
| `minRating`  | number | -           | Rating tối thiểu (1-5)                      |

---

## Ví dụ sử dụng

### 1. Lấy 10 sản phẩm HOT (mặc định)

```bash
GET /api/v1/public/products/hot
```

### 2. Top 5 sản phẩm bán chạy nhất trong 7 ngày

```bash
GET /api/v1/public/products/hot?criteria=sales&period=7d&limit=5
```

### 3. Sản phẩm được đánh giá cao nhất (≥ 4 sao)

```bash
GET /api/v1/public/products/hot?criteria=rating&minRating=4
```

### 4. Sản phẩm HOT của một thương hiệu cụ thể

```bash
GET /api/v1/public/products/hot?brandId=xxx-yyy-zzz&limit=8
```

### 5. Sản phẩm do Admin đánh dấu BEST_SELLER

```bash
GET /api/v1/public/products/hot?criteria=badge
```

---

## Response Format

```json
{
  "success": true,
  "message": "Hot products retrieved successfully",
  "data": [
    {
      "id": "product-uuid",
      "name": "Tên sản phẩm",
      "slug": "ten-san-pham",
      "description": "Mô tả sản phẩm...",
      "shortDesc": "Mô tả ngắn",
      "sku": "SKU001",
      "basePrice": 199000,
      "comparePrice": 299000,
      "isActive": true,
      "isFeatured": true,
      "brand": {
        "id": "brand-uuid",
        "name": "Tên thương hiệu",
        "slug": "ten-thuong-hieu"
      },
      "productCategories": [...],
      "images": [...],
      "badges": [
        {
          "id": "badge-uuid",
          "name": "Bán chạy",
          "type": "BEST_SELLER",
          "variant": "PRIMARY"
        }
      ],
      "variants": [...],
      "primaryImage": {...}
    }
  ]
}
```

---

## Fallback Logic

Khi không có đủ dữ liệu (ví dụ: chưa có đơn hàng nào), API sẽ tự động fallback về:

- Sản phẩm có `isFeatured = true`
- Sắp xếp theo `createdAt DESC`

---

## Files đã tạo/chỉnh sửa

| File                                                | Mô tả                                              |
| --------------------------------------------------- | -------------------------------------------------- |
| `prisma/schema/product-stats.prisma`                | Schema cho ProductStats table                      |
| `src/modules/product/dto/hot-products-query.dto.ts` | DTO cho query parameters                           |
| `src/modules/product/product-public.controller.ts`  | Public controller (không auth)                     |
| `src/modules/product/product-stats.service.ts`      | Service quản lý product stats                      |
| `src/modules/product/product.service.ts`            | Thêm method `getHotProducts` và các helper methods |
| `src/modules/product/product.module.ts`             | Đăng ký controllers và services                    |
| `src/libs/prisma/product-select.ts`                 | Thêm productStatsSelect                            |
| `src/modules/product/dto/product-response.dto.ts`   | Thêm ProductStatsDto                               |

---

## ProductStats Table

Để tối ưu performance, chúng ta lưu trữ các metrics đã tính toán sẵn trong table `product_stats`:

```prisma
model ProductStats {
  id           String    @id @default(uuid())
  productId    String    @unique @map("product_id")
  totalSold    Int       @default(0) @map("total_sold")
  totalRevenue Decimal   @default(0) @map("total_revenue") @db.Decimal(15, 2)
  avgRating    Decimal?  @map("avg_rating") @db.Decimal(3, 2)
  reviewCount  Int       @default(0) @map("review_count")
  viewCount    Int       @default(0) @map("view_count")
  lastSoldAt   DateTime? @map("last_sold_at")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")

  product Product @relation(...)
}
```

### Khi nào sync stats?

| Event                | Action                                                   |
| -------------------- | -------------------------------------------------------- |
| Order status changes | Call `productStatsService.onOrderStatusChange(orderId)`  |
| Review added/updated | Call `productStatsService.onReviewChange(productId)`     |
| Product viewed       | Call `productStatsService.incrementViewCount(productId)` |
| Initial migration    | Call `productStatsService.syncAllProductStats()`         |

### Ví dụ sử dụng ProductStatsService

```typescript
// Trong OrderService khi update status
async updateOrderStatus(orderId: string, status: OrderStatus) {
  await this.prisma.order.update(...);

  // Sync stats cho các sản phẩm trong order
  await this.productStatsService.onOrderStatusChange(orderId);
}

// Trong ReviewService khi tạo review
async createReview(productId: string, data: CreateReviewDto) {
  await this.prisma.productReview.create(...);

  // Sync stats cho sản phẩm
  await this.productStatsService.onReviewChange(productId);
}
```

---

## Admin API Endpoints

Các endpoint admin để quản lý product stats (yêu cầu authentication):

### 1. Sync tất cả product stats

```bash
POST /api/v1/product/stats/sync-all
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully synced stats for 150 products",
  "data": { "synced": 150 }
}
```

### 2. Sync stats cho một sản phẩm

```bash
POST /api/v1/product/:productId/stats/sync
Authorization: Bearer <token>
```

### 3. Lấy stats của một sản phẩm

```bash
GET /api/v1/product/:productId/stats
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalSold": 150,
    "totalRevenue": "37500000",
    "avgRating": "4.5",
    "reviewCount": 25,
    "viewCount": 1250,
    "lastSoldAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Lưu ý khi sử dụng

1. **Cache**: Nên cache response ở FE hoặc thêm cache layer ở BE để tránh query nặng
2. **Period**: Criteria `SALES` và `REVENUE` sẽ sử dụng period, các criteria khác sẽ bỏ qua
3. **Composite**: Là lựa chọn tốt nhất cho hiển thị "Sản phẩm HOT" vì cân bằng nhiều yếu tố
4. **Admin control**: Sử dụng `BADGE` hoặc `FEATURED` khi muốn Admin kiểm soát thủ công
5. **Sync stats**: Đảm bảo gọi sync methods khi order/review thay đổi để stats luôn chính xác

---

## Response mẫu với Stats

```json
{
  "success": true,
  "data": [
    {
      "id": "product-uuid",
      "name": "Son môi matte đỏ",
      "slug": "son-moi-matte-do",
      "basePrice": "250000",
      "stats": {
        "totalSold": 150,
        "totalRevenue": "37500000",
        "avgRating": "4.5",
        "reviewCount": 25,
        "viewCount": 1250,
        "lastSoldAt": "2024-01-15T10:30:00Z"
      }
    }
  ]
}
```
