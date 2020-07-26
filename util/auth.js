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

  // attach auth info to request
  req.authorizedUser = user;

  // forward to routes
  next();
};

const checkAccess = (req, res, next) => {

  // list user groups
  // const ADMINS = [
  //   'admin'
  // ];
  const MANAGERS = [
    'admin',
    'defcoord'
  ];
  const SCOUTS = [
    'admin',
    'scout'
  ];
  const GHOSTS = [
    'admin',
    'ghost'
  ];

  // match on request url
  switch (req.url) {
    case (req.url.match(/mapSql/) || {}).input:
    case (req.url.match(/operationMeta/) || {}).input:
    case (req.url.match(/targets/) || {}).input:
    case (req.url.match(/attackers/) || {}).input:
    case (req.url.match(/selections/) || {}).input:
      if (!req.authorizedUser.roles.some((r) => MANAGERS.includes(r))) {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'Not enough permissions' });
        return;
      }
      break;
    case (req.url.match(/scouts/) || {}).input:
      if (!req.authorizedUser.roles.some((r) => SCOUTS.includes(r) || MANAGERS.includes(r))) {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'Not enough permissions' });
        return;
      }
      break;
    case (req.url.match(/ghosts/) || {}).input:
      if (!req.authorizedUser.roles.some((r) => GHOSTS.includes(r) || MANAGERS.includes(r))) {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'Not enough permissions' });
        return;
      }
      break;
    case (req.url.match(/commands\/scout/) || {}).input:
      if (!req.authorizedUser.roles.some((r) => SCOUTS.includes(r))) {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'Not enough permissions' });
        return;
      }
      break;
    case (req.url.match(/commands\/ghost/) || {}).input:
      if (!req.authorizedUser.roles.some((r) => GHOSTS.includes(r))) {
        res.status(HttpStatus.FORBIDDEN).json({ message: 'Not enough permissions' });
        return;
      }
      break;
    case (req.url.match(/settings/) || {}).input:
    case (req.url.match(/user/) || {}).input:
      break;
    default:
      res.status(HttpStatus.FORBIDDEN).json({ message: 'Not enough permissions' });
      return;
  }

  // forward to route
  next();
}

module.exports = {
  checkToken,
  checkAccess
}
