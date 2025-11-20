import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isDevelopment =
          configService.get<string>('NODE_ENV') !== 'production';
        const logLevel = configService.get<string>('LOG_LEVEL') || 'info';

        return {
          pinoHttp: {
            level: logLevel,
            transport: isDevelopment
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    singleLine: false,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                  },
                }
              : undefined,
            serializers: {
              req: (req: any) => ({
                id: req.id,
                method: req.method,
                url: req.url,
                headers: {
                  host: req.headers?.host,
                  'user-agent': req.headers?.['user-agent'],
                  'content-type': req.headers?.['content-type'],
                },
                remoteAddress: req.remoteAddress,
                remotePort: req.remotePort,
              }),
              res: (res: any) => ({
                statusCode: res.statusCode,
              }),
              err: (err: any) => ({
                type: err.type,
                message: err.message,
                stack: err.stack,
              }),
            },
            customProps: (req: any) => ({
              context: 'HTTP',
            }),
            autoLogging: {
              ignore: (req: any) => {
                // Ignore health check endpoints
                return req.url === '/health' || req.url === '/';
              },
            },
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}

