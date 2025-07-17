// middleware/authMiddlerware
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env. JWT);
    console.log("Decoded:", decoded);
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) return res.status(401).json({ msg: 'User not found' });
    next();
  } catch (err) {
    console.log("JWT error:", err.message);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;
