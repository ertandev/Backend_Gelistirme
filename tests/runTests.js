const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../src/app');
const taskModel = require('../src/models/taskModel');
const config = require('../src/config/config');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS:\x1b[0m ${testName}`);
  } else {
    failedTests++;
    console.error(`  \x1b[31m✘ FAIL:\x1b[0m ${testName}`);
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('🧪 TASKFLOW API TEST SÜRECİ BAŞLATILIYOR...');
  console.log('======================================================\n');

  // Test öncesi mock verileri sıfırla
  taskModel.resetData();

  try {
    // ------------------------------------------------------------------
    console.log('\x1b[34m[TEST GRUBU 1]\x1b[0m Temel Kök Rota');
    // ------------------------------------------------------------------
    const rootRes = await request(app).get('/');
    assert(rootRes.status === 200, 'GET / 200 OK dönmelidir');
    assert(rootRes.body.project.includes('TASKFLOW'), 'GET / TaskFlow proje başlığını içermelidir');
    assert(rootRes.body.status === 'ONLINE', 'GET / servis durumu ONLINE olmalıdır');

    // ------------------------------------------------------------------
    console.log('\n\x1b[34m[TEST GRUBU 2]\x1b[0m CRUD Operasyonları (Zorunlu Aşama 3)');
    // ------------------------------------------------------------------
    // 2.1 Ekleme (POST /tasks)
    const newTaskPayload = {
      title: 'Docker ve CI/CD Pipeline Kurulumu',
      description: 'GitHub Actions ile otomatik test ve Docker imaj dağıtım sürecini hazırla.',
      priority: 'high',
      assignee: 'musa',
      project: 'DevOps & Deployment'
    };
    const createRes = await request(app)
      .post('/tasks')
      .send(newTaskPayload);

    assert(createRes.status === 201, 'POST /tasks yeni görev oluşturulduğunda 201 Created dönmelidir');
    assert(createRes.body.data && createRes.body.data.id !== undefined, 'POST /tasks oluşturulan göreve ID atamalıdır');
    assert(createRes.body.data.status === 'pending', 'POST /tasks varsayılan durumu pending yapmalıdır');
    const createdId = createRes.body.data.id;

    // 2.2 Listeleme (GET /tasks)
    const listRes = await request(app).get('/tasks');
    assert(listRes.status === 200, 'GET /tasks 200 OK dönmelidir');
    assert(Array.isArray(listRes.body.data), 'GET /tasks veri dizisi döndürmelidir');
    assert(listRes.body.data.length >= 8, 'GET /tasks en az başlangıç veri sayısı kadar görev listelemelidir');

    // 2.3 Detay (GET /tasks/:id)
    const detailRes = await request(app).get(`/tasks/${createdId}`);
    assert(detailRes.status === 200, `GET /tasks/${createdId} 200 OK dönmelidir`);
    assert(detailRes.body.data.title === newTaskPayload.title, 'GET /tasks/:id doğru görev başlığını getirmelidir');

    // 2.4 Olmayan ID Detayı (GET /tasks/999999)
    const notFoundDetail = await request(app).get('/tasks/999999');
    assert(notFoundDetail.status === 404, 'GET /tasks/999999 404 Not Found dönmelidir');
    assert(notFoundDetail.body.success === false, 'GET /tasks/999999 success: false dönmelidir');

    // 2.5 Güncelleme (PUT /tasks/:id)
    const updatePayload = {
      status: 'in_progress',
      priority: 'critical',
      description: 'GitHub Actions ve Kubernetes üzerinde test dağıtımları gerçekleştiriliyor.'
    };
    const updateRes = await request(app)
      .put(`/tasks/${createdId}`)
      .send(updatePayload);

    assert(updateRes.status === 200, `PUT /tasks/${createdId} 200 OK dönmelidir`);
    assert(updateRes.body.data.status === 'in_progress', 'PUT /tasks/:id durumu in_progress yapmalıdır');
    assert(updateRes.body.data.priority === 'critical', 'PUT /tasks/:id önceliği critical yapmalıdır');

    // 2.6 Silme (DELETE /tasks/:id)
    const deleteRes = await request(app).delete(`/tasks/${createdId}`);
    assert(deleteRes.status === 200, `DELETE /tasks/${createdId} 200 OK dönmelidir`);
    assert(deleteRes.body.data.id === createdId, 'DELETE /tasks/:id silinen görevi döndürmelidir');

    // Silineni tekrar sorgula
    const checkDeleted = await request(app).get(`/tasks/${createdId}`);
    assert(checkDeleted.status === 404, 'Silinen göreve erişilmek istendiğinde 404 Not Found dönmelidir');

    // ------------------------------------------------------------------
    console.log('\n\x1b[34m[TEST GRUBU 3]\x1b[0m Validation Middleware (İsteğe Bağlı Pratik 2)');
    // ------------------------------------------------------------------
    // 3.1 Başlık eksik
    const valRes1 = await request(app)
      .post('/tasks')
      .send({ description: 'Açıklama mevcut', priority: 'low', assignee: 'musa' });
    assert(valRes1.status === 400, 'Başlık (title) eksik olduğunda 400 Bad Request dönmelidir');
    assert(valRes1.body.errors.some(e => e.field === 'title'), 'Başlık hatası errors dizisinde belirtilmelidir');

    // 3.2 Açıklama çok kısa
    const valRes2 = await request(app)
      .post('/tasks')
      .send({ title: 'Geçerli Başlık', description: 'abc', priority: 'low', assignee: 'musa' });
    assert(valRes2.status === 400, 'Açıklama 5 karakterden kısa olduğunda 400 Bad Request dönmelidir');

    // 3.3 Geçersiz Öncelik
    const valRes3 = await request(app)
      .post('/tasks')
      .send({ title: 'Geçerli Başlık', description: 'Geçerli bir açıklama metni', priority: 'super-urgent', assignee: 'musa' });
    assert(valRes3.status === 400, 'Geçersiz priority girildiğinde 400 Bad Request dönmelidir');

    // 3.4 Atanan kişi eksik
    const valRes4 = await request(app)
      .post('/tasks')
      .send({ title: 'Geçerli Başlık', description: 'Geçerli bir açıklama metni', priority: 'medium' });
    assert(valRes4.status === 400, 'Atanan çalışan (assignee) eksik olduğunda 400 Bad Request dönmelidir');

    // ------------------------------------------------------------------
    console.log('\n\x1b[34m[TEST GRUBU 4]\x1b[0m Gelişmiş API Özellikleri (İsteğe Bağlı Pratik 1)');
    // ------------------------------------------------------------------
    // 4.1 Duruma Göre Filtreleme: GET /tasks?status=completed
    const statusFilterRes = await request(app).get('/tasks?status=completed');
    assert(statusFilterRes.status === 200, 'GET /tasks?status=completed 200 OK dönmelidir');
    const allCompleted = statusFilterRes.body.data.every(t => t.status === 'completed');
    assert(allCompleted && statusFilterRes.body.data.length > 0, 'status=completed sadece tamamlananları getirmelidir');

    // 4.2 Önceliğe Göre Filtreleme: GET /tasks?priority=high
    const priorityFilterRes = await request(app).get('/tasks?priority=high');
    assert(priorityFilterRes.status === 200, 'GET /tasks?priority=high 200 OK dönmelidir');
    const allHigh = priorityFilterRes.body.data.every(t => t.priority === 'high');
    assert(allHigh && priorityFilterRes.body.data.length > 0, 'priority=high sadece yüksek öncelikli görevleri getirmelidir');

    // 4.3 Görev Arama: GET /tasks/search?keyword=backend
    const searchRes = await request(app).get('/tasks/search?keyword=backend');
    assert(searchRes.status === 200, 'GET /tasks/search?keyword=backend 200 OK dönmelidir');
    assert(searchRes.body.data.length > 0, 'backend anahtar kelimesi için sonuçlar dönmelidir');

    // 4.4 Kullanıcı Bazlı Listeleme: GET /tasks/assignee/musa
    const userRes = await request(app).get('/tasks/assignee/musa');
    assert(userRes.status === 200, 'GET /tasks/assignee/musa 200 OK dönmelidir');
    const allMusa = userRes.body.data.every(t => t.assignee.toLowerCase() === 'musa');
    assert(allMusa && userRes.body.data.length > 0, 'assignee/musa sadece musa ya ait görevleri getirmelidir');

    // 4.5 Sayfalama: GET /tasks?page=1&limit=3
    const pageRes = await request(app).get('/tasks?page=1&limit=3');
    assert(pageRes.status === 200, 'GET /tasks?page=1&limit=3 200 OK dönmelidir');
    assert(pageRes.body.data.length === 3, 'limit=3 ile sayfada tam 3 kayıt gelmelidir');
    assert(pageRes.body.pagination.currentPage === 1, 'Mevcut sayfa 1 olmalıdır');
    assert(pageRes.body.pagination.hasNextPage === true, 'Sonraki sayfa olmalıdır');

    // 4.6 Sıralama: GET /tasks?sort=createdAt&order=asc
    const sortRes = await request(app).get('/tasks?sort=createdAt&order=asc');
    assert(sortRes.status === 200, 'GET /tasks?sort=createdAt&order=asc 200 OK dönmelidir');
    const firstDate = new Date(sortRes.body.data[0].createdAt).getTime();
    const lastDate = new Date(sortRes.body.data[sortRes.body.data.length - 1].createdAt).getTime();
    assert(firstDate <= lastDate, 'Artan tarihe göre sıralama doğru çalışmalıdır');

    // ------------------------------------------------------------------
    console.log('\n\x1b[34m[TEST GRUBU 5]\x1b[0m Raporlama Servisleri (İsteğe Bağlı Pratik 3)');
    // ------------------------------------------------------------------
    // 5.1 Tamamlanan Görev Sayısı: GET /reports/completed
    const repCompletedRes = await request(app).get('/reports/completed');
    assert(repCompletedRes.status === 200, 'GET /reports/completed 200 OK dönmelidir');
    assert(repCompletedRes.body.reportType === 'COMPLETED_TASKS', 'Rapor tipi COMPLETED_TASKS olmalıdır');
    assert(typeof repCompletedRes.body.summary.completedCount === 'number', 'Tamamlanan sayı sayısal olmalıdır');

    // 5.2 Bekleyen Görev Sayısı: GET /reports/pending
    const repPendingRes = await request(app).get('/reports/pending');
    assert(repPendingRes.status === 200, 'GET /reports/pending 200 OK dönmelidir');
    assert(repPendingRes.body.reportType === 'PENDING_TASKS', 'Rapor tipi PENDING_TASKS olmalıdır');
    assert(typeof repPendingRes.body.summary.pendingCount === 'number', 'Bekleyen sayısı sayısal olmalıdır');

    // 5.3 Genel Sistem Özeti: GET /reports/summary
    const repSummaryRes = await request(app).get('/reports/summary');
    assert(repSummaryRes.status === 200, 'GET /reports/summary 200 OK dönmelidir');
    assert(repSummaryRes.body.metrics.totalTasks > 0, 'Toplam görev sayısı 0 dan büyük olmalıdır');
    assert(repSummaryRes.body.breakdowns.byPriority !== undefined, 'Öncelik dağılımı mevcut olmalıdır');
    assert(repSummaryRes.body.breakdowns.byAssignee !== undefined, 'Çalışan dağılımı mevcut olmalıdır');

    // ------------------------------------------------------------------
    console.log('\n\x1b[34m[TEST GRUBU 6]\x1b[0m Temel Logger Middleware Doğrulaması');
    // ------------------------------------------------------------------
    assert(fs.existsSync(config.logFilePath), 'logs/access.log dosyası oluşturulmuş olmalıdır');
    const logContent = fs.readFileSync(config.logFilePath, 'utf8');
    assert(logContent.includes('GET /tasks') || logContent.includes('POST /tasks'), 'Log dosyasında API istekleri yer almalıdır');

    // ------------------------------------------------------------------
    console.log('\n\x1b[34m[TEST GRUBU 7]\x1b[0m Hata Yönetimi (404 Not Found)');
    // ------------------------------------------------------------------
    const notFoundRoute = await request(app).get('/api/bilinmeyen-rota');
    assert(notFoundRoute.status === 404, 'Var olmayan rota için 404 dönmelidir');
    assert(notFoundRoute.body.success === false, 'Hata yanıtı success: false içermelidir');

    console.log('\n======================================================');
    console.log(`📊 TEST SONUÇLARI:`);
    console.log(`   Toplam Test : ${totalTests}`);
    console.log(`   \x1b[32mBaşarılı    : ${passedTests}\x1b[0m`);
    console.log(`   \x1b[31mBaşarısız   : ${failedTests}\x1b[0m`);
    console.log('======================================================\n');

    if (failedTests > 0) {
      process.exit(1);
    } else {
      console.log('🎉 TÜM TESTLER BAŞARIYLA GEÇTİ! (100% SUCCESS)\n');
      process.exit(0);
    }
  } catch (err) {
    console.error('Testler çalışırken beklenmeyen hata:', err);
    process.exit(1);
  }
}

runTestSuite();

