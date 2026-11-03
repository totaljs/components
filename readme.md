# Free JavaScript Web UI components for everyone

[![Made in EU](https://cdn.componentator.com/eu-small.png)](https://european-union.europa.eu/)

- [Website](https://componentator.com)
- [__Documentation__](https://docs.totaljs.com/components/)
- [Chat support](https://platform.totaljs.com/?open=messenger)
- [Join __Total.js Telegram__](https://t.me/totalplatform)
- [Support](https://www.totaljs.com/support/)

## Create or convert components with AI

This branch contains everything an AI model (Claude, ChatGPT, Codex, Gemini, Copilot…) needs to create or convert a jComponent into the new format: 3 files per component, `component.html` (CSS + script + live example, it runs directly in the browser), `readme.md` and `preview.jpg`.

| File | What it is |
| --- | --- |
| [`example/`](example) | The template: `component.html` and `readme.md` |
| [`SKILL.md`](SKILL.md) | The skill: rules, conversion table from the old format, checklist |
| [`docs/api.md`](docs/api.md) | Reference of the jComponent API |
| [`tools/check.js`](tools/check.js) | Checks a component and creates `preview.jpg` |
| [`AGENTS.md`](AGENTS.md), `CLAUDE.md`, `GEMINI.md`, [`llms.txt`](llms.txt) | Entry points for each agent |

### How to use it

1. Give the model this repository (or upload `SKILL.md`, `docs/api.md` and the `example/` folder).
2. To **create** a component, describe it. To **convert** one, give the model its old folder (`component.js`, `component.css`, `component.json`, `example.html`, `dependencies.html`, `readme.md`, `picture.jpg`). The logic is kept, only the format changes.
3. Check the result:

```bash
npm install playwright                    # once
node tools/check.js <folder>              # structure, readme, selectors, browser errors, dark mode
node tools/check.js <folder> --preview    # also creates preview.jpg (300x240)
```

## Contact

Do you have any questions? Contact us <https://www.totaljs.com/contact/>