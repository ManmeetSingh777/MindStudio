// middleware/admin.js
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { isAdmin };
