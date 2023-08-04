const router = require('express').Router();
const { createMoviesJoi } = require('../middlewares/validation');
const {
  getUserSavedMovies,
  createMovies,
} = require('../controllers/movies');

// Маршрут для получения сохранённых пользователем фильмов
router.get('/', getUserSavedMovies);

// Маршрут для создания фильма
router.post('/', createMoviesJoi, createMovies);
