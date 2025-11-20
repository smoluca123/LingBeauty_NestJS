import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { StorageModule } from '../storage/storage.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [StorageModule, PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
