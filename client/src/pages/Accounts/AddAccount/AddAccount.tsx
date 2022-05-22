import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddAccount } from 'hooks/mutations/account/useAddAccount';
import { IAddAccountReq } from 'types/account/addAccountReq';

const schema = yup.object({
  name: yup.string().required().min(2, 'Name too short').max(100),
  amount: yup.number().required().positive('Amount must be positive'),
});

export const AddAccount = () => {
  const { error, mutateAsync: addAccount } = useAddAccount();
  const { register, formState, handleSubmit, reset } = useForm<IAddAccountReq>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const handleAddAccount = async (values: IAddAccountReq) => {
    await addAccount(values);
    reset();
  };

  return (
    <form
      className='form-control ml-12'
      onSubmit={handleSubmit(handleAddAccount)}
    >
      <label className='label'>
        <span className='label-text'>Add account:</span>
      </label>
      <label className='flex flex-col border-2 border-primary w-44'>
        <input
          type='text'
          placeholder='Name'
          className='input border-b-2 border-0 border-b-primary rounded-none'
          {...register('name')}
        />
        <input
          type='number'
          placeholder='Amount'
          className='input'
          {...register('amount')}
        />
        <button
          type='submit'
          className='btn btn-primary bg-primary rounded-none'
        >
          Add
        </button>
      </label>
      {formState?.errors?.name && (
        <p className='text-error'>{formState.errors.name.message}</p>
      )}
      {formState?.errors?.amount && (
        <p className='text-error'>{formState.errors.amount.message}</p>
      )}
      {error?.response?.data?.message && (
        <p className='text-error'>{error?.response?.data?.message}</p>
      )}
    </form>
  );
};
