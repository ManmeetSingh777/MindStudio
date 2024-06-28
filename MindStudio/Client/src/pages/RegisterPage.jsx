import React, { useState } from 'react';
import { register } from '../services/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ name, email, password, role });
      setMessage('Registration successful!');
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('Registration failed. User may already exist.');
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Role (optional):
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterPage;
