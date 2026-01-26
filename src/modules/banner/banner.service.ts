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
import { bannerGroupSelect } from 'src/libs/prisma/banner-select';

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
  }): Promise<IBeforeTransformPaginationResponseType<BannerGroupResponseDto>> {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 10;

      const [groups, totalCount] = await Promise.all([
        this.prismaService.bannerGroup.findMany({
          select: bannerGroupSelect,
          where: {
            banners: {
              some: {
                banner: {
                  isActive: true,
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prismaService.bannerGroup.count(),
      ]);

      const groupResponses = groups.map((group) =>
        toResponseDto(BannerGroupResponseDto, group),
      );

      return {
        type: 'pagination',
        message: 'Banner groups retrieved successfully',
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
        'Failed to get banner groups',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async getBannerGroupById(
    groupId: string,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    try {
      const group = await this.prismaService.bannerGroup.findUnique({
        where: { id: groupId },
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
        message: 'Banner group retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to get banner group',
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
        where: {
          isActive: true,
          OR: [
            {
              AND: [{ startDate: { lte: now } }, { endDate: { gte: now } }],
            },
            {
              AND: [{ startDate: null }, { endDate: null }],
            },
          ],
        },
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
        message: 'Active banner group retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to get active banner group',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createBannerGroup(
    dto: CreateBannerGroupDto,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    try {
      // Check if slug already exists
      const existing = await this.prismaService.bannerGroup.findUnique({
        where: { slug: dto.slug },
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
        message: 'Banner group created successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to create banner group',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateBannerGroup(
    groupId: string,
    dto: UpdateBannerGroupDto,
  ): Promise<IBeforeTransformResponseType<BannerGroupResponseDto>> {
    try {
      const existing = await this.prismaService.bannerGroup.findUnique({
        where: { id: groupId },
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
        message: 'Banner group updated successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to update banner group',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteBannerGroup(
    groupId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existing = await this.prismaService.bannerGroup.findUnique({
        where: { id: groupId },
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
          ERROR_CODES.BANNER_GROUP_NOT_FOUND,
        );
      }

      await this.prismaService.bannerGroup.delete({
        where: { id: groupId },
      });

      return {
        type: 'response',
        message: 'Banner group deleted successfully',
        data: { message: 'Banner group deleted successfully' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to delete banner group',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  // ============== Banner Item Methods ==============

  async createBanner(
    groupId: string, // Keep for API compatibility
    dto: CreateBannerDto,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    try {
      const group = await this.prismaService.bannerGroup.findUnique({
        where: { id: groupId },
      });

      if (!group) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
          ERROR_CODES.BANNER_GROUP_NOT_FOUND,
        );
      }

      const processedDto = await processDataObject(dto);

      // Create banner without groupId
      const banner = await this.prismaService.banner.create({
        data: {
          ...processedDto,
          type: processedDto.type as BannerType,
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

      // Create junction table mapping
      await this.prismaService.bannerGroupMapping.create({
        data: {
          bannerId: banner.id,
          bannerGroupId: groupId,
        },
      });

      const result = toResponseDto(BannerResponseDto, banner);

      return {
        type: 'response',
        message: 'Banner created successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to create banner',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async createBannerWithUpload(
    groupId: string,
    dto: CreateBannerDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    try {
      const group = await this.prismaService.bannerGroup.findUnique({
        where: { id: groupId },
      });

      if (!group) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_GROUP_NOT_FOUND],
          ERROR_CODES.BANNER_GROUP_NOT_FOUND,
        );
      }

      // Upload image
      const uploadResult = await this.storageService.uploadFile({
        file,
        type: MediaType.BANNER_IMAGE,
        userId,
      });

      const processedDto = await processDataObject(dto);

      // Create banner without groupId
      const banner = await this.prismaService.banner.create({
        data: {
          ...processedDto,
          type: processedDto.type as BannerType,
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

      // Create junction table mapping
      await this.prismaService.bannerGroupMapping.create({
        data: {
          bannerId: banner.id,
          bannerGroupId: groupId,
        },
      });

      const result = toResponseDto(BannerResponseDto, banner);

      return {
        type: 'response',
        message: 'Banner created with image successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to create banner with image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async updateBanner(
    bannerId: string,
    dto: UpdateBannerDto,
  ): Promise<IBeforeTransformResponseType<BannerResponseDto>> {
    try {
      const existing = await this.prismaService.banner.findUnique({
        where: { id: bannerId },
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_NOT_FOUND],
          ERROR_CODES.BANNER_NOT_FOUND,
        );
      }

      const processedDto = await processDataObject(dto);

      const banner = await this.prismaService.banner.update({
        where: { id: bannerId },
        data: {
          ...processedDto,
          ...(processedDto.type && { type: processedDto.type as BannerType }),
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
        message: 'Banner updated successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to update banner',
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
      const existing = await this.prismaService.banner.findUnique({
        where: { id: bannerId },
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

      const banner = await this.prismaService.banner.update({
        where: { id: bannerId },
        data: {
          ...processedDto,
          ...(processedDto.type && { type: processedDto.type as BannerType }),
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
        message: 'Banner updated with image successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to update banner with image',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }

  async deleteBanner(
    bannerId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    try {
      const existing = await this.prismaService.banner.findUnique({
        where: { id: bannerId },
      });

      if (!existing) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.BANNER_NOT_FOUND],
          ERROR_CODES.BANNER_NOT_FOUND,
        );
      }

      await this.prismaService.banner.delete({
        where: { id: bannerId },
      });

      return {
        type: 'response',
        message: 'Banner deleted successfully',
        data: { message: 'Banner deleted successfully' },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to delete banner',
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
        // Create banner without groupId
        const banner = await this.prismaService.banner.create({
          data: bannerData,
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
        message: 'Banner data seeded successfully',
        data: {
          message: `Created ${allBanners.length} banners (3 carousel + 2 side)`,
          count: allBanners.length,
        },
      };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        'Failed to seed banners',
        ERROR_CODES.DATABASE_ERROR,
      );
    }
  }
}
