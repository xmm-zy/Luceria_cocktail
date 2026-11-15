# Luceria Cocktail Atelier · 桌面版设计 v1.0

> **最新版本是 iPad 版 v2.1**，见 [v2/README.md](v2/README.md)；开发指南见 [v2/DEVELOPER_GUIDE.md](v2/DEVELOPER_GUIDE.md)。以下是 v1.0 桌面版的说明。

基于 [drink-app](https://github.com/xmm-zy/drink-app) 重新设计的桌面应用界面。

**定位**：你桌面上的私人地下酒吧，一个「内容 + 工具 + 社区」型的生活方式应用，可以查配方、管理家庭吧台、跟着步骤调酒、听音乐，也能和朋友玩几局。

**基调**：复古地下酒吧 × 现代编辑排版。默认是夜间主题 Night Bar，另有羊皮纸浅色主题 Parchment。

- 画板尺寸：1440 × 900
- 平台：Windows / macOS
- 设计源文件：Figma，共 6 个页面
- 版本：v1.0（2026-11-12）

## 目录

```
Figma_design/
├─ exports/            # 各画面导出的 PNG（1x）与组件库 PDF
│  ├─ 00_cover/        封面
│  ├─ 01_foundations/  设计规范：色彩、字体、间距、层级、图标、插画、标志
│  ├─ 02_components/   组件库（PDF 矢量）
│  ├─ 03_onboarding/   新用户引导 O1–O9
│  ├─ 04_app/          主应用 A01–A12
│  └─ 05_system/       系统与状态 S1–S8
└─ build-scripts/      生成 Figma 设计稿的脚本（figwright MCP）
```

## 页面清单

| 编号 | 页面 | 说明 |
| --- | --- | --- |
| O1 | 启动页 | 无边框小窗，品牌徽章与加载进度 |
| O2 | 年龄确认 | 法定饮酒年龄确认；未满 18 岁可以浏览无酒精特调 |
| O3–O5 | 欢迎轮播 | 酒单 / 吧台 / 社交三屏介绍 |
| O6 | 口味偏好 | 8 种风味、酒精度、常用基酒，并实时预览推荐 |
| O7 | 我的吧台设置 | 勾选家里已有的材料，实时显示现在能调哪些酒 |
| O8 | 创建账号 | 昵称、头像、邮箱验证码登录 |
| O9 | 功能导览 | 聚光灯 + 提示气泡 + 步骤清单 |
| A01 | 发现 | 今夜特调、用你的吧台就能调、继续阅读、每日小知识 |
| A02 | 酒单库 | 搜索与筛选，左侧列表、右侧配方详情，附评论 |
| A03 | 调制模式 | 分步引导、计时圆环、本步骤材料清单 |
| A04 | 我的吧台 | 酒柜、可调统计、只差一样材料的酒款、购物清单 |
| A05 | 新建酒款 | 分段表单与实时卡片预览 |
| A06 | 器具与冰 | 器具图鉴、按酒款反查、冰块实验室 |
| A07 | 酒话论坛 | 发帖、话题、热门、社区守则 |
| A08 | 酒局 | 摇骰子、转转盘 |
| A09 | 牌局大厅 | 斗地主 / 扎金花房间与聊天 |
| A10 | 收藏 | 收藏的酒款与合集 |
| A11 | 个人主页 | 资料、风味雷达、成就徽章 |
| A12 | 唱片机 | 黑胶播放、播放队列、上传 MP3 / OGG |
| S1–S8 | 系统与状态 | 设置、Ctrl K 全局搜索、通知、登录弹窗、空状态与提示、离线、关于与更新、羊皮纸主题 |

## 设计系统

- **颜色**：以 Figma 变量提供，分两组：`Luceria Color`（Night）和 `Luceria Color · Parchment`。色板源自原仓库 `styles.css` 中的 champagne / cream / honey / coffee / balsamico / olive / gold-foil。
- **字体**：Cormorant Garamond 用于英文标题与数字，Noto Serif SC 用于中文标题，Noto Sans SC 与 Inter 用于正文和界面文字。
- **组件**：Button（Kind × Size）、Chip、Tag、Badge、Input、Toggle、Checkbox、Segmented、NavItem、Avatar、Card/Cocktail、Toast、TitleBar、PlayerBar、Sidebar。
- **插画**：沿用原仓库的 Riso 风格酒杯插画与照片素材。

## 重新生成设计稿

`build-scripts/` 中的脚本通过 [figwright](https://github.com/awdr74100/figwright) 在 Figma 中生成全部画面，具体用法见 [build-scripts/README.md](build-scripts/README.md)。

注意，脚本里的图片素材路径指向本地克隆的 drink-app 仓库（`engine.mjs` 中的 `ASSET`），换机器使用前需要改成你本机的路径。
