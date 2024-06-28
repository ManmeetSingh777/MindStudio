import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingComponent = () => {
  const { therapistId } = useParams();
  const [bookingLink, setBookingLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/therapists/${therapistId}`);
        const therapist = await response.json();
        if (therapist.bookingLink) {
          setBookingLink(therapist.bookingLink);
        }
      } catch (error) {
        console.error('Error fetching therapist data:', error);
      }
    };

    fetchTherapist();
  }, [therapistId]);

  const handleBookingRedirect = () => {
    if (bookingLink) {
      window.location.href = bookingLink;
    }
  };

  return (
    <div className="booking">
      {bookingLink ? (
        <div>
          <h2>Book an Appointment</h2>
          <button onClick={handleBookingRedirect}>
            Schedule an Appointment
          </button>
        </div>
      ) : (
        <p>No booking link available for this therapist.</p>
      )}
    </div>
  );
};

export default BookingComponent;
