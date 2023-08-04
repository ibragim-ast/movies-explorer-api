const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const { createUserJoi, loginJoi } = require('../middlewares/validation');

// Маршрут для регистрации пользователя
router.post('/signup', createUserJoi, createUser);

// Маршрут для логина
router.post('/signin', loginJoi, login);
