const mongoose = require('mongoose');

const blockedTimeSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  date: { type: Date, required: true },
  timeSlots: [{ type: String, required: true }] // Array of time slots blocked on the date
});

const BlockedTime = mongoose.model('BlockedTime', blockedTimeSchema);

module.exports = BlockedTime;
