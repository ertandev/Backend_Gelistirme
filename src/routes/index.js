const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');

router.get('/', (req, res) => {
  res.status(200).json({
    project: 'TASKFLOW - Görev ve Proje Yönetim Sistemi REST API',
    status: 'ONLINE'
  });
});

router.use('/tasks', taskRoutes);

module.exports = router;
