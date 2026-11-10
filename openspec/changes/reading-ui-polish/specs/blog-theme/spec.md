# Spec Delta

## MODIFIED Requirements

### Requirement: Visual Language

站点 SHALL 保持干净阅读风（纸色底、克制强调色、去卡片列表），而非终端等宽风或默认 PaperMod 卡片脸。

站点 SHALL 遵守下列视觉约束：

- 内容栏与顶栏同宽：`--nav-width` 与 `--main-width` 一致（当前 `720px`）；宽屏目录外挂于正文栏右侧外侧，正文栏保持与无目录页相同的居中位置与栏宽，SHALL NOT 为目录拉宽或平移主栏
- 列表：分隔线列表，无卡片壳、无首帖特写（`disableSpecial1stPost = true`）
- 衬线仅用于正文页大标题；列表标题与站点 Logo 用无衬线；正文大标题 SHALL 有可感知的衬线层级（相对列表标题更大字号或更开字距）；Logo 文案为「字母狂想」
- 正文内 h2 / h3（及可选 h4）SHALL 形成清晰字号与字重阶梯，且章节间距明显大于段落间距；h2 相对正文主字号 SHALL 有显著更大层级，h3 介于 h2 与正文之间
- 系统中文字体栈；SHALL NOT 依赖 Google Fonts 等外链字体
- 正文页标签为文本 `·` 分隔，非胶囊按钮
- 强调色用于链接悬停、导航激活、转载标记、引用左边线与目录激活项（当前亮色 `--accent: #2f5d50`；暗色 `--accent: #7eb8a6`）
- 浅色主题代码块（`.highlight` / `pre`）SHALL 使用纸色系浅底与深色文字，SHALL NOT 使用接近纯黑的终端底
- 暗色主题 SHALL 拉开正文色与次要色对比，使 meta、闲置目录项、页脚明显弱于正文
- 首页站训（`home-lead`）SHALL 以次于 Logo、强于列表 meta 的视觉权重呈现

#### Scenario: List appearance

- **WHEN** 用户打开首页文章列表
- **THEN** 条目呈现为分隔线列表，且第一篇与其余篇样式一致（无 `first-entry` 大卡）

#### Scenario: Typography roles

- **WHEN** 渲染首页列表与正文页
- **THEN** 列表标题与站点 Logo 为无衬线；`.post-title` 使用衬线，且相对列表标题有明显更大层级

#### Scenario: In-article heading ladder

- **WHEN** 打开含 h2 与 h3 的正文页
- **THEN** h2 明显大于正文主字号，h3 介于 h2 与正文之间，且 h2 上方留白显著大于普通段落间距

#### Scenario: Column width

- **WHEN** 查看顶栏与正文栏（无侧栏 TOC 时）
- **THEN** `--nav-width` 与 `--main-width` 均为 `720px`

#### Scenario: Light theme code block

- **WHEN** 在浅色主题打开含代码块的文章
- **THEN** 代码块背景为浅纸色系，文字为深色，而非近黑底浅字

#### Scenario: Dark theme secondary contrast

- **WHEN** 在暗色主题查看文章页 meta 或目录闲置项
- **THEN** 其颜色明显弱于正文主色，可区分层级

#### Scenario: Home lead weight

- **WHEN** 打开首页且展示站训
- **THEN** 站训可见，且视觉权重大于列表 meta、小于 Logo

## ADDED Requirements

### Requirement: List Entry Hierarchy

首页与同类文章列表的每条条目 SHALL 按下列顺序渲染可观察内容：

1. 标题
2. 摘要（若有且相对标题有增量信息）
3. meta：日期与阅读时长（若启用）

列表条目 meta SHALL NOT 展示标签。标签 SHALL 仅出现在正文页（及标签 taxonomy 等专页）。

列表条目 SHALL 允许用户点击标题或摘要区域进入文章（整卡可点或等价可点）；SHALL NOT 因 meta 层叠而阻断进入文章。

#### Scenario: List field order

- **WHEN** 首页列表渲染一篇带摘要与标签的文章
- **THEN** 自上而下为标题、摘要、日期（及阅读时长）；条目中不出现标签链接

#### Scenario: List navigate by title area

- **WHEN** 用户点击列表条目的标题或摘要区域
- **THEN** 进入该文章正文页

### Requirement: Multi-level Table of Contents

当文章启用目录且正文存在多级标题时，目录（宽屏侧栏与窄屏折叠）SHALL 展示嵌套层级（至少 h2 与 h3），并通过缩进与字号/字重区分层级。

宽屏侧栏目录项 SHALL 随当前可视章节高亮对应层级条目（含二级），SHALL NOT 仅将二级折叠映射为一级高亮。

#### Scenario: Nested TOC entries visible

- **WHEN** 用户在宽屏打开含 h2 与 h3 的启用目录文章
- **THEN** 侧栏目录同时可见一级与嵌套的二级条目，且二级相对一级有可见缩进

#### Scenario: Nested TOC scrollspy

- **WHEN** 用户滚动至某 h3 章节
- **THEN** 侧栏中对应 h3 目录项呈激活态
