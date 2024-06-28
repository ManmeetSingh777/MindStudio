const express = require('express');
const BlockedTime = require('../models/BlockedTime');
const router = express.Router();

// Get all blocked times for a therapist
router.get('/:therapistId', async (req, res) => {
  try {
    const blockedTimes = await BlockedTime.find({ therapist: req.params.therapistId });
    res.json(blockedTimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a blocked time
router.post('/', async (req, res) => {
  const { therapist, date, timeSlots } = req.body;
  
  try {
    const blockedTime = new BlockedTime({ therapist, date, timeSlots });
    await blockedTime.save();
    res.status(201).json(blockedTime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blocked time
router.delete('/:id', async (req, res) => {
  try {
    const blockedTime = await BlockedTime.findById(req.params.id);
    if (!blockedTime) return res.status(404).json({ message: 'Blocked time not found' });
    await blockedTime.remove();
    res.json({ message: 'Blocked time deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
    