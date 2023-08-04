const { celebrate, Joi } = require('celebrate');

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email,
  }),
});

const createMoviesJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const checkMovieIdJoi = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

const createUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
    name: Joi.string().min(2).max(30),
  }),
});

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
  }),
});

module.exports = {
  URL_REGEX,
  updateUserJoi,
  createMoviesJoi,
  checkMovieIdJoi,
  createUserJoi,
  loginJoi,
};
