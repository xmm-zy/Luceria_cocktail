import { F, H, V, T, R, E, I, IMG, SVG, grad, rgrad } from "./engine.mjs";
import * as U from "./ui.mjs";
import { ICONS } from "./icons.mjs";
import { TOOL_ICONS } from "./svgart.mjs";
import { discoverContent } from "./screens-app.mjs";
Object.assign(ICONS, TOOL_ICONS);
const { DRINKS: D, btn, chip, tag, eyebrow, card, appWindow, art, avatar, iconBtn, input, progress, checkbox, segmented, divider, ornament, emblem, field, toggle, WIN } = U;

const ob = (name, content, o = {}) => appWindow(name, null, content, { ...o, noSidebar: true, noPlayer: true, tb: { noSearch: true, guest: true } });
const dots = (n, act) => H({ name: "Pager", gap: 6, align: "center" }, Array.from({ length: n }, (_, i) => R({ w: i === act ? 24 : 6, h: 6, r: 3, fill: i === act ? "accent/honey" : "line/strong" })));
function stepper(active) {
  const s = ["口味偏好", "我的吧台", "创建账号"];
  return H({ name: "Stepper", gap: 0, align: "center" }, s.map((t, i) => H({ gap: 10, align: "center" },
    H({ w: 28, h: 28, r: 14, align: "center", justify: "center", fill: i < active ? "accent/olive" : i === active ? "accent/honey" : undefined, stroke: i > active ? "line/strong" : undefined },
      i < active ? I("check", { s: 14, c: "#10180C", sw: 2.6 }) : T(String(i + 1), { font: "Inter", weight: "Medium", size: 12, c: i === active ? "text/inverse" : "text/muted" })),
    T(t, { s: i === active ? "bodyM" : "body", c: i === active ? "text/primary" : "text/muted" }),
    i < 2 && R({ w: 56, h: 1, fill: i < active ? "accent/olive" : "line/strong" }), i < 2 && F({ w: 2, h: 2 }))));
}
const obHeader = (active) => H({ name: "OnbHeader", sizeH: "fill", justify: "between", align: "center" }, stepper(active), H({ gap: 8, align: "center" }, T("步骤 " + (active + 1) + " / 3", { s: "small", c: "text/muted" }), btn("跳过", { kind: "ghost", size: "sm" })));
const obFooter = (left, right, mid) => H({ name: "OnbFooter", sizeH: "fill", justify: "between", align: "center" }, left, mid || F({ w: 2, h: 2 }), right);

// ---------------- O1 Splash (frameless, small) ----------------
export function splash(o = {}) {
  return F({ name: "O1 · 启动页 Splash", w: 720, h: 440, r: 16, clip: true, fill: grad([[0, "#1E1210"], [1, "#0B0706"]], 90), stroke: "line/strong", fx: "e3" },
    IMG("hands-overlay.png", { x: -40, y: -10, w: 800, h: 450, opacity: 0.18 }),
    R({ x: 0, y: 0, w: 720, h: 440, fill: rgrad([[0, "#110B09", 0.2], [1, "#110B09", 0.95]]) }),
    R({ x: 160, y: 40, w: 400, h: 300, fill: rgrad([[0, "#D9A05B", 0.18], [1, "#D9A05B", 0]]) }),
    V({ x: 0, y: 92, w: 720, gap: 14, align: "center" },
      emblem(72),
      T("LUCERIA", { font: "Cormorant Garamond", weight: "SemiBold", size: 44, ls: 30, c: "text/primary" }),
      ornament(180),
      T("Cocktail Atelier · 你桌面上的私人地下酒吧", { font: "Cormorant Garamond", weight: "Medium Italic", size: 18, c: "accent/champagne" })),
    V({ x: 260, y: 352, w: 200, gap: 8, align: "center" }, progress(0.62, 200, { h: 2 }), T("正在为你温杯…", { s: "caption", c: "text/muted" })),
    T("v1.0.0", { s: "caption", c: "text/muted", x: 24, y: 408 }),
    T("理性饮酒 · 未满 18 岁请勿饮酒", { s: "caption", c: "text/muted", x: 540, y: 408 }));
}

// ---------------- O2 Age gate ----------------
export function ageGate(o = {}) {
  const box = (v, l, w) => V({ gap: 6, w }, T(l, { s: "caption", c: "text/muted" }), H({ h: 52, sizeH: "fill", r: 12, pad: [0, 16], align: "center", fill: "bg/sunken", stroke: v ? "line/strong" : "accent/honey", sw: v ? 1 : 1.5 }, T(v || "日", { font: "Cormorant Garamond", weight: "SemiBold", size: 24, c: v ? "text/primary" : "text/muted" })));
  return ob("O2 · 年龄确认 Age Gate", H({ name: "Content", sizeH: "fill", sizeV: "fill" },
    F({ name: "Visual", w: 640, sizeV: "fill", clip: true, fill: "#1B2A17" },
      IMG("cocktail-glass-center.png", { x: -40, y: -40, w: 720, h: 900 }),
      R({ x: 0, y: 0, w: 640, h: 856, fill: grad([[0, "#110B09", 0], [0.7, "#110B09", 0.15], [1, "#110B09", 1]], 0) }),
      R({ x: 0, y: 500, w: 640, h: 356, fill: grad([[0, "#110B09", 0], [1, "#110B09", 0.95]], 90) }),
      V({ x: 40, y: 700, gap: 6, w: 480 }, T("“The first sip is with the eyes.”", { font: "Cormorant Garamond", weight: "Medium Italic", size: 26, c: "text/primary" }), T("— 第一口，先用眼睛品尝", { s: "small", c: "text/secondary" }))),
    V({ name: "Form", sizeH: "fill", sizeV: "fill", pad: [0, 110], gap: 22, justify: "center" },
      H({ w: 56, h: 56, r: 16, align: "center", justify: "center", fill: "accent/honey-soft", stroke: ["#D9A05B", 0.4] }, I("shield", { s: 26, c: "accent/honey" })),
      V({ gap: 8 }, eyebrow("Before we pour"), T("请确认你已达到法定饮酒年龄", { font: "Noto Serif SC", weight: "SemiBold", size: 34, lh: 44, c: "text/primary", w: 520 }), T("Luceria 包含酒精饮品的配方与文化内容。我们不会上传你的生日，只在本机用于年龄确认。", { s: "bodyL", c: "text/secondary", w: 520 })),
      H({ gap: 12, w: 520 }, box("1998", "年 YEAR", 200), box("06", "月 MONTH", 140), box(null, "日 DAY", 140)),
      checkbox(true, "记住我的选择，下次不再询问"),
      V({ gap: 12, w: 520 }, btn("我已年满 18 岁，进入 Luceria", { kind: "primary", size: "lg", fill: true, iconR: "arrowR" }), btn("我未满 18 岁 · 浏览无酒精特调", { kind: "ghost", fill: true, icon: "leaf" })),
      H({ gap: 8, align: "center" }, I("info", { s: 14, c: "text/muted" }), T("理性饮酒，饮酒不开车。", { s: "small", c: "text/muted" })))), o);
}

// ---------------- O3–O5 Welcome carousel ----------------
function welcome(idx, name, eb, title, body, bullets, visual) {
  return ob(name, H({ name: "Content", sizeH: "fill", sizeV: "fill", pad: 40, gap: 48 },
    V({ name: "Copy", w: 500, sizeV: "fill", pad: [40, 0, 0, 30], gap: 24 },
      H({ gap: 10, align: "center" }, T("0" + (idx + 1), { font: "Cormorant Garamond", weight: "SemiBold", size: 20, c: "accent/honey" }), R({ w: 28, h: 1, fill: "accent/honey" }), eyebrow(eb)),
      T(title, { font: "Noto Serif SC", weight: "SemiBold", size: 44, lh: 58, c: "text/primary", w: 470 }),
      T(body, { s: "bodyL", c: "text/secondary", w: 440 }),
      V({ gap: 14 }, bullets.map(([ic, t, c]) => H({ gap: 14, align: "center" }, H({ w: 36, h: 36, r: 10, align: "center", justify: "center", fill: [c, 0.15] }, I(ic, { s: 18, c })), T(t, { s: "body", c: "text/primary" })))),
      F({ w: 2, h: 2, sizeV: "fill" }),
      H({ sizeH: "fill", justify: "between", align: "center" }, dots(3, idx),
        H({ gap: 10 }, idx > 0 ? btn("上一步", { kind: "secondary" }) : btn("跳过引导", { kind: "ghost" }), btn(idx < 2 ? "下一步" : "开始设置", { kind: "honey", iconR: "arrowR" })))),
    visual));
}
export function welcome1(o = {}) {
  const N = D.negroni;
  return welcome(0, "O3 · 欢迎 1/3 酒单", "A breathing menu", "一本会呼吸的\n鸡尾酒酒单", "从 Whiskey Sour 到 Negroni，每一杯都有命名由来、历史故事与精确配方。按基酒、风味、场合筛选，分享链接即可复现筛选结果。",
    [["book", "120+ 经典与特调，持续更新", "#D9A05B"], ["filter", "按基酒 · 风味 · 酒精度筛选", "#94AE6E"], ["sparkles", "每晚为你挑一杯「今夜特调」", "#4AA3E6"]],
    F({ name: "Visual", sizeH: "fill", sizeV: "fill", r: 24, clip: true, fill: grad([[0, "#7E1F2A"], [1, "#2A0E12"]], 45) },
      IMG("account-top-right.png", { x: -60, y: -60, w: 860, h: 860, opacity: 0.45, blend: "MULTIPLY" }),
      E({ x: 150, y: 120, w: 500, h: 500, stroke: ["#EACEAA", 0.25] }),
      IMG(N.img, { x: 200, y: 110, w: 380, h: 510, fit: "FIT" }),
      V({ x: 460, y: 470, w: 280, pad: 18, gap: 8, r: 16, fill: ["#110B09", 0.85], stroke: "line/strong", fx: "e2" },
        H({ gap: 8, align: "center" }, eyebrow("No.03 · Classic"), tag("4.9 ★", "accent/honey")), T("Negroni", { s: "d3" }),
        H({ sizeH: "fill", justify: "between" }, T("金酒 · Campari · 甜味美思", { s: "small", c: "text/secondary" })), progress(1, 244, { h: 3, c: "accent/olive" }), T("吧台已备齐 · 2 分钟可完成", { s: "caption", c: "accent/olive" })),
      H({ x: 40, y: 40, h: 34, pad: [0, 14], gap: 8, r: 17, align: "center", fill: ["#110B09", 0.7], stroke: "line/strong" }, I("search", { s: 14, c: "text/secondary" }), T("苦甜 · 金酒基 · 餐前", { s: "small", c: "text/secondary" }))), o);
}
export function welcome2(o = {}) {
  const bottles = [["波本", "#B5682A"], ["金酒", "#6FA7C8"], ["Campari", "#C42B2B"], ["白朗姆", "#CFC6B4"], ["君度", "#E39A3B"]];
  return welcome(1, "O4 · 欢迎 2/3 吧台", "Your home bar", "把家里的吧台\n装进 Luceria", "登记你拥有的酒与材料，Luceria 会实时算出今晚能调哪些酒，还会告诉你「只差一瓶」就能解锁的新配方。",
    [["bottle", "登记酒瓶，自动匹配可调酒款", "#D9A05B"], ["list", "一键生成购物清单", "#94AE6E"], ["shaker", "器具与冰块指南随手查", "#4AA3E6"]],
    F({ name: "Visual", sizeH: "fill", sizeV: "fill", r: 24, clip: true, fill: grad([[0, "#2E4A2A"], [1, "#0F1A0E"]], 45) },
      IMG("green-flowers.png", { x: 0, y: -200, w: 860, h: 1529, opacity: 0.35, blend: "MULTIPLY" }),
      IMG("menu-glass-center.png", { x: 230, y: 120, w: 380, h: 367, fit: "FIT" }),
      ...bottles.map(([n, c], i) => H({ x: [70, 520, 600, 90, 470][i], y: [130, 90, 330, 470, 560][i], h: 40, pad: [0, 14], gap: 8, r: 20, align: "center", fill: ["#110B09", 0.8], stroke: [c, 0.6], fx: "e1", rot: [-6, 5, -3, 4, -5][i] },
        R({ w: 10, h: 16, r: 3, fill: c }), T(n, { s: "bodyM" }), I("check", { s: 14, c: "accent/olive", sw: 2.4 }))),
      H({ x: 220, y: 640, pad: [14, 20], gap: 14, r: 16, align: "center", fill: ["#110B09", 0.88], stroke: ["#94AE6E", 0.5], fx: "e2" },
        T("9", { font: "Cormorant Garamond", weight: "SemiBold", size: 40, c: "accent/olive" }), V({ gap: 0 }, T("款酒今晚就能调", { s: "bodyM" }), T("再买一瓶 Campari 可解锁 +3", { s: "small", c: "text/muted" })))), o);
}
export function welcome3(o = {}) {
  return welcome(2, "O5 · 欢迎 3/3 社交", "Stories & a little luck", "酒、故事\n与一点运气", "在酒话论坛分享城市夜生活与杯中故事；聚会时摇骰子、转转盘，或者开一局斗地主。还有一台唱片机，陪你调完每一杯。",
    [["message", "酒话论坛 · 发帖、回复、收藏", "#D9A05B"], ["dice", "骰子与转盘 · 聚会必备", "#D9473A"], ["spade", "斗地主 / 扎金花 联机牌局", "#4AA3E6"]],
    F({ name: "Visual", sizeH: "fill", sizeV: "fill", r: 24, clip: true, fill: grad([[0, "#EE7B30"], [1, "#7E1F2A"]], 45) },
      IMG("account-top-left.png", { x: -40, y: -80, w: 900, h: 1350, opacity: 0.5, blend: "MULTIPLY" }),
      IMG("cocktail-surreal-center.png", { x: 470, y: 40, w: 340, h: 604, fit: "FIT" }),
      IMG("cards/joker_red.png", { x: 120, y: 160, w: 150, h: 212, r: 10, rot: 12, fx: "e2" }),
      IMG("cards/AS.png", { x: 210, y: 180, w: 150, h: 212, r: 10, rot: -6, fx: "e2" }),
      V({ x: 90, y: 470, w: 300, pad: 16, gap: 10, r: 16, fill: ["#110B09", 0.88], stroke: "line/strong", fx: "e2" },
        H({ gap: 10, align: "center" }, avatar(30, "K", "riso/blue"), V({ gap: 0 }, T("雾岛 Kirishima", { s: "smallM" }), T("在京都 · 12 分钟前", { s: "caption", c: "text/muted" }))),
        T("在京都的小酒馆，我第一次喝到真正的 Highball", { s: "bodyM", fillW: true }),
        H({ gap: 14 }, H({ gap: 4, align: "center" }, I("heart", { s: 14, c: "riso/red", solid: true }), T("128", { s: "num", c: "text/secondary" })), H({ gap: 4, align: "center" }, I("chat", { s: 14, c: "text/muted" }), T("24", { s: "num", c: "text/muted" }))))), o);
}

// ---------------- O6 Taste profile ----------------
export function taste(o = {}) {
  const F8 = [["citrus", "酸爽", "Sour", "#EEC646", true], ["droplet", "甜润", "Sweet", "#E9A0A0"], ["leaf", "苦韵", "Bitter", "#C42B2B", true], ["sparkles", "草本", "Herbal", "#94AE6E", true], ["heart", "果香", "Fruity", "#EE7B30"], ["flame", "烟熏", "Smoky", "#8C7762"], ["refresh", "气泡", "Fizzy", "#4AA3E6"], ["moon", "奶油", "Creamy", "#E8DFC9"]];
  const tile = ([ic, zh, en, c, on]) => V({ name: "FlavorTile" + (on ? "/on" : ""), sizeH: "fill", h: 150, pad: 18, gap: 10, r: 16, fill: on ? [c, 0.12] : "bg/surface", stroke: on ? c : "line/subtle", sw: on ? 1.5 : 1 },
    H({ sizeH: "fill", justify: "between", align: "start" }, H({ w: 44, h: 44, r: 22, align: "center", justify: "center", fill: [c, 0.18] }, I(ic, { s: 22, c })),
      on ? H({ w: 22, h: 22, r: 11, align: "center", justify: "center", fill: c }, I("check", { s: 13, c: "#1A100C", sw: 2.6 })) : E({ w: 22, h: 22, stroke: "line/strong", sw: 1.5 })),
    F({ w: 2, h: 2, sizeV: "fill" }),
    V({ gap: 0 }, T(zh, { s: "h2" }), T(en, { font: "Cormorant Garamond", weight: "Medium Italic", size: 16, c: "text/muted" })));
  return ob("O6 · 口味偏好 Taste", V({ name: "Content", sizeH: "fill", sizeV: "fill", pad: [32, 120], gap: 26 },
    obHeader(0),
    V({ gap: 8 }, T("你偏爱哪种风味？", { font: "Noto Serif SC", weight: "SemiBold", size: 34, lh: 44 }), T("选择 2–4 项，我们会据此推荐「今夜特调」与发现页内容，随时可以在设置中修改。", { s: "bodyL", c: "text/secondary" })),
    V({ dir: "GRID", cols: 4, gap: 16, sizeH: "fill" }, F8.map(tile)),
    H({ name: "RecoPreview", sizeH: "fill", pad: [14, 18], gap: 16, r: 14, align: "center", fill: "bg/surface", stroke: "line/subtle" },
      I("sparkles", { s: 18, c: "accent/honey" }), T("根据你的选择，今晚可能会喜欢：", { s: "body", c: "text/secondary" }),
      ...[D.negroni, D.whiskeySour, D.margarita].map(d => H({ gap: 10, align: "center", pad: [6, 12, 6, 6], r: 10, fill: "bg/raised" }, art(d, 34, 34, { r: 7, grain: false }), T(d.en, { font: "Cormorant Garamond", weight: "SemiBold", size: 17 }))),
      F({ w: 2, h: 2, sizeH: "fill" }), T("结果会随选择实时更新", { s: "caption", c: "text/muted" })),
    H({ sizeH: "fill", gap: 40, align: "start" },
      V({ gap: 10 }, T("酒精度偏好", { s: "smallM", c: "text/secondary" }), segmented(["无酒精", "低度 <10%", "中度 10–20%", "高度 >20%"], 2, { h: 40 })),
      V({ gap: 10, sizeH: "fill" }, T("常用基酒（可多选）", { s: "smallM", c: "text/secondary" }), H({ gap: 8 }, chip("金酒 Gin", { on: true }), chip("威士忌 Whiskey", { on: true }), chip("朗姆 Rum"), chip("龙舌兰 Tequila"), chip("伏特加 Vodka")))),
    F({ w: 2, h: 2, sizeV: "fill" }),
    obFooter(btn("上一步", { kind: "secondary", icon: "arrowL" }), btn("下一步：我的吧台", { kind: "honey", iconR: "arrowR", size: "lg" }), H({ gap: 8, align: "center" }, T("已选择 3 项风味", { s: "body", c: "text/secondary" }), tag("苦韵 · 草本 · 酸爽", "accent/honey")))), o);
}

// ---------------- O7 Bar setup ----------------
export function barSetup(o = {}) {
  const items = [["波本威士忌", "Bourbon", "#B5682A", true], ["金酒", "Gin", "#6FA7C8", true], ["Campari", "Bitter", "#C42B2B", true], ["甜味美思", "Vermouth", "#7A2433", true], ["白朗姆", "White Rum", "#CFC6B4", false], ["龙舌兰", "Tequila", "#D9C27A", false], ["伏特加", "Vodka", "#9FB4C9", true], ["君度", "Triple Sec", "#E39A3B", false], ["咖啡利口酒", "Kahlúa", "#3B2418", true], ["安格斯图拉", "Bitters", "#8D3B1D", false]];
  const tile = ([zh, en, c, on]) => H({ name: "BottlePick" + (on ? "/on" : ""), sizeH: "fill", h: 64, pad: [0, 14], gap: 12, r: 12, align: "center", fill: on ? "bg/raised" : "bg/surface", stroke: on ? ["#D9A05B", 0.6] : "line/subtle" },
    F({ w: 22, h: 38 }, R({ x: 7, y: 0, w: 8, h: 8, r: 2, fill: c }), R({ x: 2, y: 7, w: 18, h: 31, r: 6, fill: c })),
    V({ gap: 0, sizeH: "fill" }, T(zh, { s: "bodyM" }), T(en, { s: "caption", c: "text/muted" })), checkbox(on));
  return ob("O7 · 我的吧台 Bar Setup", V({ name: "Content", sizeH: "fill", sizeV: "fill", pad: [32, 120], gap: 24 },
    obHeader(1),
    H({ sizeH: "fill", gap: 36, sizeV: "fill" },
      V({ sizeH: "fill", gap: 18 },
        V({ gap: 8 }, T("你的吧台里有什么？", { font: "Noto Serif SC", weight: "SemiBold", size: 34, lh: 44 }), T("勾选家里已有的酒与材料。不确定也没关系——之后可以随时在「我的吧台」中修改。", { s: "bodyL", c: "text/secondary" })),
        H({ sizeH: "fill", gap: 10, align: "center" }, input("搜索酒名或材料，例如「金巴利」", { icon: "search" }), segmented(["基酒", "利口酒", "果汁糖浆", "器具"], 0)),
        V({ dir: "GRID", cols: 2, gap: 10, sizeH: "fill" }, items.map(tile))),
      V({ name: "LivePreview", w: 360, sizeV: "fill", pad: 20, gap: 14, r: 18, fill: grad([[0, "#1E2A1B"], [1, "#16110F"]], 90), stroke: ["#94AE6E", 0.35] },
        H({ gap: 8, align: "center" }, E({ w: 8, h: 8, fill: "state/success" }), T("实时匹配", { s: "eyebrow", c: "accent/olive", upper: true })),
        H({ gap: 10, align: "base" }, T("5", { font: "Cormorant Garamond", weight: "SemiBold", size: 64, lh: 64, c: "text/primary" }), T("款酒你现在就能调", { s: "h3" })),
        progress(0.42, 320, { c: "accent/olive", fill: true }),
        ...[D.negroni, D.blackRussian, D.whiskeySour].map(d => H({ sizeH: "fill", gap: 12, align: "center" }, art(d, 44, 44, { r: 8, grain: false }), V({ gap: 0, sizeH: "fill" }, T(d.en, { font: "Cormorant Garamond", weight: "SemiBold", size: 18 }), T(d.zh, { s: "caption", c: "text/muted" })), I("check", { s: 16, c: "accent/olive", sw: 2.2 }))),
        divider(),
        H({ gap: 8, align: "center" }, I("sparkles", { s: 14, c: "accent/honey" }), T("再添一瓶「白朗姆」可解锁 Mojito 等 3 款", { s: "small", c: "accent/honey" })))),
    obFooter(btn("上一步", { kind: "secondary", icon: "arrowL" }), btn("下一步：创建账号", { kind: "honey", iconR: "arrowR", size: "lg" }), T("已选择 6 种材料", { s: "body", c: "text/secondary" }))), o);
}

// ---------------- O8 Account (email OTP) ----------------
export function account(o = {}) {
  const otp = (v, f) => H({ w: 54, h: 62, r: 12, align: "center", justify: "center", fill: "bg/sunken", stroke: f ? "accent/honey" : "line/strong", sw: f ? 1.5 : 1 }, T(v || "", { font: "Cormorant Garamond", weight: "SemiBold", size: 30, c: "text/primary" }), f && R({ w: 2, h: 26, fill: "accent/honey" }));
  return ob("O8 · 创建账号 Account", V({ name: "Content", sizeH: "fill", sizeV: "fill", pad: [32, 120], gap: 24 },
    obHeader(2),
    H({ sizeH: "fill", sizeV: "fill", gap: 56 },
      V({ name: "Form", sizeH: "fill", gap: 20 },
        V({ gap: 8 }, T("最后一步：留下你的名字", { font: "Noto Serif SC", weight: "SemiBold", size: 34, lh: 44 }), T("我们用邮箱验证码登录，无需密码。登录后可以发布酒款、评论与收藏，并在多台设备间同步。", { s: "bodyL", c: "text/secondary", w: 560 })),
        H({ sizeH: "fill", gap: 14 }, field("昵称（最多 24 字）", input("你的昵称", { value: "米拉 Mira", icon: "user" })), field("头像", H({ gap: 10, align: "center", h: 44 }, avatar(44, "M", "accent/wine"), btn("上传", { kind: "secondary", size: "sm", icon: "upload" })))),
        H({ sizeH: "fill", gap: 10, align: "end" }, field("邮箱", input("you@example.com", { value: "mira@luceria.app", icon: "mail" })), btn("已发送 · 52s", { kind: "secondary", size: "md" })),
        V({ gap: 10 }, H({ gap: 8, align: "center" }, T("6 位验证码", { s: "smallM", c: "text/secondary" }), T("已发送至 mira@luceria.app，邮件中的链接同样可以完成登录", { s: "small", c: "text/muted" })),
          H({ gap: 10 }, otp("4"), otp("8"), otp("2"), otp("0"), otp(null, true), otp(null))),
        checkbox(true, "我已阅读并同意《用户协议》与《隐私政策》"),
        H({ gap: 12, align: "center" }, btn("完成，进入 Luceria", { kind: "honey", size: "lg", iconR: "arrowR" }), btn("稍后再说，先以访客身份逛逛", { kind: "ghost" })),
        F({ w: 2, h: 8 }),
        H({ name: "Benefits", sizeH: "fill", gap: 12 }, ...[["refresh", "多设备同步", "收藏与吧台随你走"], ["edit", "发布酒款", "分享你的独家配方"], ["message", "加入酒话", "评论、点赞、收藏帖子"]].map(([ic, t, d]) => H({ sizeH: "fill", pad: 14, gap: 12, r: 12, align: "center", fill: "bg/surface", stroke: "line/subtle" }, H({ w: 36, h: 36, r: 10, align: "center", justify: "center", fill: "accent/honey-soft" }, I(ic, { s: 18, c: "accent/honey" })), V({ gap: 0 }, T(t, { s: "smallM" }), T(d, { s: "caption", c: "text/muted" })))))),
      V({ name: "ProfilePreview", w: 380, gap: 0, r: 20, clip: true, fill: "bg/surface", stroke: "line/subtle", fx: "e2" },
        F({ name: "Cover", sizeH: "fill", h: 130, clip: true, fill: "#2A0E12" }, IMG("account-top-left.png", { x: 0, y: -150, w: 380, h: 570, opacity: 0.6 })),
        V({ sizeH: "fill", pad: [0, 22, 22, 22], gap: 12 },
          H({ name: "AvatarL", w: 76, h: 76, r: 38, align: "center", justify: "center", fill: "accent/wine", stroke: "bg/surface", sw: 4, sa: "OUTSIDE", abs: true, x: 22, y: -38 }, T("M", { font: "Cormorant Garamond", weight: "SemiBold", size: 38, c: "#F6EBD6" })),
          F({ w: 2, h: 44 }),
          T("米拉 Mira", { s: "h2" }), T("Lv.1 见习调酒师 · 今天加入", { s: "small", c: "text/muted" }),
          H({ gap: 6 }, tag("苦韵", "accent/honey"), tag("草本", "accent/olive", "accent/olive-soft"), tag("酸爽", "riso/yellow", ["#EEC646", 0.14])),
          divider(),
          H({ sizeH: "fill", justify: "between" }, ...[["6", "种材料"], ["5", "款可调"], ["0", "收藏"]].map(([n, l]) => V({ gap: 0, align: "center" }, T(n, { font: "Cormorant Garamond", weight: "SemiBold", size: 26 }), T(l, { s: "caption", c: "text/muted" })))),
          H({ gap: 8, align: "center", pad: 12, r: 10, fill: "bg/raised", sizeH: "fill" }, I("lock", { s: 14, c: "text/muted" }), T("头像与昵称每 7 天可修改一次", { s: "caption", c: "text/muted" })))))), o);
}

// ---------------- O9 Coachmark tour ----------------
export function tour(o = {}) {
  const overlay = F({ name: "TourOverlay", w: WIN.w, h: WIN.h, abs: true, x: 0, y: 0 },
    // dim with a "hole" around the global search (4 rects)
    R({ name: "dim-top", x: 0, y: 0, w: 1440, h: 6, fill: ["#070404", 0.72] }),
    R({ name: "dim-left", x: 0, y: 6, w: 502, h: 32, fill: ["#070404", 0.72] }),
    R({ name: "dim-right", x: 938, y: 6, w: 502, h: 32, fill: ["#070404", 0.72] }),
    R({ name: "dim-bottom", x: 0, y: 38, w: 1440, h: 862, fill: ["#070404", 0.72] }),
    R({ name: "spotlight", x: 502, y: 6, w: 436, h: 32, r: 10, stroke: "accent/honey", sw: 2, fx: "glow" }),
    V({ name: "Coachmark", x: 520, y: 58, w: 400, pad: 20, gap: 12, r: 16, fill: "bg/raised", stroke: "line/strong", fx: "e2" },
      R({ name: "arrow", x: 196, y: -7, w: 14, h: 14, fill: "bg/raised", rot: 45, abs: true }),
      H({ sizeH: "fill", justify: "between", align: "center" }, H({ gap: 8, align: "center" }, I("search", { s: 16, c: "accent/honey" }), eyebrow("Tip 2 / 4")), I("x", { s: 16, c: "text/muted" })),
      T("随时随地，一键搜索", { s: "h2" }),
      T("按 Ctrl K 打开全局搜索：酒款、材料、帖子与设置都能找到，还可以直接执行「新建酒款」「切换主题」等操作。", { s: "body", c: "text/secondary", fillW: true }),
      H({ sizeH: "fill", justify: "between", align: "center" }, dots(4, 1), H({ gap: 8 }, btn("上一步", { kind: "ghost", size: "sm" }), btn("下一步", { kind: "honey", size: "sm", iconR: "arrowR" })))),
    V({ name: "TourSteps", x: 1120, y: 640, w: 290, pad: 16, gap: 10, r: 14, fill: "bg/surface", stroke: "line/strong", fx: "e2" },
      T("功能导览 · 4 步", { s: "smallM", c: "text/muted" }),
      ...[["侧边导航：在各个空间之间切换", true], ["全局搜索 Ctrl K", "now"], ["今夜特调与「开始调制」", false], ["唱片机：边听边调", false]].map(([t, s]) => H({ gap: 10, align: "center" },
        s === true ? H({ w: 18, h: 18, r: 9, align: "center", justify: "center", fill: "accent/olive" }, I("check", { s: 11, c: "#10180C", sw: 2.6 })) : E({ w: 18, h: 18, stroke: s === "now" ? "accent/honey" : "line/strong", sw: 2 }),
        T(t, { s: "small", c: s === "now" ? "text/primary" : s ? "text/muted" : "text/secondary" })))));
  return appWindow("O9 · 功能导览 Product Tour", "discover", discoverContent(), { ...o, overlay });
}


