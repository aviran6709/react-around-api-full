
const jwt = require('jsonwebtoken');
const validator = require('validator');
const errorAuth = require('../Error/errorAuth');
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith('Bearer ')) {
  throw new errorAuth('Authorization Required ' );
  }
  
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    

  } catch (err) {
   throw new errorAuth('Authorization Required ' );
  }
  
  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware
};