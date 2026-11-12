// Builds real Figma components + variant sets on the Components page.
import { open, close, render, call, state, saveState, F, H, V, T, R, E, I } from "./engine.mjs";
import * as U from "./ui.mjs";
import { ICONS } from "./icons.mjs";
import { TOOL_ICONS } from "./svgart.mjs";
Object.assign(ICONS, TOOL_ICONS);
const { DRINKS: D } = U;

await open();
const pageId = state.pages["02 组件库 Components"];
await call("navigate_to_page", { pageId });
if (state.componentNodes) { try { await call("delete_nodes", { nodeIds: state.componentNodes }); } catch {} }
const made = [];
state.components = {};

async function label(text, sub, x, y) {
  const id = await render(V({ name: "Label/" + text, x, y, gap: 4 }, T(text, { s: "h2" }), sub && T(sub, { s: "small", c: "text/muted" })), pageId);
  made.push(id);
}
async function comp(desc, name, x, y) {
  desc.x = x; desc.y = y;
  const id = await render(desc, pageId);
  const r = await call("create_component", { fromNodeId: id, name });
  return r.nodeId || r.componentId || id;
}
async function variants(setName, list, x, y, dir = "H", gap = 24) {
  const ids = [];
  let cx = x, cy = y;
  for (const [desc, vname, w, h] of list) {
    ids.push(await comp(desc, vname, cx, cy));
    if (dir === "H") cx += (w || 200) + gap; else cy += (h || 60) + gap;
  }
  const r = await call("combine_as_variants", { nodeIds: ids, name: setName });
  const setId = r.nodeId || r.componentSetId;
  made.push(setId);
  return { setId, ids };
}

let y = 0;
await label("组件库 Components", "所有组件均为 Figma 主组件 / 变体集合，可在其它页面直接实例化。", 0, y); y += 110;

// Buttons: Kind x Size
await label("Button 按钮", "Kind × Size · 主操作用 Primary/Honey，危险或酒局用 Wine", 0, y); y += 70;
const kinds = ["primary", "honey", "wine", "secondary", "outline", "ghost"], sizes = ["sm", "md", "lg"];
const blist = [];
for (const s of sizes) for (const k of kinds) blist.push([U.btn("调制 Mix", { kind: k, size: s, icon: "martini" }), `Kind=${k}, Size=${s}`]);
// place in grid manually
{
  const ids = [];
  for (let si = 0; si < sizes.length; si++) for (let ki = 0; ki < kinds.length; ki++) {
    const [d, n] = blist[si * kinds.length + ki];
    ids.push(await comp(d, n, ki * 170, y + si * 70));
  }
  const r = await call("combine_as_variants", { nodeIds: ids, name: "Button" });
  made.push(r.nodeId || r.componentSetId);
  y += 260;
}

// Chips / Tag / Badge
await label("Chip · Tag · Badge", "筛选标签、风味标签、计数徽标", 0, y); y += 70;
made.push((await variants("Chip", [[U.chip("经典", { count: 42 }), "State=default", 110], [U.chip("经典", { on: true, count: 42 }), "State=selected", 110], [U.chip("无酒精", { dot: "accent/olive", count: 30 }), "State=dot", 130], [U.chip("烟熏", { on: true, x: true }), "State=removable", 110]], 0, y, "H", 24)).setId);
made.push((await variants("Tag", [[U.tag("经典"), "Tone=honey", 60], [U.tag("餐前酒", "text/secondary", "bg/raised"), "Tone=neutral", 70], [U.tag("5 款", "accent/olive", "accent/olive-soft"), "Tone=olive", 60], [U.tag("小技巧", "riso/blue", ["#4AA3E6", 0.15]), "Tone=blue", 70]], 640, y, "H", 20)).setId);
made.push((await variants("Badge", [[U.badge(3), "Tone=wine", 30], [U.badge("LIVE", "accent/olive"), "Tone=olive", 40]], 1020, y, "H", 20)).setId);
y += 90;

// Inputs & selection controls
await label("Input · Toggle · Checkbox · Segmented", null, 0, y); y += 50;
made.push((await variants("Input", [[U.input("搜索酒名、材料或风味…", { icon: "search", w: 320 }), "State=default", 320], [U.input("", { icon: "mail", value: "mira@luceria.app", focus: true, w: 320 }), "State=focus", 320]], 0, y, "H", 24)).setId);
made.push((await variants("Toggle", [[U.toggle(false), "State=off", 40], [U.toggle(true), "State=on", 40]], 720, y + 10, "H", 20)).setId);
made.push((await variants("Checkbox", [[U.checkbox(false, "青柠 · 6 个"), "State=off", 110], [U.checkbox(true, "青柠 · 6 个"), "State=on", 110]], 860, y + 10, "H", 20)).setId);
made.push(await comp(U.segmented(["网格", "列表"], 1), "Segmented", 1140, y + 4));
y += 100;

// Nav item
await label("NavItem 侧边导航", null, 0, y); y += 50;
made.push((await variants("NavItem", [[V({ w: 216 }, U.navItem("book", "酒单库", "Library", false)), "State=default", 216], [V({ w: 216 }, U.navItem("book", "酒单库", "Library", true)), "State=active", 216]], 0, y, "H", 24)).setId);
y += 90;

// Avatar / progress / rating
await label("Avatar · Progress · Rating · Kbd", null, 0, y); y += 50;
made.push((await variants("Avatar", [[U.avatar(26, "M"), "Size=26", 26], [U.avatar(34, "K", "riso/blue"), "Size=34", 34], [U.avatar(56, "M", "accent/wine", true), "Size=56", 56]], 0, y, "H", 24)).setId);
made.push(await comp(U.progress(0.6, 200), "Progress", 220, y + 20));
made.push(await comp(U.stars(4.5, 14), "Rating", 460, y + 14));
made.push(await comp(U.kbd("Ctrl K"), "Kbd", 600, y + 16));
y += 110;

// Cocktail card + list row
await label("Card/Cocktail 酒款卡片", "Riso 色块插画 + 编号 + 收藏；标题 Cormorant，副标题中文", 0, y); y += 70;
made.push(await comp(U.drinkCard(D.negroni, { w: 210, ih: 240, heart: "on" }), "Card/Cocktail", 0, y));
made.push(await comp(U.drinkCard(D.margarita, { w: 210, ih: 240 }), "Card/Cocktail · Cutout", 240, y));
made.push(await comp(U.drinkCard(D.whiskeySour, { w: 210, ih: 240 }), "Card/Cocktail · Photo", 480, y));
y += 420;

// Toasts
await label("Toast 反馈提示", null, 0, y); y += 50;
const toast = (ic, c, t) => H({ w: 420, pad: [12, 14], gap: 12, r: 12, align: "center", fill: "bg/raised", stroke: [c, 0.4], fx: "e2" }, H({ w: 28, h: 28, r: 14, align: "center", justify: "center", fill: [c, 0.18] }, I(ic, { s: 15, c })), T(t, { s: "body", fillW: true }));
made.push((await variants("Toast", [[toast("check", "#94C27A", "已收藏 Negroni"), "Type=success", 420, 52], [toast("alert", "#E5675A", "评论没有发出去，草稿已保存"), "Type=error", 420, 52], [toast("clock", "#E8B04A", "头像 5 天后可再次修改"), "Type=warning", 420, 52], [toast("info", "#4AA3E6", "登录邮件已发送"), "Type=info", 420, 52]], 0, y, "V", 14)).setId);
y += 300;

// Shell
await label("App Shell 应用框架", "TitleBar · Sidebar · PlayerBar（主应用所有页面共用）", 0, y); y += 70;
const tb = await comp(U.titleBar(), "TitleBar", 0, y); made.push(tb); state.components.TitleBar = tb; y += 80;
const pb = await comp(U.playerBar(), "PlayerBar", 0, y); made.push(pb); state.components.PlayerBar = pb; y += 110;
made.push(await comp(V({ h: 780 }, U.sidebar("discover")), "Sidebar", 0, y));

state.componentNodes = made; saveState();
console.log("components done", made.length);
await close();
