const router = require('express').Router();

const { getCurrentUser } = require('../controllers/users');

// Маршрут для получения информации о текущем пользователе
router.get('/me', getCurrentUser);
