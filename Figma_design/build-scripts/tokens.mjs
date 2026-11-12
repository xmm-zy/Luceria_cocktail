// Luceria design tokens — derived from drink-app/src/styles/styles.css palette
// (champagne #eaceaa, cream #fbf2df, paper #f5e8cb, honey #d39858, garlic #85431e,
//  coffee #34150f, balsamico #150c0c, olive #1d3217, gold-foil #b98a45, ink #261b16)
// extended into a dark "Night Bar" theme + light "Parchment" theme.

export const hex = (h, a = 1) => {
  h = h.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255, a };
};

// [name, night, parchment]  (alpha via [hex, a])
export const COLORS = [
  ["bg/canvas", "#110B09", "#F2E4C6"],
  ["bg/surface", "#1A120F", "#FBF2DF"],
  ["bg/raised", "#241915", "#FFF8EA"],
  ["bg/sunken", "#0B0706", "#E9D7B2"],
  ["bg/overlay", ["#070404", 0.72], ["#2A1A12", 0.45]],
  ["line/subtle", ["#EACEAA", 0.10], ["#34150F", 0.12]],
  ["line/strong", ["#EACEAA", 0.22], ["#34150F", 0.26]],
  ["text/primary", "#F6EBD6", "#261B16"],
  ["text/secondary", "#CDB898", "#5B4636"],
  ["text/muted", "#8C7762", "#8A7360"],
  ["text/inverse", "#1A100C", "#FBF2DF"],
  ["accent/champagne", "#EACEAA", "#B98A45"],
  ["accent/honey", "#D9A05B", "#A8692C"],
  ["accent/gold", "#B98A45", "#94692E"],
  ["accent/honey-soft", ["#D9A05B", 0.14], ["#A8692C", 0.12]],
  ["accent/wine", "#A3303A", "#8C2430"],
  ["accent/wine-soft", ["#A3303A", 0.18], ["#8C2430", 0.12]],
  ["accent/olive", "#94AE6E", "#4D6A33"],
  ["accent/olive-soft", ["#94AE6E", 0.14], ["#4D6A33", 0.12]],
  ["riso/orange", "#EE7B30", "#E06A1F"],
  ["riso/blue", "#4AA3E6", "#2B84C8"],
  ["riso/yellow", "#EEC646", "#C99A12"],
  ["riso/red", "#D9473A", "#C23A2E"],
  ["state/success", "#94C27A", "#3F7A2B"],
  ["state/warning", "#E8B04A", "#B07A12"],
  ["state/danger", "#E5675A", "#B83A2E"],
];

export const FONTS = {
  display: "Cormorant Garamond",
  serifSC: "Noto Serif SC",
  sansSC: "Noto Sans SC",
  ui: "Inter",
  script: "Pinyon Script",
  deco: "Italiana",
};

// text styles: key -> [name, family, style, size, lineHeight(px|null), letterSpacing(%)]
export const TEXT_STYLES = {
  hero: ["Display/Hero", FONTS.display, "SemiBold", 88, 84, -1],
  d1: ["Display/D1", FONTS.display, "SemiBold", 56, 58, -0.5],
  d2: ["Display/D2", FONTS.display, "SemiBold", 40, 44, 0],
  d3: ["Display/D3", FONTS.display, "SemiBold", 28, 32, 0],
  d4: ["Display/D4", FONTS.display, "SemiBold", 22, 26, 0],
  italic: ["Display/Italic", FONTS.display, "Medium Italic", 20, 26, 0],
  h1: ["Title/H1 中文", FONTS.serifSC, "SemiBold", 28, 38, 0],
  h2: ["Title/H2 中文", FONTS.serifSC, "SemiBold", 20, 28, 0],
  h3: ["Title/H3 中文", FONTS.serifSC, "SemiBold", 16, 24, 0],
  body: ["Body/Regular", FONTS.sansSC, "Regular", 14, 22, 0],
  bodyM: ["Body/Medium", FONTS.sansSC, "Medium", 14, 22, 0],
  bodyL: ["Body/Large", FONTS.sansSC, "Regular", 16, 26, 0],
  small: ["Body/Small", FONTS.sansSC, "Regular", 12, 18, 0],
  smallM: ["Body/Small Medium", FONTS.sansSC, "Medium", 12, 18, 0],
  eyebrow: ["Label/Eyebrow", FONTS.ui, "Medium", 11, 14, 18],
  label: ["Label/UI", FONTS.ui, "Medium", 13, 16, 0],
  caption: ["Label/Caption", FONTS.ui, "Regular", 11, 14, 2],
  num: ["Label/Numeric", FONTS.ui, "Medium", 12, 16, 0],
};

export const EFFECTS = {
  e1: ["Elevation/1 Card", [{ type: "DROP_SHADOW", visible: true, blendMode: "NORMAL", color: hex("#000000", 0.28), offset: { x: 0, y: 4 }, radius: 14, spread: 0 }]],
  e2: ["Elevation/2 Popover", [{ type: "DROP_SHADOW", visible: true, blendMode: "NORMAL", color: hex("#000000", 0.45), offset: { x: 0, y: 16 }, radius: 40, spread: -4 }]],
  e3: ["Elevation/3 Window", [{ type: "DROP_SHADOW", visible: true, blendMode: "NORMAL", color: hex("#000000", 0.55), offset: { x: 0, y: 30 }, radius: 80, spread: -10 }]],
  glow: ["Glow/Honey", [{ type: "DROP_SHADOW", visible: true, blendMode: "NORMAL", color: hex("#D9A05B", 0.35), offset: { x: 0, y: 0 }, radius: 28, spread: 0 }]],
};

