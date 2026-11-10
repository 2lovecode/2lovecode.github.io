# Tasks

## 1. Markup 与页面结构

- [x] 1.1 覆盖 `layouts/_partials/toc.html`：在有标题时输出侧栏 `nav.post-toc`（含标题「目录」+ `.TableOfContents`）以及窄屏用的顶部 `details.toc`；用浏览器查看源码确认两种形态 DOM 均存在且锚点正确
- [x] 1.2 调整 `layouts/single.html`：`ShowToc` 时给 `article` 增加 `has-side-toc`（或等价），并按需挂载 TOC partial 与 scrollspy 脚本入口；确认未 `ShowToc` 的文章无相关 class/脚本

## 2. 样式

- [x] 2.1 在 `assets/css/extended/custom.css` 实现宽屏（约 ≥1200px）右侧 sticky TOC：阅读栏保持 `--main-width`，侧栏不挤压正文；验证宽屏下目录贴右侧且滚动时仍可见
- [x] 2.2 窄屏隐藏侧栏、显示顶部折叠 TOC；验证窄视口下正文宽度不被侧栏占用
- [x] 2.3 目录激活态、字号、滚动溢出与 `scroll-margin-top` 对齐现有强调色；肉眼确认激活态清晰且无卡片壳

## 3. Scrollspy

- [x] 3.1 新增轻量脚本（如 `assets/js/toc-scrollspy.js`）用 IntersectionObserver 同步 `.post-content` 的 h2/h3 与目录链接 `.is-active`；在启用 TOC 的长文滚动时确认高亮随章节切换，点击目录可跳转

## 4. 验收

- [x] 4.1 `hugo server` 打开 `posts/114w-mq-backlog-observability/`：宽屏侧栏 + scrollspy，窄屏顶部折叠；再打开无 `ShowToc` 的文章确认无目录 UI
- [x] 4.2 `openspec validate --change sticky-right-toc` 通过
