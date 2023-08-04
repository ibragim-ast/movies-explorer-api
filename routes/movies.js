const router = require('express').Router();
const { getUserSavedMovies } = require('../controllers/movies');

// Маршрут для получения сохранённых пользователем фильмов
router.get('/', getUserSavedMovies);
