const jwt = require('jsonwebtoken');


const createJWT = (id, name) => {

  return new Promise((resolve, reject) => {
    const payload = { id, name};

    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '24h'
    }, (error, token) => {
      if (error) {
        console.error(error);
        reject('Token could not be generated');
      }
      resolve(token);
    });
  })
}

module.exports = {
  createJWT
}