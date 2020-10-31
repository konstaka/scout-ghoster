const HttpStatus = require('http-status-codes');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const checkToken = async (req, res, next) => {
  // Check if id_token is provided
  const idToken = req.headers.authorization;
  if (!idToken || !idToken.startsWith('Bearer ')) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token not found' });
    return;
  }

  let decodedToken;

  // Verify with Google
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken.split('Bearer ')[1],
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    decodedToken = ticket.getPayload();
  } catch (e) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    return;
  }

  if (!decodedToken || !decodedToken.email) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No email in token' });
    return;
  }

  // Match email from database
  const user = await User.findOne({ email: decodedToken.email });
  if (!user) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'User not found' });
    return;
  }

  // Attach auth info to request
  req.authorizedUser = user;

  // Forward to routes
  next();
};

const checkAccess = (req, res, next) => {
  /*
     * List user groups
     * const ADMINS = [
     *   'admin'
     * ];
     */
  const MANAGERS = [
    'admin',
    'defcoord',
  ];
  const SCOUTS = [
    'admin',
    'scout',
  ];
  const GHOSTS = [
    'admin',
    'ghost',
  ];

  // Match on request url
  switch (req.url) {
    case (req.url.match(/mapSql/) || {}).input:
    case (req.url.match(/operationMeta/) || {}).input:
    case (req.url.match(/targets/) || {}).input:
    case (req.url.match(/attackers/) || {}).input:
    case (req.url.match(/selections/) || {}).input:
    case (req.url.match(/flexSeconds/) || {}).input:
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

  // Forward to route
  next();
};

module.exports = {
  checkToken,
  checkAccess,
};
