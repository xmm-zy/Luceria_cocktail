# Luceria Cocktail Atelier · iPad 版设计 v2.1

v1 是桌面版，v2.1 把它重新设计成 iPad 应用。

- **平台**：iPadOS，横屏，画板 1194 × 834 pt（11" iPad）
- **语言**：界面全英文
- **风格**：“Counter”，即深色、Inter 粗体、胶囊控件、满版 Hero（底色随饮品变化）、底部悬浮标签栏
- **主题**：Dark、Light、High contrast。三种主题共用同一套 Figma 变量，只切换模式
- **设计源文件**：Figma 文件「Luceria Cocktail」，共 12 页，含可点击原型（5 条流程，409 个交互点）
- **版本**：v2.1（2026-11-15）

开发请从 [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) 开始。它分为通用、前端、后端、素材、验收五部分，并列出了需要开发人员替换或补充的素材（ASSET TODO）。

## 目录

```
Figma_design/v2/
├─ DEVELOPER_GUIDE.md        开发指南（前端 / 后端分开）
└─ exports/                  Figma 导出（PNG 1x；文件名 = 屏幕编号）
   ├─ 00_cover/              封面
   ├─ 01_foundations/        设计规范：颜色变量、对比度、字体、间距、图标、插画规则
   ├─ 02_components/         组件库（PDF 矢量）
   ├─ 03_onboarding/         L01–L10  启动、欢迎、年龄、吧台、口味、舒适度、通知、登录
   ├─ 04_tonight_recipes/    T01–T03 今晚 · R01–R05 配方库 · D01–D06 配方详情 · N01 通知 · U01 个人
   ├─ 05_mixing/             M00–M12  引导调制：总览、备料、逐步倒入、计时搅拌、装饰、完成
   ├─ 06_bar_shopping/       B01–B05 我的吧台与扫描 · S01–S04 购物清单
   ├─ 07_journal_party_learn/ J01–J04 日记 · C01–C02 社区故事 · K01–K02 学习 · P01–P04 派对与游戏
   ├─ 08_settings_system/    X01–X11 设置与无障碍 · A01–A02 大字号与 VoiceOver · Y01–Y03 异常与新版本
   ├─ 09_themes/             Dark/Light 下 Hero 随饮品变色；浅色模式 20 屏；高对比度 8 屏
   └─ 11_handoff/            交付说明：布局数值、动效、无障碍、Hero 配色规则、素材清单、配方数据
```

## 使用导出图时注意

- 导出图只用于浏览和评审。**图层名、变量、组件属性和原型连线只在 Figma 里有**，开发时以 Figma 为准。
- Figma 中屏幕下方的「ASSET TODO · for developers」批注不包含在导出图里，完整清单见开发指南第四部分。
- 插画中有若干张是临时素材（Margarita、Black Russian、Mojito、Whiskey Sour、Cosmopolitan 等），必须按开发指南替换后才能上线。
- 配方数据来自 [Difford's Guide](https://www.diffordsguide.com/)，使用前请按开发指南第三部分确认授权。
