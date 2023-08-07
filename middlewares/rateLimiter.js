const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с вашего IP, попробуйте позже',
});

module.exports = limiter;
