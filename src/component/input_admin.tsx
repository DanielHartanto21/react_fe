import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';

const InputAdmin: React.FC<{ token: string |null}> = ({ token }) => {
    const [nama, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const inputAdminBaru = async () => {
        if (!token) {
          console.error('Token is not available');
          navigate("/");
          return; // Exit the function if the token is not available
        }
    
        try {
          const response = await fetch(`http://localhost:8080/api/input_admin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, // Use the token parameter directly
            },
            body: JSON.stringify({
              nama: nama,
              username: username,
              password: password,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to authenticate');
          }
    
          const data = await response.json();
          console.log(data);
          navigate('/');
          // Handle the response data as needed
        } catch (error) {
          console.error('Login failed:', error);
        }
    };
     

    return (
        <center>
        <div className='login-wrapper'>
          <div className='login-container'>
            <h2>Input pelanggan baru</h2>
            <input type="text" placeholder="nama" value={nama} onChange={(e) => setName(e.target.value)} />
            <br />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={inputAdminBaru}>input admin</button>
            <br />
            <button onClick={() => navigate('/')}>
              back to dashboard
            </button>
          </div>
        </div>
        </center>
     );
};

export default InputAdmin;