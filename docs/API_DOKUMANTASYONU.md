# <img src="https://api.iconify.design/lucide/book-open.svg?color=%2338bdf8" width="28" height="28" align="center" /> TASKFLOW REST API: Uç Nokta (Endpoint) ve Entegrasyon Dokümantasyonu

**Temel URL:** `http://localhost:3000` (veya `http://localhost:3000/api/v1`)  
**İçerik Türü (Content-Type):** `application/json`

---

## <img src="https://api.iconify.design/lucide/table.svg?color=%23818cf8" width="20" height="20" align="center" /> Genel Bakış ve Uç Nokta Özeti

| Metot | Uç Nokta (Endpoint) | Modül | Açıklama |
|---|---|---|---|
| `GET` | `/` | Sistem | API durum ve servis dizini |
| `POST`| `/tasks` | Görev Yönetimi | Yeni görev oluşturur (Zorunlu CRUD) |
| `GET` | `/tasks` | Görev Yönetimi | Görevleri listeler (Filtreleme, Sıralama, Sayfalama) |
| `GET` | `/tasks/:id` | Görev Yönetimi | Tek bir görevin detayını getirir |
| `PUT` | `/tasks/:id` | Görev Yönetimi | Belirtilen görevi günceller |
| `DELETE` | `/tasks/:id` | Görev Yönetimi | Belirtilen görevi siler |
| `GET` | `/tasks/search?keyword=backend` | Gelişmiş API | Başlık ve açıklamada arama yapar |
| `GET` | `/tasks/assignee/:assignee` | Gelişmiş API | Çalışan adına göre görevleri listeler |
| `GET` | `/reports/completed` | Raporlama | Tamamlanan görev sayısı ve listesi |
| `GET` | `/reports/pending` | Raporlama | Bekleyen görev sayısı ve listesi |
| `GET` | `/reports/summary` | Raporlama | Genel sistem metrikleri ve kırılımları |
| `POST`| `/tasks/reset` | Yardımcı | Mock veritabanını ilk haline döndürür |

---

## <img src="https://api.iconify.design/lucide/check-square.svg?color=%2334d399" width="20" height="20" align="center" /> 1. Görev Yönetim Modülü (CRUD Operasyonları)

### 1.1 Yeni Görev Ekleme
- **URL:** `POST /tasks`
- **Açıklama:** Yeni bir görev oluşturur. Validation middleware ile doğrulanır.
- **İstek Gövdesi (Request Body):**
```json
{
  "title": "Mikroservis Mimarisi Entegrasyonu",
  "description": "Docker container ortamında çalışan servislerin RabbitMQ ile haberleşmesini sağla.",
  "priority": "high",
  "assignee": "musa",
  "project": "Altyapı Modernizasyonu"
}
```
- **Başarılı Yanıt (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Görev başarıyla oluşturuldu.",
  "data": {
    "id": "9",
    "title": "Mikroservis Mimarisi Entegrasyonu",
    "description": "Docker container ortamında çalışan servislerin RabbitMQ ile haberleşmesini sağla.",
    "status": "pending",
    "priority": "high",
    "assignee": "musa",
    "project": "Altyapı Modernizasyonu",
    "createdAt": "2026-11-15T11:15:00.000Z",
    "updatedAt": "2026-11-15T11:15:00.000Z",
    "dueDate": null
  }
}
```
- **Hata Yanıtı (400 Bad Request):**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Doğrulama hatası: Gönderilen alanlar gereksinimleri karşılamıyor.",
  "errors": [
    {
      "field": "title",
      "message": "Görev başlığı (title) zorunludur ve metin olmalıdır."
    }
  ]
}
```

---

### 1.2 Görev Listeleme (Gelişmiş Filtreleme, Sıralama, Sayfalama)
- **URL:** `GET /tasks`
- **Sorgu Parametreleri (Query Parameters):**
  - `status` (örn: `completed`, `pending`, `in_progress`)
  - `priority` (örn: `high`, `medium`, `low`, `critical`)
  - `assignee` (örn: `musa`)
  - `keyword` (örn: `backend`)
  - `sort` (alan adı, varsayılan: `createdAt`)
  - `order` (`asc` veya `desc`, varsayılan: `desc`)
  - `page` (sayfa numarası, örn: `1`)
  - `limit` (sayfa başına kayıt, örn: `10`)
- **Örnek Çağrı:** `GET /tasks?status=completed&priority=high&page=1&limit=5`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Görevler başarıyla listelendi.",
  "count": 1,
  "pagination": {
    "totalItems": 1,
    "totalPages": 1,
    "currentPage": 1,
    "limit": 5,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "filtersApplied": {
    "status": "completed",
    "priority": "high",
    "sort": "createdAt",
    "order": "desc"
  },
  "data": [
    {
      "id": "1",
      "title": "Backend API Mimarisi ve Routing Kurulumu",
      "description": "Express.js kullanarak modüler routing altyapısı ve temel middleware yapılandırmasını tamamla.",
      "status": "completed",
      "priority": "high",
      "assignee": "musa",
      "project": "TaskFlow Core API",
      "createdAt": "2026-11-10T09:00:00.000Z",
      "updatedAt": "2026-11-11T14:30:00.000Z",
      "dueDate": "2026-11-12T18:00:00.000Z"
    }
  ]
}
```

---

### 1.3 Görev Detayı
- **URL:** `GET /tasks/:id`
- **Örnek Çağrı:** `GET /tasks/1`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Görev detayı başarıyla getirildi.",
  "data": {
    "id": "1",
    "title": "Backend API Mimarisi ve Routing Kurulumu",
    "description": "Express.js kullanarak modüler routing altyapısı ve temel middleware yapılandırmasını tamamla.",
    "status": "completed",
    "priority": "high",
    "assignee": "musa",
    "project": "TaskFlow Core API",
    "createdAt": "2026-11-10T09:00:00.000Z",
    "updatedAt": "2026-11-11T14:30:00.000Z",
    "dueDate": "2026-11-12T18:00:00.000Z"
  }
}
```
- **Hata Yanıtı (404 Not Found):**
```json
{
  "success": false,
  "statusCode": 404,
  "message": "ID değeri \"9999\" olan görev bulunamadı."
}
```

---

### 1.4 Görev Güncelleme
- **URL:** `PUT /tasks/:id`
- **Örnek Çağrı:** `PUT /tasks/3`
- **İstek Gövdesi:**
```json
{
  "status": "completed",
  "priority": "critical",
  "description": "JWT yetkilendirme modülü entegrasyonu tamamlandı."
}
```
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Görev başarıyla güncellendi.",
  "data": {
    "id": "3",
    "title": "Kullanıcı Kimlik Doğrulama Servisi Entegrasyonu",
    "description": "JWT yetkilendirme modülü entegrasyonu tamamlandı.",
    "status": "completed",
    "priority": "critical",
    "assignee": "zeynep",
    "project": "Auth Module",
    "createdAt": "2026-11-12T11:00:00.000Z",
    "updatedAt": "2026-11-15T11:20:00.000Z",
    "dueDate": "2026-11-18T18:00:00.000Z"
  }
}
```

---

### 1.5 Görev Silme
- **URL:** `DELETE /tasks/:id`
- **Örnek Çağrı:** `DELETE /tasks/8`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Görev başarıyla sistemden kaldırıldı.",
  "data": {
    "id": "8",
    "title": "API Dokümantasyonu ve Swagger/OpenAPI Hazırlığı",
    "status": "pending",
    "priority": "low",
    "assignee": "elif"
  }
}
```

---

## <img src="https://api.iconify.design/lucide/sparkles.svg?color=%23fbbf24" width="20" height="20" align="center" /> 2. Gelişmiş API Özellikleri

### 2.1 Görev Arama
- **URL:** `GET /tasks/search?keyword=backend`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "\"backend\" anahtar kelimesi ile yapılan arama sonuçları.",
  "keyword": "backend",
  "count": 2,
  "data": [
    {
      "id": "1",
      "title": "Backend API Mimarisi ve Routing Kurulumu",
      "assignee": "musa"
    }
  ]
}
```

### 2.2 Kullanıcı Bazlı Listeleme
- **URL:** `GET /tasks/assignee/:assignee`
- **Örnek Çağrı:** `GET /tasks/assignee/musa`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "\"musa\" adlı çalışana atanmış görevler listelendi.",
  "assignee": "musa",
  "count": 3,
  "data": [
    { "id": "1", "title": "Backend API Mimarisi ve Routing Kurulumu", "status": "completed" },
    { "id": "2", "title": "Veri Doğrulama (Validation) Middleware Geliştirme", "status": "completed" },
    { "id": "6", "title": "Raporlama ve İstatistik Servisleri", "status": "completed" }
  ]
}
```

---

## <img src="https://api.iconify.design/lucide/bar-chart-2.svg?color=%23a78bfa" width="20" height="20" align="center" /> 3. Raporlama Servisleri

### 3.1 Tamamlanan Görevler Raporu
- **URL:** `GET /reports/completed`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "reportType": "COMPLETED_TASKS",
  "generatedAt": "2026-11-15T11:25:00.000Z",
  "summary": {
    "completedCount": 3,
    "totalTasks": 8,
    "completionRate": "37.5%"
  },
  "data": [ ... ]
}
```

### 3.2 Bekleyen Görevler Raporu
- **URL:** `GET /reports/pending`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "reportType": "PENDING_TASKS",
  "generatedAt": "2026-11-15T11:25:00.000Z",
  "summary": {
    "pendingCount": 3,
    "totalTasks": 8,
    "pendingRate": "37.5%"
  },
  "data": [ ... ]
}
```

### 3.3 Genel Sistem Özeti
- **URL:** `GET /reports/summary`
- **Başarılı Yanıt (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "reportType": "GENERAL_SUMMARY",
  "generatedAt": "2026-11-15T11:25:00.000Z",
  "metrics": {
    "totalTasks": 8,
    "completedTasks": 3,
    "pendingTasks": 3,
    "inProgressTasks": 2,
    "completionRate": "37.5%"
  },
  "breakdowns": {
    "byPriority": { "critical": 1, "high": 3, "medium": 2, "low": 2 },
    "byAssignee": { "musa": 3, "zeynep": 1, "ahmet": 1, "elif": 2, "can": 1 },
    "byProject": { "TaskFlow Core API": 3, "Auth Module": 1, "DevOps & Altyapı": 1, "Frontend UI": 1, "QA & Test": 1, "Dokümantasyon": 1 }
  }
}
```
