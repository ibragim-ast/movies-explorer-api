const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMoviesJoi, deletedMovieJoi } = require('../middlewares/validation');

// Маршрут для получения сохранённых пользователем фильмов
router.get('/', getMovies);

// Маршрут для создания фильма
router.post('/', addMoviesJoi, addMovie);

// Маршрут для удаления фильма
router.delete('/:_id', deletedMovieJoi, deleteMovie);

module.exports = router;
