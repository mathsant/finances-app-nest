import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto';
import { User } from 'src/schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'ramda';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<string> {
    const { password, budget } = user;

    const newUuid = uuid();

    const hashPass = await bcrypt.hash(password, 10);

    const budgetOfUser = isEmpty(budget) ? 0 : budget;

    const userCreated = await this.userModel.create({
      ...user,
      password: hashPass,
      budget: budgetOfUser,
      id: newUuid,
    });

    return userCreated.id;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
