import fs from 'fs';
import exitHook from 'async-exit-hook';
import { randomUUID } from 'crypto';

import accountService from './accountService';

import { ITransaction, TransactionType } from '../types/transaction';
import categoryService from './categoryService';

class TransactionService {
  transactions: ITransaction[];

  constructor() {
    this.transactions = [];
  }

  readData() {
    const data = fs.readFileSync('./data/transactions.json');
    this.transactions = JSON.parse(data.toString());
  }

  writeData() {
    const data = JSON.stringify(this.transactions, null, 2);
    fs.writeFileSync('./data/transactions.json', data);
  }

  init() {
    this.readData();
    exitHook(this.writeData.bind(this));
  }

  addTransaction(
    type: TransactionType,
    account: string,
    category: string,
    amount: number
  ): ITransaction {
    categoryService.requireCategory(category);
    accountService.processTransaction(account, type, amount);
    const transaction: ITransaction = {
      id: randomUUID(),
      type,
      account,
      category,
      amount,
      date: new Date(),
    };
    this.transactions.push(transaction);
    return transaction;
  }

  getTransactions(): ITransaction[] {
    return this.transactions;
  }
}

export default new TransactionService();
