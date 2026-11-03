---
name: jcomponent
description: Create or convert a Total.js jComponent (UI component for the Total.js UI library, jComponent v20). Use when asked to write, port or update a component for componentator.com / totaljs/components. Output is exactly 3 files - component.html (runnable in the browser), readme.md and preview.jpg.
---

# Creating a jComponent

Read `docs/api.md` for the API of the library before you use a method you are not sure about. For the HTML elements of the library (`<ui-component>`, `<ui-bind>`, `<ui-import>`, `<ui-plugin>`) use the guides in `docs/aicontext/`. Never invent methods: if it is not in `docs/api.md` or in the component you are converting, do not call it.

A component lives in its own folder and consists of exactly 3 files:

```
<name>/
  component.html   CSS + script + live example, opens directly in a browser
  readme.md        frontmatter + configuration documentation
  preview.jpg      300x240 screenshot of the rendered example
```

The reference is `example/component.html` and `example/readme.md`. Start from them and keep their structure.

## 1. component.html

One self-contained file. Open it in a browser and the component must render, with no build step and no server.

Order inside the file:

1. `<head>` with the meta tags of the example and the library (always these two lines, version `@20`):
   ```html
   <link href="https://cdn.componentator.com/spa.min@20.css" rel="stylesheet" type="text/css" />
   <script src="https://cdn.componentator.com/spa.min@20.js"></script>
   ```
2. `<style component>` : all CSS of the component, one block.
3. `<script component>` : the component, one `COMPONENT(...)` call.
4. The example: one or more `<ui-component>` tags and a plain `<script>` that fills the data.

The `component` attribute on `<style>` and `<script>` is what the tooling uses to extract the code for the CDN. Keep both exactly once and do not put anything else in them.

### Style rules

- Every selector starts with `.ui-<name>` (the `cls` value), for example `.ui-checkbox-label`. Nothing global, no tag selectors on their own.
- Use the library variables instead of hard-coded values where they exist: `var(--color)` (primary), `rgba(var(--rgb), .1)`, `var(--radius)`, `var(--gap)`, `var(--margin)`.
- Dark mode: the library adds the class `ui-dark` to `body` (`APPEARANCE({ dark: true })` switches it, use it to test). If the component has colours of its own, add `.ui-dark .ui-<name> ...` rules and set `darkmode: true` in the readme. Set `darkmode: false` only when the component really cannot be used in dark mode.
- Icons are Total.js icons: `<i class="ti ti-home"></i>` (never Font Awesome `fa-`).
- No external fonts, images or libraries other than `spa.min@20`.

### Script rules

```js
COMPONENT('name', 'key:value;key2:value', function(self, config, cls) {

	// private variables first

	self.make = function() {
		self.aclass(cls);
		// build the DOM once
	};

	self.setter = function(value) {
		// the value on `path` changed, update the view
	};

});
```

- The name is written without the `j-` prefix and in lower case. `cls` is `ui-<name>`; use it for every class (`cls + '-label'`), never type the name twice.
- The second argument is the default configuration string. Numbers are parsed as numbers, `true`/`false` as booleans. Every option in this string must be documented in the readme, and every documented option must have a default here or a clear fallback in the code.
- Typical members, only when needed: `self.make` (constructor, once), `self.setter(value, path, type)` (path changed), `self.getter`, `self.validate`, `self.configure(key, value, init)` (config changed at runtime), `self.init` (once per component type, for globals and helpers), `self.destroy`, `self.nocompile()` (when the HTML inside must not be compiled), `self.readonly()`.
- Useful helpers: `self.aclass/rclass/tclass`, `self.find`, `self.event`, `self.html`, `self.get/set`, `self.dirty`, `self.check`, `self.makepath`, `self.element`, `self.dom`.
- Style of code: ES5 (`var`, `function`), tabs for indentation, single quotes, Total.js prototypes (`'{0}'.format(x)`, `Tangular.compile`) before hand-written helpers. No ES modules, no `require`, no TypeScript, no extra libraries.
- No `console.log` left in the component.
- Support the usual options when they make sense: `disabled`, `required` (with `self.validate`), `class`, `label`. Do not invent options that nothing uses.

### Example rules

- Use `<ui-component name="<name>" path="..." config="key:value">` and close it once.
- The example must show the component working with realistic data and, when the component has important options, a second instance with a different `config`.
- Data is set in a plain `<script>` with `SET('path', value)` or by declaring the object.
- `<ui-component>` attributes: `name` (required), `path`, `config` (`key:value;key2:value`), `default` (initial value). Inside `config`, a `:` in a value is escaped as `\:` (absolute URLs may stay as they are). A component can be versioned in the tag (`textbox@1`). Special keys with `$` (`$id`, `$class`, `$binding`, `$delay`, `$init`, `$setter`, `$state`, `$reconfigure`, `$compile`, `$url`) are handled by the library, not by the component. Details: `docs/aicontext/ui-component.md`.
- If the example references a callback in `config` (a link to a global function), define a stub of it in the example script.
- It must work offline from the data side: no APIs, no tokens, no private URLs.

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
jcomponent: v19,v20
---

# <Name>

<Optional short paragraph with anything that is not obvious.>

__Configuration__:

- `key {Type}` description (default: `value`)
```

- Types: `{String}`, `{Number}`, `{Boolean}`, `{Object}`, `{Function}`. A config that links to a global function is described as "link to a global `function(args)`".
- One bullet per option, in the same order as in the default configuration string, then the rest.
- Mention dependencies on other components, if any (for example "needs `datepicker`").
- Keep the author, license and `created` of existing components. Set `updated` to the current date and time.

## 3. preview.jpg

- 300 x 240 px, JPEG.
- A screenshot of `component.html` opened in a browser, cropped to the component, light mode, on white background.
- Take it from the final file, after the last change of the component.

## Converting an existing component

Old format (folder with `component.js`, `component.css`, `component.json`, `example.html`, `dependencies.html`, `readme.md`, `picture.jpg`):

| Old | New |
| --- | --- |
| `component.css` | `<style component>` |
| `component.js` | `<script component>` (keep the logic, fix only what the rules above require) |
| `example.html` | the example block |
| `dependencies.html` | `<head>` links, always `spa.min@20` |
| `component.json` | frontmatter: `datecreated`->`created`, `dateupdated`->`updated`, `author`, `license`, `darkmode`, `jcomponent` |
| old `readme.md` | frontmatter + configuration list; remove the `### Author` block |
| `picture.jpg` | `preview.jpg` (retake it if it is not 300x240 or does not show the new example) |

Do not change the behaviour. If you think the component has a bug, report it next to the result and do not fix it silently.

## Checking the result

```bash
node tools/check.js <folder>             # structure, readme, selectors, browser errors, dark mode toggle
node tools/check.js <folder> --preview   # also creates preview.jpg (300x240)
```

It needs `npm install playwright` (it uses Chrome if Chromium is not installed). Without it, the structure is still checked and the browser test is skipped; then open `component.html` in a browser yourself.

## Checklist before delivering

0. `node tools/check.js <folder>` prints `OK`.
1. `component.html` opens from disk and renders with no errors in the browser console.
2. Clicking, typing and every documented option were tried in the example.
3. `ui-dark` on the page keeps the component readable (if `darkmode: true`).
4. Every selector starts with `.ui-<name>`.
5. Every option from the default configuration is in the readme and vice versa.
6. `readme.md` frontmatter has all 10 keys, dates in `yyyy-MM-dd HH:mm`.
7. `preview.jpg` exists, is 300x240 and matches the final example.
