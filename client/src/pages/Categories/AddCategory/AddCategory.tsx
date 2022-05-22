import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddCategory } from 'hooks/mutations/category/useAddCategory';
import { CategoryType } from 'types/category/category';
import { IAddCategoryReq } from 'types/category/addCategoryReq';

interface AddCategoryProps {
  type: CategoryType;
}

const schema = yup.object({
  name: yup.string().required().min(2, 'Name too short').max(100),
});

export const AddCategory = ({ type }: AddCategoryProps) => {
  const { error, mutateAsync: addCategory } = useAddCategory();

  const { register, formState, handleSubmit, reset } = useForm<IAddCategoryReq>(
    {
      defaultValues: {
        name: '',
      },
      resolver: yupResolver(schema),
      mode: 'onSubmit',
    }
  );

  const handleAddCategory = async (values: IAddCategoryReq) => {
    await addCategory({ ...values, type });
    reset();
  };

  return (
    <form
      className='form-control ml-12'
      onSubmit={handleSubmit(handleAddCategory)}
    >
      <label className='label'>
        <span className='label-text'>Add category:</span>
      </label>
      <label className='input-group'>
        <input
          type='text'
          placeholder='Category name'
          className='input input-bordered input-primary'
          {...register('name')}
        />
        <button type='submit' className='btn  btn-primary'>
          Add
        </button>
      </label>
      {formState?.errors?.name && (
        <p className='text-error'>{formState.errors.name.message}</p>
      )}
      {error?.response?.data?.message && (
        <p className='text-error'>{error?.response?.data?.message}</p>
      )}
    </form>
  );
};
