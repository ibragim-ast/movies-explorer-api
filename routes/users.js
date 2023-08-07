const router = require('express').Router();
const { updateUserJoi } = require('../middlewares/validation');
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

// Маршрут для получения информации о текущем пользователе
router.get('/me', getCurrentUser);

// Маршрут для обновления информации о текущем пользователе
router.patch('/me', updateUserJoi, updateUserInfo);

module.exports = router;
