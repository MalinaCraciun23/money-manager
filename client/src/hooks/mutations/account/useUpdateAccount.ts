import { useMutation, useQueryClient } from 'react-query';
import { updateAccount } from 'service/accountService';
import { AxiosError } from 'axios';
import { IAccount } from 'types/account/account';

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation<IAccount, AxiosError<{ message?: string }>, IAccount>(
    updateAccount,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('accounts');
      },
    }
  );
};
