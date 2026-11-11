# Log: fileupload

Result of converting the old component and checking it with `node tools/check.js fileupload --legacy`. Type: **component**, jComponent: **v19**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

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

It declares `v19` only. It also loads with v20 without errors; that does not prove that it works in v20.

## Warnings

2 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x it uses spa.min@19 (the component declares v19 only): it needs an update to run on jCompon

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

**Possible fix**: change the two links of the `<head>` to `spa.min@20`, open the file in the browser and fix what the console reports (typical errors in v20: `NOTMODIFIED is not defined`, `EVALUATE is not defined`, `self.compile is not a function`), then set `jcomponent: v19,v20` in `readme.md`. If it cannot run on v20, leave it as it is.

### 1 x `id` attribute

- `id="..." attribute in the code, near: (self, config) { var id = 'fileupload' + self._id; var input = (use aria-label or a wrapping <label>, an id is shared by every instance)`

**Possible fix**: remove the `id` and name the control with `aria-label` or a wrapping `<label>`; if the code reads the element back with `$('#id')`, keep a reference to the element instead (`var el = $(...)`) or use `self.find(...)`. `data-id` is not an `id` and is never reported.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

