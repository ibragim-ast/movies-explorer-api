const mongoose = require('mongoose');
const URL_REGEX = require('../middlewares/validation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
