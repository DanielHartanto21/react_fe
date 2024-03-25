import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../global.css';

const InputPelanggan: React.FC<{ token: string |null}> = ({ token }) => {
    const [nama, setName] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomor_telepon, setNomorTelepon] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 
    const inputPelangganBaru = async () => {
        if (!token) {
          console.error('Token is not available');
          navigate("/");
          return; // Exit the function if the token is not available
        }
    
        try {
          const response = await fetch(`http://localhost:8080/api/input_pelanggan`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`, // Use the token parameter directly
            },
            body: JSON.stringify({
              nama: nama,
              alamat: alamat,
              nomor_telepon: nomor_telepon,
              email: email,
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
            <input type="text" placeholder="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            <br />
            <input type="text" placeholder="nomor_telepon" value={nomor_telepon} onChange={(e) => setNomorTelepon(e.target.value)} />
            <br />
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <button onClick={inputPelangganBaru}>input pelanggan</button>
            <br />
            <button onClick={() => navigate('/')}>
              back to dashboard
            </button>
          </div>
        </div>
        </center>
     );
};

export default InputPelanggan;