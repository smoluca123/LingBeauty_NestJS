/**
 * File type constants and configurations
 */

// Allowed MIME types for images
export const ALLOWED_IMAGE_MIMETYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

// Allowed MIME types for videos
export const ALLOWED_VIDEO_MIMETYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
] as const;

// File signatures (magic numbers) for validation
export const FILE_SIGNATURES = {
  // Images
  'image/jpeg': [
    [0xff, 0xd8, 0xff, 0xe0], // JPEG JFIF
    [0xff, 0xd8, 0xff, 0xe1], // JPEG EXIF
    [0xff, 0xd8, 0xff, 0xe2], // JPEG
    [0xff, 0xd8, 0xff, 0xe3], // JPEG
    [0xff, 0xd8, 0xff, 0xe8], // JPEG
  ],
  'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  'image/gif': [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
  ],
  'image/webp': [
    [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50],
  ],

  // Videos
  'video/mp4': [
    [null, null, null, null, 0x66, 0x74, 0x79, 0x70], // ftyp
    [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ftyp mp4
    [0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70], // ftyp isom
  ],
  'video/quicktime': [[null, null, null, null, 0x6d, 0x6f, 0x6f, 0x76]], // moov
  'video/x-msvideo': [
    [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x41, 0x56, 0x49, 0x20],
  ], // RIFF AVI
  'video/webm': [[0x1a, 0x45, 0xdf, 0xa3]], // EBML (WebM)
} as const;

// Allowed file extensions
export const ALLOWED_IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
] as const;
export const ALLOWED_VIDEO_EXTENSIONS = [
  '.mp4',
  '.mov',
  '.avi',
  '.webm',
  '.mpeg',
] as const;

// Extension to MIME type mapping
export const EXTENSION_TO_MIMETYPE: Record<string, string[]> = {
  '.jpg': ['image/jpeg', 'image/jpg'],
  '.jpeg': ['image/jpeg', 'image/jpg'],
  '.png': ['image/png'],
  '.webp': ['image/webp'],
  '.gif': ['image/gif'],
  '.mp4': ['video/mp4'],
  '.mov': ['video/quicktime'],
  '.avi': ['video/x-msvideo'],
  '.webm': ['video/webm'],
  '.mpeg': ['video/mpeg'],
};
