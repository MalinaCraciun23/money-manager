import { useState } from 'react';
import { Layout } from 'componets/Layout/Layout';
import { Loader } from 'componets/Loader';
import { Error } from 'componets/Error';
import { AddCategory } from './AddCategory/AddCategory';
import { CategoryCard } from './CategoryCard/CategoryCard';
import { useCategories } from 'hooks/queries/category/useCategories';
import { CategoryType } from 'types/category/category';

export const Categories = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>('expense');
  const { isLoading, isError, data: categories } = useCategories();

  if (isError) {
    return <Error />;
  }

  return (
    <Layout>
      <h1 className='flex justify-center items-center text-4xl font-bold mb-6'>
        Categories
      </h1>
      <div className='tabs tabs-boxed'>
        <button
          className={`tab tab-lg text-2xl w-[50%] ${
            activeTab === 'expense' ? 'tab-active' : ''
          }`}
          onClick={() => setActiveTab('expense')}
        >
          Expense
        </button>
        <button
          className={`tab tab-lg text-2xl w-[50%] ${
            activeTab === 'income' ? 'tab-active' : ''
          }`}
          onClick={() => setActiveTab('income')}
        >
          Income
        </button>
      </div>
      <AddCategory type={activeTab} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-row justify-evenly flex-wrap mt-6'>
          {categories
            ?.filter((category) => category.type === activeTab)
            .map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      )}
    </Layout>
  );
};
