## ADDED Requirements

### Requirement: Sticky Header on Long Reads

顶栏 SHALL 在滚动时保持可见（`position: sticky`），并使用极淡纸色底，不遮挡阅读内容的可点击区域；高度仍由 `--header-height` 约束，正文锚点 `scroll-margin-top` SHALL 继续计入该高度。

#### Scenario: Header remains reachable while scrolling a post

- **WHEN** 用户在长文中向下滚动
- **THEN** 顶栏 Logo 与导航仍可见，且不引入厚重阴影或大色块

### Requirement: Title Accent Mark

正文页 `.post-title` 下方 SHALL 有一条极短的 accent 色短线（约 24–32px 宽、1–2px 高），作为静态品牌点缀；SHALL NOT 在列表页标题下重复该短线。

#### Scenario: Post title has quiet brand mark

- **WHEN** 打开任意正文页
- **THEN** 大标题下方可见短 accent 线，且页面其余区域仍保持克制、无大面积强调色

## MODIFIED Requirements

### Requirement: Visual Language

站点 SHALL 保持干净阅读风（纸色底、克制强调色、去卡片列表），而非终端等宽风或默认 PaperMod 卡片脸。

站点 SHALL 遵守下列视觉约束：

- 内容栏与顶栏同宽：`--nav-width` 与 `--main-width` 一致（当前 `720px`）
- 列表：分隔线列表，无卡片壳、无首帖特写（`disableSpecial1stPost = true`）
- 衬线仅用于正文页大标题；Logo 与列表标题用无衬线
- Logo「字母狂想」字距克制（约 `0.04–0.05em`），字重约 500，避免过散
- 系统中文字体栈；SHALL NOT 依赖 Google Fonts 等外链字体
- 正文页标签为文本 `·` 分隔，非胶囊按钮
- 首页站训（`.home-lead`）SHALL 弱于列表标题与 Logo（更小字号、常规字重），作为气口而非副标题
- 正文 `.post-title` SHALL 保留衬线，但字号/字重须避免报头压迫感（约 `1.75–1.85rem`、字重约 600）
- 浅色主题代码块 SHALL 使用纸色浅底与深色字；深色主题使用深底浅字；SHALL 覆盖 Hugo/Chroma 内联背景色，避免双层冲突
- 强调色用于链接悬停、导航激活、转载标记、TOC 激活、文题短线与 blockquote 左边线（当前 `--accent: #2f5d50`）

#### Scenario: List appearance

- **WHEN** 用户打开首页文章列表
- **THEN** 条目呈现为分隔线列表，且第一篇与其余篇样式一致（无 `first-entry` 大卡）

#### Scenario: Home lead quieter than list titles

- **WHEN** 打开首页
- **THEN** 站训视觉权重明显弱于下方列表标题，且不强于 Logo

#### Scenario: Light theme code block single surface

- **WHEN** 在浅色主题打开含代码块的文章
- **THEN** 代码块呈现单一浅底深字表面，无近黑 Monokai 底透出

#### Scenario: Typography roles

- **WHEN** 渲染首页列表与正文页
- **THEN** 列表标题与 Logo 为无衬线；`.post-title` 可用衬线且不过重

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
| `hiddenInHomeList` | `true` 时不出现在首页列表，且不进入正文「上一篇/下一篇」导航 |

演示/样例文若保留，SHALL 设置 `hiddenInHomeList = true`，避免占首页首条与正式文翻篇链。

#### Scenario: New post location

- **WHEN** 新增一篇博客文章
- **THEN** 文件位于 `content/posts/`，并按需填写 tags / series / type_post

#### Scenario: Demo post on home

- **WHEN** 存在转载示例等演示文且标记 `hiddenInHomeList = true`
- **THEN** 首页列表不展示该文；归档/标签/系列仍可访问

#### Scenario: Demo excluded from post nav

- **WHEN** 打开一篇正式文且站点存在 `hiddenInHomeList = true` 的演示文
- **THEN** 「上一篇/下一篇」不指向该演示文

### Requirement: Search and Taxonomies

站点 SHALL 启用首页 JSON 输出与搜索页（Fuse.js），搜索页 SHALL 提供轻量引导（非重复大标题「搜索」）以及热门标签与最近文章托底。

站点 SHALL 配置 taxonomies：`tags`、`categories`、`series`。

标签/系列列表页 SHALL 以直角描边芯片（非胶囊）展示；当全部 term 计数均为 1 时 SHALL 隐藏计数数字。词条极少时 SHALL 显示一句中性空态/引导文案（非错误态）。

侧栏 TOC 二级及以下条目 SHALL 比一级更淡、更紧；宽屏侧栏出现断点 SHALL 保证 TOC 不贴视口右缘（轨宽或断点可调）。

#### Scenario: Search page assist

- **WHEN** 打开 `/search/` 且尚未输入关键词
- **THEN** 可见查找引导，以及热门标签与最近文章入口

#### Scenario: Tags page no pills when sparse

- **WHEN** 打开 `/tags/` 且各标签计数均为 1
- **THEN** 标签为直角描边样式，且不显示「1」计数

#### Scenario: Sparse taxonomy empty hint

- **WHEN** 打开标签或系列列表页且词条数量很少
- **THEN** 可见一句中文引导/说明，页面不显得纯空白工具页
