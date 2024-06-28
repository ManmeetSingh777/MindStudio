const express = require('express');
const AvailableTime = require('../models/AvailableTime');
const router = express.Router();

// Get all available times for a therapist
router.get('/:therapistId', async (req, res) => {
  try {
    const availableTimes = await AvailableTime.find({ therapist: req.params.therapistId });
    res.json(availableTimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an available time
router.post('/', async (req, res) => {
  const { therapist, date, timeSlots } = req.body;
  
  try {
    const availableTime = new AvailableTime({ therapist, date, timeSlots });
    await availableTime.save();
    res.status(201).json(availableTime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an available time
router.delete('/:id', async (req, res) => {
  try {
    const availableTime = await AvailableTime.findById(req.params.id);
    if (!availableTime) return res.status(404).json({ message: 'Available time not found' });
    await availableTime.remove();
    res.json({ message: 'Available time deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
