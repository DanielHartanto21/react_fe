import React from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';
const Dashboard: React.FC<{ token: string; onLogout: () => void }> = ({ token, onLogout }) => {
  
  const navigate=useNavigate();
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/inputpelanggan')}>
      Input Pelanggan Baru
    </button>
    <button onClick={() => navigate('/listpelanggan')}>
      List Pelanggan
    </button>
    <button onClick={() => navigate('/inputlaundry')}>
      input laundry
    </button>
    <button onClick={() => navigate('/inputadmin')}>
      Input Admin Baru
    </button>
    </div>
  );
};

export default Dashboard;