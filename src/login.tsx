import React, { useState } from 'react';
import './global.css';
const Login: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        // Make an HTTP POST request to your backend authentication endpoint\
        const response = await fetch(`http://localhost:8080/api/logins`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        console.log(response);
        if (!response.ok) {
          // Handle error response from the server
          throw new Error('Failed to authenticate');
        }
    
        // Parse the response JSON
        const data = await response.json();
    
        // Assuming the server sends back a token upon successful authentication
        const token = data.token;
        // Pass the token to the onLogin function to handle it
        onLogin(token);
      } catch (error) {
        console.error('Login failed:', error);
      }
  };

  return (
    <div className='login-wrapper'>
    <div className='login-container'>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div></div>
  );
};

export default Login;