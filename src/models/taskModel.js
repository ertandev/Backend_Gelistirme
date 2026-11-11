const fs = require('fs');
const path = require('path');
const config = require('../config/config');

class TaskModel {
  constructor() {
    this.filePath = config.dataFilePath;
    this.initialFilePath = config.initialDataFilePath;
    this.initDataFile();
  }

  /**
   * Veri dosyasının varlığını kontrol eder, yoksa başlangıç verisiyle oluşturur.
   */
  initDataFile() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (!fs.existsSync(this.filePath)) {
        if (fs.existsSync(this.initialFilePath)) {
          const initialData = fs.readFileSync(this.initialFilePath, 'utf8');
          fs.writeFileSync(this.filePath, initialData, 'utf8');
        } else {
          fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf8');
        }
      }
    } catch (error) {
      console.error('Veri dosyası başlatılırken hata oluştu:', error);
    }
  }

  /**
   * JSON dosyasındaki tüm görevleri okur.
   * @returns {Array} Görevler listesi
   */
  readAll() {
    try {
      if (!fs.existsSync(this.filePath)) {
        this.initDataFile();
      }
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data || '[]');
    } catch (error) {
      console.error('Görev verisi okunurken hata:', error);
      return [];
    }
  }

  /**
   * JSON dosyasına görevleri yazar.
   * @param {Array} tasks 
   */
  writeAll(tasks) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error('Görev verisi yazılırken hata:', error);
      throw new Error('Veri tabanına yazma hatası oluştu.');
    }
  }

  /**
   * Başlangıç verilerine sıfırlar.
   */
  resetData() {
    if (fs.existsSync(this.initialFilePath)) {
      const initial = fs.readFileSync(this.initialFilePath, 'utf8');
      fs.writeFileSync(this.filePath, initial, 'utf8');
      return JSON.parse(initial);
    }
    this.writeAll([]);
    return [];
  }

  /**
   * Filtreleme, arama, sıralama ve sayfalama destekli görev listeleme
   */
  findAll(options = {}) {
    let tasks = this.readAll();

    const {
      status,
      priority,
      assignee,
      keyword,
      sort = 'createdAt',
      order = 'desc',
      page,
      limit
    } = options;

    // 1. Duruma göre filtreleme
    if (status) {
      tasks = tasks.filter(t => t.status && t.status.toLowerCase() === status.toLowerCase());
    }

    // 2. Önceliğe göre filtreleme
    if (priority) {
      tasks = tasks.filter(t => t.priority && t.priority.toLowerCase() === priority.toLowerCase());
    }

    // 3. Kullanıcıya göre filtreleme
    if (assignee) {
      tasks = tasks.filter(t => t.assignee && t.assignee.toLowerCase() === assignee.toLowerCase());
    }

    // 4. Arama (Title veya Description içinde)
    if (keyword) {
      const kw = keyword.toLowerCase();
      tasks = tasks.filter(t =>
        (t.title && t.title.toLowerCase().includes(kw)) ||
        (t.description && t.description.toLowerCase().includes(kw)) ||
        (t.project && t.project.toLowerCase().includes(kw))
      );
    }

    // 5. Sıralama
    const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
    tasks.sort((a, b) => {
      let comparison = 0;
      if (sort === 'priority') {
        const weightA = priorityWeight[(a.priority || '').toLowerCase()] || 0;
        const weightB = priorityWeight[(b.priority || '').toLowerCase()] || 0;
        comparison = weightA - weightB;
      } else if (sort === 'createdAt' || sort === 'updatedAt' || sort === 'dueDate') {
        const dateA = new Date(a[sort] || 0).getTime();
        const dateB = new Date(b[sort] || 0).getTime();
        comparison = dateA - dateB;
      } else if (typeof a[sort] === 'string') {
        comparison = (a[sort] || '').localeCompare(b[sort] || '');
      } else if (typeof a[sort] === 'number') {
        comparison = (a[sort] || 0) - (b[sort] || 0);
      }

      return order.toLowerCase() === 'asc' ? comparison : -comparison;
    });

    const totalItems = tasks.length;

    // 6. Sayfalama (Varsa)
    if (page !== undefined || limit !== undefined) {
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.max(1, parseInt(limit, 10) || 10);
      const startIndex = (pageNum - 1) * limitNum;
      const paginatedTasks = tasks.slice(startIndex, startIndex + limitNum);
      const totalPages = Math.ceil(totalItems / limitNum);

      return {
        data: paginatedTasks,
        pagination: {
          totalItems,
          totalPages,
          currentPage: pageNum,
          limit: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      };
    }

    return {
      data: tasks,
      pagination: {
        totalItems,
        totalPages: 1,
        currentPage: 1,
        limit: totalItems,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }

  /**
   * Belirli bir ID'ye sahip görevi getirir.
   */
  findById(id) {
    const tasks = this.readAll();
    return tasks.find(t => String(t.id) === String(id));
  }

  /**
   * Belirli bir çalışana atanmış görevleri getirir.
   */
  findByAssignee(assignee) {
    if (!assignee) return [];
    const tasks = this.readAll();
    const target = assignee.toLowerCase();
    return tasks.filter(t => t.assignee && t.assignee.toLowerCase() === target);
  }

  /**
   * Başlık veya açıklama alanında arama yapar.
   */
  search(keyword) {
    if (!keyword) return [];
    const tasks = this.readAll();
    const kw = keyword.toLowerCase();
    return tasks.filter(t =>
      (t.title && t.title.toLowerCase().includes(kw)) ||
      (t.description && t.description.toLowerCase().includes(kw)) ||
      (t.project && t.project.toLowerCase().includes(kw))
    );
  }

  /**
   * Yeni bir görev oluşturur.
   */
  create(taskData) {
    const tasks = this.readAll();

    // Yeni benzersiz id üret (En büyük sayısal id + 1)
    let nextId = 1;
    if (tasks.length > 0) {
      const numericIds = tasks
        .map(t => parseInt(t.id, 10))
        .filter(n => !isNaN(n));
      if (numericIds.length > 0) {
        nextId = Math.max(...numericIds) + 1;
      } else {
        nextId = tasks.length + 1;
      }
    }

    const now = new Date().toISOString();

    const newTask = {
      id: String(nextId),
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      status: taskData.status ? taskData.status.toLowerCase() : 'pending',
      priority: taskData.priority ? taskData.priority.toLowerCase() : 'medium',
      assignee: taskData.assignee.trim(),
      project: taskData.project ? taskData.project.trim() : 'Genel Proje',
      createdAt: now,
      updatedAt: now,
      dueDate: taskData.dueDate || null
    };

    tasks.push(newTask);
    this.writeAll(tasks);
    return newTask;
  }

  /**
   * Görevi günceller.
   */
  update(id, updateData) {
    const tasks = this.readAll();
    const taskIndex = tasks.findIndex(t => String(t.id) === String(id));

    if (taskIndex === -1) {
      return null;
    }

    const existingTask = tasks[taskIndex];
    const now = new Date().toISOString();

    const updatedTask = {
      ...existingTask,
      ...(updateData.title !== undefined && { title: updateData.title.trim() }),
      ...(updateData.description !== undefined && { description: updateData.description.trim() }),
      ...(updateData.status !== undefined && { status: updateData.status.toLowerCase() }),
      ...(updateData.priority !== undefined && { priority: updateData.priority.toLowerCase() }),
      ...(updateData.assignee !== undefined && { assignee: updateData.assignee.trim() }),
      ...(updateData.project !== undefined && { project: updateData.project.trim() }),
      ...(updateData.dueDate !== undefined && { dueDate: updateData.dueDate }),
      updatedAt: now
    };

    tasks[taskIndex] = updatedTask;
    this.writeAll(tasks);
    return updatedTask;
  }

  /**
   * Görevi siler.
   */
  delete(id) {
    const tasks = this.readAll();
    const taskIndex = tasks.findIndex(t => String(t.id) === String(id));

    if (taskIndex === -1) {
      return null;
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    this.writeAll(tasks);
    return deletedTask;
  }

  /**
   * İstatistik ve Raporlama Verileri
   */
  getStatistics() {
    const tasks = this.readAll();
    const total = tasks.length;

    const completedTasks = tasks.filter(t => (t.status || '').toLowerCase() === 'completed');
    const pendingTasks = tasks.filter(t => (t.status || '').toLowerCase() === 'pending');
    const inProgressTasks = tasks.filter(t => (t.status || '').toLowerCase() === 'in_progress');

    // Öncelik dağılımı
    const priorityDistribution = {
      critical: tasks.filter(t => (t.priority || '').toLowerCase() === 'critical').length,
      high: tasks.filter(t => (t.priority || '').toLowerCase() === 'high').length,
      medium: tasks.filter(t => (t.priority || '').toLowerCase() === 'medium').length,
      low: tasks.filter(t => (t.priority || '').toLowerCase() === 'low').length
    };

    // Çalışan dağılımı
    const assigneeDistribution = {};
    tasks.forEach(t => {
      const name = (t.assignee || 'Atanmamış').toLowerCase();
      assigneeDistribution[name] = (assigneeDistribution[name] || 0) + 1;
    });

    // Proje dağılımı
    const projectDistribution = {};
    tasks.forEach(t => {
      const proj = t.project || 'Genel Proje';
      projectDistribution[proj] = (projectDistribution[proj] || 0) + 1;
    });

    const completionRate = total > 0 ? Number(((completedTasks.length / total) * 100).toFixed(1)) : 0;

    return {
      totalTasks: total,
      completedCount: completedTasks.length,
      pendingCount: pendingTasks.length,
      inProgressCount: inProgressTasks.length,
      completionRate: `${completionRate}%`,
      priorityDistribution,
      assigneeDistribution,
      projectDistribution,
      completedTasks,
      pendingTasks
    };
  }
}

module.exports = new TaskModel();

