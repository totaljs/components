# Log: multioptions

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js multioptions --legacy`. Type: **component**, jComponent: **v19**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own.

## Warnings

42 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x it uses spa.min@19 (the component declares v19 only): it needs an update to run on jCompon

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

**How to fix**: change the two links of the `<head>` to `spa.min@20`, open the file in the browser and fix what the console reports (typical errors in v20: `NOTMODIFIED is not defined`, `EVALUATE is not defined`, `self.compile is not a function`), then set `jcomponent: v19,v20` in `readme.md`. If it cannot run on v20, leave it as it is.

### 41 x selector "..." is not scoped under .ui-multioptions

- `selector ".ui-moi-name" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputtext" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputarea" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber input" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber-buttons" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath input" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath-buttons" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate input" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate-buttons" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors .selected .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-select" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-select select" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-select .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean.checked .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean.checked" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputdate input" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputpath input" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputtext" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputarea" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-select select" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-select" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputnumber input" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputnumber-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputnumber-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-boolean" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-boolean.checked" is not scoped under .ui-multioptions`

**How to fix**: rename the class so it starts with `.ui-multioptions` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

