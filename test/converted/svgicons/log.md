# Log: svgicons

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js svgicons --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- `CON Unsafe attempt to load URL file:///svgicons.svg#phone from frame with URL file:///private/tmp/claude-501/-Volumes-Grey-GitHub-forge/fb219623-c588-470a-b816-3f1893e444ed/scratchpad/conv/svgicons/component.html. 'file:' URLs are treated as unique security origins.`
- `CON Unsafe attempt to load URL file:///svgicons.svg#phone from frame with URL file:///private/tmp/claude-501/-Volumes-Grey-GitHub-forge/fb219623-c588-470a-b816-3f1893e444ed/scratchpad/conv/svgicons/component.html. 'file:' URLs are treated as unique security origins.`
- `CON Unsafe attempt to load URL file:///svgicons.svg#phone from frame with URL file:///private/tmp/claude-501/-Volumes-Grey-GitHub-forge/fb219623-c588-470a-b816-3f1893e444ed/scratchpad/conv/svgicons/component.html. 'file:' URLs are treated as unique security origins.`

This message comes from the test environment (no user gesture, CORS, `file://` or an API key), not from the conversion.

## Warnings

3 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 3 x selector "..." is not scoped under .ui-svgicons

- `selector ".ui-svgicon-b" is not scoped under .ui-svgicons`
- `selector ".selected .ui-svgicon-a" is not scoped under .ui-svgicons`
- `selector ".selected .ui-svgicon-b" is not scoped under .ui-svgicons`

**How to fix**: rename the class so it starts with `.ui-svgicons` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

