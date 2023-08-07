const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMoviesJoi, checkMovieIdJoi } = require('../middlewares/validation');

// Маршрут для получения сохранённых пользователем фильмов
router.get('/', getMovies);

// Маршрут для создания фильма
router.post('/', addMoviesJoi, addMovie);

// Маршрут для удаления фильма
router.delete('/:movieId', checkMovieIdJoi, deleteMovie);

module.exports = router;
