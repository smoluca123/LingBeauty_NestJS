import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import {
  ApiCreateCoupon,
  ApiGetCoupon,
  ApiUpdateCoupon,
  ApiDeleteCoupon,
  ApiGetCoupons,
  ApiApplyCoupon,
} from './decorators/coupon.decorators';

@ApiTags('Coupon Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @ApiCreateCoupon()
  createCoupon(
    @Body() createCouponDto: CreateCouponDto,
  ): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    return this.couponService.createCoupon(createCouponDto);
  }

  @Get()
  @ApiGetCoupons()
  getAllCoupons(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ): Promise<IBeforeTransformPaginationResponseType<CouponResponseDto>> {
    return this.couponService.getAllCoupons({ page, limit, search });
  }

  @Post('apply')
  @ApiApplyCoupon()
  applyCoupon(
    @Body() applyCouponDto: ApplyCouponDto,
  ): Promise<IBeforeTransformResponseType<unknown>> {
    return this.couponService.applyCoupon(applyCouponDto);
  }

  @Get(':idOrCode')
  @ApiGetCoupon()
  getCoupon(
    @Param('idOrCode') idOrCode: string,
  ): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    return this.couponService.getCoupon(idOrCode);
  }

  @Patch(':id')
  @ApiUpdateCoupon()
  updateCoupon(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    return this.couponService.updateCoupon({ id, updateDto: updateCouponDto });
  }

  @Delete(':id')
  @ApiDeleteCoupon()
  deleteCoupon(
    @Param('id') id: string,
  ): Promise<IBeforeTransformResponseType<CouponResponseDto>> {
    return this.couponService.deleteCoupon(id);
  }
}
