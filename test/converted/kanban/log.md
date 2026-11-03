# Log: kanban

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js kanban --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own.

## Warnings

1 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x self.release() is a no-op in jComponent v20, remove it

- `self.release() is a no-op in jComponent v20, remove it`

**How to fix**: delete the call. If it is written as `if (self.release()) return;` delete the whole line: `release()` returns nothing, so the condition is never true.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

