# 给 AI 的工程改动指南

这个项目是纯前端文字冒险游戏，推荐按“场景数据”和“引擎/UI”分层来改。

## 你最常改的地方

### 1) 新增/修改剧情（场景）

推荐改法（更适合 AI）：改 JSON 场景数据。

- 场景数据在 `src/scenes/data/scenes.generated.json`（当前是从旧 JS 自动生成的）。
- 单个场景结构：
  - `text`: HTML 片段（字符串）
  - `choices`: `[{ text, nextScene, effects? }]`
  - `effects`（可选）：`performance/mental/skills/allies`

要启用 JSON 场景加载：
- 在浏览器控制台执行：`window.USE_SCENE_DATA = true` 后刷新页面
- 或者你也可以把这行直接写进 `src/index.html`（看你是否想默认启用）

旧结构（仍可用）：`src/scenes/scenes_*.js`。

新增一个新的场景文件时：
- 把文件放到 `src/scenes/` 下，命名为 `scenes_xxx.js`
- 在 `src/scenes/scenes_manifest.js` 里把文件名加到 `window.SCENE_FILES` 数组中
- 保证该文件里导出的全局变量名是 `var xxxScenes = { ... }`
- 在 `src/scenes/scenes_index.js` 里把 `...xxxScenes` 合并进 `window.scenes`

### 2) 修改游戏规则（结局阈值、状态变化）

- 主逻辑在 `src/game.js`
  - `handleChoice()`里先应用 effects，再做“特殊结局条件”判断。
  - 想调整结局触发阈值，直接改这里即可。

## 场景加载机制（为什么这样改）

以前：`src/index.html` 里手工列出十几个 `<script src="...">`。

现在：
- `src/scenes/scenes_manifest.js` 维护“加载哪些场景包”（单点修改）
- `src/scenes/scenes_loader.js` 读取清单并动态插入 `<script>`，最后再加载 `scenes_index.js` 合并所有场景

这样做的好处：
- AI 只需要改一个 manifest，就能新增/移除场景包
- `index.html` 更稳定，不会频繁产生大 diff

## JSON 场景加载（更推荐）

为了让 AI 改剧情时产生更小、更可控的 diff，引入了 JSON 场景加载：
- 加载器：`src/scenes/scenes_data_loader.js`
- 引擎入口：`src/game.js` 在 `window.USE_SCENE_DATA === true` 时先 `await window.initScenes()` 再开始游戏

后续如果要“手工维护 JSON”（不再从旧 JS 生成），建议把 `scenes.generated.json` 改名为 `scenes.json`，并把生成脚本替换为校验脚本。

## 系统性补全“短分支”

短分支通常表现为：某个选项文案是“继续前进/继续…”，并直接跳到一个高复用的泛化节点（例如 `build_trust`、`career_guidance`、`promotion` 等）。

目前已在 `src/scenes/data/scenes.generated.json` 中系统性补了这一类节点：
- 这类选项会先跳到 `bridge_<from>_to_<to>` 的承接场景，再由承接场景进入原目标节点
- 承接场景提供 2~3 个更具体的过渡选择，减少“突然跳走”的割裂感
