const taskModel = require('../models/taskModel');

/**
 * Görev Yönetim Modülü Controller Katmanı
 */

/**
 * 1. Yeni Görev Ekleme
 * POST /tasks
 */
const createTask = (req, res, next) => {
  try {
    const newTask = taskModel.create(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Görev başarıyla oluşturuldu.',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 2. Görevleri Listeleme (Filtreleme, Sıralama, Sayfalama destekli)
 * GET /tasks
 * Query Params: status, priority, assignee, sort, order, page, limit
 */
const getAllTasks = (req, res, next) => {
  try {
    const { status, priority, assignee, keyword, sort, order, page, limit } = req.query;

    const result = taskModel.findAll({
      status,
      priority,
      assignee,
      keyword,
      sort,
      order,
      page,
      limit
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Görevler başarıyla listelendi.',
      count: result.data.length,
      pagination: result.pagination,
      filtersApplied: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assignee && { assignee }),
        ...(keyword && { keyword }),
        sort: sort || 'createdAt',
        order: order || 'desc'
      },
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 3. Görev Detayı
 * GET /tasks/:id
 */
const getTaskById = (req, res, next) => {
  try {
    const { id } = req.params;
    const task = taskModel.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: `ID değeri "${id}" olan görev bulunamadı.`
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Görev detayı başarıyla getirildi.',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 4. Görev Güncelleme
 * PUT /tasks/:id
 */
const updateTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = taskModel.update(id, req.body);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: `Güncellenmek istenen ID "${id}" numaralı görev bulunamadı.`
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Görev başarıyla güncellendi.',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 5. Görev Silme
 * DELETE /tasks/:id
 */
const deleteTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = taskModel.delete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: `Silinmek istenen ID "${id}" numaralı görev bulunamadı.`
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Görev başarıyla sistemden kaldırıldı.',
      data: deletedTask
    });
  } catch (error) {
    next(error);
  }
};

/**
 * İSTEĞE BAĞLI 1: Görev Arama
 * GET /tasks/search?keyword=backend
 */
const searchTasks = (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Arama için geçerli bir "keyword" parametresi gereklidir. Örnek: /tasks/search?keyword=backend'
      });
    }

    const results = taskModel.search(keyword);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `"${keyword}" anahtar kelimesi ile yapılan arama sonuçları.`,
      keyword: keyword,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

/**
 * İSTEĞE BAĞLI 1: Kullanıcı Bazlı Listeleme
 * GET /tasks/assignee/:assignee (örn: /tasks/assignee/musa)
 */
const getTasksByAssignee = (req, res, next) => {
  try {
    const { assignee } = req.params;

    if (!assignee) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Lütfen bir çalışan kullanıcı adı belirtin.'
      });
    }

    const tasks = taskModel.findByAssignee(assignee);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: `"${assignee}" adlı çalışana atanmış görevler listelendi.`,
      assignee: assignee,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Test & Sıfırlama Yardımcısı
 * POST /tasks/reset
 */
const resetTasks = (req, res, next) => {
  try {
    const resetData = taskModel.resetData();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Veri tabanı başarıyla başlangıç mock verilerine sıfırlandı.',
      totalTasks: resetData.length
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
  getTasksByAssignee,
  resetTasks
};

