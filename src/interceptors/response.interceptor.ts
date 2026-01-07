/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IResponseType,
  IPaginationResponseType,
  IBeforeTransformResponseType,
  IBeforeTransformPaginationResponseType,
} from 'src/libs/types/interfaces/response.interface';
import { serializeForResponse } from 'src/libs/utils/transform.utils';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const defaultStatusCode = request.method === 'POST' ? 201 : 200;

    return next.handle().pipe(
      map((data: any) => {
        // Serialize Prisma types (BigInt, Decimal, Date) and other non-serializable values
        const safeData = serializeForResponse(data);

        // Check if data is IBeforeTransformResponseType (from service)
        if (this.isBeforeTransformResponse(safeData)) {
          const statusCode = safeData.statusCode || defaultStatusCode;
          // Set HTTP status code
          response.status(statusCode);

          // Format to IResponseType
          return {
            message: safeData.message,
            data: safeData.data,
            statusCode,
            date: new Date(),
          };
        }

        // Check if data is IBeforeTransformPaginationResponseType (from service)
        if (this.isBeforeTransformPaginationResponse(safeData)) {
          const statusCode = safeData.statusCode || defaultStatusCode;
          // Set HTTP status code
          response.status(statusCode);

          // Format to IPaginationResponseType
          const { items, totalCount, currentPage, pageSize } = safeData.data;
          const totalPage = Math.ceil(totalCount / pageSize);
          const hasNextPage = currentPage < totalPage;
          const hasPreviousPage = currentPage > 1;

          return {
            message: safeData.message || 'Success',
            data: {
              totalCount,
              totalPage,
              currentPage,
              pageSize,
              hasNextPage,
              hasPreviousPage,
              items,
            },
            statusCode,
            date: new Date(),
          };
        }

        // If data is already formatted as IResponseType or IPaginationResponseType, return as is
        if (this.isFormattedResponse(safeData)) {
          // Set HTTP status code if present
          if (safeData.statusCode) {
            response.status(safeData.statusCode);
          }
          return safeData;
        }

        if (this.isPaginatedData(safeData)) {
          return this.formatPaginatedResponse(safeData);
        }

        return this.formatResponse(safeData);
      }),
    );
  }

  private isBeforeTransformResponse(
    data: any,
  ): data is IBeforeTransformResponseType<any> {
    return (
      data &&
      typeof data === 'object' &&
      data.type === 'response' &&
      'message' in data &&
      'data' in data
    );
  }

  private isBeforeTransformPaginationResponse(
    data: any,
  ): data is IBeforeTransformPaginationResponseType<any> {
    return (
      data &&
      typeof data === 'object' &&
      data.type === 'pagination' &&
      'data' in data &&
      data.data &&
      typeof data.data === 'object' &&
      'items' in data.data &&
      'totalCount' in data.data &&
      'currentPage' in data.data &&
      'pageSize' in data.data
    );
  }

  private isFormattedResponse(data: IResponseType<any>): boolean {
    return (
      data &&
      typeof data === 'object' &&
      'message' in data &&
      'data' in data &&
      'statusCode' in data &&
      'date' in data
    );
  }

  private isPaginatedData(data: any): boolean {
    return (
      data.type === 'pagination' ||
      (data &&
        data.data &&
        typeof data === 'object' &&
        'items' in data.data &&
        'totalCount' in data.data &&
        'currentPage' in data.data &&
        'pageSize' in data.data)
    );
  }

  private formatResponse<T>({
    data,
    message,
    statusCode,
  }: {
    data: T;
    message?: string;
    statusCode?: number;
  }): IResponseType<T> {
    return {
      message: message || 'Success',
      data,
      statusCode: statusCode || 200,
      date: new Date(),
    };
  }

  private formatPaginatedResponse<T>({
    data,
    message,
    statusCode,
  }: {
    data: {
      items: T[];
      totalCount: number;
      currentPage: number;
      pageSize: number;
    };
    message?: string;
    statusCode?: number;
  }): IPaginationResponseType<T> {
    const { items, totalCount, currentPage, pageSize } = data;
    const totalPage = Math.ceil(totalCount / pageSize);
    const hasNextPage = currentPage < totalPage;
    const hasPreviousPage = currentPage > 1;

    return {
      message: message || 'Success',
      data: {
        totalCount,
        totalPage,
        currentPage,
        pageSize,
        hasNextPage,
        hasPreviousPage,
        items,
      },
      statusCode: statusCode || 200,
      date: new Date(),
    };
  }
}
