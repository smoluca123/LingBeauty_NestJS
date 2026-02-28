import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import { IDecodedAccecssTokenType } from 'src/libs/types/interfaces/utils.interfaces';
import {
  CustomUnauthorizedException,
  ForbiddenException,
} from 'src/exceptions/business.exception';
import { ERROR_CODES } from 'src/constants/error-codes';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ShouldSkipIfNoAccessToken } from 'src/decorators/shouldSkipIfNoAccessToken.decorator';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { JwtAuthService } from 'src/modules/jwt/jwt.service';
import { User } from 'prisma/generated/prisma/client';

/**
 * Extended Express Request interface with decoded access token and user data
 */
interface AuthenticatedRequest extends RequestExpress {
  decodedAccessToken?: IDecodedAccecssTokenType;
  userData?: User;
}

/**
 * JWT Token Verify Guard
 * Validates JWT access tokens and ensures the user exists and is active
 */
@Injectable()
export class JwtTokenVerifyGuard implements CanActivate {
  private readonly logger = new Logger(JwtTokenVerifyGuard.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  /**
   * Main guard activation method
   * Extracts and validates the JWT token, then validates the user
   * @param context - Execution context containing request information
   * @returns Promise resolving to true if authentication succeeds
   * @throws UnauthorizedException if token is missing or invalid
   * @throws CustomUnauthorizedException if user is not found or inactive
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const shouldSkipIfNoAccessToken = this.reflector.get<boolean>(
      ShouldSkipIfNoAccessToken,
      context.getHandler(),
    );

    const accessToken = this.extractToken(request);

    if (shouldSkipIfNoAccessToken && !accessToken) {
      return true;
    }

    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    const decodedAccessToken = await this.verifyToken(accessToken);
    decodedAccessToken.originalToken = accessToken;
    request.decodedAccessToken = decodedAccessToken;

    return this.validateUser(decodedAccessToken, request);
  }

  /**
   * Extracts the access token from the request
   * Supports both cookie-based and header-based token extraction
   * @param request - Express request object
   * @returns Extracted token string or null if not found
   */
  private extractToken(request: AuthenticatedRequest): string | null {
    const isCookieMode = this.configService.get('COOKIE_MODE') === 'TRUE';
    let token: string | undefined;

    if (isCookieMode) {
      token = request.cookies?.accessToken as string | undefined;
    } else {
      const headerToken = request.headers['accesstoken'] as string | undefined;
      token = headerToken;
    }

    if (!token) {
      return null;
    }

    // Remove 'Bearer ' prefix if present
    return token.replace(/^Bearer\s+/i, '');
  }

  /**
   * Verifies and decodes the JWT access token
   * @param token - JWT token string to verify
   * @returns Promise resolving to decoded token payload
   * @throws CustomUnauthorizedException if token is invalid or expired
   */
  private async verifyToken(token: string): Promise<IDecodedAccecssTokenType> {
    try {
      const decoded =
        await this.jwtAuthService.verifyToken<IDecodedAccecssTokenType>(token);
      return decoded;
    } catch (error) {
      this.logger.error('Token verification failed', error);
      throw new CustomUnauthorizedException(
        'Invalid access token',
        ERROR_CODES.INVALID_ACCESS_TOKEN,
      );
    }
  }

  /**
   * Validates the user exists, is active, and has required fields
   * @param decodedAccessToken - Decoded JWT token payload
   * @param request - Express request object to attach user data
   * @returns Promise resolving to true if validation succeeds
   * @throws UnauthorizedException if token payload is invalid
   * @throws CustomUnauthorizedException if user is not found or deleted
   * @throws ForbiddenException if user is banned/inactive
   */
  private async validateUser(
    decodedAccessToken: IDecodedAccecssTokenType,
    request: AuthenticatedRequest,
  ): Promise<boolean> {
    if (!decodedAccessToken.userId || !decodedAccessToken.username) {
      throw new UnauthorizedException(
        'Invalid access token or has been modified',
      );
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: decodedAccessToken.userId,
        username: decodedAccessToken.username,
      },
    });

    if (!user || !user.refreshToken) {
      throw new CustomUnauthorizedException(
        'User not found or has been deleted',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    if (user.isBanned) {
      throw new ForbiddenException(
        'User has been banned',
        ERROR_CODES.USER_BANNED,
      );
    }

    request.userData = user;

    // let decodedRefreshToken: any;
    // try {
    //   decodedRefreshToken = this.jwt.verify(user.refreshToken);
    // } catch (error) {
    //   throw new UnauthorizedException('Invalid refresh token');
    // }
    // if (decodedAccessToken.key !== decodedRefreshToken.key) {
    //   throw new UnauthorizedException('Tokens have been leaked');
    // }
    return true;
  }
}
