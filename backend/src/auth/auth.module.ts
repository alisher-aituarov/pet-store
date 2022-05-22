import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  providers: [AuthService, JwtService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
