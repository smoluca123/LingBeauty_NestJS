# Order Module

Module quản lý đơn hàng cho hệ thống e-commerce.

## Tính năng

### User Endpoints

- **POST /order** - Tạo đơn hàng mới
  - Validate địa chỉ giao hàng
  - Validate tồn kho sản phẩm
  - **Tự động áp dụng giá flash sale** (nếu sản phẩm đang trong flash sale active)
  - Validate số lượng mua theo giới hạn flash sale
  - Áp dụng coupon (nếu có)
  - Tạo payment record
  - Cập nhật inventory
  - Cập nhật flash sale sold quantity
  - Xóa cart items sau khi đặt hàng

- **GET /order/my-orders** - Lấy danh sách đơn hàng của user
  - Hỗ trợ phân trang
  - Filter theo status

- **GET /order/:orderId** - Lấy chi tiết đơn hàng
  - Chỉ xem được đơn hàng của mình

- **POST /order/:orderId/cancel** - Hủy đơn hàng
  - Chỉ hủy được ở trạng thái PENDING hoặc CONFIRMED
  - Hoàn lại inventory
  - Hoàn lại flash sale sold quantity (nếu có)

### Admin Endpoints

- **GET /order** - Lấy danh sách tất cả đơn hàng
  - Phân trang
  - Filter theo userId, status, orderNumber
  - Sort theo createdAt, total, orderNumber

- **PATCH /order/:orderId** - Cập nhật đơn hàng
  - Cập nhật status
  - Cập nhật notes
  - Validate status transition

## Order Status Flow

```
PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
   ↓          ↓            ↓
CANCELLED  CANCELLED  CANCELLED

DELIVERED → REFUNDED
```

## Validation Rules

### Status Transition

- PENDING → CONFIRMED, CANCELLED
- CONFIRMED → PROCESSING, CANCELLED
- PROCESSING → SHIPPED, CANCELLED
- SHIPPED → DELIVERED
- DELIVERED → REFUNDED
- CANCELLED → (không thể chuyển)
- REFUNDED → (không thể chuyển)

### Coupon Validation

- Coupon phải active
- Trong thời gian hiệu lực
- Chưa hết lượt sử dụng
- Đạt giá trị đơn hàng tối thiểu

### Inventory Validation

- Kiểm tra tồn kho trước khi tạo đơn
- Không cho phép đặt hàng vượt quá backorder limit
- Cập nhật inventory sau khi tạo đơn
- Hoàn lại inventory khi hủy đơn

## Order Number Format

`ORD-YYMMDD-XXXX`

Ví dụ: `ORD-241226-0001`

- ORD: Prefix cố định
- YYMMDD: Năm, tháng, ngày
- XXXX: Số thứ tự trong ngày (4 chữ số)

## Database Relations

- Order → User (many-to-one)
- Order → Address (many-to-one, nullable)
- Order → OrderItem (one-to-many)
- Order → Payment (one-to-many)
- Order → CouponUsage (one-to-one, optional)
- OrderItem → Product (many-to-one)
- OrderItem → ProductVariant (many-to-one)

## Error Codes

- `ORDER_001` - Không tìm thấy đơn hàng
- `ORDER_002` - Không thể hủy đơn hàng ở trạng thái hiện tại
- `ORDER_003` - Không thể chuyển trạng thái đơn hàng
- `ORDER_004` - Đơn hàng đã được thanh toán
- `ORDER_005` - Thanh toán đơn hàng thất bại

## Usage Example

### Tạo đơn hàng

```typescript
POST /order
Authorization: Bearer <token>

{
  "shippingAddressId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "variantId": "uuid",
      "quantity": 2
    }
  ],
  "paymentMethod": "COD",
  "couponCode": "SUMMER2024",
  "notes": "Giao hàng giờ hành chính"
}
```

### Hủy đơn hàng

```typescript
POST /order/:orderId/cancel
Authorization: Bearer <token>

{
  "reason": "Khách hàng đổi ý"
}
```

### Cập nhật trạng thái (Admin)

```typescript
PATCH /order/:orderId
Authorization: Bearer <admin-token>

{
  "status": "CONFIRMED",
  "notes": "Đã xác nhận đơn hàng"
}
```
