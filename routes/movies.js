const router = require('express').Router();
const { createMoviesJoi, checkMovieIdJoi } = require('../middlewares/validation');
const {
  getUserSavedMovies,
  createMovies,
  deleteMovie,
} = require('../controllers/movies');

// Маршрут для получения сохранённых пользователем фильмов
router.get('/', getUserSavedMovies);

// Маршрут для создания фильма
router.post('/', createMoviesJoi, createMovies);

// Маршрут для удаления фильма
router.delete('/:movieId', checkMovieIdJoi, deleteMovie);
