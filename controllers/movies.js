const { Error: { ValidationError, CastError } } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const {
  INCORRECT_ADD_MOVIE_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  NO_RIGHTS_TO_DELETE_ERROR_MESSAGE,
  INCORRECT_MOVIE_DATA_MESSAGE,
} = require('../utils/constants');

const checkData = (data) => {
  if (!data) throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
};

// Получение списка сохраненных пользователем фильмов
module.exports.getUserSavedMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch((error) => next(error));
};

// Создание нового фильма
module.exports.createMovies = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(INCORRECT_ADD_MOVIE_DATA_MESSAGE));
      }
      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      checkData(movie);

      const ownerId = movie.owner.valueOf();
      const userId = req.user._id;
      if (ownerId !== userId) {
        return Promise.reject(new ForbiddenError(NO_RIGHTS_TO_DELETE_ERROR_MESSAGE));
      }
      return movie.deleteOne();
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BadRequestError(INCORRECT_MOVIE_DATA_MESSAGE));
      }
      return next(error);
    });
};
