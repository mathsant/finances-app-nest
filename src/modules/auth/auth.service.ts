import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) throw new UnauthorizedException();

    const payload = { sub: user.userId, username: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
