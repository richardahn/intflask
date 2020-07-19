const jwt = require('jsonwebtoken');

function generateJwtToken(user, cb) {
  const payload = {
    id: user.id,
    name: user.firstName + ' ' + user.lastName,
  };

  jwt.sign(
    payload,
    process.env.SECRET_OR_KEY,
    {
      expiresIn: 31556926, // 1 year in seconds
    },
    (err, token) => {
      cb(err, 'Bearer ' + token);
    },
  );
}

module.exports = generateJwtToken;
