# Change Password Error Codes Summary

## Error Codes Reference

### AUTH_013 - Invalid Old Password

**HTTP Status:** 401 Unauthorized

```json
{
  "message": "Invalid old password",
  "errorCode": "AUTH_013"
}
```

**Khi nào xảy ra:** User nhập sai current password

**Frontend action:** Hiển thị lỗi ở field current password, yêu cầu user nhập lại

---

### AUTH_014 - Password Same As Current

**HTTP Status:** 400 Bad Request

```json
{
  "message": "New password must be different from current password",
  "errorCode": "AUTH_014"
}
```

**Khi nào xảy ra:** User cố gắng đổi sang password giống với password hiện tại

**Frontend action:** Hiển thị lỗi ở field new password, yêu cầu user nhập password khác

---

### USER_001 - User Not Found

**HTTP Status:** 401 Unauthorized

```json
{
  "message": "User not found",
  "errorCode": "USER_001"
}
```

**Khi nào xảy ra:** User không tồn tại hoặc đã bị xóa

**Frontend action:** Logout user, redirect về trang login

---

### AUTH_011 - User Banned

**HTTP Status:** 403 Forbidden

```json
{
  "message": "User has been banned",
  "errorCode": "AUTH_011"
}
```

**Khi nào xảy ra:** User bị banned hoặc inactive

**Frontend action:** Hiển thị thông báo tài khoản bị khóa, logout user

---

### VAL_001 - Validation Failed

**HTTP Status:** 400 Bad Request

```json
{
  "message": "Validation failed",
  "errors": [
    "New password must be at least 8 characters long",
    "New password must contain at least one uppercase letter..."
  ]
}
```

**Khi nào xảy ra:** Password không đáp ứng yêu cầu validate

**Frontend action:** Hiển thị danh sách lỗi validation ở field new password

---

## Frontend Implementation Example

```typescript
// Type definitions
type ChangePasswordErrorCode =
  | 'AUTH_013' // Invalid old password
  | 'AUTH_014' // Password same as current
  | 'USER_001' // User not found
  | 'AUTH_011' // User banned
  | 'VAL_001'; // Validation failed

interface ChangePasswordError {
  message: string;
  errorCode: ChangePasswordErrorCode;
}

// Error handler
const handleChangePasswordError = (error: ChangePasswordError) => {
  switch (error.errorCode) {
    case 'AUTH_013':
      // Show error on current password field
      setError('currentPassword', {
        type: 'manual',
        message: 'Mật khẩu hiện tại không đúng',
      });
      break;

    case 'AUTH_014':
      // Show error on new password field
      setError('newPassword', {
        type: 'manual',
        message: 'Mật khẩu mới phải khác với mật khẩu hiện tại',
      });
      break;

    case 'USER_001':
      // User not found - logout and redirect
      logout();
      router.push('/login');
      toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
      break;

    case 'AUTH_011':
      // User banned - logout and show message
      logout();
      toast.error('Tài khoản của bạn đã bị khóa');
      router.push('/login');
      break;

    default:
      // Generic error
      toast.error(error.message);
  }
};

// Usage with axios
try {
  await axios.post('/auth/change-password', {
    currentPassword,
    newPassword,
  });

  toast.success('Đổi mật khẩu thành công');
} catch (error) {
  if (axios.isAxiosError(error) && error.response?.data) {
    handleChangePasswordError(error.response.data);
  }
}
```

## Best Practices

1. **Specific Error Handling:** Mỗi error code có action cụ thể, không dùng generic error
2. **User-Friendly Messages:** Convert server message sang tiếng Việt cho user
3. **Form Validation:** Show error ngay tại field tương ứng
4. **Security:** Logout user khi có lỗi liên quan đến authentication
5. **User Feedback:** Dùng toast/notification để thông báo kết quả
