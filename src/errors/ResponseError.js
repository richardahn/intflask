const required = require('../utils/required');

class ResponseError extends Error {
  constructor(code = required(), reason = required()) {
    super(reason);
    this.name = 'ResponseError';
    this.code = code;
    this.reason = reason;
  }

  send(res) {
    return res.status(this.code).json({ reason: this.reason });
  }
}

module.exports = ResponseError;
