const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INVALID_AUTH_CREDENTIALS, INVALID_EMAIL_FORMAT } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: INVALID_EMAIL_FORMAT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

const checkData = (data) => {
  if (!data) throw new UnauthorizedError(INVALID_AUTH_CREDENTIALS);
};

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  const User = this;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      checkData(user);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          checkData(matched);
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
