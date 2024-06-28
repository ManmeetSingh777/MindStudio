const mongoose = require('mongoose');

const availableTimeSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  date: { type: Date, required: true },
  timeSlots: [{ type: String, required: true }] // Array of available time slots on the date
});

const AvailableTime = mongoose.model('AvailableTime', availableTimeSchema);

module.exports = AvailableTime;
