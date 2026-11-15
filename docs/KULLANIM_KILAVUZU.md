# <img src="https://api.iconify.design/lucide/book-marked.svg?color=%2338bdf8" width="28" height="28" align="center" /> TASKFLOW: İstemci Entegrasyon ve Kullanım Kılavuzu

Bu kılavuz, TaskFlow REST API servislerini web, mobil veya harici mikroservis uygulamalarınıza nasıl entegre edeceğinizi adım adım örneklerle açıklamaktadır.

---

## <img src="https://api.iconify.design/lucide/send.svg?color=%23fbbf24" width="20" height="20" align="center" /> 1. Postman ile Test ve Entegrasyon Adımları

TaskFlow API projesi, hazır bir Postman Koleksiyonu ve Ortam Değişkenleri dosyası ile birlikte gelir.

### Adım 1: Koleksiyonu İçe Aktarma (Import)
1. Postman uygulamasını açın.
2. Sol üstteki **Import** butonuna tıklayın.
3. Proje klasöründeki `postman/TaskFlow_API.postman_collection.json` dosyasını seçip yükleyin.

### Adım 2: Ortam Dosyasını İçe Aktarma
1. Postman'de sağ üstteki **Environments** sekmesine geçin.
2. `postman/TaskFlow_API.postman_environment.json` dosyasını içe aktarın.
3. Aktif ortam olarak **TaskFlow Local Environment** seçeneğini işaretleyin. (`baseUrl: http://localhost:3000`)

### Adım 3: Koleksiyonu Otomatik Koşma (Collection Runner)
1. Koleksiyon üzerine sağ tıklayıp **Run collection** deyin.
2. **Run TaskFlow API** butonuna bastığınızda tüm CRUD, filtreleme, validation ve raporlama istekleri otomatik olarak koşulacak ve yeşil test assertion'ları ile sonuçlanacaktır.

---

## <img src="https://api.iconify.design/lucide/code-2.svg?color=%23818cf8" width="20" height="20" align="center" /> 2. İstemci (Frontend) Entegrasyon Kod Örnekleri

### 2.1 Fetch API ile Yeni Görev Oluşturma (JavaScript)

```javascript
async function createNewTask() {
  const taskData = {
    title: "Kullanıcı Profil Sayfası",
    description: "Avatar yükleme ve şifre değiştirme alanlarını geliştir.",
    priority: "high",
    assignee: "musa",
    project: "Frontend UI"
  };

  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Doğrulama Hatası:', result.errors);
      return;
    }

    console.log('Görev Oluşturuldu:', result.data);
  } catch (error) {
    console.error('Ağ Hatası:', error);
  }
}
```

---

### 2.2 Axios ile Filtreli Görev Listeleme ve Sayfalama

```javascript
import axios from 'axios';

async function fetchCompletedHighPriorityTasks(page = 1, limit = 10) {
  try {
    const response = await axios.get('http://localhost:3000/tasks', {
      params: {
        status: 'completed',
        priority: 'high',
        page: page,
        limit: limit,
        sort: 'createdAt',
        order: 'desc'
      }
    });

    const { data, pagination, count } = response.data;
    console.log(`Toplam bulunan: ${count}`);
    console.log('Sayfalama Bilgisi:', pagination);
    return data;
  } catch (error) {
    if (error.response) {
      console.error('API Hatası:', error.response.data.message);
    }
    throw error;
  }
}
```

---

### 2.3 React Custom Hook Örneği (`useTasks`)

```jsx
import { useState, useEffect } from 'react';

export function useTasks(filters = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams(filters).toString();

    fetch(`http://localhost:3000/tasks?${queryParams}`)
      .then(res => {
        if (!res.ok) throw new Error('Görevler yüklenemedi');
        return res.json();
      })
      .then(json => {
        setTasks(json.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [JSON.stringify(filters)]);

  return { tasks, loading, error };
}
```

---

## <img src="https://api.iconify.design/lucide/terminal.svg?color=%2334d399" width="20" height="20" align="center" /> 3. cURL ile Komut Satırından Hızlı Test

### Görev Listeleme:
```bash
curl -X GET http://localhost:3000/tasks
```

### Görev Arama:
```bash
curl -X GET "http://localhost:3000/tasks/search?keyword=backend"
```

### Sistem Özeti Raporu:
```bash
curl -X GET http://localhost:3000/reports/summary
```

### Yeni Görev Ekleme:
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "cURL ile Görev Ekleme Testi",
    "description": "Terminalden API testi gerçekleştirildi.",
    "priority": "medium",
    "assignee": "ertandev"
  }'
```

---

## <img src="https://api.iconify.design/lucide/refresh-cw.svg?color=%23a78bfa" width="20" height="20" align="center" /> 4. Mock Veritabanını Sıfırlama (Reset Data)

Geliştirme ve test esnasında yapılan değişiklikleri sıfırlayıp fabrika ayarlarına dönmek için:

```bash
# Terminalden:
npm run seed

# Veya doğrudan API üzerinden:
curl -X POST http://localhost:3000/tasks/reset
```
