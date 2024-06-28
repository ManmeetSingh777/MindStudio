const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router(); // Create a router instance

// Admin registration route
router.post('/register-admin', async (req, res) => {
  const { name, email, password, accessCode } = req.body;

  // Log the incoming request data
  console.log('Admin register request body:', req.body);

  // Check if all required fields are provided
  if (!name || !email || !password || !accessCode) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the access code is correct
  if (accessCode !== process.env.ADMIN_ACCESS_CODE) {
    return res.status(403).json({ message: 'Invalid access code' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({
      name,
      email,
      password,
      role: 'admin', // Assign the admin role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; // Export the router
