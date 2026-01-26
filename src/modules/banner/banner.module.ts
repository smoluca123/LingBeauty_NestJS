import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { BannerPublicController } from './banner-public.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { StorageModule } from 'src/modules/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [BannerController, BannerPublicController],
  providers: [BannerService],
  exports: [BannerService],
})
export class BannerModule {}
