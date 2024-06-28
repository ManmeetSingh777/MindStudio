import React, { useState, useEffect } from 'react';
import { getFAQs, addFAQ, updateFAQ } from '../services/api';
import './FAQPage.css';

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      const data = await getFAQs();
      setFaqs(data);
    };
    fetchFaqs();

    // Check if the user is an admin
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(decodedToken.role === 'admin');
    }
  }, []);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const newFaq = await addFAQ(question);
    setFaqs([...faqs, newFaq]);
    setQuestion('');
  };

  const handleAnswerSubmit = async (id) => {
    const updatedFaq = await updateFAQ(id, answer);
    setFaqs(faqs.map((faq) => (faq._id === id ? updatedFaq : faq)));
    setAnswer('');
  };

  return (
    <div className="faq-container">
      <h1>FAQs</h1>
      <div className="faqs">
        {faqs.map((faq) => (
          <div key={faq._id} className="faq-item">
            <h2 className="faq-question">{faq.question}</h2>
            <p className="faq-answer">{faq.answer}</p>
            {isAdmin && (
              <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(faq._id); }}>
                <label>
                  Answer:
                  <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </label>
                <button type="submit">Submit Answer</button>
              </form>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleQuestionSubmit} className="faq-form">
        <label>
          Add a Question:
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </label>
        <button type="submit">Submit Question</button>
      </form>
    </div>
  );
};

export default FAQPage;
