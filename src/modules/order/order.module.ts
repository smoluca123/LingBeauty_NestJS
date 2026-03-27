import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { StatsModule } from 'src/modules/stats/stats.module';

@Module({
  imports: [PrismaModule, StatsModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
