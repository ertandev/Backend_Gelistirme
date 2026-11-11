const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `İstenen endpoint bulunamadı: [${req.method}] ${req.originalUrl}`
  });
};

module.exports = { notFoundHandler };
