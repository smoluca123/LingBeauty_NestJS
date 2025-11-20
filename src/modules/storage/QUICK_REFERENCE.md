# File Upload Validation - Quick Reference

## 🚀 Quick Start

### 1. Upload với Decorator (Easiest)

```typescript
@Post('upload/product-image')
@ApiUploadProductImage() // ✅ Validation tự động
async uploadProductImage(
  @UploadedFile() file: Express.Multer.File,
  @DecodedAccessToken() user: DecodedAccessToken,
) {
  return this.storageService.uploadFile({
    file,
    type: MediaType.PRODUCT_IMAGE,
    userId: user.userId,
  });
}
```

### 2. Manual Validation

```typescript
import { FileValidationUtil } from './utils/file-validation.util';

// Validate image
await FileValidationUtil.validateFile(file, {
  allowedTypes: 'image',
  maxSize: 5 * 1024 * 1024, // 5MB
  validateSignature: true,
});

// Validate video
await FileValidationUtil.validateFile(file, {
  allowedTypes: 'video',
  maxSize: 50 * 1024 * 1024, // 50MB
  validateSignature: true,
});
```

## 📋 Available Decorators

| Decorator                   | Media Type     | Max Size |
| --------------------------- | -------------- | -------- |
| `@ApiUploadProductImage()`  | PRODUCT_IMAGE  | 5MB      |
| `@ApiUploadProductVideo()`  | PRODUCT_VIDEO  | 50MB     |
| `@ApiUploadReviewImage()`   | REVIEW_IMAGE   | 5MB      |
| `@ApiUploadReviewVideo()`   | REVIEW_VIDEO   | 50MB     |
| `@ApiUploadCategoryImage()` | CATEGORY_IMAGE | 5MB      |
| `@ApiUploadBrandLogo()`     | BRAND_LOGO     | 5MB      |

## 🔧 Utility Functions

### Check File Type

```typescript
FileValidationUtil.isImage(mimetype); // true/false
FileValidationUtil.isVideo(mimetype); // true/false
```

### Validate MIME Type

```typescript
FileValidationUtil.validateImageType(mimetype); // throws if invalid
FileValidationUtil.validateVideoType(mimetype); // throws if invalid
```

### Validate Size

```typescript
FileValidationUtil.validateImageSize(size, maxSize);
FileValidationUtil.validateVideoSize(size, maxSize);
```

### Validate Extension

```typescript
FileValidationUtil.validateFileExtension(filename, mimetype);
```

### Validate File Signature (Magic Numbers)

```typescript
await FileValidationUtil.validateFileSignature(file);
```

### Sanitize Filename

```typescript
const safe = FileValidationUtil.sanitizeFilename('../../etc/passwd.jpg');
// Result: etc_passwd.jpg
```

### Generate Unique Filename

```typescript
const unique = FileValidationUtil.generateUniqueFilename('photo.jpg');
// Result: photo_1700000000000_a1b2c3d4.jpg
```

## 🎯 Common Use Cases

### Case 1: Avatar Upload

```typescript
@Post('upload/avatar')
@ApiUploadAvatar()
async uploadAvatar(
  @UploadedFile() file: Express.Multer.File,
  @DecodedAccessToken() user: DecodedAccessToken,
) {
  return this.storageService.uploadFile({
    file,
    type: MediaType.AVATAR,
    userId: user.userId,
  });
}
```

### Case 2: Multiple Files

```typescript
@Post('upload/gallery')
@UseInterceptors(FilesInterceptor('files', 10))
async uploadGallery(
  @UploadedFiles() files: Express.Multer.File[],
) {
  // Validate each file
  for (const file of files) {
    await FileValidationUtil.validateFile(file, {
      allowedTypes: 'image',
      maxSize: 5 * 1024 * 1024,
    });
  }

  // Upload all files
  const results = await Promise.all(
    files.map(file => this.storageService.uploadFile({
      file,
      type: MediaType.PRODUCT_IMAGE,
      userId: user.userId,
    }))
  );

  return results;
}
```

### Case 3: Custom Validation

```typescript
async customValidation(file: Express.Multer.File) {
  // Step 1: Basic validation
  await FileValidationUtil.validateFile(file, {
    allowedTypes: 'image',
    maxSize: 10 * 1024 * 1024,
  });

  // Step 2: Custom business logic
  if (file.size < 1024) {
    throw new Error('Image too small');
  }

  // Step 3: Additional checks
  // ... your custom logic
}
```

## ⚠️ Error Handling

```typescript
try {
  await FileValidationUtil.validateFile(file, {
    allowedTypes: 'image',
    maxSize: 5 * 1024 * 1024,
  });
} catch (error) {
  if (error.code === 'INVALID_FILE_TYPE') {
    // Handle invalid file type
  } else if (error.code === 'FILE_TOO_LARGE') {
    // Handle file too large
  }
}
```

## 🔒 Security Checklist

- ✅ MIME type validation
- ✅ File extension validation
- ✅ File size validation
- ✅ File signature validation (magic numbers)
- ✅ Filename sanitization
- ✅ Unique filename generation
- ⚠️ Virus scanning (optional)
- ⚠️ Image re-encoding (optional)

## 📊 Allowed File Types

### Images

```typescript
const ALLOWED_IMAGE_MIMETYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
```

### Videos

```typescript
const ALLOWED_VIDEO_MIMETYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
];

const ALLOWED_VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.webm', '.mpeg'];
```

## 🐛 Common Errors

| Error Code          | Meaning                | Solution                      |
| ------------------- | ---------------------- | ----------------------------- |
| `INVALID_FILE_TYPE` | File type not allowed  | Check MIME type and extension |
| `FILE_TOO_LARGE`    | File exceeds max size  | Reduce file size              |
| `UPLOAD_FAILED`     | S3 upload failed       | Check S3 credentials          |
| `MEDIA_NOT_FOUND`   | Media record not found | Check media ID                |

## 💡 Tips

1. **Always use decorators** - Easiest and safest way
2. **Enable signature validation** - Most important security check
3. **Set appropriate max sizes** - Balance UX and security
4. **Use unique filenames** - Prevents conflicts
5. **Sanitize filenames** - Prevents path traversal
6. **Handle errors gracefully** - Better UX

## 📞 Need Help?

- See `FILE_VALIDATION.md` for detailed documentation
- See `examples/validation-examples.ts` for code examples
- See `IMPLEMENTATION_SUMMARY.md` for implementation details
