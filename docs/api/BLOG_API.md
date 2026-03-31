# Blog API Documentation

## Base URL

```
http://localhost:8080
```

## Authentication

- **Public APIs**: Không cần authentication
- **Admin APIs**: Yêu cầu JWT token trong header `Authorization: Bearer <token>`

---

## Table of Contents

1. [Public Blog Topic APIs](#public-blog-topic-apis)
2. [Public Blog Post APIs](#public-blog-post-apis)
3. [Admin Blog Topic APIs](#admin-blog-topic-apis)
4. [Admin Blog Post APIs](#admin-blog-post-apis)
5. [Data Models](#data-models)

---

## Public Blog Topic APIs

### 1. Get All Public Topics

Lấy danh sách tất cả các blog topics đang active (công khai).

**Endpoint:** `GET /public/blog-topic`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Số trang |
| limit | number | No | 10 | Số items mỗi trang (max: 100) |
| search | string | No | - | Tìm kiếm theo tên topic |
| isActive | boolean | No | - | Lọc theo trạng thái active |

**Example Request:**

```bash
GET /public/blog-topic?page=1&limit=10&isActive=true
```

**Response (200 OK):**

```json
{
  "message": "Lấy danh sách chủ đề blog thành công",
  "data": {
    "totalCount": 2,
    "totalPage": 1,
    "currentPage": 1,
    "pageSize": 10,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "items": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Beauty Tips",
        "slug": "beauty-tips",
        "description": "Tips and tricks for beauty care",
        "parentId": null,
        "sortOrder": 0,
        "isActive": true,
        "imageMedia": {
          "id": "media-id",
          "url": "https://example.com/image.jpg",
          "type": "BLOG_TOPIC_IMAGE"
        },
        "postCount": 5,
        "children": [],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "statusCode": 200,
  "date": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Get Topic By Slug

Lấy thông tin chi tiết một topic theo slug.

**Endpoint:** `GET /public/blog-topic/slug/:slug`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| slug | string | Yes | Slug của topic |

**Example Request:**

```bash
GET /public/blog-topic/slug/beauty-tips
```

**Response (200 OK):**

```json
{
  "message": "Lấy thông tin chủ đề blog thành công",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Beauty Tips",
    "slug": "beauty-tips",
    "description": "Tips and tricks for beauty care",
    "parentId": null,
    "sortOrder": 0,
    "isActive": true,
    "imageMedia": {
      "id": "media-id",
      "url": "https://example.com/image.jpg",
      "type": "BLOG_TOPIC_IMAGE"
    },
    "postCount": 5,
    "children": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 200,
  "date": "2024-01-01T00:00:00.000Z"
}
```

---

## Public Blog Post APIs

### 3. Get All Public Posts

Lấy danh sách tất cả các blog posts đã published (công khai).

**Endpoint:** `GET /public/blog-post`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Số trang |
| limit | number | No | 10 | Số items mỗi trang |
| search | string | No | - | Tìm kiếm theo title, content, tags |
| topicId | string (UUID) | No | - | Lọc theo topic ID |
| tag | string | No | - | Lọc theo tag |
| sortBy | string | No | createdAt | Sắp xếp theo field (createdAt, updatedAt, title, viewCount) |
| order | string | No | desc | Thứ tự sắp xếp (asc, desc) |

**Example Request:**

```bash
GET /public/blog-post?page=1&limit=10&topicId=123e4567-e89b-12d3-a456-426614174000&sortBy=viewCount&order=desc
```

**Response (200 OK):**

```json
{
  "message": "Lấy danh sách bài viết blog thành công",
  "data": {
    "totalCount": 10,
    "totalPage": 1,
    "currentPage": 1,
    "pageSize": 10,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "items": [
      {
        "id": "post-id-1",
        "title": "Top 10 Beauty Tips for Summer",
        "slug": "top-10-beauty-tips-for-summer",
        "content": "<p>Here are the top 10 beauty tips...</p>",
        "excerpt": "Discover the best beauty tips for summer season",
        "topicId": "123e4567-e89b-12d3-a456-426614174000",
        "authorId": "author-id",
        "status": "PUBLISHED",
        "tags": ["beauty", "skincare", "summer"],
        "viewCount": 150,
        "metaTitle": "Top 10 Beauty Tips for Summer 2024",
        "metaDescription": "Discover the best beauty tips...",
        "publishedAt": "2024-01-01T00:00:00.000Z",
        "topic": {
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "name": "Beauty Tips",
          "slug": "beauty-tips"
        },
        "author": {
          "id": "author-id",
          "username": "admin",
          "email": "admin@example.com"
        },
        "featuredImage": {
          "id": "media-id",
          "url": "https://example.com/featured.jpg",
          "type": "BLOG_POST_IMAGE"
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "statusCode": 200,
  "date": "2024-01-01T00:00:00.000Z"
}
```

---

### 4. Get Post By Slug

Lấy thông tin chi tiết một post theo slug (tự động tăng view count).

**Endpoint:** `GET /public/blog-post/slug/:slug`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| slug | string | Yes | Slug của post |

**Example Request:**

```bash
GET /public/blog-post/slug/top-10-beauty-tips-for-summer
```

**Response (200 OK):**

```json
{
  "message": "Lấy thông tin bài viết blog thành công",
  "data": {
    "id": "post-id-1",
    "title": "Top 10 Beauty Tips for Summer",
    "slug": "top-10-beauty-tips-for-summer",
    "content": "<p>Here are the top 10 beauty tips...</p>",
    "excerpt": "Discover the best beauty tips for summer season",
    "topicId": "123e4567-e89b-12d3-a456-426614174000",
    "authorId": "author-id",
    "status": "PUBLISHED",
    "tags": ["beauty", "skincare", "summer"],
    "viewCount": 151,
    "metaTitle": "Top 10 Beauty Tips for Summer 2024",
    "metaDescription": "Discover the best beauty tips...",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "topic": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Beauty Tips",
      "slug": "beauty-tips",
      "description": "Tips and tricks for beauty care"
    },
    "author": {
      "id": "author-id",
      "username": "admin",
      "email": "admin@example.com",
      "fullName": "Admin User"
    },
    "featuredImage": {
      "id": "media-id",
      "url": "https://example.com/featured.jpg",
      "type": "BLOG_POST_IMAGE"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 200,
  "date": "2024-01-01T00:00:00.000Z"
}
```

---

## Admin Blog Topic APIs

**Authentication Required:** Bearer Token

### 5. Get All Topics (Admin)

Lấy danh sách tất cả topics (bao gồm cả inactive).

**Endpoint:** `GET /blog-topic`

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:** Giống như Public API

**Response:** Giống như Public API nhưng bao gồm cả inactive topics

---

### 6. Create Topic

Tạo topic mới.

**Endpoint:** `POST /blog-topic`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Beauty Tips",
  "description": "Tips and tricks for beauty care",
  "sortOrder": 0,
  "isActive": true
}
```

**Response (201 Created):**

```json
{
  "message": "Tạo chủ đề blog thành công",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Beauty Tips",
    "slug": "beauty-tips",
    "description": "Tips and tricks for beauty care",
    "parentId": null,
    "sortOrder": 0,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 201,
  "date": "2024-01-01T00:00:00.000Z"
}
```

---

### 7. Create Sub-Topic

Tạo sub-topic dưới một parent topic.

**Endpoint:** `POST /blog-topic/:parentId/sub-topic`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| parentId | string (UUID) | Yes | ID của parent topic |

**Request Body:**

```json
{
  "name": "Skincare Tips",
  "description": "Skincare specific tips",
  "sortOrder": 0,
  "isActive": true
}
```

**Response (201 Created):** Giống như Create Topic

---

### 8. Get Topic By ID

Lấy thông tin topic theo ID.

**Endpoint:** `GET /blog-topic/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của topic |

**Response (200 OK):** Giống như Get Topic By Slug

---

### 9. Update Topic

Cập nhật thông tin topic.

**Endpoint:** `PATCH /blog-topic/:id`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của topic |

**Request Body:** (Tất cả fields đều optional)

```json
{
  "name": "Updated Beauty Tips",
  "description": "Updated description",
  "sortOrder": 1,
  "isActive": false
}
```

**Response (200 OK):**

```json
{
  "message": "Cập nhật chủ đề blog thành công",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Updated Beauty Tips",
    "slug": "updated-beauty-tips",
    "description": "Updated description",
    "sortOrder": 1,
    "isActive": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  },
  "statusCode": 200,
  "date": "2024-01-02T00:00:00.000Z"
}
```

---

### 10. Delete Topic

Xóa topic (soft delete).

**Endpoint:** `DELETE /blog-topic/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của topic |

**Response (200 OK):**

```json
{
  "message": "Xóa chủ đề blog thành công",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Beauty Tips",
    "slug": "beauty-tips",
    "deletedAt": "2024-01-02T00:00:00.000Z"
  },
  "statusCode": 200,
  "date": "2024-01-02T00:00:00.000Z"
}
```

---

### 11. Upload Topic Image

Upload ảnh cho topic.

**Endpoint:** `POST /blog-topic/:id/upload/image`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của topic |

**Request Body (Form Data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| file | File | Yes | Image file (jpg, png, etc.) |

**Response (201 Created):**

```json
{
  "message": "Upload ảnh chủ đề blog thành công",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Beauty Tips",
    "slug": "beauty-tips",
    "imageMedia": {
      "id": "media-id",
      "url": "https://example.com/image.jpg",
      "type": "BLOG_TOPIC_IMAGE"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  },
  "statusCode": 201,
  "date": "2024-01-02T00:00:00.000Z"
}
```

---

## Admin Blog Post APIs

**Authentication Required:** Bearer Token

### 12. Get All Posts (Admin)

Lấy danh sách tất cả posts (bao gồm cả draft).

**Endpoint:** `GET /blog-post`

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Số trang |
| limit | number | No | 10 | Số items mỗi trang |
| search | string | No | - | Tìm kiếm theo title, content, tags |
| topicId | string (UUID) | No | - | Lọc theo topic ID |
| authorId | string (UUID) | No | - | Lọc theo author ID |
| status | string | No | - | Lọc theo status (DRAFT, PUBLISHED, ARCHIVED) |
| tag | string | No | - | Lọc theo tag |
| sortBy | string | No | createdAt | Sắp xếp theo field |
| order | string | No | desc | Thứ tự sắp xếp |

**Response (200 OK):** Giống như Public API

---

### 13. Create Post

Tạo blog post mới.

**Endpoint:** `POST /blog-post`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Top 10 Beauty Tips for Summer",
  "content": "<p>Here are the top 10 beauty tips...</p>",
  "excerpt": "Discover the best beauty tips for summer season",
  "topicId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "DRAFT",
  "tags": ["beauty", "skincare", "summer"],
  "metaTitle": "Top 10 Beauty Tips for Summer 2024",
  "metaDescription": "Discover the best beauty tips for summer season..."
}
```

**Response (201 Created):**

```json
{
  "message": "Tạo bài viết blog thành công",
  "data": {
    "id": "post-id-1",
    "title": "Top 10 Beauty Tips for Summer",
    "slug": "top-10-beauty-tips-for-summer",
    "content": "<p>Here are the top 10 beauty tips...</p>",
    "excerpt": "Discover the best beauty tips for summer season",
    "topicId": "123e4567-e89b-12d3-a456-426614174000",
    "authorId": "author-id",
    "status": "DRAFT",
    "tags": ["beauty", "skincare", "summer"],
    "viewCount": 0,
    "metaTitle": "Top 10 Beauty Tips for Summer 2024",
    "metaDescription": "Discover the best beauty tips...",
    "publishedAt": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 201,
  "date": "2024-01-01T00:00:00.000Z"
}
```

---

### 14. Get Post By ID

Lấy thông tin post theo ID.

**Endpoint:** `GET /blog-post/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của post |

**Response (200 OK):** Giống như Get Post By Slug

---

### 15. Update Post

Cập nhật thông tin post.

**Endpoint:** `PATCH /blog-post/:id`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của post |

**Request Body:** (Tất cả fields đều optional)

```json
{
  "title": "Updated Title",
  "content": "<p>Updated content...</p>",
  "status": "PUBLISHED",
  "tags": ["beauty", "skincare"]
}
```

**Response (200 OK):**

```json
{
  "message": "Cập nhật bài viết blog thành công",
  "data": {
    "id": "post-id-1",
    "title": "Updated Title",
    "slug": "updated-title",
    "content": "<p>Updated content...</p>",
    "status": "PUBLISHED",
    "publishedAt": "2024-01-02T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  },
  "statusCode": 200,
  "date": "2024-01-02T00:00:00.000Z"
}
```

---

### 16. Delete Post

Xóa post (soft delete).

**Endpoint:** `DELETE /blog-post/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của post |

**Response (200 OK):**

```json
{
  "message": "Xóa bài viết blog thành công",
  "data": {
    "id": "post-id-1",
    "title": "Top 10 Beauty Tips for Summer",
    "slug": "top-10-beauty-tips-for-summer",
    "deletedAt": "2024-01-02T00:00:00.000Z"
  },
  "statusCode": 200,
  "date": "2024-01-02T00:00:00.000Z"
}
```

---

### 17. Upload Featured Image

Upload ảnh featured cho post.

**Endpoint:** `POST /blog-post/:id/upload/featured-image`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string (UUID) | Yes | ID của post |

**Request Body (Form Data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| file | File | Yes | Image file (jpg, png, etc.) |

**Response (201 Created):**

```json
{
  "message": "Upload ảnh bài viết blog thành công",
  "data": {
    "id": "post-id-1",
    "title": "Top 10 Beauty Tips for Summer",
    "slug": "top-10-beauty-tips-for-summer",
    "featuredImage": {
      "id": "media-id",
      "url": "https://example.com/featured.jpg",
      "type": "BLOG_POST_IMAGE"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  },
  "statusCode": 201,
  "date": "2024-01-02T00:00:00.000Z"
}
```

---

## Data Models

### BlogTopicResponseDto

```typescript
{
  id: string;                    // UUID
  name: string;                  // Tên topic
  slug: string;                  // Slug (auto-generated)
  description?: string;          // Mô tả
  parentId?: string;             // ID của parent topic (nếu là sub-topic)
  sortOrder: number;             // Thứ tự sắp xếp
  isActive: boolean;             // Trạng thái active
  imageMedia?: {                 // Ảnh topic
    id: string;
    url: string;
    type: string;
  };
  children?: BlogTopicResponseDto[];  // Danh sách sub-topics
  postCount?: number;            // Số lượng posts (chỉ có ở public API)
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
  deletedAt?: string;            // ISO 8601 timestamp (nếu đã xóa)
}
```

### BlogPostResponseDto

```typescript
{
  id: string;                    // UUID
  title: string;                 // Tiêu đề
  slug: string;                  // Slug (auto-generated)
  content: string;               // Nội dung HTML
  excerpt?: string;              // Trích đoạn ngắn
  topicId?: string;              // ID của topic
  authorId: string;              // ID của tác giả
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";  // Trạng thái
  tags: string[];                // Danh sách tags
  viewCount: number;             // Số lượt xem
  metaTitle?: string;            // SEO meta title
  metaDescription?: string;      // SEO meta description
  publishedAt?: string;          // Thời gian publish (ISO 8601)
  topic?: BlogTopicResponseDto;  // Thông tin topic
  author?: {                     // Thông tin tác giả
    id: string;
    username: string;
    email: string;
    fullName?: string;
  };
  featuredImage?: {              // Ảnh featured
    id: string;
    url: string;
    type: string;
  };
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
  deletedAt?: string;            // ISO 8601 timestamp (nếu đã xóa)
}
```

### Pagination Response

```typescript
{
  message: string;
  data: {
    totalCount: number;          // Tổng số items
    totalPage: number;           // Tổng số trang
    currentPage: number;         // Trang hiện tại
    pageSize: number;            // Số items mỗi trang
    hasNextPage: boolean;        // Có trang tiếp theo không
    hasPreviousPage: boolean;    // Có trang trước không
    items: T[];                  // Danh sách items
  };
  statusCode: number;
  date: string;                  // ISO 8601 timestamp
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "statusCode": 400,
  "errorCode": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "name should not be empty"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/blog-topic",
  "method": "POST"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "statusCode": 401,
  "errorCode": "HTTP_ERROR",
  "message": "Unauthorized",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/blog-topic",
  "method": "GET"
}
```

### 404 Not Found

```json
{
  "success": false,
  "statusCode": 404,
  "errorCode": "BLOG_TOPIC_NOT_FOUND",
  "message": "Không tìm thấy chủ đề blog",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/blog-topic/invalid-id",
  "method": "GET"
}
```

### 409 Conflict

```json
{
  "success": false,
  "statusCode": 409,
  "errorCode": "BLOG_TOPIC_SLUG_EXISTS",
  "message": "Slug đã tồn tại",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/blog-topic",
  "method": "POST"
}
```

---

## Notes

1. **Slug Generation**: Slug được tự động generate từ `name` hoặc `title`, không cần truyền vào.

2. **Authentication**:
   - Public APIs không cần token
   - Admin APIs cần Bearer token trong header `Authorization`

3. **Pagination**:
   - Default page = 1, limit = 10
   - Max limit = 100

4. **Status Values**:
   - `DRAFT`: Bản nháp
   - `PUBLISHED`: Đã xuất bản
   - `ARCHIVED`: Đã lưu trữ

5. **View Count**: Tự động tăng khi gọi API `GET /public/blog-post/slug/:slug`

6. **Soft Delete**: Các API delete chỉ soft delete (set `deletedAt`), không xóa vĩnh viễn.

7. **Image Upload**:
   - Sử dụng `multipart/form-data`
   - Field name: `file`
   - Max size: 5MB (có thể thay đổi trong config)

8. **HTML Content**: Field `content` của blog post chấp nhận HTML, FE cần sanitize trước khi render.
