import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DBService } from 'src/db/db.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [DBService, UserService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure() {}
}
