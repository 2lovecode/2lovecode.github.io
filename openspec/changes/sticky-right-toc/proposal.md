# Proposal

## Why

长文开启目录后，PaperMod 默认把 TOC 做成正文顶部的折叠块，阅读时要反复滚回顶部才能跳转；也无法一眼对照「当前读到哪一节」。需要在宽屏上提供右侧固定、随滚动高亮当前标题的目录。

## What Changes

- 文章页在 `ShowToc = true` 且存在标题时：宽屏改为正文旁**右侧 sticky 目录**，滚动时高亮当前章节（scrollspy）
- 窄屏/移动端：不挤占正文宽度，保留顶部可折叠目录（或等价紧凑入口），避免侧栏压扁阅读栏
- 正文阅读栏宽度保持现有 `--main-width`（860px）契约；宽屏用额外侧栏空间承载 TOC，不把正文拉宽成双栏阅读
- 实现落在站点 `layouts/`、`assets/css/extended/`、可选 `assets/js/`；不改 PaperMod submodule 源码
- 更新 `blog-theme` 规格中关于目录展示的要求，并补充 Override Map 中的 TOC / 脚本锚点

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `blog-theme`: 新增「正文目录」要求（宽屏右侧 sticky + scrollspy；窄屏顶部折叠；仅 `ShowToc` 且有标题时出现），并扩展 Override Map

## Impact

- `layouts/single.html`、新建/覆盖 `layouts/_partials/toc.html`（或侧栏 TOC partial）
- `assets/css/extended/custom.css`：侧栏布局、sticky、当前项样式
- 新建轻量 `assets/js/`（或 inline）做 scrollspy；`layouts` 中按需引入
- `openspec/specs/blog-theme/spec.md`（归档时 sync）
- 现有开启 `ShowToc` 的文章（如 `114w-mq-backlog-observability`）将自动获得新行为
