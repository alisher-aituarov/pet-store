import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { BadRequestInterceptor } from 'src/interceptors/BadRequestInterceptor';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDTO, SignInUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseInterceptors(BadRequestInterceptor)
  @Post('/sign-up')
  async signUp(@Body() data: CreateUserDTO): Promise<Omit<User, 'password'>> {
    return this.userService.createUser({
      ...data,
      password: await this.authService.hashPassword(data.password),
    });
  }

  @UseInterceptors(BadRequestInterceptor)
  @Post('/sign-in')
  async signIn(
    @Body() { email, password }: SignInUserDTO,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { access_token: this.authService.generateJWT(user) };
  }
}
