# Proposal

## Why

站点已具备干净阅读风，但列表信息层级（标题被 meta/标签切断）、正文行宽偏长、浅色主题代码块呈「黑岛」、强调色与首页站训过弱，拉低专业阅读站的完成度。需在不改变整体气质的前提下做一轮可读性与品牌温度的精修。

## What Changes

- 列表条目信息顺序改为：标题 → 摘要 → 日期/阅读时长；列表 meta **不再展示标签**（标签仍在正文页）
- 列表整卡可点：去掉与整卡链接冲突的 footer 抬层；无标签热区后，标题与摘要区域均可进入文章
- 内容栏与顶栏同宽收窄为约 `720px`（侧栏 TOC 仍外挂，不挤占正文）
- 浅色主题代码块改为纸色系浅底深字，与 `--code-bg` 对齐，避免终端黑岛
- 正文大标题略增强衬线存在感（字号/字距）
- 首页 `home-lead` 略抬视觉权重，成为可读站训
- 强调色在静态态有克制现身（如 blockquote 已有；补 TOC / 列表悬停以外的细节点，不铺色）
- 暗色主题拉开 `--content` 与 `--secondary` 对比，改善 meta / TOC / 页脚层级

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `blog-theme`: 更新 Visual Language（栏宽数值、列表信息架构、代码块浅色表现、强调色与暗色层级、首页 lead）

## Impact

- `layouts/list.html`：条目 DOM 顺序与 meta 字段
- `assets/css/extended/custom.css`：token、列表、正文、代码、lead、暗色
- `openspec/specs/blog-theme/spec.md`：归档时同步长期规格
- 不改 `themes/PaperMod` 源码；不引入外链字体；不加卡片/首帖大图
