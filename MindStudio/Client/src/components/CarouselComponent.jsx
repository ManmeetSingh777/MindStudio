import React, { useState, useEffect } from 'react';
import './CarouselComponent.css';

const items = [
  {
    image: 'https://therapistsearchmadesimple.com/wp-content/uploads/2023/08/hero-img.png',
    title: 'Therapist Name 1',
    specialty: 'Specialization 1',
    description: 'Therapist 1 description goes here. It can be about their expertise, experience, and approach to therapy.',
    details: {
      experience: '10 years',
      education: 'PhD in Psychology',
      languages: 'English, Spanish',
      techniques: 'CBT, DBT',
    }
  },
  {
    image: 'https://static.wixstatic.com/media/7d5b6a_52f7f50d8a9a4828a390e8f34e6312fd~mv2.jpg/v1/fill/w_1165,h_1165,al_c,q_85/therapy-professional-headshot-woman-outdoor.jpg',
    title: 'Therapist Name 2',
    specialty: 'Specialization 2',
    description: 'Therapist 2 description goes here. It can be about their expertise, experience, and approach to therapy.',
    details: {
      experience: '8 years',
      education: 'Masters in Counseling',
      languages: 'English, French',
      techniques: 'Psychoanalysis, EMDR',
    }
  },
  {
    image: 'https://abbymurphyphoto.com/wp-content/uploads/2019/01/ChelseaConnors_AbbyMurphyPhoto-10.jpg',
    title: 'Therapist Name 3',
    specialty: 'Specialization 3',
    description: 'Therapist 3 description goes here. It can be about their expertise, experience, and approach to therapy.',
    details: {
      experience: '7 years',
      education: 'Masters in Psychology',
      languages: 'English, German',
      techniques: 'ACT, Mindfulness',
    }
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5706e14f07eaa0c87f57d4d4/1583267960659-YC8AR4RUNU4WGES6G6MX/ke17ZwdGBToddI8pDm48kEc6DKFOx3cpvkyhZQwPkJYUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc53GO0vWykWK-lIOAtsaJ7vbB1JiXq7byw-6Ogo-kuNnXzR_WIuWSVqqqoqhN8EA5/personal+branding+photography+for+a+counselor?format=original',
    title: 'Therapist Name 4',
    specialty: 'Specialization 4',
    description: 'Therapist 4 description goes here. It can be about their expertise, experience, and approach to therapy.',
    details: {
      experience: '5 years',
      education: 'PhD in Clinical Psychology',
      languages: 'English, Italian',
      techniques: 'Gestalt, Humanistic',
    }
  },
  {
    image: 'https://ellelorean.co/wp-content/uploads/2023/04/Derbyshire-Personal-Branding-Photographer-8-683x1024.jpg',
    title: 'Therapist Name 5',
    specialty: 'Specialization 5',
    description: 'Therapist 5 description goes here. It can be about their expertise, experience, and approach to therapy.',
    details: {
      experience: '9 years',
      education: 'Masters in Counseling Psychology',
      languages: 'English, Mandarin',
      techniques: 'Psychodynamic, EFT',
    }
  }
];

const CarouselComponent = () => {
  const [index, setIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const nextSlide = () => {
    setIndex((index + 1) % items.length);
    setShowDetail(false); // Reset showDetail when changing slides
  };

  const prevSlide = () => {
    setIndex((index - 1 + items.length) % items.length);
    setShowDetail(false); // Reset showDetail when changing slides
  };

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showDetail && e.key === 'Escape') {
        setShowDetail(false);
      }
    };

    const handleClick = (e) => {
      if (showDetail && !e.target.closest('.detail') && !e.target.closest('.seeMore')) {
        setShowDetail(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [showDetail]);

  return (
    <div className={`carousel ${showDetail ? 'showDetail' : ''}`}>
      <h1 className="heading">Book your appointment today</h1>
      <p className="subheading">Find the best therapists and book your appointments easily.</p>
      <div className="list">
        <div className="item-container" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item, i) => (
            <div key={i} className={`item ${i === index ? 'active' : ''}`}>
              <div className="image-container">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="content">
                <div className="introduce">
                  <div className="title">{item.title}</div>
                  <div className="topic">{item.specialty}</div>
                  <div className="des">{item.description}</div>
                  <button className="seeMore" onClick={toggleDetail}>SEE MORE &#8599;</button>
                </div>
                {showDetail && (
                  <div className="detail">
                    <div className="title">{item.title}</div>
                    <div className="des">{item.description}</div>
                    <div className="specifications">
                      <div>
                        <p>Experience</p>
                        <p>{item.details.experience}</p>
                      </div>
                      <div>
                        <p>Education</p>
                        <p>{item.details.education}</p>
                      </div>
                      <div>
                        <p>Languages</p>
                        <p>{item.details.languages}</p>
                      </div>
                      <div>
                        <p>Techniques</p>
                        <p>{item.details.techniques}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="arrows">
        <button id="prev" onClick={prevSlide}>&lt;</button>
        <button id="next" onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
};

export default CarouselComponent;
