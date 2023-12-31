import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CategoryTransactionEnum } from 'src/modules/transactions/enums';
import { PaymentMethodEnum } from 'src/modules/transactions/enums/payment.method.enum';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false, default: CategoryTransactionEnum.OTHER })
  category: string;

  @Prop({ required: false, default: PaymentMethodEnum.OTHER })
  paymentMethod: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: false })
  deleted: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
