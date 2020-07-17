const HttpStatus = require('http-status-codes');
const jwtDecode = require('jwt-decode');
const User = require('../models/User');

const checkToken = async (req, res, next) => {
  // check if id_token is provided
  const idToken = req.headers['authorization'];
  if (!idToken) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token not found' });
    return;
  }

  // decode it for verifying
  let decodedToken;
  try {
    decodedToken = jwtDecode(idToken);
  } catch (e) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    return;
  }
  if (!decodedToken || !decodedToken.email) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No email in token' });
    return;
  }
  if (decodedToken.exp * 1000 < new Date()) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Session expired' });
    return;
  }

  // match email from database
  const user = await User.findOne({ email: decodedToken.email });
  if (!user) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'User not found' });
    return;
  }

  // forward to routes
  next();
};

module.exports = checkToken
