import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(' http://localhost:8000/api/admin/login', { email , password });
      console.log(response.data); // Handle successful login

      // Storing the token in localStorage
     
       localStorage.setItem('admintoken',response.data.token);

    
     // Redirect to the dashboard after successful login
      navigate('/admin/dashboard');

    } catch (error) {
      console.error(error.response.data.message); // Handle login error
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;