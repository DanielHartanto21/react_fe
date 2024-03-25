
import React from 'react';
import './global.css';
interface NavbarProps {
 onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  
 return (
    <nav>
      <button onClick={onLogout} className='logout'>Logout</button>
    </nav>
 );
};

export default Navbar;
