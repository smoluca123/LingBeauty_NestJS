# Server Documentation

Documentation cho backend server của dự án.

## 📁 Cấu trúc thư mục

```
server/docs/
├── api/                    # API Documentation (for Frontend integration)
│   ├── BLOG_API.md        # ⭐ Blog API endpoints (Public + Admin)
│   ├── CHANGE_PASSWORD_API.md
│   ├── CHANGE_PASSWORD_ERROR_CODES.md
│   ├── CHANGE_PASSWORD_QUICK_REF.md
│   └── HOT_PRODUCTS_API.md
│
├── implementation/         # Implementation details & summaries
│   ├── BACKEND-UPDATE-SUMMARY.md
│   ├── BACKEND-UPDATES-COMPLETED.md
│   ├── DEFAULT-VARIANT-CHECKLIST.md
│   ├── FILE_UPLOAD_VALIDATION_COMPLETE.md
│   ├── ORDER_MODULE_IMPLEMENTATION.md
│   ├── PRODUCT_SERVICE_SOFT_DELETE_ANALYSIS.md
│   ├── SOFT_DELETE_IMPLEMENTATION_SUMMARY.md
│   ├── SOFT_DELETE_MIGRATION_PLAN.md
│   ├── SOFT_DELETE_PROGRESS.md
│   ├── STORJ_S3_INTEGRATION_SUMMARY.md
│   ├── TASK_1_COMPLETION_SUMMARY.md
│   ├── TASK_2_COMPLETION_SUMMARY.md
│   ├── TASK_2_IMPLEMENTATION_PLAN.md
│   ├── TASK_3_COMPLETION_SUMMARY.md
│   ├── TASK_3.4_COMPLETION_SUMMARY.md
│   ├── TEST_SETUP.md
│   ├── UPDATE_SOFT_DELETE.md
│   ├── CHANGE_PASSWORD_IMPLEMENTATION_SUMMARY.md
│   ├── default-variant-implementation.md
│   └── BACKEND-CHANGES-NEEDED.md
│
└── migration/              # Migration guides
    ├── MIGRATION_GUIDE.md
    ├── MIGRATION-SUMMARY.md
    ├── migration-api-guide.md
    └── MIGRATION-QUICK-START.md
```

## 📖 API Documentation (`api/`)

Documentation về các API endpoints để Frontend team integrate:

- **Blog API** ⭐ - Complete blog endpoints (Public + Admin)
- Change Password API
- Hot Products API
- Error codes và quick references

**Dành cho Frontend Developers:** Đọc các file trong thư mục này để hiểu cách gọi API, request/response format, và error handling.

## 🔧 Implementation (`implementation/`)

Chi tiết về implementation của các features:

- Soft delete implementation
- File upload validation
- Order module
- Product service
- S3 integration
- Test setup guides
- Task completion summaries

## 🚀 Migration (`migration/`)

Hướng dẫn migration và API changes:

- Migration guides
- Quick start guides
- API migration guides

## 🎯 Quick Links

### For New Developers:

1. [Migration Quick Start](./migration/MIGRATION-QUICK-START.md)
2. [Backend Changes Needed](./implementation/BACKEND-CHANGES-NEEDED.md)

### For API Integration (Frontend):

1. [Blog API Documentation](./api/BLOG_API.md) ⭐
2. [Change Password API](./api/CHANGE_PASSWORD_API.md)
3. [Hot Products API](./api/HOT_PRODUCTS_API.md)

### For Testing:

1. [Test Setup Guide](./implementation/TEST_SETUP.md)

### For Feature Implementation:

1. [Soft Delete Implementation](./implementation/SOFT_DELETE_IMPLEMENTATION_SUMMARY.md)
2. [Order Module Implementation](./implementation/ORDER_MODULE_IMPLEMENTATION.md)
3. [File Upload Validation](./implementation/FILE_UPLOAD_VALIDATION_COMPLETE.md)
