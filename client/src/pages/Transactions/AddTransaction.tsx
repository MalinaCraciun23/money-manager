import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'componets/Layout/Layout';
import { Loader } from 'componets/Loader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAccounts } from 'hooks/queries/account/useAccounts';
import { useCategories } from 'hooks/queries/category/useCategories';
import { useAddTransaction } from 'hooks/mutations/transaction/useAddTransaction';
import { TransactionType } from 'types/transaction/transaction';
import { IAddTransactionReq } from 'types/transaction/addTransactionReq';

const schema = yup.object({
  account: yup.string().required(),
  category: yup.string().required(),
  amount: yup.number().required().positive('Amount must be positive'),
});

export const AddTransaction = () => {
  const navigate = useNavigate();

  const { isLoading: isAccountsLoading, data: accounts } = useAccounts();
  const { isLoading: isCategoriesLoading, data: categories } = useCategories();

  const [type, setType] = useState<TransactionType>('expense');

  const { error, mutateAsync: addTransaction } = useAddTransaction();
  const { register, formState, handleSubmit } = useForm<IAddTransactionReq>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const handleAddTransaction = async (values: IAddTransactionReq) => {
    await addTransaction({
      ...values,
      type,
    });
    navigate('/transactions');
  };

  if (isAccountsLoading || isCategoriesLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <h1 className='flex justify-center items-center text-4xl font-bold mb-16'>
        Add Transaction
      </h1>
      <div className='flex justify-center items-center'>
        <form
          className='form-control text-xl bg-base-100 shadow-l shadow-base-100 border-r-1'
          onSubmit={handleSubmit(handleAddTransaction)}
        >
          {error?.response?.data?.message && (
            <p className='text-error'>{error?.response?.data?.message}</p>
          )}
          <label className='label'>
            <span>Expense</span>
            <input
              type='checkbox'
              className='toggle toggle-primary bg-primary'
              checked={type === 'income'}
              onChange={(e) => setType(e.target.checked ? 'income' : 'expense')}
            />
            <span>Income</span>
          </label>
          {formState?.errors?.type && (
            <p className='text-error'>{formState.errors.type.message}</p>
          )}
          <label className='label'>
            <span>Account:</span>
            <select
              className='select select-primary w-56 ml-3 box-border'
              defaultValue={''}
              {...register('account')}
            >
              {accounts?.map((account) => (
                <option value={account.name}>{account.name}</option>
              ))}
            </select>
          </label>
          {formState?.errors?.account && (
            <p className='text-error'>{formState.errors.account.message}</p>
          )}
          <label className='label'>
            <span>Category:</span>
            <select
              className='select select-primary w-56 ml-3 box-border'
              defaultValue={''}
              {...register('category')}
            >
              {categories
                ?.filter((category) => category.type === type)
                .map((category) => (
                  <option value={category.name}>{category.name}</option>
                ))}
            </select>
          </label>
          {formState?.errors?.category && (
            <p className='text-error'>{formState.errors.category.message}</p>
          )}
          <label className='label'>
            <span>Amount:</span>
            <input
              type='number'
              className='input input-bordered input-primary w-56 ml-3 box-border'
              {...register('amount')}
            />
          </label>
          {formState?.errors?.amount && (
            <p className='text-error'>{formState.errors.amount.message}</p>
          )}

          <button type='submit' className='btn btn-primary mt-3'>
            Add
          </button>
        </form>
      </div>
    </Layout>
  );
};
