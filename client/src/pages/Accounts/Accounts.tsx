import { Layout } from 'componets/Layout/Layout';
import { Loader } from 'componets/Loader';
import { Error } from 'componets/Error';
import { AddAccount } from './AddAccount/AddAccount';
import { AccountCard } from './AccountCard/AccountCard';
import { useAccounts } from 'hooks/queries/account/useAccounts';

export const Accounts = () => {
  const { isLoading, isError, data: accounts } = useAccounts();

  if (isError) {
    return <Error />;
  }

  return (
    <Layout>
      <h1 className='flex justify-center items-center text-4xl font-bold mb-6'>
        Accounts
      </h1>
      <AddAccount />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-row justify-evenly flex-wrap mt-6'>
          {accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}
    </Layout>
  );
};
