import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, Prisma } from '@prisma/client';
import { compare, compareSync, genSaltSync, hash } from 'bcrypt';
import { JWT_SECRET } from 'config';
import { DBService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DBService, private jwtService: JwtService) {}

  async getByEmail(email: string): Promise<User | null> {
    return this.dbService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data): Promise<Omit<User, 'password'>> {
    const { password, ...keep } = await this.dbService.user.create({
      data: data,
    });
    return keep;
  }
}
