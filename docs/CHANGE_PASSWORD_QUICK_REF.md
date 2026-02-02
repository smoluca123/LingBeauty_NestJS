# 🔐 Change Password - Quick Reference

## Endpoint

```
POST /auth/change-password
```

## Headers

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## Request Body

```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

## Success Response

```json
{
  "message": "Password changed successfully",
  "data": {
    "message": "Your password has been changed successfully"
  }
}
```

## Error Codes Quick Map

| Code       | Meaning                | Action                               |
| ---------- | ---------------------- | ------------------------------------ |
| `AUTH_013` | Wrong current password | Show error on current password field |
| `AUTH_014` | New = Current password | Ask for different password           |
| `USER_001` | User not exist         | Logout user                          |
| `AUTH_011` | User banned            | Show banned message                  |

## Password Rules

- ✅ Min 8 characters
- ✅ Max 50 characters
- ✅ At least 1 uppercase (A-Z)
- ✅ At least 1 lowercase (a-z)
- ✅ At least 1 number (0-9)
- ✅ At least 1 special char (@$!%\*?&)

## Frontend Quick Integration

### Simple Fetch

```typescript
const response = await fetch('/auth/change-password', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ currentPassword, newPassword }),
});
```

### Axios

```typescript
await axios.post(
  '/auth/change-password',
  { currentPassword, newPassword },
  { headers: { Authorization: `Bearer ${token}` } },
);
```

### Error Handling

```typescript
try {
  await changePassword(data);
  toast.success('✅ Password changed!');
} catch (error) {
  switch (error.errorCode) {
    case 'AUTH_013':
      setError('currentPassword', { message: 'Wrong password' });
      break;
    case 'AUTH_014':
      setError('newPassword', { message: 'Use different password' });
      break;
    default:
      toast.error(error.message);
  }
}
```

---

**Files Modified:**

- ✅ `auth.service.ts` - Business logic
- ✅ `auth.controller.ts` - Endpoint
- ✅ `change-password.dto.ts` - Validation
- ✅ `error-codes.ts` - New code AUTH_014
- ✅ `error-messages.ts` - New message

**Status:** ✅ Ready to use
