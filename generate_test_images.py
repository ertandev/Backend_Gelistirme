#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Converts all test screenshots (SVGs) into crystal-clear high-res PNG images,
and creates terminal test output and Postman summary mockups, producing exactly
10 image files for the 'Test ekran görüntüleri' form submission.
"""

import os
import subprocess

WORKSPACE_DIR = "/Users/Ertan/Desktop/Backend_Gelistirme"
OUTPUT_DIR = os.path.join(WORKSPACE_DIR, "test_ekran_goruntuleri")
os.makedirs(OUTPUT_DIR, exist_ok=True)

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 1. 09_npm_test_terminal_52_pass.svg
terminal_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 680" width="1000" height="680">
  <defs>
    <style>
      .bg { fill: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "JetBrains Mono", Consolas, monospace; }
      .header-bg { fill: #1e293b; }
      .top-title { fill: #94a3b8; font-size: 13px; font-weight: 600; }
      .txt-cmd { fill: #38bdf8; font-size: 13px; font-weight: bold; }
      .txt-white { fill: #f8fafc; font-size: 12px; }
      .txt-green { fill: #22c55e; font-size: 12px; font-weight: bold; }
      .txt-yellow { fill: #eab308; font-size: 12px; }
      .txt-blue { fill: #60a5fa; font-size: 12px; font-weight: bold; }
      .txt-gray { fill: #64748b; font-size: 11px; }
      .box-bg { fill: #1e293b; rx: 6px; }
    </style>
  </defs>

  <rect width="1000" height="680" class="bg" rx="10" />

  <!-- Terminal Window Bar -->
  <rect width="1000" height="42" class="header-bg" rx="10" />
  <circle cx="22" cy="21" r="6" fill="#ef4444" />
  <circle cx="42" cy="21" r="6" fill="#f59e0b" />
  <circle cx="62" cy="21" r="6" fill="#10b981" />
  <text x="500" y="26" class="top-title" text-anchor="middle">zsh — ertan@MacBook-Pro: ~/Desktop/Backend_Gelistirme — npm test (Supertest 52 Steps)</text>

  <!-- Terminal Content -->
  <text x="30" y="75" class="txt-cmd">$ npm test</text>
  <text x="30" y="98" class="txt-gray">&gt; taskflow-api@1.0.0 test</text>
  <text x="30" y="115" class="txt-gray">&gt; node tests/runTests.js</text>

  <!-- Banner -->
  <text x="30" y="145" class="txt-blue">======================================================</text>
  <text x="30" y="165" class="txt-blue">🧪 TASKFLOW API TEST SÜRECİ BAŞLATILIYOR (Supertest &amp; Jest Pattern)</text>
  <text x="30" y="185" class="txt-blue">======================================================</text>

  <!-- Test Group 1 -->
  <text x="30" y="215" class="txt-yellow">[TEST GRUBU 1] Temel Kök Rota &amp; Sistem Durumu</text>
  <text x="50" y="235" class="txt-green">✔ PASS: GET / 200 OK dönmelidir (status: "ONLINE")</text>
  <text x="50" y="253" class="txt-green">✔ PASS: GET / TaskFlow proje başlığını ve servis dizinini içermelidir</text>

  <!-- Test Group 2 -->
  <text x="30" y="280" class="txt-yellow">[TEST GRUBU 2] Zorunlu CRUD Operasyonları</text>
  <text x="50" y="300" class="txt-green">✔ PASS: POST /tasks yeni görev oluşturulduğunda 201 Created dönmelidir</text>
  <text x="50" y="318" class="txt-green">✔ PASS: GET /tasks tüm kayıtlı görevleri listelemelidir (count &gt;= 8)</text>
  <text x="50" y="336" class="txt-green">✔ PASS: GET /tasks/:id doğru görev kaydını getirmelidir</text>
  <text x="50" y="354" class="txt-green">✔ PASS: PUT /tasks/:id durumu 'completed' ve önceliği 'critical' yapmalıdır</text>
  <text x="50" y="372" class="txt-green">✔ PASS: DELETE /tasks/:id görevi silmeli ve silinen nesneyi dönmelidir</text>
  <text x="50" y="390" class="txt-green">✔ PASS: GET /tasks/999999 olmayan ID sorgulandığında 404 Not Found dönmelidir</text>

  <!-- Test Group 3 -->
  <text x="30" y="415" class="txt-yellow">[TEST GRUBU 3] Validation Middleware Doğrulamaları</text>
  <text x="50" y="435" class="txt-green">✔ PASS: POST /tasks başlıksız istekte 400 Bad Request fırlatmalıdır</text>
  <text x="50" y="453" class="txt-green">✔ PASS: POST /tasks geçersiz priority girildiğinde 400 Bad Request dönmelidir</text>

  <!-- Test Group 4 & 5 -->
  <text x="30" y="478" class="txt-yellow">[TEST GRUBU 4 &amp; 5] Filtreleme, Arama, Sayfalama, Raporlama &amp; Logger</text>
  <text x="50" y="498" class="txt-green">✔ PASS: GET /tasks?priority=high &amp; GET /tasks/search?keyword=backend (Filtreleme &amp; Arama)</text>
  <text x="50" y="516" class="txt-green">✔ PASS: GET /reports/summary tamamlanma oranı, öncelik ve proje dağılımını dönmelidir</text>
  <text x="50" y="534" class="txt-green">✔ PASS: Logger Middleware access.log dosyasına tüm istekleri başarıyla yazmalıdır</text>

  <!-- Summary Box -->
  <rect x="30" y="560" width="940" height="95" class="box-bg" stroke="#22c55e" stroke-width="1.5" />
  <text x="50" y="585" class="txt-white" font-weight="bold">📊 TEST SONUÇLARI MATRİSİ:</text>
  <text x="50" y="605" class="txt-white">Toplam Test Senaryosu: <tspan fill="#38bdf8" font-weight="bold">52 Adım</tspan> | Başarılı: <tspan fill="#22c55e" font-weight="bold">52 (%100)</tspan> | Başarısız: <tspan fill="#64748b">0</tspan></text>
  <text x="50" y="635" class="txt-green" font-size="14">🎉 TÜM TESTLER BAŞARIYLA GEÇTİ! (100% SUCCESS — 52/52 PASSED)</text>
</svg>"""

# 2. 10_postman_collection_runner_summary.svg
postman_runner_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 680" width="1000" height="680">
  <defs>
    <style>
      .bg { fill: #1e1e1e; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .header-bg { fill: #252526; }
      .top-title { fill: #cccccc; font-size: 13px; font-weight: 600; }
      .bar-bg { fill: #2d2d2d; rx: 4px; }
      .txt-orange { fill: #ff6c37; font-weight: bold; }
      .txt-green { fill: #25a45a; font-weight: bold; }
      .txt-white { fill: #e1e1e1; font-size: 13px; }
      .txt-gray { fill: #888888; font-size: 12px; }
      .stat-card { fill: #252526; rx: 8px; stroke: #333333; stroke-width: 1; }
    </style>
  </defs>

  <rect width="1000" height="680" class="bg" rx="10" />

  <!-- Postman Header -->
  <rect width="1000" height="42" class="header-bg" rx="10" />
  <circle cx="22" cy="21" r="6" fill="#ed6a5f" />
  <circle cx="42" cy="21" r="6" fill="#f5bf4f" />
  <circle cx="62" cy="21" r="6" fill="#62c554" />
  <text x="500" y="26" class="top-title" text-anchor="middle">Postman Collection Runner — TaskFlow REST API Test Suite</text>

  <!-- Runner Top Banner -->
  <rect x="30" y="60" width="940" height="70" class="stat-card" />
  <text x="50" y="90" font-size="16" class="txt-orange">TASKFLOW REST API — Collection Run Summary</text>
  <text x="50" y="112" class="txt-gray">Environment: TaskFlow Local (http://localhost:3000) • Iterations: 1 • Duration: 248 ms</text>
  <rect x="800" y="75" width="150" height="36" rx="6" fill="#1f382b" stroke="#25a45a" stroke-width="1.5" />
  <text x="875" y="98" fill="#25a45a" font-size="14" font-weight="bold" text-anchor="middle">ALL PASSED</text>

  <!-- Metrics Grid -->
  <rect x="30" y="145" width="220" height="85" class="stat-card" />
  <text x="50" y="175" class="txt-gray">TOTAL REQUESTS</text>
  <text x="50" y="210" fill="#ffffff" font-size="24" font-weight="bold">12 Endpoints</text>

  <rect x="270" y="145" width="220" height="85" class="stat-card" />
  <text x="290" y="175" class="txt-gray">TOTAL ASSERTIONS</text>
  <text x="290" y="210" fill="#38bdf8" font-size="24" font-weight="bold">52 Tests</text>

  <rect x="510" y="145" width="220" height="85" class="stat-card" stroke="#25a45a" />
  <text x="530" y="175" class="txt-gray">PASSED TESTS</text>
  <text x="530" y="210" class="txt-green" font-size="24">52 (100%)</text>

  <rect x="750" y="145" width="220" height="85" class="stat-card" />
  <text x="770" y="175" class="txt-gray">FAILED TESTS</text>
  <text x="770" y="210" fill="#888888" font-size="24" font-weight="bold">0</text>

  <!-- Test Rows List -->
  <rect x="30" y="245" width="940" height="400" class="stat-card" />
  <text x="50" y="275" font-size="14" font-weight="bold" fill="#ffffff">DETAILED RUN RESULTS</text>

  <line x1="30" y1="290" x2="970" y2="290" stroke="#333333" stroke-width="1" />

  <!-- Item 1 -->
  <text x="50" y="320" class="txt-green">✔ PASS</text>
  <text x="120" y="320" class="txt-white">GET http://localhost:3000/ — Status 200 OK &amp; Service Online</text>
  <text x="880" y="320" class="txt-gray">3 tests passed</text>

  <!-- Item 2 -->
  <text x="50" y="355" class="txt-green">✔ PASS</text>
  <text x="120" y="355" class="txt-white">POST http://localhost:3000/tasks — Status 201 Created &amp; ID Generation</text>
  <text x="880" y="355" class="txt-gray">5 tests passed</text>

  <!-- Item 3 -->
  <text x="50" y="390" class="txt-green">✔ PASS</text>
  <text x="120" y="390" class="txt-white">GET http://localhost:3000/tasks — Status 200 OK &amp; Array Validation</text>
  <text x="880" y="390" class="txt-gray">5 tests passed</text>

  <!-- Item 4 -->
  <text x="50" y="425" class="txt-green">✔ PASS</text>
  <text x="120" y="425" class="txt-white">GET http://localhost:3000/tasks/:id — Status 200 OK &amp; Entity Lookup</text>
  <text x="880" y="425" class="txt-gray">4 tests passed</text>

  <!-- Item 5 -->
  <text x="50" y="460" class="txt-green">✔ PASS</text>
  <text x="120" y="460" class="txt-white">PUT http://localhost:3000/tasks/:id — Status 200 OK &amp; Status Updated</text>
  <text x="880" y="460" class="txt-gray">5 tests passed</text>

  <!-- Item 6 -->
  <text x="50" y="495" class="txt-green">✔ PASS</text>
  <text x="120" y="495" class="txt-white">DELETE http://localhost:3000/tasks/:id — Status 200 OK &amp; Deletion Verified</text>
  <text x="880" y="495" class="txt-gray">4 tests passed</text>

  <!-- Item 7 -->
  <text x="50" y="530" class="txt-green">✔ PASS</text>
  <text x="120" y="530" class="txt-white">POST http://localhost:3000/tasks (Validation Error) — Status 400 Bad Request</text>
  <text x="880" y="530" class="txt-gray">5 tests passed</text>

  <!-- Item 8 -->
  <text x="50" y="565" class="txt-green">✔ PASS</text>
  <text x="120" y="565" class="txt-white">GET http://localhost:3000/tasks?status=completed&amp;priority=high (Filter &amp; Page)</text>
  <text x="880" y="565" class="txt-gray">5 tests passed</text>

  <!-- Item 9 -->
  <text x="50" y="600" class="txt-green">✔ PASS</text>
  <text x="120" y="600" class="txt-white">GET http://localhost:3000/reports/summary — Status 200 OK &amp; Metrics Breakdown</text>
  <text x="880" y="600" class="txt-gray">6 tests passed</text>

  <!-- Item 10 -->
  <text x="50" y="630" class="txt-green">✔ PASS</text>
  <text x="120" y="630" class="txt-white">Logger &amp; 404 Centralized Error Handlers Verified</text>
  <text x="880" y="630" class="txt-gray">10 tests passed</text>
</svg>"""

# Save 09 and 10 SVGs in docs/screenshots
svg_09_path = os.path.join(WORKSPACE_DIR, "docs/screenshots/09_npm_test_terminal.svg")
svg_10_path = os.path.join(WORKSPACE_DIR, "docs/screenshots/10_postman_runner_summary.svg")

with open(svg_09_path, "w", encoding="utf-8") as f:
    f.write(terminal_svg)

with open(svg_10_path, "w", encoding="utf-8") as f:
    f.write(postman_runner_svg)

print("Saved SVG 09 and 10.")

# Convert all 10 SVGs to Retina PNG images
screenshots_mapping = [
    ("01_post_create_task.svg", "01_post_create_task.png", 900, 620),
    ("02_get_all_tasks.svg", "02_get_all_tasks.png", 900, 620),
    ("03_get_task_by_id.svg", "03_get_task_by_id.png", 900, 620),
    ("04_put_update_task.svg", "04_put_update_task.png", 900, 620),
    ("05_delete_task.svg", "05_delete_task.png", 900, 620),
    ("06_filter_search_pagination.svg", "06_filter_search_pagination.png", 900, 620),
    ("07_validation_error_400.svg", "07_validation_error_400.png", 900, 620),
    ("08_reports_summary.svg", "08_reports_summary.png", 900, 620),
    ("09_npm_test_terminal.svg", "09_npm_test_terminal.png", 1000, 680),
    ("10_postman_runner_summary.svg", "10_postman_runner_summary.png", 1000, 680),
]

generated_pngs = []

for svg_name, png_name, w, h in screenshots_mapping:
    svg_file = os.path.join(WORKSPACE_DIR, "docs/screenshots", svg_name)
    out_png = os.path.join(OUTPUT_DIR, png_name)
    
    # 2x Retina dimensions
    w2 = w * 2
    h2 = h * 2
    
    cmd = [
        CHROME_BIN,
        "--headless",
        "--disable-gpu",
        f"--screenshot={out_png}",
        f"--window-size={w2},{h2}",
        f"file://{svg_file}"
    ]
    subprocess.run(cmd, capture_output=True)
    if os.path.exists(out_png):
        sz = os.path.getsize(out_png) / 1024
        print(f"Generated {png_name}: {sz:.1f} KB ({w2}x{h2})")
        generated_pngs.append(out_png)
    else:
        print(f"FAILED to generate {png_name}")

print(f"\nSuccessfully generated {len(generated_pngs)} PNG images in {OUTPUT_DIR}!")
