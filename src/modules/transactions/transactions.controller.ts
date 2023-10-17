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
    const { userId } = request.user;
    return this.transactionService.create(createTransactionDto, userId);
  }

  @Get('/of-user/:userId')
  findAllByUser(@Req() request: any) {
    const { userId } = request.user;
    return this.transactionService.findAllTransactionsByUser(userId);
  }

  @Get('/between-dates')
  findTransactionBetweenDates(
    @Body() findTransactionsBetweenDatesDto: FindTransactionsBetweenDatesDto,
    @Req() request: any,
  ) {
    const { userId } = request.user;
    const { finalDate, initialDate } = findTransactionsBetweenDatesDto;
    return this.transactionService.findTransactionsBetweenDates(
      initialDate,
      finalDate,
      userId,
    );
  }

  @Get(':id')
  findOneTransaction(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
