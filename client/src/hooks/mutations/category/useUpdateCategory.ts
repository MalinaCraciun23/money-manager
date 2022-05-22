import { useMutation, useQueryClient } from 'react-query';
import { updateCategory } from 'service/categoryService';
import { AxiosError } from 'axios';
import { ICategory } from 'types/category/category';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ICategory, AxiosError<{ message?: string }>, ICategory>(
    updateCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },
    }
  );
};
