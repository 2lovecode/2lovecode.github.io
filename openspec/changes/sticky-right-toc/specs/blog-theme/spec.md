# Spec Delta

## ADDED Requirements

### Requirement: Post Table of Contents

当文章页启用 `ShowToc` 且正文存在可进目录的标题时，站点 SHALL 展示中文文案的目录（如「目录」）。

宽屏（足以并排阅读栏与侧栏而不压缩 `--main-width` 阅读栏）时，目录 SHALL 出现在正文右侧，并在页面滚动过程中保持可见（sticky）；目录项 SHALL 随当前可视章节高亮对应条目（scrollspy）。点击目录项 SHALL 跳转到对应标题锚点。

窄屏时，目录 SHALL NOT 以挤压阅读栏的固定侧栏形式展示；SHALL 改为正文顶部（或等价）可折叠目录入口。

未启用 `ShowToc`、或无可进目录标题时，SHALL NOT 展示目录 UI。

正文阅读栏宽度 SHALL 仍遵守现有 `--main-width` 与顶栏同宽契约；宽屏侧栏占用的是阅读栏之外的额外空间。

#### Scenario: Wide screen sticky TOC with scrollspy

- **WHEN** 用户在宽屏打开 `ShowToc = true` 且含多级标题的文章，并滚动正文
- **THEN** 右侧可见 sticky 目录，且当前章节对应的目录项呈激活态

#### Scenario: Narrow screen compact TOC

- **WHEN** 用户在窄屏打开同样启用目录的文章
- **THEN** 目录不以挤压正文的右侧固定侧栏出现，而可通过顶部折叠目录使用

#### Scenario: TOC gated by ShowToc

- **WHEN** 文章未设置 `ShowToc`，或正文没有可进目录的标题
- **THEN** 页面不展示目录 UI

## MODIFIED Requirements

### Requirement: Override Map

主题行为的实现锚点 SHALL 落在下列站点文件；Agent SHALL 优先修改这些路径，并在行为偏离时先更新 OpenSpec change 再改代码：

| 区域 | 路径 |
|------|------|
| 配置 | `hugo.toml` |
| 视觉 | `assets/css/extended/custom.css` |
| 列表/摘要 | `layouts/list.html` |
| 正文/转载 | `layouts/single.html`、`layouts/_partials/repost_notice.html` |
| 正文目录 | `layouts/_partials/toc.html`（及同目录相关 partial）、可选 `assets/js/` 中 scrollspy 脚本 |
| Meta 日期 | `layouts/_partials/post_meta.html` |
| 顶栏 | `layouts/_partials/header.html` |
| 页脚 | `layouts/_partials/footer.html` |
| 面包屑 | `layouts/_partials/breadcrumbs.html` |
| 归档月份 | `layouts/archives.html` |
| 标签页 | `layouts/taxonomy.html` |
| 搜索 | `layouts/search.html` |
| 新文模板 | `archetypes/default.md` |

站点 SHALL NOT 通过直接编辑 `themes/PaperMod` 源码来实现长期定制（submodule 版本升级除外）。

#### Scenario: Changing theme behavior

- **WHEN** Agent 需要调整主题可见行为
- **THEN** 先对照本规格；若行为将偏离，先创建 OpenSpec change，再改上表路径中的实现
