export interface IAPIInfoType {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  contact: string;
  website: string;
  documentation: string;
  support: string;
}

export interface IDecodedAccecssTokenType {
  userId: string;
  username: string;
  originalToken: string;
  key: string | number;
  iat?: string | number;
  exp?: string | number;
}

export interface IRequestWithDecodedAccessToken extends Request {
  decodedAccessToken: IDecodedAccecssTokenType;
}

export interface IRequestWithDecodedAuthToken extends Request {
  user: IDecodedAuthTokenType;
}

export interface IDecodedAuthTokenType {
  id: string;
  auth_code: string;
  iat?: string | number;
  exp?: string | number;
}

export enum RolesLevel {
  USER = 0,
  MANAGER = 1,
  ADMIN = 2,
}
