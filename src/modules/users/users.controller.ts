import { Response } from 'express';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { User } from 'src/schemas';
import { Public } from 'src/decorators/set.route.as.public';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Public()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const userIdResult = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.CREATED).json({ id: userIdResult });
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
