# Log: dropdownlist

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js dropdownlist --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

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

1 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x `id` attribute

- `id="..." attribute in the code, near: ; } else item.id = ''; next(); }, function() { (use aria-label or a wrapping <label>, an id is shared by every instance)`

**Possible fix**: remove the `id` and name the control with `aria-label` or a wrapping `<label>`; if the code reads the element back with `$('#id')`, keep a reference to the element instead (`var el = $(...)`) or use `self.find(...)`. `data-id` is not an `id` and is never reported.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

