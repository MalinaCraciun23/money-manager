import { useQuery } from 'react-query';
import { getTransactions } from 'service/transactionService';

export const useTransactions = () => {
  return useQuery('transactions', getTransactions);
};
