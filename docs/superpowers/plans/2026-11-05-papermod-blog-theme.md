# PaperMod 主题迁移 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将站点从 smigle 迁移到 PaperMod，启用搜索/归档/系列/标签，并支持转载来源标注。

**Architecture:** 用 git submodule 引入 PaperMod；文章迁到 `content/posts/`；站点级 partial 覆盖实现转载条；删除冲突的站点 `single.html`。

**Tech Stack:** Hugo Extended、PaperMod、Fuse.js（主题内置）

## Global Constraints

- 遵循 `docs/superpowers/specs/2026-11-05-papermod-blog-theme-design.md`
- 菜单：首页 / 归档 / 系列 / 标签 / 搜索 / 关于
- 本轮不提交 git commit（除非用户另行要求）
- 保留 `themes/smigle`，不删除

---

### Task 1: 安装 PaperMod 并切换主题配置

**Files:**
- Create: `themes/PaperMod` (submodule)
- Modify: `hugo.toml`

- [x] Step 1: `git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod`
- [x] Step 2: 重写 `hugo.toml`：`theme = "PaperMod"`；菜单；`[taxonomies]` 含 series；`[outputs.home]` 含 JSON；精简 `[params]`
- [x] Step 3: `hugo` 能启动（即使内容页尚未齐全）
- [x] 附：本机 Hugo 升级至 0.169.0（PaperMod 要求 ≥0.158）

### Task 2: 迁移内容与页面脚手架

**Files:**
- Create: `content/posts/llm-vertical-search.md`（迁自现有 AI 文）
- Create: `content/search.md`, `content/archives.md`, `content/about.md`
- Delete: `content/categories/...`, `layouts/_default/single.html`
- Modify: `archetypes/default.md`

- [x] Step 1: 创建 posts 目录并迁移文章；修正 front matter（`description` 替代错误的 `content` 字段若需要）
- [x] Step 2: 新建 search / archives / about
- [x] Step 3: 删除旧路径与冲突 `single.html`
- [x] Step 4: 更新 archetype

### Task 3: 转载来源 partial

**Files:**
- Create/Modify: `layouts/partials/` 覆盖 PaperMod 文章头 meta（先读主题 `layouts/partials/post_meta.html` 或等价文件再覆盖）

- [x] Step 1: 定位 PaperMod 文章页插入点
- [x] Step 2: 实现 `type_post = "repost"` 来源条
- [x] Step 3: 可选加一篇示例转载草稿或给现有文保持 original

### Task 4: 验收

- [x] Step 1: `hugo server` 检查首页/归档/系列/标签/搜索/关于
- [x] Step 2: 确认搜索 JSON 生成、文章可打开
- [x] Step 3: 用临时 front matter 验证转载条显示逻辑
