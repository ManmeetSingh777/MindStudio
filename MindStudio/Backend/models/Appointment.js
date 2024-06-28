const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
