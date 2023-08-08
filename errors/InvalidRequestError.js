const { HTTP_STATUS_BAD_REQUEST } = require('../utils/constants');

class InvalidRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = InvalidRequestError;
