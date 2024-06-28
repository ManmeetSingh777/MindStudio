import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Logging in user:', { email, password });
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/'); 
    } catch (err) {
      console.error('Error during login:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
