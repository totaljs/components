# Log: objecttree

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js objecttree --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: taken from the first sentence of the old readme.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own.

## Warnings

1 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x selector "..." is not scoped under .ui-objecttree

- `selector ".ti-rotate-270" is not scoped under .ui-objecttree`

**How to fix**: rename the class so it starts with `.ui-objecttree` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

### Options of the default configuration that the readme does not document

The code defines these options and `readme.md` does not say what they do. How to fix: read what the code does with `config.<key>` and add one bullet per option under `__Configuration__:`. Draft lines (the type is guessed from the default, the description must be written):

- `copydata {String}` TODO describe what it does (default: `Copy data`)
- `copypath {String}` TODO describe what it does (default: `Copy path`)

