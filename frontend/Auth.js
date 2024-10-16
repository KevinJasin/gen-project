// src/components/Auth.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Switch between login and register
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(url, { email, password });
      localStorage.setItem('token', res.data.token); // Save token to localStorage
      navigate('/todos'); // Redirect to TODO page after login
    } catch (error) {
      console.error('Error during authentication', error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default Auth;
