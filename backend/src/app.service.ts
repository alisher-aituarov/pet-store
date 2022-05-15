import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'w'+process.env.NODE_ENV;
  }
}
