import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { DBService } from 'src/db/db.service';
import { CreateCategoryDTO } from './dto';

@Injectable()
export class CategoryService {
  constructor(private dbService: DBService) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    return await this.dbService.category.create({ data });
  }
}
