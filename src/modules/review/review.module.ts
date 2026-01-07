import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { StorageModule } from 'src/modules/storage/storage.module';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
  imports: [PrismaModule, StorageModule, ProductModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
