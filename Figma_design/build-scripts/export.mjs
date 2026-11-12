import fs from "node:fs";
import path from "node:path";
import { open, close, call, state } from "./engine.mjs";
const OUT = "F:/SWU/WorkSpace/Cocktail_app/Luceria_cocktail/Figma_design/exports";
const names = {
  "screens-docs:cover": "00_cover/00_封面_Cover", "screens-docs:foundations": "01_foundations/01_设计规范_Foundations",
  "screens-onb:splash": "03_onboarding/O1_启动页_Splash", "screens-onb:ageGate": "03_onboarding/O2_年龄确认_AgeGate", "screens-onb:welcome1": "03_onboarding/O3_欢迎1_酒单", "screens-onb:welcome2": "03_onboarding/O4_欢迎2_吧台", "screens-onb:welcome3": "03_onboarding/O5_欢迎3_社交", "screens-onb:taste": "03_onboarding/O6_口味偏好_Taste", "screens-onb:barSetup": "03_onboarding/O7_我的吧台_BarSetup", "screens-onb:account": "03_onboarding/O8_创建账号_Account", "screens-onb:tour": "03_onboarding/O9_功能导览_Tour",
  "screens-app:discover": "04_app/A01_发现_Discover", "screens-app:library": "04_app/A02_酒单库_Library", "screens-app:mixMode": "04_app/A03_调制模式_MixMode", "screens-app:myBar": "04_app/A04_我的吧台_MyBar", "screens-app:createCocktail": "04_app/A05_新建酒款_Create", "screens-app:tools": "04_app/A06_器具与冰_Tools", "screens-app:stories": "04_app/A07_酒话论坛_Stories", "screens-app:party": "04_app/A08_酒局_Party", "screens-app:cardLounge": "04_app/A09_牌局大厅_CardLounge", "screens-app:favorites": "04_app/A10_收藏_Favorites", "screens-app:profile": "04_app/A11_个人主页_Profile", "screens-app:turntable": "04_app/A12_唱片机_Vinyl",
  "screens-sys:settings": "05_system/S1_设置_Settings", "screens-sys:commandPalette": "05_system/S2_全局搜索_CommandPalette", "screens-sys:notifications": "05_system/S3_通知中心_Notifications", "screens-sys:loginModal": "05_system/S4_登录弹窗_Login", "screens-sys:statesBoard": "05_system/S5_空状态与反馈_States", "screens-sys:offline": "05_system/S6_离线_Offline", "screens-sys:about": "05_system/S7_关于与更新_About", "screens-sys:parchment": "05_system/S8_羊皮纸主题_Parchment",
};
await open();
const tmp = OUT + "/_tmp";
for (const [k, n] of Object.entries(names)) {
  const r = await call("save_screenshots", { nodeIds: [state.screens[k]], outDir: tmp, format: "PNG", scale: 1 });
  const src = r.saved[0].path; const dst = path.join(OUT, n + ".png");
  fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.renameSync(src, dst); console.log("saved", n);
}
await call("navigate_to_page", { pageId: state.pages["02 组件库 Components"] });
try { const r = await call("export_pdf", { outPath: OUT + "/02_components/02_组件库_Components.pdf" }); console.log("pdf", JSON.stringify(r).slice(0, 200)); } catch (e) { console.log("pdf failed", e.message.slice(0, 200)); }
fs.rmSync(tmp, { recursive: true, force: true });
await close();
