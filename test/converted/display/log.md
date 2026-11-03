# Log: display

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js display --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: taken from the first sentence of the old readme.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own.

## Warnings

10 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 10 x selector "..." is not scoped under .ui-display

- `selector ".ui-centered-noscroll" is not scoped under .ui-display`
- `selector ".ui-centered-noscroll body" is not scoped under .ui-display`
- `selector ".ui-centered-container" is not scoped under .ui-display`
- `selector ".ui-centered-body" is not scoped under .ui-display`
- `selector ".ui-centered-content" is not scoped under .ui-display`
- `selector ".ui-centered-button" is not scoped under .ui-display`
- `selector ".ui-centered-button:active" is not scoped under .ui-display`
- `selector ".ui-centered-button:hover" is not scoped under .ui-display`
- `selector ".ui-dark .ui-centered-container" is not scoped under .ui-display`
- `selector ".ui-dark .ui-centered-button" is not scoped under .ui-display`

**How to fix**: rename the class so it starts with `.ui-display` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

