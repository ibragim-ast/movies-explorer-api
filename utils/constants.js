const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_404 = 404;

const INVALID_AUTH_DATA_ERROR_MESSAGE = 'Неправильные почта или пароль';
const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
const INCORRECT_USER_DATA_MESSAGE = 'Переданы некорректные данные пользователя';
const INCORRECT_UPDATE_USER_DATA_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
const INCORRECT_ADD_MOVIE_DATA_MESSAGE = 'Переданы некорректные данные при создании фильма';

module.exports = {
  ERROR_400,
  ERROR_401,
  ERROR_404,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
  INCORRECT_ADD_MOVIE_DATA_MESSAGE,
};
