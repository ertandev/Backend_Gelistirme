/**
 * Bulunamayan Rotalar (404) Middleware'i
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `İstenen endpoint bulunamadı: [${req.method}] ${req.originalUrl}`,
    hint: 'Mevcut API rotalarını listelemek için GET / adresini ziyaret edebilirsiniz.'
  });
};

/**
 * Genel Hata Yakalama (500) Middleware'i
 */
const errorHandler = (err, req, res, next) => {
  console.error('Sunucu Hatası:', err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: err.message || 'Sunucu tarafında beklenmeyen bir hata oluştu.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};

