
import React, { useState } from 'react';
import Login from './login';
import Dashboard from './dashboard';
import InputPelanggan from './component/input_pelanggan';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Navbar from './navbar';
import InputAdmin from './component/input_admin';
import ListPelanggan from './component/list_pelanggan';
import InputLaundry from './component/input_laundry';
import ItemDetailPage from './component/list_laundry';
import ChangeStatus from './component/change_status';
import Pembayaran from './component/pembayaran';
import ListPembayaran from './component/list_pembayaran';
const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    // Store the token in localStorage or any other state management solution
    setToken(token);
  };
  const handleLogout = () => {
    // Clear the token
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <>
        <Navbar onLogout={handleLogout} /> 
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard token={token} onLogout={handleLogout} />}/>
            <Route path='/inputpelanggan'element={<InputPelanggan token={token} />}/>
            <Route path='/inputadmin'element={<InputAdmin token={token} />}/>
            <Route path='/listpelanggan'element={<ListPelanggan token={token} />}/>
            <Route path='/inputlaundry'element={<InputLaundry token={token} />}/>
            <Route path='/item/:id' element={<ItemDetailPage token={token} />} />
            <Route path='/status/:id' element={<ChangeStatus token={token} />} />
            <Route path='/pembayaran/:id' element={<Pembayaran token={token} />} />
            <Route path='/list_pembayaran/:id' element={<ListPembayaran token={token} />} />
          </Routes>
        </Router></>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
