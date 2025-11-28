import { Injectable } from '@nestjs/common';
import { CateGoryType, MediaType } from 'prisma/generated/prisma/client';
import { ERROR_CODES } from 'src/constants/error-codes';
import { BusinessException } from 'src/exceptions/business.exception';
import { categorySelect } from 'src/libs/prisma/category-select';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import { processDataObject } from 'src/libs/utils/utils';
import { StorageService } from 'src/modules/storage/storage.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { MediaResponseDto } from 'src/libs/dto/media-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  async createCategory({
    userId,
    createCategoryDto,
    image,
  }: {
    userId?: string;
    createCategoryDto: CreateCategoryDto;
    image?: Express.Multer.File;
  }): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    try {
      if (createCategoryDto.parentId) {
        const parent = await this.prismaService.category.findUnique({
          where: { id: createCategoryDto.parentId },
        });

        if (!parent) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PARENT_CATEGORY_NOT_FOUND],
            ERROR_CODES.PARENT_CATEGORY_NOT_FOUND,
          );
        }
      }

      let imageMediaId: string | undefined;

      if (image) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: image,
            type: MediaType.CATEGORY_IMAGE,
            userId,
          },
          {
            getDirectUrl: true,
          },
        );

        imageMediaId = uploadedMedia.id;
      }

      const slug = await this.ensureUniqueSlug(createCategoryDto.name);

      const data: any = await processDataObject(createCategoryDto);

      const category = await this.prismaService.category.create({
        data: {
          ...data,
          slug,
          imageMediaId,
        },
        select: categorySelect,
      });
      console.log(category);
      // const category = await this.prismaService.category.create({
      //   data: {
      //     name: createCategoryDto.name,
      //     slug,
      //     description: createCategoryDto.description,
      //     parentId: createCategoryDto.parentId ?? null,
      //     sortOrder: createCategoryDto.sortOrder ?? 0,
      //     type: createCategoryDto.type ?? CateGoryType.CATEGORY,
      //     brandId: createCategoryDto.brandId ?? null,
      //     isActive:
      //       createCategoryDto.isActive === undefined
      //         ? true
      //         : createCategoryDto.isActive,
      //     imageMediaId,
      //   },
      //   select: categorySelect,
      // });

      const categoryResponse = toResponseDto(CategoryResponseDto, category);

      return {
        type: 'response',
        message: 'Category created successfully',
        data: categoryResponse,
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to create category',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createSubCategory({
    userId,
    parentId,
    createCategoryDto,
    image,
  }: {
    userId?: string;
    parentId: string;
    createCategoryDto: CreateCategoryDto;
    image?: Express.Multer.File;
  }): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    return this.createCategory({
      userId,
      createCategoryDto: { ...createCategoryDto, parentId },
      image,
    });
  }

  async updateCategory({
    categoryId,
    userId,
    updateCategoryDto,
    image,
  }: {
    categoryId: string;
    userId?: string;
    updateCategoryDto: UpdateCategoryDto;
    image?: Express.Multer.File;
  }): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    try {
      const existing = await this.prismaService.category.findUnique({
        where: { id: categoryId },
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CATEGORY_NOT_FOUND],
          ERROR_CODES.CATEGORY_NOT_FOUND,
        );
      }

      if (updateCategoryDto.parentId) {
        if (updateCategoryDto.parentId === categoryId) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.CATEGORY_CANNOT_BE_OWN_PARENT],
            ERROR_CODES.CATEGORY_CANNOT_BE_OWN_PARENT,
          );
        }

        const parent = await this.prismaService.category.findUnique({
          where: { id: updateCategoryDto.parentId },
        });

        if (!parent) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.PARENT_CATEGORY_NOT_FOUND],
            ERROR_CODES.PARENT_CATEGORY_NOT_FOUND,
          );
        }
      }

      const data: any = await processDataObject(updateCategoryDto, {
        excludeKeys: ['image'],
      });

      if (data.name && data.name !== existing.name) {
        data.slug = await this.ensureUniqueSlug(data.name, categoryId);
      }

      if (image) {
        const uploadedMedia = await this.storageService.uploadFile(
          {
            file: image,
            type: MediaType.CATEGORY_IMAGE,
            userId,
          },
          {
            getDirectUrl: true,
          },
        );

        data.imageMediaId = uploadedMedia.id;
      }

      const updated = await this.prismaService.category.update({
        where: { id: categoryId },
        data,
        select: categorySelect,
      });

      const responseDto = toResponseDto(CategoryResponseDto, updated);

      return {
        type: 'response',
        message: 'Category updated successfully',
        data: responseDto,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }

      throw new BusinessException(
        'Failed to update category',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteCategory(
    categoryId: string,
  ): Promise<IBeforeTransformResponseType<CategoryResponseDto>> {
    try {
      const existing = await this.prismaService.category.findUnique({
        where: { id: categoryId },
        select: categorySelect,
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.CATEGORY_NOT_FOUND],
          ERROR_CODES.CATEGORY_NOT_FOUND,
        );
      }

      const childrenCount = await this.prismaService.category.count({
        where: { parentId: categoryId },
      });

      if (childrenCount > 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.DELETE_CATEGORY_HAS_CHILDREN],
          ERROR_CODES.DELETE_CATEGORY_HAS_CHILDREN,
        );
      }

      const productsCount = await this.prismaService.productCategory.count({
        where: { categoryId },
      });

      if (productsCount > 0) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.DELETE_CATEGORY_HAS_PRODUCTS],
          ERROR_CODES.DELETE_CATEGORY_HAS_PRODUCTS,
        );
      }

      await this.prismaService.category.delete({
        where: { id: categoryId },
      });

      const message = 'Category deleted successfully';
      const responseDto = toResponseDto(CategoryResponseDto, existing);
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
        'Failed to delete category',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getCategories(): Promise<
    IBeforeTransformResponseType<CategoryResponseDto[]>
  > {
    try {
      const categories = await this.prismaService.category.findMany({
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        select: categorySelect,
      });

      const dtoMap = new Map<string, CategoryResponseDto>();
      const roots: CategoryResponseDto[] = [];

      for (const entity of categories) {
        const dto = toResponseDto(CategoryResponseDto, entity);
        dto.children = [];
        dtoMap.set(entity.id, dto);
      }

      for (const entity of categories) {
        const dto = dtoMap.get(entity.id)!;
        if (entity.parentId && dtoMap.has(entity.parentId)) {
          const parentDto = dtoMap.get(entity.parentId)!;
          if (!parentDto.children) {
            parentDto.children = [];
          }
          parentDto.children.push(dto);
        } else {
          roots.push(dto);
        }
      }

      return {
        type: 'response',
        message: 'Categories retrieved successfully',
        data: roots,
      };
    } catch (error) {
      throw new BusinessException(
        'Failed to get categories',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // private mapCategoryEntity(category: CategorySelect): CategoryResponseDto {
  //   return toResponseDto(CategoryResponseDto, category);
  // }

  private mapMediaToUploadDto(media: any): MediaResponseDto {
    return toResponseDto(MediaResponseDto, media);
  }

  private async ensureUniqueSlug(
    name: string,
    excludeCategoryId?: string,
  ): Promise<string> {
    const baseSlug = slugify(name, {
      lower: true,
    });
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.prismaService.category.findFirst({
        where: {
          slug,
          ...(excludeCategoryId ? { id: { not: excludeCategoryId } } : {}),
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
