import { F, H, V, T, R, E, I, IMG, SVG, grad, rgrad } from "./engine.mjs";
import * as U from "./ui.mjs";
import * as A from "./screens-app.mjs";
const { DRINKS: D, btn, chip, tag, eyebrow, card, appWindow, page, pageHeader, art, avatar, iconBtn, input, progress, checkbox, segmented, divider, ornament, emblem, field, toggle, kbd, WIN } = U;

const dim = (kids, o = {}) => F({ name: "ModalLayer", w: WIN.w, h: WIN.h, abs: true, x: 0, y: 0, fill: ["#070404", o.a ?? 0.66] }, kids);
const withOverlay = (win, name, overlay) => { win.name = name; win.kids.push(overlay); return win; };

// ======================= S1 Settings =======================
export function settings(o = {}) {
  const nav = [["sliders", "通用"], ["sun", "外观"], ["ruler", "单位与度量"], ["music", "播放器"], ["bell", "通知"], ["lock", "账号与隐私"], ["keyboard", "快捷键"], ["info", "关于 Luceria"]];
  const row = (t, d, ctrl) => H({ name: "SettingRow", sizeH: "fill", pad: [16, 0], gap: 20, align: "center" }, V({ gap: 2, sizeH: "fill" }, T(t, { s: "bodyM" }), d && T(d, { s: "small", c: "text/muted", fillW: true })), ctrl);
  const themeCard = (name, en, on, light) => V({ name: "ThemeCard" + (on ? "/on" : ""), sizeH: "fill", gap: 12, pad: 12, r: 14, fill: on ? "bg/raised" : "bg/surface", stroke: on ? "accent/honey" : "line/subtle", sw: on ? 1.5 : 1 },
    F({ name: "Mini", sizeH: "fill", h: 120, r: 10, clip: true, fill: light === "sys" ? grad([[0.5, "#F2E4C6"], [0.5, "#110B09"]], 0) : light ? "#F2E4C6" : "#110B09", stroke: "line/subtle" },
      R({ x: 0, y: 0, w: 60, h: 120, fill: light === true ? "#FBF2DF" : "#1A120F", opacity: light === "sys" ? 0.9 : 1 }),
      ...[18, 32, 46, 60].map((y, i) => R({ x: 10, y, w: i === 0 ? 40 : 34, h: 6, r: 3, fill: i === 0 ? "#D9A05B" : light === true ? "#D9C7A6" : "#3A2A24" })),
      R({ x: 72, y: 14, w: 120, h: 44, r: 6, fill: light === true ? "#A8692C" : "#5A1620" }),
      R({ x: 72, y: 66, w: 36, h: 40, r: 5, fill: "#EEC646" }), R({ x: 114, y: 66, w: 36, h: 40, r: 5, fill: "#2E4A2A" }), R({ x: 156, y: 66, w: 36, h: 40, r: 5, fill: "#3E86C4" })),
    H({ sizeH: "fill", justify: "between", align: "center" }, V({ gap: 0 }, T(name, { s: "bodyM" }), T(en, { font: "Cormorant Garamond", weight: "Medium Italic", size: 14, c: "text/muted" })),
      on ? H({ w: 20, h: 20, r: 10, align: "center", justify: "center", fill: "accent/honey" }, I("check", { s: 12, c: "text/inverse", sw: 2.6 })) : E({ w: 20, h: 20, stroke: "line/strong", sw: 1.5 })));
  const swatch = (c, on, l) => V({ gap: 6, align: "center" }, H({ w: 36, h: 36, r: 18, align: "center", justify: "center", stroke: on ? "text/primary" : undefined, sw: 2 }, E({ w: 28, h: 28, fill: c })), T(l, { s: "caption", c: on ? "text/primary" : "text/muted" }));
  const content = H({ name: "Settings", sizeH: "fill", sizeV: "fill" },
    V({ name: "SettingsNav", w: 230, sizeV: "fill", pad: [28, 14], gap: 2, fill: "bg/sunken" },
      T("设置", { s: "h2" }), F({ w: 2, h: 12 }),
      nav.map(([ic, t], i) => H({ sizeH: "fill", h: 38, pad: [0, 12], gap: 12, r: 10, align: "center", fill: i === 1 ? "accent/honey-soft" : undefined }, I(ic, { s: 16, c: i === 1 ? "accent/honey" : "text/muted" }), T(t, { s: i === 1 ? "bodyM" : "body", c: i === 1 ? "text/primary" : "text/secondary" })))),
    V({ name: "Pane", sizeH: "fill", sizeV: "fill", pad: [28, 40], gap: 4, clip: true },
      V({ gap: 6 }, eyebrow("Appearance"), T("外观", { s: "h1" }), T("Luceria 的主题与界面偏好只保存在本机，不会影响其他设备。", { s: "body", c: "text/muted" })),
      F({ w: 2, h: 16 }),
      T("主题", { s: "smallM", c: "text/secondary" }), F({ w: 2, h: 8 }),
      H({ sizeH: "fill", gap: 14 }, themeCard("夜间酒馆", "Night Bar", true, false), themeCard("羊皮纸", "Parchment", false, true), themeCard("跟随系统", "Match system", false, "sys")),
      F({ w: 2, h: 14 }),
      row("强调色", "按钮、选中态与图表使用的颜色", H({ gap: 10 }, swatch("#D9A05B", true, "琥珀"), swatch("#EACEAA", false, "香槟"), swatch("#A3303A", false, "酒红"), swatch("#94AE6E", false, "橄榄"), swatch("#4AA3E6", false, "钴蓝"))),
      divider(),
      row("界面字号", "影响正文与列表，标题按比例缩放", H({ gap: 12, align: "center" }, T("A", { s: "small", c: "text/muted" }), F({ w: 200, h: 18 }, R({ x: 0, y: 7, w: 200, h: 4, r: 2, fill: "line/strong" }), R({ x: 0, y: 7, w: 100, h: 4, r: 2, fill: "accent/honey" }), E({ x: 91, y: 0, w: 18, h: 18, fill: "#F6EBD6", fx: "e1" })), T("A", { s: "h3", c: "text/muted" }), tag("标准", "text/secondary", "bg/raised"))),
      divider(),
      row("纸张颗粒质感", "在背景叠加细微的复古纸纹", toggle(true)),
      divider(),
      row("减少动态效果", "关闭唱片旋转、卡片视差等动画（低性能设备自动开启）", toggle(false)),
      divider(),
      row("显示英文副标题", "例如「酒单库 Library」", toggle(true)),
      divider(),
      row("计量单位", "配方中的液体用量", segmented(["ml 毫升", "oz 盎司"], 0)),
      divider(),
      row("语言", null, H({ w: 180, h: 38, r: 10, pad: [0, 12], align: "center", justify: "between", fill: "bg/sunken", stroke: "line/strong" }, H({ gap: 8, align: "center" }, I("globe", { s: 16, c: "text/muted" }), T("简体中文", { s: "body" })), I("down", { s: 14, c: "text/muted" })))));
  return appWindow("S1 · 设置 Settings", "settings", content, o);
}

// ======================= S2 Command palette =======================
export function commandPalette(o = {}) {
  const row = (ic, t, sub, right, on) => H({ name: "PaletteRow", sizeH: "fill", h: 44, pad: [0, 12], gap: 12, r: 10, align: "center", fill: on ? "accent/honey-soft" : undefined },
    typeof ic === "string" ? H({ w: 30, h: 30, r: 8, align: "center", justify: "center", fill: "bg/sunken" }, I(ic, { s: 16, c: on ? "accent/honey" : "text/secondary" })) : ic,
    V({ gap: 0, sizeH: "fill" }, T(t, { s: "bodyM", ranges: on ? [{ start: 0, end: 3, c: "accent/honey" }] : undefined }), sub && T(sub, { s: "caption", c: "text/muted" })), right);
  const group = (t) => T(t, { s: "eyebrow", c: "text/muted", upper: true });
  const pal = V({ name: "CommandPalette", x: 400, y: 96, w: 640, pad: 8, gap: 4, r: 18, fill: "bg/raised", stroke: "line/strong", fx: "e2" },
    H({ sizeH: "fill", h: 56, pad: [0, 12], gap: 12, align: "center" }, I("search", { s: 20, c: "accent/honey" }), T("neg", { font: "Noto Sans SC", size: 18, c: "text/primary" }), R({ w: 2, h: 22, fill: "accent/honey" }), F({ w: 2, h: 2, sizeH: "fill" }), kbd("Esc")),
    divider(),
    V({ sizeH: "fill", pad: [8, 4], gap: 2 },
      group("酒款 Cocktails · 2"),
      row(art(D.negroni, 30, 30, { r: 8, grain: false }), "Negroni 尼格罗尼", "经典 · 金酒基 · 搅拌", H({ gap: 6, align: "center" }, T("打开", { s: "caption", c: "text/muted" }), kbd("↵")), true),
      row(art(D.negroni, 30, 30, { r: 8, grain: false }), "Negroni Sbagliato 错误的尼格罗尼", "特调 · 起泡酒替代金酒", null),
      F({ w: 2, h: 6 }), group("材料 Ingredients · 1"),
      row("bottle", "Campari 金巴利", "Negroni 的核心苦味利口酒 · 你的吧台：已有", tag("已有", "accent/olive", "accent/olive-soft")),
      F({ w: 2, h: 6 }), group("帖子 Stories · 1"),
      row("message", "Negroni Week 在上海的 7 家酒吧", "#城市夜生活 · 211 赞", null),
      F({ w: 2, h: 6 }), group("操作 Actions"),
      row("plus", "新建酒款", null, kbd("Ctrl N")), row("sun", "切换到羊皮纸主题", null, kbd("Ctrl Shift L")), row("disc", "打开唱片机", null, kbd("Ctrl P"))),
    divider(),
    H({ sizeH: "fill", h: 36, pad: [0, 12], gap: 16, align: "center" }, H({ gap: 6, align: "center" }, kbd("↑"), kbd("↓"), T("选择", { s: "caption", c: "text/muted" })), H({ gap: 6, align: "center" }, kbd("↵"), T("打开", { s: "caption", c: "text/muted" })), H({ gap: 6, align: "center" }, kbd("Tab"), T("切换分组", { s: "caption", c: "text/muted" })), F({ w: 2, h: 2, sizeH: "fill" }), T("Luceria Search", { font: "Cormorant Garamond", weight: "Medium Italic", size: 14, c: "text/muted" })));
  return withOverlay(A.library(o), "S2 · 全局搜索 Command Palette", dim([pal], { a: 0.6 }));
}

// ======================= S3 Notifications =======================
export function notifications(o = {}) {
  const item = (av, t, sub, time, extra, unread) => H({ name: "Notification", sizeH: "fill", pad: [12, 14], gap: 12, r: 12, align: "start", fill: unread ? "accent/honey-soft" : undefined },
    av, V({ gap: 4, sizeH: "fill" }, T(t, { s: "body", fillW: true }), sub && T(sub, { s: "small", c: "text/muted", fillW: true, lines: 1 }), extra, T(time, { s: "caption", c: "text/muted" })), unread && E({ w: 8, h: 8, fill: "accent/honey" }));
  const iconAv = (ic, c) => H({ w: 34, h: 34, r: 17, align: "center", justify: "center", fill: [c, 0.18] }, I(ic, { s: 16, c }));
  const pop = V({ name: "NotificationPopover", x: 1010, y: 46, w: 400, pad: 8, gap: 2, r: 16, fill: "bg/raised", stroke: "line/strong", fx: "e2" },
    R({ x: 288, y: -6, w: 12, h: 12, fill: "bg/raised", rot: 45, abs: true }),
    H({ sizeH: "fill", pad: [10, 12], justify: "between", align: "center" }, H({ gap: 8, align: "center" }, T("通知", { s: "h3" }), tag("3 条未读", "accent/honey")), T("全部标为已读", { s: "small", c: "accent/honey" })),
    H({ pad: [0, 12, 8, 12] }, segmented(["全部", "互动", "酒局", "系统"], 0, { h: 30 })),
    item(avatar(34, "K", "riso/blue"), "雾岛 回复了你的评论", "「用大冰块慢慢搅」——试了，确实好喝很多！", "3 分钟前 · Negroni", null, true),
    item(avatar(34, "A", "riso/orange"), "阿橙 邀请你加入斗地主 #4821", null, "8 分钟前", H({ gap: 8 }, btn("加入", { size: "sm", kind: "primary" }), btn("忽略", { size: "sm", kind: "ghost" })), true),
    item(iconAv("crown", "#D9A05B"), "解锁成就「冰块大师」", "完成 3 次球冰挑战", "1 小时前", null, true),
    item(iconAv("heart", "#D9473A"), "你的酒款 Velvet Ember 获得 12 个赞", null, "今天 18:20"),
    item(iconAv("download", "#94AE6E"), "Luceria 1.1.0 已就绪", "新增冰块实验室视频教程与英文界面", "昨天", null),
    divider(),
    H({ sizeH: "fill", h: 40, justify: "center", align: "center", gap: 6 }, T("通知设置", { s: "small", c: "text/muted" }), I("settings", { s: 14, c: "text/muted" })));
  const w = A.myBar(o); w.name = "S3 · 通知中心 Notifications"; w.kids.push(F({ name: "PopoverLayer", w: WIN.w, h: WIN.h, abs: true, x: 0, y: 0 }, pop));
  return w;
}

// ======================= S4 Login modal (guest comment) =======================
export function loginModal(o = {}) {
  const modal = V({ name: "Modal/Login", x: 470, y: 150, w: 500, gap: 0, r: 20, clip: true, fill: "bg/raised", stroke: "line/strong", fx: "e2" },
    F({ name: "Art", w: 500, h: 150, clip: true, fill: "#E9E4DA" },
      IMG("account-login-right.png", { x: 300, y: -70, w: 200, h: 270 }),
      IMG("account-login-left.png", { x: 0, y: -40, w: 230, h: 230 }),
      R({ x: 0, y: 0, w: 500, h: 150, fill: grad([[0.4, "#241915", 0], [1, "#241915", 1]], 90) }),
      H({ x: 456, y: 14, w: 30, h: 30, r: 15, align: "center", justify: "center", fill: ["#000000", 0.4] }, I("x", { s: 16, c: "#F6EBD6" }))),
    V({ sizeH: "fill", pad: [6, 28, 28, 28], gap: 16 },
      V({ gap: 6, sizeH: "fill" }, T("登录后即可评论", { s: "h1" }), T("你写下的评论已暂存。登录成功后会回到 Negroni，继续发表。", { s: "body", c: "text/secondary", fillW: true })),
      H({ sizeH: "fill", pad: 12, gap: 10, r: 10, align: "start", fill: "bg/sunken", stroke: "line/subtle" }, I("quote", { s: 16, c: "text/muted" }), T("用大冰块慢慢搅，加一点橙皮油，第一口就爱上。", { s: "small", c: "text/muted", fillW: true })),
      field("邮箱", input("you@example.com", { icon: "mail", focus: true, value: "mira@luceria.app" })),
      btn("发送登录邮件", { kind: "honey", size: "lg", fill: true, icon: "send" }),
      H({ sizeH: "fill", gap: 10, align: "center" }, R({ h: 1, w: 10, sizeH: "fill", fill: "line/subtle" }), T("邮件链接或 6 位验证码都可以完成登录", { s: "caption", c: "text/muted" }), R({ h: 1, w: 10, sizeH: "fill", fill: "line/subtle" })),
      H({ sizeH: "fill", justify: "center", gap: 6 }, T("还没有账号？首次登录将自动创建", { s: "small", c: "text/muted" }))));
  return withOverlay(A.library({ ...o }), "S4 · 登录弹窗 Login Modal", dim([modal]));
}

// ======================= S5 States board =======================
export function statesBoard(o = {}) {
  const empty = (img, title, body, action, extra, tile) => V({ name: "EmptyState", sizeH: "fill", pad: 28, gap: 14, r: 18, align: "center", fill: "bg/surface", stroke: "line/subtle" },
    F({ w: 150, h: 150 }, E({ x: 0, y: 0, w: 150, h: 150, fill: [tile, 0.16] }), E({ x: 12, y: 12, w: 126, h: 126, stroke: [tile, 0.4], dash: [3, 5] }), IMG(img, { x: 25, y: 18, w: 100, h: 116, fit: "FIT" })),
    T(title, { s: "h2", align: "center" }), T(body, { s: "body", c: "text/muted", align: "center", w: 300 }), extra, action);
  const toast = (ic, c, t, act) => H({ name: "Toast", w: 420, pad: [12, 14], gap: 12, r: 12, align: "center", fill: "bg/raised", stroke: [c, 0.4], fx: "e2" },
    H({ w: 28, h: 28, r: 14, align: "center", justify: "center", fill: [c, 0.18] }, I(ic, { s: 15, c })), T(t, { s: "body", fillW: true }), act);
  const skel = (w, h, r = 6) => R({ w, h, r, fill: "bg/raised", sizeH: w ? undefined : "fill" });
  return F({ name: "S5 · 空状态 · 加载 · 反馈 States", w: 1440, h: 900, r: 14, fill: "bg/canvas", stroke: "line/strong", clip: true },
    V({ x: 48, y: 40, w: 1344, gap: 28 },
      H({ sizeH: "fill", justify: "between", align: "end" }, V({ gap: 6 }, eyebrow("System States"), T("空状态 · 加载 · 反馈", { s: "h1" })), T("所有失败提示都用中文说明下一步，不直接展示服务端原文。", { s: "body", c: "text/muted" })),
      H({ sizeH: "fill", gap: 20 },
        empty("menu-glass-line-blue.png", "收藏夹还空着", "遇到喜欢的酒，点一下右上角的小爱心，它就会出现在这里。", btn("去酒单库逛逛", { kind: "primary", iconR: "arrowR" }), null, "#4AA3E6"),
        empty("menu-glass-bottom.png", "没有找到「Negroini」", "试试检查拼写，或者换个关键词，比如基酒、风味。", btn("重置筛选", { kind: "secondary", icon: "refresh" }), H({ gap: 8, align: "center" }, T("你是不是要找", { s: "small", c: "text/muted" }), chip("Negroni", { on: true, h: 28 })), "#EEC646"),
        empty("menu-glass-center.png", "吧台还是空的", "添加第一瓶酒，我们就能告诉你今晚可以调什么。", btn("添加第一瓶酒", { kind: "honey", icon: "plus" }), null, "#94AE6E")),
      H({ sizeH: "fill", gap: 28, align: "start" },
        V({ name: "Skeleton", sizeH: "fill", gap: 12 }, T("加载中 · 骨架屏", { s: "smallM", c: "text/muted" }),
          ...[0, 1, 2].map(() => H({ sizeH: "fill", gap: 12, pad: 10, r: 12, align: "center", fill: "bg/surface" }, skel(52, 52, 10), V({ gap: 8, sizeH: "fill" }, skel(180, 12), skel(120, 10)), skel(40, 12)))),
        V({ name: "Toasts", gap: 12 }, T("底部提示 Toast", { s: "smallM", c: "text/muted" }),
          toast("check", "#94C27A", "已收藏 Negroni", T("撤销", { s: "smallM", c: "accent/honey" })),
          toast("alert", "#E5675A", "评论没有发出去：网络似乎断开了，草稿已保存", T("重试", { s: "smallM", c: "accent/honey" })),
          toast("clock", "#E8B04A", "头像和昵称每 7 天可改一次，下次：11 月 17 日", null),
          toast("info", "#4AA3E6", "登录邮件已发送，60 秒后可重新发送", null)))));
}

// ======================= S6 Offline / error =======================
export function offline(o = {}) {
  const content = V({ name: "Content", sizeH: "fill", sizeV: "fill", gap: 0 },
    H({ name: "OfflineBanner", sizeH: "fill", h: 40, pad: [0, 32], gap: 10, align: "center", fill: ["#E8B04A", 0.14] }, I("wifiOff", { s: 16, c: "state/warning" }), T("离线模式 · 你正在浏览已缓存的内容", { s: "smallM", c: "state/warning" }), F({ w: 2, h: 2, sizeH: "fill" }), T("上次同步：22:06", { s: "caption", c: "text/muted" })),
    V({ sizeH: "fill", sizeV: "fill", gap: 18, align: "center", justify: "center" },
      F({ w: 220, h: 220 }, E({ x: 0, y: 0, w: 220, h: 220, fill: rgrad([[0, "#E8B04A", 0.18], [1, "#E8B04A", 0]]) }), E({ x: 30, y: 30, w: 160, h: 160, stroke: "line/strong", dash: [3, 6] }), IMG("menu-glass-line-orange.png", { x: 55, y: 40, w: 110, h: 148, fit: "FIT", opacity: 0.55 }),
        H({ x: 150, y: 140, w: 52, h: 52, r: 26, align: "center", justify: "center", fill: "bg/raised", stroke: "state/warning", sw: 1.5 }, I("wifiOff", { s: 22, c: "state/warning" }))),
      T("网络连接中断了", { s: "h1" }),
      T("别担心，你仍然可以查看已缓存的 32 款酒、你的吧台和唱片机。\n评论、发帖、联机牌局需要联网，恢复后会自动同步。", { s: "bodyL", c: "text/secondary", align: "center", w: 520 }),
      H({ gap: 10 }, btn("重新连接", { kind: "honey", icon: "refresh" }), btn("浏览离线内容", { kind: "secondary" })),
      T("错误代码 NET_OFFLINE · 反馈问题", { s: "caption", c: "text/muted" })));
  return appWindow("S6 · 离线 / 错误 Offline", "discover", content, o);
}

// ======================= S7 About & update =======================
export function about(o = {}) {
  const modal = V({ name: "Modal/About", x: 480, y: 130, w: 480, pad: 32, gap: 16, r: 20, align: "center", fill: "bg/raised", stroke: "line/strong", fx: "e2" },
    emblem(64), T("LUCERIA", { font: "Cormorant Garamond", weight: "SemiBold", size: 32, ls: 26 }), ornament(140),
    T("Cocktail Atelier · 版本 1.0.0（2026.11 build 128）", { s: "small", c: "text/muted" }),
    V({ name: "Update", sizeH: "fill", pad: 16, gap: 10, r: 14, fill: grad([[0, "#1E2A1B"], [1, "#16110F"]], 90), stroke: ["#94AE6E", 0.4] },
      H({ sizeH: "fill", justify: "between", align: "center" }, H({ gap: 8, align: "center" }, I("download", { s: 16, c: "accent/olive" }), T("新版本 1.1.0 可用", { s: "bodyM" })), tag("28 MB", "text/secondary", "bg/raised")),
      T("· 冰块实验室新增视频教程\n· 新增英文界面与 oz 单位换算\n· 修复唱片机在后台暂停的问题", { s: "small", c: "text/secondary", fillW: true }),
      progress(0.64, 400, { fill: true, c: "accent/olive" }),
      H({ sizeH: "fill", justify: "between", align: "center" }, T("正在下载 · 64%", { s: "caption", c: "text/muted" }), btn("重启并更新", { kind: "primary", size: "sm" }))),
    H({ gap: 18 }, ...["用户协议", "隐私政策", "开源许可", "反馈问题"].map(t => T(t, { s: "small", c: "accent/honey" }))),
    T("插画素材来自 Luceria 项目组 · 理性饮酒", { s: "caption", c: "text/muted" }));
  return withOverlay(settings(o), "S7 · 关于与更新 About", dim([modal]));
}

// ======================= S8 Parchment (light) theme =======================
export const parchment = (o = {}) => { const w = A.discover(o); w.name = "S8 · 羊皮纸主题 Parchment"; return w; };

