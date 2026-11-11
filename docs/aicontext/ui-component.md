# AI Guide: Initialize jComponent via `<ui-component>`

## Purpose

This document defines how AI should generate a valid base initialization for a selected jComponent after a user prompt, for example:

- `add datagrid component`

The result must be valid HTML (and optional JS) using Total.js UI component rules.

## Source of truth

Use these sources in this order:

1. Official `ui-component` documentation (syntax and binding behavior).
2. Local component index (name, aliases, config keys, example snippet).
3. Component `readme` and `example` data for component-specific details.

## Canonical HTML declaration

```html
<ui-component name="componentname" path="path.to.model" config="key1:value1;key2:value2" default="default_value"></ui-component>
```

Rules:

- `name` is required.
- `path` is optional.
- `config` is optional.
- `default` is optional and evaluated as a raw value/object.

## AI generation policy

### 1) Component resolution

- Resolve component from user prompt via `name` + `aliases`.
- Example: `datagrid` -> `name="datagrid"`.
- If multiple candidates match, pick highest confidence and report alternatives in `warnings`.

### 2) Base initialization output (default mode)

When user asks only to add a component, generate minimum valid initialization:

```html
<ui-component name="{{component_name}}" path="?.example"></ui-component>
```

Default path policy:

- Use `path="?.example"` unless user requests a specific model path.
- Keep output minimal: do not inject non-required config keys.

### 3) Config generation

If user asks for configured initialization, generate `config` using allowed keys from component index/readme only.

Config formatting rules:

- Format: `key1:value1;key2:value2`
- Numbers are plain numeric values, for example `limit:20`
- Booleans are `true`/`false`
- If value contains `:`, escape it as `\:`
- Absolute URLs can remain unescaped (`https://...`)

### 4) Optional `default`

Use `default` only when user asks for initial value.

Example:

```html
<ui-component name="textbox" path="?.name" default="John"></ui-component>
```

### 5) Optional demo structure

If user asks for a demo/working sample, include component-specific starter snippet from index `example` data.

For DataGrid this usually means:

- `<ui-component name="datagrid" ...>`
- inline `<script type="text/plain">[...]</script>` for columns
- small JS block with sample data/callback

## Prompt -> output examples

### Example A: base initialization

Prompt:

- `add datagrid component`

Output:

```html
<ui-component name="datagrid" path="?.example"></ui-component>
```

### Example B: with basic config

Prompt:

- `add datagrid with checkbox and row click handler`

Output:

```html
<ui-component name="datagrid" path="?.example" config="checkbox:true;click:onRowClick"></ui-component>

<script>
	function onRowClick(row, grid, row_el) {
		console.log(row);
	}
</script>
```

## Validation checklist (must pass)

1. Uses `<ui-component ...></ui-component>` tag.
2. Always contains `name`.
3. `name` maps to an existing component in index.
4. Any `config` keys are valid for the selected component.
5. Output HTML is syntactically valid.
6. If JS callbacks are referenced, output includes callback stubs.

## Extended rules from official docs

- Data-binding path is watched by the component.
- Relative pathing in nested plugins/components may use `?` and `@path` patterns.
- Versioned components are allowed (`textbox@1`, `textbox@2`).
- Special config keys are supported (for example `$id`, `$class`, `$binding`, `$delay`, `$init`, `$setter`, `$state`, `$reconfigure`, `$compile`, `$url`).

## Recommended response contract for AI engine

```json
{
  "component": "datagrid",
  "html": "<ui-component name=\"datagrid\" path=\"?.example\"></ui-component>",
  "js": "",
  "warnings": [],
  "notes": []
}
```

