import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  // Export StatsService so other modules (AuthModule, UserModule, etc.) can inject it
  exports: [StatsService],
})
export class StatsModule {}
