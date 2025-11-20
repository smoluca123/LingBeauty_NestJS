import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { StorageModule } from '../storage/storage.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [StorageModule, PrismaModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
