const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

// Маршрут для получения информации о текущем пользователе
router.get('/me', getCurrentUser);

// Маршрут для обновления информации о текущем пользователе
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);
