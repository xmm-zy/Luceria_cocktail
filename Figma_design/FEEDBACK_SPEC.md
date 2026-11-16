# Luceria iPad 应用 · 反馈补充规范（开发必读）

> **为什么有这份文档**：设计稿已经画出了核心流程的反馈（引导调制、吧台录入、筛选、收藏、计时、离线等），但下面列出的反馈状态在 Figma 中**还没有画**。开发时请直接按本文实现，不需要等设计更新。
> **怎么用**：与 [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) 的 2.6 节（交互与动效）和 2.7 节（无障碍）一起读。本文与 Figma 冲突时，以 Figma 中**已画出的**内容为准；Figma 没画的，以本文为准。
> **文案**：表中引号里的英文就是界面文案，请原样使用。`{…}` 为变量。
> **令牌**：颜色、阴影均使用 `data/tokens.json` 中的变量名，不要写死色值。

---

## 0. 总则

### 0.1 三条要求

每一次用户操作和每一次系统状态变化，都必须给出满足下面三条要求的反馈：

| 要求 | 含义 | 自检问题 |
|---|---|---|
| **清晰** | 用户能看出：我选了什么、现在处于什么模式、系统怎样理解了我的操作 | 不看说明，用户能说出刚才发生了什么吗？ |
| **及时** | 在用户的注意力离开之前回应 | 点下去之后，100 ms 内有没有任何变化？ |
| **丰富** | 用户可能没在看屏幕（手忙、站得远、厨房吵），所以重要事件要通过多个通道传达 | 只用一种颜色、或者只用一种声音的反馈，都不合格 |

### 0.2 每次操作的三层反馈

| 层 | 时限 | 内容 | 例 |
|---|---|---|---|
| ① 收到 | < 100 ms | 控件自身的状态变化（按下、勾选、切换） | 按钮按下变暗 |
| ② 结果 | ≤ 1 s | 发生了什么，写明具体对象 | “Dry vermouth added” |
| ③ 影响 | 与 ② 一起 | 这对用户意味着什么，可以撤销吗 | “· 4 more cocktails you can make” 加 Undo |

①必须有；②和③视操作重要程度而定（见第 2 节的表）。

### 0.3 五种反馈形式（不要混用）

| 形式 | 只用于 | 不要用于 |
|---|---|---|
| **原位状态变化** | 选择、开关、勾选、评分 | — |
| **行内说明** | 与某一项直接相关的状态或错误（字段错误、“⚠ Low”） | 全局状态 |
| **Toast** | **可撤销**的操作结果 | 需要用户处理的错误；不可撤销的结果 |
| **横幅** | 持续存在的系统状态（离线、调制未完成、模式） | 一次性的结果 |
| **对话框** | **不可逆或代价高**的操作**之前**的确认 | 成功提示；可撤销的操作 |

### 0.4 等待时间分级

| 预计耗时 | 反馈 |
|---|---|
| < 300 ms | 不显示加载（避免闪烁），只有 ① |
| 300 ms – 1 s | 按钮进入 Loading 状态（第 1 节） |
| 1 – 10 s | 骨架屏或带文字的进行中提示，文字说明正在做什么（“Sending…”），而不是只有转圈 |
| > 10 s | 进度条加百分比或剩余时间，并提供 Cancel |
| 无法预估 | 带文字的不确定进度，并在 8 s 后给出替代路径（第 4 节扫描的例子） |

---

## 1. 组件交互状态

Figma 的 Button 组件目前只有 `Kind`（primary / secondary / danger）和 `Size`（Default 52 / Large 60 / Mixing 88）两个属性。实现时需要补上第三个属性 **State**。Chip、RoundButton、列表行同样适用 Pressed、Disabled、Focused。

| State | 视觉 | 时长 | 无障碍 |
|---|---|---|---|
| **Default** | 同 Figma | — | — |
| **Pressed** | 叠加 8% 黑色（深色模式下改为 8% 白色），缩放 0.97 | 按下立即生效，松开后 120 ms 恢复 | — |
| **Disabled** | 整体不透明度 40%，不响应点击 | — | 读屏读作 “dimmed”；**旁边必须有一行说明为什么不可用** |
| **Loading** | 文字换成转圈加进行时文案（如 “Sending…”）；宽度保持不变；不响应点击 | 等待超过 300 ms 才进入 | 读屏读作 “busy”；结束后播报结果 |
| **Focused**（键盘 / Switch Control） | 外侧 3 pt 描边，颜色 `focus/ring`；使用 Figma 中的 `Focus/Ring` 效果样式 | — | 必须始终可见，不能被裁切 |

**必须使用 Disabled 的位置**（每处都配说明文字）：

| 屏幕 | 控件 | 何时禁用 | 说明文字 |
|---|---|---|---|
| L04 | Continue | 一瓶都没选 | “Pick at least one bottle, or tap Skip.” |
| L09 | Send code | 邮箱为空 | （无需说明，输入框为空本身就是原因） |
| L10 | Verify | 不足 6 位 | （同上；输满 6 位自动提交） |
| S02 | Add to list | 名称为空 | — |
| J04 | Save | 没有名称或没有材料 | 见第 4 节 |

---

## 2. 操作结果反馈（Toast）

### 2.1 Toast 规格

- 使用 Figma Components 页的 **Toast** 组件：成功类用 `Type=success`，系统状态类用 `Type=info`。
- **位置**：标签栏上方 16 pt，水平居中；没有标签栏的页面（调制、sheet 内）距底部 24 pt。阴影 `Elevation/Floating`，背景 `bg/elevated`。
- **时长**：4 s；带操作按钮时 6 s。
  - 开启 VoiceOver 或 Switch Control 时，**不自动消失**，直到用户关闭或操作（WCAG 2.2.1 计时可调）。
- **同时最多一个**。新的替换旧的；替换前，旧 Toast 的 Undo 视为放弃。
- **读屏**：出现时播报文案（SwiftUI：`AccessibilityNotification.Announcement`；Web：`aria-live="polite"`）。
- **Undo**：必须真正恢复到操作前的状态，包括由此引起的推荐和计数变化。

### 2.2 需要补的结果反馈

| 操作 | 屏幕 | 反馈形式 | 文案 | 操作按钮 |
|---|---|---|---|---|
| 添加一瓶酒到吧台 | B02、B03 | Toast | “{Dry vermouth} added · {4} more cocktails you can make”；新增为 0 时只写 “{Dry vermouth} added” | Undo |
| 扫描后标记为满 | B03 | Toast | “{Campari} marked full” | Undo |
| 从吧台移除 | B05 | Toast | “{Campari} removed · {5} cocktails are no longer ready” | Undo |
| 修改余量 | B05 | 原位（分段控件）；改为 Out 且开启了自动加清单时，额外弹 Toast | “{Campari} added to your list” | Undo |
| 加入清单（单项） | D01、B01、D03 | Toast；同时按钮原位变为 “Added ✓”，不可再点 | “{Orange} added to your list” | Undo |
| 加入清单（多项） | P01 | Toast，**整体反馈，不要逐项弹出** | “{3} items added to your list” | View list |
| 清除已勾选 | S01 | Toast | “{2} items cleared” | Undo |
| 复制清单 | S03 | Toast | “Checklist copied” | — |
| 保存到日记 | M12 | Toast | “Saved to your journal” | View |
| 保存自建配方 | J04 | Toast | “{Velvet Ember} saved” | View |
| 发表评价 | D04 | Toast | “Review posted” | — |
| 调制后自动扣减库存（X06 “Update my bar after mixing” 开启时） | M12 | **行内说明**，放在完成信息下方（此时用户正在看完成页，不用 Toast） | “Your bar is updated: {Campari} is now Low.” | Undo（文字链接） |

**不需要 Toast 的操作**：设置开关、筛选 chips、份数步进器、标记已读。这些都只用原位变化。

---

## 3. 等待与进度

| 场景 | 屏幕 | < 1 s | 1 – 10 s | 超过 10 s 或失败 |
|---|---|---|---|---|
| 发送验证码 | L09 | — | 按钮 Loading：“Sending…” | 失败时显示行内错误（第 4 节） |
| 验证 | L10 | 输满 6 位自动提交 | 按钮 Loading：“Verifying…” | 同上 |
| Apple / Google 登录 | L08 | — | 从系统登录框返回后，按钮 Loading：“Signing in…” | 同上 |
| 同步 | X09 Sync 行 | — | 副标题 “Syncing…” 加转圈 | 成功：“Last synced just now”；失败：进入 Y02 |
| 导出数据 | X09 Export my data | — | sheet：“Preparing your data” 加进度条 | 显示百分比，例如 “Preparing your data · 40%”，并提供 Cancel；完成后打开系统分享面板 |
| 配方库加载 | R05 | — | 骨架屏（已设计） | 超过 10 s 或失败：显示 “Couldn't load recipes.” 与 Try again |
| 搜索 | R03 | 输入时实时更新（150 ms 防抖），不显示转圈 | 超过 1 s 时，列表顶部显示细进度条 | — |
| 扫描瓶标 | B03 | — | 结果胶囊显示 “Looking for a label…” | 8 s 无结果，进入“认不出”状态（第 4 节） |
| 吧台变化后重算推荐 | T01、R01 | 本地立即完成 | — | — |

---

## 4. 校验与失败状态

### 4.1 字段错误的统一样式

- 输入框描边改为 2 pt `status/danger`。
- 下方一行错误文字：Footnote 样式、`status/danger`，**前面加警示图标**，不能只靠颜色。
- 第一次输入时，在失焦或提交时校验；出错后改为边输入边校验，改对后立即消除错误。
- **不清空**用户已经输入的内容。
- 提交时把焦点移到第一个出错的字段，并由读屏播报错误（Web：`aria-live="assertive"`）。
- 触觉：error（第 7 节）。

### 4.2 需要补的错误与失败状态

| 屏幕 | 情况 | 文案 | 操作 |
|---|---|---|---|
| L03 | 年份不合理（早于 1900 或晚于今年） | “Enter a year between 1900 and {2026}.” | — |
| L09 | 邮箱格式错误 | “That doesn't look like an email address. Check for a typo.” | — |
| L10 | 验证码错误 | “That code didn't match. Check the email we sent, or resend.” 数字格整体左右晃动一次（开启减少动态效果时不晃动，只变红） | Resend code |
| L10 | 验证码过期 | “This code has expired. We've sent you a new one.”（自动重发） | — |
| L08–L10 | 网络失败 | “Couldn't reach Luceria. Check your connection and try again.” | Try again |
| B03 | 8 s 认不出瓶标 | 结果胶囊：“Can't read this label”；副文：“Turn the bottle so the label faces the camera, or add more light.” | Search instead（进入 B02，搜索框获得焦点）/ Try again |
| B04 | 已经拒绝相机权限 | 取景框换成说明：“Camera access is off” / “Turn it on in Settings to scan labels, or search by name.” | Open Settings / Search instead |
| J04 | 缺少名称 | “Give your recipe a name.” | — |
| J04 | 没有材料 | “Add at least one ingredient.” | — |
| D04 | 空评价 | 星级未选时，“Post” 为 Disabled，说明：“Tap a star to rate.” | — |
| Y02 | 点 Details | 打开 sheet，依次写：发生了什么（用户的语言，例如 “Your latest changes haven't reached your other devices yet.”）；上次成功同步的时间；哪些数据是安全的（“Everything is saved on this iPad.”）。最后用小字写错误代码，仅供联系客服时使用 | Try again / Contact support |

---

## 5. 模式与状态指示

用户必须随时能看出“我现在处于什么模式”。以下几种情况，设计稿中还没有画出指示：

| 状态 | 位置 | 设计 | 文案 |
|---|---|---|---|
| **Zero-proof 模式开启** | T01 Hero 标签行右侧；R01 标题副文 | 胶囊徽章：叶子图标加文字，`fill/2` 底、`text/secondary` 字；点击进入 X08 | 徽章：“Zero-proof”；R01：“Zero-proof mode · {18} you can make” |
| **已达每周上限** | T01 | 同样的徽章；Hero 优先展示无酒精饮品，并在描述上方加一行。**语气中性，不评价用户** | 徽章：“Weekly limit reached”；说明：“You've reached the limit you set for this week, so here's a zero-proof pick.” |
| **离线** | 所有页 | 离线横幅（Y01，已设计）关闭后，顶部右侧保留一个 `wifiOff` 小图标，直到恢复联网；恢复时弹 Toast | 恢复：“You're back online.” |
| **调制未完成（保留 10 分钟）** | 所有标签页，标签栏上方 | 横幅：饮品名、步骤、剩余保留时间、按钮 | “{Negroni} · step {5} of {6} · kept for {9} min”，按钮 “Resume” |
| **计时在后台运行**（离开应用） | 系统层 | iOS：Live Activity 或本地通知；Web：不支持后台时，回到页面后显示正确的剩余时间 | 通知：“{Negroni}: stirring is done. Time to garnish.” |

---

## 6. 语音控制反馈（M10）

设计稿只画了 “Listening…”。完整的状态如下：

| 状态 | 胶囊内容 | 时长 | 其他 |
|---|---|---|---|
| Listening | “Listening…” 加声波（已设计）。**右侧加一个关闭按钮** | 持续 | 关闭按钮的读屏标签：“Stop listening” |
| Heard | “Heard ‘{next}’” | 显示 1 s 后执行 | 触觉 selection |
| 回答问题 | 例如问 “How much gin?” 时，显示 “{30 ml} into each glass” | 4 s | 同时朗读答案 |
| Not understood | “Didn't catch that. Try ‘next’, ‘back’, ‘repeat’ or ‘pause timer’.” | 4 s 后回到 Listening | 触觉 warning |
| 麦克风不可用 | “Microphone access is off. Turn it on in Settings to use voice.” | — | 按钮 “Open Settings” |

如果开启了朗读步骤，执行 “next” 后系统会读出下一步，就不需要再额外播报 “Heard”。

---

## 7. 声音与触觉对照表

| 事件 | 触觉（iOS） | 声音 | 视觉替代 / 补充 | 用户设置 |
|---|---|---|---|---|
| 选择变化（chip、分段、步进器） | `UISelectionFeedbackGenerator` | — | 原位变化 | — |
| 成功（已添加、已保存、已发送） | `.success`（`UINotificationFeedbackGenerator`） | — | Toast | — |
| 提醒（余量低、达到上限、没听清） | `.warning` | — | 行内说明或徽章 | — |
| 错误（字段错误、验证码错误、扫描失败） | `.error` | — | 字段错误样式 | — |
| 调制中自动进入下一步 | `UIImpactFeedbackGenerator(.light)` | — | 进度条前进；朗读下一步（若开启） | X03 Read steps aloud |
| **计时结束** | `.success` | Chime（按设备音量播放） | 满环与 “Well chilled”；全屏柔和闪烁（若开启） | X03 Chime / Haptic tap / Flash the screen |
| 危险操作确认 | — | — | 对话框 | — |

**规则**：

- 声音**只用于计时结束**，其他事件不发声。
- 任何信息都**不能只靠触觉或只靠声音**传达，必须同时有视觉。
- 开启“减少动态效果”时，晃动和闪烁改为静态的颜色与文字变化；闪屏需要用户主动开启。
- Web 端：iPad 上的 Safari 不支持 `navigator.vibrate`，所以只保留视觉和声音。

---

## 8. 后端需要配合

| 前端需要 | 后端提供 |
|---|---|
| “{4} more cocktails you can make”、“{5} cocktails are no longer ready” | 修改吧台的接口返回变化前后可做饮品数量的差值，或者返回新的可做列表 |
| 验证码错误与过期要区分 | 验证接口返回不同的错误类型（`code_invalid` / `code_expired`），并在过期时支持自动重发 |
| 同步状态与 “Last synced …” | 同步接口返回最近一次成功的时间；失败时返回可展示的原因分类 |
| 导出数据的进度 | 导出做成异步任务，提供进度查询（百分比）和取消 |
| 网络失败与服务器失败要区分 | 统一的错误结构；前端只展示用户语言，错误代码只放在 Details 里 |

---

## 9. 验收清单

- [ ] 每个可点击控件都有 Pressed、Disabled、Loading、Focused 状态，Disabled 处都有原因说明（第 1 节）
- [ ] 第 2.2 节每个操作都有结果反馈；带 Undo 的都能真正撤销，包括推荐和计数
- [ ] 批量加入清单只弹一个整体 Toast
- [ ] 开启 VoiceOver 时，Toast 不会自动消失，并且会被播报
- [ ] 所有超过 300 ms 的等待都有带文字的进行中状态；超过 10 s 的有进度和 Cancel（第 3 节）
- [ ] 第 4.2 节每种错误都按 4.1 节的样式实现，不清空输入，焦点移到第一个错误
- [ ] Zero-proof、已达上限、离线、调制未完成四种状态在 Tonight 上都能看出来（第 5 节）
- [ ] 语音有 Heard、Not understood 状态和 “Stop listening” 按钮（第 6 节）
- [ ] 声音与触觉按第 7 节实现；关闭声音或触觉后，信息仍然完整
