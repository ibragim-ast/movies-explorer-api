const Movie = require('../models/movie');

// Получение списка сохраненных пользователем фильмов
module.exports.getUserSavedMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch((error) => next(error));
};
