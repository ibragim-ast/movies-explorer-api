const router = require('express').Router();

const { createUser } = require('../controllers/users');

const { createUserJoi } = require('../middlewares/validation');

// Маршрут для регистрации пользователя
router.post('/signup', createUserJoi, createUser);
