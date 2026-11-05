# 字母狂想博客主题迁移设计

**日期：** 2026-11-05  
**状态：** 已落地；长期规范已迁至 `openspec/specs/blog-theme/spec.md`（本文件仅作历史设计记录）  
**站点：** https://2lovecode.github.io/（Hugo，`title = 字母狂想`）

## 背景与目标

当前使用 `smigle` 主题：极简、等宽、无 JS，已有分类/标签菜单，但**无搜索**，且视觉偏终端风，与期望的干净阅读风不一致。

目标：换成干净阅读向主题，支持搜索、标签分类、原创 + 转载混排，并便于单篇与系列/专题写作。

## 已确认偏好

| 项 | 选择 |
|----|------|
| 视觉 | 干净阅读感（Paper / Notion 式），非终端等宽风 |
| 转载展示 | 正文页明显来源标注（原文链接、作者、说明） |
| 主题 | PaperMod + 站点级转载来源 partial |
| 菜单 | 首页 / 归档 / 系列 / 标签 / 搜索 / 关于 |

## 方案对比（摘要）

1. **PaperMod（采用）**：干净阅读、Fuse 搜索、标签/分类开箱即用、迁移成本低  
2. Congo：阅读体验更精致，配置更重  
3. Blowfish：功能最全，偏重，不够「简洁」

保留对比结论：不继续以 smigle 为最终主题（缺搜索）。

## 架构设计

### 主题

- 以 git submodule 引入 `https://github.com/adityatelange/hugo-PaperMod.git` → `themes/PaperMod`
- `hugo.toml` 中 `theme = "PaperMod"`
- `themes/smigle` 本轮保留；站点验收通过后再决定是否移除

### 内容目录

从「目录即分类」改为「front matter 分类」：

```text
content/
  posts/                 # 全部文章（原创 + 转载）
  search.md              # 搜索页
  archives.md            # 归档页
  about.md               # 关于页
```

- 现有 `content/categories/ai/application_exploration_of_llm_in_vertical_search.md` 迁到 `content/posts/`，保留 `categories` / `tags`
- 删除旧的 `content/categories/...` 路径（迁移完成后）

### 导航菜单

| 顺序 | 名称 | 路径 | 说明 |
|------|------|------|------|
| 1 | 首页 | `/` | 最近文章列表 |
| 2 | 归档 | `/archives/` | 按时间浏览全部文章 |
| 3 | 系列 | `/series/` | 连载 / 专题入口 |
| 4 | 标签 | `/tags/` | 细粒度主题 |
| 5 | 搜索 | `/search/` | Fuse.js 客户端搜索 |
| 6 | 关于 | `/about/` | 站点说明 |

- **分类不进顶栏**（避免与系列/标签职责重叠；分类仍可通过 taxonomy 页面访问）  
- **RSS 放页脚**，不占顶栏

### 单篇 vs 系列

- **单篇**：`tags`（可选 `categories`），出现在首页与归档  
- **系列/专题**：`series = ["专题名"]`，出现在 `/series/` 及对应系列列表  
- taxonomy 配置：`tag`、`category`、`series`

### 转载来源标注

Front matter 约定：

```toml
# 原创（可省略 type_post，默认原创）
type_post = "original"

# 转载
type_post = "repost"
original_title = "原文标题"
original_author = "原作者"
original_url = "https://..."
repost_note = "已获授权转载"   # 可选
```

正文标题下方展示来源条（仅 `type_post = "repost"` 时）：

> 转载自：[原文标题](url) · 作者：xxx  
> 说明：已获授权转载（若有 `repost_note`）

实现：在站点 `layouts/partials/` 覆盖 PaperMod 文章 meta 相关 partial，只追加来源条，不 fork 主题其它逻辑。

### 搜索

- 启用 PaperMod 内置 Fuse.js 搜索  
- `content/search.md` 使用 search layout  
- `hugo.toml` 配置 home 的 JSON output（主题搜索索引所需）

### PaperMod 参数原则

- 首页：文章列表（默认 Regular）  
- 开启：搜索、标签、外观跟随系统  
- 关闭：评论、分析统计、非必要社交图标（后续按需再加）

## 文件变更清单

| 路径 | 动作 |
|------|------|
| `themes/PaperMod` | submodule 新增 |
| `hugo.toml` | 切主题、菜单、taxonomies、search outputs、必要 params |
| `content/posts/*` | 新建并迁入现有文章 |
| `content/categories/...` | 迁移后删除 |
| `content/search.md` | 新建 |
| `content/archives.md` | 新建（archives layout） |
| `content/about.md` | 新建或补全 |
| `layouts/partials/*` | 转载来源条覆盖 |
| `layouts/_default/single.html` | 删除站点级覆盖，避免与 PaperMod 冲突 |
| `archetypes/default.md` | 补充 tags / categories / series / 转载字段示例 |
| `themes/smigle` | 本轮保留 |

## 明确不做（本轮）

- 不改文章正文内容本身  
- 不上评论系统  
- 不做仪表盘式复杂首页  
- 不强制移除 smigle（验收后再议）

## 验收标准

1. `hugo server` 可正常打开：首页、归档、系列、标签、搜索、关于  
2. 搜索可命中现有文章标题与正文  
3. 转载文正文顶部显示来源；原创文不显示  
4. 带 `series` 的文章出现在 `/series/`  
5. 现有文章在新目录结构下可正常渲染

## 风险与注意

- 现有自定义 `layouts/_default/single.html` 会覆盖主题模板，迁移时必须删除或改为兼容 PaperMod 的覆盖方式  
- Fuse.js 对中文分词较弱，属主题已知限制；可接受为 v1，后续若体验差再评估 Pagefind 等方案  
- 内容从 `content/categories/...` 迁到 `content/posts/` 会改变 URL；若已有外链，需评估是否做别名（本轮默认接受新 URL，必要时用 `aliases`）
