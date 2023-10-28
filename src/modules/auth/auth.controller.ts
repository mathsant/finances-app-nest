import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/set.route.as.public';
import { SignInDto } from './dto/sign.in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    return this.authService.login(email, password);
  }
}
