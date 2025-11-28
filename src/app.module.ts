import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/configs/configuration';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LoggerModule } from 'src/libs/logger/logger.module';
import { GlobalExceptionFilter } from 'src/filters/global-exception.filter';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { JwtAuthModule } from 'src/modules/jwt/jwt.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { SystemModule } from 'src/modules/system/system.module';
import { StorageModule } from 'src/modules/storage/storage.module';
import { UserModule } from 'src/modules/user/user.module';
import { ProductModule } from 'src/modules/product/product.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { BrandModule } from 'src/modules/brand/brand.module';
import { ReviewModule } from 'src/modules/review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule,
    PrismaModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const baseConfig: any = {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          username: configService.get('REDIS_USERNAME'),
          db: 0,
        };

        // Cấu hình TLS với SNI nếu được bật
        if (configService.get('REDIS_TLS_ENABLED')) {
          baseConfig.tls = {
            servername:
              configService.get('REDIS_SNI') || configService.get('REDIS_HOST'),
          };
        }

        return {
          config: baseConfig,
        };
      },
    }),
    JwtAuthModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    BrandModule,
    ReviewModule,
    StorageModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
