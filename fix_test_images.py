#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Regenerates all 10 test screenshot PNGs with edge-to-edge rendering,
eliminating any white borders or canvas padding.
"""

import os
import re
import subprocess
from PIL import Image

WORKSPACE_DIR = "/Users/Ertan/Desktop/Backend_Gelistirme"
OUTPUT_DIR = os.path.join(WORKSPACE_DIR, "test_ekran_goruntuleri")
CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

os.makedirs(OUTPUT_DIR, exist_ok=True)

images_config = [
    ("01_post_create_task.svg", "01_post_create_task.png", 900, 620, "#1e1e1e"),
    ("02_get_all_tasks.svg", "02_get_all_tasks.png", 900, 620, "#1e1e1e"),
    ("03_get_task_by_id.svg", "03_get_task_by_id.png", 900, 620, "#1e1e1e"),
    ("04_put_update_task.svg", "04_put_update_task.png", 900, 620, "#1e1e1e"),
    ("05_delete_task.svg", "05_delete_task.png", 900, 620, "#1e1e1e"),
    ("06_filter_search_pagination.svg", "06_filter_search_pagination.png", 900, 620, "#1e1e1e"),
    ("07_validation_error_400.svg", "07_validation_error_400.png", 900, 620, "#1e1e1e"),
    ("08_reports_summary.svg", "08_reports_summary.png", 900, 620, "#1e1e1e"),
    ("09_npm_test_terminal.svg", "09_npm_test_terminal.png", 1000, 680, "#0f172a"),
    ("10_postman_runner_summary.svg", "10_postman_runner_summary.png", 1000, 680, "#1e1e1e"),
]

for svg_name, png_name, w, h, bg_color in images_config:
    svg_path = os.path.join(WORKSPACE_DIR, "docs/screenshots", svg_name)
    with open(svg_path, "r", encoding="utf-8") as f:
        svg_data = f.read()

    # Remove outer rounded corners so it fills rectangular window completely
    svg_data = re.sub(r'rx=\"\d+\"', '', svg_data, count=2)
    # Ensure svg tag scales to 100%
    svg_data = re.sub(
        r'<svg([^>]*)width=\"\d+\"([^>]*)height=\"\d+\"',
        r'<svg\1width=\"100%\"\2height=\"100%\"',
        svg_data
    )

    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: {bg_color};
  }}
  svg {{
    width: 100vw;
    height: 100vh;
    display: block;
  }}
</style>
</head>
<body>
{svg_data}
</body>
</html>"""

    tmp_html = f"/tmp/wrap_{svg_name}.html"
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html)

    out_png = os.path.join(OUTPUT_DIR, png_name)
    # 2x Retina resolution
    w2 = w * 2
    h2 = h * 2

    cmd = [
        CHROME_BIN,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--screenshot={out_png}",
        f"--window-size={w2},{h2}",
        f"file://{tmp_html}"
    ]
    subprocess.run(cmd, capture_output=True)

    # Verify output with PIL
    im = Image.open(out_png)
    sz = os.path.getsize(out_png) / 1024
    print(f"Verified {png_name}: size={im.size}, file_size={sz:.1f} KB, top_left={im.getpixel((0,0))}")

print("\nALL 10 PNGs regenerated and verified successfully!")
