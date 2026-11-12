import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
export async function connect() {
  const t = new StdioClientTransport({ command: process.execPath, args: [process.env.APPDATA + "\\npm\\node_modules\\@figwright\\mcp\\dist\\index.mjs"], stderr: "ignore" });
  const c = new Client({ name: "luceria-builder", version: "1.0.0" });
  await c.connect(t);
  const call = async (name, args = {}) => {
    const r = await c.callTool({ name, arguments: args }, undefined, { timeout: 600000 });
    const txt = r.content.map(x => x.text || "").join("\n");
    if (r.isError) throw new Error(name + " failed: " + txt.slice(0, 1500) + "\nARGS: " + JSON.stringify(args).slice(0, 800));
    const i = txt.indexOf("{");
    try { return JSON.parse(txt.slice(i, txt.lastIndexOf("}") + 1)); } catch { return { raw: txt }; }
  };
  return { call, close: () => c.close() };
}
