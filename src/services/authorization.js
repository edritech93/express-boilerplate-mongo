const JWT = require('jsonwebtoken');
const {
  PRIVATE_KEY,
  TIME_AGE_ACCESS_TOKEN,
  TIME_AGE_REFRESH_TOKEN,
} = require('../constants');

exports.verifyMidleware = function(req, res, next) {
  const bearerToken = req.headers.authorization;
  let token = '';
  if (bearerToken !== undefined) {
    token = bearerToken.substring(7);
  }
  verifyToken(token)
      .then((decodedToken) => {
        req.user = decodedToken.data;
        next();
      })
      .catch(() => {
        res.status(401).json({message: 'Unauthorized'});
      });
};

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, PRIVATE_KEY, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

exports.setAccessToken = function(detail) {
  const dataUser = detail.sessionData.toObject();
  const data = {
    ...dataUser,
    password: null,
  };
  const token = JWT.sign({
    data: data,
  }, PRIVATE_KEY, {
    expiresIn: TIME_AGE_ACCESS_TOKEN,
  });
  return token;
};

exports.setRefreshToken = function(detail) {
  const dataUser = detail.sessionData.toObject();
  const data = {
    ...dataUser,
    password: null,
  };
  const token = JWT.sign({
    data: data,
  }, PRIVATE_KEY, {
    expiresIn: TIME_AGE_REFRESH_TOKEN,
  });
  return token;
};
