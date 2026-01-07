import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductStatsService } from './product-stats.service';
import { ProductController } from './product.controller';
import { PublicProductController } from './product-public.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { StorageModule } from 'src/modules/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [ProductController, PublicProductController],
  providers: [ProductService, ProductStatsService],
  exports: [ProductService, ProductStatsService],
})
export class ProductModule {}
