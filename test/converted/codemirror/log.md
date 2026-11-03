# Log: codemirror

Result of converting the old component with `tools/convert.js` and checking it with `node tools/check.js codemirror --legacy`. Type: **component**, jComponent: **v19**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: written by the AI from the readme and the code, check it.
- Preview: picture.jpg.

## Browser (Chrome, from disk)

- It opens in Chrome from disk without JavaScript errors of its own.

## Warnings

80 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 1 x it uses spa.min@19 (the component declares v19 only): it needs an update to run on jCompon

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

**How to fix**: change the two links of the `<head>` to `spa.min@20`, open the file in the browser and fix what the console reports (typical errors in v20: `NOTMODIFIED is not defined`, `EVALUATE is not defined`, `self.compile is not a function`), then set `jcomponent: v19,v20` in `readme.md`. If it cannot run on v20, leave it as it is.

### 79 x selector "..." is not scoped under .ui-codemirror

- `selector ".CodeMirror" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-scrollbar-filler" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-horizontal div" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-vertical div" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-horizontal" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-vertical" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-horizontal" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-horizontal div" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-vertical" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-simplescroll-vertical div" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll .CodeMirror-scrollbar-filler" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll .CodeMirror-gutter-filler" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-horizontal div" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-vertical div" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-horizontal" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-vertical" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-horizontal" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-horizontal div" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-vertical" is not scoped under .ui-codemirror`
- `selector ".CodeMirror-overlayscroll-vertical div" is not scoped under .ui-codemirror`
- `selector ".cm-trailingspace" is not scoped under .ui-codemirror`
- `selector ".cm-tab" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-variable-R" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-matchingtag" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-variable-R" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-variable-S" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-variable-J" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-variable-E" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-variable-B" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-dialog button" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-dialog" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-dialog input" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-activeline-background" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-s-default .cm-qualifier" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-s-default .cm-meta" is not scoped under .ui-codemirror`
- `selector ".ui-dark div.CodeMirror-selected" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-line::selection" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-line > span::selection" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-line > span > span::selection" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-line::-moz-selection" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-line > span::-moz-selection" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-line > span > span::-moz-selection" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-gutters" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-guttermarker" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-guttermarker-subtle" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-linenumber" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-cursor" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-scrollbar-filler" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-simplescroll-horizontal div" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-simplescroll-vertical div" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-simplescroll-horizontal" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-simplescroll-vertical" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-overlayscroll-horizontal div" is not scoped under .ui-codemirror`
- `selector ".ui-dark .CodeMirror-overlayscroll-vertical div" is not scoped under .ui-codemirror`
- `selector ".ui-dark .cm-tab" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-variable" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-variable-2" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-variable-3" is not scoped under .ui-codemirror`
- ... and 19 more, all of the same kind (see [warnings.md](../warnings.md))

**How to fix**: rename the class so it starts with `.ui-codemirror` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

Nothing: `check.js --legacy` reports no errors.

