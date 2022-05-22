import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='navbar min-h-max mb-12 bg-neutral shadow-md'>
      <div className='container mx-auto flex flex-col sm:flex-row'>
        <div className='flex-none'>
          <Link
            to='/'
            className='btn btn-ghost text-3xl text-primary font-bold h-[64px]'
          >
            <div className='flex flex-row items-center'>
              <img
                src='/logo512.png'
                width={64}
                height={64}
                alt='Hacktoberfest'
                placeholder='blur'
              />
              <p className='ml-1'>Money Manager</p>
            </div>
          </Link>
        </div>
        <div className='flex-1 mt-3 sm:mt-0'>
          <div className='flex justify-end'>
            <NavLink
              to='/categories'
              className={({ isActive }) =>
                `btn btn-primary mr-5 ${isActive ? '' : 'btn-outline'}`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to='/accounts'
              className={({ isActive }) =>
                `btn btn-primary mr-5 ${isActive ? '' : 'btn-outline'}`
              }
            >
              Accounts
            </NavLink>
            <NavLink
              to='/transactions'
              className={({ isActive }) =>
                `btn btn-primary ${isActive ? '' : 'btn-outline'}`
              }
            >
              Transactions
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
