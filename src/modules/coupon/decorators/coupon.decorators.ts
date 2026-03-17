import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  ApiPublicOperation,
  ApiRoleProtectedOperation,
} from 'src/decorators/api.decorators';
import { RolesLevel } from 'src/libs/types/interfaces/utils.interfaces';
import { CouponResponseDto } from '../dto/coupon-response.dto';

export const ApiCreateCoupon = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Create a new coupon',
      description: 'Manager-only. Create a new discount code.',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 201,
      type: CouponResponseDto,
    }),
  );

export const ApiGetCoupons = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get list of coupons',
      description: 'Retrieve paginated coupons, optional search by code',
    }),
    ApiResponse({
      status: 200,
      type: CouponResponseDto,
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      default: 1,
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      default: 10,
    }),
    ApiQuery({
      name: 'search',
      type: String,
      required: false,
    }),
  );

export const ApiGetCoupon = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Get single coupon details',
    }),
    ApiResponse({
      status: 200,
      type: CouponResponseDto,
    }),
  );

export const ApiUpdateCoupon = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Update coupon details',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 200,
      type: CouponResponseDto,
    }),
  );

export const ApiDeleteCoupon = () =>
  applyDecorators(
    ApiRoleProtectedOperation({
      summary: 'Delete a coupon',
      roles: [RolesLevel.MANAGER],
    }),
    ApiResponse({
      status: 200,
      description: 'Coupon deleted successfully',
      type: CouponResponseDto,
    }),
  );

export const ApiApplyCoupon = () =>
  applyDecorators(
    ApiPublicOperation({
      summary: 'Check if a coupon is valid',
      description: 'Check a coupon applicability for current cart or subtotal',
    }),
    ApiResponse({
      status: 200,
      type: CouponResponseDto,
    }),
  );
