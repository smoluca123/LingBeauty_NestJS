import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PinoLogger } from 'nestjs-pino';
import { PrismaClient } from 'prisma/generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: PinoLogger) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({
      adapter,
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });

    // Log database queries in development
    if (process.env.NODE_ENV === 'development') {
      this.$on('query' as never, (e: any) => {
        this.logger.debug(
          {
            query: e.query,
            params: e.params,
            duration: `${e.duration}ms`,
          },
          'Database query executed',
        );
      });
    }

    // Log database errors
    this.$on('error' as never, (e: any) => {
      this.logger.error(
        {
          error: e,
        },
        'Database error occurred',
      );
    });

    // Log database info and warnings
    this.$on('info' as never, (e: any) => {
      this.logger.info(
        {
          message: e.message,
        },
        'Database info',
      );
    });

    this.$on('warn' as never, (e: any) => {
      this.logger.warn(
        {
          message: e.message,
        },
        'Database warning',
      );
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.info('Database connection established');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.info('Database connection closed');
  }
}
