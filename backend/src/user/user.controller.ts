import {
  Post,
  Body,
  Controller,
  BadRequestException,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { BadRequestInterceptor } from 'src/interceptors/BadRequestInterceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
