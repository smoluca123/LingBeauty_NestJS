# Blog Comment Routes Summary

## 📋 Public Routes

### Blog Comments (Public)

**Base URL:** `/blog-comment`

| Method | Endpoint | Description                  | Auth |
| ------ | -------- | ---------------------------- | ---- |
| GET    | `/`      | Get comments for a blog post | No   |
| GET    | `/:id`   | Get comment by ID            | No   |

---

## 🔐 Protected Routes (User)

### Blog Comments (User)

**Base URL:** `/blog-comment`

| Method | Endpoint | Description          | Auth |
| ------ | -------- | -------------------- | ---- |
| POST   | `/`      | Create a new comment | Yes  |
| PATCH  | `/:id`   | Update own comment   | Yes  |
| DELETE | `/:id`   | Delete own comment   | Yes  |

### Blog Comment Reports (User)

**Base URL:** `/blog-comment-report`

| Method | Endpoint | Description      | Auth |
| ------ | -------- | ---------------- | ---- |
| POST   | `/`      | Report a comment | Yes  |

---

## 👨‍💼 Admin Routes

### Blog Comments (Admin)

**Base URL:** `/admin/blog-comment`

| Method | Endpoint | Description        | Auth | Role    |
| ------ | -------- | ------------------ | ---- | ------- |
| PATCH  | `/:id`   | Update any comment | Yes  | MANAGER |
| DELETE | `/:id`   | Delete any comment | Yes  | MANAGER |

### Blog Comment Reports (Admin)

**Base URL:** `/admin/blog-comment-report`

| Method | Endpoint      | Description          | Auth | Role    |
| ------ | ------------- | -------------------- | ---- | ------- |
| GET    | `/`           | Get all reports      | Yes  | MANAGER |
| GET    | `/:id`        | Get report by ID     | Yes  | MANAGER |
| PATCH  | `/:id/status` | Update report status | Yes  | MANAGER |

---

## 📝 Route Details

### Public Routes

#### GET /blog-comment

Get comments for a blog post with pagination and filters.

**Query Parameters:**

- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `postId` (string, optional): Filter by post ID
- `userId` (string, optional): Filter by user ID
- `parentId` (string, optional): Filter by parent comment ID (use 'null' for top-level)

**Response:** Paginated list of comments

---

#### GET /blog-comment/:id

Get a specific comment with its replies.

**Path Parameters:**

- `id` (string): Comment ID

**Response:** Single comment with nested replies

---

### User Routes

#### POST /blog-comment

Create a new comment on a blog post.

**Request Body:**

```json
{
  "postId": "uuid",
  "content": "Comment content",
  "parentId": "uuid" // optional, for replies
}
```

**Response:** Created comment

---

#### PATCH /blog-comment/:id

Update your own comment.

**Path Parameters:**

- `id` (string): Comment ID

**Request Body:**

```json
{
  "content": "Updated content"
}
```

**Response:** Updated comment

**Restrictions:**

- Can only update own comments
- Returns 403 if not the owner

---

#### DELETE /blog-comment/:id

Delete your own comment (soft delete).

**Path Parameters:**

- `id` (string): Comment ID

**Response:** Success message

**Restrictions:**

- Can only delete own comments
- Returns 403 if not the owner

---

#### POST /blog-comment-report

Report an inappropriate comment.

**Request Body:**

```json
{
  "commentId": "uuid",
  "reason": "SPAM | INAPPROPRIATE | HARASSMENT | MISINFORMATION | OTHER",
  "description": "Optional description"
}
```

**Response:** Created report

**Restrictions:**

- Cannot report own comments
- Cannot report the same comment twice

---

### Admin Routes

#### PATCH /admin/blog-comment/:id

Admin can update any comment.

**Path Parameters:**

- `id` (string): Comment ID

**Request Body:**

```json
{
  "content": "Updated content"
}
```

**Response:** Updated comment

**Permissions:** MANAGER role required

---

#### DELETE /admin/blog-comment/:id

Admin can delete any comment (soft delete).

**Path Parameters:**

- `id` (string): Comment ID

**Response:** Success message

**Permissions:** MANAGER role required

---

#### GET /admin/blog-comment-report

Get all comment reports with filters.

**Query Parameters:**

- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `status` (enum, optional): PENDING | REVIEWED | RESOLVED | REJECTED
- `reason` (enum, optional): SPAM | INAPPROPRIATE | HARASSMENT | MISINFORMATION | OTHER
- `commentId` (string, optional): Filter by comment ID

**Response:** Paginated list of reports

**Permissions:** MANAGER role required

---

#### GET /admin/blog-comment-report/:id

Get a specific report by ID.

**Path Parameters:**

- `id` (string): Report ID

**Response:** Single report with full details

**Permissions:** MANAGER role required

---

#### PATCH /admin/blog-comment-report/:id/status

Update the status of a report.

**Path Parameters:**

- `id` (string): Report ID

**Request Body:**

```json
{
  "status": "PENDING | REVIEWED | RESOLVED | REJECTED"
}
```

**Response:** Updated report

**Permissions:** MANAGER role required

---

## 🔑 Authentication

### User Routes

- Require `Authorization: Bearer <token>` header
- Token obtained from login endpoint

### Admin Routes

- Require `Authorization: Bearer <token>` header
- User must have MANAGER role
- Returns 403 if insufficient permissions

---

## 📊 Response Format

### Success Response

```json
{
  "message": "Success message",
  "statusCode": 200,
  "date": "2024-01-15T10:30:00.000Z",
  "data": { ... }
}
```

### Pagination Response

```json
{
  "message": "Success message",
  "statusCode": 200,
  "date": "2024-01-15T10:30:00.000Z",
  "data": {
    "items": [...],
    "totalCount": 100,
    "totalPage": 10,
    "currentPage": 1,
    "pageSize": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Error Response

```json
{
  "message": "Error message",
  "statusCode": 400,
  "errorCode": "BLOG_011",
  "date": "2024-01-15T10:30:00.000Z"
}
```

---

## 🎯 Controllers

### BlogCommentController

- **Path:** `/blog-comment`
- **Purpose:** Public and user comment operations
- **Methods:** GET (public), POST, PATCH, DELETE (protected)

### BlogCommentAdminController

- **Path:** `/admin/blog-comment`
- **Purpose:** Admin comment management
- **Methods:** PATCH, DELETE
- **Guards:** AuthGuard, RoleGuard (MANAGER)

### BlogCommentReportUserController

- **Path:** `/blog-comment-report`
- **Purpose:** User report creation
- **Methods:** POST
- **Guards:** AuthGuard

### BlogCommentReportController

- **Path:** `/admin/blog-comment-report`
- **Purpose:** Admin report management
- **Methods:** GET, PATCH
- **Guards:** AuthGuard, RoleGuard (MANAGER)

---

## ✅ Summary

**Total Routes:** 11

- **Public:** 2
- **User Protected:** 4
- **Admin Protected:** 5

**Controllers:** 4

- BlogCommentController (public + user)
- BlogCommentAdminController (admin comments)
- BlogCommentReportUserController (user reports)
- BlogCommentReportController (admin reports)

All admin routes are prefixed with `/admin/` for clear separation and easier API management.
