import React, { useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import FeedbackSlider from '../components/FeedBackSlider';


import './LandingPage.css';

const LandingPage = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    setRotateY(percentX * 20);
    setRotateX(-percentY * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="landing-page">
    
      <div className="video-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <video className="intro-video" src="path/to/your/video.mp4" controls style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)` }}></video>
      </div>
      <CarouselComponent />
      <FeedbackSlider />
    </div>
  );
};

export default LandingPage;
