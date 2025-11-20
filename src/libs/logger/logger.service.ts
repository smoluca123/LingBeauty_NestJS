import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(private readonly logger: PinoLogger) {}

  log(message: any, context?: string): void {
    this.logger.info({ context }, message);
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error({ context, trace }, message);
  }

  warn(message: any, context?: string): void {
    this.logger.warn({ context }, message);
  }

  debug(message: any, context?: string): void {
    this.logger.debug({ context }, message);
  }

  verbose(message: any, context?: string): void {
    this.logger.trace({ context }, message);
  }
}

