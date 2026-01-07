import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import {
  ALLOWED_IMAGE_MIMETYPES,
  ALLOWED_VIDEO_MIMETYPES,
  FILE_SIGNATURES,
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
  EXTENSION_TO_MIMETYPE,
} from '../constants/file-types.constant';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Comprehensive file validation utility
 * Implements multiple layers of security validation
 */
export class FileValidationUtil {
  /**
   * Validate if file is an image based on MIME type
   */
  static isImage(mimetype: string): boolean {
    return ALLOWED_IMAGE_MIMETYPES.includes(mimetype as any);
  }

  /**
   * Validate if file is a video based on MIME type
   */
  static isVideo(mimetype: string): boolean {
    return ALLOWED_VIDEO_MIMETYPES.includes(mimetype as any);
  }

  /**
   * Validate image MIME type
   */
  static validateImageType(mimetype: string): void {
    if (!this.isImage(mimetype)) {
      throw new BusinessException(
        `Invalid image type. Allowed types: ${ALLOWED_IMAGE_MIMETYPES.join(', ')}`,
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }
  }

  /**
   * Validate video MIME type
   */
  static validateVideoType(mimetype: string): void {
    if (!this.isVideo(mimetype)) {
      throw new BusinessException(
        `Invalid video type. Allowed types: ${ALLOWED_VIDEO_MIMETYPES.join(', ')}`,
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }
  }

  /**
   * Validate general file type (image or video)
   */
  static validateFileType(mimetype: string): void {
    if (!this.isImage(mimetype) && !this.isVideo(mimetype)) {
      throw new BusinessException(
        'Invalid file type. Only images and videos are allowed',
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }
  }

  /**
   * Validate image file size
   */
  static validateImageSize(size: number, maxSize: number): void {
    if (size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      throw new BusinessException(
        `Image size exceeds maximum allowed size of ${maxSizeMB}MB`,
        ERROR_CODES.FILE_TOO_LARGE,
      );
    }
  }

  /**
   * Validate video file size
   */
  static validateVideoSize(size: number, maxSize: number): void {
    if (size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      throw new BusinessException(
        `Video size exceeds maximum allowed size of ${maxSizeMB}MB`,
        ERROR_CODES.FILE_TOO_LARGE,
      );
    }
  }

  /**
   * Validate file extension matches MIME type
   * Prevents MIME type spoofing
   */
  static validateFileExtension(filename: string, mimetype: string): void {
    const ext = path.extname(filename).toLowerCase();

    if (!ext) {
      throw new BusinessException(
        'File must have an extension',
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }

    const allowedMimetypes = EXTENSION_TO_MIMETYPE[ext];

    if (!allowedMimetypes) {
      throw new BusinessException(
        `File extension ${ext} is not allowed`,
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }

    if (!allowedMimetypes.includes(mimetype)) {
      throw new BusinessException(
        `File extension ${ext} does not match MIME type ${mimetype}`,
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }
  }

  /**
   * Validate file signature (magic numbers)
   * This is the most secure way to verify file type
   * Prevents attackers from changing file extension or MIME type
   */
  static async validateFileSignature(file: Express.Multer.File): Promise<void> {
    const signatures =
      FILE_SIGNATURES[file.mimetype as keyof typeof FILE_SIGNATURES];

    if (!signatures) {
      throw new BusinessException(
        'Unsupported file type for signature validation',
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }

    // Read first 12 bytes of the file (enough for most signatures)
    const headerBytes = file.buffer.slice(0, 12);

    // Check if file matches any of the signatures for this MIME type
    const isValid = signatures.some((signature) => {
      return signature.every((byte, index) => {
        // null means we don't care about this byte position
        if (byte === null) return true;
        return headerBytes[index] === byte;
      });
    });

    if (!isValid) {
      throw new BusinessException(
        'File signature does not match the declared file type. Possible file type spoofing detected.',
        ERROR_CODES.INVALID_FILE_TYPE,
      );
    }
  }

  /**
   * Sanitize filename to prevent path traversal and other attacks
   * Removes dangerous characters and patterns
   */
  static sanitizeFilename(filename: string): string {
    // Get extension
    const ext = path.extname(filename).toLowerCase();
    const nameWithoutExt = path.basename(filename, ext);

    // Remove or replace dangerous characters
    let sanitized = nameWithoutExt
      .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace special chars with underscore
      .replace(/\.+/g, '.') // Replace multiple dots with single dot
      .replace(/^\.+/, '') // Remove leading dots
      .replace(/\.+$/, '') // Remove trailing dots
      .substring(0, 100); // Limit length

    // If filename becomes empty after sanitization, use a default
    if (!sanitized) {
      sanitized = 'file';
    }

    return sanitized + ext;
  }

  /**
   * Generate unique filename with timestamp and UUID
   */
  static generateUniqueFilename(originalFilename: string): string {
    const sanitized = this.sanitizeFilename(originalFilename);
    const ext = path.extname(sanitized);
    const nameWithoutExt = path.basename(sanitized, ext);
    const timestamp = Date.now();
    const uniqueId = uuidv4().split('-')[0]; // Use first part of UUID

    return `${nameWithoutExt}_${timestamp}_${uniqueId}${ext}`;
  }

  /**
   * Validate image dimensions (optional, requires image processing library)
   * This would require installing sharp or similar library
   */
  static async validateImageDimensions(
    buffer: Buffer,
    options: {
      minWidth?: number;
      maxWidth?: number;
      minHeight?: number;
      maxHeight?: number;
    },
  ): Promise<void> {
    // TODO: Implement with sharp library if needed
    // const sharp = require('sharp');
    // const metadata = await sharp(buffer).metadata();
    // Validate dimensions...
  }

  /**
   * Comprehensive file validation
   * Combines all validation methods
   */
  static async validateFile(
    file: Express.Multer.File,
    options: {
      allowedTypes: 'image' | 'video' | 'both';
      maxSize: number;
      validateSignature?: boolean;
      isRequired?: boolean;
    },
  ): Promise<void> {
    // 1. Validate file exists
    if (!file || !file.buffer) {
      if (options.isRequired) {
        throw new BusinessException(
          'No file provided',
          ERROR_CODES.INVALID_FILE_TYPE,
        );
      }
      return;
    }

    // 2. Validate file type
    if (options.allowedTypes === 'image') {
      this.validateImageType(file.mimetype);
    } else if (options.allowedTypes === 'video') {
      this.validateVideoType(file.mimetype);
    } else {
      this.validateFileType(file.mimetype);
    }

    // 3. Validate file size
    if (this.isImage(file.mimetype)) {
      this.validateImageSize(file.size, options.maxSize);
    } else if (this.isVideo(file.mimetype)) {
      this.validateVideoSize(file.size, options.maxSize);
    }

    // 4. Validate file extension matches MIME type
    this.validateFileExtension(file.originalname, file.mimetype);

    // 5. Validate file signature (magic numbers) - most important security check
    if (options.validateSignature !== false) {
      await this.validateFileSignature(file);
    }
  }
}
