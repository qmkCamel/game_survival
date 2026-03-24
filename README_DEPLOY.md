# 部署到 GitHub Pages

这个项目是纯前端静态站点，最简单的上线方式就是 GitHub Pages。

## 方式 A：GitHub Actions 自动部署（推荐）

1. 确保默认分支为 `main`，并已推送到 GitHub。
2. 打开 GitHub 仓库页面 → `Settings` → `Pages`
3. 在 `Build and deployment` 中：
   - `Source` 选择 `GitHub Actions`
4. 合并/推送后，Actions 会自动部署。
5. 部署完成后，Pages 地址一般形如：
   - `https://<你的用户名>.github.io/<仓库名>/`

> 说明：仓库根目录提供了 `index.html` 自动跳转到 `src/index.html`，因此默认访问仓库根路径即可。

## 方式 B：手动选择分支部署（不推荐，但也可用）

如果你不想用 Actions，也可以在 `Settings` → `Pages` 里选择：
- `Source`: `Deploy from a branch`
- `Branch`: `main` / `/(root)`

然后访问：
- `https://<你的用户名>.github.io/<仓库名>/`

## 常见问题

### 1) 打开是空白 / 控制台 404

优先确认你访问的是 `.../<仓库名>/`（根目录会自动跳到 `src/index.html`）。如果你直接访问 `.../src/index.html` 也可以。

### 2) 本地能跑，线上不能跑

请检查是否有写死的本地路径（例如 `file://`、或 `../tests/...`）。上线版已默认不加载测试脚本。
