import React from 'react';
import './Header.css';
import character from '../assets/VectorImage.png.png';

const Header = () => {
  return (
    <div className="header">
      <img src={character} alt="Character" className="character" />
      <div className="cta">
        <h1>Let's Figure It Out Together</h1>
        <p>Join us at Dr. Nandy's Mind Studio and start your journey to mental wellness today.</p>
        <button className="cta-button">Book a Session</button>
      </div>
    </div>
  );
};

export default Header;
