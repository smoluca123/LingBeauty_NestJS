# Database Schema Documentation

## Tổng quan

Database này được thiết kế cho hệ thống cửa hàng mỹ phẩm trực tuyến với đầy đủ các chức năng:

- Quản lý người dùng và phân quyền
- Quản lý sản phẩm với biến thể (màu sắc, kích thước, loại)
- Quản lý tồn kho với hiển thị riêng biệt
- Hệ thống giỏ hàng và đơn hàng
- Hệ thống affiliate (cộng tác viên)
- Đánh giá và review sản phẩm
- Khuyến mãi và mã giảm giá
- Flash Sale (khuyến mãi giờ vàng)
- Thanh toán đa phương thức
- Quản lý địa chỉ giao hàng

**Database Engine:** PostgreSQL  
**ORM:** Prisma  
**Schema Location:** `prisma/schema/`

---

## Enums

### OrderStatus

Trạng thái đơn hàng:

- `PENDING` - Chờ xử lý
- `CONFIRMED` - Đã xác nhận
- `PROCESSING` - Đang xử lý
- `SHIPPED` - Đã giao hàng
- `DELIVERED` - Đã nhận hàng
- `CANCELLED` - Đã hủy
- `REFUNDED` - Đã hoàn tiền

### PaymentMethod

Phương thức thanh toán:

- `COD` - Thanh toán khi nhận hàng
- `BANK_TRANSFER` - Chuyển khoản ngân hàng
- `CREDIT_CARD` - Thẻ tín dụng
- `E_WALLET` - Ví điện tử
- `MOMO` - Ví MoMo
- `ZALOPAY` - Ví ZaloPay

### PaymentStatus

Trạng thái thanh toán:

- `PENDING` - Chờ thanh toán
- `PROCESSING` - Đang xử lý
- `COMPLETED` - Đã thanh toán
- `FAILED` - Thanh toán thất bại
- `REFUNDED` - Đã hoàn tiền

### FlashSaleStatus

Trạng thái flash sale:

- `UPCOMING` - Sắp diễn ra
- `ACTIVE` - Đang diễn ra
- `ENDED` - Đã kết thúc
- `CANCELLED` - Đã hủy

---

## 1. User & Authentication Module

### users (User)

Bảng lưu thông tin người dùng của hệ thống.

**Các trường:**

- `id` (UUID, PK) - ID duy nhất
- `email` (String, Unique) - Email đăng nhập
- `first_name` (String) - Tên
- `last_name` (String) - Họ
- `phone` (String, Unique) - Số điện thoại
- `username` (String, Unique) - Tên đăng nhập
- `password` (String) - Mật khẩu đã hash
- `created_at` (DateTime) - Thời gian tạo
- `updated_at` (DateTime) - Thời gian cập nhật

**Indexes:**

- `email`, `phone`, `username`

**Relationships:**

- `cart` → One-to-One với `Cart`
- `orders` → One-to-Many với `Order`
- `reviews` → One-to-Many với `ProductReview`
- `addresses` → One-to-Many với `Address`
- `affiliate` → One-to-One với `Affiliate`
- `roleAssignments` → One-to-Many với `UserRoleAssignment`

---

### user_roles (UserRole)

Bảng định nghĩa các vai trò trong hệ thống.

**Các trường:**

- `id` (UUID, PK)
- `name` (String) - Tên vai trò (VD: admin, customer, affiliate)
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `name`

---

### user_role_assignments (UserRoleAssignment)

Bảng liên kết User với UserRole (Many-to-Many).

**Các trường:**

- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `role_id` (UUID, FK → user_roles.id)
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Constraints:**

- Unique constraint trên `[user_id, role_id]` - Một user không thể có cùng một role hai lần

**Indexes:**

- `user_id`, `role_id`

**Relationships:**

- `user` → Many-to-One với `User` (onDelete: Cascade)

---

## 2. Product Module

### categories (Category)

Bảng danh mục sản phẩm, hỗ trợ cấu trúc cây (parent-child).

**Các trường:**

- `id` (UUID, PK)
- `name` (String) - Tên danh mục
- `slug` (String, Unique) - URL slug
- `description` (Text, Optional) - Mô tả
- `image` (String, Optional) - URL hình ảnh
- `parent_id` (UUID, Optional, FK → categories.id) - Danh mục cha
- `is_active` (Boolean, Default: true) - Trạng thái hoạt động
- `sort_order` (Int, Default: 0) - Thứ tự sắp xếp
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `slug`, `parent_id`

**Relationships:**

- `parent` → Many-to-One với `Category` (Self-referential, onDelete: SetNull)
- `children` → One-to-Many với `Category` (Self-referential)
- `products` → One-to-Many với `Product`

**Lưu ý:** Hỗ trợ danh mục đa cấp (VD: Mỹ phẩm → Trang điểm → Son môi)

---

### brands (Brand)

Bảng thương hiệu sản phẩm.

**Các trường:**

- `id` (UUID, PK)
- `name` (String) - Tên thương hiệu
- `slug` (String, Unique) - URL slug
- `description` (Text, Optional) - Mô tả
- `logo` (String, Optional) - URL logo
- `website` (String, Optional) - Website thương hiệu
- `is_active` (Boolean, Default: true)
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `slug`

**Relationships:**

- `products` → One-to-Many với `Product`

---

### products (Product)

Bảng sản phẩm chính.

**Các trường:**

- `id` (UUID, PK)
- `name` (String) - Tên sản phẩm
- `slug` (String, Unique) - URL slug
- `description` (Text, Optional) - Mô tả chi tiết
- `short_desc` (String, Optional) - Mô tả ngắn
- `sku` (String, Unique) - SKU chính của sản phẩm
- `category_id` (UUID, FK → categories.id) - Danh mục
- `brand_id` (UUID, Optional, FK → brands.id) - Thương hiệu
- `base_price` (Decimal) - Giá cơ bản
- `compare_price` (Decimal, Optional) - Giá so sánh (giá gốc)
- `is_active` (Boolean, Default: true) - Trạng thái hoạt động
- `is_featured` (Boolean, Default: false) - Sản phẩm nổi bật
- `weight` (Decimal, Optional) - Trọng lượng (gram)
- `meta_title` (String, Optional) - SEO title
- `meta_desc` (Text, Optional) - SEO description
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `slug`, `category_id`, `brand_id`, `sku`

**Relationships:**

- `category` → Many-to-One với `Category`
- `brand` → Many-to-One với `Brand` (Optional, onDelete: SetNull)
- `variants` → One-to-Many với `ProductVariant`
- `images` → One-to-Many với `ProductImage`
- `reviews` → One-to-Many với `ProductReview`
- `orderItems` → One-to-Many với `OrderItem`
- `cartItems` → One-to-Many với `CartItem`
- `promotions` → Many-to-Many với `Promotion` (qua `PromotionProduct`)
- `commRates` → One-to-Many với `CommissionRate`

---

### product_variants (ProductVariant)

Bảng biến thể sản phẩm (màu sắc, kích thước, loại).

**Các trường:**

- `id` (UUID, PK)
- `product_id` (UUID, FK → products.id)
- `sku` (String, Unique) - SKU của variant
- `name` (String) - Tên variant (VD: "Đỏ - 30ml")
- `color` (String, Optional) - Màu sắc
- `size` (String, Optional) - Kích thước
- `type` (String, Optional) - Loại
- `price` (Decimal) - Giá của variant này
- `sort_order` (Int, Default: 0) - Thứ tự hiển thị
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `product_id`, `sku`

**Relationships:**

- `product` → Many-to-One với `Product` (onDelete: Cascade)
- `inventory` → One-to-One với `ProductInventory`
- `orderItems` → One-to-Many với `OrderItem`
- `cartItems` → One-to-Many với `CartItem`

**Lưu ý:** Mỗi sản phẩm có thể có nhiều variants (VD: Son môi màu đỏ 3.5g, Son môi màu đỏ 5g, Son môi màu hồng 3.5g...)

---

### product_images (ProductImage)

Bảng hình ảnh sản phẩm.

**Các trường:**

- `id` (UUID, PK)
- `product_id` (UUID, FK → products.id)
- `url` (String) - URL hình ảnh
- `alt` (String, Optional) - Alt text cho SEO
- `sort_order` (Int, Default: 0) - Thứ tự hiển thị
- `is_primary` (Boolean, Default: false) - Hình ảnh chính
- `created_at` (DateTime)

**Indexes:**

- `product_id`

**Relationships:**

- `product` → Many-to-One với `Product` (onDelete: Cascade)

---

### product_inventory (ProductInventory)

Bảng quản lý tồn kho cho từng variant.

**Các trường:**

- `id` (UUID, PK)
- `variant_id` (UUID, Unique, FK → product_variants.id)
- `quantity` (Int, Default: 0) - Số lượng tồn kho thực tế
- `display_status` (String, Default: "in_stock") - Trạng thái hiển thị cho khách hàng
  - Các giá trị: `"in_stock"`, `"out_of_stock"`, `"pre_order"`
- `low_stock_threshold` (Int, Default: 10) - Ngưỡng cảnh báo hết hàng
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `variant_id`

**Relationships:**

- `variant` → One-to-One với `ProductVariant` (onDelete: Cascade)

**Lưu ý quan trọng:**

- `quantity`: Số lượng thực tế trong kho (chỉ admin thấy)
- `display_status`: Trạng thái hiển thị cho khách hàng (có thể khác với quantity)
- Cho phép hiển thị "còn hàng" ngay cả khi `quantity = 0` để admin có thể nhập hàng sau

---

## 3. Order & Cart Module

### carts (Cart)

Bảng giỏ hàng của người dùng (mỗi user có một giỏ hàng).

**Các trường:**

- `id` (UUID, PK)
- `user_id` (UUID, Unique, FK → users.id)
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Relationships:**

- `user` → One-to-One với `User` (onDelete: Cascade)
- `items` → One-to-Many với `CartItem`

---

### cart_items (CartItem)

Bảng sản phẩm trong giỏ hàng.

**Các trường:**

- `id` (UUID, PK)
- `cart_id` (UUID, FK → carts.id)
- `product_id` (UUID, FK → products.id)
- `variant_id` (UUID, FK → product_variants.id)
- `quantity` (Int, Default: 1) - Số lượng
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Constraints:**

- Unique constraint trên `[cart_id, variant_id]` - Mỗi variant chỉ xuất hiện một lần trong giỏ hàng

**Indexes:**

- `cart_id`, `product_id`, `variant_id`

**Relationships:**

- `cart` → Many-to-One với `Cart` (onDelete: Cascade)
- `product` → Many-to-One với `Product` (onDelete: Cascade)
- `variant` → Many-to-One với `ProductVariant` (onDelete: Cascade)

---

### orders (Order)

Bảng đơn hàng.

**Các trường:**

- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `order_number` (String, Unique) - Mã đơn hàng
- `status` (OrderStatus, Default: PENDING) - Trạng thái đơn hàng
- `subtotal` (Decimal) - Tổng tiền sản phẩm
- `tax` (Decimal, Default: 0) - Thuế
- `shipping` (Decimal, Default: 0) - Phí vận chuyển
- `discount` (Decimal, Default: 0) - Giảm giá
- `total` (Decimal) - Tổng tiền thanh toán
- `shipping_address_id` (UUID, Optional, FK → addresses.id) - Địa chỉ giao hàng
- `affiliate_code` (String, Optional) - Mã affiliate (nếu có)
- `coupon_code` (String, Optional) - Mã giảm giá đã sử dụng
- `notes` (Text, Optional) - Ghi chú
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `user_id`, `order_number`, `status`, `affiliate_code`

**Relationships:**

- `user` → Many-to-One với `User`
- `shippingAddress` → Many-to-One với `Address` (Optional, onDelete: SetNull)
- `items` → One-to-Many với `OrderItem`
- `payments` → One-to-Many với `Payment`
- `commissions` → One-to-Many với `AffiliateCommission`
- `couponUsage` → One-to-One với `CouponUsage`

---

### order_items (OrderItem)

Bảng chi tiết sản phẩm trong đơn hàng (snapshot tại thời điểm đặt hàng).

**Các trường:**

- `id` (UUID, PK)
- `order_id` (UUID, FK → orders.id)
- `product_id` (UUID, FK → products.id)
- `variant_id` (UUID, FK → product_variants.id)
- `name` (String) - Tên sản phẩm tại thời điểm đặt hàng
- `sku` (String) - SKU tại thời điểm đặt hàng
- `price` (Decimal) - Giá tại thời điểm đặt hàng
- `quantity` (Int, Default: 1) - Số lượng
- `total` (Decimal) - Tổng tiền của item này
- `created_at` (DateTime)

**Indexes:**

- `order_id`, `product_id`, `variant_id`

**Relationships:**

- `order` → Many-to-One với `Order` (onDelete: Cascade)
- `product` → Many-to-One với `Product`
- `variant` → Many-to-One với `ProductVariant`

**Lưu ý:** OrderItem lưu snapshot thông tin sản phẩm tại thời điểm đặt hàng để đảm bảo tính nhất quán dữ liệu.

---

## 4. Address Module

### addresses (Address)

Bảng địa chỉ giao hàng của người dùng.

**Các trường:**

- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `full_name` (String) - Tên người nhận
- `phone` (String) - Số điện thoại
- `address_line1` (String) - Địa chỉ dòng 1
- `address_line2` (String, Optional) - Địa chỉ dòng 2
- `city` (String) - Thành phố
- `province` (String) - Tỉnh/Thành phố
- `postal_code` (String) - Mã bưu điện
- `country` (String, Default: "Vietnam") - Quốc gia
- `is_default` (Boolean, Default: false) - Địa chỉ mặc định
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `user_id`

**Relationships:**

- `user` → Many-to-One với `User` (onDelete: Cascade)
- `orders` → One-to-Many với `Order`

---

## 5. Payment Module

### payments (Payment)

Bảng giao dịch thanh toán.

**Các trường:**

- `id` (UUID, PK)
- `order_id` (UUID, FK → orders.id)
- `method` (PaymentMethod) - Phương thức thanh toán
- `amount` (Decimal) - Số tiền thanh toán
- `status` (PaymentStatus, Default: PENDING) - Trạng thái thanh toán
- `transaction_id` (String, Optional, Unique) - ID giao dịch từ gateway
- `payment_data` (Text, Optional) - Dữ liệu thanh toán bổ sung (JSON)
- `paid_at` (DateTime, Optional) - Thời gian thanh toán thành công
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `order_id`, `status`, `transaction_id`

**Relationships:**

- `order` → Many-to-One với `Order` (onDelete: Cascade)

**Lưu ý:** Một đơn hàng có thể có nhiều payment (ví dụ: thanh toán một phần, hoàn tiền rồi thanh toán lại)

---

## 6. Affiliate Module

### affiliates (Affiliate)

Bảng thông tin cộng tác viên (affiliate).

**Các trường:**

- `id` (UUID, PK)
- `user_id` (UUID, Unique, FK → users.id)
- `code` (String, Unique) - Mã affiliate duy nhất
- `status` (String, Default: "pending") - Trạng thái (pending, active, inactive)
- `total_earnings` (Decimal, Default: 0) - Tổng thu nhập
- `paid_earnings` (Decimal, Default: 0) - Thu nhập đã thanh toán
- `pending_earnings` (Decimal, Default: 0) - Thu nhập chờ thanh toán
- `bank_account` (String, Optional) - Số tài khoản ngân hàng
- `bank_name` (String, Optional) - Tên ngân hàng
- `account_holder` (String, Optional) - Chủ tài khoản
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `code`, `user_id`

**Relationships:**

- `user` → One-to-One với `User` (onDelete: Cascade)
- `links` → One-to-Many với `AffiliateLink`
- `commissions` → One-to-Many với `AffiliateCommission`

**Lưu ý:** Link affiliate có format: `/product/{slug}?aff={affiliate_code}`

---

### affiliate_links (AffiliateLink)

Bảng link affiliate của cộng tác viên.

**Các trường:**

- `id` (UUID, PK)
- `affiliate_id` (UUID, FK → affiliates.id)
- `product_id` (UUID, Optional, FK → products.id) - Sản phẩm cụ thể (nếu có)
- `url` (String) - URL đầy đủ của link
- `clicks` (Int, Default: 0) - Số lượt click
- `conversions` (Int, Default: 0) - Số lượt chuyển đổi (đặt hàng)
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `affiliate_id`, `product_id`

**Relationships:**

- `affiliate` → Many-to-One với `Affiliate` (onDelete: Cascade)

---

### affiliate_commissions (AffiliateCommission)

Bảng hoa hồng từ đơn hàng của affiliate.

**Các trường:**

- `id` (UUID, PK)
- `affiliate_id` (UUID, FK → affiliates.id)
- `order_id` (UUID, FK → orders.id)
- `amount` (Decimal) - Số tiền hoa hồng
- `rate` (Decimal) - Tỷ lệ hoa hồng (%)
- `status` (String, Default: "pending") - Trạng thái (pending, paid, cancelled)
- `paid_at` (DateTime, Optional) - Thời gian thanh toán
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `affiliate_id`, `order_id`, `status`

**Relationships:**

- `affiliate` → Many-to-One với `Affiliate` (onDelete: Cascade)
- `order` → Many-to-One với `Order` (onDelete: Cascade)

**Lưu ý:** Hoa hồng được tính khi đơn hàng hoàn thành (status = DELIVERED)

---

### commission_rates (CommissionRate)

Bảng tỷ lệ hoa hồng theo sản phẩm hoặc danh mục.

**Các trường:**

- `id` (UUID, PK)
- `product_id` (UUID, Optional, FK → products.id) - Áp dụng cho sản phẩm cụ thể
- `category_id` (UUID, Optional) - Áp dụng cho danh mục (chưa có FK, lưu trữ UUID)
- `rate` (Decimal) - Tỷ lệ hoa hồng (%)
- `is_active` (Boolean, Default: true) - Trạng thái hoạt động
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `product_id`, `category_id`

**Relationships:**

- `product` → Many-to-One với `Product` (Optional, onDelete: Cascade)

**Lưu ý:**

- Nếu có `product_id`: Áp dụng cho sản phẩm cụ thể
- Nếu có `category_id`: Áp dụng cho tất cả sản phẩm trong danh mục
- Ưu tiên: Product > Category > Default rate

---

## 7. Review Module

### product_reviews (ProductReview)

Bảng đánh giá sản phẩm của khách hàng.

**Các trường:**

- `id` (UUID, PK)
- `product_id` (UUID, FK → products.id)
- `user_id` (UUID, FK → users.id)
- `rating` (SmallInt) - Điểm đánh giá (1-5)
- `title` (String, Optional) - Tiêu đề đánh giá
- `comment` (Text, Optional) - Nội dung đánh giá
- `is_verified` (Boolean, Default: false) - Đã mua hàng (verified purchase)
- `is_approved` (Boolean, Default: false) - Đã được duyệt
- `helpful_count` (Int, Default: 0) - Số lượt hữu ích
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Constraints:**

- Unique constraint trên `[product_id, user_id]` - Mỗi user chỉ đánh giá một lần cho mỗi sản phẩm

**Indexes:**

- `product_id`, `user_id`, `rating`

**Relationships:**

- `product` → Many-to-One với `Product` (onDelete: Cascade)
- `user` → Many-to-One với `User` (onDelete: Cascade)
- `images` → One-to-Many với `ReviewImage`

---

### review_images (ReviewImage)

Bảng hình ảnh kèm theo đánh giá.

**Các trường:**

- `id` (UUID, PK)
- `review_id` (UUID, FK → product_reviews.id)
- `url` (String) - URL hình ảnh
- `alt` (String, Optional) - Alt text
- `created_at` (DateTime)

**Indexes:**

- `review_id`

**Relationships:**

- `review` → Many-to-One với `ProductReview` (onDelete: Cascade)

---

## 8. Promotion Module

### promotions (Promotion)

Bảng chương trình khuyến mãi.

**Các trường:**

- `id` (UUID, PK)
- `name` (String) - Tên chương trình
- `description` (Text, Optional) - Mô tả
- `type` (String) - Loại khuyến mãi (percentage, fixed_amount)
- `value` (Decimal) - Giá trị khuyến mãi
- `min_purchase` (Decimal, Optional) - Giá trị đơn hàng tối thiểu
- `max_discount` (Decimal, Optional) - Giảm giá tối đa
- `start_date` (DateTime) - Ngày bắt đầu
- `end_date` (DateTime) - Ngày kết thúc
- `is_active` (Boolean, Default: true) - Trạng thái hoạt động
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `start_date`, `end_date`, `is_active`

**Relationships:**

- `products` → Many-to-Many với `Product` (qua `PromotionProduct`)

---

### promotion_products (PromotionProduct)

Bảng liên kết Promotion với Product (Many-to-Many).

**Các trường:**

- `id` (UUID, PK)
- `promotion_id` (UUID, FK → promotions.id)
- `product_id` (UUID, FK → products.id)
- `created_at` (DateTime)

**Constraints:**

- Unique constraint trên `[promotion_id, product_id]`

**Indexes:**

- `promotion_id`, `product_id`

**Relationships:**

- `promotion` → Many-to-One với `Promotion` (onDelete: Cascade)
- `product` → Many-to-One với `Product` (onDelete: Cascade)

---

### coupons (Coupon)

Bảng mã giảm giá.

**Các trường:**

- `id` (UUID, PK)
- `code` (String, Unique) - Mã giảm giá
- `type` (String) - Loại (percentage, fixed_amount)
- `value` (Decimal) - Giá trị giảm giá
- `min_purchase` (Decimal, Optional) - Giá trị đơn hàng tối thiểu
- `max_discount` (Decimal, Optional) - Giảm giá tối đa
- `usage_limit` (Int, Optional) - Giới hạn số lần sử dụng
- `used_count` (Int, Default: 0) - Số lần đã sử dụng
- `start_date` (DateTime) - Ngày bắt đầu
- `end_date` (DateTime) - Ngày kết thúc
- `is_active` (Boolean, Default: true) - Trạng thái hoạt động
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `code`, `start_date`, `end_date`, `is_active`

**Relationships:**

- `usages` → One-to-Many với `CouponUsage`

---

### coupon_usages (CouponUsage)

Bảng lịch sử sử dụng coupon.

**Các trường:**

- `id` (UUID, PK)
- `coupon_id` (UUID, FK → coupons.id)
- `order_id` (UUID, Unique, FK → orders.id)
- `discount` (Decimal) - Số tiền đã giảm
- `created_at` (DateTime)

**Constraints:**

- Unique constraint trên `order_id` - Mỗi đơn hàng chỉ dùng một coupon

**Indexes:**

- `coupon_id`, `order_id`

**Relationships:**

- `coupon` → Many-to-One với `Coupon` (onDelete: Cascade)
- `order` → One-to-One với `Order` (onDelete: Cascade)

---

## 9. Flash Sale Module

### flash_sales (FlashSale)

Bảng chương trình flash sale (khuyến mãi giờ vàng).

**Các trường:**

- `id` (UUID, PK)
- `name` (String) - Tên chương trình flash sale
- `description` (Text, Optional) - Mô tả
- `slug` (String, Unique) - URL slug
- `banner` (String, Optional) - URL banner hình ảnh
- `start_time` (DateTime) - Thời gian bắt đầu
- `end_time` (DateTime) - Thời gian kết thúc
- `status` (FlashSaleStatus, Default: UPCOMING) - Trạng thái
- `is_active` (Boolean, Default: true) - Trạng thái hoạt động
- `sort_order` (Int, Default: 0) - Thứ tự hiển thị
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**

- `slug`, `start_time`, `end_time`, `status`, `is_active`

**Relationships:**

- `products` → One-to-Many với `FlashSaleProduct`
- `orders` → One-to-Many với `FlashSaleOrder`

**Lưu ý:** Flash sale thường có thời gian ngắn (vài giờ) và giảm giá sâu để tạo cảm giác cấp bách.

---

### flash_sale_products (FlashSaleProduct)

Bảng sản phẩm trong flash sale (có thể là product hoặc variant cụ thể).

**Các trường:**

- `id` (UUID, PK)
- `flash_sale_id` (UUID, FK → flash_sales.id)
- `product_id` (UUID, FK → products.id)
- `variant_id` (UUID, Optional, FK → product_variants.id) - Variant cụ thể (nếu null thì áp dụng cho tất cả variants)
- `flash_price` (Decimal) - Giá flash sale
- `original_price` (Decimal) - Giá gốc (để hiển thị phần trăm giảm)
- `max_quantity` (Int) - Số lượng tối đa trong flash sale
- `sold_quantity` (Int, Default: 0) - Số lượng đã bán
- `limit_per_order` (Int, Default: 1) - Giới hạn số lượng mỗi đơn hàng
- `sort_order` (Int, Default: 0) - Thứ tự hiển thị
- `is_active` (Boolean, Default: true) - Trạng thái hoạt động
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Constraints:**

- Unique constraint trên `[flash_sale_id, product_id, variant_id]` - Mỗi sản phẩm/variant chỉ xuất hiện một lần trong flash sale

**Indexes:**

- `flash_sale_id`, `product_id`, `variant_id`, `is_active`

**Relationships:**

- `flashSale` → Many-to-One với `FlashSale` (onDelete: Cascade)
- `product` → Many-to-One với `Product` (onDelete: Cascade)
- `variant` → Many-to-One với `ProductVariant` (Optional, onDelete: Cascade)

**Lưu ý:**

- Nếu `variant_id` = null: Áp dụng cho tất cả variants của product
- Nếu `variant_id` != null: Chỉ áp dụng cho variant cụ thể
- `sold_quantity` được cập nhật khi có đơn hàng thành công
- Khi `sold_quantity` >= `max_quantity`: Tự động hết hàng trong flash sale

---

### flash_sale_orders (FlashSaleOrder)

Bảng theo dõi đơn hàng từ flash sale.

**Các trường:**

- `id` (UUID, PK)
- `flash_sale_id` (UUID, FK → flash_sales.id)
- `order_id` (UUID, Unique, FK → orders.id)
- `created_at` (DateTime)

**Constraints:**

- Unique constraint trên `order_id` - Mỗi đơn hàng chỉ thuộc một flash sale

**Indexes:**

- `flash_sale_id`, `order_id`

**Relationships:**

- `flashSale` → Many-to-One với `FlashSale` (onDelete: Cascade)
- `order` → One-to-One với `Order` (onDelete: Cascade)

**Lưu ý:** Dùng để thống kê và phân tích hiệu quả flash sale.

---

## Relationship Diagram (ERD)

### User & Authentication

```
User ──┬── Cart (1:1)
       ├── Order (1:N)
       ├── ProductReview (1:N)
       ├── Address (1:N)
       ├── Affiliate (1:1)
       └── UserRoleAssignment (1:N) ──→ UserRole (N:1)
```

### Product

```
Category (Self-referential)
  ├── parent (N:1)
  └── children (1:N)

Category ──→ Product (1:N)
Brand ──→ Product (1:N)

Product ──┬── ProductVariant (1:N)
          ├── ProductImage (1:N)
          ├── ProductReview (1:N)
          ├── OrderItem (1:N)
          ├── CartItem (1:N)
          ├── PromotionProduct (N:M) ──→ Promotion (N:M)
          ├── FlashSaleProduct (1:N)
          └── CommissionRate (1:N)

ProductVariant ──┬── ProductInventory (1:1)
                 ├── OrderItem (1:N)
                 ├── CartItem (1:N)
                 └── FlashSaleProduct (1:N, Optional)
```

### Order & Cart

```
User ──→ Cart (1:1) ──→ CartItem (1:N) ──┬── Product (N:1)
                                          └── ProductVariant (N:1)

User ──→ Order (1:N) ──┬── OrderItem (1:N) ──┬── Product (N:1)
                       │                      └── ProductVariant (N:1)
                       ├── Payment (1:N)
                       ├── AffiliateCommission (1:N)
                       ├── CouponUsage (1:1) ──→ Coupon (N:1)
                       └── FlashSaleOrder (1:1, Optional) ──→ FlashSale (N:1)

Address ──→ Order (1:N)
```

### Affiliate

```
User ──→ Affiliate (1:1) ──┬── AffiliateLink (1:N)
                           └── AffiliateCommission (1:N) ──→ Order (N:1)

Product ──→ CommissionRate (1:N)
```

### Review

```
User ──→ ProductReview (1:N) ──┬── Product (N:1)
                                └── ReviewImage (1:N)
```

### Promotion

```
Promotion ──→ PromotionProduct (1:N) ──→ Product (N:1)
```

### Flash Sale

```
FlashSale ──┬── FlashSaleProduct (1:N) ──┬── Product (N:1)
            │                             └── ProductVariant (N:1, Optional)
            └── FlashSaleOrder (1:N) ──→ Order (N:1)

Product ──→ FlashSaleProduct (1:N)
ProductVariant ──→ FlashSaleProduct (1:N, Optional)
Order ──→ FlashSaleOrder (1:1, Optional)
```

---

## Quy tắc và Best Practices

### 1. Cascade Delete

- Xóa User → Xóa Cart, Addresses, Reviews, Affiliate, RoleAssignments
- Xóa Product → Xóa Variants, Images, Reviews (nhưng không xóa OrderItems)
- Xóa ProductVariant → Xóa Inventory, FlashSaleProducts
- Xóa Order → Xóa OrderItems, Payments, Commissions, CouponUsage, FlashSaleOrder
- Xóa FlashSale → Xóa FlashSaleProducts, FlashSaleOrders
- Xóa Category → SetNull parent_id của children (không xóa children)

### 2. Unique Constraints

- User: `email`, `phone`, `username`
- Product: `slug`, `sku`
- ProductVariant: `sku`
- Cart: `user_id` (mỗi user một cart)
- CartItem: `[cart_id, variant_id]` (mỗi variant một lần trong cart)
- Order: `order_number`
- OrderItem: Lưu snapshot, không unique
- ProductReview: `[product_id, user_id]` (mỗi user một review/sản phẩm)
- CouponUsage: `order_id` (mỗi order một coupon)
- Affiliate: `code`, `user_id`
- FlashSale: `slug`
- FlashSaleProduct: `[flash_sale_id, product_id, variant_id]` (mỗi sản phẩm/variant một lần trong flash sale)
- FlashSaleOrder: `order_id` (mỗi order chỉ thuộc một flash sale)

### 3. Inventory Management

- `quantity`: Số lượng thực tế (admin only)
- `display_status`: Hiển thị cho khách hàng
- Có thể hiển thị "còn hàng" khi `quantity = 0` để admin nhập hàng sau

### 4. Order Item Snapshot

- OrderItem lưu snapshot: `name`, `sku`, `price` tại thời điểm đặt hàng
- Đảm bảo tính nhất quán dữ liệu khi sản phẩm thay đổi giá sau khi đặt hàng

### 5. Affiliate Flow

1. User đăng ký làm Affiliate → Tạo record trong `affiliates`
2. Affiliate tạo link → Lưu vào `affiliate_links`
3. Khách hàng click link → Tăng `clicks`
4. Khách hàng đặt hàng với `affiliate_code` → Tạo `AffiliateCommission`
5. Khi đơn hàng DELIVERED → Tính hoa hồng theo `CommissionRate`
6. Admin thanh toán → Update `status = "paid"`, `paid_at`, cập nhật `paid_earnings`

### 6. Commission Rate Priority

1. Product-specific rate (`product_id` không null)
2. Category rate (`category_id` không null, `product_id` null)
3. Default rate (cả hai đều null)

### 7. Flash Sale Flow

1. Admin tạo FlashSale với `start_time` và `end_time`
2. Thêm sản phẩm vào FlashSaleProduct với:
   - `flash_price`: Giá flash sale
   - `original_price`: Giá gốc
   - `max_quantity`: Số lượng tối đa
   - `limit_per_order`: Giới hạn mỗi đơn hàng
3. Khi flash sale ACTIVE:
   - Hiển thị giá flash sale cho khách hàng
   - Kiểm tra `sold_quantity < max_quantity` trước khi cho phép đặt hàng
   - Kiểm tra `limit_per_order` khi thêm vào giỏ hàng
4. Khi có đơn hàng từ flash sale:
   - Tạo FlashSaleOrder
   - Cập nhật `sold_quantity` trong FlashSaleProduct
   - Khi `sold_quantity >= max_quantity`: Tự động ẩn sản phẩm khỏi flash sale
5. Khi flash sale ENDED:
   - Chuyển status sang ENDED
   - Giá sản phẩm trở về giá gốc

### 8. Flash Sale Product Variant Logic

- Nếu `variant_id` = null: Áp dụng flash price cho tất cả variants của product
- Nếu `variant_id` != null: Chỉ áp dụng cho variant cụ thể
- Khi kiểm tra số lượng: Nếu variant_id = null, cần kiểm tra tổng số lượng của tất cả variants

---

## Migration Notes

Khi chạy migration, lưu ý:

1. Tất cả ID sử dụng UUID (String)
2. Decimal cho tiền tệ: `@db.Decimal(10, 2)` (tối đa 99,999,999.99)
3. Decimal cho tỷ lệ: `@db.Decimal(5, 2)` (tối đa 999.99%)
4. Decimal cho trọng lượng: `@db.Decimal(8, 2)`
5. Tất cả bảng có `created_at` và `updated_at`
6. Naming convention: snake_case cho database, camelCase cho Prisma models

---

## Indexes Summary

Các indexes quan trọng để tối ưu query:

- User: `email`, `phone`, `username`
- Product: `slug`, `category_id`, `brand_id`, `sku`
- Order: `user_id`, `order_number`, `status`, `affiliate_code`
- Payment: `order_id`, `status`, `transaction_id`
- Affiliate: `code`, `user_id`
- Category: `slug`, `parent_id`
- Brand: `slug`
- FlashSale: `slug`, `start_time`, `end_time`, `status`, `is_active`
- FlashSaleProduct: `flash_sale_id`, `product_id`, `variant_id`, `is_active`

---

## Contact & Support

Nếu có thắc mắc về database schema, vui lòng liên hệ team phát triển hoặc tham khảo file Prisma schema tại `prisma/schema/`.
