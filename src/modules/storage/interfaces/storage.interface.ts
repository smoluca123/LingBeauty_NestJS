import { MediaType } from 'prisma/generated/prisma/client';

/**
 * Parameters for uploading file to S3
 */
export interface UploadToS3Params {
  file: Express.Multer.File;
  type: MediaType;
  userId?: string;
}

/**
 * Parameters for deleting file from S3
 */
export interface DeleteFromS3Params {
  key: string;
}

/**
 * Result of file upload to S3
 */
export interface UploadFileResult {
  url: string;
  key: string;
  size: number;
  mimetype: string;
  filename: string;
}
