const app = require('./app');
const config = require('./config/config');

const server = app.listen(config.port, () => {
  console.log(`
  ======================================================
  🚀 TASKFLOW API SUNUCUSU AKTİF!
  ======================================================
  📍 Ortam      : ${config.nodeEnv}
  🌐 Port       : ${config.port}
  🔗 Ana Sayfa  : http://localhost:${config.port}/
  📋 Görevler   : http://localhost:${config.port}/tasks
  📊 Raporlar   : http://localhost:${config.port}/reports/summary
  📂 Log Dosyası: ${config.logFilePath}
  ======================================================
  Durdurmak için: CTRL + C
  `);
});

// Zarif Kapanma (Graceful Shutdown)
process.on('SIGTERM', () => {
  console.log('SIGTERM sinyali alındı. Sunucu kapatılıyor...');
  server.close(() => {
    console.log('Sunucu kapatıldı.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSunucu kapatılıyor...');
  server.close(() => {
    console.log('Sunucu kapatıldı.');
    process.exit(0);
  });
});

module.exports = server;

