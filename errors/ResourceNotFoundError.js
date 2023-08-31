const { HTTP_STATUS_NOT_FOUND } = require('../utils/constants');

class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = ResourceNotFoundError;
