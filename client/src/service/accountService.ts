import axios from 'axios';
import { IAccount } from 'types/account/account';
import { IAddAccountReq } from 'types/account/addAccountReq';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/account',
});

export const getAccounts = async () => {
  const { data } = await axiosInstance.get<IAccount[]>('/');

  return data;
};

export const addAccount = async (accountReq: IAddAccountReq) => {
  const { data } = await axiosInstance.post<IAccount>('/', accountReq);
  return data;
};

export const deleteAccount = async (id: string) => {
  const { data } = await axiosInstance.delete<IAccount>(`/${id}`);
  return data;
};

export const updateAccount = async ({ id, name, amount }: IAccount) => {
  const { data } = await axiosInstance.put<IAccount>(`/${id}`, {
    name,
    amount,
  });
  return data;
};
