// Creates pages, color variables (Night / Parchment), text styles, effect styles.
import fs from "node:fs";
import { connect } from "./mcp.mjs";
import { COLORS, TEXT_STYLES, EFFECTS, hex } from "./tokens.mjs";

const { call, close } = await connect();
const state = fs.existsSync("state.json") ? JSON.parse(fs.readFileSync("state.json", "utf8")) : {};

// Pages
const PAGES = ["00 封面 Cover", "01 设计规范 Foundations", "02 组件库 Components", "03 新用户引导 Onboarding", "04 主应用 App Screens", "05 系统与状态 System & States"];
if (!state.pages) {
  state.pages = {};
  const meta = await call("get_metadata");
  const first = meta.pages[0].id;
  await call("rename_page", { pageId: first, name: PAGES[0] });
  state.pages[PAGES[0]] = first;
  for (const p of PAGES.slice(1)) {
    const r = await call("add_page", { name: p });
    state.pages[p] = r.nodeId;
  }
  fs.writeFileSync("state.json", JSON.stringify(state, null, 1));
}

// Variables
if (!state.vars) {
  const col = await call("create_variable_collection", { name: "Luceria Color" });
  state.collectionId = col.collectionId;
  state.modes = { night: col.defaultModeId };
  try { await call("rename_variable_mode", {}); } catch {}
  try {
    const m = await call("add_variable_mode", { collectionId: col.collectionId, name: "Parchment 羊皮纸" });
    state.modes.parchment = m.modeId;
  } catch (e) { console.log("no second mode:", e.message.slice(0, 200)); }
  state.vars = {};
  for (const [name, night, light] of COLORS) {
    const v = await call("create_variable", { name, collectionId: col.collectionId, resolvedType: "COLOR" });
    state.vars[name] = v.variableId;
    const toVal = (x) => { const [h, a] = Array.isArray(x) ? x : [x, 1]; const c = hex(h, a); return { ...c, space: "SRGB" }; };
    const ops = [{ tool: "set_variable_value", params: { variableId: v.variableId, modeId: state.modes.night, value: toVal(night) } }];
    if (state.modes.parchment) ops.push({ tool: "set_variable_value", params: { variableId: v.variableId, modeId: state.modes.parchment, value: toVal(light) } });
    await call("batch", { ops });
  }
  fs.writeFileSync("state.json", JSON.stringify(state, null, 1));
}

// Text styles
if (!state.textStyles) {
  state.textStyles = {};
  for (const [key, [name, family, style, size, lh, ls]] of Object.entries(TEXT_STYLES)) {
    const r = await call("create_text_style", {
      name, fontName: { family, style }, fontSize: size,
      lineHeight: lh ? { unit: "PIXELS", value: lh } : { unit: "AUTO" },
      letterSpacing: { unit: "PERCENT", value: ls },
    });
    state.textStyles[key] = r.styleId;
  }
  fs.writeFileSync("state.json", JSON.stringify(state, null, 1));
}

// Effect styles
if (!state.effectStyles) {
  state.effectStyles = {};
  for (const [key, [name, effects]] of Object.entries(EFFECTS)) {
    const r = await call("create_effect_style", { name, effects: effects.map(e => ({ ...e, color: { ...e.color, space: "SRGB" } })) });
    state.effectStyles[key] = r.styleId;
  }
  fs.writeFileSync("state.json", JSON.stringify(state, null, 1));
}
if (!state.varsLight) {
  const col2 = await call("create_variable_collection", { name: "Luceria Color · Parchment" });
  state.collectionLight = col2.collectionId; state.varsLight = {};
  for (const [name, , light] of COLORS) {
    const v = await call("create_variable", { name, collectionId: col2.collectionId, resolvedType: "COLOR" });
    state.varsLight[name] = v.variableId;
    const [h, a] = Array.isArray(light) ? light : [light, 1];
    await call("set_variable_value", { variableId: v.variableId, modeId: col2.defaultModeId, value: { ...hex(h, a), space: "SRGB" } });
  }
  fs.writeFileSync("state.json", JSON.stringify(state, null, 1));
}
console.log(JSON.stringify(state, null, 1).slice(0, 1500));
await close();

