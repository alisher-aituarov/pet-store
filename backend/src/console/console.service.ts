import { Command, Console, createSpinner } from 'nestjs-console';
import { CategoryService } from 'src/category/category.service';
import { RegionService } from 'src/region/region.service';
import { RegionJsonDTO } from './dto';
const path = require('path');
const fs = require('fs');

@Console()
export class ConsoleService {
  constructor(
    private regionService: RegionService,
    private categoryService: CategoryService,
  ) {}

  private async readFile<T>(filePath: string): Promise<T[]> {
    const data = await fs.readFileSync(path.join(process.cwd(), filePath));
    return await JSON.parse(data.toString());
  }

  private dbWriter(fn) {
    return function enhanced(arr: any[], parentId: number = null) {
      arr.forEach(async (current) => {
        const record = await fn({
          name: current.name,
          slug: current.slug,
          parentId,
        });
        if (current.children) {
          enhanced(current.children, record.id);
        }
      });
    };
  }

  @Command({
    command: 'import:regions',
    description: 'Fill database with regions',
  })
  async importRegions(): Promise<void> {
    const spin = createSpinner();
    spin.start(`Loading Regions`);

    const writer = this.dbWriter((d) => this.regionService.create(d));

    try {
      const regions = await this.readFile<RegionJsonDTO>(
        'static/data/regions.data.json',
      );
      writer(regions);
      spin.succeed('Import finished');
    } catch (error) {
      spin.fail(error.message);
    }
  }

  @Command({
    command: 'import:categories',
    description: 'Fill database with categories',
  })
  async importCategories(): Promise<void> {
    const spin = createSpinner();
    spin.start(`Loading categories`);

    const writer = this.dbWriter((d) => this.categoryService.create(d));

    try {
      const regions = await this.readFile<RegionJsonDTO>(
        'static/data/categories.data.json',
      );
      writer(regions);
      spin.succeed('Import finished');
    } catch (error) {
      spin.fail(error.message);
    }
  }
}
