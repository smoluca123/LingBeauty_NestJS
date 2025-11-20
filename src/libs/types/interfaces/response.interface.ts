import { Decimal } from '@prisma/client/runtime/client';

export interface IBeforeTransformResponseType<T> {
  type: 'response';
  message: string;
  data: T;
  statusCode?: number;
  // date: Date;
}

export interface IBeforeTransformPaginationResponseType<T> {
  type: 'pagination';
  message?: string;
  data: {
    items: T[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
  };
  statusCode?: number;
}

export interface IResponseType<ResultDataType = null> {
  message: string;
  data: ResultDataType;
  statusCode: number;
  date: Date;
}

export interface IBaseResponseAIType {
  price: string;
  priceNum: number;
  currentCredits: Decimal;
}

export interface IPaginationResponseType<ResultDataType = any> {
  message: string;
  data: {
    items: ResultDataType[];
    totalCount: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  statusCode: number;
  date: Date;
}
