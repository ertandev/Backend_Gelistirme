const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateCreateTask, validateUpdateTask } = require('../middlewares/validationMiddleware');

/**
 * TaskFlow Görev Yönetim Modülü Rotaları
 */

// Özel filtre & arama rotaları (/:id parametresinden önce tanımlanmalı)
router.get('/search', taskController.searchTasks);
router.get('/assignee/:assignee', taskController.getTasksByAssignee);
router.post('/reset', taskController.resetTasks);

// Temel CRUD Rotaları
router.route('/')
  .get(taskController.getAllTasks)
  .post(validateCreateTask, taskController.createTask);

router.route('/:id')
  .get(taskController.getTaskById)
  .put(validateUpdateTask, taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;

