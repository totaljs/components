# Log: objecteditor

Result of converting the old component and checking it with `node tools/check.js objecteditor --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

The file was opened with `spa.min@19` and with `spa.min@20` (the `<head>` was changed in a copy, the component was not touched).

| Library | Result |
| --- | --- |
| v19 | no JavaScript errors |
| v20 | no JavaScript errors |

It declares `v19,v20` and gives the same result in both versions.

## Warnings

47 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 47 x selector "..." is not scoped under .ui-objecteditor

- `selector ".ui-oe" is not scoped under .ui-objecteditor`
- `selector ".ui-oe input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe textarea" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-group" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-group > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-group > .ui-oe-items > .ui-oe-item span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-array" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-array > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-array > .ui-oe-items > .ui-oe-item span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-item:last-child span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-item:last-child .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-label span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-label .ti" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-null" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-null .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-null .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-date" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-date .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-date input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline textarea" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline .ui-oe-label span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-number" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-number .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-number input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox .ti" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox.checked .ti" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox.checked" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-number input" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-string input" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-date input" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-group > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-label span" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-array > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-array" is not scoped under .ui-objecteditor`

**Possible fix**: rename the class so it starts with `.ui-objecteditor` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

