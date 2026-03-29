import { Injectable } from '@nestjs/common';
import {
  BannerPosition,
  BannerType,
  MediaType,
  Prisma,
} from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { StorageService } from 'src/modules/storage/storage.service';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { BusinessException } from 'src/exceptions/business.exception';
import {
  withoutDeleted,
  softDeleteData,
} from 'src/libs/prisma/soft-delete.helpers';
import {
  IBeforeTransformResponseType,
  IBeforeTransformPaginationResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  BannerGroupResponseDto,
  BannerResponseDto,
} from './dto/banner-response.dto';
import { CreateBannerGroupDto } from './dto/create-banner-group.dto';
import { UpdateBannerGroupDto } from './dto/update-banner-group.dto';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import { processDataObject } from 'src/libs/utils/utils';
import { bannerGroupSelect, bannerSelect } from 'src/libs/prisma/banner-select';

@Injectable()
export class BannerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  // ============== Banner Group Methods ==============

  async getAllBannerGroups(params?: {
    page?: number;
    limit?: number;
    bannerId?: string;
  }): Promise<IBeforeTransformPaginationResponseType<BannerGroupResponseDto>> {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 10;

      const where: Prisma.BannerGroupWhereInput = withoutDeleted({});

      if (params?.bannerId) {
        where.banners = {
          some: {
            bannerId: params.bannerId,
          },
        };
      }

      const [groups, totalCount] = await Promise.all([
        this.prismaService.bannerGroup.findMany({
          select: bannerGroupSelect,
          where,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.bannerGroup.count({ where }),
      ]);

      const groupResponses = groups.map((group) =>
        toResponseDto(BannerGroupResponseDto, group),
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách nhóm banner thành công',
        data: {
          items: groupResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getBannerGroupById(
    groupId: string,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    try {
      const group = await this.prismaService.bannerGroup.findFirst({
        where: withoutDeleted({ id: groupId }),
        select: bannerGroupSelect,
      });

      if (!group) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
          ERROR_CODES.BANNER_GROUP_NOT_FOUND,
        );
      }

      const result = toResponseDto(BannerGroupResponseDto, group);

      return {
        type: 'response',
        message: 'Lấy thông tin nhóm banner thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getActiveBannerGroup(): Promise<
    IBeforeTransformResponseType<BannerGroupResponseDto>
  > {
    try {
      const now = new Date();

      const group = await this.prismaService.bannerGroup.findFirst({
        where: withoutDeleted({
          isActive: true,
          OR: [
            {
              AND: [{ startDate: { lte: now } }, { endDate: { gte: now } }],
            },
            {
              AND: [{ startDate: null }, { endDate: null }],
            },
          ],
        }),
        select: bannerGroupSelect,
        orderBy: { createdAt: 'desc' },
      });

      if (!group) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.NO_ACTIVE_BANNER_GROUP],
          ERROR_CODES.NO_ACTIVE_BANNER_GROUP,
        );
      }

      const result = toResponseDto(BannerGroupResponseDto, group);

      return {
        type: 'response',
        message: 'Lấy nhóm banner đang hoạt động thành công',
        data: result,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createBannerGroup(
    dto: CreateBannerGroupDto,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    try {
      // Check if slug already exists
      const existing = await this.prismaService.bannerGroup.findFirst({
        where: withoutDeleted({ slug: dto.slug }),
      });

      if (existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_SLUG_EXISTS],
          ERROR_CODES.BANNER_GROUP_SLUG_EXISTS,
        );
      }

      const processedDto = await processDataObject(dto);

      const group = await this.prismaService.bannerGroup.create({
        data: {
          ...processedDto,
          ...(processedDto.startDate && {
            startDate: new Date(processedDto.startDate),
          }),
          ...(processedDto.endDate && {
            endDate: new Date(processedDto.endDate),
          }),
        },
        select: bannerGroupSelect,
      });

      const result = toResponseDto(BannerGroupResponseDto, group);

      return {
        type: 'response',
        message: 'Tạo nhóm banner thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateBannerGroup(
    groupId: string,
    dto: UpdateBannerGroupDto,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    try {
      const existing = await this.prismaService.bannerGroup.findFirst({
        where: withoutDeleted({ id: groupId }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
          ERROR_CODES.BANNER_GROUP_NOT_FOUND,
        );
      }

      const processedDto = await processDataObject(dto);

      const group = await this.prismaService.bannerGroup.update({
        where: { id: groupId },
        data: {
          ...processedDto,
          ...(processedDto.startDate && {
            startDate: new Date(processedDto.startDate),
          }),
          ...(processedDto.endDate && {
            endDate: new Date(processedDto.endDate),
          }),
        },
        select: bannerGroupSelect,
      });

      const result = toResponseDto(BannerGroupResponseDto, group);

      return {
        type: 'response',
        message: 'Cập nhật nhóm banner thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteBannerGroup(
    groupId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existing = await this.prismaService.bannerGroup.findFirst({
        where: withoutDeleted({ id: groupId }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
          ERROR_CODES.BANNER_GROUP_NOT_FOUND,
        );
      }

      // Soft delete banner group and all associated banners in transaction
      await this.prismaService.$transaction([
        // Soft delete all banners in this group
        this.prismaService.banner.updateMany({
          where: {
            groups: {
              some: {
                bannerGroupId: groupId,
              },
            },
          },
          data: softDeleteData(),
        }),
        // Soft delete the banner group
        this.prismaService.bannerGroup.update({
          where: { id: groupId },
          data: softDeleteData(),
        }),
      ]);

      return {
        type: 'response',
        message: 'Xóa nhóm banner thành công',
        data: { message: 'Xóa nhóm banner thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Banner Item Methods ==============

  async getAllBanners(params?: {
    page?: number;
    limit?: number;
    search?: string;
    groupId?: string;
  }): Promise<IBeforeTransformPaginationResponseType<BannerResponseDto>> {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 10;

      const where: Prisma.BannerWhereInput = withoutDeleted({});

      if (params?.search) {
        where.OR = [
          { title: { contains: params.search, mode: 'insensitive' } },
          { badge: { contains: params.search, mode: 'insensitive' } },
          { description: { contains: params.search, mode: 'insensitive' } },
          { ctaLink: { contains: params.search, mode: 'insensitive' } },
          { subLabel: { contains: params.search, mode: 'insensitive' } },
        ];
      }

      if (params?.groupId) {
        where.groups = {
          some: {
            bannerGroupId: params.groupId,
          },
        };
      }

      const [banners, totalCount] = await Promise.all([
        this.prismaService.banner.findMany({
          where,
          select: bannerSelect,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.banner.count({ where }),
      ]);

      const bannerResponses = banners.map((banner) =>
        toResponseDto(BannerResponseDto, banner),
      );

      return {
        type: 'pagination',
        message: 'Lấy danh sách banner thành công',
        data: {
          items: bannerResponses,
          totalCount,
          currentPage: page,
          pageSize: limit,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createBanner(
    dto: CreateBannerDto,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    try {
      const {
        groupId,
        bgClass: _,
        ...restDto
      } = (await processDataObject(dto)) as any;

      if (groupId) {
        const group = await this.prismaService.bannerGroup.findFirst({
          where: withoutDeleted({ id: groupId }),
        });

        if (!group) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
            ERROR_CODES.BANNER_GROUP_NOT_FOUND,
          );
        }
      }

      let sortOrder = restDto.sortOrder;
      if (groupId && (sortOrder === undefined || sortOrder === null)) {
        const lastBannerInGroup =
          await this.prismaService.bannerGroupMapping.findFirst({
            where: { bannerGroupId: groupId },
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true },
          });
        sortOrder = lastBannerInGroup ? lastBannerInGroup.sortOrder + 1 : 1;
      }

      const { sortOrder: _ignored, ...bannerData } = restDto;

      // Create banner without groupId
      const banner = await this.prismaService.banner.create({
        data: {
          ...bannerData,
          type: bannerData.type as BannerType,
        },
        include: {
          imageMedia: true,
          groups: {
            include: {
              bannerGroup: true,
            },
          },
        },
      });

      // Create junction table mapping if groupId exists
      if (groupId) {
        await this.prismaService.bannerGroupMapping.create({
          data: {
            bannerId: banner.id,
            bannerGroupId: groupId,
            sortOrder: sortOrder || 0,
          },
        });
      }

      const result = toResponseDto(BannerResponseDto, banner);

      return {
        type: 'response',
        message: 'Tạo banner thành công',
        data: result,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createBannerWithUpload(
    dto: CreateBannerDto,
    file: Express.Multer.File,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    try {
      const { groupId, ...processedDto } = (await processDataObject(
        dto,
      )) as any;

      if (groupId) {
        const group = await this.prismaService.bannerGroup.findFirst({
          where: withoutDeleted({ id: groupId }),
          select: bannerGroupSelect,
        });

        if (!group) {
          throw new BusinessException(
            ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
            ERROR_CODES.BANNER_GROUP_NOT_FOUND,
          );
        }
      }

      // Upload image
      const uploadResult = await this.storageService.uploadFile({
        file,
        type: MediaType.BANNER_IMAGE,
      });

      let sortOrder = processedDto.sortOrder;
      if (groupId && (sortOrder === undefined || sortOrder === null)) {
        const lastBannerInGroup =
          await this.prismaService.bannerGroupMapping.findFirst({
            where: { bannerGroupId: groupId },
            orderBy: { sortOrder: 'desc' },
            select: { sortOrder: true },
          });
        sortOrder = lastBannerInGroup ? lastBannerInGroup.sortOrder + 1 : 1;
      }

      const { sortOrder: _ignored, ...bannerData } = processedDto;

      // Create banner without groupId
      const banner = await this.prismaService.banner.create({
        data: {
          ...bannerData,
          type: bannerData.type as BannerType,
          imageMediaId: uploadResult.id,
        },
        select: {
          id: true,
        },
      });

      // Create junction table mapping if groupId exists
      if (groupId) {
        await this.prismaService.bannerGroupMapping.create({
          data: {
            bannerId: banner.id,
            bannerGroupId: groupId,
            sortOrder: sortOrder || 0,
          },
        });
      }

      const bannerResult = await this.prismaService.banner.findUnique({
        where: { id: banner.id },
        select: bannerSelect,
      });

      const result = toResponseDto(BannerResponseDto, bannerResult);

      return {
        type: 'response',
        message: 'Tạo banner kèm hình ảnh thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateBanner(
    bannerId: string,
    dto: UpdateBannerDto,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    try {
      const existing = await this.prismaService.banner.findFirst({
        where: withoutDeleted({ id: bannerId }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_NOT_FOUND],
          ERROR_CODES.BANNER_NOT_FOUND,
        );
      }

      const processedDto = await processDataObject(dto);
      const { sortOrder: _ignored, ...updateData } = processedDto as any;

      const banner = await this.prismaService.banner.update({
        where: { id: bannerId },
        data: {
          ...updateData,
          ...(updateData.type && { type: updateData.type as BannerType }),
        },
        include: {
          imageMedia: true,
          groups: {
            include: {
              bannerGroup: true,
            },
          },
        },
      });

      const result = toResponseDto(BannerResponseDto, banner);

      return {
        type: 'response',
        message: 'Cập nhật banner thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateBannerWithUpload(
    bannerId: string,
    dto: UpdateBannerDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    try {
      const existing = await this.prismaService.banner.findFirst({
        where: withoutDeleted({ id: bannerId }),
        include: { imageMedia: true },
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_NOT_FOUND],
          ERROR_CODES.BANNER_NOT_FOUND,
        );
      }

      // Upload new image
      const uploadResult = await this.storageService.uploadFile({
        file,
        type: MediaType.BANNER_IMAGE,
        userId,
      });

      // Delete old image if exists
      if (existing.imageMediaId) {
        await this.storageService.deleteFile(existing.imageMediaId);
      }

      const processedDto = await processDataObject(dto);
      const { sortOrder: _ignored, ...updateData } = processedDto as any;

      const banner = await this.prismaService.banner.update({
        where: { id: bannerId },
        data: {
          ...updateData,
          ...(updateData.type && { type: updateData.type as BannerType }),
          imageMediaId: uploadResult.id,
        },
        include: {
          imageMedia: true,
          groups: {
            include: {
              bannerGroup: true,
            },
          },
        },
      });

      const result = toResponseDto(BannerResponseDto, banner);

      return {
        type: 'response',
        message: 'Cập nhật banner kèm hình ảnh thành công',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async addBannerToGroup(
    groupId: string,
    bannerId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const group = await this.prismaService.bannerGroup.findFirst({
        where: withoutDeleted({ id: groupId }),
      });

      if (!group) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
          ERROR_CODES.BANNER_GROUP_NOT_FOUND,
        );
      }

      const banner = await this.prismaService.banner.findFirst({
        where: withoutDeleted({ id: bannerId }),
      });

      if (!banner) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_NOT_FOUND],
          ERROR_CODES.BANNER_NOT_FOUND,
        );
      }

      const existingMapping =
        await this.prismaService.bannerGroupMapping.findUnique({
          where: {
            bannerId_bannerGroupId: {
              bannerId,
              bannerGroupId: groupId,
            },
          },
        });

      if (existingMapping) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_ALREADY_IN_GROUP],
          ERROR_CODES.BANNER_ALREADY_IN_GROUP,
        );
      }

      const lastBannerInGroup =
        await this.prismaService.bannerGroupMapping.findFirst({
          where: { bannerGroupId: groupId },
          orderBy: { sortOrder: 'desc' },
          select: { sortOrder: true },
        });

      const sortOrder = lastBannerInGroup ? lastBannerInGroup.sortOrder + 1 : 1;

      await this.prismaService.bannerGroupMapping.create({
        data: {
          bannerId,
          bannerGroupId: groupId,
          sortOrder,
        },
      });

      return {
        type: 'response',
        message: 'Thêm banner vào nhóm thành công',
        data: { message: 'Thêm banner vào nhóm thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteBanner(
    bannerId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existing = await this.prismaService.banner.findFirst({
        where: withoutDeleted({ id: bannerId }),
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_NOT_FOUND],
          ERROR_CODES.BANNER_NOT_FOUND,
        );
      }

      await this.prismaService.banner.update({
        where: { id: bannerId },
        data: softDeleteData(),
      });

      return {
        type: 'response',
        message: 'Xóa banner thành công',
        data: { message: 'Xóa banner thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async removeBannerFromGroup(
    groupId: string,
    bannerId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      await this.prismaService.bannerGroupMapping.delete({
        where: {
          bannerId_bannerGroupId: {
            bannerId,
            bannerGroupId: groupId,
          },
        },
      });

      return {
        type: 'response',
        message: 'Gỡ banner khỏi nhóm thành công',
        data: { message: 'Gỡ banner khỏi nhóm thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async removeBannersFromGroup(
    groupId: string,
    bannerIds: string[],
  ): Promise<IBeforeTransformResponseType<{ message: string; count: number }>> {
    try {
      const result = await this.prismaService.bannerGroupMapping.deleteMany({
        where: {
          bannerGroupId: groupId,
          bannerId: { in: bannerIds },
        },
      });

      return {
        type: 'response',
        message: 'Gỡ hàng loạt banner khỏi nhóm thành công',
        data: {
          message: 'Gỡ hàng loạt banner khỏi nhóm thành công',
          count: result.count,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async reorderBannersInGroup(
    groupId: string,
    orderData: { bannerId: string; sortOrder: number }[],
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      await this.prismaService.$transaction(
        orderData.map((item) =>
          this.prismaService.bannerGroupMapping.update({
            where: {
              bannerId_bannerGroupId: {
                bannerGroupId: groupId,
                bannerId: item.bannerId,
              },
            },
            data: { sortOrder: item.sortOrder },
          }),
        ),
      );

      return {
        type: 'response',
        message: 'Cập nhật thứ tự banner thành công',
        data: { message: 'Cập nhật thứ tự banner thành công' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Seed Method ==============

  async seedBanners(): Promise<
    IBeforeTransformResponseType<{ message: string; count: number }>
  > {
    try {
      // Delete existing banners first
      await this.prismaService.banner.deleteMany();
      await this.prismaService.bannerGroup.deleteMany();

      // Create active banner group
      const bannerGroup = await this.prismaService.bannerGroup.create({
        data: {
          name: 'Homepage Main Banners',
          slug: 'homepage-main',
          description: 'Main banner group for homepage display',
          isActive: true,
          startDate: null,
          endDate: null,
        },
      });

      // Main carousel banners data
      const mainBanners = [
        {
          type: 'TEXT' as BannerType,
          position: 'MAIN_CAROUSEL' as BannerPosition,
          badge: 'Beauty Box',
          title: 'FLASH SALE RINH QUÀ LINH ĐÌNH',
          description:
            'Áp dụng trên website và mua online nhận hàng nhanh tại cửa hàng.',
          highlight: 'Mua 1 tặng 3',
          ctaText: 'Mua ngay',
          ctaLink: '/products',
          subLabel: 'Số lượng quà tặng có hạn.',
          gradientFrom: '#ffe4f0',
          gradientTo: '#fff5fb',
          sortOrder: 1,
          isActive: true,
        },
        {
          type: 'TEXT' as BannerType,
          position: 'MAIN_CAROUSEL' as BannerPosition,
          badge: 'Ưu đãi hôm nay',
          title: 'Giảm đến 50% sản phẩm chăm sóc da',
          description:
            'Chọn ngay routine phù hợp cho làn da của bạn với deal siêu hời.',
          highlight: 'Giảm đến -50%',
          ctaText: 'Khám phá ngay',
          ctaLink: '/products',
          subLabel: 'Áp dụng cho sản phẩm được gắn nhãn Flash Sale.',
          gradientFrom: '#e0f2ff',
          gradientTo: '#ffffff',
          sortOrder: 2,
          isActive: true,
        },
        {
          type: 'TEXT' as BannerType,
          position: 'MAIN_CAROUSEL' as BannerPosition,
          badge: 'Hội viên mới',
          title: 'Tặng voucher 50K cho đơn đầu tiên',
          description:
            'Đăng ký tài khoản để nhận thêm nhiều ưu đãi cực dễ thương.',
          highlight: 'Voucher 50K',
          ctaText: 'Đăng ký ngay',
          ctaLink: '/auth/register',
          subLabel: 'Áp dụng cho đơn từ 299K.',
          gradientFrom: '#fff4e0',
          gradientTo: '#ffffff',
          sortOrder: 3,
          isActive: true,
        },
      ];

      // Side banners data
      const sideBanners = [
        {
          type: 'TEXT' as BannerType,
          position: 'SIDE_TOP' as BannerPosition,
          badge: 'Sạch sâu nhưng vẫn dịu nhẹ',
          title: 'Combo làm sạch da 100%',
          description: 'Làm sạch nhiều lớp makeup, không khô căng.',
          highlight: 'Chỉ từ 58K',
          ctaText: 'Xem ngay',
          ctaLink: '/products',
          gradientFrom: '#e5f6ff',
          gradientTo: '#ffffff',
          sortOrder: 1,
          isActive: true,
        },
        {
          type: 'TEXT' as BannerType,
          position: 'SIDE_BOTTOM' as BannerPosition,
          badge: 'Độc quyền tại Beauty Box',
          title: 'Kem nền Mesh Blur mịn lì',
          description: 'Hiệu ứng blur mờ mịn, che phủ cho lớp nền tự nhiên.',
          highlight: 'Mua kèm nhận quà tặng',
          ctaText: 'Xem ngay',
          ctaLink: '/products',
          gradientFrom: '#f4e6ff',
          gradientTo: '#ffffff',
          sortOrder: 2,
          isActive: true,
        },
      ];

      // Insert all banners
      const allBanners = [...mainBanners, ...sideBanners];

      for (const bannerData of allBanners) {
        const { sortOrder, ...createData } = bannerData;
        // Create banner without groupId
        const banner = await this.prismaService.banner.create({
          data: createData,
        });

        // Create junction table mapping
        await this.prismaService.bannerGroupMapping.create({
          data: {
            bannerId: banner.id,
            bannerGroupId: bannerGroup.id,
            sortOrder: bannerData.sortOrder,
          },
        });
      }

      return {
        type: 'response',
        message: 'Khởi tạo dữ liệu banner thành công',
        data: {
          message: `Đã tạo ${allBanners.length} banner (3 băng chuyền + 2 bên)`,
          count: allBanners.length,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.DATABASE_ERROR],
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
