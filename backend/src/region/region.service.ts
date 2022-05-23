import { Injectable } from '@nestjs/common';
import { Region } from '@prisma/client';
import { DBService } from 'src/db/db.service';
import { CreateRegionDTO } from './dto';

@Injectable()
export class RegionService {
  constructor(private dbService: DBService) {}

  async create(data: CreateRegionDTO): Promise<Region> {
    return await this.dbService.region.create({ data });
  }
}
