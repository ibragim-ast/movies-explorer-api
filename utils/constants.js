const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_404 = 404;
const ERROR_409 = 409;

const INVALID_AUTH_DATA_ERROR_MESSAGE = 'Неправильные почта или пароль';
const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
const INCORRECT_USER_DATA_MESSAGE = 'Переданы некорректные данные пользователя';
const INCORRECT_UPDATE_USER_DATA_MESSAGE = 'Переданы некорректные данные при обновлении профиля';
const INCORRECT_ADD_MOVIE_DATA_MESSAGE = 'Переданы некорректные данные при создании фильма';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм с указанным _id не найден';
const NO_RIGHTS_TO_DELETE_ERROR_MESSAGE = 'У вас недостаточно прав на удаление данного фильма';
const INCORRECT_MOVIE_DATA_MESSAGE = 'Переданы некорректные данные фильма';
const NOT_UNIQUE_EMAIL_ERROR_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
const INCORRECT_ADD_USER_DATA_MESSAGE = 'Переданы некорректные данные при создании пользователя';

module.exports = {
  ERROR_400,
  ERROR_401,
  ERROR_404,
  ERROR_409,
  INVALID_AUTH_DATA_ERROR_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
  INCORRECT_ADD_MOVIE_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  NO_RIGHTS_TO_DELETE_ERROR_MESSAGE,
  INCORRECT_MOVIE_DATA_MESSAGE,
  NOT_UNIQUE_EMAIL_ERROR_MESSAGE,
  INCORRECT_ADD_USER_DATA_MESSAGE,
};
