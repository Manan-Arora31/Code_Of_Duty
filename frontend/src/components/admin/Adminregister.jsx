import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [Secretkey,setSecretkey]=useState('');
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if(Secretkey==='Man-Pra-Mad')
    {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/register', { username,email, password });
      console.log(response.data); // Handle successful registration
      navigate('/admin/login'); // Redirect to the login page after successful registration
    } catch (error) {
      console.error(error.response.data.message); // Handle registration error
    }
    }else{
      console.log("Wrong SecretKey");
    } 
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Secretkey"
        value={Secretkey}
        onChange={(e) => setSecretkey(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;