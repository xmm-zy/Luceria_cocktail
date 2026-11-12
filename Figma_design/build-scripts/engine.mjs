// Tiny declarative renderer: descriptor tree -> figwright MCP calls (batched per sibling level).
import fs from "node:fs";
import { connect } from "./mcp.mjs";
import { COLORS, hex, FONTS, TEXT_STYLES } from "./tokens.mjs";
import { ICONS } from "./icons.mjs";

export const state = JSON.parse(fs.readFileSync(new URL("./state.json", import.meta.url), "utf8"));
export const saveState = () => fs.writeFileSync(new URL("./state.json", import.meta.url), JSON.stringify(state, null, 1));
export const ASSET = (n) => "F:/SWU/WorkSpace/Cocktail_app/drink-app-src/public/assets/" + n;
let NIGHT = Object.fromEntries(COLORS.map(([n, v]) => [n, Array.isArray(v) ? v : [v, 1]]));
let VARS = state.vars;
export function useTheme(name) {
  const idx = name === "parchment" ? 2 : 1;
  NIGHT = Object.fromEntries(COLORS.map((row) => [row[0], Array.isArray(row[idx]) ? row[idx] : [row[idx], 1]]));
  VARS = name === "parchment" ? state.varsLight : state.vars;
}

let api;
export async function open() { api = await connect(); return api; }
export async function close() { await api.close(); }
export const call = (...a) => api.call(...a);

// ---------- descriptors ----------
export const F = (p = {}, ...kids) => ({ t: "frame", ...p, kids: kids.flat(Infinity).filter(Boolean) });
export const H = (p = {}, ...kids) => F({ dir: "H", ...p }, ...kids);
export const V = (p = {}, ...kids) => F({ dir: "V", ...p }, ...kids);
export const T = (text, p = {}) => ({ t: "text", text: String(text), ...p });
export const R = (p = {}) => ({ t: "rect", ...p });
export const E = (p = {}) => ({ t: "ellipse", ...p });
export const L = (p = {}) => ({ t: "line", ...p });
export const I = (n, p = {}) => ({ t: "icon", n, ...p });
export const IMG = (file, p = {}) => ({ t: "rect", img: ASSET(file), ...p });
export const INST = (comp, p = {}) => ({ t: "inst", comp, ...p });
export const SVG = (svg, p = {}) => ({ t: "svg", svg, ...p });
export const SP = (n = 0, p = {}) => F({ name: "spacer", w: p.w || 1, h: p.h || 1, sizeH: p.sizeH, sizeV: p.sizeV, ...p }); // flexible spacer
export const GROW = () => F({ name: "flex", h: 1, w: 1, sizeH: "FILL" });
export const GROWV = () => F({ name: "flex", h: 1, w: 1, sizeV: "FILL" });

// ---------- paint helpers ----------
export function tokenHex(tok) {
  const [h, a] = NIGHT[tok];
  return { h, a };
}
function paint(x) {
  if (!x) return undefined;
  if (Array.isArray(x) && typeof x[0] !== "string") return x.map(paint1);
  return [paint1(x)];
}
function paint1(x) {
  if (typeof x === "string") {
    if (x.startsWith("#")) { const c = hex(x); return { type: "SOLID", color: { r: c.r, g: c.g, b: c.b, space: "SRGB" } }; }
    if (!NIGHT[x]) throw new Error("unknown token " + x);
    const [h, a] = NIGHT[x];
    const c = hex(h);
    return { type: "SOLID", color: { r: c.r, g: c.g, b: c.b, space: "SRGB" }, opacity: a, boundVariables: { color: VARS[x] } };
  }
  if (Array.isArray(x)) { // [hex, alpha]
    const c = hex(x[0]); return { type: "SOLID", color: { r: c.r, g: c.g, b: c.b, space: "SRGB" }, opacity: x[1] };
  }
  return x; // raw paint (gradient)
}
// linear gradient helper: angle 90 = top->bottom
export function grad(stops, angle = 90) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  // gradientTransform maps unit square; rotate about center
  const m = [[cos, sin, 0.5 - 0.5 * cos - 0.5 * sin], [-sin, cos, 0.5 + 0.5 * sin - 0.5 * cos]];
  return {
    type: "GRADIENT_LINEAR", gradientTransform: m,
    gradientStops: stops.map(([pos, h, a = 1]) => { const c = hex(NIGHT[h] ? NIGHT[h][0] : h); return { position: pos, color: { r: c.r, g: c.g, b: c.b, a: NIGHT[h] ? NIGHT[h][1] * a : a, space: "SRGB" } }; }),
  };
}
export function rgrad(stops) {
  return {
    type: "GRADIENT_RADIAL", gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: stops.map(([pos, h, a = 1]) => { const c = hex(NIGHT[h] ? NIGHT[h][0] : h); return { position: pos, color: { r: c.r, g: c.g, b: c.b, a, space: "SRGB" } }; }),
  };
}

const pad = (p) => {
  if (p === undefined) return {};
  if (typeof p === "number") p = [p, p, p, p];
  else if (p.length === 2) p = [p[0], p[1], p[0], p[1]];
  return { paddingTop: p[0], paddingRight: p[1], paddingBottom: p[2], paddingLeft: p[3] };
};
const AX = { start: "MIN", center: "CENTER", end: "MAX", between: "SPACE_BETWEEN", base: "BASELINE" };
const SZ = (s) => (s ? s.toUpperCase() : undefined);

function textFont(d) {
  const st = d.s ? TEXT_STYLES[d.s] : null;
  const family = d.font || (st ? st[1] : FONTS.sansSC);
  const style = d.weight || (st ? st[2] : "Regular");
  const size = d.size || (st ? st[3] : 14);
  const lh = d.lh !== undefined ? d.lh : st ? st[4] : null;
  const ls = d.ls !== undefined ? d.ls : st ? st[5] : 0;
  const pure = st && !d.font && !d.weight && !d.size && d.lh === undefined && d.ls === undefined;
  return { family, style, size, lh, ls, pure };
}

function createOp(d, parentId, parentAL) {
  const common = {};
  if (d.name) common.name = d.name;
  if (parentId) common.parentId = parentId;
  if (!parentAL || d.abs) { if (d.x !== undefined) common.x = d.x; if (d.y !== undefined) common.y = d.y; }
  const fixSz = (s) => (s === "FILL" && !parentAL ? "FIXED" : s);
  switch (d.t) {
    case "frame": {
      const p = { ...common };
      if (d.w) p.width = d.w;
      if (d.h) p.height = d.h;
      if (d.w && !d.h) p.height = 10;
      if (d.h && !d.w) p.width = 10;
      p.fills = d.fill ? paint(d.fill) : [];
      if (d.stroke) { p.strokes = paint(d.stroke); p.strokeWeight = d.sw || 1; p.strokeAlign = d.sa || "INSIDE"; }
      if (d.r !== undefined && typeof d.r === "number") p.cornerRadius = d.r;
      if (d.clip !== undefined) p.clipsContent = d.clip; else p.clipsContent = false;
      if (d.dir) {
        const al = { layoutMode: d.dir === "H" ? "HORIZONTAL" : d.dir === "V" ? "VERTICAL" : "GRID", itemSpacing: d.gap || 0, ...pad(d.pad) };
        if (d.align) al.counterAxisAlignItems = AX[d.align];
        if (d.justify) al.primaryAxisAlignItems = AX[d.justify];
        if (d.wrap) { al.layoutWrap = "WRAP"; al.counterAxisSpacing = d.wrapGap ?? d.gap ?? 0; }
        if (d.dir === "GRID") { al.gridColumnCount = d.cols; al.gridColumnGap = d.gap || 0; al.gridRowGap = d.rowGap ?? d.gap ?? 0; al.gridItemsPositioning = "ROW_AUTO_FLOW"; al.gridAutoTracks = "ROWS"; delete al.itemSpacing; }
        p.autoLayout = al;
        p.layoutSizingHorizontal = fixSz(SZ(d.sizeH) || (d.w ? "FIXED" : "HUG"));
        p.layoutSizingVertical = fixSz(SZ(d.sizeV) || (d.h ? "FIXED" : "HUG"));
        if (d.dir === "GRID") { p.layoutSizingVertical = fixSz(SZ(d.sizeV) || "HUG"); }
      } else {
        if (d.sizeH && parentAL) p.layoutSizingHorizontal = fixSz(SZ(d.sizeH));
        if (d.sizeV && parentAL) p.layoutSizingVertical = fixSz(SZ(d.sizeV));
      }
      if (d.abs) { delete p.layoutSizingHorizontal; delete p.layoutSizingVertical; if (d.dir) { p.layoutSizingHorizontal = d.w ? "FIXED" : "HUG"; p.layoutSizingVertical = d.h ? "FIXED" : "HUG"; } }
      return { tool: "create_frame", params: p };
    }
    case "text": {
      const f = textFont(d);
      const p = { ...common, characters: d.text, fontName: { family: f.family, style: f.style }, fontSize: f.size, fills: paint(d.c || "text/primary") };
      if (f.lh) p.lineHeight = { unit: "PIXELS", value: f.lh };
      if (f.ls) p.letterSpacing = { unit: "PERCENT", value: f.ls };
      if (d.align) p.textAlignHorizontal = d.align.toUpperCase();
      if (d.upper) p.textCase = "UPPER";
      
      if (d.fillW && parentAL && !d.abs) p.layoutSizingHorizontal = "FILL";
      if (d.lines) { p.maxLines = d.lines; p.textTruncation = "ENDING"; }
      if (d.deco) p.textDecoration = d.deco;
      return { tool: "create_text", params: p };
    }
    case "rect": case "ellipse": {
      const p = { ...common, width: d.w || 10, height: d.h || 10, fills: d.fill ? paint(d.fill) : [] };
      if (d.stroke) { p.strokes = paint(d.stroke); p.strokeWeight = d.sw || 1; p.strokeAlign = d.sa || "INSIDE"; }
      if (d.t === "rect" && typeof d.r === "number") p.cornerRadius = d.r;
      if (d.sizeH && parentAL && !d.abs) p.layoutSizingHorizontal = SZ(d.sizeH);
      if (d.sizeV && parentAL && !d.abs) p.layoutSizingVertical = SZ(d.sizeV);
      return { tool: d.t === "rect" ? "create_rectangle" : "create_ellipse", params: p };
    }
    case "line": {
      const p = { ...common, shape: "LINE", width: d.w || 100, strokes: paint(d.c || "line/subtle"), strokeWeight: d.sw || 1 };
      if (d.sizeH && parentAL && !d.abs) p.layoutSizingHorizontal = SZ(d.sizeH);
      return { tool: "create_shape", params: p };
    }
    case "inst": {
      return { tool: "create_instance", params: { ...common, componentId: state.components[d.comp] } };
    }
  }
  return null;
}

function iconSvg(d) {
  const s = d.s || 18;
  const col = d.c || "text/secondary";
  const { h, a } = NIGHT[col] ? tokenHex(col) : { h: col, a: 1 };
  const body = ICONS[d.n];
  if (!body) throw new Error("no icon " + d.n);
  const fillMode = d.solid ? `fill="${h}" fill-opacity="${a}" stroke="none"` : `fill="none" stroke="${h}" stroke-opacity="${a}" stroke-width="${d.sw || 1.6}" stroke-linecap="round" stroke-linejoin="round"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" ${fillMode}>${body}</svg>`;
}

function postOps(d, id, parentAL) {
  const ops = [];
  const solo = [];
  if (d.abs && parentAL) {
    ops.push({ tool: "set_layout_props", params: { nodeId: id, layoutPositioning: "ABSOLUTE" } });
    ops.push({ tool: "set_position", params: { nodeId: id, x: d.x || 0, y: d.y || 0 } });
  }
  if (d.t === "text" && d.w) { ops.push({ tool: "resize_nodes", params: { nodeIds: [id], width: d.w, height: 20 } }); ops.push({ tool: "set_text_properties", params: { nodeId: id, textAutoResize: "HEIGHT" } }); }
  if (d.t === "text") { const f = textFont(d); if (f.pure) ops.push({ tool: "apply_style_to_node", params: { nodeId: id, field: "text", styleId: state.textStyles[d.s] } }); }
  if (d.fx) {
    if (typeof d.fx === "string") ops.push({ tool: "apply_style_to_node", params: { nodeId: id, field: "effect", styleId: state.effectStyles[d.fx] } });
    else ops.push({ tool: "set_effects", params: { nodeId: id, effects: d.fx.map(e => ({ visible: true, blendMode: "NORMAL", ...e })) } });
  }
  if (Array.isArray(d.r)) ops.push({ tool: "set_corner_radius", params: { nodeId: id, topLeftRadius: d.r[0], topRightRadius: d.r[1], bottomRightRadius: d.r[2], bottomLeftRadius: d.r[3] } });
  if (d.dash && d.stroke) ops.push({ tool: "set_strokes", params: { nodeId: id, strokes: paint(d.stroke), strokeWeight: d.sw || 1, strokeAlign: d.sa || "INSIDE", dashPattern: d.dash } });
  if (d.opacity !== undefined) ops.push({ tool: "set_opacity", params: { nodeId: id, opacity: d.opacity } });
  if (d.rot) ops.push({ tool: "rotate_nodes", params: { nodeIds: [id], rotation: d.rot } });
  if (d.ranges) ops.push({ tool: "set_text_range", params: { nodeId: id, ranges: d.ranges.map(rg => ({ ...rg, ...(rg.c ? { fills: paint(rg.c) } : {}), c: undefined })) } });
  if (d.blend) ops.push({ tool: "set_blend_mode", params: { nodeId: id, blendMode: d.blend } });
  if (d.img) solo.push({ tool: "set_image_fill", params: { nodeId: id, path: d.img, scaleMode: d.fit || "FILL" } });
  return { ops, solo };
}

let created = 0;
async function batch(ops) {
  if (!ops.length) return [];
  const out = [];
  for (let i = 0; i < ops.length; i += 60) {
    const r = await call("batch", { ops: ops.slice(i, i + 60) });
    if (!r.results) throw new Error("batch: " + JSON.stringify(r).slice(0, 500));
    out.push(...r.results);
  }
  return out;
}

// render children of one parent; returns ids
async function renderKids(kids, parentId, parentAL) {
  const ids = new Array(kids.length);
  const creates = [], idx = [];
  for (let i = 0; i < kids.length; i++) {
    const d = kids[i];
    if (d.t === "icon" || d.t === "svg") continue;
    creates.push(createOp(d, parentId, parentAL)); idx.push(i);
  }
  // icons / svgs keep their order: create sequentially in order, interleaving would break z-order,
  // so we create all in document order using individual calls when svg present.
  const hasSvg = kids.some(d => d.t === "icon" || d.t === "svg");
  if (!hasSvg) {
    const res = await batch(creates);
    res.forEach((r, j) => { ids[idx[j]] = r.nodeId || (r.result && r.result.nodeId); });
  } else {
    for (let i = 0; i < kids.length; i++) {
      const d = kids[i];
      if (d.t === "icon" || d.t === "svg") {
        const svg = d.t === "icon" ? iconSvg(d) : d.svg;
        const p = { svg, parentId, name: d.name || (d.t === "icon" ? "icon/" + d.n : "vector") };
        if (d.w) p.width = d.w; if (d.h) p.height = d.h;
        if (!parentAL || d.abs) { if (d.x !== undefined) p.x = d.x; if (d.y !== undefined) p.y = d.y; }
        const r = await call("import_svg", p);
        ids[i] = r.nodeId;
      } else {
        const r = await batch([createOp(d, parentId, parentAL)]);
        ids[i] = r[0].nodeId || (r[0].result && r[0].result.nodeId);
      }
    }
  }
  created += kids.length;
  const post = [], solos = [];
  kids.forEach((d, i) => { const { ops, solo } = postOps(d, ids[i], parentAL); post.push(...ops); solos.push(...solo); });
  await batch(post);
  for (const s of solos) await call(s.tool, s.params);
  for (let i = 0; i < kids.length; i++) {
    const d = kids[i];
    if (d.t === "frame" && d.kids && d.kids.length) await renderKids(d.kids, ids[i], !!d.dir);
    if (d.ref) refs[d.ref] = ids[i];
  }
  return ids;
}
export const refs = {};

export async function render(desc, parentId) {
  const t0 = Date.now(); created = 0;
  const [id] = await renderKids([desc], parentId, false);
  console.log(`rendered ${desc.name} (${created} nodes) in ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${id}`);
  return id;
}




