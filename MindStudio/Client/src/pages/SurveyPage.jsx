import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyPage.css';

const SurveyPage = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswerChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const handleSubmit = () => {
    // Logic to recommend therapist based on answers
    const recommendedTherapistId = getRecommendedTherapist(answers);
    navigate(`/booking/${recommendedTherapistId}`);
  };

  const getRecommendedTherapist = (answers) => {
    // Dummy logic to select therapist
    return 'therapist-id-based-on-answers';
  };

  return (
    <div className="survey">
      <h1>Find Your Therapist</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="question">
          <label>Question 1: How do you feel today?</label>
          <input type="radio" name="q1" value="good" onChange={() => handleAnswerChange('q1', 'good')} /> Good
          <input type="radio" name="q1" value="bad" onChange={() => handleAnswerChange('q1', 'bad')} /> Bad
        </div>
        <div className="question">
          <label>Question 2: How often do you feel stressed?</label>
          <input type="radio" name="q2" value="often" onChange={() => handleAnswerChange('q2', 'often')} /> Often
          <input type="radio" name="q2" value="rarely" onChange={() => handleAnswerChange('q2', 'rarely')} /> Rarely
        </div>
        <button type="submit">Get Recommendation</button>
      </form>
    </div>
  );
};

export default SurveyPage;
