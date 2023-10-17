import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URL } from './config/variables.env';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TransactionsModule,
    MongooseModule.forRoot(DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
