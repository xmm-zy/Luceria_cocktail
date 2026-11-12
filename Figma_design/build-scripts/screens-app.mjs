import { F, H, V, T, R, E, L, I, IMG, grad, rgrad } from "./engine.mjs";
import * as U from "./ui.mjs";
const { DRINKS: D, btn, chip, tag, eyebrow, card, section, page, pageHeader, appWindow, drinkCard, art, avatar, iconBtn, input, progress, stars, toggle, checkbox, segmented, divider, ornament, badge, kbd, field, emblem, wordmark, navItem, sidebar, titleBar, playerBar, WIN } = U;

// ======================= A1 Discover =======================
export function discoverContent() {
  const hero = F({ name: "Hero/TonightsPour", h: 312, sizeH: "fill", r: 20, clip: true, fill: grad([[0, "#5A1620"], [0.55, "#3A1014"], [1, "#1A0A0A"]], 0) },
    R({ name: "glow", x: 640, y: -120, w: 520, h: 520, fill: rgrad([[0, "#EE7B30", 0.35], [1, "#EE7B30", 0]]) }),
    E({ name: "deco-ring", x: 720, y: 18, w: 264, h: 264, stroke: ["#EACEAA", 0.25], sw: 1 }),
    E({ name: "deco-ring2", x: 708, y: 6, w: 288, h: 288, stroke: ["#EACEAA", 0.12], sw: 1, dash: [2, 6] }),
    IMG("menu-glass-line-orange.png", { name: "glass", x: 740, y: 22, w: 230, h: 309, fit: "FIT" }),
    V({ name: "copy", x: 40, y: 28, gap: 0, w: 600 },
      H({ gap: 10, align: "center" }, eyebrow("Tonight's Pour"), R({ w: 24, h: 1, fill: "accent/honey" }), T("今夜特调", { s: "small", c: "#CDB898" })),
      F({ h: 4, w: 4 }),
      T("Negroni", { font: "Cormorant Garamond", weight: "SemiBold", size: 76, lh: 86, c: "#F6EBD6" }),
      T("尼格罗尼 · 苦甜草本的餐前经典", { s: "h3", c: "#EACEAA" }),
      F({ h: 10, w: 4 }),
      T("金酒、Campari 与甜味美思等比调和。相传源于佛罗伦萨的伯爵——比例简单，却极考验材料品质。", { s: "body", c: "#CDB898", w: 460 }),
      F({ h: 16, w: 4 }),
      H({ gap: 18, align: "center" },
        ...[["martini", "金酒基"], ["refresh", "搅拌 Stir"], ["droplet", "24% ABV"], ["clock", "2 分钟"]].map(([ic, t]) => H({ gap: 6, align: "center" }, I(ic, { s: 14, c: "accent/honey" }), T(t, { s: "small", c: "#CDB898" })))),
      F({ h: 20, w: 4 }),
      H({ gap: 10, align: "center" }, btn("开始调制", { kind: "honey", icon: "play" }), btn("查看配方", { kind: "outline" }), iconBtn("bookmark", { s: 40, stroke: "line/strong", c: "#CDB898" }))),
    H({ name: "bar-ready", x: 980, y: 222, h: 50, pad: [0, 14], gap: 10, r: 12, align: "center", fill: ["#0B0706", 0.6], stroke: ["#94AE6E", 0.5] },
      H({ w: 26, h: 26, r: 13, align: "center", justify: "center", fill: "accent/olive" }, I("check", { s: 14, c: "#10180C", sw: 2.4 })),
      V({ gap: 0 }, T("吧台已备齐", { s: "smallM", c: "#F6EBD6" }), T("3 / 3 种材料", { s: "caption", c: "accent/olive" }))),
    T("No.03", { font: "Cormorant Garamond", weight: "Medium Italic", size: 18, c: "accent/champagne", x: 1060, y: 24, opacity: 0.7 }));

  const cards = [D.whiskeySour, D.margarita, D.mojito, D.cosmopolitan].map((d, i) => drinkCard(d, { w: 182, ih: 160, heart: i === 0 ? "on" : true }));

  const rail = V({ name: "Rail", w: 316, gap: 16 },
    card({ name: "Card/ContinueReading", sizeH: "fill", gap: 14 },
      H({ sizeH: "fill", justify: "between", align: "center" }, T("酒话 · 继续阅读", { s: "h3" }), I("right", { s: 16, c: "text/muted" })),
      ...[["在京都的小酒馆，我第一次喝到真正的 Highball", "雾岛 · 12 分钟前", "riso/blue", "K"], ["家里做透明球冰，失败 6 次后的经验", "Ice Lab · 1 小时前", "accent/olive", "I"]].map(([t, m, c, a]) =>
        H({ gap: 12, sizeH: "fill", align: "start" }, avatar(32, a, c), V({ gap: 3, sizeH: "fill" }, T(t, { s: "bodyM", fillW: true, lines: 2 }), T(m, { s: "small", c: "text/muted" }))))),
    card({ name: "Card/DailyTip", sizeH: "fill", fill: grad([[0, "#1D2C3A"], [1, "#16110F"]], 45), stroke: ["#4AA3E6", 0.3] },
      H({ gap: 8, align: "center" }, I("snow", { s: 16, c: "riso/blue" }), T("今日小知识 · ICE", { s: "eyebrow", c: "riso/blue", upper: true })),
      T("球冰表面积更小，融化更慢", { s: "h3", c: "#F6EBD6" }),
      T("稀释更慢，适合慢饮型短饮。", { s: "small", c: "#CDB898", fillW: true }),
      H({ gap: 4, align: "center" }, T("去冰块实验室", { s: "smallM", c: "riso/blue" }), I("arrowR", { s: 14, c: "riso/blue" }))));

  return page({},
    pageHeader("Thursday · 11.12 · 22:14", "晚上好，今晚想喝点什么？", null, null,
      [chip("微凉 9°C · 适合温暖的烈酒", { icon: "moon" }), btn("随机来一杯", { kind: "secondary", icon: "dice" })]),
    hero,
    H({ name: "Row", sizeH: "fill", gap: 24, align: "start" },
      V({ name: "Main", sizeH: "fill", gap: 16 },
        section("用你的吧台就能调", H({ gap: 8, align: "center" }, tag("5 款", "accent/olive", "accent/olive-soft"), T("查看全部", { s: "small", c: "text/muted" }), I("right", { s: 14, c: "text/muted" })),
          H({ gap: 16, sizeH: "fill" }, cards))),
      rail));
}
export const discover = (o = {}) => appWindow("A1 · 发现 Discover", "discover", discoverContent(), o);



// ---------------------------------------------------------------------------
import { SVG } from "./engine.mjs";
import { ICONS } from "./icons.mjs";
import { wheelSvg, radarSvg, ringSvg, diceSvg, sparkSvg, TOOL_ICONS } from "./svgart.mjs";
Object.assign(ICONS, TOOL_ICONS);
const dots = (n, act) => H({ gap: 6, align: "center" }, Array.from({ length: n }, (_, i) => R({ w: i === act ? 22 : 6, h: 6, r: 3, fill: i === act ? "accent/honey" : "line/strong" })));
const fact = (label, value, ic) => V({ name: "Fact", gap: 4, sizeH: "fill", pad: [10, 12], r: 10, fill: "bg/raised" },
  H({ gap: 6, align: "center" }, ic && I(ic, { s: 13, c: "text/muted" }), T(label, { s: "caption", c: "text/muted" })), T(value, { s: "bodyM" }));
const leader = (name, amt, on) => H({ name: "IngredientRow", sizeH: "fill", gap: 10, align: "center", h: 34 },
  checkbox(on), T(name, { s: "body", c: on ? "text/muted" : "text/primary", deco: on ? "STRIKETHROUGH" : undefined }),
  R({ name: "leader", h: 1, w: 20, sizeH: "fill", fill: "line/subtle" }),
  T(amt, { font: "Inter", weight: "Medium", size: 13, c: "accent/champagne" }));

// ======================= A2 Library =======================
export function library(o = {}) {
  const rows = [D.whiskeySour, D.margarita, D.negroni, D.mojito, D.cosmopolitan, D.pinaColada, D.blackRussian, D.virginColada].map((d) =>
    H({ name: "ListRow" + (d === D.negroni ? "/selected" : ""), sizeH: "fill", pad: [8, 12, 8, 8], gap: 12, r: 12, align: "center", fill: d === D.negroni ? "bg/raised" : undefined, stroke: d === D.negroni ? ["#D9A05B", 0.45] : undefined },
      art(d, 52, 52, { r: 9, shade: 0.1, scale: 0.95 }),
      V({ gap: 1, sizeH: "fill" }, T(d.en, { font: "Cormorant Garamond", weight: "SemiBold", size: 18, c: "text/primary" }), T(d.zh + " · " + d.method.split(" ")[0], { s: "small", c: "text/muted" })),
      V({ gap: 4, align: "end" }, T(d.abv, { s: "num", c: d.abv === "0%" ? "accent/olive" : "text/secondary" }), d === D.negroni ? I("heart", { s: 12, c: "riso/red", solid: true }) : T(d.cat, { s: "caption", c: "text/muted" }))));
  const N = D.negroni;
  const detail = V({ name: "Detail", sizeH: "fill", sizeV: "fill", r: 18, fill: "bg/surface", stroke: "line/subtle", clip: true },
    H({ name: "DetailTop", sizeH: "fill", gap: 24, pad: [18, 22] },
      art(N, 240, 276, { r: 14, no: true, heart: "on", scale: 0.92 }),
      V({ gap: 10, sizeH: "fill" },
        H({ gap: 8, align: "center" }, eyebrow("No.03 · Classic"), tag("经典", "accent/honey"), tag("餐前酒", "text/secondary", "bg/raised")),
        T("Negroni", { s: "d1" }),
        H({ gap: 12, align: "center" }, T("尼格罗尼", { s: "h2", c: "accent/champagne" }), stars(4.9, 13), T("4.9 · 326 条评价", { s: "small", c: "text/muted" })),
        T("苦甜草本、橙皮余韵。比例简洁，却极考验材料品质。", { s: "body", c: "text/secondary", fillW: true }),
        H({ gap: 8, sizeH: "fill" }, fact("基酒", "金酒 Gin", "martini"), fact("方法", "搅拌 Stir", "refresh"), fact("酒精度", "约 24%", "droplet")),
        H({ gap: 8, sizeH: "fill" }, fact("杯型", "古典杯", "wine"), fact("冰型", "大方冰", "snow"), fact("用时", "2 分钟", "clock")),
        H({ gap: 10, align: "center" }, btn("开始调制", { kind: "honey", icon: "play" }), btn("已收藏", { kind: "secondary", icon: "heart" }), iconBtn("share", { s: 40, stroke: "line/strong" }), iconBtn("more", { s: 40, stroke: "line/strong" })))),
    R({ w: 10, h: 1, sizeH: "fill", fill: "line/subtle" }),
    H({ name: "DetailBottom", sizeH: "fill", gap: 28, pad: [14, 22] },
      V({ name: "Recipe", gap: 4, w: 330 },
        H({ sizeH: "fill", justify: "between", align: "center" }, T("配方 Recipe", { s: "h3" }), segmented(["ml", "oz"], 0, { h: 28 })),
        F({ h: 4, w: 4 }),
        leader("金酒 Gin", "30 ml", true), leader("Campari", "30 ml", true), leader("甜味美思 Sweet Vermouth", "30 ml", false), leader("橙皮 Orange Peel", "1 片", false)),
      V({ name: "Story", gap: 8, sizeH: "fill" },
        T("命名由来", { s: "h3" }),
        T("相传以意大利 Count Negroni 伯爵命名，源于他要求把 Americano 里的苏打水换成金酒。", { s: "small", c: "text/secondary", fillW: true }),
        F({ h: 4, w: 4 }),
        T("酒友评论 · 326", { s: "h3" }),
        H({ gap: 10, align: "start", sizeH: "fill" }, avatar(26, "Y", "riso/blue"), V({ gap: 2, sizeH: "fill" }, H({ gap: 6, align: "center" }, T("夜航船", { s: "smallM" }), stars(5, 10)), T("用大冰块慢慢搅，加一点橙皮油，第一口就爱上。", { s: "small", c: "text/secondary", fillW: true, lines: 2 }))))));
  return appWindow("A2 · 酒单库 Library", "library", page({ gap: 18 },
    pageHeader("Cocktail Library", "酒单库", "Library", null, [segmented(["网格", "列表"], 1), btn("新建酒款", { icon: "plus", kind: "primary" })]),
    H({ name: "Toolbar", sizeH: "fill", gap: 10, align: "center" },
      input("搜索酒名、材料或风味…", { icon: "search", w: 300, h: 38 }),
      chip("全部", { on: true, count: 128 }), chip("经典", { count: 42 }), chip("特调", { count: 56 }), chip("无酒精", { count: 30, dot: "accent/olive" }),
      F({ h: 2, w: 2, sizeH: "fill" }),
      chip("基酒：全部", { icon: "filter" }), chip("排序：最受欢迎", { icon: "sliders" })),
    H({ name: "Split", sizeH: "fill", sizeV: "fill", gap: 18 },
      V({ name: "List", w: 300, sizeV: "fill", gap: 2, clip: true }, T("共 8 款 · 筛选结果会写进地址，分享即可复现", { s: "caption", c: "text/muted" }), F({ h: 6, w: 4 }), rows),
      detail)), o);
}

// ======================= A3 Mix Mode =======================
export function mixMode(o = {}) {
  const N = D.negroni;
  const steps = ["备杯冰镇", "量取材料", "加冰搅拌", "滤入杯中", "橙皮装饰"];
  const content = H({ name: "MixMode", sizeH: "fill", sizeV: "fill" },
    F({ name: "Stage", w: 470, sizeV: "fill", fill: grad([[0, "#5A1620"], [1, "#160909"]], 90), clip: true },
      R({ x: -100, y: 200, w: 680, h: 680, fill: rgrad([[0, "#EE7B30", 0.32], [1, "#EE7B30", 0]]) }),
      E({ x: 55, y: 150, w: 360, h: 360, stroke: ["#EACEAA", 0.2] }), E({ x: 35, y: 130, w: 400, h: 400, stroke: ["#EACEAA", 0.1], dash: [2, 6] }),
      IMG(N.img, { x: 85, y: 150, w: 300, h: 404, fit: "FIT" }),
      V({ x: 36, y: 34, gap: 4 }, eyebrow("Mix Mode · 调制模式"), T("Negroni", { s: "d2" }), T("尼格罗尼 · 1 杯", { s: "small", c: "text/secondary" })),
      H({ x: 36, y: 640, gap: 8, align: "center" }, I("music", { s: 14, c: "text/muted" }), T("音乐与计时会在调制模式下保持播放", { s: "small", c: "text/muted" }))),
    V({ name: "Steps", sizeH: "fill", sizeV: "fill", pad: [32, 48], gap: 28 },
      H({ sizeH: "fill", justify: "between", align: "center" },
        H({ gap: 0, align: "center" }, steps.map((s, i) => H({ gap: 8, align: "center" },
          H({ w: 26, h: 26, r: 13, align: "center", justify: "center", fill: i < 2 ? "accent/olive" : i === 2 ? "accent/honey" : undefined, stroke: i > 2 ? "line/strong" : undefined },
            i < 2 ? I("check", { s: 13, c: "#10180C", sw: 2.6 }) : T(String(i + 1), { font: "Inter", weight: "Medium", size: 12, c: i === 2 ? "text/inverse" : "text/muted" })),
          T(s, { s: "small", c: i === 2 ? "text/primary" : "text/muted" }), i < 4 && R({ w: 28, h: 1, fill: i < 2 ? "accent/olive" : "line/strong" }), F({ w: 4, h: 2 })))),
        btn("退出", { kind: "ghost", icon: "x", kbd: "Esc" })),
      H({ sizeH: "fill", gap: 40, align: "center", sizeV: "fill" },
        V({ gap: 14, sizeH: "fill" },
          T("03 / 05", { font: "Cormorant Garamond", weight: "Medium Italic", size: 28, c: "accent/honey" }),
          T("加冰搅拌 20 秒", { font: "Noto Serif SC", weight: "SemiBold", size: 44, lh: 56, c: "text/primary" }),
          T("在调酒杯中加入大量硬冰，吧勺贴杯壁顺时针搅拌约 20 秒，让酒液降温并获得约 20% 的稀释。", { s: "bodyL", c: "text/secondary", w: 440 }),
          H({ gap: 10, align: "center" }, tag("小技巧", "riso/blue", ["#4AA3E6", 0.15]), T("勺背始终贴着杯壁，冰块整体旋转而不是上下翻动。", { s: "small", c: "text/muted" })),
          F({ h: 8, w: 4 }),
          card({ w: 440, gap: 4, pad: [12, 16] }, T("本步骤材料", { s: "smallM", c: "text/muted" }), leader("金酒 Gin", "30 ml", true), leader("Campari", "30 ml", true), leader("甜味美思", "30 ml", true))),
        F({ name: "Timer", w: 280, h: 280 },
          SVG(ringSvg(280, 0.7, 12), { x: 0, y: 0 }),
          V({ x: 0, y: 92, w: 280, gap: 2, align: "center" }, T("00:14", { font: "Cormorant Garamond", weight: "SemiBold", size: 64, lh: 66, c: "text/primary" }), T("剩余 6 秒", { s: "small", c: "text/muted" })),
          H({ x: 96, y: 300, gap: 10 }, iconBtn("refresh", { s: 40, stroke: "line/strong" }), iconBtn("pause", { s: 40, fill: "accent/champagne", c: "text/inverse", solid: true })))),
      H({ sizeH: "fill", justify: "between", align: "center" },
        btn("上一步", { kind: "secondary", icon: "arrowL" }),
        H({ gap: 8, align: "center" }, I("keyboard", { s: 14, c: "text/muted" }), T("空格 暂停计时 · ← → 切换步骤", { s: "small", c: "text/muted" })),
        btn("下一步：滤入杯中", { kind: "honey", iconR: "arrowR", size: "lg" }))));
  return appWindow("A3 · 调制模式 Mix Mode", "library", content, { ...o, noSidebar: true });
}

// ======================= A4 My Bar =======================
export function myBar(o = {}) {
  const stat = (n, l, sub, c, ic) => H({ name: "Stat", sizeH: "fill", pad: 18, gap: 14, r: 14, align: "center", fill: "bg/surface", stroke: "line/subtle" },
    H({ w: 44, h: 44, r: 12, align: "center", justify: "center", fill: [c, 0.16] }, I(ic, { s: 20, c })),
    V({ gap: 0 }, T(n, { font: "Cormorant Garamond", weight: "SemiBold", size: 34, lh: 36, c: "text/primary" }), T(l, { s: "small", c: "text/muted" })),
    F({ h: 2, w: 2, sizeH: "fill" }), sub);
  const bottle = (name, en, color, st) => V({ name: "Bottle", sizeH: "fill", pad: [14, 12], gap: 8, r: 14, align: "center", fill: "bg/surface", stroke: st === "low" ? ["#E8B04A", 0.5] : "line/subtle" },
    F({ w: 56, h: 64 }, R({ x: 20, y: 0, w: 16, h: 14, r: 3, fill: color, opacity: 0.85 }), R({ x: 10, y: 12, w: 36, h: 52, r: 10, fill: color }), R({ x: 14, y: 30, w: 28, h: 18, r: 3, fill: "#F6EBD6", opacity: 0.85 }), R({ x: 17, y: 36, w: 22, h: 2, fill: color, opacity: 0.7 })),
    V({ gap: 0, align: "center" }, T(name, { s: "smallM" }), T(en, { s: "caption", c: "text/muted" })),
    st === "low" ? tag("快用完", "state/warning", ["#E8B04A", 0.15]) : tag("已有", "accent/olive", "accent/olive-soft"));
  const shelf = [["波本威士忌", "Bourbon", "#B5682A"], ["龙舌兰", "Tequila", "#D9C27A", "low"], ["金酒", "Gin", "#6FA7C8"], ["白朗姆", "White Rum", "#CFC6B4"], ["伏特加", "Vodka", "#9FB4C9"], ["Campari", "Bitter", "#C42B2B"],
    ["甜味美思", "Vermouth", "#7A2433"], ["君度", "Triple Sec", "#E39A3B", "low"], ["咖啡利口酒", "Kahlúa", "#3B2418"], ["安格斯图拉", "Bitters", "#8D3B1D"], ["椰浆", "Coconut", "#E8DFC9"], ["糖浆", "Syrup", "#D9B98A"]];
  const near = [[D.whiskeySour, "鸡蛋清", "可选"], [D.cosmopolitan, "蔓越莓汁", "缺 1"], [D.pinaColada, "菠萝汁", "缺 1"]];
  return appWindow("A4 · 我的吧台 My Bar", "bar", page({ gap: 20 },
    pageHeader("Home Bar", "我的吧台", "My Bar", "登记你拥有的酒与材料，Luceria 会实时算出今晚能调什么。", [btn("扫描酒标", { kind: "secondary", icon: "image" }), btn("添加材料", { icon: "plus" })]),
    H({ sizeH: "fill", gap: 14 },
      stat("14", "种材料已登记", T("+2 本周", { s: "smallM", c: "state/success" }), "#D9A05B", "bottle"),
      stat("9", "款可以直接调", SVG(sparkSvg(110, 36, [3, 4, 4, 6, 7, 7, 9], "#94AE6E")), "#94AE6E", "martini"),
      stat("6", "款只差一样材料", T("去补货 →", { s: "smallM", c: "accent/honey" }), "#4AA3E6", "sparkles")),
    H({ sizeH: "fill", sizeV: "fill", gap: 20 },
      V({ name: "Shelf", sizeH: "fill", sizeV: "fill", gap: 14 },
        H({ sizeH: "fill", justify: "between", align: "center" }, segmented(["全部 14", "基酒 6", "利口酒 4", "果汁糖浆 2", "苦精香料 2"], 0), H({ gap: 8 }, iconBtn("grid", { stroke: "line/strong", c: "accent/honey" }), iconBtn("list", { stroke: "line/subtle" }))),
        V({ dir: "GRID", cols: 6, gap: 12, sizeH: "fill" }, shelf.map(([a, b, c, s]) => bottle(a, b, c, s)))),
      V({ name: "Suggest", w: 330, gap: 14 },
        card({ sizeH: "fill", gap: 12 },
          H({ sizeH: "fill", justify: "between", align: "center" }, T("只差一样就能调", { s: "h3" }), tag("6 款", "riso/blue", ["#4AA3E6", 0.15])),
          near.map(([d, m, t]) => H({ sizeH: "fill", gap: 12, align: "center" }, art(d, 44, 44, { r: 8, shade: 0.1 }),
            V({ gap: 2, sizeH: "fill" }, T(d.en, { font: "Cormorant Garamond", weight: "SemiBold", size: 17 }), H({ gap: 6, align: "center" }, I("plus", { s: 12, c: "accent/honey" }), T(m, { s: "small", c: "accent/honey" }))),
            T(t, { s: "caption", c: "text/muted" })))),
        card({ sizeH: "fill", gap: 10, fill: grad([[0, "#2A1D17"], [1, "#1A120F"]], 90) },
          H({ gap: 8, align: "center" }, I("list", { s: 16, c: "accent/honey" }), T("购物清单", { s: "h3" })),
          checkbox(false, "蔓越莓汁 · 1 L"), checkbox(false, "新鲜菠萝 · 1 个"), checkbox(true, "青柠 · 6 个"),
          btn("导出清单", { kind: "secondary", size: "sm", icon: "share", fill: true }))))), o);
}

// ======================= A5 Create Cocktail =======================
export function createCocktail(o = {}) {
  const ing = (n, a, u) => H({ sizeH: "fill", gap: 8, align: "center" }, I("more", { s: 16, c: "text/muted", rot: 90 }), input(n, { value: n, h: 38 }), input(a, { value: a, w: 80, h: 38 }), H({ w: 74, h: 38, r: 10, pad: [0, 10], align: "center", justify: "between", fill: "bg/sunken", stroke: "line/strong" }, T(u, { s: "body" }), I("down", { s: 14, c: "text/muted" })), iconBtn("trash", { s: 34, c: "text/muted" }));
  return appWindow("A5 · 新建酒款 Create", "library", page({ gap: 18 },
    H({ sizeH: "fill", justify: "between", align: "center" },
      V({ gap: 6 }, H({ gap: 6, align: "center" }, T("酒单库", { s: "small", c: "text/muted" }), I("right", { s: 12, c: "text/muted" }), T("新建酒款", { s: "small", c: "text/secondary" })), T("新建一杯属于你的酒", { s: "h1" })),
      H({ gap: 10, align: "center" }, T("草稿已自动保存 · 22:13", { s: "small", c: "text/muted" }), btn("保存草稿", { kind: "secondary" }), btn("发布到酒单库", { kind: "honey", icon: "send" }))),
    H({ sizeH: "fill", sizeV: "fill", gap: 20 },
      V({ name: "Form", sizeH: "fill", sizeV: "fill", gap: 16, clip: true },
        card({ sizeH: "fill", gap: 14 },
          H({ gap: 10, align: "center" }, T("01", { font: "Cormorant Garamond", weight: "SemiBold", size: 22, c: "accent/honey" }), T("基本资料", { s: "h3" })),
          H({ sizeH: "fill", gap: 14 }, field("英文名", input("Cocktail Name", { value: "Velvet Ember", focus: true })), field("中文名", input("酒款中文名", { value: "丝绒余烬" }))),
          H({ sizeH: "fill", gap: 14 }, field("分类", segmented(["经典", "特调", "无酒精"], 1, { fill: true })), field("基酒", H({ h: 44, r: 10, pad: [0, 14], sizeH: "fill", align: "center", justify: "between", fill: "bg/sunken", stroke: "line/strong" }, T("波本威士忌 Whiskey", { s: "body" }), I("down", { s: 16, c: "text/muted" }))))),
        card({ sizeH: "fill", gap: 12 },
          H({ sizeH: "fill", justify: "between", align: "center" }, H({ gap: 10, align: "center" }, T("02", { font: "Cormorant Garamond", weight: "SemiBold", size: 22, c: "accent/honey" }), T("调酒配方", { s: "h3" })), segmented(["摇和", "搅拌", "杯中调制", "搅打"], 1, { h: 32 })),
          ing("波本威士忌", "45", "ml"), ing("烟熏枫糖浆", "10", "ml"), ing("安格斯图拉苦精", "2", "dash"),
          H({ gap: 6, align: "center" }, I("plus", { s: 14, c: "accent/honey" }), T("添加材料", { s: "smallM", c: "accent/honey" }))),
        card({ sizeH: "fill", gap: 12 },
          H({ gap: 10, align: "center" }, T("03", { font: "Cormorant Garamond", weight: "SemiBold", size: 22, c: "accent/honey" }), T("故事与风味", { s: "h3" })),
          V({ sizeH: "fill", h: 76, pad: 14, r: 10, fill: "bg/sunken", stroke: "line/strong" }, T("壁炉旁的一杯 Old Fashioned 变奏，用烟熏枫糖替代方糖，入口是篝火与焦糖…", { s: "body", c: "text/secondary", fillW: true })),
          H({ gap: 8 }, chip("烟熏", { on: true, x: true, h: 28 }), chip("焦糖", { on: true, x: true, h: 28 }), chip("+ 风味标签", { h: 28 })))),
      V({ name: "Preview", w: 340, gap: 12 },
        H({ sizeH: "fill", justify: "between", align: "center" }, T("实时预览", { s: "smallM", c: "text/muted" }), segmented(["卡片", "详情"], 0, { h: 28 })),
        V({ sizeH: "fill", h: 210, r: 14, align: "center", justify: "center", gap: 8, fill: "bg/surface", stroke: "accent/honey", dash: [6, 5], sw: 1.2 },
          H({ w: 48, h: 48, r: 24, align: "center", justify: "center", fill: "accent/honey-soft" }, I("upload", { s: 22, c: "accent/honey" })),
          T("拖入或点击上传酒款照片", { s: "bodyM" }), T("JPG / PNG · 建议竖图 4:5 · ≤ 5 MB", { s: "caption", c: "text/muted" })),
        card({ sizeH: "fill", gap: 8 },
          H({ gap: 8, align: "center" }, eyebrow("Signature · No.—"), tag("草稿", "text/secondary", "bg/raised")),
          T("Velvet Ember", { s: "d3" }), T("丝绒余烬 · 波本威士忌", { s: "small", c: "accent/champagne" }),
          divider(),
          leader("波本威士忌", "45 ml"), leader("烟熏枫糖浆", "10 ml"), leader("安格斯图拉苦精", "2 dash"),
          H({ gap: 6, align: "center" }, I("info", { s: 13, c: "text/muted" }), T("发布后其他酒友可评论、收藏与复刻", { s: "caption", c: "text/muted" })))))), o);
}




// ======================= A6 Tools & Ice =======================
export function tools(o = {}) {
  const TL = [["shaker", "波士顿摇壶", "Boston Shaker", "摇和类 · 蛋清酸酒", "#D9A05B"], ["jigger", "量酒器", "Jigger", "精准量取 · 30/45 ml", "#EACEAA"], ["spoon", "吧勺", "Bar Spoon", "搅拌 · 分层 · 量茶匙", "#94AE6E"], ["strainer", "霍桑滤冰器", "Hawthorne", "摇和后滤冰", "#4AA3E6"],
    ["muddler", "捣棒", "Muddler", "捣压薄荷与水果", "#EE7B30"], ["mixglass", "调酒杯", "Mixing Glass", "搅拌类 · 马天尼", "#D9473A"], ["press", "柑橘压汁器", "Citrus Press", "现榨柠檬 / 青柠", "#EEC646"], ["fine", "细滤网", "Fine Strainer", "双重过滤碎冰与果渣", "#CDB898"]];
  const toolCard = ([ic, zh, en, use, c], i) => V({ name: "Card/Tool", sizeH: "fill", pad: 16, gap: 10, r: 14, fill: i === 0 ? "bg/raised" : "bg/surface", stroke: i === 0 ? ["#D9A05B", 0.5] : "line/subtle" },
    H({ sizeH: "fill", justify: "between", align: "start" }, H({ w: 52, h: 52, r: 14, align: "center", justify: "center", fill: [c, 0.14], stroke: [c, 0.3] }, I(ic, { s: 26, c, sw: 1.4 })), T("0" + (i + 1), { font: "Cormorant Garamond", weight: "Medium Italic", size: 16, c: "text/muted" })),
    V({ gap: 1 }, T(zh, { s: "h3" }), T(en, { font: "Cormorant Garamond", weight: "Medium Italic", size: 15, c: "text/muted" })),
    T(use, { s: "small", c: "text/secondary" }));
  const meter = (label, v, c) => V({ gap: 6, sizeH: "fill" }, H({ sizeH: "fill", justify: "between" }, T(label, { s: "caption", c: "text/muted" }), T(["慢", "中", "快"][v - 1], { s: "caption", c })), H({ gap: 3, sizeH: "fill" }, [1, 2, 3].map(k => R({ h: 4, w: 10, r: 2, sizeH: "fill", fill: k <= v ? c : "line/strong" }))));
  const ice = (name, en, cool, dil, rec, c) => V({ name: "Ice", sizeH: "fill", pad: 14, gap: 12, r: 12, fill: "bg/raised" },
    H({ gap: 10, align: "center" }, H({ w: 36, h: 36, r: name === "球冰" ? 18 : 6, fill: ["#BFE3FF", 0.25], stroke: ["#BFE3FF", 0.6] }), V({ gap: 0 }, T(name, { s: "bodyM" }), T(en, { s: "caption", c: "text/muted" }))),
    meter("降温", cool, "riso/blue"), meter("稀释", dil, "accent/honey"), T("推荐：" + rec, { s: "small", c: "text/secondary", fillW: true }));
  return appWindow("A6 · 器具与冰 Tools & Ice", "tools", page({ gap: 20 },
    pageHeader("Bar Tools & Ice Lab", "器具与冰", "Tools & Ice", "按「用途 · 步骤 · 常见误区」整理入门器具；冰型直接决定降温、稀释与口感。", [segmented(["器具图鉴", "按酒款反查", "冰块实验室"], 0)]),
    H({ sizeH: "fill", sizeV: "fill", gap: 20 },
      V({ sizeH: "fill", gap: 16 }, V({ dir: "GRID", cols: 4, gap: 14, sizeH: "fill" }, TL.map(toolCard)),
        card({ name: "ReverseLookup", sizeH: "fill", gap: 14 },
          H({ sizeH: "fill", justify: "between", align: "center" }, T("按酒款反查器具与冰型", { s: "h3" }), T("选择一款酒，快速查看推荐器具、冰型与操作要点", { s: "small", c: "text/muted" })),
          H({ gap: 8 }, chip("Old Fashioned", { on: true, h: 30 }), chip("Negroni", { h: 30 }), chip("Whiskey Sour", { h: 30 }), chip("Mint Julep", { h: 30 }), chip("Mojito", { h: 30 })),
          H({ sizeH: "fill", gap: 14 },
            V({ sizeH: "fill", gap: 8, pad: 14, r: 12, fill: "bg/raised" }, T("推荐器具", { s: "caption", c: "text/muted" }), H({ gap: 8 }, ...[["mixglass", "调酒杯"], ["spoon", "吧勺"], ["strainer", "滤冰器"]].map(([ic, t]) => H({ gap: 6, align: "center" }, I(ic, { s: 16, c: "accent/honey" }), T(t, { s: "smallM" }))))),
            V({ sizeH: "fill", gap: 8, pad: 14, r: 12, fill: "bg/raised" }, T("推荐冰型", { s: "caption", c: "text/muted" }), H({ gap: 8, align: "center" }, E({ w: 16, h: 16, fill: ["#BFE3FF", 0.3], stroke: ["#BFE3FF", 0.7] }), T("透明球冰 · 1 颗", { s: "smallM" }))),
            V({ sizeH: "fill", gap: 8, pad: 14, r: 12, fill: "bg/raised" }, T("操作要点", { s: "caption", c: "text/muted" }), T("方糖先用苦精浸透，搅拌 30 秒后再放球冰。", { s: "small", c: "text/secondary", fillW: true }))))),
      V({ name: "IceLab", w: 340, sizeV: "fill", pad: 18, gap: 14, r: 16, fill: grad([[0, "#152230"], [1, "#16110F"]], 90), stroke: ["#4AA3E6", 0.28] },
        H({ gap: 8, align: "center" }, I("snow", { s: 18, c: "riso/blue" }), T("冰块实验室", { s: "h3" }), F({ w: 2, h: 2, sizeH: "fill" }), tag("Ice Lab", "riso/blue", ["#4AA3E6", 0.15])),
        ice("球冰", "Whiskey Sphere", 2, 1, "Old Fashioned · Negroni on the rocks", "riso/blue"),
        ice("标准方冰", "Kold-Draft Cube", 2, 2, "摇和 / 搅拌通用", "riso/blue"),
        ice("碎冰", "Pebble Ice", 3, 3, "Julep · Swizzle · Mojito", "riso/blue")))), o);
}

// ======================= A7 Stories forum =======================
export function stories(o = {}) {
  const post = (a, ac, name, time, topic, title, body, img, likes, rep, liked) => V({ name: "Card/Post", sizeH: "fill", pad: 18, gap: 12, r: 16, fill: "bg/surface", stroke: "line/subtle" },
    H({ sizeH: "fill", gap: 10, align: "center" }, avatar(34, a, ac), V({ gap: 0, sizeH: "fill" }, T(name, { s: "bodyM" }), T(time, { s: "caption", c: "text/muted" })), tag(topic, "text/secondary", "bg/raised"), I("more", { s: 18, c: "text/muted" })),
    T(title, { font: "Noto Serif SC", weight: "SemiBold", size: 18, lh: 26, fillW: true }),
    H({ sizeH: "fill", gap: 16, align: "start" }, T(body, { s: "body", c: "text/secondary", fillW: true, lines: 3 }), img && IMG(img, { w: 150, h: 96, r: 10 })),
    H({ gap: 20, align: "center" }, H({ gap: 6, align: "center" }, I("heart", { s: 16, c: liked ? "riso/red" : "text/muted", solid: liked }), T(likes, { s: "num", c: liked ? "riso/red" : "text/muted" })),
      H({ gap: 6, align: "center" }, I("chat", { s: 16, c: "text/muted" }), T(rep, { s: "num", c: "text/muted" })), H({ gap: 6, align: "center" }, I("bookmark", { s: 16, c: "text/muted" }), T("收藏", { s: "small", c: "text/muted" })), F({ w: 2, h: 2, sizeH: "fill" }), I("share", { s: 16, c: "text/muted" })));
  const side = (ic, l, n, on) => H({ sizeH: "fill", h: 36, pad: [0, 10], gap: 10, r: 9, align: "center", fill: on ? "accent/honey-soft" : undefined }, I(ic, { s: 16, c: on ? "accent/honey" : "text/muted" }), T(l, { s: "body", c: on ? "text/primary" : "text/secondary", fillW: true }), T(n, { s: "caption", c: "text/muted" }));
  return appWindow("A7 · 酒话论坛 Stories", "stories", page({ gap: 20 },
    pageHeader("Drinking Stories Forum", "酒话论坛", "Forum of Glass, City & Memory", null, [segmented(["最新发布", "热度优先"], 0), btn("发布新帖", { icon: "edit", kind: "honey" })]),
    H({ sizeH: "fill", sizeV: "fill", gap: 20 },
      V({ name: "Filters", w: 196, gap: 4 }, side("layers", "全部帖子", "1.2k", true), side("user", "我发布的", "6"), side("bookmark", "我的收藏", "18"), F({ h: 14, w: 2 }), T("话题 TOPICS", { s: "eyebrow", c: "text/muted" }), F({ h: 4, w: 2 }),
        ["#家庭吧台", "#旅行酒单", "#城市夜生活", "#冰块实验", "#无酒精也快乐"].map((t, i) => H({ h: 30, pad: [0, 10], align: "center" }, T(t, { s: "body", c: i === 1 ? "accent/honey" : "text/secondary" })))),
      V({ name: "Feed", sizeH: "fill", sizeV: "fill", gap: 14, clip: true },
        H({ name: "Composer", sizeH: "fill", pad: [12, 14], gap: 12, r: 14, align: "center", fill: "bg/surface", stroke: "line/subtle" }, avatar(32, "M", "accent/wine"), T("分享你今晚的一杯，或者一个关于酒的故事…", { s: "body", c: "text/muted", fillW: true }), I("image", { s: 18, c: "text/muted" }), I("martini", { s: 18, c: "text/muted" }), btn("发布", { size: "sm", kind: "primary" })),
        post("K", "riso/blue", "雾岛 Kirishima", "12 分钟前 · 京都", "#旅行酒单", "在京都的小酒馆，我第一次喝到真正的 Highball", "老板用了整整一分钟去凿冰，苏打水沿着吧勺缓缓倒入，气泡细得像丝绸。原来简单的两种材料也能被做到这么极致……", "whiskey-sour.png", "128", "24", true),
        post("I", "accent/olive", "Ice Lab 冰室", "1 小时前", "#冰块实验", "家里做透明球冰，失败 6 次后的经验", "定向冻结才是关键：小保温箱装水、顶部敞开，冻 18–30 小时后取出，切掉底部浑浊层——第 7 次终于成功。", null, "86", "31"),
        post("S", "riso/orange", "Sour 小姐", "昨天 23:40 · 上海", "#城市夜生活", "武康路附近 5 家值得专程去的鸡尾酒吧", "从藏在花店后面的 speakeasy，到只做 6 款酒的吧台……", "cocktail-glass-center.png", "211", "47")),
      V({ name: "Aside", w: 270, gap: 14 },
        card({ sizeH: "fill", gap: 10 }, T("本周热门话题", { s: "h3" }), ...[["#旅行酒单", "326 篇"], ["#家庭吧台", "214 篇"], ["#冰块实验", "98 篇"]].map(([t, n], i) => H({ sizeH: "fill", gap: 10, align: "center" }, T(String(i + 1), { font: "Cormorant Garamond", weight: "SemiBold", size: 22, c: i === 0 ? "accent/honey" : "text/muted" }), T(t, { s: "body", fillW: true }), T(n, { s: "caption", c: "text/muted" })))),
        card({ sizeH: "fill", gap: 10, fill: grad([[0, "#2A1D17"], [1, "#1A120F"]], 90) }, H({ gap: 8, align: "center" }, I("shield", { s: 16, c: "accent/olive" }), T("社区守则", { s: "h3" })), T("理性饮酒 · 友善交流。新注册 2 分钟后可发帖，10 分钟内最多 6 条。", { s: "small", c: "text/secondary", fillW: true }))))), o);
}

// ======================= A8 Party: dice & wheel =======================
export function party(o = {}) {
  const wl = ["喝一口", "真心话", "指定一人", "再转一次", "免罚", "讲个故事", "唱一句", "干杯"];
  const wc = ["#D9473A", "#EACEAA", "#EE7B30", "#2E4A2A", "#EEC646", "#7E1F2A", "#4AA3E6", "#D9A05B"];
  return appWindow("A8 · 酒局 Party", "party", page({ gap: 20 },
    pageHeader("Lucky Utilities", "酒局", "Party", "摇骰子 · 转转盘 · 联机牌局。结果会自动保存到本局记录。", [segmented(["骰子 & 转盘", "牌局大厅"], 0), btn("邀请好友", { icon: "users", kind: "secondary" })]),
    H({ sizeH: "fill", sizeV: "fill", gap: 20 },
      V({ name: "Dice", w: 470, sizeV: "fill", pad: 22, gap: 16, r: 18, fill: grad([[0, "#3A1014"], [1, "#160909"]], 90), stroke: ["#D9473A", 0.25], clip: true },
        H({ sizeH: "fill", justify: "between", align: "center" }, H({ gap: 8, align: "center" }, I("dice", { s: 18, c: "riso/red" }), T("摇骰子", { s: "h2" })), segmented(["2 颗", "3 颗", "5 颗"], 1, { h: 30 })),
        F({ name: "Tray", sizeH: "fill", h: 230, r: 16, fill: rgrad([[0, "#2E4A2A"], [1, "#132013"]]), stroke: ["#EACEAA", 0.15], clip: true },
          E({ x: 60, y: 30, w: 330, h: 170, stroke: ["#EACEAA", 0.12], dash: [3, 6] }),
          SVG(diceSvg(88, 4), { x: 70, y: 76, rot: -12 }), SVG(diceSvg(88, 6), { x: 180, y: 52 }), SVG(diceSvg(88, 1), { x: 288, y: 84, rot: 9 })),
        H({ sizeH: "fill", justify: "between", align: "center" }, V({ gap: 0 }, T("本次结果", { s: "small", c: "text/muted" }), H({ gap: 8, align: "base" }, T("4 · 6 · 1", { font: "Cormorant Garamond", weight: "SemiBold", size: 34, c: "text/primary" }), T("= 11", { s: "h3", c: "accent/honey" }))), btn("摇一摇", { kind: "wine", icon: "refresh", size: "lg" })),
        divider(),
        T("本局记录", { s: "smallM", c: "text/muted" }),
        H({ gap: 8, wrap: true, sizeH: "fill" }, ["5·2·3 = 10", "6·6·1 = 13", "2·4·4 = 10", "1·1·3 = 5"].map(t => chip(t, { h: 28, size: 12 })))),
      V({ name: "Wheel", sizeH: "fill", sizeV: "fill", pad: 22, gap: 16, r: 18, fill: "bg/surface", stroke: "line/subtle", clip: true },
        H({ sizeH: "fill", justify: "between", align: "center" }, H({ gap: 8, align: "center" }, I("wheel", { s: 18, c: "accent/honey" }), T("转转盘", { s: "h2" })), H({ gap: 8 }, btn("清空记录", { kind: "ghost", size: "sm" }), btn("保存转盘", { kind: "secondary", size: "sm", icon: "bookmark" }))),
        H({ sizeH: "fill", gap: 24, align: "start" },
          F({ name: "WheelArt", w: 300, h: 330 }, SVG(wheelSvg(300, wl, wc), { x: 0, y: 20, rot: 0 }),
            ...wl.map((l, i) => { const a = ((i + 0.5) / wl.length) * 2 * Math.PI - Math.PI / 2; return T(l, { font: "Noto Sans SC", weight: "Medium", size: 12, c: ["#EACEAA", "#EEC646", "#D9A05B"].includes(wc[i]) ? "#1A100C" : "#F6EBD6", x: 150 + 96 * Math.cos(a) - 24, y: 170 + 96 * Math.sin(a) - 9 }); }),
            SVG('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="34" viewBox="0 0 28 34"><path d="M14 34 2 8a13 13 0 1 1 24 0Z" fill="#F6EBD6" stroke="#110B09" stroke-width="2"/><circle cx="14" cy="11" r="4" fill="#D9473A"/></svg>', { x: 136, y: 0 })),
          V({ name: "Options", sizeH: "fill", gap: 8 },
            T("转盘选项 · 8", { s: "smallM", c: "text/muted" }),
            wl.slice(0, 6).map((l, i) => H({ sizeH: "fill", h: 32, pad: [0, 10], gap: 10, r: 8, align: "center", fill: "bg/raised" }, E({ w: 10, h: 10, fill: wc[i] }), T(l, { s: "body", fillW: true }), I("x", { s: 14, c: "text/muted" }))),
            H({ gap: 6, align: "center" }, I("plus", { s: 14, c: "accent/honey" }), T("添加选项", { s: "smallM", c: "accent/honey" })))),
        H({ gap: 10, align: "center" }, btn("开始旋转", { kind: "honey", icon: "refresh", size: "lg" }), T("上次结果：", { s: "small", c: "text/muted" }), tag("讲个故事", "accent/honey"))))), o);
}

// ======================= A9 Card lounge =======================
export function cardLounge(o = {}) {
  const C = (f) => "cards/" + f + ".png";
  const room = (code, game, host, n, max, st) => H({ name: "Room", sizeH: "fill", h: 56, pad: [0, 16], gap: 14, r: 12, align: "center", fill: "bg/surface", stroke: "line/subtle" },
    T("#" + code, { font: "Inter", weight: "Medium", size: 13, c: "accent/champagne" }), tag(game, game === "斗地主" ? "riso/red" : "riso/blue", game === "斗地主" ? ["#D9473A", 0.15] : ["#4AA3E6", 0.15]),
    T(host + " 的房间", { s: "body", fillW: true }), H({ gap: 4, align: "center" }, I("users", { s: 14, c: "text/muted" }), T(n + " / " + max, { s: "num", c: "text/secondary" })),
    st === "wait" ? btn("加入", { size: "sm", kind: "primary" }) : tag("进行中", "state/success", ["#94C27A", 0.15]));
  return appWindow("A9 · 牌局大厅 Card Lounge", "party", page({ gap: 20 },
    pageHeader("Realtime Card Lounge", "牌局大厅", "斗地主 · 扎金花", null, [segmented(["骰子 & 转盘", "牌局大厅"], 1), btn("创建房间", { icon: "plus", kind: "honey" })]),
    H({ sizeH: "fill", gap: 16 },
      ...[["斗地主", "Dou Dizhu", "3 人 · 抢地主 · 炸弹翻倍", ["joker_red", "KH", "QS"], "#5A1620"], ["扎金花", "Zha Jin Hua", "2–6 人 · 比牌 · 跟注", ["AS", "KD", "QC"], "#1C2C3E"]].map(([zh, en, rule, cs, bg]) =>
        F({ name: "Game/" + zh, h: 196, sizeH: "fill", r: 18, clip: true, fill: grad([[0, bg], [1, "#110B09"]], 0), stroke: "line/subtle" },
          V({ x: 24, y: 24, gap: 4 }, T(zh, { s: "h1" }), T(en, { font: "Cormorant Garamond", weight: "Medium Italic", size: 20, c: "text/muted" }), F({ w: 2, h: 8 }), T(rule, { s: "small", c: "text/secondary" }), F({ w: 2, h: 10 }), H({ gap: 8 }, btn("快速匹配", { size: "sm", kind: "primary" }), btn("与机器人练习", { size: "sm", kind: "secondary" }))),
          ...cs.map((c, i) => IMG(C(c), { x: 330 + i * 52, y: 26 + Math.abs(i - 1) * 10, w: 92, h: 130, r: 8, rot: (i - 1) * -10, fx: "e2" }))))),
    H({ sizeH: "fill", sizeV: "fill", gap: 20 },
      V({ name: "Rooms", sizeH: "fill", gap: 10 }, H({ sizeH: "fill", justify: "between", align: "center" }, T("可加入房间", { s: "h3" }), H({ gap: 6, align: "center" }, input("输入房间号", { w: 160, h: 32, icon: "search" }), iconBtn("refresh", { s: 32, stroke: "line/strong" }))),
        room("4821", "斗地主", "米拉", 2, 3, "wait"), room("1307", "扎金花", "雾岛", 4, 6, "wait"), room("9054", "斗地主", "老周", 3, 3, "play"), room("2210", "扎金花", "Sour 小姐", 1, 6, "wait"), room("7788", "斗地主", "新手练习场", 1, 3, "wait")),
      V({ name: "RoomChat", w: 340, sizeV: "fill", pad: 16, gap: 10, r: 16, fill: "bg/surface", stroke: "line/subtle" },
        H({ sizeH: "fill", justify: "between", align: "center" }, T("房间聊天 #4821", { s: "h3" }), H({ gap: -6 }, avatar(24, "M", "accent/wine", true), avatar(24, "A", "riso/orange", true), avatar(24, "机", "bg/raised", true))),
        ...[["A", "riso/orange", "阿橙", "这把我抢地主！"], ["M", "accent/wine", "米拉", "等等，我还差一个人，拉个机器人？"]].map(([a, c, n, t]) => H({ sizeH: "fill", gap: 8, align: "start" }, avatar(24, a, c), V({ gap: 2, sizeH: "fill" }, T(n, { s: "caption", c: "text/muted" }), H({ pad: [6, 10], r: 10, fill: "bg/raised" }, T(t, { s: "small" }))))),
        F({ w: 2, h: 2, sizeV: "fill" }),
        H({ sizeH: "fill", gap: 8, align: "center" }, input("发送消息…", { h: 36 }), iconBtn("send", { s: 36, fill: "accent/champagne", c: "text/inverse" }))))), o);
}

// ======================= A10 Favorites =======================
export function favorites(o = {}) {
  return appWindow("A10 · 收藏 Favorites", "favorites", page({ gap: 20 },
    pageHeader("Saved", "收藏", "Favorites", "把喜欢的酒款整理成合集——周末派对、低度微醺，或者只属于你的冬日清单。", [btn("新建合集", { icon: "plus", kind: "secondary" })]),
    H({ gap: 8 }, chip("全部", { on: true, count: 24 }), chip("周末派对", { count: 8, dot: "riso/orange" }), chip("低度微醺", { count: 6, dot: "accent/olive" }), chip("冬日热饮", { count: 4, dot: "riso/red" }), chip("想试试", { count: 6, dot: "riso/blue" })),
    H({ sizeH: "fill", gap: 18 }, [D.negroni, D.whiskeySour, D.blackRussian, D.margarita, D.virginColada].map(d => drinkCard(d, { w: 207, ih: 230, heart: "on" }))),
    section("我的合集", null, H({ sizeH: "fill", gap: 16 }, [["周末派对", 8, [D.margarita, D.mojito, D.pinaColada], "riso/orange"], ["低度微醺", 6, [D.mojito, D.virginColada, D.cosmopolitan], "accent/olive"], ["冬日热饮", 4, [D.whiskeySour, D.negroni, D.blackRussian], "riso/red"], ["想试试", 6, [D.cosmopolitan, D.blackRussian, D.margarita], "riso/blue"]].map(([n, c, ds, col]) =>
      H({ name: "Collection", sizeH: "fill", pad: 12, gap: 12, r: 14, align: "center", fill: "bg/surface", stroke: "line/subtle" },
        F({ w: 84, h: 64 }, art(ds[2], 44, 56, { r: 8, grain: false, x: 40, y: 4 }), art(ds[1], 44, 58, { r: 8, grain: false, x: 20, y: 3 }), art(ds[0], 44, 64, { r: 8, grain: false, x: 0, y: 0 })),
        V({ gap: 2, sizeH: "fill" }, H({ gap: 6, align: "center" }, E({ w: 8, h: 8, fill: col }), T(n, { s: "bodyM" })), T(c + " 款酒", { s: "caption", c: "text/muted" })), I("right", { s: 16, c: "text/muted" })))))), o);
}

// ======================= A11 Profile =======================
export function profile(o = {}) {
  const stat = (n, l) => V({ gap: 0, align: "center" }, T(n, { font: "Cormorant Garamond", weight: "SemiBold", size: 28, c: "text/primary" }), T(l, { s: "caption", c: "text/muted" }));
  const badgeA = (ic, l, c, on) => V({ gap: 6, align: "center", w: 70 }, H({ w: 52, h: 52, r: 26, align: "center", justify: "center", fill: on ? [c, 0.18] : "bg/raised", stroke: on ? c : "line/subtle", sw: 1.5 }, I(ic, { s: 22, c: on ? c : "text/muted" })), T(l, { s: "caption", c: on ? "text/secondary" : "text/muted", align: "center" }));
  return appWindow("A11 · 个人主页 Profile", "profile", V({ name: "Content", sizeH: "fill", sizeV: "fill", clip: true },
    F({ name: "Cover", sizeH: "fill", h: 170, clip: true, fill: "#2A0E12" },
      IMG("account-top-right.png", { x: 0, y: -380, w: 1196, h: 1196, opacity: 0.55 }),
      R({ x: 0, y: 0, w: 1196, h: 170, fill: grad([[0, "#110B09", 0], [1, "#110B09", 0.95]], 90) })),
    V({ name: "Body", sizeH: "fill", sizeV: "fill", pad: [0, 32, 24, 32], gap: 20 },
      H({ sizeH: "fill", gap: 20, align: "end" },
        H({ name: "AvatarXL", w: 112, h: 112, r: 56, align: "center", justify: "center", fill: "accent/wine", stroke: "bg/canvas", sw: 5, sa: "OUTSIDE" }, T("M", { font: "Cormorant Garamond", weight: "SemiBold", size: 56, c: "#F6EBD6" })),
        V({ gap: 4, sizeH: "fill" }, H({ gap: 10, align: "center" }, T("米拉 Mira", { s: "h1" }), tag("Lv.4 熟练调酒师", "accent/honey")), T("夜猫子 · 偏爱苦甜草本 · 家里有 14 瓶酒的业余调酒师", { s: "body", c: "text/secondary" })),
        H({ gap: 28, align: "center" }, stat("6", "发布酒款"), stat("24", "收藏"), stat("182", "获赞")),
        V({ gap: 4, align: "end" }, btn("编辑资料", { kind: "secondary", icon: "edit" }), T("头像与昵称 5 天后可再次修改", { s: "caption", c: "text/muted" }))),
      H({ sizeH: "fill", sizeV: "fill", gap: 20 },
        V({ sizeH: "fill", gap: 14 }, segmented(["我的酒款 6", "我的帖子 4", "收藏 24"], 0),
          H({ gap: 16 }, [D.mojito, D.cosmopolitan, D.pinaColada, D.blackRussian].map(d => drinkCard(d, { w: 168, ih: 150, tags: false })))),
        V({ w: 320, gap: 14 },
          card({ sizeH: "fill", gap: 6 }, H({ sizeH: "fill", justify: "between" }, T("我的风味雷达", { s: "h3" }), T("基于 38 次调制", { s: "caption", c: "text/muted" })),
            F({ w: 284, h: 170 }, SVG(radarSvg(150, [0.9, 0.5, 0.75, 0.35, 0.6, 0.4]), { x: 67, y: 10 }),
              ...[["苦韵", 142, 0], ["酸爽", 222, 40], ["草本", 222, 122], ["甜润", 140, 160], ["果香", 40, 122], ["烟熏", 40, 40]].map(([t, x, y]) => T(t, { s: "caption", c: "text/secondary", x, y })))),
          card({ sizeH: "fill", gap: 12 }, H({ sizeH: "fill", justify: "between" }, T("成就徽章", { s: "h3" }), T("5 / 12", { s: "num", c: "accent/honey" })),
            H({ sizeH: "fill", justify: "between" }, badgeA("martini", "第一杯", "#D9A05B", true), badgeA("snow", "冰块大师", "#4AA3E6", true), badgeA("message", "故事家", "#94AE6E", true), badgeA("crown", "地主之王", "#D9473A", false))))))), o);
}

// ======================= A12 Turntable =======================
export function turntable(o = {}) {
  const tracks = [["Midnight in Havana", "Luceria Lounge", "4:26"], ["Velvet Smoke", "The Speakeasy Trio", "3:58"], ["Negroni Hour", "Alma Quartet", "5:12"], ["Rain on Bourbon Street", "Nola Brass", "4:03"], ["Last Call Waltz", "Paper Moon", "3:31"], ["Gin Garden", "Botanica", "4:47"], ["我的上传 · late-night.mp3", "本地文件", "6:20"]];
  return appWindow("A12 · 唱片机 Vinyl Player", "discover", page({ gap: 20 },
    pageHeader("Vinyl Player", "唱片机", "Now Playing", "边调酒边听。内置 10 首氛围曲，也可以上传你自己的 MP3 / OGG。", [btn("上传音频", { icon: "upload", kind: "secondary" })]),
    H({ sizeH: "fill", sizeV: "fill", gap: 24 },
      F({ name: "Deck", w: 560, sizeV: "fill", r: 20, clip: true, fill: grad([[0, "#1E1512"], [1, "#0B0706"]], 90), stroke: "line/subtle" },
        R({ x: 40, y: 60, w: 480, h: 480, fill: rgrad([[0, "#D9A05B", 0.22], [1, "#D9A05B", 0]]) }),
        E({ x: 90, y: 110, w: 380, h: 380, fill: "#0A0706", stroke: ["#EACEAA", 0.2], fx: "e2" }),
        ...[350, 320, 290, 262, 236, 210].map((d, i) => E({ x: 280 - d / 2, y: 300 - d / 2, w: d, h: d, stroke: ["#EACEAA", 0.05 + (i % 2) * 0.04] })),
        E({ x: 120, y: 140, w: 320, h: 320, fill: { type: "GRADIENT_ANGULAR", gradientTransform: [[1, 0, 0], [0, 1, 0]], gradientStops: [{ position: 0, color: { r: 1, g: 1, b: 1, a: 0 } }, { position: 0.12, color: { r: 1, g: 1, b: 1, a: 0.10 } }, { position: 0.25, color: { r: 1, g: 1, b: 1, a: 0 } }, { position: 0.62, color: { r: 1, g: 1, b: 1, a: 0.08 } }, { position: 0.75, color: { r: 1, g: 1, b: 1, a: 0 } }] }, opacity: 1 }),
        E({ x: 220, y: 240, w: 120, h: 120, fill: grad([[0, "#E2B06A"], [1, "#B5682A"]], 45) }),
        V({ x: 220, y: 262, w: 120, gap: 18, align: "center" }, T("LUCERIA", { font: "Cormorant Garamond", weight: "SemiBold", size: 16, ls: 18, c: "#2A1408" }), T("SIDE A", { font: "Inter", weight: "Medium", size: 8, ls: 30, c: "#2A1408" })),
        E({ x: 276, y: 296, w: 8, h: 8, fill: "#0A0706" }),
        R({ name: "tonearm", x: 470, y: 120, w: 8, h: 250, r: 4, fill: grad([[0, "#CDB898"], [1, "#8C7762"]], 0), rot: 22 }),
        E({ x: 452, y: 96, w: 44, h: 44, fill: "#2A1D17", stroke: "accent/champagne", sw: 2 }),
        H({ x: 150, y: 540, gap: 14, align: "center" }, T("1:42", { s: "caption", c: "text/muted" }), progress(0.38, 200, { h: 3 }), T("4:26", { s: "caption", c: "text/muted" })),
        V({ x: 28, y: 24, gap: 2 }, eyebrow("Side A · 33⅓ RPM"), T("Midnight in Havana", { s: "d3" }), T("Luceria Lounge · 爵士夜", { s: "small", c: "text/muted" }))),
      V({ name: "Queue", sizeH: "fill", sizeV: "fill", gap: 6 },
        H({ sizeH: "fill", justify: "between", align: "center" }, T("播放队列", { s: "h3" }), H({ gap: 6 }, chip("氛围", { on: true, h: 28 }), chip("爵士", { h: 28 }), chip("拉丁", { h: 28 }))),
        F({ h: 4, w: 2 }),
        tracks.map(([t, a, d], i) => H({ name: "Track", sizeH: "fill", h: 48, pad: [0, 12], gap: 14, r: 10, align: "center", fill: i === 0 ? "accent/honey-soft" : undefined },
          i === 0 ? I("volume", { s: 16, c: "accent/honey" }) : T(String(i + 1).padStart(2, "0"), { s: "num", c: "text/muted" }),
          V({ gap: 0, sizeH: "fill" }, T(t, { s: "bodyM", c: i === 0 ? "accent/honey" : "text/primary" }), T(a, { s: "caption", c: "text/muted" })),
          T(d, { s: "num", c: "text/muted" }), I(i === 6 ? "trash" : "more", { s: 16, c: "text/muted" }))),
        F({ h: 6, w: 2 }),
        H({ name: "Dropzone", sizeH: "fill", h: 64, r: 12, gap: 10, align: "center", justify: "center", stroke: "line/strong", dash: [6, 5] }, I("upload", { s: 18, c: "text/muted" }), T("拖拽 MP3 / OGG 到这里，或", { s: "small", c: "text/muted" }), T("浏览文件", { s: "smallM", c: "accent/honey" }))))), o);
}





