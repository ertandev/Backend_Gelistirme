const taskModel = require('../models/taskModel');

/**
 * Raporlama Servisleri Controller Katmanı (İleri Seviye Pratik 3)
 */

/**
 * 1. Tamamlanan Görev Sayısı ve Listesi
 * GET /reports/completed
 */
const getCompletedTasksReport = (req, res, next) => {
  try {
    const stats = taskModel.getStatistics();

    res.status(200).json({
      success: true,
      statusCode: 200,
      reportType: 'COMPLETED_TASKS',
      generatedAt: new Date().toISOString(),
      summary: {
        completedCount: stats.completedCount,
        totalTasks: stats.totalTasks,
        completionRate: stats.completionRate
      },
      data: stats.completedTasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 2. Bekleyen Görev Sayısı ve Listesi
 * GET /reports/pending
 */
const getPendingTasksReport = (req, res, next) => {
  try {
    const stats = taskModel.getStatistics();
    const pendingRate = stats.totalTasks > 0 
      ? `${((stats.pendingCount / stats.totalTasks) * 100).toFixed(1)}%` 
      : '0%';

    res.status(200).json({
      success: true,
      statusCode: 200,
      reportType: 'PENDING_TASKS',
      generatedAt: new Date().toISOString(),
      summary: {
        pendingCount: stats.pendingCount,
        totalTasks: stats.totalTasks,
        pendingRate: pendingRate
      },
      data: stats.pendingTasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 3. Genel Sistem Özeti ve İstatistikleri
 * GET /reports/summary
 */
const getSummaryReport = (req, res, next) => {
  try {
    const stats = taskModel.getStatistics();

    res.status(200).json({
      success: true,
      statusCode: 200,
      reportType: 'GENERAL_SUMMARY',
      generatedAt: new Date().toISOString(),
      metrics: {
        totalTasks: stats.totalTasks,
        completedTasks: stats.completedCount,
        pendingTasks: stats.pendingCount,
        inProgressTasks: stats.inProgressCount,
        completionRate: stats.completionRate
      },
      breakdowns: {
        byPriority: stats.priorityDistribution,
        byAssignee: stats.assigneeDistribution,
        byProject: stats.projectDistribution
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompletedTasksReport,
  getPendingTasksReport,
  getSummaryReport
};

