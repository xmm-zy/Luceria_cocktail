# Luceria Desktop — Figma build scripts

These scripts generate the Luceria desktop app design in Figma through the **figwright** MCP server. The server talks to the Figwright plugin running in Figma Desktop.

## Prerequisites
- Figma Desktop is open on the target file, and the Figwright plugin is running and shows **Connected**.
- `@figwright/mcp` is installed globally (`npm i -g @figwright/mcp`).
- `npm install` has been run in this folder (the only dependency is `@modelcontextprotocol/sdk`).

## Files
| File | Purpose |
| --- | --- |
| `mcp.mjs` | Spawns figwright as an MCP client (it joins as a follower of the running leader) |
| `engine.mjs` | Declarative renderer: turns a descriptor tree into batched figwright calls (auto-layout, variable bindings, text styles, effects, images, SVG icons) |
| `tokens.mjs` | Colour, type and elevation tokens (Night Bar and Parchment) |
| `setup.mjs` | Creates the pages, colour variables, text styles and effect styles. Writes the resulting IDs to `state.json` |
| `ui.mjs` | UI building blocks: buttons, chips, inputs, cards, title bar, sidebar, player bar, app window |
| `screens-*.mjs` | Screens. `docs` is the cover and Foundations, `onb` is onboarding, `app` is the main app, `sys` is system screens and states |
| `components.mjs` | Builds the Components page (real Figma components and variant sets) |
| `run.mjs` | `node run.mjs <module> <export> <pagePrefix> <x> <y> [parchment]` re-renders one screen and replaces the previous copy |

Example: `node run.mjs screens-app library 04 1600 0`
