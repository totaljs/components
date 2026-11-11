# AI Guide: Use `<ui-import>` for Dynamic Content Import

## Purpose

This document defines how AI should generate valid `<ui-import>` markup from a user prompt.

Typical prompts:

- `add ui-import for /forms/user.html`
- `import form into #container and replace it`
- `import content with path and id placeholders`

## Source of truth

Use these sources in this order:

1. Official `<ui-import>` documentation and command list.
2. Existing project structure (target element, path conventions, function names).
3. Existing local style conventions.

## Canonical usage

```html
<ui-import config="url:/mysubpage.html"></ui-import>
```

`<ui-import>` dynamically imports content/components into the DOM.

## AI generation policy

### 1) Minimum valid output

When user asks only to add import:

```html
<ui-import config="url:/forms/example.html"></ui-import>
```

### 2) Config formatting

- Config is a semicolon-separated string: `key1:value1;key2:value2`.
- Include only keys requested by the user.
- Keep `url` always present.

### 3) Targeted import vs inline import

- Use `<ui-import ...>` when import belongs to current markup position.
- Use `target:selector` when user explicitly asks to inject content into another element.

### 4) Replace vs append behavior

- Use `replace:true` when user asks to replace current element.
- If `replace:true` is missing, content is appended (default behavior).

### 5) Placeholder replacement support

If imported content contains placeholders:

- `~ID~` -> provide `id:value`
- `~PATH~` -> provide `path:value`

### 6) Hooks and transformation

- `init:path.to.method` runs after import.
- `make:path.to.method` (v18/v19) runs before import and must return updated response string.

### 7) Script/style re-evaluation

- Default behavior evaluates scripts/styles one time.
- Use `reevaluate:true` only when user explicitly needs repeated re-evaluation.

## Commands reference

### `url:value`

Required in practice. URL can be relative or absolute; content is downloaded and imported automatically.

### `init:path.to.method`

Optional. Executes method after content import.

### `target:selector`

Optional. Imports content into a specific target (jQuery selector).

### `replace:true` (v18/v19)

Optional. Replaces current element with imported content. Default is append (`false`).

### `reevaluate:true` (v18/v19)

Optional. Re-evaluates scripts/styles again. Default: `false`.

### `id:value`

Optional. Replaces all `~ID~` placeholders in imported response before evaluation.

Example:

```html
<div data-import="url:/someform.html;id:user.profile"></div>
```

Then `~ID~.name` becomes `user.profile.name`.

### `path:value` (v18/v19)

Optional. Replaces all `~PATH~` placeholders in imported response before evaluation.

Example:

```html
<div data-import="url:/someform.html;path:user.profile"></div>
```

Then `~PATH~.name` becomes `user.profile.name`.

### `class:value`

Optional. Toggles class/classes on the current element after import.

### `cache:value` (v18/v19)

Optional. Enables `localStorage` caching for future usage.

Examples:

- `cache:1 day`
- `cache:10 minutes`

### `make:path.to.method` (v18/v19)

Optional. Executes method before import. Method receives response and must return updated response.

If method returns empty/null, content is not imported.

Example signature:

```js
function updateSomething(response, el, path) {
	return response + '<div>MY ADDITIONAL CONTENT</div>';
}
```

## Static inline variables (`+v19`)

Supported in imported content (`ui-import` and `IMPORT()`):

```html
--VARIABLENAME1=variablevalue1--
--VARIABLENAME2=variablevalue2--

<div>--VARIABLENAME1--</div>
<div>--VARIABLENAME2--</div>
```

## Prompt -> output examples

### Example A: basic import

Prompt:

- `add ui-import for /forms/user.html`

Output:

```html
<ui-import config="url:/forms/user.html"></ui-import>
```

### Example B: replace and target

Prompt:

- `import /forms/user.html into #content and replace`

Output:

```html
<ui-import config="url:/forms/user.html;target:#content;replace:true"></ui-import>
```

### Example C: placeholders with post-init

Prompt:

- `import profile form with id user.profile and run init`

Output:

```html
<ui-import config="url:/forms/profile.html;id:user.profile;init:profile_init"></ui-import>
```

## Validation checklist (must pass)

1. Uses `<ui-import ...></ui-import>` or valid equivalent import declaration.
2. `config` contains `url`.
3. All used command keys are supported commands.
4. `target` uses valid selector when present.
5. `init`/`make` function links point to existing or generated stubs.
6. `replace`, `reevaluate` use boolean values (`true/false`).
7. `id`/`path` are present when placeholders `~ID~`/`~PATH~` are expected.

## Recommended response contract for AI engine

```json
{
  "element": "ui-import",
  "html": "<ui-import config=\"url:/forms/example.html\"></ui-import>",
  "js": "",
  "warnings": [],
  "notes": []
}
```

