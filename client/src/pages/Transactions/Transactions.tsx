import { NavLink } from 'react-router-dom';
import { Layout } from 'componets/Layout/Layout';
import { Loader } from 'componets/Loader';
import { Error } from 'componets/Error';
import { useTransactions } from 'hooks/queries/transaction/useTransactions';

export const Transactions = () => {
  const { isLoading, isError, data: transactions } = useTransactions();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  const totalSpent = transactions
    ?.filter((transaction) => transaction?.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalReceived = transactions
    ?.filter((transaction) => transaction?.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <Layout>
      <div className='flex flex-col flex-grow justify-between h-full'>
        <h1 className='flex justify-center items-center text-4xl font-bold mb-3'>
          Transactions
        </h1>
        <div className='flex flex-row justify-around'>
          <h2 className='text-2xl font-bold mb-6'>
            Total spent: {totalSpent} $
          </h2>
          <h2 className='text-2xl font-bold mb-6'>
            Total received: {totalReceived} $
          </h2>
        </div>

        <div className='overflow-x-auto'>
          <table className='table w-full text-xl text-center'>
            <thead>
              <tr>
                <th className='text-2xl text-bold'>Amount</th>
                <th className='text-2xl text-bold'>Account</th>
                <th className='text-2xl text-bold'>Category</th>
                <th className='text-2xl text-bold'>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                ?.map((transaction) => (
                  <tr className='hover'>
                    <td
                      className={
                        transaction.type === 'expense'
                          ? 'text-error'
                          : 'text-success'
                      }
                    >
                      {transaction.type === 'expense' ? '-' : '+'}
                      {transaction.amount} $
                    </td>
                    <td>{transaction.account}</td>
                    <td>{transaction.category}</td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        </div>

        <NavLink to='/transactions/add' className='btn btn-primary w-full mt-4'>
          Add Transaction
        </NavLink>
      </div>
    </Layout>
  );
};
