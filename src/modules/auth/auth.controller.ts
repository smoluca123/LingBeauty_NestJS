import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { RefreshTokenDto } from 'src/modules/auth/dto/refresh-token.dto';
import { VerifyEmailDto } from 'src/modules/auth/dto/verify-email.dto';
import { VerifyPhoneDto } from 'src/modules/auth/dto/verify-phone.dto';
import { IBeforeTransformResponseType } from 'src/libs/types/interfaces/response.interface';
import { AuthResponseDto } from 'src/modules/auth/dto/response/auth-response.dto';
import { ValidateTokenResponseDto } from 'src/modules/auth/dto/response/validate-token-response.dto';
import { DecodedAccessToken } from 'src/decorators/decodedAccessToken.decorator';
import type { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import {
  ApiRegister,
  ApiLogin,
  ApiRefreshToken,
  ApiSendEmailVerification,
  ApiVerifyEmail,
  ApiResendEmailVerification,
  ApiSendPhoneVerification,
  ApiVerifyPhone,
  ApiValidateToken,
} from './decorators/auth-api.decorators';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiRegister()
  register(
    @Body() registerDto: RegisterDto,
  ): Promise<IBeforeTransformResponseType<AuthResponseDto>> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiLogin()
  login(
    @Body() loginDto: LoginDto,
  ): Promise<IBeforeTransformResponseType<AuthResponseDto>> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @ApiRefreshToken()
  refreshToken(
    @Headers('accessToken') accessToken: string,
  ): Promise<IBeforeTransformResponseType<AuthResponseDto>> {
    return this.authService.refreshToken({
      accessToken,
    });
  }

  @Post('send-email-verification')
  @ApiSendEmailVerification()
  sendEmailVerification(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Req() req: Request,
  ): Promise<IBeforeTransformResponseType<{ message: string; code?: string }>> {
    const metadata = {
      ipAddress: req.ip || req.headers['x-forwarded-for']?.toString(),
      userAgent: req.headers['user-agent'],
    };
    return this.authService.sendEmailVerification(
      decodedToken.userId,
      metadata,
    );
  }

  @Post('verify-email')
  @ApiVerifyEmail()
  verifyEmail(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Body() verifyEmailDto: VerifyEmailDto,
    @Req() req: Request,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    const metadata = {
      ipAddress: req.ip || req.headers['x-forwarded-for']?.toString(),
      userAgent: req.headers['user-agent'],
    };
    return this.authService.verifyEmail(
      decodedToken.userId,
      verifyEmailDto,
      metadata,
    );
  }

  @Post('resend-email-verification')
  @ApiResendEmailVerification()
  resendEmailVerification(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Req() req: Request,
  ): Promise<IBeforeTransformResponseType<{ message: string; code?: string }>> {
    const metadata = {
      ipAddress: req.ip || req.headers['x-forwarded-for']?.toString(),
      userAgent: req.headers['user-agent'],
    };
    return this.authService.resendEmailVerification(
      decodedToken.userId,
      metadata,
    );
  }

  @Post('send-phone-verification')
  @ApiSendPhoneVerification()
  sendPhoneVerification(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<{ message: string; code?: string }>> {
    return this.authService.sendPhoneVerification(decodedToken.userId);
  }

  @Post('verify-phone')
  @ApiVerifyPhone()
  verifyPhone(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
    @Body() verifyPhoneDto: VerifyPhoneDto,
  ): Promise<IBeforeTransformResponseType<{ message: string }>> {
    return this.authService.verifyPhone(decodedToken.userId, verifyPhoneDto);
  }

  @Get('validate-token')
  @ApiValidateToken()
  validateToken(
    @DecodedAccessToken() decodedToken: IDecodedAccecssTokenType,
  ): Promise<IBeforeTransformResponseType<ValidateTokenResponseDto>> {
    return this.authService.validateToken(
      decodedToken.userId,
      decodedToken.exp,
    );
  }
}
