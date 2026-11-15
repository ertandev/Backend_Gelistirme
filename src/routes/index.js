const express = require('express');
const router = express.Router();

const taskRoutes = require('./taskRoutes');
const reportRoutes = require('./reportRoutes');

// Ana bilgilendirme rotası
router.get('/', (req, res) => {
  res.status(200).json({
    project: 'TASKFLOW - Görev ve Proje Yönetim Sistemi REST API',
    version: '1.0.0',
    description: 'Node.js ve Express.js ile geliştirilmiş kapsamlı görev yönetim ve raporlama API sistemi.',
    status: 'ONLINE',
    author: 'Ertan',
    endpoints: {
      tasks: {
        listAll: 'GET /tasks (Filtreler: ?status=completed&priority=high&page=1&limit=10&sort=createdAt)',
        getById: 'GET /tasks/:id',
        create: 'POST /tasks',
        update: 'PUT /tasks/:id',
        delete: 'DELETE /tasks/:id',
        search: 'GET /tasks/search?keyword=backend',
        byAssignee: 'GET /tasks/assignee/musa',
        reset: 'POST /tasks/reset'
      },
      reports: {
        completed: 'GET /reports/completed',
        pending: 'GET /reports/pending',
        summary: 'GET /reports/summary'
      }
    },
    documentation: '/docs'
  });
});

// Modül yönlendirmeleri
router.use('/tasks', taskRoutes);
router.use('/reports', reportRoutes);

module.exports = router;

