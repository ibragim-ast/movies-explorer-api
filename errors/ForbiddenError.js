const { FORBIDDEN_ACCESS_ERROR } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ACCESS_ERROR;
  }
}

module.exports = ForbiddenError;
