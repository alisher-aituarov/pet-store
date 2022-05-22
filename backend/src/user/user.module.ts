import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [],
})
export class UserModule implements NestModule {
  public configure() {}
}
