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

  async getUser(email: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.dbService.user.findUnique({
      where: email,
    });
  }

  async createUser(data): Promise<Omit<User, 'password'>> {
    const { password, ...keep } = await this.dbService.user.create({
      data: data,
    });
    return keep;
  }

  public generateJWT(user: User) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 3600); // One hour from now

    return this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      {
        privateKey: JWT_SECRET,
      },
    );
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.dbService.user.findUnique({ where: { email } });
    return (await compareSync(password, user?.password)) ? user : null;
  }

  async hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hash(password, salt);
  }
}
