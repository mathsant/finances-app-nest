import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user: User = await this.userService.findByEmail(email);

    const passwordIsMatch = await bcrypt.compare(pass, user.password);

    if (!passwordIsMatch) throw new UnauthorizedException();

    const payload = { userId: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
