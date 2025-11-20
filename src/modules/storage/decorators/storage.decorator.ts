import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ApiProtectedAuthOperation } from 'src/decorators/api.decorators';
import { BaseUploadFileDto } from 'src/modules/storage/dto/upload-file.dto';
import { FileValidationInterceptor } from '../interceptors/file-validation.interceptor';
import { MediaType } from 'prisma/generated/prisma/client';

export function ApiUploadProductImage() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Upload product image' }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.PRODUCT_IMAGE }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: BaseUploadFileDto,
    }),
  );
}

export function ApiUploadProductVideo() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Upload product video' }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.PRODUCT_VIDEO }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: BaseUploadFileDto,
    }),
  );
}

export function ApiUploadReviewImage() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Upload review image' }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.REVIEW_IMAGE }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: BaseUploadFileDto,
    }),
  );
}

export function ApiUploadReviewVideo() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Upload review video' }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.REVIEW_VIDEO }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: BaseUploadFileDto,
    }),
  );
}

export function ApiUploadCategoryImage() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Upload category image' }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.CATEGORY_IMAGE }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: BaseUploadFileDto,
    }),
  );
}

export function ApiUploadBrandLogo() {
  return applyDecorators(
    ApiProtectedAuthOperation({ summary: 'Upload brand logo' }),
    UseInterceptors(
      FileInterceptor('file'),
      new FileValidationInterceptor({ type: MediaType.BRAND_LOGO }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: BaseUploadFileDto,
    }),
  );
}
