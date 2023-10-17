import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
