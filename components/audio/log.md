# Log: audio

Result of converting the old component and checking it with `node tools/check.js audio --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

The file was opened with `spa.min@19` and with `spa.min@20` (the `<head>` was changed in a copy, the component was not touched).

| Library | Result |
| --- | --- |
| v19 | `ERR play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD` |
| v20 | `ERR play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD` |

It declares `v19,v20` and gives the same result in both versions (the message comes from the test environment, not from the component).

## Warnings

None.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

