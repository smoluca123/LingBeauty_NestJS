import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PinoLogger } from 'nestjs-pino';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, body, query, params, headers } = request;
    const startTime = Date.now();

    // Log request
    this.logger.info(
      {
        method,
        url,
        query,
        params,
        body: this.sanitizeBody(body),
        userAgent: headers['user-agent'],
        ip: request.ip || request.socket.remoteAddress,
      },
      `Incoming ${method} ${url}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          const { statusCode } = response;

          // Log response
          this.logger.info(
            {
              method,
              url,
              statusCode,
              duration: `${duration}ms`,
            },
            `Outgoing ${method} ${url} ${statusCode} - ${duration}ms`,
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const { statusCode } = response;

          this.logger.error(
            {
              method,
              url,
              statusCode,
              duration: `${duration}ms`,
              error: {
                message: error.message,
                stack: error.stack,
              },
            },
            `Error ${method} ${url} ${statusCode} - ${duration}ms`,
          );
        },
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body || typeof body !== 'object') {
      return body;
    }

    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'secret', 'authorization'];

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}

