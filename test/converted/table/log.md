# Log: table

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js table --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own.

## Warnings

None.

## Still to finish

### Options of the default configuration that the readme does not document

The code defines these options and `readme.md` does not say what they do. How to fix: read what the code does with `config.<key>` and add one bullet per option under `__Configuration__:`. Draft lines (the type is guessed from the default, the description must be written):

- `visibleY {Number}` TODO describe what it does (default: `1`)
- `pluralizepages {String}` TODO describe what it does (default: `# pages,# page,# pages,# pages`)
- `pluralizeitems {String}` TODO describe what it does (default: `# items,# item,# items,# items`)
- `margin {Number}` TODO describe what it does (default: `0`)

