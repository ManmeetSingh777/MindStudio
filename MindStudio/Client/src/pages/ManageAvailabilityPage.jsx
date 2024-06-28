import React, { useState, useEffect } from 'react';
import { getAvailableTimes, createAvailableTime, deleteAvailableTime } from '../services/api';
import { useParams } from 'react-router-dom';

const ManageAvailabilityPage = () => {
  const { therapistId } = useParams();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState('');

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      const data = await getAvailableTimes(therapistId);
      setAvailableTimes(data);
    };
    fetchAvailableTimes();
  }, [therapistId]);

  const handleAddTime = async () => {
    const newAvailableTime = { therapist: therapistId, date, timeSlots: timeSlots.split(',') };
    await createAvailableTime(newAvailableTime);
    setAvailableTimes([...availableTimes, newAvailableTime]);
    setDate('');
    setTimeSlots('');
  };

  const handleDelete = async (id) => {
    await deleteAvailableTime(id);
    setAvailableTimes(availableTimes.filter(time => time._id !== id));
  };

  return (
    <div>
      <h1>Manage Availability</h1>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input 
        type="text" 
        value={timeSlots} 
        placeholder="Enter time slots separated by commas" 
        onChange={(e) => setTimeSlots(e.target.value)} 
      />
      <button onClick={handleAddTime}>Add Available Time</button>
      <ul>
        {availableTimes.map(time => (
          <li key={time._id}>
            {new Date(time.date).toDateString()} - {time.timeSlots.join(', ')}
            <button onClick={() => handleDelete(time._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAvailabilityPage;
