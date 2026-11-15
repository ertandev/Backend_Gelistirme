# <img src="https://api.iconify.design/lucide/workflow.svg?color=%2338bdf8" width="28" height="28" align="center" /> TASKFLOW — Görev ve Proje Yönetim Sistemi REST API

![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-v4.21-lightgrey.svg)
![Architecture](https://img.shields.io/badge/Architecture-RESTful%20Layered-blue.svg)
![Tests](https://img.shields.io/badge/Tests-52%20Passing%20%7C%20100%25-brightgreen.svg)
![License](https://img.shields.io/badge/License-MIT-orange.svg)

> **Node.js ile Backend Programlama Eğitimi — Bitirme Projesi (2026)**  
> Bu proje; modern bir yazılım şirketinde ekiplerin görevlerini, projelerini ve çalışan sorumluluklarını merkezi olarak takip etmek için geliştirilmiş katmanlı, modüler ve yüksek kaliteli bir **REST API** backend sistemidir.

---

## <img src="https://api.iconify.design/lucide/sparkles.svg?color=%23818cf8" width="20" height="20" align="center" /> Proje Genel Bakış ve Kazanılan Yetkinlikler

Bu projede eğitim kapsamındaki tüm zorunlu isterler ve isteğe bağlı ileri seviye pratikler eksiksiz olarak hayata geçirilmiştir:

- <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> **Aşama 01:** İhtiyaç Analizi, Senaryo ve Sistem Mimarisi Tasarımı
- <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> **Aşama 02:** Express.js ve Modüler Routing Altyapısı
- <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> **Aşama 03:** Tam Kapsamlı CRUD Operasyonları ve Temel Logger Middleware
- <img src="https://api.iconify.design/lucide/check-circle-2.svg?color=%2334d399" width="16" height="16" align="center" /> **Aşama 04:** Postman Testleri, Ekran Görüntüleri ve Dokümantasyon Seti
- <img src="https://api.iconify.design/lucide/star.svg?color=%23fbbf24" width="16" height="16" align="center" /> **İsteğe Bağlı 01:** Gelişmiş Filtreleme (`status`, `priority`), Arama (`/tasks/search`), Kullanıcı Bazlı Listeleme (`/tasks/assignee/:assignee`), Sayfalama (`page`, `limit`) ve Sıralama (`sort`, `order`)
- <img src="https://api.iconify.design/lucide/star.svg?color=%23fbbf24" width="16" height="16" align="center" /> **İsteğe Bağlı 02:** Gelişmiş Doğrulama (Validation) Middleware'i (`title`, `description`, `priority`, `assignee` kontrolleri ve 400 Bad Request)
- <img src="https://api.iconify.design/lucide/star.svg?color=%23fbbf24" width="16" height="16" align="center" /> **İsteğe Bağlı 03:** Raporlama ve İstatistik Servisleri (`/reports/completed`, `/reports/pending`, `/reports/summary`)
- <img src="https://api.iconify.design/lucide/star.svg?color=%23fbbf24" width="16" height="16" align="center" /> **İsteğe Bağlı 04:** Kapsamlı Dokümantasyon Seti (API Dokümanı, Test Dokümanı, Kullanım Kılavuzu)

---

## <img src="https://api.iconify.design/lucide/folder-tree.svg?color=%2338bdf8" width="20" height="20" align="center" /> Proje Dizin Yapısı

```
taskflow-api/
├── .env                              # Ortam değişkenleri yapılandırması
├── .env.example                      # Ortam değişkenleri şablonu
├── .gitignore                         # Git dışlama kuralları
├── package.json                      # Bağımlılıklar ve npm scriptleri
├── README.md                         # Kurulum ve başlangıç kılavuzu
├── docs/                             # Dokümantasyon Seti
│   ├── PROJE_TANIMI.md               # 1-2 sayfalık Proje Tanıtım Dokümanı
│   ├── VERI_MODELI.md                # Veri Şeması ve Kısıtlar Tasarımı
│   ├── API_DOKUMANTASYONU.md         # Tüm uç noktaların detaylı kılavuzu
│   ├── TEST_DOKUMANTASYONU.md        # Yazılı test senaryoları ve matrisi
│   ├── KULLANIM_KILAVUZU.md          # İstemci entegrasyon kılavuzu (Fetch, Axios, React)
│   └── screenshots/                  # Postman Test Kanıtları & Raporu
│       ├── 01_post_create_task.svg   # POST /tasks ekran kanıtı
│       ├── 02_get_all_tasks.svg      # GET /tasks ekran kanıtı
│       ├── 03_get_task_by_id.svg     # GET /tasks/:id ekran kanıtı
│       ├── 04_put_update_task.svg    # PUT /tasks/:id ekran kanıtı
│       ├── 05_delete_task.svg        # DELETE /tasks/:id ekran kanıtı
│       ├── 06_filter_search_pagination.svg # Filtreleme ve arama kanıtı
│       ├── 07_validation_error_400.svg# 400 Bad Request kanıtı
│       ├── 08_reports_summary.svg    # Raporlama servisi kanıtı
│       └── postman_test_report.html  # Görsel HTML Test Raporu
├── postman/                          # Postman Koleksiyonu ve Ortam Dosyaları
│   ├── TaskFlow_API.postman_collection.json
│   └── TaskFlow_API.postman_environment.json
├── src/                              # Kaynak Kodlar
│   ├── app.js                        # Express uygulaması ve genel middleware yapılandırması
│   ├── server.js                     # Sunucu başlatıcı (Port dinleme, Graceful shutdown)
│   ├── config/                       # Yapılandırma ve ortam değişkenleri
│   │   └── config.js
│   ├── controllers/                  # İstek ve yanıt denetleyicileri
│   │   ├── taskController.js         # Görev yönetimi iş mantığı
│   │   └── reportController.js       # İstatistik ve raporlama mantığı
│   ├── middlewares/                  # Ara yazılımlar
│   │   ├── loggerMiddleware.js       # Temel Logger (Konsol + access.log)
│   │   ├── validationMiddleware.js   # Veri doğrulama katmanı (400)
│   │   └── errorHandler.js           # 404 ve 500 merkezi hata yönetimi
│   ├── models/                       # Veri modeli ve dosya I/O katmanı
│   │   └── taskModel.js              # JSON dosya yönetimi ve sorgulama
│   ├── routes/                       # Modüler yönlendirme rotaları
│   │   ├── index.js                  # Ana yönlendirici ve servis kökü
│   │   ├── taskRoutes.js             # /tasks rotaları
│   │   └── reportRoutes.js           # /reports rotaları
│   └── data/                         # Veri tabanı deposu
│       ├── initialTasks.json         # Başlangıç tohum verileri
│       └── tasks.json                # Çalışma zamanı veri tabanı (otomatik oluşur)
├── tests/                            # Otomatik Test Süitleri
│   ├── runTests.js                   # 52 test adımı koşan Supertest süiti
│   └── generateTestScreenshots.js    # Postman UI test kanıtı üreteci
└── logs/                             # Log Kütükleri
    ├── access.log                    # İstek logları (zaman damgası, metot, URL, süre)
    └── .gitkeep
```

---

## <img src="https://api.iconify.design/lucide/wrench.svg?color=%2338bdf8" width="20" height="20" align="center" /> Kurulum Notu (Adım Adım Çalıştırma Kılavuzu)

Sistemi yerel makinenizde çalıştırmak için aşağıdaki adımları sırasıyla uygulayınız:

### 1. Gereksinimler
- **Node.js:** v18.0.0 veya üzeri (v20+ tavsiye edilir)
- **NPM:** v9.0.0 veya üzeri

### 2. Bağımlılıkları Yükleme
Terminalde proje ana dizinine geçin ve bağımlılıkları indirin:
```bash
npm install
```

### 3. Çevre Değişkenleri (.env) Yapılandırması
Varsayılan ayarlarla çalışmak için `.env.example` dosyasını `.env` olarak kopyalayabilirsiniz (Halihazırda oluşturulmuştur):
```bash
cp .env.example .env
```

İçerik:
```env
PORT=3000
NODE_ENV=development
```

### 4. Sunucuyu Başlatma
Geliştirme modunda (dosya değişikliklerinde otomatik yeniden başlatmalı) çalıştırmak için:
```bash
npm run dev
```

Standart üretim modunda başlatmak için:
```bash
npm start
```

Sunucu açıldığında konsolda aşağıdaki bildirim belirecektir:
```
  ======================================================
  🚀 TASKFLOW API SUNUCUSU AKTİF!
  ======================================================
  📍 Ortam      : development
  🌐 Port       : 3000
  🔗 Ana Sayfa  : http://localhost:3000/
  📋 Görevler   : http://localhost:3000/tasks
  📊 Raporlar   : http://localhost:3000/reports/summary
  📂 Log Dosyası: .../logs/access.log
  ======================================================
```

---

## <img src="https://api.iconify.design/lucide/test-tube-2.svg?color=%23a78bfa" width="20" height="20" align="center" /> Testlerin Çalıştırılması (Automated Test Suite)

Sistemdeki tüm endpoint'leri, validation kurallarını, logger middleware'ini ve raporlama servislerini otomatik test etmek için:

```bash
npm test
```

Bu komut `tests/runTests.js` dosyasını çalıştırır ve **52 test adımını** saniyeler içinde doğrulayarak sonuç tablosunu üretir:

```
======================================================
📊 TEST SONUÇLARI:
   Toplam Test : 52
   Başarılı    : 52
   Başarısız   : 0
======================================================
🎉 TÜM TESTLER BAŞARIYLA GEÇTİ! (100% SUCCESS)
```

---

## <img src="https://api.iconify.design/lucide/radio.svg?color=%2338bdf8" width="20" height="20" align="center" /> API Uç Noktaları (Endpoint Tablosu)

| Metot | Endpoint | Açıklama | Örnek Parametre |
|---|---|---|---|
| `GET` | `/` | API durum kontrolü ve servis fihristi | - |
| `POST` | `/tasks` | Yeni görev ekleme (Validation kurallı) | Body: `title, description, priority, assignee` |
| `GET` | `/tasks` | Görevleri listeleme (Filtreleme & Sayfalama) | `?status=completed&priority=high&page=1&limit=5` |
| `GET` | `/tasks/:id` | Görev detayı sorgulama | `/tasks/1` |
| `PUT` | `/tasks/:id` | Görev güncelleme | Body: `status, priority, description...` |
| `DELETE` | `/tasks/:id` | Görev silme | `/tasks/1` |
| `GET` | `/tasks/search` | Görev arama (başlık ve açıklamada) | `?keyword=backend` |
| `GET` | `/tasks/assignee/:assignee` | Çalışana göre görev listeleme | `/tasks/assignee/musa` |
| `GET` | `/reports/completed` | Tamamlanan görev sayısı ve listesi | - |
| `GET` | `/reports/pending` | Bekleyen görev sayısı ve listesi | - |
| `GET` | `/reports/summary` | Genel sistem metrikleri ve kırılımları | - |
| `POST` | `/tasks/reset` | Veri tabanını mock verilere sıfırlama | - |

*(Not: Tüm rotalara aynı zamanda `/api/v1/tasks` ve `/api/v1/reports` önekleriyle de erişilebilir.)*

---

## <img src="https://api.iconify.design/lucide/send.svg?color=%23fbbf24" width="20" height="20" align="center" /> Postman Koleksiyonu ve Kullanımı

Kapsamlı test senaryolarını ve assertion kodlarını içeren Postman koleksiyonu `postman/` klasöründedir:
- **Koleksiyon Dosyası:** `postman/TaskFlow_API.postman_collection.json`
- **Ortam Dosyası:** `postman/TaskFlow_API.postman_environment.json`

Postman'e import edildikten sonra tek tıklama ile **Runner** üzerinden çalıştırılabilir.

Detaylı görsel test kanıtları için [docs/TEST_DOKUMANTASYONU.md](docs/TEST_DOKUMANTASYONU.md) ve [docs/screenshots/postman_test_report.html](docs/screenshots/postman_test_report.html) dosyalarını inceleyebilirsiniz.

---

## <img src="https://api.iconify.design/lucide/book-open.svg?color=%23818cf8" width="20" height="20" align="center" /> Detaylı Dokümantasyon Bağlantıları

- [Proje Tanıtım Dokümanı (1-2 Sayfa)](docs/PROJE_TANIMI.md)
- [Veri Modeli ve Şema Tasarımı](docs/VERI_MODELI.md)
- [API Entegrasyon Dokümantasyonu](docs/API_DOKUMANTASYONU.md)
- [Test Dokümantasyonu ve Kanıtlar](docs/TEST_DOKUMANTASYONU.md)
- [İstemci Kullanım Kılavuzu](docs/KULLANIM_KILAVUZU.md)

---

## <img src="https://api.iconify.design/lucide/file-text.svg?color=%2394a3b8" width="20" height="20" align="center" /> Geliştirici ve Lisans

- **Geliştirici:** ertandev
- **Tarih:** 2026
- **Lisans:** MIT Lisansı ile korunmaktadır.
