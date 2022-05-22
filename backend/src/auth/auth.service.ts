import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync, genSaltSync, hash } from 'bcrypt';
import { JWT_SECRET } from 'config';
import { UserService } from 'src/user/user.service';

const HOUR = 3_600;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  public generateJWT(user: User) {
    const exp = new Date();
    exp.setDate(exp.getDate() + HOUR * 1); // One hour from now

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
    const user = await this.userService.getByEmail(email);
    return (await compareSync(password, user?.password)) ? user : null;
  }

  async hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hash(password, salt);
  }
}
