import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CheckIcon } from 'componets/Icons/CheckIcon';
import { CancelIcon } from 'componets/Icons/CancelIcon';
import { EditIcon } from 'componets/Icons/EditIcon';
import { DeleteIcon } from 'componets/Icons/DeleteIcon';
import { useUpdateCategory } from 'hooks/mutations/category/useUpdateCategory';
import { useDeleteCategory } from 'hooks/mutations/category/useDeleteCategory';
import { ICategory } from 'types/category/category';

interface CategoryCardProps {
  category: ICategory;
}

const schema = yup.object({
  name: yup.string().required().min(2, 'Name too short').max(100),
});

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { error, mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const { register, formState, handleSubmit } = useForm<ICategory>({
    defaultValues: {
      name: category.name,
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleUpdateCategory = async (values: ICategory) => {
    if (values.name !== category.name) {
      await updateCategory({ ...category, ...values });
      setIsUpdating(false);
    }
  };

  return isUpdating ? (
    <form
      className='card w-72 bg-base-100 shadow-xl m-4'
      onSubmit={handleSubmit(handleUpdateCategory)}
    >
      <div className='card-body flex-row justify-between'>
        <div className='flex flex-col justify-center items-center'>
          <input
            type='text'
            placeholder='Category name'
            className='input input-bordered'
            {...register('name')}
          />
          {formState?.errors?.name && (
            <p className='text-error'>{formState.errors.name.message}</p>
          )}
          {error?.response?.data?.message && (
            <p className='text-error'>{error?.response?.data?.message}</p>
          )}
        </div>
        <div className='card-actions justify-end flex-col'>
          <>
            <button type='submit' className='btn btn-circle btn-sm bg-base-100'>
              <CheckIcon />
            </button>
            <button
              className='btn btn-circle btn-sm bg-base-100'
              onClick={() => setIsUpdating(false)}
            >
              <CancelIcon />
            </button>
          </>
        </div>
      </div>
    </form>
  ) : (
    <div className='card w-72 bg-base-100 shadow-xl m-4'>
      <div className='card-body flex-row justify-between'>
        <h2 className='card-title ml-4 text-2xl'>{category.name}</h2>
        <div className='card-actions justify-end flex-col'>
          <>
            <button
              className='btn btn-circle btn-sm bg-base-100'
              onClick={() => setIsUpdating(true)}
            >
              <EditIcon />
            </button>
            <button
              className='btn btn-circle btn-sm bg-base-100'
              onClick={() => deleteCategory(category.id)}
            >
              <DeleteIcon />
            </button>
          </>
        </div>
      </div>
    </div>
  );
};
