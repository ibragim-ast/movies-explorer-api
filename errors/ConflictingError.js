const { HTTP_STATUS_CONFLICT } = require('../utils/constants');

class ConflictingError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictingError;
