import React from 'react';
import './Card.css';

const Card = ({ image, feedback, borderColor, onHover }) => {
    return (
        <div
            className="card"
            style={{ borderColor }}
            onMouseEnter={() => onHover(borderColor)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="lines" style={{ '--color': borderColor }}></div>
            <div className="imgBx">
                <img src={image} alt="feedback" />
            </div>
            <div className="content">
                <div className="details">
                    <blockquote>{feedback}</blockquote>
                </div>
            </div>
        </div>
    );
};

export default Card;
