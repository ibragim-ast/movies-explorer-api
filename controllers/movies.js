const { Error: { ValidationError, CastError } } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const {
  HTTP_STATUS_CREATED,
  NO_RIGHTS_TO_DELETE_MOVIE,
  INCORRECT_MOVIE_DATA,
  MOVIE_NOT_FOUND,
} = require('../utils/constants');

// Получение списка сохраненных пользователем фильмов
module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(INCORRECT_MOVIE_DATA));
      }
      return next(error);
    });
};

// Добавление фильма
module.exports.addMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieData = { ...req.body, owner };

  Movie.create(movieData)
    .then((movie) => movie.populate('owner'))
    .then((populatedMovie) => res.status(HTTP_STATUS_CREATED).send(populatedMovie))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new BadRequestError(INCORRECT_MOVIE_DATA));
      }
      return next(error);
    });
};

// Удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  const { _id: movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError(MOVIE_NOT_FOUND);

      const ownerId = movie.owner.valueOf();
      const userId = req.user._id;

      if (ownerId !== userId) {
        return next(new ForbiddenError(NO_RIGHTS_TO_DELETE_MOVIE));
      }
      return movie.deleteOne();
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((error) => {
      if (error instanceof CastError) {
        return next(new BadRequestError(INCORRECT_MOVIE_DATA));
      }
      return next(error);
    });
};
