const crypto = require('crypto');
const Token = require('../models/Token');

function generateVerificationToken(userId) {
  return new Token({ userId, token: crypto.randomBytes(16).toString('hex') });
}

function getVerificationLink(token) {
  return `${process.env.BASE_CLIENT_URL}/verify/${token}`;
}

module.exports = {
  generateVerificationToken,
  getVerificationLink,
};
