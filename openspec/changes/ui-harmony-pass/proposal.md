# Proposal

## Why

上一轮 `reading-ui-polish` 已立住干净阅读骨架，但专业审阅仍见：代码块与 Chroma 内联样式契约冲突、首页 lead 抢戏、文题偏重、多级 TOC 过密、标签页 pill 与全站直角语言不一致、翻篇指向演示文、品牌 accent 静态几乎不可见。需要一次校准向的和谐度收口，而不是换皮。

## What Changes

- **代码块**：强制站点 token 覆盖 Hugo/Chroma 内联深色底；浅/深色各一层背景与字色，避免叠层
- **首页 lead**：降为气口（更小字号、常规字重），弱于列表标题与 Logo
- **翻篇导航**：`hiddenInHomeList` 文章不进入上一篇/下一篇序列
- **文题**：略收字号与字重，保留衬线但减轻报头感
- **TOC**：二级及以下更淡更紧；超长时视觉降权（不默认展开干扰）
- **标签页**：去胶囊圆角，对齐 `radius: 0`；计数为 1 且全站无更大计数时隐藏数字；页标题权重下调；标签/系列空态一句中文说明
- **Logo**：收紧中文字距
- **品牌点缀**：文题下极短 accent 线；长文顶栏 sticky + 极淡底
- **TOC 断点**：侧栏出现门槛略抬或轨宽略收，避免贴边

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `blog-theme`: 更新视觉层级、代码块、标签页形态、翻篇排除演示文、顶栏 sticky、文题 accent 短线等可观察行为

## Impact

- `assets/css/extended/custom.css`
- `layouts/_partials/post_nav_links.html`
- `layouts/_partials/header.html`（若需 sticky 类钩子）
- `layouts/taxonomy.html`、`layouts/search.html`（标签计数/空态）
- `layouts/list.html`（可选空态，主要 taxonomy）
- 不改 PaperMod 主题源码；不改正文内容结构
