# File Upload Validation

## Overview

Hệ thống validation file upload được thiết kế với nhiều lớp bảo mật (multi-layer security) để đảm bảo an toàn tối đa.

## Validation Layers

### 1. **MIME Type Validation**

- Kiểm tra `Content-Type` header của file
- Chỉ cho phép các MIME types được định nghĩa trong whitelist
- **Images**: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- **Videos**: `video/mp4`, `video/mpeg`, `video/quicktime`, `video/x-msvideo`, `video/webm`

### 2. **File Extension Validation**

- Kiểm tra extension của file có khớp với MIME type không
- Ngăn chặn tấn công MIME type spoofing (ví dụ: file `.exe` được đổi thành `.jpg`)
- Extension phải match với MIME type trong mapping table

### 3. **File Size Validation**

- Giới hạn kích thước file dựa trên loại file
- Images: Tối đa theo `S3_MAX_IMAGE_SIZE` config
- Videos: Tối đa theo `S3_MAX_VIDEO_SIZE` config
- Trả về lỗi rõ ràng với thông tin kích thước tối đa

### 4. **File Signature Validation (Magic Numbers)** ⭐ **QUAN TRỌNG NHẤT**

- Đọc bytes đầu tiên của file để xác định file type thực sự
- Không thể bị fake bởi việc đổi extension hoặc MIME type
- Mỗi file type có signature riêng:
  - **JPEG**: `FF D8 FF E0` hoặc `FF D8 FF E1`
  - **PNG**: `89 50 4E 47 0D 0A 1A 0A`
  - **GIF**: `47 49 46 38 37 61` hoặc `47 49 46 38 39 61`
  - **WebP**: `52 49 46 46 ... 57 45 42 50`
  - **MP4**: `... 66 74 79 70`
  - Và nhiều loại khác...

### 5. **Filename Sanitization**

- Loại bỏ ký tự đặc biệt và nguy hiểm
- Ngăn chặn path traversal attacks (`../`, `..\\`)
- Replace các ký tự không an toàn bằng underscore
- Giới hạn độ dài filename

### 6. **Unique Filename Generation**

- Tạo tên file unique với timestamp + UUID
- Ngăn chặn file overwrite
- Format: `originalname_timestamp_uuid.ext`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Upload Request                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              FileValidationInterceptor (Early)               │
│  - Validates before reaching controller                      │
│  - Fast fail for invalid files                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Controller Layer                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              StorageService.validateFile()                   │
│  - Double validation for extra security                      │
│  - Uses FileValidationUtil                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  FileValidationUtil                          │
│  ├─ validateFileType()                                       │
│  ├─ validateFileExtension()                                  │
│  ├─ validateFileSize()                                       │
│  ├─ validateFileSignature() ⭐                               │
│  ├─ sanitizeFilename()                                       │
│  └─ generateUniqueFilename()                                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Upload to S3 Storage                      │
└─────────────────────────────────────────────────────────────┘
```

## Usage

### Using Decorators (Recommended)

```typescript
@Post('upload/product-image')
@ApiUploadProductImage() // Includes validation interceptor
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

### Using Pipe (Alternative)

```typescript
@Post('upload')
async upload(
  @UploadedFile(new FileValidationPipe({
    type: MediaType.PRODUCT_IMAGE
  })) file: Express.Multer.File,
) {
  // File is already validated
}
```

### Manual Validation

```typescript
await FileValidationUtil.validateFile(file, {
  allowedTypes: 'image',
  maxSize: 5 * 1024 * 1024, // 5MB
  validateSignature: true,
});
```

## Security Benefits

### ✅ Prevents Common Attacks

1. **MIME Type Spoofing**: File signature validation ngăn chặn việc fake MIME type
2. **Path Traversal**: Filename sanitization loại bỏ `../` và các pattern nguy hiểm
3. **File Overwrite**: Unique filename generation ngăn chặn ghi đè file
4. **Malicious Extensions**: Extension validation đảm bảo extension match với content
5. **Large File DoS**: Size validation ngăn chặn upload file quá lớn
6. **Double Extension Attack**: Sanitization loại bỏ multiple extensions

### ⚠️ Additional Recommendations

1. **Virus Scanning**: Tích hợp ClamAV hoặc VirusTotal API cho production
2. **Image Processing**: Sử dụng Sharp để re-encode images (loại bỏ metadata độc hại)
3. **Rate Limiting**: Giới hạn số lượng upload per user/IP
4. **Content Security Policy**: Set proper CSP headers
5. **Separate Domain**: Host uploaded files trên domain riêng

## Configuration

File validation được config thông qua environment variables:

```env
# Maximum file sizes
S3_MAX_IMAGE_SIZE=5242880  # 5MB
S3_MAX_VIDEO_SIZE=52428800 # 50MB

# S3 Configuration
S3_BUCKET_NAME=your-bucket
S3_REGION=us-east-1
S3_ENDPOINT=https://gateway.storjshare.io
```

## Error Codes

- `INVALID_FILE_TYPE`: File type không được phép
- `FILE_TOO_LARGE`: File vượt quá kích thước cho phép
- `UPLOAD_FAILED`: Lỗi khi upload lên S3
- `MEDIA_NOT_FOUND`: Không tìm thấy media record

## Testing

```typescript
// Test valid image upload
const validImage = {
  buffer: Buffer.from([0xff, 0xd8, 0xff, 0xe0, ...]), // JPEG signature
  originalname: 'test.jpg',
  mimetype: 'image/jpeg',
  size: 1024 * 1024, // 1MB
};

await FileValidationUtil.validateFile(validImage, {
  allowedTypes: 'image',
  maxSize: 5 * 1024 * 1024,
});

// Test invalid file (should throw)
const invalidFile = {
  buffer: Buffer.from([0x00, 0x00, 0x00, 0x00]), // Invalid signature
  originalname: 'malicious.jpg',
  mimetype: 'image/jpeg',
  size: 1024,
};

// This will throw BusinessException
await FileValidationUtil.validateFile(invalidFile, {
  allowedTypes: 'image',
  maxSize: 5 * 1024 * 1024,
});
```

## Performance Considerations

- File signature validation chỉ đọc 12 bytes đầu tiên → rất nhanh
- Validation chạy song song với upload process
- Early validation ở interceptor layer giúp fail fast
- Không cần external service calls

## References

- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [File Signatures Database](https://en.wikipedia.org/wiki/List_of_file_signatures)
- [NestJS File Upload](https://docs.nestjs.com/techniques/file-upload)
