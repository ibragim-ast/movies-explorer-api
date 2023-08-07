require('dotenv').config();

const {
  PORT = 3000,
  DB_URI = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const DEV_SECRET = 'super-dev-secret-key';
const SECRET_KEY = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  PORT,
  DB_URI,
  SECRET_KEY,
  NODE_ENV,
};
