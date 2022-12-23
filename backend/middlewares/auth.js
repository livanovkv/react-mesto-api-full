const jwt = require('jsonwebtoken');
const { TEXT_ERROR_AUTH_REQUIRED } = require('../utils/constants');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError(TEXT_ERROR_AUTH_REQUIRED));
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : '637fca34917bfc0782ce3e49',
    );
  } catch (err) {
    next(new AuthError(TEXT_ERROR_AUTH_REQUIRED));
  }
  req.user = payload;
  next();
};
