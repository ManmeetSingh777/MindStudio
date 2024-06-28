import React, { useEffect, useRef, useState } from 'react';
import './FeedBackSlider.css';
import Card from './Card';


const cardsData = [
    { image: 'images/dragon_1.jpg', feedback: 'Amazing experience!', borderColor: '#FF5733' },
    { image: 'images/dragon_2.jpg', feedback: 'Loved it!', borderColor: '#33FF57' },
    { image: 'images/dragon_3.jpg', feedback: 'Would recommend!', borderColor: '#3357FF' },
    { image: 'images/dragon_4.jpg', feedback: 'Fantastic!', borderColor: '#FF33A8' },
    { image: 'images/dragon_5.jpg', feedback: 'Incredible!', borderColor: '#33FFF5' },
    { image: 'images/dragon_6.jpg', feedback: 'Top notch!', borderColor: '#FF5733' },
    { image: 'images/dragon_7.jpg', feedback: 'Superb!', borderColor: '#33FF57' },
    { image: 'images/dragon_8.jpg', feedback: 'Highly satisfied!', borderColor: '#3357FF' },
    { image: 'images/dragon_9.jpg', feedback: 'Exceptional!', borderColor: '#FF33A8' },
    { image: 'images/dragon_10.jpg', feedback: 'Exceeded expectations!', borderColor: '#33FFF5' },
];

const RollerSlider = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const sliderRef = useRef(null);

    const togglePause = () => {
        setIsPaused(prevState => !prevState);
    };

    const handleCardHover = (color) => {
        setBackgroundColor(color);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (isPaused) {
            slider.style.animationPlayState = 'paused';
        } else {
            slider.style.animationPlayState = 'running';
        }
    }, [isPaused]);

    return (
        <div
            className="banner"
            onDoubleClick={togglePause}
            style={{ backgroundColor: backgroundColor ? backgroundColor : 'initial' }}
        >
            <div className="slider" ref={sliderRef} style={{ '--quantity': cardsData.length }}>
                {cardsData.map((data, index) => (
                    <div className="item" style={{ '--position': index + 1 }} key={index}>
                        <Card {...data} onHover={handleCardHover} />
                    </div>
                ))}
            </div>
            <div className="content">
                <h1 data-content="PEOPLE WHO BELIEVED IN US">
                    PEOPLE WHO BELIEVED IN US
                </h1>
                
                
            </div>
        </div>
    );
};

export default RollerSlider;
