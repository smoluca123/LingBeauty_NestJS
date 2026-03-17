import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateCouponDto, CouponType } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { BusinessException } from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { toResponseDto } from 'src/libs/utils/transform.utils';
import { couponSelect } from 'src/libs/prisma/coupon-select';

@Injectable()
export class CouponService {
  private readonly logger = new Logger(CouponService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createCoupon(
    createDto: CreateCouponDto,
  ): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    const existing = await this.prisma.coupon.findUnique({
      where: { code: createDto.code },
    });
    if (existing) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_ALREADY_EXISTS],
        ERROR_CODES.COUPON_ALREADY_EXISTS,
      );
    }

    const created = await this.prisma.coupon.create({
      data: {
        code: createDto.code,
        type: createDto.type,
        value: createDto.value,
        minPurchase: createDto.minPurchase,
        maxDiscount: createDto.maxDiscount,
        usageLimit: createDto.usageLimit,
        startDate: new Date(createDto.startDate),
        endDate: new Date(createDto.endDate),
        isActive: createDto.isActive ?? true,
      },
      select: couponSelect,
    });

    return {
      type: 'response',
      message: 'Tạo mã giảm giá thành công',
      data: toResponseDto(CouponResponseDto, created),
      statusCode: 201,
    };
  }

  async getAllCoupons(options: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<IBeforeTransformPaginationResponseType<CouponResponseDto>> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const where = options.search
      ? { code: { contains: options.search, mode: 'insensitive' as const } }
      : {};

    const [total, items] = await Promise.all([
      this.prisma.coupon.count({ where }),
      this.prisma.coupon.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: couponSelect,
      }),
    ]);

    const couponResponse = items.map((coupon) =>
      toResponseDto(CouponResponseDto, coupon),
    );

    return {
      type: 'pagination',
      message: 'Lấy danh sách mã giảm giá thành công',
      data: {
        items: couponResponse,
        totalCount: total,
        currentPage: page,
        pageSize: limit,
      },
    };
  }

  async getCoupon(
    idOrCode: string,
  ): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    const coupon = await this.prisma.coupon.findFirst({
      where: {
        OR: [{ id: idOrCode }, { code: idOrCode }],
      },
      select: couponSelect,
    });

    if (!coupon) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_FOUND],
        ERROR_CODES.COUPON_NOT_FOUND,
      );
    }

    return {
      type: 'response',
      message: 'Lấy chi tiết mã giảm giá thành công',
      data: toResponseDto(CouponResponseDto, coupon),
    };
  }

  async updateCoupon({
    id,
    updateDto,
  }: {
    id: string;
    updateDto: UpdateCouponDto;
  }): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    const existing = await this.prisma.coupon.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_FOUND],
        ERROR_CODES.COUPON_NOT_FOUND,
      );
    }

    if (updateDto.code && updateDto.code !== existing.code) {
      const codeTaken = await this.prisma.coupon.findUnique({
        where: { code: updateDto.code },
      });
      if (codeTaken) {
        throw new BusinessException(
          ERROR_MESSAGES[ERROR_CODES.COUPON_ALREADY_EXISTS],
          ERROR_CODES.COUPON_ALREADY_EXISTS,
        );
      }
    }

    const updated = await this.prisma.coupon.update({
      where: { id },
      data: {
        code: updateDto.code,
        type: updateDto.type,
        value: updateDto.value,
        minPurchase: updateDto.minPurchase,
        maxDiscount: updateDto.maxDiscount,
        usageLimit: updateDto.usageLimit,
        startDate: updateDto.startDate ? new Date(updateDto.startDate) : undefined,
        endDate: updateDto.endDate ? new Date(updateDto.endDate) : undefined,
        isActive: updateDto.isActive,
      },
      select: couponSelect,
    });

    return {
      type: 'response',
      message: 'Cập nhật mã giảm giá thành công',
      data: toResponseDto(CouponResponseDto, updated),
    };
  }

  async deleteCoupon(
    id: string,
  ): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    const existing = await this.prisma.coupon.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_FOUND],
        ERROR_CODES.COUPON_NOT_FOUND,
      );
    }

    await this.prisma.coupon.delete({ where: { id } });

    return {
      type: 'response',
      message: 'Xóa mã giảm giá thành công',
      data: toResponseDto(CouponResponseDto, existing),
    };
  }

  async applyCoupon(
    applyDto: ApplyCouponDto,
  ): Promise<IBeforeTransformResponseType<unknown>> {
    if (!applyDto.code) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_FOUND],
        ERROR_CODES.COUPON_NOT_FOUND,
      );
    }

    const coupon = await this.prisma.coupon.findUnique({
      where: { code: applyDto.code },
      select: couponSelect,
    });

    if (!coupon) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_FOUND],
        ERROR_CODES.COUPON_NOT_FOUND,
      );
    }

    if (!coupon.isActive) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_ACTIVE],
        ERROR_CODES.COUPON_NOT_ACTIVE,
      );
    }

    const now = new Date();
    if (now < coupon.startDate) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_NOT_STARTED],
        ERROR_CODES.COUPON_NOT_STARTED,
      );
    }
    if (now > coupon.endDate) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_EXPIRED],
        ERROR_CODES.COUPON_EXPIRED,
      );
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_USAGE_LIMIT_REACHED],
        ERROR_CODES.COUPON_USAGE_LIMIT_REACHED,
      );
    }

    if (
      coupon.minPurchase !== null &&
      applyDto.subtotal &&
      Number(applyDto.subtotal) < Number(coupon.minPurchase)
    ) {
      throw new BusinessException(
        ERROR_MESSAGES[ERROR_CODES.COUPON_MIN_PURCHASE_NOT_MET],
        ERROR_CODES.COUPON_MIN_PURCHASE_NOT_MET,
      );
    }

    // Logic tính toán mức giảm
    let calculatedDiscount = 0;
    const subtotal = Number(applyDto.subtotal || 0);

    if (subtotal > 0) {
      if (coupon.type === CouponType.FIXED) {
        calculatedDiscount = Number(coupon.value);
        if (calculatedDiscount > subtotal) {
          calculatedDiscount = subtotal; // Không giảm quá tổng tiền
        }
      } else if (coupon.type === CouponType.PERCENTAGE) {
        calculatedDiscount = (subtotal * Number(coupon.value)) / 100;
        if (
          coupon.maxDiscount !== null &&
          calculatedDiscount > Number(coupon.maxDiscount)
        ) {
          calculatedDiscount = Number(coupon.maxDiscount);
        }
      }
    }

    return {
      type: 'response',
      message: 'Áp dụng mã giảm giá thành công',
      data: {
        coupon: toResponseDto(CouponResponseDto, coupon),
        calculatedDiscount,
        originalSubtotal: subtotal,
        finalTotal: Math.max(0, subtotal - calculatedDiscount),
      },
    };
  }
}
