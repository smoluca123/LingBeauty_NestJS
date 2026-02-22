import { ERROR_CODES } from './error-codes';

export const ERROR_MESSAGES = {
  // Authentication & Authorization
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Tên đăng nhập hoặc mật khẩu không đúng',
  [ERROR_CODES.INVALID_USERNAME]: 'Tên đăng nhập không hợp lệ',
  [ERROR_CODES.INVALID_PASSWORD]: 'Mật khẩu không chính xác',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Phiên đăng nhập đã hết hạn',
  [ERROR_CODES.TOKEN_INVALID]: 'Phiên đăng nhập không hợp lệ',
  [ERROR_CODES.INSUFFICIENT_PERMISSIONS]:
    'Bạn không có quyền thực hiện hành động này',
  [ERROR_CODES.ACCOUNT_LOCKED]: 'Tài khoản đã bị khóa vì lý do bảo mật',
  [ERROR_CODES.INVALID_ACCESS_TOKEN]: 'Access token không hợp lệ',
  [ERROR_CODES.INVALID_REFRESH_TOKEN]: 'Refresh token không hợp lệ',
  [ERROR_CODES.USER_BANNED]: 'Tài khoản đã bị cấm',
  [ERROR_CODES.INVALID_OLD_PASSWORD]: 'Mật khẩu cũ không chính xác',
  [ERROR_CODES.NOT_LOGGED_IN_FOR_FIRST_TIME]:
    'Người dùng không phải đăng nhập lần đầu',
  [ERROR_CODES.PASSWORD_SAME_AS_CURRENT]:
    'Mật khẩu mới phải khác mật khẩu hiện tại',
  [ERROR_CODES.USER_OVER_STORAGE_LIMIT]:
    'Người dùng đã đạt giới hạn dung lượng lưu trữ',
  [ERROR_CODES.SUBSCRIPTION_NOT_FOUND]: 'Không tìm thấy gói đăng ký',
  [ERROR_CODES.USER_STATS_NOT_FOUND]: 'Không tìm thấy thống kê người dùng',
  [ERROR_CODES.UPDATE_AVATAR_FAILED]: 'Cập nhật ảnh đại diện thất bại',
  [ERROR_CODES.EMAIL_NOT_FOUND]: 'Không tìm thấy email',

  // Category
  [ERROR_CODES.CATEGORY_NOT_FOUND]: 'Không tìm thấy danh mục',
  [ERROR_CODES.CATEGORY_ALREADY_EXISTS]: 'Danh mục đã tồn tại',
  [ERROR_CODES.CATEGORY_CANNOT_BE_OWN_PARENT]:
    'Danh mục không thể là danh mục cha của chính nó',
  [ERROR_CODES.PARENT_CATEGORY_NOT_FOUND]: 'Không tìm thấy danh mục cha',
  [ERROR_CODES.DELETE_CATEGORY_HAS_CHILDREN]:
    'Không thể xóa danh mục có danh mục con',
  [ERROR_CODES.DELETE_CATEGORY_HAS_PRODUCTS]:
    'Không thể xóa danh mục có sản phẩm',

  // Brand
  [ERROR_CODES.BRAND_NOT_FOUND]: 'Không tìm thấy thương hiệu',
  [ERROR_CODES.BRAND_ALREADY_EXISTS]: 'Thương hiệu đã tồn tại',
  [ERROR_CODES.DELETE_BRAND_HAS_PRODUCTS]:
    'Không thể xóa thương hiệu có sản phẩm',

  // Product
  [ERROR_CODES.PRODUCT_NOT_FOUND]: 'Không tìm thấy sản phẩm',
  [ERROR_CODES.PRODUCT_SKU_EXISTS]: 'Mã SKU sản phẩm đã tồn tại',
  [ERROR_CODES.PRODUCT_VARIANT_SKU_EXISTS]:
    'Mã SKU biến thể sản phẩm đã tồn tại',
  [ERROR_CODES.PRODUCT_HAS_ORDERS]: 'Không thể xóa sản phẩm đã có đơn hàng',
  [ERROR_CODES.PRODUCT_IMAGE_NOT_FOUND]: 'Không tìm thấy hình ảnh sản phẩm',
  [ERROR_CODES.PRODUCT_IMAGE_LIMIT_EXCEEDED]:
    'Đã vượt quá số lượng hình ảnh sản phẩm cho phép',
  [ERROR_CODES.PRODUCT_VIDEO_NOT_FOUND]: 'Không tìm thấy video sản phẩm',
  [ERROR_CODES.PRODUCT_VARIANT_NOT_FOUND]: 'Không tìm thấy biến thể sản phẩm',
  [ERROR_CODES.PRODUCT_VARIANT_HAS_ORDERS]:
    'Không thể xóa biến thể sản phẩm đã có đơn hàng',

  // Review
  [ERROR_CODES.REVIEW_NOT_FOUND]: 'Không tìm thấy đánh giá',
  [ERROR_CODES.REVIEW_ALREADY_EXISTS]: 'Bạn đã đánh giá sản phẩm này rồi',
  [ERROR_CODES.REVIEW_IMAGE_NOT_FOUND]: 'Không tìm thấy hình ảnh đánh giá',
  [ERROR_CODES.REVIEW_IMAGE_LIMIT_EXCEEDED]:
    'Đã vượt quá số lượng hình ảnh đánh giá cho phép',
  [ERROR_CODES.REVIEW_NOT_OWNED]: 'Bạn không có quyền chỉnh sửa đánh giá này',

  // Banner
  [ERROR_CODES.BANNER_GROUP_NOT_FOUND]: 'Không tìm thấy nhóm banner',
  [ERROR_CODES.BANNER_GROUP_SLUG_EXISTS]: 'Nhóm banner với slug này đã tồn tại',
  [ERROR_CODES.BANNER_NOT_FOUND]: 'Không tìm thấy banner',
  [ERROR_CODES.NO_ACTIVE_BANNER_GROUP]:
    'Không tìm thấy nhóm banner đang hoạt động',

  // Referral
  [ERROR_CODES.REFERRAL_NOT_FOUND]: 'Không tìm thấy mã giới thiệu',
  [ERROR_CODES.REFERRAL_USER_ALREADY_EXISTS]:
    'Người dùng giới thiệu đã tồn tại',
  [ERROR_CODES.REFERRAL_STATS_NOT_FOUND]: 'Không tìm thấy thống kê giới thiệu',

  // Mail
  [ERROR_CODES.MAIL_CONFIGURATION_ERROR]: 'Lỗi cấu hình email',
  [ERROR_CODES.MAIL_SEND_FAILED]: 'Gửi email thất bại',
  [ERROR_CODES.MAIL_TEMPLATE_NOT_FOUND]: 'Không tìm thấy mẫu email',
  [ERROR_CODES.MAIL_INVALID_EMAIL]: 'Địa chỉ email không hợp lệ',
  [ERROR_CODES.MAIL_SMTP_CONNECTION_FAILED]: 'Kết nối SMTP thất bại',

  // User Management
  [ERROR_CODES.USER_NOT_FOUND]: 'Không tìm thấy người dùng',
  [ERROR_CODES.USER_ALREADY_EXISTS]: 'Người dùng đã tồn tại',
  [ERROR_CODES.USER_INACTIVE]: 'Tài khoản người dùng đã bị vô hiệu hóa',
  [ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Địa chỉ email đã được đăng ký',
  [ERROR_CODES.INVALID_USER_DATA]: 'Dữ liệu người dùng không hợp lệ',
  [ERROR_CODES.UPDATE_USER_FAILED]: 'Cập nhật người dùng thất bại',
  [ERROR_CODES.PHONE_ALREADY_EXISTS]: 'Số điện thoại đã được đăng ký',
  [ERROR_CODES.USERNAME_ALREADY_EXISTS]: 'Tên đăng nhập đã được sử dụng',
  [ERROR_CODES.ADDRESS_NOT_FOUND]: 'Không tìm thấy địa chỉ',
  [ERROR_CODES.CREATE_ADDRESS_FAILED]: 'Tạo địa chỉ thất bại',
  [ERROR_CODES.UPDATE_ADDRESS_FAILED]: 'Cập nhật địa chỉ thất bại',
  [ERROR_CODES.DELETE_ADDRESS_FAILED]: 'Xóa địa chỉ thất bại',
  [ERROR_CODES.ADDRESS_NOT_OWNED]: 'Bạn không có quyền truy cập địa chỉ này',
  [ERROR_CODES.UNAUTHORIZED]: 'Chưa xác thực',

  // Business Logic
  [ERROR_CODES.INVALID_OPERATION]: 'Thao tác không hợp lệ',
  [ERROR_CODES.RESOURCE_NOT_FOUND]: 'Không tìm thấy tài nguyên yêu cầu',
  [ERROR_CODES.OPERATION_NOT_ALLOWED]: 'Thao tác không được phép',
  [ERROR_CODES.BUSINESS_RULE_VIOLATION]: 'Vi phạm quy tắc nghiệp vụ',
  [ERROR_CODES.INSUFFICIENT_BALANCE]: 'Số dư không đủ để thực hiện thao tác',
  [ERROR_CODES.NOT_ALLOWED_TO_ACCESS_FILE]:
    'Bạn không có quyền truy cập tệp này',

  // Validation
  [ERROR_CODES.VALIDATION_FAILED]: 'Xác thực dữ liệu thất bại',
  [ERROR_CODES.INVALID_INPUT_FORMAT]: 'Định dạng dữ liệu không hợp lệ',
  [ERROR_CODES.REQUIRED_FIELD_MISSING]: 'Thiếu trường bắt buộc',
  [ERROR_CODES.INVALID_FILE_TYPE]: 'Loại tệp không hợp lệ',
  [ERROR_CODES.FILE_TOO_LARGE]: 'Kích thước tệp vượt quá giới hạn cho phép',

  // System Errors
  [ERROR_CODES.DATABASE_ERROR]: 'Thao tác cơ sở dữ liệu thất bại',
  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: 'Dịch vụ bên ngoài không khả dụng',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]:
    'Đã vượt quá giới hạn truy cập. Vui lòng thử lại sau',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Dịch vụ tạm thời không khả dụng',
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Đã xảy ra lỗi máy chủ nội bộ',
  [ERROR_CODES.NOT_ALLOWED_BY_CORS]: 'Không được phép bởi CORS',
} as const;

export const getErrorMessage = (errorCode: string): string => {
  return (
    ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES] ||
    'Đã xảy ra lỗi không xác định'
  );
};
