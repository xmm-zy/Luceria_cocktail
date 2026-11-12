// Luceria UI building blocks (descriptor factories)
import { F, H, V, T, R, E, L, I, IMG, INST, grad, rgrad, state } from "./engine.mjs";

export const WIN = { w: 1440, h: 900, title: 44, player: 76, side: 244 };
export const CONTENT_W = WIN.w - WIN.side; // 1196
export const CONTENT_H = WIN.h - WIN.title - WIN.player; // 780

// ---------- content data (from drink-app src/data/cocktails.js, extended) ----------
export const DRINKS = {
  whiskeySour: { en: "Whiskey Sour", zh: "威士忌酸", no: "01", base: "Whiskey", baseZh: "威士忌", cat: "经典", method: "摇和 Shake", abv: "16%", time: "4 分钟", img: "whiskey-sour.png", photo: true, tile: "#2A1D17", profile: ["甜酸", "柠檬", "饱满"], rating: "4.8" },
  margarita: { en: "Margarita", zh: "玛格丽特", no: "02", base: "Tequila", baseZh: "龙舌兰", cat: "经典", method: "摇和 Shake", abv: "18%", time: "3 分钟", img: "menu-glass-bottom.png", tile: "#EEC646", profile: ["青柠", "盐边", "清爽"], rating: "4.7" },
  negroni: { en: "Negroni", zh: "尼格罗尼", no: "03", base: "Gin", baseZh: "金酒", cat: "经典", method: "搅拌 Stir", abv: "24%", time: "2 分钟", img: "menu-glass-line-orange.png", tile: "#7E1F2A", profile: ["苦甜", "草本", "橙皮"], rating: "4.9" },
  mojito: { en: "Mojito", zh: "莫吉托", no: "04", base: "Rum", baseZh: "朗姆", cat: "经典", method: "杯中调制 Build", abv: "11%", time: "5 分钟", img: "menu-glass-center.png", tile: "#2E4A2A", profile: ["薄荷", "青柠", "气泡"], rating: "4.6" },
  cosmopolitan: { en: "Cosmopolitan", zh: "大都会", no: "05", base: "Vodka", baseZh: "伏特加", cat: "特调", method: "摇和 Shake", abv: "20%", time: "3 分钟", img: "cocktail-glass-center.png", photo: true, tile: "#33452C", profile: ["蔓越莓", "橙香", "都会"], rating: "4.5" },
  pinaColada: { en: "Piña Colada", zh: "椰林飘香", no: "06", base: "Rum", baseZh: "朗姆", cat: "特调", method: "搅打 Blend", abv: "12%", time: "4 分钟", img: "menu-glass-right.png", tile: "#E9D9B4", profile: ["菠萝", "椰子", "热带"], rating: "4.4" },
  blackRussian: { en: "Black Russian", zh: "黑俄罗斯", no: "07", base: "Vodka", baseZh: "伏特加", cat: "特调", method: "杯中调制 Build", abv: "26%", time: "1 分钟", img: "menu-glass-line-blue.png", tile: "#1C2C3E", profile: ["咖啡", "深色", "甜苦"], rating: "4.3" },
  virginColada: { en: "Virgin Colada", zh: "无酒精椰林飘香", no: "08", base: "None", baseZh: "无基酒", cat: "无酒精", method: "搅打 Blend", abv: "0%", time: "3 分钟", img: "menu-glass-right.png", tile: "#3E86C4", profile: ["菠萝", "椰子", "无酒精"], rating: "4.6" },
};

// ---------- atoms ----------
export const eyebrow = (t, p = {}) => T(t, { s: "eyebrow", c: "accent/honey", upper: true, ...p });
export const divider = (w, p = {}) => R({ name: "divider", w: w || 100, h: 1, fill: "line/subtle", sizeH: w ? undefined : "fill", ...p });

export function btn(label, o = {}) {
  const kind = o.kind || "primary";
  const size = o.size || "md";
  const h = { sm: 32, md: 40, lg: 48 }[size];
  const px = { sm: 12, md: 18, lg: 24 }[size];
  const sty = {
    primary: { fill: "accent/champagne", c: "text/inverse", ic: "text/inverse" },
    honey: { fill: "accent/honey", c: "text/inverse", ic: "text/inverse" },
    wine: { fill: "accent/wine", c: "text/primary", ic: "text/primary" },
    secondary: { fill: "bg/raised", stroke: "line/strong", c: "text/primary", ic: "text/secondary" },
    ghost: { c: "text/secondary", ic: "text/secondary" },
    outline: { stroke: "accent/champagne", c: "accent/champagne", ic: "accent/champagne" },
  }[kind];
  return H({ name: "Button/" + kind, h, pad: [0, px], gap: 8, r: o.r ?? 10, align: "center", justify: "center", fill: sty.fill, stroke: sty.stroke, sizeH: o.fill ? "fill" : undefined, w: o.w, fx: o.fx },
    o.icon && I(o.icon, { s: size === "sm" ? 14 : 16, c: sty.ic }),
    label && T(label, { font: "Noto Sans SC", weight: "Medium", size: size === "lg" ? 15 : size === "sm" ? 12 : 14, c: sty.c }),
    o.iconR && I(o.iconR, { s: 16, c: sty.ic }),
    o.kbd && kbd(o.kbd, kind === "primary"));
}
export const iconBtn = (n, o = {}) => H({ name: "IconButton", w: o.s || 36, h: o.s || 36, r: o.r ?? 10, align: "center", justify: "center", fill: o.fill, stroke: o.stroke }, I(n, { s: o.is || 18, c: o.c || "text/secondary", solid: o.solid }));
export const kbd = (k, dark) => H({ name: "kbd", h: 20, pad: [0, 6], r: 5, align: "center", fill: dark ? ["#000000", 0.12] : "bg/raised", stroke: "line/strong" }, T(k, { font: "Inter", weight: "Medium", size: 11, c: dark ? "text/inverse" : "text/muted" }));

export function chip(label, o = {}) {
  const on = o.on;
  return H({ name: "Chip" + (on ? "/on" : ""), h: o.h || 32, pad: [0, o.px || 14], gap: 6, r: 999, align: "center", fill: on ? "accent/champagne" : o.fill || "bg/raised", stroke: on ? undefined : "line/subtle" },
    o.dot && E({ w: 8, h: 8, fill: o.dot }),
    o.icon && I(o.icon, { s: 14, c: on ? "text/inverse" : "text/secondary" }),
    T(label, { font: "Noto Sans SC", weight: on ? "Medium" : "Regular", size: o.size || 13, c: on ? "text/inverse" : "text/secondary" }),
    o.count !== undefined && T(String(o.count), { font: "Inter", weight: "Medium", size: 11, c: on ? "text/inverse" : "text/muted" }),
    o.x && I("x", { s: 12, c: on ? "text/inverse" : "text/muted" }));
}
export const tag = (label, c = "accent/honey", bg = "accent/honey-soft") => H({ name: "Tag", h: 22, pad: [0, 8], r: 6, align: "center", fill: bg }, T(label, { font: "Noto Sans SC", weight: "Medium", size: 11, c }));
export const badge = (n, c = "accent/wine") => H({ name: "Badge", h: 18, pad: [0, 6], r: 9, align: "center", justify: "center", fill: c }, T(String(n), { font: "Inter", weight: "Medium", size: 10, c: "text/primary" }));

export function input(ph, o = {}) {
  return H({ name: "Input", h: o.h || 44, pad: [0, 14], gap: 10, r: 10, align: "center", fill: o.fill || "bg/sunken", stroke: o.focus ? "accent/honey" : "line/strong", sw: o.focus ? 1.5 : 1, sizeH: o.w ? undefined : "fill", w: o.w, fx: o.focus ? [{ type: "DROP_SHADOW", color: { r: 0.85, g: 0.63, b: 0.36, a: 0.25 }, offset: { x: 0, y: 0 }, radius: 0, spread: 3 }] : undefined },
    o.icon && I(o.icon, { s: 16, c: "text/muted" }),
    T(o.value || ph, { font: "Noto Sans SC", size: 14, c: o.value ? "text/primary" : "text/muted", fillW: true }),
    o.right);
}
export const field = (label, inp, hint) => V({ name: "Field", gap: 8, sizeH: "fill" }, T(label, { s: "smallM", c: "text/secondary" }), inp, hint && T(hint, { s: "small", c: "text/muted" }));

export function toggle(on) {
  return H({ name: "Toggle/" + (on ? "on" : "off"), w: 40, h: 22, r: 11, pad: 3, justify: on ? "end" : "start", align: "center", fill: on ? "accent/honey" : "bg/sunken", stroke: on ? undefined : "line/strong" },
    E({ w: 16, h: 16, fill: on ? "#1A100C" : "text/muted" }));
}
export function checkbox(on, label) {
  return H({ name: "Checkbox", gap: 10, align: "center" },
    H({ w: 18, h: 18, r: 5, align: "center", justify: "center", fill: on ? "accent/honey" : undefined, stroke: on ? undefined : "line/strong", sw: 1.5 }, on && I("check", { s: 12, c: "text/inverse", sw: 2.4 })),
    label && T(label, { s: "body", c: "text/secondary" }));
}
export function segmented(items, active, o = {}) {
  return H({ name: "Segmented", h: o.h || 36, pad: 3, gap: 2, r: 10, fill: "bg/sunken", stroke: "line/subtle", sizeH: o.fill ? "fill" : undefined },
    items.map((it, i) => H({ h: (o.h || 36) - 6, pad: [0, 14], r: 8, align: "center", justify: "center", fill: i === active ? "bg/raised" : undefined, stroke: i === active ? "line/strong" : undefined, sizeH: o.fill ? "fill" : undefined, fx: i === active ? "e1" : undefined },
      T(it, { font: "Noto Sans SC", weight: i === active ? "Medium" : "Regular", size: 13, c: i === active ? "text/primary" : "text/muted" }))));
}
export function avatar(sz = 32, initials = "L", color = "accent/wine", ring) {
  return H({ name: "Avatar", w: sz, h: sz, r: sz / 2, align: "center", justify: "center", fill: color, stroke: ring ? "accent/champagne" : undefined, sw: ring ? 2 : 1, sa: "OUTSIDE" },
    T(initials, { font: "Cormorant Garamond", weight: "SemiBold", size: Math.round(sz * 0.46), c: "#F6EBD6" }));
}
export function progress(pct, w = 200, o = {}) {
  return F({ name: "Progress", w, h: o.h || 4, r: 4, fill: o.track || "line/strong", sizeH: o.fill ? "fill" : undefined, clip: true },
    R({ w: Math.max(2, Math.round(w * pct)), h: o.h || 4, r: 4, fill: o.c || "accent/honey" }));
}
export function stars(n = 4.5, s = 12) {
  const out = [];
  for (let i = 1; i <= 5; i++) out.push(I("star", { s, solid: true, c: i <= Math.round(n) ? "accent/honey" : "line/strong" }));
  return H({ name: "Rating", gap: 2, align: "center" }, out);
}
// Art-deco ornament divider: line ◆ line
export const ornament = (w = 160, c = "accent/gold") => H({ name: "Ornament", gap: 8, align: "center" },
  R({ w: (w - 20) / 2, h: 1, fill: c }), R({ w: 6, h: 6, fill: c, rot: 45 }), R({ w: (w - 20) / 2, h: 1, fill: c }));

// monogram emblem
export function emblem(sz = 40, o = {}) {
  return F({ name: "Logo/Emblem", w: sz, h: sz },
    E({ x: 0, y: 0, w: sz, h: sz, stroke: o.c || "accent/champagne", sw: Math.max(1, sz / 40) }),
    E({ x: sz * 0.1, y: sz * 0.1, w: sz * 0.8, h: sz * 0.8, stroke: o.c || "accent/champagne", sw: Math.max(0.5, sz / 80), opacity: 0.5 }),
    T("L", { font: "Cormorant Garamond", weight: "SemiBold", size: sz * 0.56, c: o.c || "accent/champagne", x: sz * 0.33, y: sz * 0.12 }));
}
export const wordmark = (sz = 18) => H({ name: "Logo/Wordmark", gap: 10, align: "center" }, emblem(sz + 10), V({ gap: 0 },
  T("LUCERIA", { font: "Cormorant Garamond", weight: "SemiBold", size: sz, ls: 22, c: "text/primary" }),
  sz >= 16 && T("COCKTAIL ATELIER", { font: "Inter", weight: "Medium", size: 7, ls: 30, c: "text/muted" })));

// ---------- cocktail visuals ----------
// tile with image: photos fill, cutouts fit on a coloured riso tile
export function art(d, w, h, o = {}) {
  const kids = [];
  if (d.photo) kids.push(IMG(d.img, { name: "photo", x: 0, y: 0, w, h }));
  else {
    kids.push(R({ name: "tile-glow", x: -w * 0.2, y: h * 0.25, w: w * 1.4, h: h * 1.1, fill: rgrad([[0, "#FFFFFF", 0.18], [1, "#FFFFFF", 0]]) }));
    const iw = w * (o.scale || 0.86), ih = h * (o.scale || 0.86);
    kids.push(IMG(d.img, { name: "cutout", x: (w - iw) / 2, y: (h - ih) / 2 + h * 0.04, w: iw, h: ih, fit: "FIT" }));
  }
  if (o.grain !== false) kids.push(R({ name: "vignette", x: 0, y: 0, w, h, fill: grad([[0.55, "#000000", 0], [1, "#000000", o.shade ?? 0.45]]) }));
  if (o.no) kids.push(T("No." + d.no, { font: "Cormorant Garamond", weight: "Medium Italic", size: 15, c: "#F6EBD6", x: 14, y: 10, opacity: 0.85 }));
  if (o.heart) kids.push(H({ x: w - 40, y: 10, w: 30, h: 30, r: 15, align: "center", justify: "center", fill: ["#000000", 0.35] }, I("heart", { s: 15, c: o.heart === "on" ? "riso/red" : "#F6EBD6", solid: o.heart === "on" })));
  return F({ name: "Art/" + d.en, w, h, r: o.r ?? 12, clip: true, fill: d.tile, sizeH: o.fill ? "fill" : undefined, x: o.x, y: o.y, fx: o.fx }, kids);
}

export function drinkCard(d, o = {}) {
  const w = o.w || 210;
  return V({ name: "Card/Cocktail", w, gap: 12, pad: o.pad ?? 0 },
    art(d, w, o.ih || Math.round(w * 1.12), { no: true, heart: o.heart ?? true }),
    V({ gap: 4, sizeH: "fill" },
      H({ sizeH: "fill", justify: "between", align: "center" }, T(d.en, { s: "d4" }), H({ gap: 4, align: "center" }, I("star", { s: 12, solid: true, c: "accent/honey" }), T(d.rating, { s: "num", c: "text/secondary" }))),
      T(d.zh + " · " + d.baseZh, { s: "small", c: "text/muted" })),
    o.tags !== false && H({ gap: 6 }, d.profile.slice(0, 3).map((p, i) => tag(p, i === 0 ? "accent/honey" : "text/secondary", i === 0 ? "accent/honey-soft" : "bg/raised"))));
}

// ---------- shell ----------
export function titleBar(o = {}) {
  return H({ name: "TitleBar", w: WIN.w, h: WIN.title, pad: [0, 0, 0, 16], align: "center", justify: "between", fill: "bg/sunken" },
    H({ gap: 16, align: "center", w: 360 }, wordmark(13),
      H({ gap: 4, align: "center" }, iconBtn("left", { s: 28, is: 16, c: "text/muted" }), iconBtn("right", { s: 28, is: 16, c: "line/strong" }))),
    o.noSearch ? F({ w: 420, h: 30 }) : H({ name: "GlobalSearch", w: 420, h: 30, r: 8, pad: [0, 10], gap: 8, align: "center", fill: "bg/raised", stroke: "line/subtle" },
      I("search", { s: 14, c: "text/muted" }), T("搜索酒款、材料、帖子…", { font: "Noto Sans SC", size: 12, c: "text/muted", fillW: true }), kbd("Ctrl K")),
    H({ gap: 6, align: "center", w: 360, justify: "end" },
      !o.guest && F({ w: 34, h: 30 }, iconBtn("bell", { s: 30, is: 16, x: 2, y: 0 }), E({ x: 21, y: 6, w: 7, h: 7, fill: "riso/red", stroke: "bg/sunken", sw: 1.5, sa: "OUTSIDE" })),
      o.guest ? btn("登录", { size: "sm", kind: "secondary" }) : avatar(26, "M", "accent/wine"),
      F({ w: 12, h: 10 }),
      H({ name: "WindowControls", align: "center" },
        H({ w: 46, h: WIN.title, align: "center", justify: "center" }, I("winMin", { s: 14, c: "text/muted", sw: 1.2 })),
        H({ w: 46, h: WIN.title, align: "center", justify: "center" }, I("winMax", { s: 12, c: "text/muted", sw: 1.2 })),
        H({ w: 46, h: WIN.title, align: "center", justify: "center" }, I("x", { s: 14, c: "text/muted", sw: 1.2 })))));
}

const NAV = [
  ["浏览 BROWSE", [["discover", "compass", "发现", "Discover"], ["library", "book", "酒单库", "Library"], ["bar", "bottle", "我的吧台", "My Bar"], ["tools", "shaker", "器具与冰", "Tools & Ice"]]],
  ["社交 SOCIAL", [["stories", "message", "酒话论坛", "Stories"], ["party", "dice", "酒局", "Party"]]],
  ["我的 YOU", [["favorites", "heart", "收藏", "Favorites"], ["profile", "user", "个人主页", "Profile"]]],
];
export function navItem(icon, zh, en, active, o = {}) {
  return H({ name: "NavItem" + (active ? "/active" : ""), h: 38, pad: [0, 12], gap: 12, r: 10, align: "center", sizeH: "fill", fill: active ? "accent/honey-soft" : undefined },
    active && R({ name: "indicator", w: 3, h: 18, r: 2, fill: "accent/honey", abs: true, x: 0, y: 10 }),
    I(icon, { s: 18, c: active ? "accent/honey" : "text/muted" }),
    T(zh, { font: "Noto Sans SC", weight: active ? "Medium" : "Regular", size: 14, c: active ? "text/primary" : "text/secondary", fillW: true }),
    o.badge ? badge(o.badge, o.badgeC) : active ? T(en, { font: "Inter", size: 10, c: "accent/honey" }) : null);
}
export function sidebar(active, o = {}) {
  return V({ name: "Sidebar", w: WIN.side, sizeV: "fill", pad: [18, 14, 16, 14], gap: 4, fill: "bg/surface" },
    R({ name: "edge", w: 1, h: 10, abs: true, x: WIN.side - 1, y: 0, fill: "line/subtle" }),
    btn("新建酒款", { icon: "plus", kind: "secondary", fill: true, kbd: "Ctrl N" }),
    F({ h: 10, w: 10 }),
    NAV.map(([sec, items], si) => [
      T(sec, { s: "eyebrow", c: "text/muted", upper: true }), F({ h: 2, w: 2 }),
      items.map(([k, ic, zh, en]) => navItem(ic, zh, en, k === active, { badge: k === "stories" ? 3 : k === "party" ? "LIVE" : undefined, badgeC: k === "party" ? "accent/olive" : "accent/wine" })),
      F({ h: si < 2 ? 14 : 4, w: 4 }),
    ]),
    F({ h: 10, w: 10, sizeV: "fill" }),
    o.checklist !== false && V({ name: "GettingStarted", sizeH: "fill", pad: 14, gap: 10, r: 12, fill: "bg/raised", stroke: "line/subtle" },
      H({ sizeH: "fill", justify: "between", align: "center" }, T("新手任务", { s: "smallM", c: "text/primary" }), T("3 / 5", { s: "num", c: "accent/honey" })),
      progress(0.6, 188, { fill: true }),
      T("下一步：收藏你的第一杯酒", { s: "small", c: "text/muted" })),
    F({ h: 6, w: 6 }),
    navItem("settings", "设置", "Settings", active === "settings"));
}
export function playerBar(o = {}) {
  return H({ name: "PlayerBar", w: WIN.w, h: WIN.player, pad: [0, 20], align: "center", justify: "between", fill: "bg/sunken" },
    R({ name: "edge", w: WIN.w, h: 1, abs: true, x: 0, y: 0, fill: "line/subtle" }),
    H({ gap: 14, align: "center", w: 360 },
      F({ name: "Vinyl", w: 48, h: 48, r: 24, clip: true, fill: "#0B0706" },
        IMG("menu-turntable-cutout.png", { x: -30, y: -6, w: 110, h: 177 }),
        E({ x: 18, y: 18, w: 12, h: 12, fill: "accent/honey" })),
      V({ gap: 2 }, T("Midnight in Havana", { font: "Cormorant Garamond", weight: "SemiBold", size: 17, c: "text/primary" }), T("Luceria Lounge · 爵士夜", { s: "small", c: "text/muted" })),
      I("heart", { s: 16, c: "accent/honey", solid: true })),
    V({ gap: 6, align: "center", w: 520 },
      H({ gap: 18, align: "center" }, I("shuffle", { s: 16, c: "text/muted" }), I("prev", { s: 18, c: "text/secondary", solid: true }),
        H({ w: 36, h: 36, r: 18, align: "center", justify: "center", fill: "accent/champagne" }, I(o.paused ? "play" : "pause", { s: 16, c: "text/inverse", solid: true })),
        I("next", { s: 18, c: "text/secondary", solid: true }), I("repeat", { s: 16, c: "accent/honey" })),
      H({ gap: 10, align: "center" }, T("1:42", { s: "caption", c: "text/muted" }), progress(0.38, 420, { h: 3 }), T("4:26", { s: "caption", c: "text/muted" }))),
    H({ gap: 14, align: "center", w: 360, justify: "end" },
      I("music", { s: 16, c: "text/muted" }), I("list", { s: 16, c: "text/muted" }), I("volume", { s: 16, c: "text/muted" }), progress(0.7, 96, { h: 3, c: "text/secondary" }),
      H({ h: 28, pad: [0, 10], gap: 6, r: 8, align: "center", stroke: "line/strong" }, I("disc", { s: 14, c: "text/secondary" }), T("唱片机", { s: "small", c: "text/secondary" }))));
}

// app window: content is a descriptor that should FILL
export function appWindow(name, active, content, o = {}) {
  return V({ name, w: WIN.w, h: WIN.h, r: 14, clip: true, fill: "bg/canvas", stroke: "line/strong", fx: "e3", x: o.x, y: o.y },
    !o.tb && state.components?.TitleBar ? INST("TitleBar") : titleBar(o.tb || {}),
    H({ name: "Body", sizeH: "fill", sizeV: "fill" },
      o.noSidebar ? null : sidebar(active, o.sb || {}),
      content),
    o.noPlayer ? null : (!o.pl && state.components?.PlayerBar ? INST("PlayerBar") : playerBar(o.pl || {})),
    o.overlay);
}
// scrollable content area
export const page = (p, ...kids) => V({ name: "Content", sizeH: "fill", sizeV: "fill", pad: [28, 32, 28, 32], gap: 24, clip: true, ...p }, ...kids);
export function pageHeader(eb, title, en, sub, right) {
  return H({ name: "PageHeader", sizeH: "fill", justify: "between", align: "end" },
    V({ gap: 6 }, eyebrow(eb),
      H({ gap: 12, align: "base" }, T(title, { s: "h1" }), en && T(en, { font: "Cormorant Garamond", weight: "Medium Italic", size: 24, c: "text/muted" })),
      sub && T(sub, { s: "body", c: "text/muted" })),
    right && H({ gap: 10, align: "center" }, right));
}
export const section = (title, right, ...kids) => V({ name: "Section/" + title, gap: 14, sizeH: "fill" },
  H({ sizeH: "fill", justify: "between", align: "center" }, T(title, { s: "h2" }), right || H({ gap: 4, align: "center" }, T("查看全部", { s: "small", c: "text/muted" }), I("right", { s: 14, c: "text/muted" }))), ...kids);
export const card = (p, ...kids) => V({ r: 14, fill: "bg/surface", stroke: "line/subtle", pad: 18, gap: 12, ...p }, ...kids);



