import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import {
  CreateFlashSaleDto,
  UpdateFlashSaleDto,
  AddFlashSaleProductDto,
  UpdateFlashSaleProductDto,
} from './dto/flash-sale.dto';
import { FlashSaleStatus } from 'prisma/generated/prisma/client';
import { FlashSaleResponseDto, FlashSaleProductResponseDto } from './dto/flash-sale-response.dto';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import {
  IBeforeTransformResponseType,
  IBeforeTransformPaginationResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { flashSaleSelect, flashSaleProductSelect } from 'src/libs/prisma/flash-sale-select';

@Injectable()
export class FlashSaleService {
  constructor(private readonly prisma: PrismaService) {}

  async createFlashSale(dto: CreateFlashSaleDto): Promise<IBeforeTransformResponseType<FlashSaleResponseDto>> {
    if (dto.startTime >= dto.endTime) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_INVALID_TIME],
        ERROR_CODES.FLASH_SALE_INVALID_TIME,
      );
    }
    const slugExists = await this.prisma.flashSale.findUnique({
      where: { slug: dto.slug },
    });
    if (slugExists) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_SLUG_EXISTS],
        ERROR_CODES.FLASH_SALE_SLUG_EXISTS,
      );
    }

    const { status, isActive, sortOrder, ...rest } = dto;
    const result = await this.prisma.flashSale.create({
      data: {
        ...rest,
        status: status ?? FlashSaleStatus.UPCOMING,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return {
      type: 'response',
      message: 'Tạo Flash sale thành công',
      data: toResponseDto(FlashSaleResponseDto, result),
    };
  }

  async getAllFlashSales(params: { page?: number; limit?: number }): Promise<IBeforeTransformPaginationResponseType<FlashSaleResponseDto>> {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.flashSale.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.flashSale.count(),
    ]);

    return {
      type: 'pagination',
      message: 'Lấy danh sách Flash sale thành công',
      data: {
        items: toResponseDto(FlashSaleResponseDto, items) as unknown as FlashSaleResponseDto[],
        totalCount: total,
        currentPage: page,
        pageSize: limit,
      },
    };
  }

  async getFlashSaleById(id: string): Promise<IBeforeTransformResponseType<FlashSaleResponseDto>> {
    const flashSale = await this.prisma.flashSale.findUnique({
      where: { id },
      select: flashSaleSelect,
    });

    if (!flashSale) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_NOT_FOUND],
        ERROR_CODES.FLASH_SALE_NOT_FOUND,
      );
    }

    return {
      type: 'response',
      message: 'Lấy thông tin Flash sale thành công',
      data: toResponseDto(FlashSaleResponseDto, flashSale),
    };
  }

  async updateFlashSale(id: string, dto: UpdateFlashSaleDto): Promise<IBeforeTransformResponseType<FlashSaleResponseDto>> {
    const flashSale = await this.prisma.flashSale.findUnique({ where: { id } });
    if (!flashSale) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_NOT_FOUND],
        ERROR_CODES.FLASH_SALE_NOT_FOUND,
      );
    }

    if (dto.startTime && dto.endTime && dto.startTime >= dto.endTime) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_INVALID_TIME],
        ERROR_CODES.FLASH_SALE_INVALID_TIME,
      );
    } else if (dto.startTime && flashSale.endTime && dto.startTime >= flashSale.endTime) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_INVALID_TIME],
        ERROR_CODES.FLASH_SALE_INVALID_TIME,
      );
    } else if (dto.endTime && flashSale.startTime && flashSale.startTime >= dto.endTime) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_INVALID_TIME],
        ERROR_CODES.FLASH_SALE_INVALID_TIME,
      );
    }

    if (dto.slug && dto.slug !== flashSale.slug) {
      const slugExists = await this.prisma.flashSale.findUnique({
        where: { slug: dto.slug },
      });
      if (slugExists) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_SLUG_EXISTS],
          ERROR_CODES.FLASH_SALE_SLUG_EXISTS,
        );
      }
    }

    const updated = await this.prisma.flashSale.update({
      where: { id },
      data: dto,
    });

    return {
      type: 'response',
      message: 'Cập nhật Flash sale thành công',
      data: toResponseDto(FlashSaleResponseDto, updated),
    };
  }

  async deleteFlashSale(id: string): Promise<IBeforeTransformResponseType<{ message: string }>> {
    const flashSale = await this.prisma.flashSale.findUnique({ where: { id } });
    if (!flashSale) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_NOT_FOUND],
        ERROR_CODES.FLASH_SALE_NOT_FOUND,
      );
    }
    await this.prisma.flashSale.delete({ where: { id } });
    return {
      type: 'response',
      message: 'Xóa Flash sale thành công',
      data: { message: 'Xóa Flash sale thành công' },
    };
  }

  async addProductsToFlashSale(id: string, dtos: AddFlashSaleProductDto[]): Promise<IBeforeTransformResponseType<FlashSaleProductResponseDto[]>> {
    const flashSale = await this.prisma.flashSale.findUnique({ where: { id } });
    if (!flashSale) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_NOT_FOUND],
        ERROR_CODES.FLASH_SALE_NOT_FOUND,
      );
    }

    const results: any[] = [];
    for (const dto of dtos) {
      const productInput: any = {
        flashSaleId: id,
        productId: dto.productId,
        variantId: null,
      };
      
      if(dto.variantId) {
          productInput.variantId = dto.variantId;
      }
      
      const exists = await this.prisma.flashSaleProduct.findFirst({
        where: productInput
      });

      if (exists) {
        results.push(
          await this.prisma.flashSaleProduct.update({
            where: { id: exists.id },
            data: {
              flashPrice: dto.flashPrice,
              originalPrice: dto.originalPrice,
              maxQuantity: dto.maxQuantity,
              limitPerOrder: dto.limitPerOrder ?? 1,
              sortOrder: dto.sortOrder ?? 0,
            },
          })
        );
      } else {
        results.push(
          await this.prisma.flashSaleProduct.create({
            data: {
              flashSaleId: id,
              productId: dto.productId,
              variantId: dto.variantId,
              flashPrice: dto.flashPrice,
              originalPrice: dto.originalPrice,
              maxQuantity: dto.maxQuantity,
              limitPerOrder: dto.limitPerOrder ?? 1,
              sortOrder: dto.sortOrder ?? 0,
            },
          })
        );
      }
    }

    return {
      type: 'response',
      message: 'Thêm sản phẩm vào Flash sale thành công',
      data: toResponseDto(FlashSaleProductResponseDto, results) as unknown as FlashSaleProductResponseDto[],
    };
  }

  async updateFlashSaleProduct(id: string, productId: string, variantId: string | undefined, dto: UpdateFlashSaleProductDto): Promise<IBeforeTransformResponseType<FlashSaleProductResponseDto>> {
    const filters: any = { flashSaleId: id, productId };
    if (variantId) filters.variantId = variantId;

    const flashSaleProduct = await this.prisma.flashSaleProduct.findFirst({
      where: filters,
    });

    if (!flashSaleProduct) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_PRODUCT_NOT_FOUND],
        ERROR_CODES.FLASH_SALE_PRODUCT_NOT_FOUND,
      );
    }

    const updated = await this.prisma.flashSaleProduct.update({
      where: { id: flashSaleProduct.id },
      data: {
        flashPrice: dto.flashPrice,
        originalPrice: dto.originalPrice,
        maxQuantity: dto.maxQuantity,
        limitPerOrder: dto.limitPerOrder,
        sortOrder: dto.sortOrder,
      },
    });

    return {
      type: 'response',
      message: 'Cập nhật sản phẩm Flash sale thành công',
      data: toResponseDto(FlashSaleProductResponseDto, updated),
    };
  }

  async removeProductFromFlashSale(id: string, productId: string, variantId?: string): Promise<IBeforeTransformResponseType<{ message: string }>> {
    const filters: any = { flashSaleId: id, productId };
    if (variantId) filters.variantId = variantId;

    const flashSaleProduct = await this.prisma.flashSaleProduct.findFirst({
      where: filters,
    });

    if (!flashSaleProduct) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.FLASH_SALE_PRODUCT_NOT_FOUND],
        ERROR_CODES.FLASH_SALE_PRODUCT_NOT_FOUND,
      );
    }

    await this.prisma.flashSaleProduct.delete({
      where: { id: flashSaleProduct.id },
    });

    return {
      type: 'response',
      message: 'Xóa sản phẩm khỏi Flash sale thành công',
      data: { message: 'Xóa sản phẩm khỏi Flash sale thành công' },
    };
  }

  async getCurrentFlashSale(): Promise<IBeforeTransformResponseType<FlashSaleResponseDto | null>> {
    const now = new Date();
    const flashSale = await this.prisma.flashSale.findFirst({
      where: {
        isActive: true,
        startTime: { lte: now },
        endTime: { gte: now },
        status: FlashSaleStatus.ACTIVE,
      },
      select: flashSaleSelect,
      orderBy: { startTime: 'asc' }
    });
    
    return {
      type: 'response',
      message: 'Lấy Flash sale hiện tại thành công',
      data: flashSale ? toResponseDto(FlashSaleResponseDto, flashSale) : null,
    };
  }

  async getUpcomingFlashSales(): Promise<IBeforeTransformResponseType<FlashSaleResponseDto[]>> {
    const now = new Date();
    const flashSales = await this.prisma.flashSale.findMany({
      where: {
        isActive: true,
        startTime: { gt: now },
        status: FlashSaleStatus.UPCOMING,
      },
      orderBy: { startTime: 'asc' },
      take: 5,
    });

    return {
      type: 'response',
      message: 'Lấy danh sách Flash sale sắp tới thành công',
      data: toResponseDto(FlashSaleResponseDto, flashSales) as unknown as FlashSaleResponseDto[],
    };
  }
}
