const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const ERROR_401 = 401;

const INVALID_AUTH_DATA_ERROR_MESSAGE = 'Неправильные почта или пароль';

module.exports = {
  URL_REGEX,
  ERROR_401,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
};
