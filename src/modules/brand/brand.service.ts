import { Injectable } from '@nestjs/common';
import { MediaType, Prisma } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import { BrandSelect, brandSelect } from 'src/libs/prisma/brand-select';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import { processDataObject } from 'src/libs/utils/utils';
import { UploadResponseDto } from 'src/modules/storage/dto/upload-response.dto';
import { StorageService } from 'src/modules/storage/storage.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import slugify from 'slugify';
import { BrandResponseDto } from './dto/brand-response.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  async getAllBrands({
    page = 1,
    limit = 10,
    search,
    order = 'asc',
  }: {
    page?: number;
    limit?: number;
    search?: string;
    order?: 'asc' | 'desc';
  }): Promise<IBeforeTransformPaginationResponseType<BrandResponseDto>> {
    try {
      const whereQuery: Prisma.BrandWhereInput = {
        name: {
          contains: search,
        },
      };

      const brands = await this.prismaService.brand.findMany({
        select: brandSelect,
        where: whereQuery,
        orderBy: {
          name: order,
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      const totalCount = await this.prismaService.brand.count({
        where: whereQuery,
      });

      const brandResponse = brands.map((brand) => this.mapBrandEntity(brand));

      return {
        type: 'pagination',
        message: 'Brands retrieved successfully',
        data: {
          items: brandResponse,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get brands',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createBrand({
    userId,
    createBrandDto,
    logo,
  }: {
    userId?: string;
    createBrandDto: CreateBrandDto;
    logo?: Express.Multer.File;
  }): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    try {
      let logoMediaId: string | undefined;

      if (logo) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: logo,
            type: MediaType.BRAND_LOGO,
            userId,
          },
          {
            getDirectUrl: true,
          },
        );

        logoMediaId = uploadedMedia.mediaId;
      }

      const slug = await this.ensureUniqueSlug(createBrandDto.name);

      const brand = await this.prismaService.brand.create({
        data: {
          name: createBrandDto.name,
          slug,
          description: createBrandDto.description,
          website: createBrandDto.website,
          isActive:
            createBrandDto.isActive === undefined
              ? true
              : createBrandDto.isActive,
          logoMediaId,
        },
        select: brandSelect,
      });

      const brandResponse = this.mapBrandEntity(brand);

      return {
        type: 'response',
        message: 'Brand created successfully',
        data: brandResponse,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to create brand',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getBrandById(
    brandId: string,
  ): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    try {
      const brand = await this.prismaService.brand.findUnique({
        where: { id: brandId },
        select: brandSelect,
      });

      if (!brand) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BRAND_NOT_FOUND],
          ERROR_CODES.BRAND_NOT_FOUND,
        );
      }

      const brandResponse = this.mapBrandEntity(brand);

      return {
        type: 'response',
        message: 'Brand retrieved successfully',
        data: brandResponse,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to get brand',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateBrand({
    brandId,
    userId,
    updateBrandDto,
    logo,
  }: {
    brandId: string;
    userId?: string;
    updateBrandDto: UpdateBrandDto;
    logo?: Express.Multer.File;
  }): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    try {
      const existing = await this.prismaService.brand.findUnique({
        where: { id: brandId },
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BRAND_NOT_FOUND],
          ERROR_CODES.BRAND_NOT_FOUND,
        );
      }

      const data: any = await processDataObject(updateBrandDto, {
        excludeKeys: ['logo'],
      });

      if (data.name && data.name !== existing.name) {
        data.slug = await this.ensureUniqueSlug(data.name, brandId);
      }

      if (logo) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: logo,
            type: MediaType.BRAND_LOGO,
            userId,
          },
          {
            getDirectUrl: true,
          },
        );

        data.logoMediaId = uploadedMedia.mediaId;
      }

      const updated = await this.prismaService.brand.update({
        where: { id: brandId },
        data,
        select: brandSelect,
      });

      const responseDto = this.mapBrandEntity(updated);

      return {
        type: 'response',
        message: 'Brand updated successfully',
        data: responseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to update brand',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteBrand(
    brandId: string,
  ): Promise<IBeforeTransformResponseType<BrandResponseDto>> {
    try {
      const existing = await this.prismaService.brand.findUnique({
        where: { id: brandId },
        select: brandSelect,
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BRAND_NOT_FOUND],
          ERROR_CODES.BRAND_NOT_FOUND,
        );
      }

      const productsCount = await this.prismaService.product.count({
        where: { brandId },
      });

      if (productsCount > 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.DELETE_BRAND_HAS_PRODUCTS],
          ERROR_CODES.DELETE_BRAND_HAS_PRODUCTS,
        );
      }

      await this.prismaService.brand.delete({
        where: { id: brandId },
      });

      // Delete logo from S3
      if (existing.logoMediaId) {
        await this.storageService.deleteFile(existing.logoMediaId);
      }

      const message = 'Brand deleted successfully';
      const responseDto = this.mapBrandEntity(existing);
      return {
        type: 'response',
        message,
        data: responseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to delete brand',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  private mapBrandEntity(brand: BrandSelect): BrandResponseDto {
    const plain: any = {
      id: brand.id,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
      name: brand.name,
      slug: brand.slug,
      description: brand.description,
      website: brand.website,
      isActive: brand.isActive,
      logoMediaId: brand.logoMediaId,
      logoMedia: brand.logoMedia
        ? this.mapMediaToUploadDto(brand.logoMedia)
        : undefined,
    };

    return toResponseDto(BrandResponseDto, plain);
  }

  private mapMediaToUploadDto(media: any): UploadResponseDto {
    // const plain: any = {
    //   mediaId: media.id,
    //   url: media.url,
    //   key: media.key,
    //   size: media.size,
    //   mimetype: media.mimetype,
    //   filename: media.filename,
    //   type: media.type,
    // };
    console.log('media', media);

    return toResponseDto(UploadResponseDto, media);
  }

  private async ensureUniqueSlug(
    name: string,
    excludeBrandId?: string,
  ): Promise<string> {
    const baseSlug = slugify(name, {
      lower: true,
    });
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.prismaService.brand.findFirst({
        where: {
          slug,
          ...(excludeBrandId ? { id: { not: excludeBrandId } } : {}),
        },
        select: { id: true },
      });

      if (!existing) {
        break;
      }

      slug = `${baseSlug}-${counter++}`;
    }

    return slug;
  }
}
