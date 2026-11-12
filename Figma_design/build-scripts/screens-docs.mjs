import { F, H, V, T, R, E, I, IMG, SVG, grad, rgrad } from "./engine.mjs";
import * as U from "./ui.mjs";
import { ICONS } from "./icons.mjs";
import { TOOL_ICONS } from "./svgart.mjs";
import { COLORS, TEXT_STYLES } from "./tokens.mjs";
Object.assign(ICONS, TOOL_ICONS);
const { DRINKS: D, btn, chip, tag, eyebrow, card, art, avatar, iconBtn, input, progress, checkbox, segmented, divider, ornament, emblem, wordmark, toggle, kbd, badge } = U;

// ======================= Cover =======================
export function cover(o = {}) {
  return F({ name: "Cover · Luceria Desktop", w: 1920, h: 1080, clip: true, fill: grad([[0, "#1E1210"], [1, "#0B0706"]], 120) },
    IMG("hands-overlay.png", { x: -80, y: -40, w: 2080, h: 1170, opacity: 0.22 }),
    R({ x: 0, y: 0, w: 1920, h: 1080, fill: rgrad([[0, "#110B09", 0.1], [1, "#110B09", 0.92]]) }),
    R({ x: 1000, y: 120, w: 900, h: 900, fill: rgrad([[0, "#EE7B30", 0.28], [1, "#EE7B30", 0]]) }),
    E({ x: 1120, y: 170, w: 680, h: 680, stroke: ["#EACEAA", 0.25] }), E({ x: 1095, y: 145, w: 730, h: 730, stroke: ["#EACEAA", 0.12], dash: [2, 8] }),
    IMG("menu-glass-line-orange.png", { x: 1200, y: 180, w: 520, h: 699, fit: "FIT" }),
    IMG("menu-glass-center.png", { x: 1610, y: 560, w: 280, h: 270, fit: "FIT", rot: -8 }),
    IMG("menu-glass-line-blue.png", { x: 1050, y: 600, w: 200, h: 315, fit: "FIT", rot: 6 }),
    V({ x: 140, y: 150, w: 900, gap: 26 },
      H({ gap: 16, align: "center" }, emblem(64), V({ gap: 2 }, T("LUCERIA", { font: "Cormorant Garamond", weight: "SemiBold", size: 30, ls: 30, c: "text/primary" }), T("COCKTAIL ATELIER", { font: "Inter", weight: "Medium", size: 11, ls: 40, c: "text/muted" }))),
      F({ w: 2, h: 30 }),
      eyebrow("Desktop App · Design System & Screens · v1.0"),
      T("Your private\nspeakeasy,\non the desktop.", { font: "Cormorant Garamond", weight: "SemiBold", size: 104, lh: 100, c: "text/primary" }),
      T("你桌面上的私人地下酒吧 —— 酒单、吧台、器具、故事与一点运气", { font: "Noto Serif SC", weight: "SemiBold", size: 26, c: "accent/champagne" }),
      ornament(260),
      H({ gap: 40 }, ...[["平台", "Windows / macOS"], ["画板", "1440 × 900"], ["主题", "Night Bar · Parchment"], ["日期", "2026 · 11 · 12"]].map(([k, v]) => V({ gap: 4 }, T(k, { s: "caption", c: "text/muted" }), T(v, { s: "bodyM" }))))),
    H({ x: 140, y: 960, gap: 28 }, ...["00 封面", "01 设计规范", "02 组件库", "03 新用户引导", "04 主应用", "05 系统与状态"].map((t, i) => T(t, { s: "small", c: i === 0 ? "accent/honey" : "text/muted" }))),
    T("基于 xmm-zy/drink-app 重新设计 · Luceria Cocktail Atelier", { s: "caption", c: "text/muted", x: 1440, y: 1020 }));
}

// ======================= Foundations =======================
const secTitle = (n, t, en, d) => V({ gap: 6, sizeH: "fill" }, H({ gap: 12, align: "base" }, T(n, { font: "Cormorant Garamond", weight: "SemiBold", size: 28, c: "accent/honey" }), T(t, { s: "h1" }), T(en, { font: "Cormorant Garamond", weight: "Medium Italic", size: 22, c: "text/muted" })), d && T(d, { s: "body", c: "text/muted" }), F({ w: 2, h: 6 }));
export function foundations(o = {}) {
  const sw = (name, night, light) => {
    const n = Array.isArray(night) ? night : [night, 1], l = Array.isArray(light) ? light : [light, 1];
    return V({ name: "Swatch/" + name, w: 176, gap: 8 },
      H({ sizeH: "fill", h: 76, r: 12, clip: true, stroke: "line/subtle" }, R({ h: 76, w: 88, sizeH: "fill", fill: [n[0], n[1]] }), R({ h: 76, w: 88, sizeH: "fill", fill: [l[0], l[1]] })),
      T(name, { font: "Inter", weight: "Medium", size: 12, c: "text/primary" }),
      T(n[0] + (n[1] < 1 ? " · " + Math.round(n[1] * 100) + "%" : "") + "  /  " + l[0], { font: "Inter", size: 10, c: "text/muted" }));
  };
  const groups = {};
  for (const c of COLORS) { const g = c[0].split("/")[0]; (groups[g] = groups[g] || []).push(c); }
  const typeRow = ([key, [name, fam, st, size, lh]]) => H({ name: "TypeRow", sizeH: "fill", pad: [14, 0], gap: 24, align: "center" },
    V({ w: 220, gap: 2 }, T(name, { font: "Inter", weight: "Medium", size: 12 }), T(`${fam} · ${st} · ${size}/${lh || "auto"}`, { font: "Inter", size: 10, c: "text/muted" })),
    T(key.startsWith("d") || key === "hero" || key === "italic" ? "Negroni & the Midnight Pour" : key.startsWith("h") ? "苦甜草本的餐前经典" : key === "eyebrow" ? "TONIGHT'S POUR" : "金酒、Campari 与甜味美思等比调和。", { s: key, c: "text/primary", upper: key === "eyebrow" }));
  return V({ name: "Foundations · 设计规范", w: 1760, pad: 80, gap: 56, fill: "bg/canvas", r: 16 },
      V({ gap: 8 }, eyebrow("Luceria Design Language"), T("设计规范 Foundations", { font: "Noto Serif SC", weight: "SemiBold", size: 48 }), T("复古地下酒吧 × 现代编辑排版。色板源自原仓库 styles.css（champagne / cream / honey / coffee / balsamico / olive / gold-foil），扩展为夜间与羊皮纸两套主题。所有颜色以 Figma 变量提供：Luceria Color（Night）与 Luceria Color · Parchment。", { s: "bodyL", c: "text/secondary", w: 1100 })),
      // colors
      V({ gap: 20, sizeH: "fill" }, secTitle("01", "色彩", "Color", "每个色块左半为 Night Bar（默认），右半为 Parchment。"),
        ...Object.entries(groups).map(([g, cs]) => V({ gap: 10, sizeH: "fill" }, T(g.toUpperCase(), { s: "eyebrow", c: "text/muted" }), H({ gap: 16, wrap: true, sizeH: "fill" }, cs.map(([n, a, b]) => sw(n, a, b)))))),
      // type
      V({ gap: 4, sizeH: "fill" }, secTitle("02", "字体", "Typography", "Cormorant Garamond 用于英文标题与数字；Noto Serif SC 用于中文标题；Noto Sans SC / Inter 用于正文与界面。"),
        ...Object.entries(TEXT_STYLES).map(typeRow)),
      // spacing, radius, elevation
      H({ gap: 48, sizeH: "fill", align: "start" },
        V({ gap: 16, sizeH: "fill" }, secTitle("03", "间距与圆角", "Spacing & Radius", "8pt 网格；控件圆角 10，卡片 14–18，窗口 14。"),
          H({ gap: 16, align: "end" }, [4, 8, 12, 16, 24, 32, 48, 64].map(s => V({ gap: 6, align: "center" }, R({ w: s, h: s, fill: "accent/honey", opacity: 0.8 }), T(String(s), { s: "caption", c: "text/muted" })))),
          H({ gap: 16, align: "end" }, [6, 10, 14, 18, 999].map(r => V({ gap: 6, align: "center" }, R({ w: 72, h: 72, r: r === 999 ? 36 : r, fill: "bg/raised", stroke: "line/strong" }), T(r === 999 ? "Pill" : "r" + r, { s: "caption", c: "text/muted" }))))),
        V({ gap: 16, sizeH: "fill" }, secTitle("04", "层级", "Elevation"),
          H({ gap: 24, pad: [10, 10, 30, 10] }, ...[["e1", "Elevation/1 Card"], ["e2", "Elevation/2 Popover"], ["e3", "Elevation/3 Window"], ["glow", "Glow/Honey"]].map(([k, n]) => V({ gap: 10, align: "center" }, F({ w: 130, h: 96, r: 14, fill: "bg/raised", stroke: "line/subtle", fx: k }), T(n, { s: "caption", c: "text/muted" })))))),
      // icons
      V({ gap: 16, sizeH: "fill" }, secTitle("05", "图标", "Iconography", "24px 网格、1.6px 描边、圆角端点；酒具图标为定制绘制。"),
        H({ gap: 10, wrap: true, sizeH: "fill" }, Object.keys(ICONS).filter(k => !k.startsWith("win")).map(k => V({ w: 84, h: 84, gap: 8, r: 12, align: "center", justify: "center", fill: "bg/surface", stroke: "line/subtle" }, I(k, { s: 22, c: TOOL_ICONS[k] ? "accent/honey" : "text/secondary" }), T(k, { font: "Inter", size: 9, c: "text/muted" }))))),
      // illustration
      V({ gap: 16, sizeH: "fill" }, secTitle("06", "插画与影像", "Illustration", "沿用原仓库的 Riso 风格剪贴插画：在纯色色块上「浮起」，并以暗角收边。照片仅用于真实酒款。"),
        H({ gap: 16, sizeH: "fill" }, [D.negroni, D.margarita, D.mojito, D.blackRussian, D.whiskeySour, D.pinaColada].map(d => V({ gap: 8 }, art(d, 240, 300, { r: 14, no: true }), T(d.img, { font: "Inter", size: 10, c: "text/muted" }))))),
      // logo
      V({ gap: 16, sizeH: "fill" }, secTitle("07", "标志", "Logo"),
        H({ gap: 24 },
          H({ w: 380, h: 200, r: 16, align: "center", justify: "center", fill: "bg/sunken", stroke: "line/subtle" }, wordmark(28)),
          H({ w: 380, h: 200, r: 16, align: "center", justify: "center", fill: "#F2E4C6" }, H({ gap: 14, align: "center" }, emblem(56, { c: "#34150F" }), T("LUCERIA", { font: "Cormorant Garamond", weight: "SemiBold", size: 32, ls: 26, c: "#34150F" }))),
          H({ w: 200, h: 200, r: 16, align: "center", justify: "center", fill: "accent/wine" }, emblem(96, { c: "#F6EBD6" })),
          H({ w: 200, h: 200, r: 44, align: "center", justify: "center", fill: grad([[0, "#2A1D17"], [1, "#0B0706"]], 90), stroke: "accent/gold", sw: 2 }, emblem(110)),
          V({ gap: 6, w: 260 }, T("App 图标与字标", { s: "h3" }), T("单字母 L 置于双环徽章中，呼应酒杯杯口与唱片。最小尺寸 16px 时去掉内环。", { s: "small", c: "text/muted", fillW: true })))));
}

