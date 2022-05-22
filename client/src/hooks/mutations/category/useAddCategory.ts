import { useMutation, useQueryClient } from 'react-query';
import { addCategory } from 'service/categoryService';
import { AxiosError } from 'axios';
import { ICategory } from 'types/category/category';
import { IAddCategoryReq } from 'types/category/addCategoryReq';

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ICategory,
    AxiosError<{ message?: string }>,
    IAddCategoryReq
  >(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};
