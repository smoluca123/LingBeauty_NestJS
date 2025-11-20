import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCode } from '../constants/error-codes';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: unknown,
  ) {
    super(
      {
        message,
        errorCode,
        details,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}

export class ValidationException extends HttpException {
  constructor(errors: unknown[], details?: unknown) {
    super(
      {
        message: 'Validation failed',
        errorCode: 'VAL_001',
        errors,
        details,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(message: string, errorCode: ErrorCode, details?: unknown) {
    super({
      message,
      errorCode,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, details?: unknown) {
    super(
      {
        message,
        errorCode,
        details,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, details?: unknown) {
    super(
      {
        message,
        errorCode,
        details,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.CONFLICT,
    );
  }
}
