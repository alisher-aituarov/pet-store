import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
  BadRequestException,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDTO, SignInUserDTO } from './dto';
import { BadRequestInterceptor } from 'src/interceptors/BadRequestInterceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(BadRequestInterceptor)
  @Post('/sign-up')
  async signUp(@Body() data: CreateUserDTO): Promise<Omit<User, 'password'>> {
    return this.userService.createUser({
      ...data,
      password: await this.userService.hashPassword(data.password),
    });
  }

  @UseInterceptors(BadRequestInterceptor)
  @Post('/sign-in')
  async signIn(
    @Body() { email, password }: SignInUserDTO,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { access_token: this.userService.generateJWT(user) };
  }
}
