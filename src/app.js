const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// 1. Temel Güvenlik ve Ayrıştırma Middleware'leri
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Temel Middleware: Logger (Her isteği loglar)
app.use(loggerMiddleware);

// 3. API Rotaları (Hem kök '/' hem de '/api/v1' altında erişilebilir)
app.use('/', routes);
app.use('/api/v1', routes);

// 4. Hata Yönetimi Middleware'leri
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

