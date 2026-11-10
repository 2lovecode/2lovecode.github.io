# Design

## Context

现状见 `proposal.md` Why。实现锚点已在 `openspec/specs/blog-theme` Override Map：`layouts/list.html`、`assets/css/extended/custom.css`。宽屏侧栏 TOC（`sticky-right-toc`）已落地：`.post-single.has-side-toc` 用 grid 把 TOC 放在 `--main-width` 之外。

## Goals / Non-Goals

**Goals:**

- 改善列表扫读与整卡点击
- 收窄阅读栏宽并保持顶栏同宽
- 浅色代码块与纸色语言一致
- 略抬品牌温度（lead / accent / 暗色层级），不改气质

**Non-Goals:**

- 不加卡片、首帖大图、外链字体
- 不改 PaperMod 主题源码
- 不重做搜索/归档/标签页信息架构（标签页胶囊网格保持）
- 不做移动端汉堡菜单（可后续单独 change）

## Decisions

### 1. 栏宽：`--nav-width` = `--main-width` = `720px`

- **选择**：同步收窄，保持「顶栏与正文同宽」契约。
- **宽屏 TOC**：不拉宽/平移 `.main`；正文保持居中。目录 `position: fixed` 放在正文栏**右侧**外侧（`50% + main-width/2 + gap`）。
- **多级目录**：取消侧栏「只显示 h2」；展示 Hugo TOC 嵌套；二级用左边线 + 缩进 + 更小字号；scrollspy 直接高亮当前 h2/h3（不再把 h3 映射回 h2）。`--toc-rail` 略加宽至约 `12.5rem`。
- **备选**：加宽 main + grid 右挂 TOC → 会平移正文、顶栏易错位，已放弃。
- **备选**：690px → 偏紧；720px 对中英混排更稳。

### 2. 列表：DOM 顺序标题 → 摘要 → meta；列表去掉标签

- **选择**：在 `list.html` 把 `entry-content` 挪到 `entry-footer` 之前；footer 只渲染 `post_meta`（日期/时长），删除列表内 tags 循环。
- **备选**：列表保留最多 2 个标签 → 仍干扰扫读与点击；标签已有专页与正文页，列表省略更干净。
- **点击**：去掉 `.entry-footer { z-index: 1 }`（列表不再需要抬层给标签）；保留 PaperMod `.entry-link` 整卡覆盖即可。

### 3. 浅色代码块：覆盖 PaperMod `.highlight` 深色底

- **选择**：浅色主题下将 `.highlight`、`pre` 背景设为 `var(--code-bg)`，文字用深色主/内容色；语法高亮色可保留 chroma 类名但整体偏浅底（必要时弱化过亮 token）。
- **备选**：继续深色代码块 → 与纸色冲突，放弃。
- **暗色**：暗色主题可继续深底（与页面一致），本 change 不强制改 chroma 主题包。

### 4. 标题衬线、Logo 与 home-lead

- **标题**：`.post-title` 提到约 `2.05rem`，`letter-spacing` 约 `0.03em`。
- **正文内阶梯**：h2 ≈ `1.42rem`/700；h3 ≈ `1.16rem`/600；h4 ≈ 正文略强；加大 h2 上边距，拉开章节块。避免装饰线堆砌。
- **Logo**：无衬线「字母狂想」（约 `1.28rem` / 500 / 略开字距）；衬线留给正文大标题。
- **lead**：字号约 `0.98–1.02rem`，颜色仍用 secondary 但略提高对比或字重 500；与列表首条间距略加大，避免贴死。

### 5. 强调色与暗色层级

- **accent**：保持现有色值；确保 blockquote 左边线、TOC `.is-active`、导航激活、列表悬停标题已用 accent；不新增大色块。
- **暗色**：将 `--secondary` 调暗（例如 `#8a8a8a` 量级），必要时略提 `--content`，拉开与 primary 的阶梯；不改 accent 语义。

## Risks / Trade-offs

- [列表不再显示标签] → 发现性略降；靠标签页/搜索托底/正文标签弥补。
- [720px 栏宽] → 宽屏留白更多；符合阅读站，非仪表盘。
- [覆盖 highlight 背景] → 个别 chroma 前景色对比可能不足；实现时抽样检查并微调 token。
- [去掉 footer z-index] → 若日后列表再加可点标签，需重新设计热区，勿直接恢复抬层盖住整卡。

## Migration Plan

- 仅静态资源与模板；Hugo 重建即可，无数据迁移。
- 回滚：还原 `list.html` 与 `custom.css` 相关 diff，并回退本 change 的 spec delta（或 archive 前直接丢弃 change）。

## Open Questions

无（栏宽取 720、列表去标签已在提案中锁定）。
