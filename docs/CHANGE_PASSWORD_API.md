# Change Password Endpoint

## Endpoint

`POST /auth/change-password`

## Description

Endpoint để thay đổi mật khẩu cho user đã đăng nhập. Yêu cầu xác thực bằng access token.

## Authentication

- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Location**: Authorization header

## Request Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## Request Body

```json
{
  "currentPassword": "CurrentPass123!",
  "newPassword": "NewSecurePass123!"
}
```

### Validation Rules

- **currentPassword**:
  - Required
  - Must be a string
- **newPassword**:
  - Required
  - Must be a string
  - Minimum length: 8 characters
  - Maximum length: 50 characters
  - Must contain:
    - At least one uppercase letter (A-Z)
    - At least one lowercase letter (a-z)
    - At least one number (0-9)
    - At least one special character (@$!%\*?&)

## Response

### Success (200 OK)

```json
{
  "message": "Password changed successfully",
  "data": {
    "message": "Your password has been changed successfully"
  }
}
```

### Error Responses

#### 401 Unauthorized - Invalid Current Password

```json
{
  "message": "Invalid old password",
  "errorCode": "AUTH_013"
}
```

#### 401 Unauthorized - User Not Found

```json
{
  "message": "User not found",
  "errorCode": "USER_001"
}
```

#### 400 Bad Request - Same Password

```json
{
  "message": "New password must be different from current password",
  "errorCode": "AUTH_014"
}
```

#### 400 Bad Request - Validation Error

```json
{
  "message": "Validation failed",
  "errors": [
    "New password must be at least 8 characters long",
    "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ]
}
```

#### 403 Forbidden - User Banned

```json
{
  "message": "User has been banned",
  "errorCode": "AUTH_011"
}
```

## Implementation Details

### Flow

1. Xác thực access token từ Authorization header
2. Lấy userId từ decoded token
3. Lấy thông tin user từ database (bao gồm encrypted password)
4. Kiểm tra user status (deleted, banned, active)
5. Verify current password bằng bcrypt
6. Kiểm tra new password có giống current password không
7. Hash new password bằng bcrypt
8. Update password trong database
9. Trả về success response

### Security Features

- ✅ Requires authentication (JWT)
- ✅ Verifies current password before changing
- ✅ Prevents setting same password as current
- ✅ Strong password validation
- ✅ Password hashing with bcrypt
- ✅ Checks user status (banned, deleted, active)

## Example Usage

### Using cURL

```bash
curl -X POST http://localhost:3000/auth/change-password \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "OldPassword123!",
    "newPassword": "NewSecurePass123!"
  }'
```

### Using JavaScript (Fetch)

```javascript
const response = await fetch('http://localhost:3000/auth/change-password', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    currentPassword: 'OldPassword123!',
    newPassword: 'NewSecurePass123!',
  }),
});

const data = await response.json();
console.log(data);
```

### Using Axios

```javascript
import axios from 'axios';

try {
  const response = await axios.post(
    'http://localhost:3000/auth/change-password',
    {
      currentPassword: 'OldPassword123!',
      newPassword: 'NewSecurePass123!',
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  console.log(response.data);
} catch (error) {
  console.error('Error changing password:', error.response.data);
}
```

## Notes

- Password phải khác với current password
- Token phải còn valid (chưa expired)
- User không được bị banned hoặc deleted
- Password được hash bằng bcrypt với salt rounds được configure trong config
