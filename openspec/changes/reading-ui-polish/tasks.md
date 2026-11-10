# Tasks

## 1. 列表信息架构

- [x] 1.1 调整 `layouts/list.html`：条目顺序为标题 → 摘要 → meta；meta 仅日期/阅读时长，移除列表标签；验证首页源码顺序符合预期
- [x] 1.2 去掉列表 `.entry-footer` 的 `z-index` 抬层（`custom.css`）；验证点击标题/摘要可进入文章

## 2. 阅读尺度与代码块

- [x] 2.1 将 `--nav-width` 与 `--main-width` 同步为 `720px`；验证顶栏与正文同宽，宽屏 TOC 仍外挂
- [x] 2.2 增强 `.post-title` 字号/字距；验证相对列表标题有明显衬线层级
- [x] 2.3 浅色主题覆盖 `.highlight` / `pre` 为浅底深字（对齐 `--code-bg`）；验证文章内代码块不再是近黑底

## 3. 品牌温度与暗色

- [x] 3.1 调整 `.home-lead` 字号/字重/间距，使其强于列表 meta、弱于 Logo；验证首页可见站训层级
- [x] 3.2 确认/补齐 accent 在 blockquote、TOC 激活、导航激活、列表悬停的用法；验证静态页仍克制、无大色块
- [x] 3.3 调整暗色 `--secondary`（及必要时 `--content`）拉开层级；验证 meta/TOC 闲置项明显弱于正文
- [x] 3.4 Logo 仅「字母狂想」，无衬线约 `1.28rem`/500；验证顶栏品牌可读、偏科技感且不过重
- [x] 3.5 宽屏 TOC：主栏保持居中壳宽；目录 `position: fixed` 于正文右侧外侧；验证 Logo/正文左缘对齐且正文不因 TOC 平移
- [x] 3.6 侧栏/折叠目录展示多级（至少 h2/h3），用缩进与字号区分；scrollspy 高亮对应层级；验证长文侧栏可见嵌套项
- [x] 3.7 加强正文标题阶梯（h2/h3/h4 字号字重与章节留白）；验证 h2≫正文、h3 居中、章节呼吸感更强

## 4. 验收

- [x] 4.1 本地浏览首页、长文（含代码）、标签页、搜索页、亮/暗色；对照 delta scenarios 勾选通过
- [x] 4.2 运行 `openspec validate --change reading-ui-polish` 通过
