import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home/Home';
import { Categories } from 'pages/Categories/Categories';
import { Accounts } from 'pages/Accounts/Accounts';
import { Transactions } from 'pages/Transactions/Transactions';
import { AddTransaction } from 'pages/Transactions/AddTransaction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='categories' element={<Categories />} />
        <Route path='accounts' element={<Accounts />} />
        <Route path='transactions' element={<Transactions />} />
        <Route path='transactions/add' element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
