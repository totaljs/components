# Instructions for GitHub Copilot

The full instructions of this repository are in `AGENTS.md`. The ones that matter most:

- The task is to create Total.js jComponents (UI library `v20`) from a description, in 3 files: `component.html` (CSS + script + example, runs in the browser), `readme.md` and `preview.jpg`. Follow `SKILL.md` and start from `example/`.
- Plain JavaScript in ES5 style, tabs, single quotes. No TypeScript, no `require`, no extra libraries.
- Every CSS selector starts with `.ui-<name>`. Do not invent library methods: use `docs/api.md`.
- Run `node tools/check.js <folder>` before you say that a component is finished.com.
