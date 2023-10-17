import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateTransactionDto, FindTransactionsBetweenDatesDto } from './dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request: any,
  ) {
    const token = request.user;
    return this.transactionService.create({
      amount: createTransactionDto.amount,
      userId: token.userId,
    });
  }

  @Get('/of-user/:userId')
  findAllByUser(@Req() request: any) {
    const { userId } = request.user;
    return this.transactionService.findAllTransactionsByUser(userId);
  }

  @Get('/between-dates')
  findTransactionBetweenDates(
    @Body() findTransactionsBetweenDatesDto: FindTransactionsBetweenDatesDto,
  ) {
    const { finalDate, initialDate } = findTransactionsBetweenDatesDto;
    return this.transactionService.findTransactionsBetweenDates(
      initialDate,
      finalDate,
    );
  }

  @Get(':id')
  findOneTransaction(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
