const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login } = require('../controllers/users');
const { createUserJoi, loginJoi } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

router.post('/signin', loginJoi, login);
router.post('/signup', createUserJoi, createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.all('*', (req, res, next) => next(new NotFoundError('Неверный URL запроса')));

module.exports = router;
