import { Layout } from 'componets/Layout/Layout';
import { Loader } from 'componets/Loader';
import { Error } from 'componets/Error';
import { useAccounts } from 'hooks/queries/account/useAccounts';

export const Home = () => {
  const { isLoading, isError, data: accounts } = useAccounts();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const total = accounts?.reduce((sum, account) => sum + account.amount, 0);

  return (
    <Layout>
      <div className='hero'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Welcome!</h1>
          </div>
        </div>
      </div>
      <div className='hero'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-4xl font-bold'>Total balance: {total} $</h1>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <img src='/meme.jpg' alt='meme'></img>
      </div>
    </Layout>
  );
};
