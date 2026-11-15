const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

/**
 * TaskFlow Raporlama Modülü Rotaları (İleri Seviye Pratik 3)
 */
router.get('/completed', reportController.getCompletedTasksReport);
router.get('/pending', reportController.getPendingTasksReport);
router.get('/summary', reportController.getSummaryReport);

module.exports = router;

