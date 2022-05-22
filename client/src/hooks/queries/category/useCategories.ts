import { useQuery } from 'react-query';
import { getCategories } from 'service/categoryService';

export const useCategories = () => {
  return useQuery('categories', getCategories);
};
