const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error: { ValidationError, CastError } } = require('mongoose');
const User = require('../models/user');
const { SECRET_KEY } = require('../utils/config');

const {
  HTTP_STATUS_CREATED,
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  INCORRECT_UPDATE_USER_DATA,
  EMAIL_ALREADY_REGISTERED,
  INCORRECT_ADD_USER_DATA,
} = require('../utils/constants');

const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const InvalidRequestError = require('../errors/InvalidRequestError');
const ConflictingError = require('../errors/InvalidRequestError');

// Функция проверки наличия данных
const checkData = (data) => {
  if (!data) throw new ResourceNotFoundError(USER_NOT_FOUND);
};

// Получение информации о текущем пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      checkData(user);
      return res.send(user);
    })
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new InvalidRequestError(INCORRECT_USER_DATA));
      }
      return next(error);
    });
};

// Обновление информации о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  console.log(name, email);
  User.findByIdAndUpdate(_id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => {
      checkData(user);
      res.send(user);
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ConflictingError(EMAIL_ALREADY_REGISTERED));
      }
      if (error instanceof ValidationError) {
        return next(new InvalidRequestError(INCORRECT_UPDATE_USER_DATA));
      }
      return next(error);
    });
};

// Регистрация
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((createdUser) => {
      const user = createdUser.toObject();
      delete user.password;
      return res
        .status(HTTP_STATUS_CREATED)
        .send(user);
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ConflictingError(EMAIL_ALREADY_REGISTERED));
      }
      if (error instanceof ValidationError) {
        return next(new InvalidRequestError(INCORRECT_ADD_USER_DATA));
      }
      return next(error);
    });
};

// Аутентификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
