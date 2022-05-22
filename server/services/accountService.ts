import fs from 'fs';
import exitHook from 'async-exit-hook';
import { randomUUID } from 'crypto';

import { IAccount } from '../types/account';
import { TransactionType } from '../types/transaction';

class AccountService {
  accounts: IAccount[];

  constructor() {
    this.accounts = [];
  }

  readData() {
    const data = fs.readFileSync('./data/accounts.json');
    this.accounts = JSON.parse(data.toString());
  }

  writeData() {
    const data = JSON.stringify(this.accounts, null, 2);
    fs.writeFileSync('./data/accounts.json', data);
  }

  init() {
    this.readData();
    exitHook(this.writeData.bind(this));
  }

  addAccount(name: string, amount: number): IAccount {
    if (this.accounts.find((account) => account.name === name)) {
      throw {
        status: 409,
        message: `Account with name ${name} already exists`,
      };
    }

    const account: IAccount = {
      id: randomUUID(),
      name,
      amount,
    };
    this.accounts.push(account);
    return account;
  }

  getAccounts(): IAccount[] {
    return this.accounts;
  }

  deleteAccount(id: string): IAccount {
    const accountIndex = this.accounts.findIndex(
      (account) => account.id === id
    );
    if (accountIndex < 0) {
      throw { status: 404, message: 'Account not found' };
    }
    const account = this.accounts[accountIndex];
    this.accounts.splice(accountIndex, 1);
    return account;
  }

  updateAccount(id: string, name: string, amount: number): IAccount {
    const accountIndex = this.accounts.findIndex(
      (account) => account.id === id
    );
    if (accountIndex < 0) {
      throw { status: 404, message: 'Account not found' };
    }

    if (this.accounts.find((account) => account.name === name)) {
      throw {
        status: 409,
        message: `Account with name ${name} already exists`,
      };
    }

    const newAccount = { id, name, amount };
    this.accounts[accountIndex] = newAccount;
    return newAccount;
  }

  processTransaction(
    accountName: string,
    transactionType: TransactionType,
    transactionAmount: number
  ): IAccount {
    const accountIndex = this.accounts.findIndex(
      (account) => account.name === accountName
    );
    if (accountIndex < 0) {
      throw { status: 404, message: 'Account not found' };
    }

    if (transactionType === 'expense') {
      if (this.accounts[accountIndex].amount < transactionAmount) {
        throw {
          status: 409,
          message: `The account ${this.accounts[accountIndex].name} has insufficient funds`,
        };
      }
      this.accounts[accountIndex].amount -= transactionAmount;
    } else {
      this.accounts[accountIndex].amount += transactionAmount;
    }

    return this.accounts[accountIndex];
  }
}

export default new AccountService();
