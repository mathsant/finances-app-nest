import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema, User, UserSchema } from 'src/schemas';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class TransactionsModule {}
