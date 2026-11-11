# Log: datagrid

Result of converting the old component and checking it with `node tools/check.js datagrid --legacy`. Type: **component**, jComponent: **v20**. This file is evidence for the review; it is not part of the format of a component (`component.html`, `readme.md`, `preview.jpg`).

## What was done

- `component.css` -> `<style component>`, `component.js` -> `<script component>`, `example.html` -> the example, `dependencies.html` -> the `<head>`, `component.json` -> the frontmatter of `readme.md`. The code of the component was not changed (only the `self.nocompile()` call, which does nothing, was removed).
- Description: taken from the first sentence of the old readme.
- Preview: converted from gif.

## Browser (Chrome, from disk)

The file was opened with `spa.min@19` and with `spa.min@20` (the `<head>` was changed in a copy, the component was not touched).

| Library | Result |
| --- | --- |
| v19 | no JavaScript errors |
| v20 | no JavaScript errors |

It declares `v19,v20` and gives the same result in both versions.

## Warnings

182 warning(s). They are style rules for new components that the old code does not follow; nothing was rewritten because converting must not change the behaviour.

### 182 x selector "..." is not scoped under .ui-datagrid

- `selector ".dg" is not scoped under .ui-datagrid`
- `selector ".dg-body" is not scoped under .ui-datagrid`
- `selector ".dg .ui-scrollbar-y" is not scoped under .ui-datagrid`
- `selector ".dg .dg-header-scrollbar > .ui-scrollbar-area" is not scoped under .ui-datagrid`
- `selector ".dg .dg-body-scrollbar > .ui-scrollbar-area" is not scoped under .ui-datagrid`
- `selector ".dg-container" is not scoped under .ui-datagrid`
- `selector ".jc-19 .dg-container" is not scoped under .ui-datagrid`
- `selector ".jc-20 .dg-container" is not scoped under .ui-datagrid`
- `selector ".dg-mobile .dg-container" is not scoped under .ui-datagrid`
- `selector ".dg-header" is not scoped under .ui-datagrid`
- `selector ".dg-hrow" is not scoped under .ui-datagrid`
- `selector ".dg-hcol" is not scoped under .ui-datagrid`
- `selector ".dg-sort" is not scoped under .ui-datagrid`
- `selector ".dg-monospace" is not scoped under .ui-datagrid`
- `selector ".dg-btn-columns" is not scoped under .ui-datagrid`
- `selector ".dg-btn-columns span" is not scoped under .ui-datagrid`
- `selector ".dg-btn-columns:hover" is not scoped under .ui-datagrid`
- `selector ".dg-sorting" is not scoped under .ui-datagrid`
- `selector ".dg-label.right" is not scoped under .ui-datagrid`
- `selector ".dg-sorting .ti-arrows-v" is not scoped under .ui-datagrid`
- `selector ".dg-hcol:first-child" is not scoped under .ui-datagrid`
- `selector ".dg-resize" is not scoped under .ui-datagrid`
- `selector ".dg-label" is not scoped under .ui-datagrid`
- `selector ".dg-sorting .dg-label.center" is not scoped under .ui-datagrid`
- `selector ".dg-sorting .dg-label" is not scoped under .ui-datagrid`
- `selector ".dg-filter" is not scoped under .ui-datagrid`
- `selector ".dg-filter input" is not scoped under .ui-datagrid`
- `selector ".dg-filter label" is not scoped under .ui-datagrid`
- `selector ".dg-filter label" is not scoped under .ui-datagrid`
- `selector ".dg-filter.center input" is not scoped under .ui-datagrid`
- `selector ".dg-filter.right input" is not scoped under .ui-datagrid`
- `selector ".dg-filter-empty" is not scoped under .ui-datagrid`
- `selector ".dg-hcol .dg-label" is not scoped under .ui-datagrid`
- `selector ".dg-filter-selected" is not scoped under .ui-datagrid`
- `selector ".dg-filter-selected label" is not scoped under .ui-datagrid`
- `selector ".dg-filter > i" is not scoped under .ui-datagrid`
- `selector ".dg-filter-selected > i" is not scoped under .ui-datagrid`
- `selector ".dg-filter-selected input" is not scoped under .ui-datagrid`
- `selector ".dg-clickable .dg-row" is not scoped under .ui-datagrid`
- `selector ".dg-row" is not scoped under .ui-datagrid`
- `selector ".dg-row-changed" is not scoped under .ui-datagrid`
- `selector ".dg-row.dg-selected" is not scoped under .ui-datagrid`
- `selector ".dg-col" is not scoped under .ui-datagrid`
- `selector ".dg-col:first-child" is not scoped under .ui-datagrid`
- `selector ".dg-col-changed" is not scoped under .ui-datagrid`
- `selector ".dg-value" is not scoped under .ui-datagrid`
- `selector ".dg-number" is not scoped under .ui-datagrid`
- `selector ".dg-col--1" is not scoped under .ui-datagrid`
- `selector ".dg-col--1 .dg-label" is not scoped under .ui-datagrid`
- `selector ".dg-row-empty" is not scoped under .ui-datagrid`
- `selector ".dg-footer" is not scoped under .ui-datagrid`
- `selector ".dg-pagination" is not scoped under .ui-datagrid`
- `selector ".dg-pagination button" is not scoped under .ui-datagrid`
- `selector ".dg-pagination button:hover" is not scoped under .ui-datagrid`
- `selector ".dg-pagination button:disabled" is not scoped under .ui-datagrid`
- `selector ".dg-pagination button:first-child" is not scoped under .ui-datagrid`
- `selector ".dg-pagination button[name='page-prev']" is not scoped under .ui-datagrid`
- `selector ".dg-pagination button[name='page-last']" is not scoped under .ui-datagrid`
- `selector ".dg-pagination input" is not scoped under .ui-datagrid`
- `selector ".dg-pagination > div" is not scoped under .ui-datagrid`
- ... and 122 more, all of the same kind (see [warnings.md](../warnings.md))

**Possible fix**: rename the class so it starts with `.ui-datagrid` (for example `.ui-name-part`), in the CSS **and** in every place of the JavaScript or the example that writes or searches that class. If the class is a public one that applications already style (for example `.markdown`), leave it: renaming it changes the markup that other code depends on.

## Still to finish

### Options of the default configuration that the readme does not document

The code defines these options and `readme.md` does not say what they do. Possible fix: read what the code does with `config.<key>` and add one bullet per option under `__Configuration__:`. Draft lines (the type is guessed from the default, the description must be written):

- `buttonreset {String}` TODO describe what it does (default: `Reset`)
- `fullwidth_xs {Boolean}` TODO describe what it does (default: `false`)
- `dirplaceholder {String}` TODO describe what it does (default: `Search`)

