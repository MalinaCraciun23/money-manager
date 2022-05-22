import { TransactionType } from './transaction';

export interface IAddTransactionReq {
  type: TransactionType;
  account: string;
  category: string;
  amount: number;
}
