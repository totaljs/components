# AI Guide: Use `<ui-bind>` for Data Binding

## Purpose

This document defines how AI should generate valid `<ui-bind>` markup from a user prompt.

Example prompts:

- `add ui-bind for user.name`
- `show text from ?.total`
- `render order items with template`

The output must follow official Total.js UI binding rules.

## Source of truth

Use these sources in this order:

1. Official `<ui-bind>` documentation.
2. Existing project context (requested model path, existing DOM element, callback names).
3. Existing local binding style conventions.

## Canonical declaration

```html
<ui-bind path="path.to.property" config="COMMAND_A;COMMAND_B;COMMAND_N"></ui-bind>
```

Core rules:

- `path` is required in normal mode.
- `config` contains one or multiple bind commands separated by `;`.
- `<ui-bind>` is inline by default (use `class="block"` or `style="display:block"` for block layout).

## Attributes

### `path="..."`

- Path to the model value to watch.
- Updates run when value changes via binding-aware methods.

### `config="..."`

- One or more commands.
- Command format is usually `command:expression`.

### `element="selector"` (optional)

- Applies binding to a selected element instead of the `<ui-bind>` element.
- Do not combine with multi-element selections.

### `parent="selector"` (optional)

- Resolves target in parent nodes instead of the `<ui-bind>` node.

### `child="selector"` (optional)

- Resolves target in child nodes instead of the `<ui-bind>` node.

## AI generation policy

### 1) Default output (minimum valid bind)

When prompt asks to add a bind without extra requirements:

```html
<ui-bind path="?.example" config="text:value"></ui-bind>
```

Default policy:

- Use `path="?.example"` when user does not specify path.
- Prefer `text:value` as safest default command.

### 2) Command selection rules

Select command by user intent:

- plain text rendering -> `text:value`
- HTML rendering -> `html:value`
- show/hide based on condition -> `show:...` or `hide:...`
- call function on change -> `exec:myFunction`
- template rendering list/object -> `template`

### 3) Expression forms

Allowed expression styles:

- direct value: `text:value`
- expression: `text:value.toUpperCase()`
- function link: `exec:myFunction` (must exist in JS scope)
- arrow expression when needed: `hide:n=>!n`

### 4) Template mode

If prompt asks for templating/list rendering, output:

```html
<ui-bind path="?.items" config="template">
	<script type="text/html">
		{{ foreach m in value }}
			<div>{{ m.name }}</div>
		{{ end }}
	</script>
</ui-bind>
```

Template rules:

- use `<script type="text/html">` inside `<ui-bind>`
- in template mode, `value` is the template model from `path`

### 5) Plugin-relative path handling

When prompt is in plugin/nested context, keep relative path conventions (`?.path`, `@path`) according to surrounding code.

### 6) Callback stubs

If `exec:*` is generated and callback does not already exist in local context, generate a JS stub.

## Command quick reference for AI

- `text:value` -> escaped text output
- `html:value` -> raw HTML output
- `show:condition` -> toggles visibility (`hidden` class)
- `hide:condition` -> toggles visibility (`hidden` class)
- `class:classA classB` -> toggles classes
- `exec:handlerName` -> executes handler on value change
- `template` -> Tangular template rendering

## Prompt -> output examples

### Example A: simple text bind

Prompt:

- `bind user name to text`

Output:

```html
<ui-bind path="?.user.name" config="text:value"></ui-bind>
```

### Example B: conditional visibility

Prompt:

- `hide section when cards exist`

Output:

```html
<ui-bind path="?.cards" config="hide:value && value.length > 0">
	<div class="message">No cards</div>
</ui-bind>
```

### Example C: function callback

Prompt:

- `run logic when order status changes`

Output:

```html
<ui-bind path="?.order.status" config="exec:onOrderStatusChanged"></ui-bind>

<script>
	function onOrderStatusChanged(value, path, element) {
		console.log(value);
	}
</script>
```

## Validation checklist (must pass)

1. Uses `<ui-bind ...></ui-bind>` tag.
2. Contains valid `path` unless prompt explicitly requests `path="null"` init style.
3. Uses supported command names in `config`.
4. Expressions are syntactically valid.
5. If `exec:*` is used, callback exists or stub is generated.
6. `template` mode includes `<script type="text/html">` or references a valid external template setup.

## Recommended response contract for AI engine

```json
{
  "binding": "ui-bind",
  "html": "<ui-bind path=\"?.example\" config=\"text:value\"></ui-bind>",
  "js": "",
  "warnings": [],
  "notes": []
}
```

