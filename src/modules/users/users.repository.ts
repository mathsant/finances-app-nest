import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersRepository {
  async findOne(): Promise<User | undefined> {
    return '';
  }
}
