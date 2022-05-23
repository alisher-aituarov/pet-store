import { Module } from '@nestjs/common';
import { RegionService } from './region.service';

@Module({
  providers: [RegionService],
  exports: [RegionService],
})
export class RegionModule {}
