import {
  CategoryTransactionEnum,
  PaymentMethodEnum,
  TypeTransactionEnum,
} from '../enums';

export class CreateTransactionDto {
  amount: number;
  userId: string;
  type: TypeTransactionEnum;
  category: CategoryTransactionEnum;
  paymentMethod: PaymentMethodEnum;
}
