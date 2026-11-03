# AI Guide: Use `<ui-plugin>` for Scoped UI Composition

## Purpose

This document defines how AI should generate valid `<ui-plugin>` markup from a user prompt.

Example prompts:

- `add ui-plugin for users.form`
- `create anonymous plugin with textbox`
- `wrap these components into isolated plugin`

The output must follow official Total.js plugin/path scoping behavior.

## Source of truth

Use these sources in this order:

1. Official `<ui-plugin>` documentation (including Methods and Properties).
2. Existing project structure and paths.
3. Existing local naming conventions for plugin methods and handlers.

## Canonical declaration

```html
<ui-plugin path="PATH" config="CONFIG">
	<!-- at least one nested <ui-component> or <ui-bind> -->
</ui-plugin>
```

Core rules:

- `path` is required.
- `config` is optional.
- Plugin must contain nested `<ui-component>` or `<ui-bind>`; otherwise plugin is not initialized.

## Why `<ui-plugin>` exists

`<ui-plugin>` reduces repeated full paths in nested UI code.

Without plugin:

```html
<ui-component name="input" path="users.form.firstname"></ui-component>
<ui-component name="input" path="users.form.age"></ui-component>
```

With plugin:

```html
<ui-plugin path="users.form">
	<ui-component name="input" path="?.firstname"></ui-component>
	<ui-component name="input" path="?.age"></ui-component>
</ui-plugin>
```

## Plugin methods/properties (v19+ guidance)

When AI generates plugin JS logic, prefer plugin-scoped methods/properties over global state helpers.

Preferred methods:

- `exports.set(path, value)` (or `exports.set(object)`)
- `exports.get(path)`
- `exports.upd(path)`
- `exports.inc(path, value)`
- `exports.push(path, value)`
- `exports.nul(path)`
- `exports.reset([path])`
- `exports.watch(path, callback, [init])`

Useful properties:

- `exports.model` (plugin model)
- `exports.form` (plugin model + state reset behavior)
- `exports.data` (alias to model)
- `exports.name`
- `exports.parent`
- `exports.caller`
- `exports.modified`

Rule for AI:

- If operation targets plugin scope data, use `exports.*` methods first.
- Avoid global `SET('...')` / `GET('...')` for plugin-local state when `exports.*` can do the same.

## AI generation policy

### 1) Default output (minimum valid plugin)

When prompt asks only to add a plugin, generate:

```html
<ui-plugin path="?.example">
	<ui-bind path="?.ready" config="text:value"></ui-bind>
</ui-plugin>
```

Default path policy:

- If user provides explicit path, use it.
- If not provided, use `path="?.example"`.
- Always include at least one nested binder/component.

### 2) Nested component path policy

Inside plugin, prefer relative scoped paths:

- `?.field`
- `?.section.value`

Do not duplicate absolute prefix if plugin path already provides scope.

### 3) Config generation

Supported plugin config keys:

- `init:path.to.method` -> runs on plugin init (`function(plugin, el)`)
- `class:class_name` -> toggles class on plugin element
- `isolated:true` -> plugin does not inherit parent plugin scope
- `aclass:true` -> adds plugin path as class name
- `delay:number` -> class toggle delay (default `300`)

Generate only keys requested by user (or required by context).

### 4) Anonymous plugin generation

If prompt requests anonymous/reusable part, generate `path="?"` or named anonymous variant:

```html
<ui-plugin path="? contactform" config="init:?/init">
	<ui-component name="textbox" path="?.name">Name</ui-component>
</ui-plugin>
```

If code includes JS plugin declaration, use matching name:

```javascript
PLUGIN('contactform', function(exports) {
	exports.init = function() {};
});
```

### 5) Isolated mode in nested plugins

If prompt says "do not inherit parent scope", generate `isolated:true`:

```html
<ui-plugin path="products.form" config="isolated:true">
	<ui-component name="textbox" path="?.name">Name</ui-component>
</ui-plugin>
```

### 6) Parent-scope skipping

If prompt requests skipping parent scope levels, use `?N` form in nested paths:

- `?.name` -> full inherited path
- `?1.name` -> skip one plugin level
- `?2.name` -> skip two plugin levels

## Prompt -> output examples

### Example A: simple scoped container

Prompt:

- `add ui-plugin with path users.form and two inputs`

Output:

```html
<ui-plugin path="users.form">
	<ui-component name="input" path="?.firstname">First name</ui-component>
	<ui-component name="input" path="?.age">Age</ui-component>
</ui-plugin>
```

### Example B: isolated nested plugin

Prompt:

- `inside users.form add isolated plugin products.form with textbox name`

Output:

```html
<ui-plugin path="users.form">
	<ui-plugin path="products.form" config="isolated:true">
		<ui-component name="textbox" path="?.name">Name</ui-component>
	</ui-plugin>
</ui-plugin>
```

### Example C: anonymous plugin

Prompt:

- `create anonymous plugin contactform with init handler and name textbox`

Output:

```html
<ui-plugin path="? contactform" config="init:?/init">
	<ui-component name="textbox" path="?.name">Name</ui-component>
</ui-plugin>

<script>
	PLUGIN('contactform', function(exports) {
		exports.init = function() {
			// plugin initialized
		};
	});
</script>
```

## Validation checklist (must pass)

1. Uses `<ui-plugin ...></ui-plugin>` tag.
2. Contains `path`.
3. Contains at least one nested `<ui-component>` or `<ui-bind>`.
4. Nested paths use plugin scope correctly (`?.*`, `?N.*`, or explicit absolute path where required).
5. Uses only supported plugin config keys.
6. If `init:*` is referenced, function exists or stub is generated.
7. Anonymous plugin naming is consistent between HTML and `PLUGIN(...)` declaration.
8. Plugin-local model changes in JS use `exports.*` methods (not global `SET/GET`) when applicable.

## Recommended response contract for AI engine

```json
{
  "container": "ui-plugin",
  "html": "<ui-plugin path=\"users.form\"><ui-component name=\"input\" path=\"?.firstname\"></ui-component></ui-plugin>",
  "js": "",
  "warnings": [],
  "notes": []
}
```

