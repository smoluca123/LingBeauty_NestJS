import { Module } from '@nestjs/common';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';

/**
 * Provinces Module
 * Provides Vietnamese administrative division data (provinces, districts, wards)
 * Serves static JSON data with in-memory caching
 */
@Module({
  controllers: [ProvincesController],
  providers: [ProvincesService],
  exports: [ProvincesService], // Export service in case other modules need it
})
export class ProvincesModule {}
