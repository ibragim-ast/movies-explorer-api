const { Error: { ValidationError, CastError } } = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const { INCORRECT_ADD_MOVIE_DATA_MESSAGE } = require('../utils/constants');
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
