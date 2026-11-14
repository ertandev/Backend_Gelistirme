/**
 * Validation Middleware (İleri Seviye Pratik 2)
 * title, description, priority, assignee alanlarını doğrular.
 * Geçersiz veya eksik veri durumunda 400 Bad Request döner.
 */

const ALLOWED_PRIORITIES = ['low', 'medium', 'high', 'critical'];
const ALLOWED_STATUSES = ['pending', 'in_progress', 'completed'];

/**
 * Yeni görev oluşturma doğrulaması (POST /tasks)
 */
const validateCreateTask = (req, res, next) => {
  const { title, description, priority, assignee, status } = req.body || {};
  const errors = [];

  // 1. title doğrulaması
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Görev başlığı (title) zorunludur ve metin olmalıdır.'
    });
  } else if (title.trim().length < 3 || title.trim().length > 100) {
    errors.push({
      field: 'title',
      message: 'Görev başlığı 3 ile 100 karakter arasında olmalıdır.'
    });
  }

  // 2. description doğrulaması
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push({
      field: 'description',
      message: 'Görev açıklaması (description) zorunludur ve metin olmalıdır.'
    });
  } else if (description.trim().length < 5 || description.trim().length > 500) {
    errors.push({
      field: 'description',
      message: 'Görev açıklaması 5 ile 500 karakter arasında olmalıdır.'
    });
  }

  // 3. priority doğrulaması
  if (!priority || typeof priority !== 'string' || priority.trim().length === 0) {
    errors.push({
      field: 'priority',
      message: `Öncelik (priority) zorunludur. Geçerli değerler: ${ALLOWED_PRIORITIES.join(', ')}`
    });
  } else if (!ALLOWED_PRIORITIES.includes(priority.toLowerCase().trim())) {
    errors.push({
      field: 'priority',
      message: `Geçersiz öncelik değeri. İzin verilenler: ${ALLOWED_PRIORITIES.join(', ')}`
    });
  }

  // 4. assignee doğrulaması
  if (!assignee || typeof assignee !== 'string' || assignee.trim().length === 0) {
    errors.push({
      field: 'assignee',
      message: 'Atanan çalışan (assignee) bilgisi zorunludur ve metin olmalıdır.'
    });
  } else if (assignee.trim().length < 2 || assignee.trim().length > 50) {
    errors.push({
      field: 'assignee',
      message: 'Atanan çalışan adı 2 ile 50 karakter arasında olmalıdır.'
    });
  }

  // 5. status doğrulaması (Opsiyonel ama verilmişse denetlenir)
  if (status !== undefined) {
    if (typeof status !== 'string' || !ALLOWED_STATUSES.includes(status.toLowerCase().trim())) {
      errors.push({
        field: 'status',
        message: `Geçersiz durum değeri. İzin verilenler: ${ALLOWED_STATUSES.join(', ')}`
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Doğrulama hatası: Gönderilen alanlar gereksinimleri karşılamıyor.',
      errors
    });
  }

  next();
};

/**
 * Görev güncelleme doğrulaması (PUT/PATCH /tasks/:id)
 */
const validateUpdateTask = (req, res, next) => {
  const { title, description, priority, assignee, status } = req.body || {};
  const errors = [];

  // Gövde tamamen boş mu kontrol et
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Güncelleme için en az bir geçerli alan (title, description, priority, assignee, status) gönderilmelidir.',
      errors: [{ field: 'body', message: 'İstek gövdesi boş olamaz.' }]
    });
  }

  // title varsa kontrol et
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 3 || title.trim().length > 100) {
      errors.push({
        field: 'title',
        message: 'Görev başlığı (title) metin olmalı ve 3 ile 100 karakter arasında olmalıdır.'
      });
    }
  }

  // description varsa kontrol et
  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim().length < 5 || description.trim().length > 500) {
      errors.push({
        field: 'description',
        message: 'Görev açıklaması (description) metin olmalı ve 5 ile 500 karakter arasında olmalıdır.'
      });
    }
  }

  // priority varsa kontrol et
  if (priority !== undefined) {
    if (typeof priority !== 'string' || !ALLOWED_PRIORITIES.includes(priority.toLowerCase().trim())) {
      errors.push({
        field: 'priority',
        message: `Geçersiz öncelik değeri. İzin verilenler: ${ALLOWED_PRIORITIES.join(', ')}`
      });
    }
  }

  // assignee varsa kontrol et
  if (assignee !== undefined) {
    if (typeof assignee !== 'string' || assignee.trim().length < 2 || assignee.trim().length > 50) {
      errors.push({
        field: 'assignee',
        message: 'Atanan çalışan adı (assignee) 2 ile 50 karakter arasında olmalıdır.'
      });
    }
  }

  // status varsa kontrol et
  if (status !== undefined) {
    if (typeof status !== 'string' || !ALLOWED_STATUSES.includes(status.toLowerCase().trim())) {
      errors.push({
        field: 'status',
        message: `Geçersiz durum değeri. İzin verilenler: ${ALLOWED_STATUSES.join(', ')}`
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Doğrulama hatası: Güncelleme alanları gereksinimleri karşılamıyor.',
      errors
    });
  }

  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  ALLOWED_PRIORITIES,
  ALLOWED_STATUSES
};

