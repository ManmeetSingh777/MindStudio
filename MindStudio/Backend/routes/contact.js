const express = require('express');
const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();

// Contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Save message to the database
  const contactMessage = new ContactMessage({ name, email, message });
  try {
    await contactMessage.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // you can change this to any email you want to receive the messages
      subject: 'New Contact Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ message: 'Message received and email sent' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
