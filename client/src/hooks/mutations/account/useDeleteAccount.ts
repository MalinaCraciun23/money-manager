import { useMutation, useQueryClient } from 'react-query';
import { deleteAccount } from 'service/accountService';

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts');
    },
  });
};
