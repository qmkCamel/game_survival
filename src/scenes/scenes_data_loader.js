// 从 JSON 加载场景数据，合并到 window.scenes
// 目标：让 AI 更容易改剧情（只改 JSON），避免编辑大段 JS 代码。

async function loadScenesFromJson(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`加载场景 JSON 失败: ${url} (${res.status})`);
  }
  return res.json();
}

async function initScenes() {
  // 确保 window.scenes 至少存在，避免 game.js 过早访问报错
  window.scenes = window.scenes || {};

  const config = window.SCENE_DATA_CONFIG || {};
  const url = config.url || "scenes/data/scenes.generated.json";

  const data = await loadScenesFromJson(url);
  if (!data || !data.scenes) {
    throw new Error("场景 JSON 格式错误：缺少 scenes 字段");
  }

  // JSON 中每个 scene 已是 {id,text,choices} 结构，直接合并
  Object.assign(window.scenes, data.scenes);
  console.log(`已从 JSON 加载场景：${Object.keys(data.scenes).length} 个`);
}

window.initScenes = initScenes;

