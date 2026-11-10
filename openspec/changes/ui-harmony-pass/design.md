# Design

## Context

`reading-ui-polish` + `sticky-right-toc` 已落地。本 change 只做和谐度校准，不改内容信息模型主路径。

关键发现：

- Hugo Chroma 在 `<pre style="background-color:#272822">` 内联，与 `--code-block-bg` 叠层
- `.home-lead` ≈ 导航字号，抢列表戏
- `.post-title` 2.05rem/700 偏报头
- 标签页 `border-radius: 999px` 与全站 `--radius: 0` 冲突
- `post_nav_links` 用 `mainSections` 全量 RegularPages，演示文仍进翻篇

## Goals / Non-Goals

**Goals**

- 单一代码块表面；lead/文题/Logo/TOC/标签层级对齐
- 演示文退出翻篇；标签页直角化 + 稀疏态
- sticky 顶栏 + 文题短 accent 线（克制）

**Non-Goals**

- 换主题、加卡片/hero、改正文大纲编号、归档 OpenSpec 旧 change

## Decisions

1. **代码块**：`.md-content pre` / `.highlight` 用 `!important` 覆盖内联 bg/color；浅色弱化 chroma token 或强制继承 `--content`；深色另套深底。
2. **翻篇**：在 `post_nav_links.html` 过滤 `Params.hiddenInHomeList`，再对过滤后序列取 Prev/Next（手写相邻，因 `.Next` 绑原集合）。
3. **TOC**：CSS 降权二级；断点 `min-width` 提到约 `1360px` 或 `--toc-rail: 11rem`，二选一以「不贴边」为准（优先略抬断点）。
4. **标签计数**：taxonomy 模板在 `$max == 1` 时不渲染 `.term-count`；搜索页热门标签同样处理。
5. **Sticky header**：`.header { position: sticky; top: 0; z-index; background: var(--theme); }`，无厚阴影。
6. **文题短线**：`.post-title::after` 或 `.post-header` 内伪元素，宽 ~28px。

## Risks / Trade-offs

- 抬高 TOC 断点 → 中等宽屏退回顶部折叠（可接受，优于贴边）
- 过滤翻篇 → 正式文变少时上下篇更少（正确）
- chroma 强制深字 → 彩色高亮变弱（可读优先）

## Migration

无数据迁移。验收后可 `/opsx-archive` 并 sync 进 `openspec/specs/blog-theme`。
