import { useMutation, useQueryClient } from 'react-query';
import { addAccount } from 'service/accountService';
import { AxiosError } from 'axios';
import { IAccount } from 'types/account/account';
import { IAddAccountReq } from 'types/account/addAccountReq';

export const useAddAccount = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAccount,
    AxiosError<{ message?: string }>,
    IAddAccountReq
  >(addAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts');
    },
  });
};
