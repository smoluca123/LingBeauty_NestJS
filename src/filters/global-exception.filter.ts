import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { ERROR_CODES } from '../constants/error-codes';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(GlobalExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let errorCode: string;
    let details: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'object' && errorResponse !== null) {
        const errorObj = errorResponse as Record<string, unknown>;
        message = (errorObj.message as string) || exception.message;
        errorCode = (errorObj.errorCode as string) || 'HTTP_ERROR';
        details = errorObj.details;
      } else {
        message = String(errorResponse);
        errorCode = 'HTTP_ERROR';
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      // Handle Prisma errors
      const prismaError = this.handlePrismaError(exception);
      status = prismaError.status;
      message = prismaError.message;
      errorCode = prismaError.errorCode as string;
    } else {
      // Unknown errors
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;

      // Log unknown errors for debugging
      this.logger.error(
        {
          error: {
            message: String(exception),
            stack: exception instanceof Error ? exception.stack : undefined,
          },
        },
        `Unhandled exception: ${String(exception)}`,
      );
    }

    const errorResponse = {
      success: false,
      statusCode: status,
      errorCode,
      message,
      details,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    // Log error for monitoring
    this.logger.error(
      {
        ...errorResponse,
        method: request.method,
        url: request.url,
        statusCode: status,
      },
      `${request.method} ${request.url} - ${status} - ${message}`,
    );

    response.status(status).json(errorResponse);
  }

  private handlePrismaError(error: PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          message: 'Unique constraint violation',
          errorCode: 'DB_001',
        };
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Record not found',
          errorCode: 'DB_002',
        };
      case 'P2003':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Foreign key constraint violation',
          errorCode: 'DB_003',
        };
      case 'P2014':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid ID provided',
          errorCode: 'DB_004',
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Database error',
          errorCode: ERROR_CODES.DATABASE_ERROR,
        };
    }
  }
}
