#!/usr/bin/env python3
# 按源 JS 文件分拆 game.twee，便于分工和版本管理
# 读取：output/game.twee
# 输出：output/twee/<bucket>.twee （meta/intro/projects/office_politics/.../misc）

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TWEE_FILE = ROOT / "output" / "game.twee"
SCENE_DIR = ROOT / "src" / "scenes"
OUT_DIR = ROOT / "output" / "twee"

# 收集 sceneId -> bucket 映射（根据源 JS 文件名）
scene_map = {}
scene_file_pattern = re.compile(r"scenes_(.+)\.js$")
scene_id_pattern = re.compile(r"(\w+)\s*:\s*\{")

for js_file in SCENE_DIR.glob("scenes_*.js"):
    m = scene_file_pattern.match(js_file.name)
    if not m:
        continue
    bucket = m.group(1)  # 如 intro、projects、office_politics
    content = js_file.read_text(encoding="utf-8")
    for sid in scene_id_pattern.findall(content):
        scene_map[sid] = bucket

# 解析 game.twee 中的 Passage
twee_content = TWEE_FILE.read_text(encoding="utf-8")
passage_pattern = re.compile(r"^::\s*([^\n]+)\n([\s\S]*?)(?=^::\s|\Z)", re.MULTILINE)

buckets = {}

for m in passage_pattern.finditer(twee_content):
    title = m.group(1).strip()
    body = m.group(2)
    # Story 元信息单独归类
    if title in ("StoryTitle", "StoryData", "StoryInit"):
        bucket = "meta"
    else:
        bucket = scene_map.get(title, "misc")
    buckets.setdefault(bucket, []).append(f":: {title}\n{body.strip()}\n")

# 输出拆分结果
OUT_DIR.mkdir(parents=True, exist_ok=True)
for bucket, passages in buckets.items():
    out_path = OUT_DIR / f"{bucket}.twee"
    with out_path.open("w", encoding="utf-8") as f:
        f.write("\n\n".join(passages).strip() + "\n")

print(f"拆分完成：{len(buckets)} 个分组，输出目录 {OUT_DIR}")

