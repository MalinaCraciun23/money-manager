export type CategoryType = 'expense' | 'income';

export interface ICategory {
  id: string;
  name: string;
  type: CategoryType;
}
