import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../services/api';
import './AdminRegisterPage.css';

const AdminRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('Registering admin:', { name, email, password, accessCode }); // Log data being sent
      const data = await registerAdmin({ name, email, password, accessCode });
      localStorage.setItem('token', data.token);
      navigate('/'); // Navigate to the home page after successful registration
    } catch (err) {
      console.error('Error during admin registration:', err);
      setError('Registration failed. Please check your access code and try again.');
    }
  };

  return (
    <div className="admin-register">
      <h1>Admin Register</h1>
      <form onSubmit={handleRegister} className="admin-register-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Access Code:
          <input type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminRegisterPage;
    