const { Error: { ValidationError, CastError } } = require('mongoose');
const User = require('../models/user');

const {
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_USER_DATA_MESSAGE,
} = require('../utils/constants');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// Функция проверки наличия данных
const checkData = (data) => {
  if (!data) throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
};

// Функция обработки ошибки получения пользователя
const handleGetUserError = (next, error) => {
  if (error instanceof CastError) {
    return next(new BadRequestError(INCORRECT_USER_DATA_MESSAGE));
  }
  return next(error);
};

// Функция поиска пользователя по ID
const findUser = (res, next, userId) => {
  User.findById(userId)
    .then((user) => {
      checkData(user);
      return res.send(user);
    })
    .catch((error) => {
      handleGetUserError(next, error);
    });
};

// Получение информации о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => findUser(res, next, req.userId);
