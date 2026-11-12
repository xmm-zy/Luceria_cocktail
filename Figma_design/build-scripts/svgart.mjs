// Generated vector art (wheel, radar, timer ring, dice)
export function wheelSvg(size, labels, colors) {
  const r = size / 2, cx = r, cy = r, n = labels.length;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const x0 = cx + (r - 4) * Math.cos(a0), y0 = cy + (r - 4) * Math.sin(a0), x1 = cx + (r - 4) * Math.cos(a1), y1 = cy + (r - 4) * Math.sin(a1);
    s += `<path d="M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r - 4} ${r - 4} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${colors[i % colors.length]}" stroke="#110B09" stroke-width="2"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${r - 2}" fill="none" stroke="#EACEAA" stroke-width="3"/>`;
  for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * 2 * Math.PI; s += `<circle cx="${(cx + (r - 2) * Math.cos(a)).toFixed(1)}" cy="${(cy + (r - 2) * Math.sin(a)).toFixed(1)}" r="3" fill="#F6EBD6"/>`; }
  s += `<circle cx="${cx}" cy="${cy}" r="${size * 0.09}" fill="#1A120F" stroke="#EACEAA" stroke-width="2"/>`;
  return s + "</svg>";
}
export function radarSvg(size, values, labelsCount = 6) {
  const r = size / 2 - 6, c = size / 2, n = values.length;
  const pt = (i, k) => { const a = (i / n) * 2 * Math.PI - Math.PI / 2; return [(c + r * k * Math.cos(a)).toFixed(1), (c + r * k * Math.sin(a)).toFixed(1)]; };
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  for (const k of [0.25, 0.5, 0.75, 1]) s += `<polygon points="${values.map((_, i) => pt(i, k).join(",")).join(" ")}" fill="none" stroke="#EACEAA" stroke-opacity="0.16" stroke-width="1"/>`;
  for (let i = 0; i < n; i++) s += `<line x1="${c}" y1="${c}" x2="${pt(i, 1)[0]}" y2="${pt(i, 1)[1]}" stroke="#EACEAA" stroke-opacity="0.12"/>`;
  s += `<polygon points="${values.map((v, i) => pt(i, v).join(",")).join(" ")}" fill="#D9A05B" fill-opacity="0.28" stroke="#D9A05B" stroke-width="2" stroke-linejoin="round"/>`;
  for (let i = 0; i < n; i++) { const [x, y] = pt(i, values[i]); s += `<circle cx="${x}" cy="${y}" r="3.5" fill="#EACEAA"/>`; }
  return s + "</svg>";
}
export function ringSvg(size, pct, stroke = 10, color = "#D9A05B", track = "#EACEAA") {
  const r = (size - stroke) / 2, c = size / 2, a = pct * 2 * Math.PI - Math.PI / 2;
  const x = c + r * Math.cos(a), y = c + r * Math.sin(a);
  const large = pct > 0.5 ? 1 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${track}" stroke-opacity="0.12" stroke-width="${stroke}"/><path d="M${c} ${c - r} A${r} ${r} 0 ${large} 1 ${x.toFixed(2)} ${y.toFixed(2)}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/><circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${stroke * 0.9}" fill="#F6EBD6"/></svg>`;
}
const PIPS = { 1: [[0.5, 0.5]], 2: [[0.28, 0.28], [0.72, 0.72]], 3: [[0.26, 0.26], [0.5, 0.5], [0.74, 0.74]], 4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]], 5: [[0.27, 0.27], [0.73, 0.27], [0.5, 0.5], [0.27, 0.73], [0.73, 0.73]], 6: [[0.28, 0.24], [0.72, 0.24], [0.28, 0.5], [0.72, 0.5], [0.28, 0.76], [0.72, 0.76]] };
export function diceSvg(size, n, face = "#F6EBD6", pip = "#7E1F2A") {
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="${size * 0.2}" fill="${face}" stroke="#EACEAA" stroke-width="2"/><rect x="${size * 0.08}" y="${size * 0.08}" width="${size * 0.84}" height="${size * 0.84}" rx="${size * 0.16}" fill="none" stroke="#000" stroke-opacity="0.08" stroke-width="2"/>`;
  for (const [x, y] of PIPS[n]) s += `<circle cx="${(x * size).toFixed(1)}" cy="${(y * size).toFixed(1)}" r="${size * (n === 1 ? 0.11 : 0.085)}" fill="${n === 1 ? "#D9473A" : pip}"/>`;
  return s + "</svg>";
}
export function sparkSvg(w, h, pts, color = "#D9A05B") {
  const max = Math.max(...pts), min = Math.min(...pts);
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * w, h - 4 - ((v - min) / (max - min || 1)) * (h - 8)]);
  const d = xy.map(([x, y], i) => (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)).join(" ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${d} L${w} ${h} L0 ${h} Z" fill="${color}" fill-opacity="0.15"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></svg>`;
}
export const TOOL_ICONS = {
  jigger: '<path d="M7 3h10l-3 8h-4z"/><path d="M10 13h4l3 8H7z"/><path d="M9 12h6"/>',
  spoon: '<path d="M12 2v13"/><ellipse cx="12" cy="18.5" rx="2.6" ry="3.2"/><path d="M10 5c1.3.7 2.7.7 4 0"/><path d="M10 8c1.3.7 2.7.7 4 0"/>',
  strainer: '<circle cx="10" cy="12" r="6.5"/><path d="M16.5 12H22"/><path d="M7.5 10h.01M10 9h.01M12.5 10h.01M7.5 13.5h.01M10 12.5h.01M12.5 13.5h.01M10 15.5h.01"/>',
  muddler: '<path d="M10 2h4v12h-4z"/><path d="M8.5 14h7v6a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2z"/>',
  mixglass: '<path d="M6 5h12l-1.4 15a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8z"/><path d="M6.4 9h11.2"/><path d="m13 2 4 8"/>',
  press: '<path d="M3 11h18"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 3v8"/><path d="m8 6 4 5 4-5"/>',
  fine: '<path d="M3 8h13a6.5 6.5 0 0 1-13 0z"/><path d="M16 8h5"/><path d="M6 11h7"/><path d="M8 14h3"/>',
};
