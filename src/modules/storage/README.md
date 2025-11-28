# Storage Module - Storj S3 Integration

This module handles file uploads to Storj S3 and manages media records in the database.

## Features

- ✅ Upload images (JPEG, PNG, WebP)
- ✅ Upload videos (MP4, WebM, MOV, AVI)
- ✅ File validation (type and size)
- ✅ Database integration with Media table
- ✅ Soft delete functionality
- ✅ Multiple media types support

## Supported Media Types

- `PRODUCT_IMAGE` - Product images
- `PRODUCT_VIDEO` - Product videos
- `REVIEW_IMAGE` - Review images
- `REVIEW_VIDEO` - Review videos
- `AVATAR` - User avatars
- `CATEGORY_IMAGE` - Category images
- `BRAND_LOGO` - Brand logos

## API Endpoints

### Upload Endpoints

All upload endpoints require authentication (Bearer token).

#### POST /storage/upload/product-image

Upload a product image.

**Request:**

- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product image uploaded successfully",
  "data": {
    "mediaId": "uuid",
    "url": "https://link.storjshare.io/bucket/path/to/file.jpg",
    "key": "public/lingbeauty/products/images/timestamp-random.jpg",
    "size": 1024000,
    "mimetype": "image/jpeg",
    "filename": "original-filename.jpg",
    "type": "PRODUCT_IMAGE"
  }
}
```

#### POST /storage/upload/product-video

Upload a product video (similar to product-image).

#### POST /storage/upload/review-image

Upload a review image (similar to product-image).

#### POST /storage/upload/review-video

Upload a review video (similar to product-image).

#### POST /storage/upload/avatar

Upload a user avatar (similar to product-image).

#### POST /storage/upload/category-image

Upload a category image (similar to product-image).

#### POST /storage/upload/brand-logo

Upload a brand logo (similar to product-image).

### Delete Endpoint

#### DELETE /storage/delete/:mediaId

Soft delete a media file.

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "File deleted successfully",
  "data": {
    "message": "File deleted successfully"
  }
}
```

## Configuration

Add these environment variables to your `.env` file:

```env
# Storj S3 Configuration
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your_storj_access_key
S3_SECRET_ACCESS_KEY=your_storj_secret_key
S3_BUCKET_NAME=your_bucket_name
S3_ENDPOINT=https://gateway.storjshare.io
S3_PUBLIC_DIR=public
S3_PUBLIC_PATH_PREFIX=lingbeauty
S3_DOMAIN=https://link.storjshare.io/your-bucket
S3_MAX_IMAGE_SIZE=5242880      # 5MB in bytes
S3_MAX_VIDEO_SIZE=104857600    # 100MB in bytes
```

## File Size Limits

- **Images**: 5MB (configurable via `S3_MAX_IMAGE_SIZE`)
- **Videos**: 100MB (configurable via `S3_MAX_VIDEO_SIZE`)

## Allowed File Types

### Images

- image/jpeg
- image/jpg
- image/png
- image/webp

### Videos

- video/mp4
- video/webm
- video/quicktime (.mov)
- video/x-msvideo (.avi)

## Database Schema

The module uses the `Media` table to store file metadata:

```prisma
model Media {
  id            String    @id @default(uuid())
  url           String    @db.VarChar(500)
  key           String    @db.VarChar(500)
  filename      String    @db.VarChar(255)
  mimetype      String    @db.VarChar(100)
  size          Int
  type          MediaType
  uploadedById  String?   @map("uploaded_by_id")
  isDeleted     Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

## Usage Example

### Frontend (JavaScript/TypeScript)

```typescript
// Upload product image
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch(
  'http://localhost:8080/storage/upload/product-image',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  },
);

const result = await response.json();
console.log('Media ID:', result.data.id);
console.log('File URL:', result.data.url);
```

### Using Media ID in Product

```typescript
// When creating a product image, use the mediaId
await prisma.productImage.create({
  data: {
    productId: 'product-uuid',
    mediaId: result.data.id, // From upload response
    alt: 'Product image description',
    isPrimary: true,
  },
});

// Query product with images
const product = await prisma.product.findUnique({
  where: { id: 'product-uuid' },
  include: {
    images: {
      include: {
        media: true, // This will include the URL and other file info
      },
    },
  },
});
```

## Error Codes

- `STORAGE_010` - MEDIA_NOT_FOUND
- `STORAGE_011` - UPLOAD_FAILED
- `STORAGE_012` - FILE_TYPE_NOT_SUPPORTED
- `STORAGE_013` - IMAGE_TOO_LARGE
- `STORAGE_014` - VIDEO_TOO_LARGE
- `STORAGE_015` - DELETE_FILE_FAILED

## Notes

- All uploads require JWT authentication
- Files are stored in Storj S3 with organized folder structure
- Media records use soft delete (isDeleted flag)
- File names are automatically sanitized and made unique with timestamp
- The module automatically validates file type and size based on the upload endpoint
