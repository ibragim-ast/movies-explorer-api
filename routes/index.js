const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login } = require('../controllers/users');
const { createUserJoi, loginJoi } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

// Маршрут для входа пользователя
router.post('/signin', loginJoi, login);

// Маршрут для регистрации нового пользователя
router.post('/signup', createUserJoi, createUser);

// Применение middleware для аутентификации пользователя
router.use(auth);

// Подключение маршрута для работы с пользователями
router.use('/users', usersRouter);

// Подключение маршрута для работы с фильмами
router.use('/movies', moviesRouter);

// Обработка неверного URL запроса - генерация ошибки "NotFound"
router.all('*', (req, res, next) => next(new NotFoundError('Неверный URL запроса')));

module.exports = router;
