import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UploadedFile,
  UseGuards,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import { type IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import {
  IBeforeTransformPaginationResponseType,
  IBeforeTransformResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserByAdminDto } from './dto/update-user-admin.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressResponseDto } from './dto/address-response.dto';
import {
  BanUserBulkDto,
  BanUserBulkResultDto,
  BanUserDto,
} from './dto/ban-user.dto';
import {
  ApiGetMe,
  ApiUpdateMe,
  ApiUpdateUserById,
  ApiUploadAvatar,
  ApiCreateAddress,
  ApiUpdateAddress,
  ApiDeleteAddress,
  ApiGetMyAddresses,
  ApiGetAddressesByUserId,
  ApiAdminDeleteAddress,
  ApiGetAllUsers,
  ApiGetUserById,
  ApiUpdateBanStatus,
  ApiUpdateBanStatusBulk,
} from 'src/modules/user/decorators/user.decorators';
import { normalizePaginationParams } from 'src/libs/utils/utils';

@ApiTags('User Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiGetAllUsers()
  async getAllUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('isActive') isActive?: string,
    @Query('isBanned') isBanned?: string,
    @Query('isVerified') isVerified?: string,
    @Query('sortBy')
    sortBy?: 'createdAt' | 'updatedAt' | 'email' | 'firstName' | 'lastName',
    @Query('order') order?: 'asc' | 'desc',
  ): Promise<IBeforeTransformPaginationResponseType<UserResponseDto>> {
    const { limit: limitNumber, page: pageNumber } = normalizePaginationParams({
      limit,
      page,
    });
    return this.userService.getAllUsers({
      page: pageNumber,
      limit: limitNumber,
      search,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
      isBanned: isBanned !== undefined ? isBanned === 'true' : undefined,
      isVerified: isVerified !== undefined ? isVerified === 'true' : undefined,
      sortBy,
      order,
    });
  }

  @Get('me')
  @ApiGetMe()
  async getMe(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    const userId = decodedAccessToken.userId;
    const result = await this.userService.getMe(userId);

    return result;
  }

  @Post('upload/avatar')
  @ApiUploadAvatar()
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    const userId = decodedAccessToken.userId;
    const result = await this.userService.updateAvatar(userId, file);

    return result;
  }

  @Patch('me')
  @ApiUpdateMe()
  async updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    const userId = decodedAccessToken.userId;
    const result = await this.userService.updateMe(userId, updateUserDto);

    return result;
  }

  @Patch(':id')
  @ApiUpdateUserById()
  async updateUserById(
    @Param('id') targetUserId: string,
    @Body() updateUserDto: UpdateUserByAdminDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    const adminUserId = decodedAccessToken.userId;
    const result = await this.userService.updateUserById(
      adminUserId,
      targetUserId,
      updateUserDto,
    );

    return result;
  }

  @Get('address')
  @ApiGetMyAddresses()
  async getMyAddresses(
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('search') search: string,
  ): Promise<IBeforeTransformPaginationResponseType<AddressResponseDto>> {
    const { limit: limitNumber, page: pageNumber } = normalizePaginationParams({
      limit,
      page,
    });
    const userId = decodedAccessToken.userId;
    const result = await this.userService.getMyAddresses({
      userId,
      limit: limitNumber,
      page: pageNumber,
      search,
    });

    return result;
  }

  @Get(':userId/address')
  @ApiGetAddressesByUserId()
  async getAddressesByUserId(
    @Param('userId') targetUserId: string,
    @Query() limit: number,
    @Query() page: number,
    @Query() search: string,
  ): Promise<IBeforeTransformPaginationResponseType<AddressResponseDto>> {
    const { limit: limitNumber, page: pageNumber } = normalizePaginationParams({
      limit,
      page,
    });
    const result = await this.userService.getAddressesByUserId({
      targetUserId,
      limit: limitNumber,
      page: pageNumber,
      search,
    });

    return result;
  }

  @Post('address')
  @ApiCreateAddress()
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<AddressResponseDto>> {
    const userId = decodedAccessToken.userId;
    const result = await this.userService.createAddress(
      userId,
      createAddressDto,
    );

    return result;
  }

  @Patch('address/:id')
  @ApiUpdateAddress()
  async updateAddress(
    @Param('id') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<AddressResponseDto>> {
    const userId = decodedAccessToken.userId;
    const result = await this.userService.updateAddress(
      userId,
      addressId,
      updateAddressDto,
    );

    return result;
  }

  @Delete('address/:id')
  @ApiDeleteAddress()
  async deleteAddress(
    @Param('id') addressId: string,
    @DecodedAccessToken() decodedAccessToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    const userId = decodedAccessToken.userId;
    const result = await this.userService.deleteAddress({
      userId,
      addressId,
    });

    return result;
  }

  @Delete('admin/address/:id')
  @ApiAdminDeleteAddress()
  async adminDeleteAddress(
    @Param('id') addressId: string,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    const result = await this.userService.deleteAddressById({
      addressId,
    });

    return result;
  }

  @Patch('ban/bulk')
  @ApiUpdateBanStatusBulk()
  async updateBanStatusBulk(
    @Body() banUserBulkDto: BanUserBulkDto,
  ): Promise<IBeforeTransformResponseType<BanUserBulkResultDto>> {
    return this.userService.updateBanStatusBulk(banUserBulkDto.items);
  }

  @Patch(':id/ban')
  @ApiUpdateBanStatus()
  async updateBanStatus(
    @Param('id') targetUserId: string,
    @Body() banUserDto: BanUserDto,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    return this.userService.updateBanStatus(targetUserId, banUserDto.isBanned);
  }

  // NOTE: Parameterized route `:id` must be LAST to avoid shadowing static routes (e.g. address)
  @Get(':id')
  @ApiGetUserById()
  async getUserById(
    @Param('id') targetUserId: string,
  ): Promise<IBeforeTransformResponseType<UserResponseDto>> {
    return this.userService.getUserById(targetUserId);
  }
}
