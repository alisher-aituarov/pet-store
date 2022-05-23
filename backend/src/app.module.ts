import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ConsoleService } from './console/console.service';
import { DBModule } from './db/db.module';
import { RegionModule } from './region/region.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConsoleModule,
    RegionModule,
    CategoryModule,
    UserModule,
    DBModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConsoleService],
  exports: [ConsoleService],
})
export class AppModule {}
