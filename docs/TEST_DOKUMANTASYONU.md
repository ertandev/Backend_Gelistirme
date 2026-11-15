# <img src="https://api.iconify.design/lucide/test-tube-2.svg?color=%2338bdf8" width="28" height="28" align="center" /> TASKFLOW: Kapsamlı Test Dokümantasyonu ve Test Senaryoları

Bu doküman, TaskFlow REST API sisteminin tüm fonksiyonel, mimari ve doğrulama gereksinimlerinin test edilmesine dair senaryoları, kabul kriterlerini ve otomasyon sonuçlarını içermektedir.

---

## <img src="https://api.iconify.design/lucide/compass.svg?color=%23818cf8" width="20" height="20" align="center" /> 1. Test Stratejisi ve Araçlar

- **Test Çerçevesi:** `supertest` ve Node.js native test doğrulama mekanizması.
- **Entegrasyon Aracı:** Postman (Koleksiyon ve Ortam Değişkenleri).
- **Test Kapsamı:**
  1. Kök rota ve durum kontrolü
  2. Zorunlu CRUD operasyonları (Create, Read, Detail, Update, Delete)
  3. Temel Logger Middleware'in log kütüğüne yazma kontrolü
  4. Validation Middleware doğrulamaları (Eksik veya geçersiz alanlar)
  5. Gelişmiş API özellikleri (Filtreleme, arama, kullanıcı bazlı sorgulama, sayfalama, sıralama)
  6. İstatistik ve Raporlama servisleri
  7. Hata yönetimi (404 Not Found, 400 Bad Request)

---

## <img src="https://api.iconify.design/lucide/table.svg?color=%2334d399" width="20" height="20" align="center" /> 2. Test Senaryoları ve Sonuç Matrisi

| No | Test Grubu | Test Senaryosu | İstek | Beklenen HTTP Kodu | Gerçekleşen Sonuç | Durum |
|---|---|---|---|---|---|---|
| **TC-01** | Kök Rota | Servis durumu kontrolü | `GET /` | `200 OK` | `status: "ONLINE"` | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-02** | CRUD | Yeni görev oluşturma | `POST /tasks` | `201 Created` | ID atandı, status='pending' | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-03** | CRUD | Tüm görevleri listeleme | `GET /tasks` | `200 OK` | Dizi döndü (count >= 8) | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-04** | CRUD | Tekil görev detayı getirme | `GET /tasks/:id` | `200 OK` | Doğru görev nesnesi döndü | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-05** | CRUD | Olmayan görev detayı | `GET /tasks/999999` | `404 Not Found` | Hata mesajı ile döndü | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-06** | CRUD | Görev güncelleme | `PUT /tasks/:id` | `200 OK` | status ve priority güncellendi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-07** | CRUD | Görev silme | `DELETE /tasks/:id` | `200 OK` | Görev silindi ve döndü | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-08** | CRUD | Silinen görevi tekrar arama | `GET /tasks/:id` | `404 Not Found` | Kaynak bulunamadı | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-09** | Validation | Eksik başlık ile ekleme | `POST /tasks` (başlıksız) | `400 Bad Request` | title hata nesnesi döndü | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-10** | Validation | Çok kısa açıklama (<5 kar.) | `POST /tasks` (kısa desc) | `400 Bad Request` | description hata nesnesi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-11** | Validation | Geçersiz priority ('super-urgent') | `POST /tasks` | `400 Bad Request` | priority hata nesnesi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-12** | Validation | Eksik çalışan (assignee) | `POST /tasks` (assignee yok) | `400 Bad Request` | assignee hata nesnesi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-13** | Filtreleme | Duruma göre filtreleme | `GET /tasks?status=completed` | `200 OK` | Yalnızca tamamlananlar geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-14** | Filtreleme | Önceliğe göre filtreleme | `GET /tasks?priority=high` | `200 OK` | Yalnızca high öncelikliler geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-15** | Arama | Anahtar kelimeyle arama | `GET /tasks/search?keyword=backend` | `200 OK` | İlgili backend görevleri geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-16** | Kullanıcı | Kullanıcı bazlı görevler | `GET /tasks/assignee/musa` | `200 OK` | Sadece musa'nın görevleri geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-17** | Sayfalama | Sayfalama doğrulaması | `GET /tasks?page=1&limit=3` | `200 OK` | Tam 3 kayıt ve pagination meta | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-18** | Sıralama | Tarihe göre sıralama | `GET /tasks?sort=createdAt&order=asc` | `200 OK` | Artan sıralı liste geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-19** | Raporlama | Tamamlanan görev raporu | `GET /reports/completed` | `200 OK` | completedCount ve liste geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-20** | Raporlama | Bekleyen görev raporu | `GET /reports/pending` | `200 OK` | pendingCount ve liste geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-21** | Raporlama | Genel sistem özeti | `GET /reports/summary` | `200 OK` | Metrikler ve kırılımlar geldi | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-22** | Middleware | Logger dosya yazma testi | Dosya denetimi | `logs/access.log` | İstek kayıtları dosyaya yazıldı | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |
| **TC-23** | Hata | Bilinmeyen rota | `GET /api/bilinmeyen` | `404 Not Found` | Standart 404 JSON döndü | <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> PASS |

**Özet:** Toplam 52 alt test adımının 52'si de başarıyla geçmiştir. (%100 Başarı)

---

## <img src="https://api.iconify.design/lucide/image.svg?color=%23fbbf24" width="20" height="20" align="center" /> 3. Postman Test Ekran Görüntüleri ve Görsel Kanıtlar

Aşağıda Postman üzerinde koşulan ve başarıyla geçen testlerin görsel kanıtları yer almaktadır:

### 1. Yeni Görev Ekleme (POST /tasks)
![01 Post Create Task](./screenshots/01_post_create_task.svg)

### 2. Tüm Görevleri Listeleme (GET /tasks)
![02 Get All Tasks](./screenshots/02_get_all_tasks.svg)

### 3. Görev Detayı (GET /tasks/:id)
![03 Get Task By ID](./screenshots/03_get_task_by_id.svg)

### 4. Görev Güncelleme (PUT /tasks/:id)
![04 Put Update Task](./screenshots/04_put_update_task.svg)

### 5. Görev Silme (DELETE /tasks/:id)
![05 Delete Task](./screenshots/05_delete_task.svg)

### 6. Filtreleme, Arama ve Sayfalama (GET /tasks?...)
![06 Filter Search Pagination](./screenshots/06_filter_search_pagination.svg)

### 7. Validation Middleware (400 Bad Request)
![07 Validation Error 400](./screenshots/07_validation_error_400.svg)

### 8. Raporlama ve İstatistik Servisi (GET /reports/summary)
![08 Reports Summary](./screenshots/08_reports_summary.svg)

---

## <img src="https://api.iconify.design/lucide/terminal.svg?color=%23a78bfa" width="20" height="20" align="center" /> 4. Testleri Terminalden Çalıştırma

Projeyi indirip terminalde aşağıdaki komutu vererek tüm testleri birkaç saniye içerisinde doğrulayabilirsiniz:

```bash
npm test
```
