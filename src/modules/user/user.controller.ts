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
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import { type IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { UserResponseDto } from 'src/modules/auth/dto/response/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserByAdminDto } from './dto/update-user-admin.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressResponseDto } from './dto/address-response.dto';
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
} from 'src/modules/user/decorators/user.decorators';

@ApiTags('User Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  ): Promise<IBeforeTransformResponseType<AddressResponseDto[]>> {
    const userId = decodedAccessToken.userId;
    const result = await this.userService.getMyAddresses(userId);

    return result;
  }

  @Get(':userId/address')
  @ApiGetAddressesByUserId()
  async getAddressesByUserId(
    @Param('userId') targetUserId: string,
  ): Promise<IBeforeTransformResponseType<AddressResponseDto[]>> {
    const result = await this.userService.getAddressesByUserId(targetUserId);

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
    const result = await this.userService.deleteAddress(userId, addressId);

    return result;
  }
}
