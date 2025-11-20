/**
 * JWT Payload interface for token generation
 */
export interface JwtPayload {
  userId: string;
  username: string;
  key?: string;
  [key: string]: unknown;
}

/**
 * Token pair containing both access and refresh tokens
 */
export interface JwtTokenPair {
  accessToken: string;
  refreshToken: string;
}

