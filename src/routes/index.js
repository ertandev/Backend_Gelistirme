const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    project: 'TASKFLOW - Görev ve Proje Yönetim Sistemi REST API',
    status: 'ONLINE'
  });
});

module.exports = router;
