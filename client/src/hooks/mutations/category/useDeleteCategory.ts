import { useMutation, useQueryClient } from 'react-query';
import { deleteCategory } from 'service/categoryService';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};
