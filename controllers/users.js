const { Error: { ValidationError, CastError } } = require('mongoose');
const User = require('../models/user');

const {
  USER_NOT_FOUND_MESSAGE,
  INCORRECT_USER_DATA_MESSAGE,
  INCORRECT_UPDATE_USER_DATA_MESSAGE,
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

// Функция обновления информации о пользователе
const updateUserData = (req, res, next, data) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      checkData(user);
      res.send(user);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(INCORRECT_UPDATE_USER_DATA_MESSAGE));
      }
      return next(error);
    });
};

// Получение информации о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => findUser(res, next, req.userId);

// Обновление информации о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  return updateUserData(req, res, next, { name, email });
};
