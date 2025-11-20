import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtTokenPair } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Generate an access token with the provided payload
   * @param payload - JWT payload data
   * @param options - Optional JWT sign options
   * @returns Promise resolving to the signed access token
   */
  async generateAccessToken(
    payload: JwtPayload,
    options?: JwtSignOptions,
  ): Promise<string> {
    const defaultExpiresIn = this.config.get<string>('JWT_EXPIRES_IN') || '1h';
    const signOptions: JwtSignOptions = {
      ...options,
      expiresIn: (options?.expiresIn ??
        defaultExpiresIn) as JwtSignOptions['expiresIn'],
    };

    return this.jwt.signAsync(payload, signOptions);
  }

  /**
   * Generate a refresh token with the provided payload
   * @param payload - JWT payload data
   * @param options - Optional JWT sign options
   * @returns Promise resolving to the signed refresh token
   */
  async generateRefreshToken(
    payload: JwtPayload,
    options?: JwtSignOptions,
  ): Promise<string> {
    const defaultExpiresIn =
      this.config.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN') || '7d';
    const signOptions: JwtSignOptions = {
      ...options,
      expiresIn: (options?.expiresIn ??
        defaultExpiresIn) as JwtSignOptions['expiresIn'],
    };

    return this.jwt.signAsync(payload, signOptions);
  }

  /**
   * Generate both access and refresh tokens as a pair
   * @param payload - JWT payload data
   * @param options - Optional JWT sign options
   * @returns Promise resolving to token pair
   */
  async generateTokenPair(
    payload: JwtPayload,
    options?: JwtSignOptions,
  ): Promise<JwtTokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload, options),
      this.generateRefreshToken(payload, options),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Verify and decode a JWT token
   * @param token - JWT token string to verify
   * @returns Promise resolving to the decoded payload
   * @throws Error if token is invalid or expired
   */
  async verifyToken<T extends object = JwtPayload>(
    token: string,
    options?: JwtVerifyOptions,
  ): Promise<T> {
    return this.jwt.verifyAsync<T>(token, options);
  }

  /**
   * Decode a JWT token without verification
   * @param token - JWT token string to decode
   * @returns Decoded payload or null if invalid
   */
  decodeToken<T = JwtPayload>(token: string): T | null {
    try {
      return this.jwt.decode(token) as T;
    } catch {
      return null;
    }
  }

  /**
   * Low-level method to generate JWT with custom options
   * @param payload - JWT payload data
   * @param options - JWT sign options
   * @returns Promise resolving to the signed token
   */
  async signAsync(
    payload: JwtPayload,
    options?: JwtSignOptions,
  ): Promise<string> {
    return this.jwt.signAsync(payload, options);
  }
}
