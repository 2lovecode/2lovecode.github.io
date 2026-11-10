# Design

## Context

当前正文页用 PaperMod 默认 `details.toc` 折叠块，插在标题区与 `.post-content` 之间。站点 `--main-width` / `--nav-width` 均为 `860px`，顶栏与正文同宽。定制只允许落在站点 `layouts/`、`assets/css/extended/` 等覆盖层。见 `proposal.md` Why。

## Goals / Non-Goals

**Goals:**

- 宽屏：右侧 sticky TOC + 滚动高亮当前 h2/h3
- 窄屏：不破坏 860px 阅读体验，保留顶部折叠 TOC
- 零第三方依赖；脚本尽量小、仅在有 TOC 的文章页加载

**Non-Goals:**

- 不改全局顶栏宽度契约，不为 TOC 永久加宽所有页面
- 不做目录自动展开全部嵌套到很深层级的特殊交互
- 不引入新的 front matter 开关（继续用 `ShowToc`）
- 不修改 `themes/PaperMod` submodule

## Decisions

### 1. 布局：宽屏「阅读栏居中 + 右侧绝对/粘性侧栏」，而非把整页改成两栏网格

- **选择**：`.post-single` 在有 TOC 时增加修饰 class（如 `has-side-toc`）。阅读栏仍 `max-width: var(--main-width)` 居中；TOC 用 `position: sticky` 放在阅读栏右侧的 gutter（`position: absolute` 相对更宽容器，或 CSS grid：`1fr minmax(0, main) toc 1fr` 变体）。
- **理由**：规格要求阅读栏保持 860px；若用「正文+侧栏」挤在 860 内，正文会被压窄。
- **备选**：把 `--main-width` 临时加宽到 `860 + toc` —— 会破坏顶栏同宽观感，否决。

### 2. 断点

- **选择**：约 `≥1200px`（860 阅读栏 + ~220 TOC + 边距）启用侧栏；以下回退顶部 `details.toc`。
- **理由**：保证侧栏不与正文重叠、不触发横向滚动。
- **备选**：始终侧栏、小屏改抽屉 —— 实现更重，本站文章量小，顶部折叠足够。

### 3. Markup

- **选择**：站点覆盖 `layouts/_partials/toc.html`：输出一套 DOM，内含 `nav.post-toc`（侧栏用）+ 窄屏用的 `details.toc`（可用同一份 `.TableOfContents` 渲染两次，或一处 DOM + CSS 切换展示形态）。优先「一份 TOC 列表、两套外壳用 CSS/`display` 切换」减少重复；若 Hugo partial 不便，允许桌面/移动各渲染一次 TOC（静态 HTML 体积可接受）。
- **`single.html`**：有 TOC 时给 `article` 加 `has-side-toc`，并在合适位置引入 partial + scrollspy 脚本。

### 4. Scrollspy

- **选择**：原生 `IntersectionObserver` 观察 `.post-content h2, h3`（与 Hugo TOC 层级一致），给对应 `a[href="#id"]` 加 `.is-active`；点击使用既有锚点跳转（可 `scroll-margin-top` 避开 sticky header）。
- **理由**：无依赖、体量小。
- **备选**：监听 `scroll` 算 offset —— 更易抖、费电，否决。

### 5. 视觉

- 侧栏字号小于正文，次要色；激活项用既有 `--accent` + 字重/左边线，呼应顶栏激活态，不做卡片壳。
- 长目录：侧栏自身 `max-height: calc(100vh - …)` + `overflow-y: auto`。

## Risks / Trade-offs

- [极宽屏以外 TOC 与正文重叠] → 用明确 min-width 媒体查询；重叠时隐藏侧栏、显示顶部折叠
- [IntersectionObserver 在短节连续滚动时高亮跳动] → 取「交叉比例最高」或「顶部偏移阈值内最后一个进入」策略，并测长文
- [重复 TOC DOM] → 可接受；若嫌冗余再改为单 DOM + CSS

## Migration Plan

1. 落地 layouts/CSS/JS 覆盖
2. `hugo server` 用已有 `ShowToc` 文验证宽/窄屏与滚动高亮
3. 无 `ShowToc` 文确认无目录 UI
4. 回滚：删覆盖 partial/脚本相关 CSS，恢复主题默认 TOC 即可

## Open Questions

（无 — 断点取 1200px、观察 h2+h3，实现期可微调数值而不改规格语义）
