const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_404 = 404;

const INVALID_AUTH_DATA_ERROR_MESSAGE = 'Неправильные почта или пароль';
const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
const INCORRECT_USER_DATA_MESSAGE = 'Переданы некорректные данные пользователя';
const INCORRECT_UPDATE_USER_DATA_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм с указанным _id не найден';

module.exports = {
  URL_REGEX,
  ERROR_400,
  ERROR_401,
  ERROR_404,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
};
