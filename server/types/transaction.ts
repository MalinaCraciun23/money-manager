export type TransactionType = 'expense' | 'income';

export interface ITransaction {
  id: string;
  type: TransactionType;
  account: string;
  category: string;
  amount: number;
  date: Date;
}
