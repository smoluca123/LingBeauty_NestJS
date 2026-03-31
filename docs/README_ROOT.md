# Documentation Structure

Thư mục này chứa tất cả documentation cho dự án, được tổ chức theo mục đích sử dụng.

## 📁 Cấu trúc thư mục

```
docs/
├── api/                    # API Documentation cho Frontend
│   └── BLOG_API.md        # Blog API endpoints, request/response
│
├── implementation/         # Implementation notes (Backend)
│   └── (moved to server/docs/implementation/)
│
└── migration/             # Migration guides
    └── (moved to server/docs/migration/)
```

## 📖 API Documentation (`docs/api/`)

Thư mục này chứa các file documentation về API để Frontend team có thể implement.

### Các file hiện có:

- **BLOG_API.md**: Đầy đủ thông tin về Blog API
  - Public endpoints (không cần auth)
  - Admin endpoints (cần auth)
  - Request/Response examples
  - Data models
  - Error responses

### Cách sử dụng:

Frontend developers nên đọc các file trong thư mục này để:

1. Hiểu rõ API endpoints
2. Biết cách gọi API (method, headers, body)
3. Hiểu structure của response data
4. Handle errors đúng cách

## 🔧 Backend Documentation

Backend documentation được tổ chức trong `server/docs/`:

- `server/docs/implementation/` - Implementation details, summaries
- `server/docs/migration/` - Migration guides
- `server/docs/api/` - Backend-specific API docs

## 📝 Frontend Documentation

Frontend documentation được tổ chức trong `client/docs/`:

- Implementation summaries
- Update notes
- Feature-specific docs

## 🎯 Quick Links

### For Frontend Developers:

- [Blog API Documentation](./api/BLOG_API.md)

### For Backend Developers:

- [Server Implementation Docs](../server/docs/implementation/)
- [Migration Guides](../server/docs/migration/)

### For All Developers:

- [Server README](../server/README.md)
- [Client README](../client/README.md)
