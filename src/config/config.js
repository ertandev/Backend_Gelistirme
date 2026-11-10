const path = require('path');
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dataFilePath: process.env.DATA_FILE_PATH || path.join(__dirname, '../data/tasks.json'),
  initialDataFilePath: path.join(__dirname, '../data/initialTasks.json'),
  logFilePath: process.env.LOG_FILE_PATH || path.join(__dirname, '../../logs/access.log')
};

