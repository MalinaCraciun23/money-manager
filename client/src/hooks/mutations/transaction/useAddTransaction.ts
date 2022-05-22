import { useMutation, useQueryClient } from 'react-query';
import { addTransaction } from 'service/transactionService';
import { AxiosError } from 'axios';
import { ITransaction } from 'types/transaction/transaction';
import { IAddTransactionReq } from 'types/transaction/addTransactionReq';

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ITransaction,
    AxiosError<{ message?: string }>,
    IAddTransactionReq
  >(addTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    },
  });
};
