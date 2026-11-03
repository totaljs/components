---
name: jcomponent
description: Create a new Total.js jComponent (UI component for the Total.js UI library, jComponent v20) from a natural-language description, for example "a modern radio button list according to the Apple UI guidelines", or convert an existing component of the classic format (component.js, component.css, component.json...) to the new one. Use when asked to write, design, convert or update a component for componentator.com / totaljs/components. Output is exactly 3 files - component.html (runnable in the browser), readme.md and preview.jpg.
---

# Creating or converting a jComponent

Two tasks use the same format: **create** a component from a description (this page) and **convert** an existing component of the classic format (see "Converting an existing component" at the end).

The user describes a component in plain words (what it does, how it looks). You deliver a complete, working component in the format below. The user does not know lifecycle names: derive them.

Read these first:

- `example/component.html` and `example/readme.md`: the template. Copy its structure.
- `docs/api.md`: the API of the instance. **Never call a method that is not there or in the template.**
- `docs/aicontext/component-development.md`: how to turn a description into a contract, which hooks to choose, how to separate model changes from rendering, and how to verify.
- `docs/aicontext/ui-component.md`: the attributes of `<ui-component>` for the example.

## Output

A folder named after the component (lower case, one word if possible):

```
<name>/
  component.html   CSS + script + live example, opens directly in a browser
  readme.md        frontmatter + documentation
  preview.jpg      300x240 screenshot of the rendered example
```

The 3 files are the source. For **componentator.com** the package of the classic format (`component.css`, `component.js`, `component.json`, `dependencies.html`, `example.html`, `readme.md` and an artistic `picture.jpg`) is generated from them by a tool, never written by hand (see "Package for componentator").

## Workflow

1. **Check the name** against `https://componentator.com` and the folders of this repository; do not duplicate an existing component.
2. **Write the contract** before the code and keep it short (it ends in the readme): purpose, model (type and shape, empty value), configuration (keys, types, defaults), callbacks (name and exact arguments), state (disabled, required/invalid, empty), public methods (only if really needed). Choose the smallest coherent API. Ask the user only when an open decision changes the meaning or the data contract; otherwise decide and state the assumption.
3. **Write `component.html`** following the rules below.
4. **Read the date and time from the system** (`date '+%Y-%m-%d %H:%M'`) and **write `readme.md`** with it in `created` and `updated`.
5. **Check the files.**
   Run `node tools/check.js <folder> --preview`, fix what it reports, and open the file in a browser: try every option, the keyboard, two instances at the same time and dark mode.
6. **Create the package for componentator**: `node tools/componentator.js <folder>` (see below).
7. Report what was verified and what was not.

## 1. component.html

One self-contained file. Open it in a browser and the component must render, with no build step and no server.

Order inside the file:

1. `<head>` with the meta tags of the template and the library (always these two lines, version `@20`):
   ```html
   <link href="https://cdn.componentator.com/spa.min@20.css" rel="stylesheet" type="text/css" />
   <script src="https://cdn.componentator.com/spa.min@20.js"></script>
   ```
2. `<style component>`: all the CSS of the component, one block.
3. `<script component>`: the component, one `COMPONENT(...)` call.
4. The example: `<ui-component>` tags and a plain `<script>` that fills the data.

The `component` attribute on `<style>` and `<script>` is what the tooling uses to extract the code for the CDN. Keep both exactly once and do not put anything else in them.

### Style rules

- Every selector is scoped under `.ui-<name>` (the `cls` value), for example `.ui-radio-item`; it may follow a state class of the library such as `.ui-dark`. Nothing global, no tag selectors on their own.
- Use the library variables where they exist: `var(--color)` (primary), `rgba(var(--rgb), .1)`, `var(--radius)`, `var(--gap)`, `var(--margin)`.
- Dark mode: the library adds the class `ui-dark` to `body` (`APPEARANCE({ dark: true })` switches it, use it to test). Add `.ui-dark .ui-<name> ...` rules for every colour of your own and set `darkmode: true` in the readme.
- Icons are Total.js icons: `<i class="ti ti-home"></i>` (never Font Awesome `fa-`).
- No external fonts, images or libraries other than `spa.min@20`.

### Design and accessibility

When the user names a design language ("Apple UI guidelines", "Material", "minimal"), translate it into the CSS of the component: sizes, spacing, radius, typography, colours, motion and states. Keep what makes a component good in any style:

- Semantic, keyboard-operable controls (real `button`, `input`, `label`; arrow keys inside a group, `Space`/`Enter` to select), visible focus, sufficient contrast, touch targets of about 44px.
- Roles and ARIA state when the native element is not enough (`role="radiogroup"`, `aria-checked`, `aria-disabled`). Name the controls with `aria-label` or a wrapping `<label>`; do not use `id="..."` attributes (two instances must not share an id, and the component must not depend on one).
- Respect `prefers-reduced-motion` for animations.
- Values that come from data are rendered with `.text()` or an escaping helper, never as raw HTML.
- **The label is the HTML content of the tag**, as in `j-Input` (`config.label || self.html()`), so it can contain markup and the `@(...)` translation markers of the application: `<ui-component name="radiolist" path="form.plan">Plan</ui-component>`. `label` in the configuration is only the alternative. The same goes for other short texts of the component that are not data. Nothing the user sees is hard-coded in one language.

### Script rules

```js
COMPONENT('name', 'key:value;key2:value', function(self, config, cls) {

	// private variables first

	self.make = function() {
		self.aclass(cls);
		// build the DOM once, register delegated events once
	};

	self.setter = function(value, path, flags) {
		// the model changed: render only
	};

});
```

- The name is lower case, without the `j-` prefix. `cls` is `ui-<name>`: use it for every class (`cls + '-label'`), never type the name twice.
- The second argument is the default configuration string. Numbers are parsed as numbers, `true`/`false` as booleans. Every key in it is documented in the readme.
- **Data flow:** `model change -> setter -> DOM` and `user interaction -> normalize -> self.modify(value) -> setter -> DOM`. The setter renders only; it never writes the value back and never fires the callback of the user. Fire the callback once, from the interaction, with `self.EXEC(config.change, value, self)`.
- Handle the empty value (`null`, `undefined`, `''`) according to the declared model type. Clone arrays and objects before changing them.
- A disabled component rejects the interaction (not only looks disabled) and keeps the native `disabled` property and the ARIA state in sync (`self.configure`).
- Two instances with different paths and configuration must stay independent: no per-instance data in `self.init`, no fixed ids, no global state.
- Implement only the hooks that the behaviour needs (`make`, `setter`, `configure`, `validate`, `state`, `resize`, `destroy`, `init`). Clean in `destroy` only what the instance owns.
- Do not use `self.nocompile()`, `self.release()`, `self.bindvisible()` (no-ops in v20). `self.readonly()` clears `getter` and `setter` at the moment it is called: if you use it, call it before you define them. See "Avoid" in `docs/api.md`.
- Code style: ES5 (`var`, `function`), tabs, single quotes, Total.js prototypes (`'{0}'.format(x)`, `Tangular.compile`) before hand-written helpers. No ES modules, no `require`, no TypeScript, no extra libraries, no `console.log`.
- Support the usual options when they make sense (`disabled`, `required` with `self.validate`, `label`); do not invent options that nothing uses.

### Example rules

- Use `<ui-component name="<name>" path="..." config="key:value">` and close it once. Inside `config`, a `:` in a value is escaped as `\:`. Special keys with `$` (`$id`, `$class`, `$binding`, `$delay`, `$init`, `$setter`, `$state`, `$reconfigure`, `$compile`, `$url`) are handled by the library. See `docs/aicontext/ui-component.md`.
- The label of the example goes in the content of the tag, not in `config` (`<ui-component ...>Plan</ui-component>`).
- The example shows the component working with realistic data (the main instance goes first: it is the one in `preview.jpg`) and, when it has important options, more instances with a different `config` (and one disabled).
- Data is set in a plain `<script>` with `SET('path', value)` or by declaring the object. If a callback is linked from `config`, define a stub of it in the same script.
- It works offline from the data side: no APIs, no tokens, no private URLs.

## 2. readme.md

```markdown
---
name: <name>
description: <one sentence, what the component does>
author: <author of the component>
version: <version>
darkmode: <true|false>
license: <license type>
created: <yyyy-MM-dd HH:mm>
updated: <yyyy-MM-dd HH:mm>
jcomponent: v20
---

# <Name>

<Short paragraph: purpose, model (type and shape), anything not obvious.>

__Configuration__:

- `key {Type}` description (default: `value`)

__Callbacks__:

- `change {String}` link to a global `function(value, component)`, executed after a change by the user
```

- Types: `{String}`, `{Number}`, `{Boolean}`, `{Object}`, `{Function}`. A config that links to a function is "link to a global `function(args)`" with the exact arguments.
- One bullet per option, in the same order as the default configuration string.
- State the model shape, the callbacks with their payloads, the public methods (if any), the dependencies on other components and the runtime used (`jComponent v20`).
- **`created` and `updated` must be the real current date and time.** A model does not know it: read it from the system (`date '+%Y-%m-%d %H:%M'`) when you write the file and never invent it, copy it from another readme or from the template. For a new component both are the same moment; when you change an existing component, `created` stays and `updated` is read again. `tools/check.js` rejects dates in the future and `updated` older than `created`.

## 3. preview.jpg

- 300 x 240 px, JPEG, created by `node tools/check.js <folder> --preview`.
- A screenshot of `component.html` in light mode on a white background. It shows the **first** `<ui-component>` of the example (the others are hidden), so put the main instance first, with data, and make it fit in 300 x 240 px.

## Package for componentator

```bash
node tools/componentator.js <folder>                      # creates <folder>/componentator/
node tools/componentator.js <folder> --email <email>      # also writes the email of the author in component.json
node tools/componentator.js <folder> --out <dir>          # another output folder
```

It reads `component.html` and `readme.md` (run `check.js` first: the dates and the keys of the frontmatter must be valid) and creates the files of the classic component, as in `j-Input`:

| File | From |
| --- | --- |
| `component.css` | `<style component>` |
| `component.js` | `<script component>` |
| `example.html` | the example of `component.html` (everything after the component script) |
| `dependencies.html` | the `spa.min@20` links of `<head>` |
| `component.json` | the frontmatter of `readme.md` (`name` is `j-` + the title of the readme, `jcomponent: v20` is `20`, the dates are ISO) |
| `readme.md` | the readme without the frontmatter, with `## j-Name`, the jComponent version and an `### Author` block |
| `picture.jpg` | the first instance of the example in light and dark mode on a soft gradient, 600 x 480 px (2x of 300 x 240) |

Open `component.json` and `readme.md` of the package after you create it and check that they look like the ones of `j-Input`.

## Checking the result

```bash
node tools/check.js <folder>             # structure, readme, selectors, browser errors, dark mode toggle
node tools/check.js <folder> --preview   # also creates preview.jpg (300x240)
```

It needs `npm install playwright` (it uses Chrome if Chromium is not installed). Without it, the structure is still checked and the browser test is skipped; then open `component.html` in a browser yourself.

## Checklist before delivering

0. `node tools/check.js <folder>` prints `OK`.
1. `component.html` opens from disk and renders with no errors in the browser console.
2. The initial value and a change of the model render; a user interaction changes the model and fires the callback exactly once.
3. Empty values, the boundaries, `disabled` and `required` behave as documented.
4. Keyboard operation and the accessible names work; `ui-dark` on the body keeps the component readable.
5. Two instances with different paths and configs are independent.
6. Every selector is scoped under `.ui-<name>`.
7. Every option of the default configuration is in the readme and vice versa.
8. `readme.md` frontmatter has all 9 keys; `created` and `updated` are the real current date and time read from the system (`yyyy-MM-dd HH:mm`).
9. `preview.jpg` exists, is 300x240 and matches the final example.
10. `node tools/componentator.js <folder>` created the package and `componentator/picture.jpg` looks good.

## Converting an existing component

The classic format is a folder `j-Name/` with `component.js`, `component.css`, `component.json`, `example.html`, `dependencies.html`, `readme.md` and `picture.jpg` (the components of `totaljs/components`, branch `master`). **Converting only changes the format, never the behaviour.**

1. **Mechanical part, with the tool:**

   ```bash
   node tools/convert.js <old-folder> --out <dir>      # the result is <dir>/<name>/
   node tools/convert.js <old-folder> --out <dir> --prefix j-   # the folder is j-<name>
   ```

   The name is the one of `COMPONENT('name')` (not of the old folder). The tool creates `component.html` (`component.css` -> `<style component>`, `component.js` -> `<script component>` without the no-op `self.nocompile()`, `example.html` -> the example, `dependencies.html` -> `<head>` with `spa.min@20` and any other dependency of the old file), `readme.md` (frontmatter from `component.json`, `# Title`, bullets in the form `` `key {Type}` ``, without the `### Author` block) and `preview.jpg` (a copy of `picture.jpg`). `created` is kept, `updated` is the current date and time of the system. The version of the library is the one that the component declares in `component.json` (`jcomponent`; without it, v19): a v19-only component keeps `spa.min@19` and `jcomponent: v19`. Do not force `spa.min@20` on it: it can fail (`NOTMODIFIED is not defined`, `self.compile is not a function`...). Updating it to run on v20 is a separate task.
2. **Check:** `node tools/check.js <result> --legacy`. Fix the **errors**:
   - `description: TODO` -> write one sentence from the readme and the code.
   - Options of the default configuration that the readme does not document -> read the code, add them to `__Configuration__:` with their `{Type}` and default.
   - `__Configuration__:` missing in a component that has defaults -> add it.
   - `preview.jpg` missing -> `node tools/check.js <result> --preview`.
3. **Warnings** are rules for new components that the old code does not follow (selectors that are not scoped under `.ui-<name>`, `id="..."`, `self.release()`, `console.log`). Do not rewrite code to remove them: that can change the behaviour. List them next to the result, and fix only what is trivially safe.
4. **Run the browser test:** `node tools/check.js <result> --legacy` with Playwright, and open `component.html`. If the component fails, compare with the old one before you change anything: it may need another component or a library (`dependencies.html`).
5. Do not convert two folders that register the same name (`j-QRCode` and `j-QRCodeGenerator` both register `qrcode`) and do not convert a folder without `component.js` (`j-ResponsiveLayout`): report them.
6. Only components (`j-*`) are converted. Tangular helpers and templates (`Tangular-*`, `URLify`, `Mailify`...) are not jComponents.
7. To publish on componentator, `node tools/componentator.js <result>` creates the package again (see "Package for componentator").
