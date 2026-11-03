# AGENTS.md

Guidance for AI agents. This repository teaches an agent how to **create and convert [Total.js](https://www.totaljs.com) jComponents** (UI components for the Total.js UI library, `v20`) in the new single-file format.

## Project

A jComponent is a reusable web UI component that is bound to data with `<ui-component name="..." path="...">`. The library is `https://cdn.componentator.com/spa.min@20.js`; the catalogue of components is [componentator.com](https://componentator.com) and the source is [totaljs/components](https://github.com/totaljs/components).

The new format has **3 files per component** (`component.html`, `readme.md`, `preview.jpg`). `component.html` contains the CSS, the script and a live example, so it opens directly in a browser. The reference is `example/`.

Plain JavaScript in ES5 style, no TypeScript (Total.js does not support it: never add types or `.d.ts`).

## Using it

1. Read [`SKILL.md`](SKILL.md): the rules, the conversion table from the old format and the checklist.
2. Start from `example/component.html` and `example/readme.md`.
3. Use [`docs/api.md`](docs/api.md) for the API of the library and [`docs/aicontext/`](docs/aicontext/readme.md) for the HTML elements (`ui-component`, `ui-bind`, `ui-import`, `ui-plugin`).
4. Check the result:

```bash
npm install playwright                    # once, for the browser test and the preview
node tools/check.js <folder>              # structure, readme, selectors, browser errors, dark mode
node tools/check.js <folder> --preview    # also creates preview.jpg (300x240)
```

To **convert** an existing component, give the agent its old folder (`component.js`, `component.css`, `component.json`, `example.html`, `dependencies.html`, `readme.md`, `picture.jpg`); the conversion table is in `SKILL.md`. The logic of the component is kept, only the format changes.

## Repository layout

- `SKILL.md` is the skill: how to create or convert a component. `.claude/skills/jcomponent/` and `.agents/skills/jcomponent/` point to it so Claude Code and Codex load it.
- `example/` is the template: `component.html` and `readme.md`.
- `docs/api.md` is the reference of the API (extracted from the library source and from how components use it).
- `docs/aicontext/` are the guides of the Total.js team about the HTML elements of the library.
- `tools/check.js` checks a component folder and creates `preview.jpg`.
- `llms.txt` is the index for models. `CLAUDE.md`, `GEMINI.md` and `.github/copilot-instructions.md` import this file.

## Conventions

- One component per folder, named after the component (`checkbox/`, lower case, without `j-`), with exactly the 3 files.
- In `component.html`: `<style component>` once, `<script component>` once, every CSS selector starts with `.ui-<name>`, `spa.min@20` in `<head>`.
- Code: ES5, tabs, single quotes, Total.js prototypes before hand-written helpers; no `require`, no ES modules, no extra libraries.
- Icons are Total.js icons (`ti ti-home`).
- `readme.md` has the frontmatter keys `name, description, author, version, darkmode, license, created, updated, jcomponent` (dates `yyyy-MM-dd HH:mm`) and documents every option of the default configuration.
- Do not change the behaviour of a component when converting it. Report a suspected bug next to the result.
