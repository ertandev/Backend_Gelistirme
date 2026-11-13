const fs = require('fs');
const path = require('path');
const config = require('../config/config');

/**
 * Temel Middleware: Logger
 * Tüm API isteklerinin (HTTP method, endpoint, zaman damgası, durum kodu, yanıt süresi)
 * konsola ve 'logs/access.log' dosyasına kayıt altına alınmasını sağlar.
 */
const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  const { method, originalUrl } = req;

  // Yanıt tamamlandığında logla
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const logLine = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms\n`;

    // 1. Konsola yazdır (Renkli durum kodlarıyla)
    let statusColor = '\x1b[32m'; // Yeşil (2xx)
    if (statusCode >= 400 && statusCode < 500) statusColor = '\x1b[33m'; // Sarı (4xx)
    if (statusCode >= 500) statusColor = '\x1b[31m'; // Kırmızı (5xx)
    const resetColor = '\x1b[0m';

    console.log(
      `\x1b[36m[${timestamp}]\x1b[0m \x1b[1m${method}\x1b[0m ${originalUrl} ${statusColor}${statusCode}${resetColor} (${duration}ms)`
    );

    // 2. Log dosyasına yaz
    try {
      const logDir = path.dirname(config.logFilePath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.appendFileSync(config.logFilePath, logLine, 'utf8');
    } catch (err) {
      console.error('Log dosyasına yazılırken hata oluştu:', err.message);
    }
  });

  next();
};

module.exports = loggerMiddleware;

