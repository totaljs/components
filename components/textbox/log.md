# Log: textbox

Result of converting the old component and checking it with `node tools/check.js textbox --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

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

13 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 9 x selector "..." is not scoped under .ui-textbox

- `selector "input:-ms-input-placeholder" is not scoped under .ui-textbox`
- `selector "input:-webkit-input-placeholder" is not scoped under .ui-textbox`
- `selector "input:-moz-input-placeholder" is not scoped under .ui-textbox`
- `selector "input:invalid" is not scoped under .ui-textbox`
- `selector ".ui-right" is not scoped under .ui-textbox`
- `selector ".ui-center" is not scoped under .ui-textbox`
- `selector ".ui-dark input:-ms-input-placeholder" is not scoped under .ui-textbox`
- `selector ".ui-dark input:-webkit-input-placeholder" is not scoped under .ui-textbox`
- `selector ".ui-dark input:-moz-input-placeholder" is not scoped under .ui-textbox`

**Possible fix**: rename the class so it starts with `.ui-textbox` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

### 2 x selector "..."text"..." is not scoped under .ui-textbox

- `selector "input[type="text"]:disabled" is not scoped under .ui-textbox`
- `selector ".ui-dark input[type="text"]:disabled" is not scoped under .ui-textbox`

**Possible fix**: rename the class so it starts with `.ui-textbox` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

### 2 x selector "..."password"..." is not scoped under .ui-textbox

- `selector "input[type="password"]:disabled" is not scoped under .ui-textbox`
- `selector ".ui-dark input[type="password"]:disabled" is not scoped under .ui-textbox`

**Possible fix**: rename the class so it starts with `.ui-textbox` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

