# blog-theme Specification

## Purpose

定义「字母狂想」站点主题、导航、内容模型与视觉规范。实现与改版时 MUST 遵守本规格；偏离须先走 OpenSpec change。

## Requirements

### Requirement: Theme Stack

站点 SHALL 使用 Hugo 主题 **PaperMod**（`themes/PaperMod` submodule），并通过站点级 `layouts/` 与 `assets/css/extended/custom.css` 覆盖，而非 fork 主题核心文件。

站点 SHALL NOT 将 smigle 或其他主题设为默认 `theme`。

#### Scenario: Active theme

- **WHEN** 读取 `hugo.toml`
- **THEN** `theme` 为 `PaperMod`

#### Scenario: Customization location

- **WHEN** 调整版式、转载条、页脚、搜索托底或视觉 token
- **THEN** 改动落在站点 `layouts/`、`assets/css/extended/` 或 `hugo.toml`，不直接改 `themes/PaperMod` 源码（升级 submodule 除外）

---

### Requirement: Visual Language

站点 SHALL 保持干净阅读风（纸色底、克制强调色、去卡片列表），而非终端等宽风或默认 PaperMod 卡片脸。

站点 SHALL 遵守下列视觉约束：

- 内容栏与顶栏同宽：`--nav-width` 与 `--main-width` 一致（当前 `860px`）
- 列表：分隔线列表，无卡片壳、无首帖特写（`disableSpecial1stPost = true`）
- 衬线仅用于 Logo 与正文页大标题；列表标题用无衬线
- 系统中文字体栈；SHALL NOT 依赖 Google Fonts 等外链字体
- 正文页标签为文本 `·` 分隔，非胶囊按钮
- 强调色用于链接悬停、导航激活、转载标记（当前 `--accent: #2f5d50`）

#### Scenario: List appearance

- **WHEN** 用户打开首页文章列表
- **THEN** 条目呈现为分隔线列表，且第一篇与其余篇样式一致（无 `first-entry` 大卡）

#### Scenario: Typography roles

- **WHEN** 渲染首页列表与正文页
- **THEN** 列表标题为无衬线；站点 Logo 与 `.post-title` 可用衬线

---

### Requirement: Navigation

顶栏菜单 SHALL 为（顺序固定）：

1. 归档 `/archives/`
2. 系列 `/series/`
3. 标签 `/tags/`
4. 搜索 `/search/`
5. 关于 `/about/`

顶栏 SHALL NOT 再放「首页」（Logo 回首页）或「分类」或 RSS。

主题切换控件 SHALL 位于导航末尾，而非 Logo 旁。

导航当前项 SHALL 有可见激活态（强调色 + 字重 + 底边）。

#### Scenario: Main menu items

- **WHEN** 查看任意页顶栏
- **THEN** 仅包含归档、系列、标签、搜索、关于，外加主题切换

#### Scenario: Home access

- **WHEN** 用户点击 Logo「字母狂想」
- **THEN** 进入站点首页 `/`

---

### Requirement: Locales and Copy

面向读者的 UI 文案 SHALL 使用中文。

站点 SHALL 使用：

- `DateFormat = "2006-01-02"`
- 归档月份为「N月」形式（非英文月份名）
- taxonomy 列表页标题为中文（标签 / 系列 / 分类）
- 文末翻篇文案为「上一篇 / 下一篇」（非「上一页 / 下一页」）

面包屑 SHALL NOT 包含「首页」；文章页最多显示区块名（如「文章」）。

#### Scenario: Archive months

- **WHEN** 打开 `/archives/`
- **THEN** 月份分组标题为中文「N月」

#### Scenario: Breadcrumb on post

- **WHEN** 打开一篇 `posts` 文章
- **THEN** 面包屑不含「首页」，可含「文章」

---

### Requirement: Content Model

文章 SHALL 放在 `content/posts/`，用 front matter 表达分类与标签，SHALL NOT 用目录路径充当分类。

Front matter 约定：

| 字段 | 用途 |
|------|------|
| `description` / `summary` | 列表与 SEO 摘要；摘要应提供相对标题的增量信息 |
| `categories` | 可选粗分类（可不进顶栏） |
| `tags` | 细粒度主题 |
| `series` | 连载 / 专题 |
| `type_post` | `original`（默认）或 `repost` |
| `original_title` / `original_author` / `original_url` / `repost_note` | 转载来源 |
| `hiddenInHomeList` | `true` 时不出现在首页列表 |

演示/样例文若保留，SHALL 设置 `hiddenInHomeList = true`，避免占首页首条。

#### Scenario: New post location

- **WHEN** 新增一篇博客文章
- **THEN** 文件位于 `content/posts/`，并按需填写 tags / series / type_post

#### Scenario: Demo post on home

- **WHEN** 存在转载示例等演示文且标记 `hiddenInHomeList = true`
- **THEN** 首页列表不展示该文；归档/标签/系列仍可访问

---

### Requirement: Repost Attribution

当 `type_post = "repost"` 时，正文页标题区下方 SHALL 显示转载来源条（原文标题/链接、作者、可选说明）。

转载条 SHALL NOT 出现在首页或其它列表的 `post_meta` 中。

#### Scenario: Repost on single page

- **WHEN** 打开 `type_post = "repost"` 的文章页
- **THEN** 显示转载来源条

#### Scenario: Repost not in list

- **WHEN** 首页或列表渲染含转载文的条目
- **THEN** 条目 meta 区不出现转载来源条

---

### Requirement: Search and Taxonomies

站点 SHALL 启用首页 JSON 输出与搜索页（Fuse.js），搜索页 SHALL 提供轻量引导（非重复大标题「搜索」）以及热门标签与最近文章托底。

站点 SHALL 配置 taxonomies：`tags`、`categories`、`series`。

标签列表页 SHALL 以胶囊网格展示，并可按数量体现权重。

#### Scenario: Search page assist

- **WHEN** 打开 `/search/` 且尚未输入关键词
- **THEN** 可见查找引导，以及热门标签与最近文章入口

---

### Requirement: Footer

页脚 SHALL 分两行（或等价两层信息）：

1. 版权年 + RSS  
2. 更淡的技术栈署名：基于 Hugo · PaperMod  

页脚 SHALL NOT 再次用大字重复站点品牌名。

#### Scenario: Footer content

- **WHEN** 查看任意页页脚
- **THEN** 可见版权与 RSS，以及 Hugo / PaperMod 署名

---

### Requirement: Override Map

主题行为的实现锚点 SHALL 落在下列站点文件；Agent SHALL 优先修改这些路径，并在行为偏离时先更新 OpenSpec change 再改代码：

| 区域 | 路径 |
|------|------|
| 配置 | `hugo.toml` |
| 视觉 | `assets/css/extended/custom.css` |
| 列表/摘要 | `layouts/list.html` |
| 正文/转载 | `layouts/single.html`、`layouts/_partials/repost_notice.html` |
| Meta 日期 | `layouts/_partials/post_meta.html` |
| 顶栏 | `layouts/_partials/header.html` |
| 页脚 | `layouts/_partials/footer.html` |
| 面包屑 | `layouts/_partials/breadcrumbs.html` |
| 归档月份 | `layouts/archives.html` |
| 标签页 | `layouts/taxonomy.html` |
| 搜索 | `layouts/search.html` |
| 新文模板 | `archetypes/default.md` |

站点 SHALL NOT 通过直接编辑 `themes/PaperMod` 源码来实现长期定制（submodule 版本升级除外）。

#### Scenario: Changing theme behavior

- **WHEN** Agent 需要调整主题可见行为
- **THEN** 先对照本规格；若行为将偏离，先创建 OpenSpec change，再改上表路径中的实现
