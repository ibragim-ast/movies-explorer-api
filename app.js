const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const { PORT, DB_URI } = require('./utils/config');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

// Подключение к базе данных MongoDB
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Связь с базой данных установлена');
  })
  .catch((error) => {
    console.log('Ошибка базы данных:', error);
    process.exit(1);
  });

// Создание экземпляра Express приложения
const app = express();

// Разрешенные домены для CORS
const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://movies-ast.nomoreparties.co',
];

// Опции для CORS
const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware CORS
app.use(cors(corsOptions));

// Middleware безопасности (Helmet)
app.use(helmet());

// Middleware ограничения скорости запросов
app.use(limiter);

// Middleware для обработки данных из тела запроса (URL-encoded и JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware для логгирования запросов
app.use(requestLogger);

// Подключение маршрутизатора
app.use(router);

// Middleware для логгирования ошибок
app.use(errorLogger);

// Middleware для обработки ошибок Celebrate
app.use(errors());

// Middleware для обработки ошибок
app.use(errorsHandler);

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на ${PORT} порту`);
});
