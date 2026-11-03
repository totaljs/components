# Free JavaScript Web UI components for everyone

[![Made in EU](https://cdn.componentator.com/eu-small.png)](https://european-union.europa.eu/)

- [Website](https://componentator.com)
- [__Documentation__](https://docs.totaljs.com/components/)
- [Chat support](https://platform.totaljs.com/?open=messenger)
- [Join __Total.js Telegram__](https://t.me/totalplatform)
- [Support](https://www.totaljs.com/support/)

## Create components with AI

This branch contains everything an AI model (Claude, ChatGPT, Codex, Gemini, Copilot…) needs to create a new jComponent from a description, for example _"make me a modern radio button list according to the Apple UI guidelines"_. Each component has 3 files: `component.html` (CSS + script + live example, it runs directly in the browser), `readme.md` and `preview.jpg`.

| File | What it is |
| --- | --- |
| [`example/`](example) | The template: `component.html` and `readme.md` |
| [`SKILL.md`](SKILL.md) | The skill: workflow, rules and checklist to create a component |
| [`docs/api.md`](docs/api.md) | Reference of the jComponent API |
| [`docs/aicontext/`](docs/aicontext/readme.md) | Guides of the Total.js team: how to develop a component, `ui-component`, `ui-bind`, `ui-import` and `ui-plugin` |
| [`tools/check.js`](tools/check.js) | Checks a component and creates `preview.jpg` |
| [`tools/componentator.js`](tools/componentator.js) | Creates the package for componentator.com (`component.css`, `component.js`, `component.json`, `dependencies.html`, `example.html`, `readme.md` and an artistic `picture.jpg`) |
| [`AGENTS.md`](AGENTS.md), `CLAUDE.md`, `GEMINI.md`, [`llms.txt`](llms.txt) | Entry points for each agent |

### How to use it

1. Give the model this repository (or upload `SKILL.md`, `docs/api.md` and the `example/` folder).
2. Describe the component you need. The model derives the contract, writes the 3 files and checks them.
3. Check the result:

```bash
npm install playwright                    # once
node tools/check.js <folder>              # structure, readme, selectors, browser errors, dark mode
node tools/check.js <folder> --preview    # also creates preview.jpg (300x240)
node tools/componentator.js <folder>      # package for componentator.com in <folder>/componentator/
```

## Contact

Do you have any questions? Contact us <https://www.totaljs.com/contact/>