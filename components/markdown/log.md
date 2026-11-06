# Log: markdown

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js markdown --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

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

94 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x `id` attribute

- `id="..." attribute in the code, near: marks === false ? '' : ' id="{3}"') + ' class="markdown-line" data-ind (use aria-label or a wrapping <label>, an id is shared by every instance)`

**Possible fix**: remove the `id` and name the control with `aria-label` or a wrapping `<label>`; if the code reads the element back with `$('#id')`, keep a reference to the element instead (`var el = $(...)`) or use `self.find(...)`. `data-id` is not an `id` and is never reported.

### 93 x selector "..." is not scoped under .ui-markdown

- `selector ".markdown-small .markdown" is not scoped under .ui-markdown`
- `selector ".markdown" is not scoped under .ui-markdown`
- `selector ".markdown-container > *:last-child" is not scoped under .ui-markdown`
- `selector ".markdown code" is not scoped under .ui-markdown`
- `selector ".markdown h1" is not scoped under .ui-markdown`
- `selector ".markdown h2" is not scoped under .ui-markdown`
- `selector ".markdown h3" is not scoped under .ui-markdown`
- `selector ".markdown h4" is not scoped under .ui-markdown`
- `selector ".markdown h5" is not scoped under .ui-markdown`
- `selector ".markdown p" is not scoped under .ui-markdown`
- `selector ".markdown p code" is not scoped under .ui-markdown`
- `selector ".markdown li code" is not scoped under .ui-markdown`
- `selector ".markdown section code" is not scoped under .ui-markdown`
- `selector ".markdown blockquote code" is not scoped under .ui-markdown`
- `selector ".markdown h1 code" is not scoped under .ui-markdown`
- `selector ".markdown h2 code" is not scoped under .ui-markdown`
- `selector ".markdown h3 code" is not scoped under .ui-markdown`
- `selector ".markdown h4 code" is not scoped under .ui-markdown`
- `selector ".markdown td code" is not scoped under .ui-markdown`
- `selector ".markdown p code" is not scoped under .ui-markdown`
- `selector ".markdown section code" is not scoped under .ui-markdown`
- `selector ".markdown li code" is not scoped under .ui-markdown`
- `selector ".markdown blockquote code" is not scoped under .ui-markdown`
- `selector ".markdown td code" is not scoped under .ui-markdown`
- `selector ".markdown pre" is not scoped under .ui-markdown`
- `selector ".markdown pre code" is not scoped under .ui-markdown`
- `selector ".markdown table" is not scoped under .ui-markdown`
- `selector ".markdown ul" is not scoped under .ui-markdown`
- `selector ".markdown ul ul" is not scoped under .ui-markdown`
- `selector ".markdown img" is not scoped under .ui-markdown`
- `selector ".markdown th" is not scoped under .ui-markdown`
- `selector ".markdown blockquote" is not scoped under .ui-markdown`
- `selector ".markdown section" is not scoped under .ui-markdown`
- `selector ".markdown hr" is not scoped under .ui-markdown`
- `selector ".markdown-line2" is not scoped under .ui-markdown`
- `selector ".markdown h1 code" is not scoped under .ui-markdown`
- `selector ".markdown h2 code" is not scoped under .ui-markdown`
- `selector ".markdown h3 code" is not scoped under .ui-markdown`
- `selector ".markdown h4 code" is not scoped under .ui-markdown`
- `selector ".markdown a code" is not scoped under .ui-markdown`
- `selector ".markdown-footnote" is not scoped under .ui-markdown`
- `selector ".markdown-footnotebody" is not scoped under .ui-markdown`
- `selector ".markdown-showsecret" is not scoped under .ui-markdown`
- `selector ".markdown-showsecret b" is not scoped under .ui-markdown`
- `selector ".markdown-showsecret .pull-right" is not scoped under .ui-markdown`
- `selector ".markdown-secret" is not scoped under .ui-markdown`
- `selector ".markdown-secret > div" is not scoped under .ui-markdown`
- `selector ".markdown-small li code" is not scoped under .ui-markdown`
- `selector ".markdown-small section code" is not scoped under .ui-markdown`
- `selector ".markdown-small blockquote code" is not scoped under .ui-markdown`
- `selector ".markdown-small td code" is not scoped under .ui-markdown`
- `selector ".markdown-small pre code" is not scoped under .ui-markdown`
- `selector ".markdown-task > i:first-child" is not scoped under .ui-markdown`
- `selector ".markdown-code" is not scoped under .ui-markdown`
- `selector ".markdown-block" is not scoped under .ui-markdown`
- `selector ".markdown-block:last-child" is not scoped under .ui-markdown`
- `selector ".markdown-block > div" is not scoped under .ui-markdown`
- `selector ".markdown-block > div > *:last-child" is not scoped under .ui-markdown`
- `selector ".markdown-showblock" is not scoped under .ui-markdown`
- `selector ".markdown-showblock i" is not scoped under .ui-markdown`
- ... and 33 more, all of the same kind (see [warnings.md](../warnings.md))

**Possible fix**: rename the class so it starts with `.ui-markdown` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

