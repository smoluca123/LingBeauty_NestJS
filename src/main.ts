import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import {
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { configData } from 'src/configs/configuration';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: '*',
  });

  const configDocument = new DocumentBuilder()
    .setTitle('Social Media API')
    .setDescription('New Social Media API')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  // Use Global Pipes to validate incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Use ClassSerializerInterceptor to automatically serialize response DTOs
  // This will exclude fields marked with @Exclude() decorator
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(),
  );

  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup('/swagger', app, document);

  const logger = await app.resolve(PinoLogger);
  logger.setContext('Bootstrap');

  await app.listen(configData.SERVER_PORT ?? 3000);
  logger.info(
    `Application is running on: http://localhost:${configData.SERVER_PORT ?? 3000}`,
  );
}
bootstrap().catch((error) => {
  // Use console.error as fallback since logger might not be initialized
  console.error('Failed to start application:', error);
  process.exit(1);
});
