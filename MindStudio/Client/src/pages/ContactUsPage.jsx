import React, { useState } from 'react';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        alert('Message sent successfully');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending message');
    }
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUsPage;
