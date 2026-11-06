# Log: exec

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js exec --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: taken from the first sentence of the old readme.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

The file was opened with `spa.min@19` and with `spa.min@20` (the `<head>` was changed in a copy, the component was not touched).

| Library | Result |
| --- | --- |
| v19 | no JavaScript errors |
| v20 | no JavaScript errors |

It declares `v19,v20` and gives the same result in both versions.

## Warnings

1 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x selector "..." is not scoped under .ui-exec

- `selector ".exec" is not scoped under .ui-exec`

**Possible fix**: rename the class so it starts with `.ui-exec` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

