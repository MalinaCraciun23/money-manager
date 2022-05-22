import axios from 'axios';
import { ICategory } from 'types/category/category';
import { IAddCategoryReq } from 'types/category/addCategoryReq';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/category',
});

export const getCategories = async () => {
  const { data } = await axiosInstance.get<ICategory[]>('/');

  return data;
};

export const addCategory = async (categoryReq: IAddCategoryReq) => {
  const { data } = await axiosInstance.post<ICategory>('/', categoryReq);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await axiosInstance.delete<ICategory>(`/${id}`);
  return data;
};

export const updateCategory = async ({ id, name, type }: ICategory) => {
  const { data } = await axiosInstance.put<ICategory>(`/${id}`, { name, type });
  return data;
};
