const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize passport for Google OAuth
require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Import routes
const therapistsRouter = require('./routes/therapists');
const appointmentsRouter = require('./routes/appointments');
const authRouter = require('./routes/auth');
const faqsRouter = require('./routes/faqs');
const adminRouter = require('./routes/admin'); // Import admin route

// Use routes
app.use('/api/therapists', therapistsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/auth', authRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/admin', adminRouter); // Use admin route

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'client', 'dist', 'index.html');
  console.log(`Serving file: ${filePath}`);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
