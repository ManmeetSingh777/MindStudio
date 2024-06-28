import React, { useEffect, useState } from 'react';
import { getTherapists } from '../services/api'; // Correct import path
import './SpecializationPage.css';

const SpecializationPage = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      const data = await getTherapists();
      setTherapists(data);
    };
    fetchTherapists();
  }, []);

  const handleBookingRedirect = (bookingLink) => {
    if (bookingLink) {
      window.location.href = bookingLink;
    }
  };

  return (
    <div className="specialization">
      <h1>Our Therapists</h1>
      <div className="therapists-list">
        {therapists.map((therapist) => (
          <div key={therapist._id} className="therapist-card">
            <img src={therapist.photo} alt={therapist.name} />
            <h2>{therapist.name}</h2>
            <p>{therapist.specialization}</p>
            <p>{therapist.description}</p>
            <button onClick={() => handleBookingRedirect(therapist.bookingLink)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializationPage;
