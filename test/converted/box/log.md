# Log: box

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js box --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own. It has no `<ui-component>` tag in the example (it is opened from code or it is not a jComponent), so nothing is shown.

## Warnings

2 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x `id` attribute

- `id="..." attribute in the code, near: { var html = '<div id="{0}" class="hidden {4}-container invisibl (use aria-label or a wrapping <label>, an id is shared by every instance)`

**How to fix**: remove the `id` and name the control with `aria-label` or a wrapping `<label>`; if the code reads the element back with `$('#id')`, keep a reference to the element instead (`var el = $(...)`) or use `self.find(...)`. `data-id` is not an `id` and is never reported.

### 1 x self.release() is a no-op in jComponent v20, remove it

- `self.release() is a no-op in jComponent v20, remove it`

**How to fix**: delete the call. If it is written as `if (self.release()) return;` delete the whole line: `release()` returns nothing, so the condition is never true.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

