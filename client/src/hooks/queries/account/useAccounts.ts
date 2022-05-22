import { useQuery } from 'react-query';
import { getAccounts } from 'service/accountService';

export const useAccounts = () => {
  return useQuery('accounts', getAccounts);
};
