#!/usr/bin/env python3
# 将现有 JS 场景转换为 Twine/SugarCube 可导入的 Twee 文件
# 输出：output/game.twee

import os
import re
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
SCENE_DIR = ROOT / "src" / "scenes"
OUT_FILE = ROOT / "output" / "game.twee"

scene_file_pattern = re.compile(r"scenes_.*\.js$")
scene_id_pattern = re.compile(r"(\w+)\s*:\s*\{")
text_pattern = re.compile(r"text\s*:\s*`(.*?)`", re.S)
choices_pattern = re.compile(
    r"\{\s*text\s*:\s*\"([^\"]+)\"\s*,\s*nextScene\s*:\s*\"([^\"]+)\"(?:\s*,\s*effects\s*:\s*\{(.*?)\})?\s*\}",
    re.S,
)


def clamp_expr(var: str, delta: int) -> str:
    """返回 SugarCube 可用的 clamp 赋值表达式"""
    return f"<<set ${var} = Math.max(0, Math.min(100, ${var} + ({delta})))>>"


def parse_effects(effects_str: str):
    effects = {}
    if not effects_str:
        return effects
    # performance / mental
    perf = re.search(r"performance\s*:\s*(-?\d+)", effects_str)
    ment = re.search(r"mental\s*:\s*(-?\d+)", effects_str)
    if perf:
        effects["performance"] = int(perf.group(1))
    if ment:
        effects["mental"] = int(ment.group(1))
    # skills/allies arrays
    skills = re.search(r"skills\s*:\s*\[([^\]]*)\]", effects_str)
    allies = re.search(r"allies\s*:\s*\[([^\]]*)\]", effects_str)
    if skills:
        effects["skills"] = [
            s.strip().strip('"').strip("'") for s in skills.group(1).split(",") if s.strip()
        ]
    if allies:
        effects["allies"] = [
            s.strip().strip('"').strip("'") for s in allies.group(1).split(",") if s.strip()
        ]
    return effects


def build_choice_lines(choice):
    text, target, effects_raw = choice
    effects = parse_effects(effects_raw)
    lines = []
    lines.append(f"<<link \"{escape(text)}\">>")
    if "performance" in effects:
        lines.append(clamp_expr("performance", effects["performance"]))
    if "mental" in effects:
        lines.append(clamp_expr("mental", effects["mental"]))
    if effects.get("skills"):
        for sk in effects["skills"]:
            esc = escape(sk)
            lines.append(f"<<if !$skills.includes(\"{esc}\")>><<set $skills.push(\"{esc}\")>><</if>>")
    if effects.get("allies"):
        for al in effects["allies"]:
            esc = escape(al)
            lines.append(f"<<if !$allies.includes(\"{esc}\")>><<set $allies.push(\"{esc}\")>><</if>>")
    lines.append(f"<<goto \"{escape(target)}\">>")
    lines.append("<</link>>")
    return "\n".join(lines)


def parse_scenes():
    scenes = {}
    for file in os.listdir(SCENE_DIR):
        if not scene_file_pattern.match(file):
            continue
        content = (SCENE_DIR / file).read_text(encoding="utf-8")
        idx = 0
        while True:
            m = scene_id_pattern.search(content, idx)
            if not m:
                break
            sid = m.group(1)
            start = content.find("{", m.end() - 1)
            brace = 0
            end = None
            for i in range(start, len(content)):
                if content[i] == "{":
                    brace += 1
                elif content[i] == "}":
                    brace -= 1
                    if brace == 0:
                        end = i + 1
                        break
            if end is None:
                break
            block = content[start:end]
            idx = end
            # 取文本
            tm = text_pattern.search(block)
            text = tm.group(1).strip() if tm else "(无正文)"
            # choices
            choices = choices_pattern.findall(block)
            scenes[sid] = {"text": text, "choices": choices}
    return scenes


def ensure_out_dir():
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)


def write_twee(scenes):
    ensure_out_dir()
    with OUT_FILE.open("w", encoding="utf-8") as f:
        f.write(":: StoryTitle\nGame Survival (SugarCube)\n\n")
        f.write(":: StoryData\n<<set $performance = 75>>\n<<set $mental = 80>>\n<<set $skills = []>>\n<<set $allies = []>>\n\n")
        # StoryInit 用来放置 clamp helper (备用) 与初始 HUD 开关（可选）
        f.write(":: StoryInit\n<<run window.clamp = (v,min,max) => Math.max(min, Math.min(max, v))>>\n\n")
        for pid, (sid, data) in enumerate(scenes.items(), start=1):
            f.write(f":: {sid}\n")
            f.write(f"{data['text']}\n\n")
            if data["choices"]:
                for ch in data["choices"]:
                    f.write(build_choice_lines(ch))
                    f.write("\n\n")
            f.write("\n")


def main():
    scenes = parse_scenes()
    # 确保 start 存在
    if "start" not in scenes:
        raise SystemExit("未找到 start 场景")
    write_twee(scenes)
    print(f"已生成 {OUT_FILE}，场景数 {len(scenes)}")


if __name__ == "__main__":
    main()

