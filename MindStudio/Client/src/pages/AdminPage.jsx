import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isAdmin) {
      navigate('/');
    }
    fetchFaqs();
  }, [user, isAdmin, navigate]);

  const fetchFaqs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/faqs');
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleAddFaq = async () => {
    if (!newQuestion || !newAnswer) return;
    try {
      const response = await fetch('http://localhost:5000/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      if (response.ok) {
        setNewQuestion('');
        setNewAnswer('');
        fetchFaqs();
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const handleUpdateFaq = async (id, question, answer) => {
    try {
      const response = await fetch(`http://localhost:5000/api/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ question, answer }),
      });
      if (response.ok) {
        fetchFaqs();
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/faqs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        fetchFaqs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Manage FAQs</h2>
        <div>
          <input
            type="text"
            placeholder="New Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleAddFaq}>Add FAQ</button>
        </div>
        <ul>
          {faqs.map((faq) => (
            <li key={faq._id}>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleUpdateFaq(faq._id, e.target.value, faq.answer)}
              />
              <input
                type="text"
                value={faq.answer}
                onChange={(e) => handleUpdateFaq(faq._id, faq.question, e.target.value)}
              />
              <button onClick={() => handleDeleteFaq(faq._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => logout(navigate)}>Logout</button>
    </div>
  );
};

export default AdminPage;
