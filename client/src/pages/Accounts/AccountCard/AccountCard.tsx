import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CheckIcon } from 'componets/Icons/CheckIcon';
import { CancelIcon } from 'componets/Icons/CancelIcon';
import { EditIcon } from 'componets/Icons/EditIcon';
import { DeleteIcon } from 'componets/Icons/DeleteIcon';
import { useUpdateAccount } from 'hooks/mutations/account/useUpdateAccount';
import { useDeleteAccount } from 'hooks/mutations/account/useDeleteAccount';
import { IAccount } from 'types/account/account';

interface AccountCardProps {
  account: IAccount;
}

const schema = yup.object({
  name: yup.string().required().min(2, 'Name too short').max(100),
  amount: yup.number().required().positive('Amount must be positive'),
});

export const AccountCard = ({ account }: AccountCardProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { error, mutateAsync: updateAccount } = useUpdateAccount();
  const { mutateAsync: deleteAccount } = useDeleteAccount();

  const { register, formState, handleSubmit } = useForm<IAccount>({
    defaultValues: {
      name: account.name,
      amount: account.amount,
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleUpdateAccount = async (values: IAccount) => {
    if (values.name !== account.name || values.amount !== account.amount) {
      await updateAccount({ ...account, ...values });
      setIsUpdating(false);
    }
  };

  return isUpdating ? (
    <form
      className='card w-72 bg-primary text-primary-content border-4 border-black m-4'
      onSubmit={handleSubmit(handleUpdateAccount)}
    >
      <div className='card-body flex-row justify-between'>
        <div className='flex flex-col justify-center items-center'>
          <input
            type='text'
            placeholder='Account name'
            className='input input-ghost input-sm pr-0 input-primary border-2 border-b-0 border-black rounded-none font-semibold placeholder-black'
            {...register('name')}
          />
          <input
            type='number'
            placeholder='Account amount'
            className='input input-ghost input-sm pr-0 input-primary border-2 border-black rounded-none font-semibold placeholder-black'
            {...register('amount')}
          />
          {formState?.errors?.name && (
            <p className='text-error'>{formState.errors.name.message}</p>
          )}
          {formState?.errors?.amount && (
            <p className='text-error'>{formState.errors.amount.message}</p>
          )}
          {error?.response?.data?.message && (
            <p className='text-error'>{error?.response?.data?.message}</p>
          )}
        </div>
        <div className='card-actions justify-end flex-col'>
          <>
            <button
              type='submit'
              className='btn btn-circle btn-sm bg-primary border-0 text-black hover:text-white'
            >
              <CheckIcon />
            </button>
            <button
              className='btn btn-circle btn-sm bg-primary border-0 text-black hover:text-white'
              onClick={() => setIsUpdating(false)}
            >
              <CancelIcon />
            </button>
          </>
        </div>
      </div>
    </form>
  ) : (
    <div className='card w-72 bg-primary text-primary-content border-4 border-black m-4'>
      <div className='card-body flex-row justify-between'>
        <div className='flex flex-col items-end'>
          <h2 className='card-title ml-4 text-2xl border-black border-b-2'>
            <span>{account.name}</span>
          </h2>
          <h2 className='card-title ml-4 text-2xl'>
            <span>{account.amount} $</span>
          </h2>
        </div>

        <div className='card-actions justify-end flex-col'>
          <>
            <button
              className='btn btn-circle btn-sm bg-primary border-0 text-black hover:text-white'
              onClick={() => setIsUpdating(true)}
            >
              <EditIcon />
            </button>
            <button
              className='btn btn-circle btn-sm bg-primary border-0 text-black hover:text-white'
              onClick={() => deleteAccount(account.id)}
            >
              <DeleteIcon />
            </button>
          </>
        </div>
      </div>
    </div>
  );
};
