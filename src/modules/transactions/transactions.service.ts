import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, User } from 'src/schemas';
import { CreateTransactionDto } from './dto';
import { isNil } from 'ramda';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAllTransactionsByUser(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId }).exec();
  }

  async findOne(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionModel
      .findOne({ id: transactionId })
      .exec();

    if (isNil(transaction))
      throw new NotFoundException({ message: 'Transaction not found.' });

    return transaction;
  }

  async create(transactionDto: CreateTransactionDto): Promise<Transaction> {
    const { amount, userId } = transactionDto;

    const userFound = await this.userModel.findOne({ id: userId }).exec();
    if (isNil(userFound))
      throw new NotFoundException({
        message: 'User not found.',
      });

    if (amount <= 0)
      throw new BadRequestException({
        message: 'Amount should be biggiest of zero.',
      });

    userFound.budget -= amount;
    userFound.save();

    const uuidGenerated = uuidv4();

    const transactionCreated = await this.transactionModel.create({
      amount,
      id: uuidGenerated,
      userId,
    });

    return transactionCreated;
  }

  async findTransactionsBetweenDates(initialDate: Date, finalDate: Date) {
    if (isNil(initialDate) || isNil(finalDate))
      throw new BadRequestException({ message: 'Invalid Dates.' });

    return this.transactionModel
      .find({
        createdAt: { $gte: new Date(initialDate), $lte: new Date(finalDate) },
      })
      .exec();
  }
}
