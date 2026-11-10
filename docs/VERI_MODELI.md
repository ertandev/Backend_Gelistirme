# <img src="https://api.iconify.design/lucide/database.svg?color=%2338bdf8" width="28" height="28" align="center" /> TASKFLOW: Veri Modeli ve Şema Tasarımı

Bu doküman, TaskFlow REST API sisteminde kullanılan veri yapılarını, alan kısıtlarını, veri tiplerini ve iş kurallarını detaylandırmaktadır.

---

## <img src="https://api.iconify.design/lucide/box.svg?color=%23818cf8" width="20" height="20" align="center" /> 1. Görev Varlığı (Task Entity)

Sistemdeki temel varlık `Task` (Görev) nesnesidir. Her görev, bir yazılım projesindeki somut bir iş paketini temsil eder.

### Alanlar ve Kısıtlar Tablosu:

| Alan Adı | Tip | Zorunlu mu? | Varsayılan Değer | Geçerli Değerler / Kısıtlar | Açıklama |
|---|---|---|---|---|---|
| `id` | `String` | Otomatik | Otomatik Artan | Benzersiz string ("1", "2", vb.) | Görevin birincil anahtarı (Primary Key) |
| `title` | `String` | Evet | - | 3 ile 100 karakter arası | Görevin kısa ve net başlığı |
| `description` | `String` | Evet | - | 5 ile 500 karakter arası | Görevin ayrıntılı açıklaması |
| `status` | `String` | Hayır | `"pending"` | `pending`, `in_progress`, `completed` | Görevin mevcut ilerleme durumu |
| `priority` | `String` | Evet | `"medium"` | `low`, `medium`, `high`, `critical` | Görevin iş önceliği seviyesi |
| `assignee` | `String` | Evet | - | 2 ile 50 karakter arası | Görevi üstlenen çalışanın kullanıcı adı/adı |
| `project` | `String` | Hayır | `"Genel Proje"` | En fazla 100 karakter | Görevin bağlı olduğu proje/modül |
| `createdAt` | `String (ISO)`| Otomatik | Mevcut Zaman | ISO 8601 (örn: `2026-11-15T11:00:00.000Z`) | Oluşturulma zaman damgası |
| `updatedAt` | `String (ISO)`| Otomatik | Mevcut Zaman | ISO 8601 | Son güncelleme zaman damgası |
| `dueDate` | `String (ISO)`| Hayır | `null` | ISO 8601 veya `null` | Görevin hedeflenen teslim tarihi |

---

## <img src="https://api.iconify.design/lucide/list-checks.svg?color=%2334d399" width="20" height="20" align="center" /> 2. Durum (Status) ve Öncelik (Priority) Enum Tanımları

### 2.1 Görev Durumları (`status`):
- `pending`: Görev oluşturuldu ancak henüz üzerinde çalışılmaya başlanmadı. (Varsayılan)
- `in_progress`: Görev aktif olarak bir geliştirici tarafından geliştirilmekte.
- `completed`: Görev tamamlandı, test edildi veya kabul edildi.

### 2.2 Görev Öncelikleri (`priority`):
- `low`: Düşük öncelikli; acele gerektirmeyen bakım veya refactor işleri.
- `medium`: Standart öncelikli normal sprint görevleri. (Varsayılan)
- `high`: Yüksek öncelikli; mevcut sürümde mutlaka çıkması gereken işler.
- `critical`: Acil / Kritik müdahale gerektiren blocker veya prodüksiyon hataları.

---

## <img src="https://api.iconify.design/lucide/code.svg?color=%23fbbf24" width="20" height="20" align="center" /> 3. Örnek JSON Nesnesi

```json
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
```

---

## <img src="https://api.iconify.design/lucide/bar-chart-3.svg?color=%23a78bfa" width="20" height="20" align="center" /> 4. İstatistik ve Raporlama Veri Modeli

`GET /reports/summary` uç noktasından dönen toplu veri yapısı:

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
    "byPriority": {
      "critical": 1,
      "high": 3,
      "medium": 2,
      "low": 2
    },
    "byAssignee": {
      "musa": 3,
      "zeynep": 1,
      "ahmet": 1,
      "elif": 2,
      "can": 1
    },
    "byProject": {
      "TaskFlow Core API": 3,
      "Auth Module": 1,
      "DevOps & Altyapı": 1,
      "Frontend UI": 1,
      "QA & Test": 1,
      "Dokümantasyon": 1
    }
  }
}
```
