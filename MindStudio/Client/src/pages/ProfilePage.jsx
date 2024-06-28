import React, { useState, useEffect } from 'react';
import { getAppointments } from '../services/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointments();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <div className="profile-page">
      <div className="sidebar">
        <h2>Profile</h2>
        <ul>
          <li>Appointments</li>
          {/* Add more options here */}
        </ul>
      </div>
      <div className="content">
        <h1>Appointments</h1>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id}>
              {appointment.date} with {appointment.therapist.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
