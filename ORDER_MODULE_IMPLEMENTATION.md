# Order Module Implementation Summary

## ✅ Đã hoàn thành

### 1. Database Layer

- ✅ **Prisma Select Objects** (`server/src/libs/prisma/order-select.ts`)
  - `orderSelect` - Full order với relations
  - `orderListSelect` - Minimal select cho list view
  - `orderItemSelect` - Order items với product/variant info
  - `orderAddressSelect` - Shipping address info
  - `orderPaymentSelect` - Payment info

### 2. DTOs Layer

- ✅ **Create DTOs** (`server/src/modules/order/dto/create-order.dto.ts`)
  - `CreateOrderDto` - Tạo đơn hàng mới
  - `CreateOrderItemDto` - Item trong đơn hàng

- ✅ **Update DTOs** (`server/src/modules/order/dto/update-order.dto.ts`)
  - `UpdateOrderDto` - Cập nhật status/notes (Admin)
  - `CancelOrderDto` - Hủy đơn hàng với lý do

- ✅ **Response DTOs** (`server/src/modules/order/dto/order-response.dto.ts`)
  - `OrderResponseDto` - Full order response
  - `OrderListItemDto` - List item response
  - `OrderItemDto` - Order item detail
  - `OrderAddressDto` - Address info
  - `OrderPaymentDto` - Payment info

### 3. Service Layer

- ✅ **OrderService** (`server/src/modules/order/order.service.ts`)
  - `createOrder()` - Tạo đơn hàng với đầy đủ validation
    - Validate địa chỉ giao hàng
    - Validate sản phẩm và tồn kho
    - Áp dụng coupon (nếu có)
    - Tính toán giá (subtotal, discount, tax, shipping, total)
    - Tạo order + items + payment trong transaction
    - Cập nhật inventory
    - Cập nhật coupon usage
    - Xóa cart items
  - `getOrders()` - Lấy danh sách đơn hàng với pagination & filter
  - `getOrderById()` - Lấy chi tiết đơn hàng
  - `updateOrder()` - Cập nhật đơn hàng (Admin)
  - `cancelOrder()` - Hủy đơn hàng với inventory rollback
  - `generateOrderNumber()` - Generate order number format ORD-YYMMDD-XXXX
  - `validateStatusTransition()` - Validate status flow

### 4. Controller Layer

- ✅ **OrderController** (`server/src/modules/order/order.controller.ts`)
  - **User Endpoints:**
    - `POST /order` - Tạo đơn hàng
    - `GET /order/my-orders` - Lấy đơn hàng của tôi
    - `GET /order/:orderId` - Chi tiết đơn hàng
    - `POST /order/:orderId/cancel` - Hủy đơn hàng
  - **Admin Endpoints:**
    - `GET /order` - Lấy tất cả đơn hàng (với RoleGuard)
    - `PATCH /order/:orderId` - Cập nhật đơn hàng (với RoleGuard)

### 5. API Documentation

- ✅ **Swagger Decorators** (`server/src/modules/order/decorators/order.decorators.ts`)
  - `@ApiCreateOrder()`
  - `@ApiGetOrders()`
  - `@ApiGetMyOrders()`
  - `@ApiGetOrder()`
  - `@ApiUpdateOrder()`
  - `@ApiCancelOrder()`

### 6. Module Configuration

- ✅ **OrderModule** (`server/src/modules/order/order.module.ts`)
  - Import PrismaModule, StatsModule
  - Export OrderService
- ✅ **App Module** - Đã register OrderModule

### 7. Error Handling

- ✅ **Error Codes** - Đã thêm vào `server/src/constants/error-codes.ts`
  - `ORDER_001` - ORDER_NOT_FOUND
  - `ORDER_002` - ORDER_CANNOT_BE_CANCELLED
  - `ORDER_003` - INVALID_ORDER_STATUS_TRANSITION
  - `ORDER_004` - ORDER_ALREADY_PAID
  - `ORDER_005` - ORDER_PAYMENT_FAILED

- ✅ **Error Messages** - Đã thêm vào `server/src/constants/error-messages.ts`
  - Tất cả messages bằng tiếng Việt

### 8. Documentation

- ✅ **README.md** - Tài liệu chi tiết về module

## 🎯 Tính năng chính

### Order Creation Flow

1. Validate shipping address (phải thuộc về user)
2. Validate từng product variant:
   - Sản phẩm phải active
   - Kiểm tra tồn kho
   - Không vượt quá backorder limit
3. Tính toán giá:
   - Subtotal từ items
   - Áp dụng coupon (nếu có)
   - Tax (TODO: implement)
   - Shipping (TODO: implement)
   - Total = subtotal + tax + shipping - discount
4. Tạo order trong transaction:
   - Tạo Order record
   - Tạo OrderItem records
   - Tạo Payment record (PENDING)
   - Cập nhật inventory (decrement)
   - Cập nhật coupon usage
   - Xóa cart items
5. Generate order number: ORD-YYMMDD-XXXX

### Coupon Validation

- Coupon phải tồn tại và active
- Trong thời gian hiệu lực (startDate - endDate)
- Chưa hết lượt sử dụng (usageLimit)
- Đạt giá trị đơn hàng tối thiểu (minPurchase)
- Tính discount:
  - FIXED: Giảm cố định (không vượt quá subtotal)
  - PERCENTAGE: Giảm % (không vượt quá maxDiscount)

### Order Status Flow

```
PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
   ↓          ↓            ↓
CANCELLED  CANCELLED  CANCELLED

DELIVERED → REFUNDED
```

### Cancel Order

- Chỉ cho phép hủy ở trạng thái PENDING hoặc CONFIRMED
- Hoàn lại inventory (increment quantity)
- Cập nhật status = CANCELLED
- Thêm lý do hủy vào notes

## 🔒 Security & Authorization

- Tất cả endpoints yêu cầu JWT authentication (`@UseGuards(AuthGuard('jwt'))`)
- Admin endpoints yêu cầu role level 3 (`@UseGuards(RoleGuard)` + `@Roles([3])`)
- User chỉ xem được đơn hàng của mình
- Admin xem được tất cả đơn hàng

## 📊 Query Features

### Pagination

- `page` - Trang hiện tại (default: 1)
- `limit` - Số items per page (default: 10)

### Filters

- `userId` - Filter theo user (Admin only)
- `status` - Filter theo trạng thái
- `orderNumber` - Search theo order number

### Sorting

- `sortBy` - createdAt | total | orderNumber (default: createdAt)
- `order` - asc | desc (default: desc)

## 🧪 Testing Checklist

### User Flow

- [ ] Tạo đơn hàng thành công
- [ ] Tạo đơn hàng với coupon
- [ ] Tạo đơn hàng khi hết hàng (should fail)
- [ ] Tạo đơn hàng với địa chỉ không thuộc user (should fail)
- [ ] Xem danh sách đơn hàng của tôi
- [ ] Xem chi tiết đơn hàng
- [ ] Hủy đơn hàng ở trạng thái PENDING
- [ ] Hủy đơn hàng ở trạng thái SHIPPED (should fail)

### Admin Flow

- [ ] Xem tất cả đơn hàng
- [ ] Filter đơn hàng theo status
- [ ] Search đơn hàng theo order number
- [ ] Cập nhật status PENDING → CONFIRMED
- [ ] Cập nhật status CONFIRMED → PROCESSING
- [ ] Cập nhật status invalid transition (should fail)

### Edge Cases

- [ ] Coupon hết hạn
- [ ] Coupon hết lượt sử dụng
- [ ] Coupon chưa đạt min purchase
- [ ] Inventory không đủ
- [ ] Multiple items trong order
- [ ] Order number unique trong ngày

## 📝 TODO / Future Enhancements

1. **Tax Calculation**
   - Implement tax calculation logic
   - Support different tax rates by region

2. **Shipping Calculation**
   - Integrate shipping provider API
   - Calculate shipping cost by weight/distance

3. **Payment Integration**
   - Integrate payment gateways (MoMo, ZaloPay, VNPay)
   - Handle payment callbacks
   - Update payment status

4. **Order Tracking**
   - Add tracking number
   - Add status history
   - Send notifications on status change

5. **Flash Sale Integration**
   - Validate flash sale products
   - Apply flash sale prices
   - Create FlashSaleOrder record

6. **Affiliate Commission**
   - Calculate commission
   - Create AffiliateCommission record

7. **Email Notifications**
   - Send order confirmation email
   - Send status update emails
   - Send invoice

8. **Admin Features**
   - Bulk update orders
   - Export orders to CSV/Excel
   - Order analytics dashboard

## 🏗️ Code Style Compliance

✅ Tuân thủ 100% phong cách code trong `.kiro/steering/project-code-style-guide.md`:

- ✅ Module structure: controller, service, dto, decorators
- ✅ Naming conventions: PascalCase cho DTOs, camelCase cho functions
- ✅ Error handling: BusinessException với error codes
- ✅ Response format: IBeforeTransformResponseType
- ✅ Prisma select objects: Reusable, type-safe
- ✅ API decorators: Swagger documentation
- ✅ Guards: JWT + Role-based authorization
- ✅ Comments: Tiếng Việt cho business logic
- ✅ Transaction: Sử dụng Prisma transaction cho atomic operations

## 🚀 Deployment Notes

1. Đảm bảo Prisma schema đã được migrate:

   ```bash
   cd server
   npx prisma migrate dev
   ```

2. Build và start server:

   ```bash
   npm run build
   npm run start:prod
   ```

3. Kiểm tra Swagger docs tại: `http://localhost:3000/api`

4. Test endpoints với Postman hoặc curl

## 📞 Support

Nếu có vấn đề, kiểm tra:

- Logs trong console
- Error codes trong response
- Database constraints
- Prisma schema relations
