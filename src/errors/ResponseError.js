const required = require('../utils/required');

class ResponseError extends Error {
  constructor(code = required(), reason = required(), extra) {
    super(reason);
    this.name = 'ResponseError';
    this.code = code;
    this.reason = reason;
    this.extra = extra;
  }

  send(res) {
    return res.status(this.code).json({ reason: this.reason, ...this.extra });
  }
}

module.exports = ResponseError;
