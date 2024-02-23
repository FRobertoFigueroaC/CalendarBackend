const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const validateJWT = async (req, res = response, next) => {

  // x-token header
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Not Authenticated",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.id = payload.id;
    req.name = payload.name;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token",
    });
  }
  next();
 
}

module.exports = {
  validateJWT
}