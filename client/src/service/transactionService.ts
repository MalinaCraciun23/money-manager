import axios from 'axios';
import { ITransaction } from 'types/transaction/transaction';
import { IAddTransactionReq } from 'types/transaction/addTransactionReq';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/transaction',
});

export const getTransactions = async () => {
  const { data } = await axiosInstance.get<ITransaction[]>('/');

  return data;
};

export const addTransaction = async (transactionReq: IAddTransactionReq) => {
  const { data } = await axiosInstance.post<ITransaction>('/', transactionReq);
  return data;
};
