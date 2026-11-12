// usage: node run.mjs <module> <exportName> <pageKey> <x> <y> [theme]
import { open, close, render, call, state, saveState, useTheme } from "./engine.mjs";
const [mod, fn, pageKey, x, y, theme] = process.argv.slice(2);
const m = await import("./" + mod + ".mjs");
await open();
if (theme) useTheme(theme);
const pageId = Object.entries(state.pages).find(([k]) => k.startsWith(pageKey))[1];
await call("navigate_to_page", { pageId });
state.screens = state.screens || {};
const key = mod + ":" + fn;
if (state.screens[key]) { try { await call("delete_nodes", { nodeIds: [state.screens[key]] }); } catch {} }
const desc = m[fn]({ x: +x, y: +y });
desc.x = +x; desc.y = +y;
const id = await render(desc, pageId);
state.screens[key] = id; saveState();
console.log("ID", id);
await close();
