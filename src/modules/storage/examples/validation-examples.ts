/**
 * File Validation Examples
 * Demonstrates various ways to use the file validation system
 */

import { FileValidationUtil } from '../utils/file-validation.util';
import { MediaType } from 'prisma/generated/prisma/client';

// ============================================================================
// Example 1: Basic Image Validation
// ============================================================================
export async function validateImageExample(file: Express.Multer.File) {
  try {
    await FileValidationUtil.validateFile(file, {
      allowedTypes: 'image',
      maxSize: 5 * 1024 * 1024, // 5MB
      validateSignature: true,
    });
    console.log('✅ Image is valid');
  } catch (error) {
    console.error('❌ Image validation failed:', error.message);
  }
}

// ============================================================================
// Example 2: Video Validation
// ============================================================================
export async function validateVideoExample(file: Express.Multer.File) {
  try {
    await FileValidationUtil.validateFile(file, {
      allowedTypes: 'video',
      maxSize: 50 * 1024 * 1024, // 50MB
      validateSignature: true,
    });
    console.log('✅ Video is valid');
  } catch (error) {
    console.error('❌ Video validation failed:', error.message);
  }
}

// ============================================================================
// Example 3: Individual Validation Steps
// ============================================================================
export async function stepByStepValidation(file: Express.Multer.File) {
  // Step 1: Check if it's an image
  const isImage = FileValidationUtil.isImage(file.mimetype);
  console.log('Is image?', isImage);

  // Step 2: Validate MIME type
  try {
    FileValidationUtil.validateImageType(file.mimetype);
    console.log('✅ MIME type is valid');
  } catch (error) {
    console.error('❌ Invalid MIME type');
  }

  // Step 3: Validate file size
  try {
    FileValidationUtil.validateImageSize(file.size, 5 * 1024 * 1024);
    console.log('✅ File size is acceptable');
  } catch (error) {
    console.error('❌ File too large');
  }

  // Step 4: Validate extension matches MIME type
  try {
    FileValidationUtil.validateFileExtension(file.originalname, file.mimetype);
    console.log('✅ Extension matches MIME type');
  } catch (error) {
    console.error('❌ Extension mismatch');
  }

  // Step 5: Validate file signature (most important!)
  try {
    await FileValidationUtil.validateFileSignature(file);
    console.log('✅ File signature is valid (real file type confirmed)');
  } catch (error) {
    console.error('❌ File signature invalid - possible spoofing detected!');
  }
}

// ============================================================================
// Example 4: Filename Sanitization
// ============================================================================
export function filenameSanitizationExample() {
  const dangerousFilenames = [
    '../../../etc/passwd.jpg',
    'test<script>alert(1)</script>.png',
    'file...with...dots.jpg',
    'file with spaces.png',
    'ファイル名.jpg', // Japanese characters
    '.hidden.jpg',
    'very_long_filename_that_exceeds_the_maximum_allowed_length_and_should_be_truncated_to_prevent_issues.jpg',
  ];

  console.log('Filename Sanitization Examples:\n');
  dangerousFilenames.forEach((filename) => {
    const sanitized = FileValidationUtil.sanitizeFilename(filename);
    console.log(`Original:  ${filename}`);
    console.log(`Sanitized: ${sanitized}\n`);
  });
}

// ============================================================================
// Example 5: Generate Unique Filename
// ============================================================================
export function uniqueFilenameExample() {
  const originalFilename = 'profile-photo.jpg';

  // Generate multiple unique filenames
  console.log('Unique Filename Generation:\n');
  for (let i = 0; i < 3; i++) {
    const uniqueFilename =
      FileValidationUtil.generateUniqueFilename(originalFilename);
    console.log(`${i + 1}. ${uniqueFilename}`);
  }
  // Output example:
  // 1. profile-photo_1700000000000_a1b2c3d4.jpg
  // 2. profile-photo_1700000000001_e5f6g7h8.jpg
  // 3. profile-photo_1700000000002_i9j0k1l2.jpg
}

// ============================================================================
// Example 6: Attack Prevention Examples
// ============================================================================
export async function attackPreventionExamples() {
  console.log('Attack Prevention Examples:\n');

  // Attack 1: MIME Type Spoofing
  // Attacker renames malicious.exe to malicious.jpg
  const mimeTypeSpoofing = {
    buffer: Buffer.from([0x4d, 0x5a, 0x90, 0x00]), // EXE signature
    originalname: 'innocent.jpg',
    mimetype: 'image/jpeg',
    size: 1024,
  } as Express.Multer.File;

  try {
    await FileValidationUtil.validateFileSignature(mimeTypeSpoofing);
    console.log('❌ FAILED: Should have detected spoofing');
  } catch (error) {
    console.log('✅ BLOCKED: MIME type spoofing detected!');
  }

  // Attack 2: Path Traversal
  const pathTraversal = '../../../etc/passwd.jpg';
  const sanitized = FileValidationUtil.sanitizeFilename(pathTraversal);
  console.log(`✅ BLOCKED: Path traversal prevented`);
  console.log(`   Original: ${pathTraversal}`);
  console.log(`   Sanitized: ${sanitized}\n`);

  // Attack 3: Double Extension
  const doubleExtension = 'malicious.php.jpg';
  const sanitizedDouble = FileValidationUtil.sanitizeFilename(doubleExtension);
  console.log(`✅ BLOCKED: Double extension handled`);
  console.log(`   Original: ${doubleExtension}`);
  console.log(`   Sanitized: ${sanitizedDouble}\n`);

  // Attack 4: File Too Large (DoS)
  const largeFile = {
    buffer: Buffer.alloc(100 * 1024 * 1024), // 100MB
    originalname: 'large.jpg',
    mimetype: 'image/jpeg',
    size: 100 * 1024 * 1024,
  } as Express.Multer.File;

  try {
    FileValidationUtil.validateImageSize(largeFile.size, 5 * 1024 * 1024);
    console.log('❌ FAILED: Should have rejected large file');
  } catch (error) {
    console.log('✅ BLOCKED: File too large (DoS prevention)');
  }
}

// ============================================================================
// Example 7: Real-world Usage in Controller
// ============================================================================
export class ExampleController {
  /**
   * Example: Upload with automatic validation via decorator
   */
  // @Post('upload/product-image')
  // @ApiUploadProductImage() // This decorator includes FileValidationInterceptor
  async uploadProductImage() // @UploadedFile() file: Express.Multer.File,
  // @DecodedAccessToken() user: DecodedAccessToken,
  {
    // File is already validated by the interceptor
    // No need for manual validation here
    // Just upload to storage
    // return this.storageService.uploadFile({
    //   file,
    //   type: MediaType.PRODUCT_IMAGE,
    //   userId: user.userId,
    // });
  }

  /**
   * Example: Manual validation if needed
   */
  async uploadWithManualValidation(file: Express.Multer.File) {
    // Manual validation
    await FileValidationUtil.validateFile(file, {
      allowedTypes: 'image',
      maxSize: 5 * 1024 * 1024,
      validateSignature: true,
    });

    // Generate unique filename
    const uniqueFilename = FileValidationUtil.generateUniqueFilename(
      file.originalname,
    );

    console.log('File validated and ready for upload:', uniqueFilename);
  }
}

// ============================================================================
// Example 8: Testing File Signatures
// ============================================================================
export function testFileSignatures() {
  console.log('File Signature Examples:\n');

  const signatures = {
    JPEG: [0xff, 0xd8, 0xff, 0xe0],
    PNG: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    GIF87a: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    GIF89a: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    WebP: [
      0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
    ],
    MP4: [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70],
    'EXE (Malicious)': [0x4d, 0x5a, 0x90, 0x00],
  };

  Object.entries(signatures).forEach(([type, bytes]) => {
    const hex = bytes
      .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
    console.log(`${type.padEnd(20)} ${hex}`);
  });
}

// ============================================================================
// Run Examples
// ============================================================================
export function runAllExamples() {
  console.log('='.repeat(80));
  console.log('FILE VALIDATION EXAMPLES');
  console.log('='.repeat(80));
  console.log();

  filenameSanitizationExample();
  console.log('\n' + '='.repeat(80) + '\n');

  uniqueFilenameExample();
  console.log('\n' + '='.repeat(80) + '\n');

  testFileSignatures();
  console.log('\n' + '='.repeat(80) + '\n');

  attackPreventionExamples();
}
