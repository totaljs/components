# Log of the conversion

What was seen while converting 329 components with `tools/convert.js` and checking them with `tools/check.js --legacy` and in Chrome. Generated on 2026-11-03 10:52. The summary is in [readme.md](readme.md).

## 1. Warnings (style rules of the new components that the old code does not follow)

**727 warnings** in 139 components. They are warnings, not errors, because converting must not change the behaviour of a component: `check.js --legacy` reports them and does not rewrite anything.

| Warning | Count |
| --- | --- |
| selector "..." is not scoped under .ui-<name> | 572 |
| it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20 | 70 |
| id="..." attributes in the component, use aria-label or a wrapping <label> | 58 |
| self.release() is a no-op in jComponent v20, remove it | 20 |
| selector "..."text"..." is not scoped under .ui-<name> | 3 |
| selector "..."password"..." is not scoped under .ui-<name> | 2 |
| self.bindvisible() is a no-op in jComponent v20, remove it | 1 |
| console.log in the component | 1 |

Top components by number of warnings:

| Component | Warnings |
| --- | --- |
| [datagrid](datagrid/component.html) | 183 |
| [markdown](markdown/component.html) | 94 |
| [codemirror](codemirror/component.html) | 80 |
| [objecteditor](objecteditor/component.html) | 47 |
| [multioptions](multioptions/component.html) | 42 |
| [wiki](wiki/component.html) | 34 |
| [textbox](textbox/component.html) | 13 |
| [clbind](clbind/component.html) | 13 |
| [notifications](notifications/component.html) | 12 |
| [jsontree](jsontree/component.html) | 11 |
| [display](display/component.html) | 10 |
| [markdowneditor](markdowneditor/component.html) | 6 |
| [noscrollbar](noscrollbar/component.html) | 5 |
| [leaflet](leaflet/component.html) | 5 |
| [grid](grid/component.html) | 4 |

`datagrid` has so many because its CSS uses its own prefixes (`.dg`, `.dg-col`, `.dg-pagination`...) instead of `.ui-datagrid`; the same happens with `markdown`, `codemirror`, `objecteditor` and `multioptions`. Renaming them would change the CSS and the JavaScript of the component, so it was not done.

### Detail per component

<details><summary><b>datagrid</b> (183)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector ".dg" is not scoped under .ui-datagrid
- component.html: selector ".dg-body" is not scoped under .ui-datagrid
- component.html: selector ".dg .ui-scrollbar-y" is not scoped under .ui-datagrid
- component.html: selector ".dg .dg-header-scrollbar > .ui-scrollbar-area" is not scoped under .ui-datagrid
- component.html: selector ".dg .dg-body-scrollbar > .ui-scrollbar-area" is not scoped under .ui-datagrid
- component.html: selector ".dg-container" is not scoped under .ui-datagrid
- component.html: selector ".jc-19 .dg-container" is not scoped under .ui-datagrid
- component.html: selector ".jc-20 .dg-container" is not scoped under .ui-datagrid
- component.html: selector ".dg-mobile .dg-container" is not scoped under .ui-datagrid
- component.html: selector ".dg-header" is not scoped under .ui-datagrid
- component.html: selector ".dg-hrow" is not scoped under .ui-datagrid
- component.html: selector ".dg-hcol" is not scoped under .ui-datagrid
- component.html: selector ".dg-sort" is not scoped under .ui-datagrid
- component.html: selector ".dg-monospace" is not scoped under .ui-datagrid
- component.html: selector ".dg-btn-columns" is not scoped under .ui-datagrid
- component.html: selector ".dg-btn-columns span" is not scoped under .ui-datagrid
- component.html: selector ".dg-btn-columns:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-sorting" is not scoped under .ui-datagrid
- component.html: selector ".dg-label.right" is not scoped under .ui-datagrid
- component.html: selector ".dg-sorting .ti-arrows-v" is not scoped under .ui-datagrid
- component.html: selector ".dg-hcol:first-child" is not scoped under .ui-datagrid
- component.html: selector ".dg-resize" is not scoped under .ui-datagrid
- component.html: selector ".dg-label" is not scoped under .ui-datagrid
- component.html: selector ".dg-sorting .dg-label.center" is not scoped under .ui-datagrid
- component.html: selector ".dg-sorting .dg-label" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter input" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter label" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter label" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter.center input" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter.right input" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter-empty" is not scoped under .ui-datagrid
- component.html: selector ".dg-hcol .dg-label" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter-selected" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter-selected label" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter > i" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter-selected > i" is not scoped under .ui-datagrid
- component.html: selector ".dg-filter-selected input" is not scoped under .ui-datagrid
- component.html: selector ".dg-clickable .dg-row" is not scoped under .ui-datagrid
- component.html: selector ".dg-row" is not scoped under .ui-datagrid
- component.html: selector ".dg-row-changed" is not scoped under .ui-datagrid
- component.html: selector ".dg-row.dg-selected" is not scoped under .ui-datagrid
- component.html: selector ".dg-col" is not scoped under .ui-datagrid
- component.html: selector ".dg-col:first-child" is not scoped under .ui-datagrid
- component.html: selector ".dg-col-changed" is not scoped under .ui-datagrid
- component.html: selector ".dg-value" is not scoped under .ui-datagrid
- component.html: selector ".dg-number" is not scoped under .ui-datagrid
- component.html: selector ".dg-col--1" is not scoped under .ui-datagrid
- component.html: selector ".dg-col--1 .dg-label" is not scoped under .ui-datagrid
- component.html: selector ".dg-row-empty" is not scoped under .ui-datagrid
- component.html: selector ".dg-footer" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination button" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination button:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination button:disabled" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination button:first-child" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination button[name='page-prev']" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination button[name='page-last']" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination input" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination > div" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination-items" is not scoped under .ui-datagrid
- component.html: selector ".dg-pagination-pages" is not scoped under .ui-datagrid
- component.html: selector ".dg-visible" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-checkbox > span" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-checkbox > span i" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-checkbox-checked > span" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-checkbox-checked > span i" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns > div" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-body" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns label" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns label input" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns label span" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-button" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-button:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-columns-button i" is not scoped under .ui-datagrid
- component.html: selector ".dt-columns-reset" is not scoped under .ui-datagrid
- component.html: selector ".dt-columns-reset:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-hcol .dg-checkbox" is not scoped under .ui-datagrid
- component.html: selector ".dg-checkbox" is not scoped under .ui-datagrid
- component.html: selector ".dg-checkbox i" is not scoped under .ui-datagrid
- component.html: selector ".dg-checked" is not scoped under .ui-datagrid
- component.html: selector ".dg-checked i" is not scoped under .ui-datagrid
- component.html: selector ".dg-required:before" is not scoped under .ui-datagrid
- component.html: selector ".dg input:-ms-input-placeholder" is not scoped under .ui-datagrid
- component.html: selector ".dg input::placeholder" is not scoped under .ui-datagrid
- component.html: selector ".dg input::-ms-input-placeholder" is not scoped under .ui-datagrid
- component.html: selector ".dg-col button" is not scoped under .ui-datagrid
- component.html: selector ".dg-col button:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-col button[name='remove']" is not scoped under .ui-datagrid
- component.html: selector ".dg-col button[name='remove']:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-col button:first-child" is not scoped under .ui-datagrid
- component.html: selector ".dg-col button:last-child" is not scoped under .ui-datagrid
- component.html: selector ".dg-col button:disabled" is not scoped under .ui-datagrid
- component.html: selector ".dg-editable .dg-checkbox" is not scoped under .ui-datagrid
- component.html: selector ".dg-editable > div > .dg-checkbox" is not scoped under .ui-datagrid
- component.html: selector ".dg-checkbox-main" is not scoped under .ui-datagrid
- component.html: selector ".dg-bool" is not scoped under .ui-datagrid
- component.html: selector ".dg-bool .dg-checked" is not scoped under .ui-datagrid
- component.html: selector ".dg-editable" is not scoped under .ui-datagrid
- component.html: selector ".dg-editable input" is not scoped under .ui-datagrid
- component.html: selector ".dg-noscroll .ui-scrollbar-area" is not scoped under .ui-datagrid
- component.html: selector ".dg-noscroll .ui-scrollbar-y span" is not scoped under .ui-datagrid
- component.html: selector ".dg-noborder .dg-container" is not scoped under .ui-datagrid
- component.html: selector ".dg-noborder .dg-footer" is not scoped under .ui-datagrid
- component.html: selector ".dg-header-scrollbar" is not scoped under .ui-datagrid
- component.html: selector ".dg-header-scrollbar-container" is not scoped under .ui-datagrid
- component.html: selector ".dg-resize-line" is not scoped under .ui-datagrid
- component.html: selector ".dg-colorize" is not scoped under .ui-datagrid
- component.html: selector ".dg-fluid" is not scoped under .ui-datagrid
- component.html: selector ".dg-noborder.dg-fluid" is not scoped under .ui-datagrid
- component.html: selector ".dg-link" is not scoped under .ui-datagrid
- component.html: selector ".dg-link i" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls button" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls button i" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls button span" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls button:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls button:first-child" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls button:disabled" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls button:disabled i" is not scoped under .ui-datagrid
- component.html: selector ".dg-controls-visible" is not scoped under .ui-datagrid
- component.html: selector ".dg-row:hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-row-hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-body" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-hcol" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-footer" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-container" is not scoped under .ui-datagrid
- component.html: selector ".jc-19.ui-dark .dg-container" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-mobile .dg-container" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-header" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-noborder .dg-footer" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-filter-selected" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-filter-selected label" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-sorting .ti-arrows-v" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-filter" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-resize" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-filter-empty" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-number" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-col" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-hcol" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-hrow" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-row-empty" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-row" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-selected" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-columns" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-columns-checkbox > span" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-columns-checkbox-checked > span" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-columns > div" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-row-changed:hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-row-changed" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-row-changed.dg-row:nth-child(even)" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-btn-columns:hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-col button" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-col button:hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-col button:first-child" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-col button[name='remove']" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-col button:disabled" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-checkbox" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-checked" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-btn-columns" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-btn-columns span" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-btn-columns:hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-pagination button" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-pagination button:hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-pagination button:disabled" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-pagination button[name='page-prev']" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-pagination button[name='page-last']" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-bool .dg-checked" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-editable" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-resize-line" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-fluid" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-controls" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-controls button" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-controls button:disabled" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-controls button:disabled i" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-controls button:hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-row:hover" is not scoped under .ui-datagrid
- component.html: selector ".ui-dark .dg-row-hover" is not scoped under .ui-datagrid
- component.html: selector ".dg-hfunc" is not scoped under .ui-datagrid

</details>

<details><summary><b>markdown</b> (94)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector ".markdown-small .markdown" is not scoped under .ui-markdown
- component.html: selector ".markdown" is not scoped under .ui-markdown
- component.html: selector ".markdown-container > *:last-child" is not scoped under .ui-markdown
- component.html: selector ".markdown code" is not scoped under .ui-markdown
- component.html: selector ".markdown h1" is not scoped under .ui-markdown
- component.html: selector ".markdown h2" is not scoped under .ui-markdown
- component.html: selector ".markdown h3" is not scoped under .ui-markdown
- component.html: selector ".markdown h4" is not scoped under .ui-markdown
- component.html: selector ".markdown h5" is not scoped under .ui-markdown
- component.html: selector ".markdown p" is not scoped under .ui-markdown
- component.html: selector ".markdown p code" is not scoped under .ui-markdown
- component.html: selector ".markdown li code" is not scoped under .ui-markdown
- component.html: selector ".markdown section code" is not scoped under .ui-markdown
- component.html: selector ".markdown blockquote code" is not scoped under .ui-markdown
- component.html: selector ".markdown h1 code" is not scoped under .ui-markdown
- component.html: selector ".markdown h2 code" is not scoped under .ui-markdown
- component.html: selector ".markdown h3 code" is not scoped under .ui-markdown
- component.html: selector ".markdown h4 code" is not scoped under .ui-markdown
- component.html: selector ".markdown td code" is not scoped under .ui-markdown
- component.html: selector ".markdown p code" is not scoped under .ui-markdown
- component.html: selector ".markdown section code" is not scoped under .ui-markdown
- component.html: selector ".markdown li code" is not scoped under .ui-markdown
- component.html: selector ".markdown blockquote code" is not scoped under .ui-markdown
- component.html: selector ".markdown td code" is not scoped under .ui-markdown
- component.html: selector ".markdown pre" is not scoped under .ui-markdown
- component.html: selector ".markdown pre code" is not scoped under .ui-markdown
- component.html: selector ".markdown table" is not scoped under .ui-markdown
- component.html: selector ".markdown ul" is not scoped under .ui-markdown
- component.html: selector ".markdown ul ul" is not scoped under .ui-markdown
- component.html: selector ".markdown img" is not scoped under .ui-markdown
- component.html: selector ".markdown th" is not scoped under .ui-markdown
- component.html: selector ".markdown blockquote" is not scoped under .ui-markdown
- component.html: selector ".markdown section" is not scoped under .ui-markdown
- component.html: selector ".markdown hr" is not scoped under .ui-markdown
- component.html: selector ".markdown-line2" is not scoped under .ui-markdown
- component.html: selector ".markdown h1 code" is not scoped under .ui-markdown
- component.html: selector ".markdown h2 code" is not scoped under .ui-markdown
- component.html: selector ".markdown h3 code" is not scoped under .ui-markdown
- component.html: selector ".markdown h4 code" is not scoped under .ui-markdown
- component.html: selector ".markdown a code" is not scoped under .ui-markdown
- component.html: selector ".markdown-footnote" is not scoped under .ui-markdown
- component.html: selector ".markdown-footnotebody" is not scoped under .ui-markdown
- component.html: selector ".markdown-showsecret" is not scoped under .ui-markdown
- component.html: selector ".markdown-showsecret b" is not scoped under .ui-markdown
- component.html: selector ".markdown-showsecret .pull-right" is not scoped under .ui-markdown
- component.html: selector ".markdown-secret" is not scoped under .ui-markdown
- component.html: selector ".markdown-secret > div" is not scoped under .ui-markdown
- component.html: selector ".markdown-small li code" is not scoped under .ui-markdown
- component.html: selector ".markdown-small section code" is not scoped under .ui-markdown
- component.html: selector ".markdown-small blockquote code" is not scoped under .ui-markdown
- component.html: selector ".markdown-small td code" is not scoped under .ui-markdown
- component.html: selector ".markdown-small pre code" is not scoped under .ui-markdown
- component.html: selector ".markdown-task > i:first-child" is not scoped under .ui-markdown
- component.html: selector ".markdown-code" is not scoped under .ui-markdown
- component.html: selector ".markdown-block" is not scoped under .ui-markdown
- component.html: selector ".markdown-block:last-child" is not scoped under .ui-markdown
- component.html: selector ".markdown-block > div" is not scoped under .ui-markdown
- component.html: selector ".markdown-block > div > *:last-child" is not scoped under .ui-markdown
- component.html: selector ".markdown-showblock" is not scoped under .ui-markdown
- component.html: selector ".markdown-showblock i" is not scoped under .ui-markdown
- component.html: selector ".markdown-showblock-visible" is not scoped under .ui-markdown
- component.html: selector ".markdown-video" is not scoped under .ui-markdown
- component.html: selector ".markdown-video iframe" is not scoped under .ui-markdown
- component.html: selector ".markdown-small p" is not scoped under .ui-markdown
- component.html: selector ".markdown-small section" is not scoped under .ui-markdown
- component.html: selector ".markdown-small blockquote" is not scoped under .ui-markdown
- component.html: selector ".markdown-small table" is not scoped under .ui-markdown
- component.html: selector ".markdown-small .markdown-code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown blockquote" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown th" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h2" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h1" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h1 code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown hr" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h2 code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h3 code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h4 code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown section" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown a code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h4" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown h5" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown p code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown section code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown li code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown blockquote code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown td code" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown-footnote" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown-footnotebody" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown-block > div" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown-showblock" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown-secret" is not scoped under .ui-markdown
- component.html: selector ".ui-dark .markdown-secret > div" is not scoped under .ui-markdown

</details>

<details><summary><b>codemirror</b> (80)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".CodeMirror" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-scrollbar-filler" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-horizontal div" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-vertical div" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-horizontal" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-vertical" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-horizontal" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-horizontal div" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-vertical" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-simplescroll-vertical div" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll .CodeMirror-scrollbar-filler" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll .CodeMirror-gutter-filler" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-horizontal div" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-vertical div" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-horizontal" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-vertical" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-horizontal" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-horizontal div" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-vertical" is not scoped under .ui-codemirror
- component.html: selector ".CodeMirror-overlayscroll-vertical div" is not scoped under .ui-codemirror
- component.html: selector ".cm-trailingspace" is not scoped under .ui-codemirror
- component.html: selector ".cm-tab" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-variable-R" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-matchingtag" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-variable-R" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-variable-S" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-variable-J" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-variable-E" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-variable-B" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-dialog button" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-dialog" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-dialog input" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-activeline-background" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-s-default .cm-qualifier" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-s-default .cm-meta" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark div.CodeMirror-selected" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-line::selection" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-line > span::selection" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-line > span > span::selection" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-line::-moz-selection" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-line > span::-moz-selection" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-line > span > span::-moz-selection" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-gutters" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-guttermarker" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-guttermarker-subtle" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-linenumber" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-cursor" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-scrollbar-filler" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-simplescroll-horizontal div" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-simplescroll-vertical div" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-simplescroll-horizontal" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-simplescroll-vertical" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-overlayscroll-horizontal div" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .CodeMirror-overlayscroll-vertical div" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark .cm-tab" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-variable" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-variable-2" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-variable-3" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-type" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-def" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-bracket" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-tag" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-header" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-link" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-error" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-comment" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-atom" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-number" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-comment.cm-attribute" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-comment.cm-def" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-comment.cm-tag" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-comment.cm-type" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-property" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-attribute" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-keyword" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-builtin" is not scoped under .ui-codemirror
- component.html: selector ".ui-dark span.cm-string" is not scoped under .ui-codemirror

</details>

<details><summary><b>objecteditor</b> (47)</summary>

- component.html: selector ".ui-oe" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe input" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe textarea" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-group" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-group > .ui-oe-label" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-group > .ui-oe-items > .ui-oe-item span" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-array" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-array > .ui-oe-label" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-array > .ui-oe-items > .ui-oe-item span" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-item:last-child span" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-item:last-child .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-label" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-label span" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-label .ti" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-null" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-null .ui-oe-label" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-null .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-date" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-date .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-date input" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-string" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-string .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-string input" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-string-multiline" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-string-multiline .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-string-multiline textarea" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-string-multiline .ui-oe-label span" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-number" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-number .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-number input" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-boolean" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-boolean .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-boolean .ui-eo-checkbox" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-boolean .ui-eo-checkbox .ti" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-boolean .ui-eo-checkbox.checked .ti" is not scoped under .ui-objecteditor
- component.html: selector ".ui-oe-boolean .ui-eo-checkbox.checked" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-number input" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-string input" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-date input" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-group > .ui-oe-label" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-control" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-label span" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-array > .ui-oe-label" is not scoped under .ui-objecteditor
- component.html: selector ".ui-dark .ui-oe-array" is not scoped under .ui-objecteditor

</details>

<details><summary><b>multioptions</b> (42)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".ui-moi-name" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputtext" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputarea" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputnumber input" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputnumber" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputnumber-buttons" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputnumber-buttons span" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputnumber-buttons span:hover" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputpath input" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputpath" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputpath-buttons" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputpath-buttons span" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputpath-buttons span:hover" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputdate input" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputdate" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputdate-buttons" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputdate-buttons span" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-inputdate-buttons span:hover" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-colors" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-colors span" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-colors .ti" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-colors .selected .ti" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-select" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-select select" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-select .ti" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-boolean" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-boolean .ti" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-boolean.checked .ti" is not scoped under .ui-multioptions
- component.html: selector ".ui-moi-value-boolean.checked" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-inputdate input" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-inputpath input" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-inputtext" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-inputarea" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-select select" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-select" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-inputnumber input" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-inputnumber-buttons span" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-inputnumber-buttons span:hover" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-boolean" is not scoped under .ui-multioptions
- component.html: selector ".ui-dark .ui-moi-value-boolean.checked" is not scoped under .ui-multioptions

</details>

<details><summary><b>wiki</b> (34)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".hljs-quote" is not scoped under .ui-wiki
- component.html: selector ".hljs-selector-tag" is not scoped under .ui-wiki
- component.html: selector ".hljs-subst" is not scoped under .ui-wiki
- component.html: selector ".hljs-literal" is not scoped under .ui-wiki
- component.html: selector ".hljs-variable" is not scoped under .ui-wiki
- component.html: selector ".hljs-template-variable" is not scoped under .ui-wiki
- component.html: selector ".hljs-tag .hljs-attr" is not scoped under .ui-wiki
- component.html: selector ".hljs-doctag" is not scoped under .ui-wiki
- component.html: selector ".hljs-section" is not scoped under .ui-wiki
- component.html: selector ".hljs-selector-id" is not scoped under .ui-wiki
- component.html: selector ".hljs-class .hljs-title" is not scoped under .ui-wiki
- component.html: selector ".hljs-name" is not scoped under .ui-wiki
- component.html: selector ".hljs-attribute" is not scoped under .ui-wiki
- component.html: selector ".hljs-link" is not scoped under .ui-wiki
- component.html: selector ".hljs-bullet" is not scoped under .ui-wiki
- component.html: selector ".hljs-builtin-name" is not scoped under .ui-wiki
- component.html: selector ".hljs-quote" is not scoped under .ui-wiki
- component.html: selector ".hljs-selector-tag" is not scoped under .ui-wiki
- component.html: selector ".hljs-subst" is not scoped under .ui-wiki
- component.html: selector ".hljs-literal" is not scoped under .ui-wiki
- component.html: selector ".hljs-variable" is not scoped under .ui-wiki
- component.html: selector ".hljs-template-variable" is not scoped under .ui-wiki
- component.html: selector ".hljs-tag .hljs-attr" is not scoped under .ui-wiki
- component.html: selector ".hljs-doctag" is not scoped under .ui-wiki
- component.html: selector ".hljs-title" is not scoped under .ui-wiki
- component.html: selector ".hljs-section" is not scoped under .ui-wiki
- component.html: selector ".hljs-selector-id" is not scoped under .ui-wiki
- component.html: selector ".hljs-class .hljs-title" is not scoped under .ui-wiki
- component.html: selector ".hljs-name" is not scoped under .ui-wiki
- component.html: selector ".hljs-attribute" is not scoped under .ui-wiki
- component.html: selector ".hljs-link" is not scoped under .ui-wiki
- component.html: selector ".hljs-bullet" is not scoped under .ui-wiki
- component.html: selector ".hljs-builtin-name" is not scoped under .ui-wiki

</details>

<details><summary><b>textbox</b> (13)</summary>

- component.html: selector "input:-ms-input-placeholder" is not scoped under .ui-textbox
- component.html: selector "input:-webkit-input-placeholder" is not scoped under .ui-textbox
- component.html: selector "input:-moz-input-placeholder" is not scoped under .ui-textbox
- component.html: selector "input[type="text"]:disabled" is not scoped under .ui-textbox
- component.html: selector "input[type="password"]:disabled" is not scoped under .ui-textbox
- component.html: selector "input:invalid" is not scoped under .ui-textbox
- component.html: selector ".ui-right" is not scoped under .ui-textbox
- component.html: selector ".ui-center" is not scoped under .ui-textbox
- component.html: selector ".ui-dark input:-ms-input-placeholder" is not scoped under .ui-textbox
- component.html: selector ".ui-dark input:-webkit-input-placeholder" is not scoped under .ui-textbox
- component.html: selector ".ui-dark input:-moz-input-placeholder" is not scoped under .ui-textbox
- component.html: selector ".ui-dark input[type="text"]:disabled" is not scoped under .ui-textbox
- component.html: selector ".ui-dark input[type="password"]:disabled" is not scoped under .ui-textbox

</details>

<details><summary><b>clbind</b> (13)</summary>

- component.html: selector ".animation" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-1-init" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-1-run" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-2-init" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-2-run" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-3-init" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-3-run" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-4-init" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-4-run" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-5-init" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-5-run" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-6-init" is not scoped under .ui-clbind
- component.html: selector ".ui-animation-6-run" is not scoped under .ui-clbind

</details>

<details><summary><b>notifications</b> (12)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector ".ui-notification-container" is not scoped under .ui-notifications
- component.html: selector ".ui-notification" is not scoped under .ui-notifications
- component.html: selector ".ui-notification > i" is not scoped under .ui-notifications
- component.html: selector ".ui-notification > i:active" is not scoped under .ui-notifications
- component.html: selector ".ui-notification > i:hover" is not scoped under .ui-notifications
- component.html: selector ".ui-notification-icon" is not scoped under .ui-notifications
- component.html: selector ".ui-notification-message" is not scoped under .ui-notifications
- component.html: selector ".ui-notification-datetime" is not scoped under .ui-notifications
- component.html: selector ".ui-notification-hide" is not scoped under .ui-notifications
- component.html: selector ".ui-notification-container" is not scoped under .ui-notifications

</details>

<details><summary><b>jsontree</b> (11)</summary>

- component.html: selector ".jsontree-tree" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-tree .spacer" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-tree .treeitem" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-tree .treeitem > div > img" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-tree .treeitem span" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-tree .treeitem span:hover" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-tree .treeitem img" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-textarea" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-label" is not scoped under .ui-jsontree
- component.html: selector ".jsontree-label > button" is not scoped under .ui-jsontree
- component.html: selector ".ti-rotate-90" is not scoped under .ui-jsontree

</details>

<details><summary><b>display</b> (10)</summary>

- component.html: selector ".ui-centered-noscroll" is not scoped under .ui-display
- component.html: selector ".ui-centered-noscroll body" is not scoped under .ui-display
- component.html: selector ".ui-centered-container" is not scoped under .ui-display
- component.html: selector ".ui-centered-body" is not scoped under .ui-display
- component.html: selector ".ui-centered-content" is not scoped under .ui-display
- component.html: selector ".ui-centered-button" is not scoped under .ui-display
- component.html: selector ".ui-centered-button:active" is not scoped under .ui-display
- component.html: selector ".ui-centered-button:hover" is not scoped under .ui-display
- component.html: selector ".ui-dark .ui-centered-container" is not scoped under .ui-display
- component.html: selector ".ui-dark .ui-centered-button" is not scoped under .ui-display

</details>

<details><summary><b>markdowneditor</b> (6)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".ui-markdown-editor-label" is not scoped under .ui-markdowneditor
- component.html: selector ".ui-markdown-editor-label .ti" is not scoped under .ui-markdowneditor
- component.html: selector ".ui-markdown-editor-label-required" is not scoped under .ui-markdowneditor
- component.html: selector ".ui-markdown-editor-label-required:before" is not scoped under .ui-markdowneditor
- component.html: selector ".ui-markdown-editor-invalid" is not scoped under .ui-markdowneditor

</details>

<details><summary><b>noscrollbar</b> (5)</summary>

- component.html: selector ".ui-viewbox" is not scoped under .ui-noscrollbar
- component.html: selector ".ui-viewbox-disabled" is not scoped under .ui-noscrollbar
- component.html: selector ".ui-viewbox-hidden" is not scoped under .ui-noscrollbar
- component.html: selector ".ui-viewbox-centered-table" is not scoped under .ui-noscrollbar
- component.html: selector ".ui-viewbox-centered-cell" is not scoped under .ui-noscrollbar

</details>

<details><summary><b>leaflet</b> (5)</summary>

- component.html: selector ".leaflet-container" is not scoped under .ui-leaflet
- component.html: selector ".leaflet-container .leaflet-control-attribution" is not scoped under .ui-leaflet
- component.html: selector ".leaflet-container .leaflet-control-attribution a" is not scoped under .ui-leaflet
- component.html: selector ".ui-dark .leaflet-container .leaflet-control-attribution" is not scoped under .ui-leaflet
- component.html: selector ".ui-dark .leaflet-container .leaflet-control-attribution a" is not scoped under .ui-leaflet

</details>

<details><summary><b>grid</b> (4)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".left input[type="text"]" is not scoped under .ui-grid
- component.html: selector ".right" is not scoped under .ui-grid
- component.html: selector ".center" is not scoped under .ui-grid

</details>

<details><summary><b>floatingbox</b> (4)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector ".floatingbox" is not scoped under .ui-floatingbox
- component.html: selector ".floatingbox-visible" is not scoped under .ui-floatingbox
- component.html: selector ".ui-dark .floatingbox" is not scoped under .ui-floatingbox

</details>

<details><summary><b>swiper</b> (3)</summary>

- component.html: selector ".ui-wiper-button-next.swiper-button-next:after" is not scoped under .ui-swiper
- component.html: selector ".ui-wiper-button-prev.swiper-button-prev:after" is not scoped under .ui-swiper
- component.html: selector ".ui-wiper-pagination .swiper-pagination-bullet-active" is not scoped under .ui-swiper

</details>

<details><summary><b>svgicons</b> (3)</summary>

- component.html: selector ".ui-svgicon-b" is not scoped under .ui-svgicons
- component.html: selector ".selected .ui-svgicon-a" is not scoped under .ui-svgicons
- component.html: selector ".selected .ui-svgicon-b" is not scoped under .ui-svgicons

</details>

<details><summary><b>properties2</b> (3)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector "#properties2upload" is not scoped under .ui-properties2

</details>

<details><summary><b>properties</b> (3)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector "#propertiesupload" is not scoped under .ui-properties

</details>

<details><summary><b>listmenu</b> (3)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".listmenu a" is not scoped under .ui-listmenu
- component.html: selector ".listmenu .selected" is not scoped under .ui-listmenu

</details>

<details><summary><b>layer</b> (3)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>largeform</b> (3)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it
- component.html: selector ".ui-form-title > span" is not scoped under .ui-largeform

</details>

<details><summary><b>inlineform</b> (3)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>fullform</b> (3)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it
- component.html: selector ".ui-form-title > span" is not scoped under .ui-fullform

</details>

<details><summary><b>window</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>upload</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>treeview</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>singleupload</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>scanner</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: console.log in the component

</details>

<details><summary><b>planner</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector ".ui-dark .svg-text" is not scoped under .ui-planner

</details>

<details><summary><b>panel</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>page</b> (2)</summary>

- component.html: self.release() is a no-op in jComponent v20, remove it
- component.html: selector ".page" is not scoped under .ui-page

</details>

<details><summary><b>modal</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>miniform</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>kanban</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>form</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>flow</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: selector ".ui-dark #ui-flow-arrow" is not scoped under .ui-flow

</details>

<details><summary><b>fixedmodal</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>fileuploadlist</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>fileupload</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>emoji</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>editable</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".editable-multiline" is not scoped under .ui-editable

</details>

<details><summary><b>duplicator</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>diagram</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>contenteditable</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>checkboxlist</b> (2)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20
- component.html: selector ".ui-dark .ui-checkbox.ui-disabled div" is not scoped under .ui-checkboxlist

</details>

<details><summary><b>box</b> (2)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>
- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>wysiwyg</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>wizardexpert</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>windows</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>websocket</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>tour</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>touchmove</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>tooltip</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>togglebutton</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>togglebox</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>textboxtags</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>textboxlist</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>tagger</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>tabs</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>submit</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>splashscreen</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>serverlist</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>servergrid</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>section</b> (1)</summary>

- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>scrollbar</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>repeatergroup</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>repeater</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>releaser</b> (1)</summary>

- component.html: self.bindvisible() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>range</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>radiobutton</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>prompt</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>pricerange</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>pictureuploadexpert</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>pictureupload</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>pictures</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>permissionsop</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>permissions</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>period</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>part</b> (1)</summary>

- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>paper</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>pagination</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>objecttree</b> (1)</summary>

- component.html: selector ".ti-rotate-270" is not scoped under .ui-objecttree

</details>

<details><summary><b>notify</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>nosqlcounter</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>navigation</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>monthlycalendar</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>modificator</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>markdownpreview</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>mapmarker</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>map</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>livestats</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>listbox</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>lazyload</b> (1)</summary>

- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>lazycontent</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>layout</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>isopen</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>intro</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>inlineproperties</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>infowindows</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>info</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>infinitescroll</b> (1)</summary>

- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>importcsv</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>iframepreview</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>iframeeditable</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>highlightsyntax</b> (1)</summary>

- component.html: selector "pre" is not scoped under .ui-highlightsyntax

</details>

<details><summary><b>formtab</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>fontawesomebox</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>fontawesome</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>filter</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>faiconsbutton</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>faicons</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>exec</b> (1)</summary>

- component.html: selector ".exec" is not scoped under .ui-exec

</details>

<details><summary><b>emojibutton</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>dropdownlist</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>dropdown</b> (1)</summary>

- component.html: selector ".ui-disabled select" is not scoped under .ui-dropdown

</details>

<details><summary><b>dragdropfiles</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>dockable</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>disable</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>developer</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>detail</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>dashboard</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>countdown</b> (1)</summary>

- component.html: selector ".avatar" is not scoped under .ui-countdown

</details>

<details><summary><b>cookie2</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>cookie</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>console</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>clock</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>clipboard</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>clickbox</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>click</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>chunkyscroll</b> (1)</summary>

- component.html: self.release() is a no-op in jComponent v20, remove it

</details>

<details><summary><b>children</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>checkbox</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>calendar</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>button</b> (1)</summary>

- component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20

</details>

<details><summary><b>avatar</b> (1)</summary>

- component.html: selector ".avatar" is not scoped under .ui-avatar

</details>

<details><summary><b>attachments</b> (1)</summary>

- component.html: id="..." attributes in the component, use aria-label or a wrapping <label>

</details>

<details><summary><b>animation</b> (1)</summary>

- component.html: selector ".animation" is not scoped under .ui-animation

</details>

## 2. Messages of the browser test

Each `component.html` was opened from disk in Chrome (headless, 800x600) and the JavaScript errors and console errors were collected.

Result of the run that is reported in the readme: **326 without messages, 3 with a message**. They come from the test environment, not from the conversion:

| Component | Message |
| --- | --- |
| audio | `ERR play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD` |
| datasource | `CON Access to XMLHttpRequest at 'https://www.totaljs.com/dashboard.json' from origin 'null' has been blocked by CORS policy: Response to preflight request doesn` |
| svgicons | `CON Unsafe attempt to load URL file:///svgicons.svg#phone from frame with URL file:///private/tmp/claude-501/-Volumes-Grey-GitHub-forge/fb219623-c588-470a-b816-` |

Other messages seen in earlier runs, with the same cause (the environment): `map` and `mapmarker` (`Google Maps JavaScript API error: ApiProjectMapError`, the example needs a key), `iframe` (`Permissions policy violation: accelerometer is not allowed in this document`).

14 components have no `<ui-component>` tag in the example (popups, forms and singletons that are opened from code): box, changer, floweditor, form, formtab, fullform, largeform, miniform, panel, permissionsop, serviceworker, uieditor, uistudio, websocket. They load without errors, but the browser test does not show anything of them.

## 3. What failed and was fixed in the process

| What was seen | Cause | Fix |
| --- | --- | --- |
| 8 components failed in Chrome after converting: `NOTMODIFIED is not defined` (`repeatergroup`, `textboxtags`), `EVALUATE is not defined` (`disable`), `self.compile is not a function` (`repeater`), `self.path.replace is not a function` (`submit`), `Maximum call stack size exceeded` (`pagination`), `Cannot read properties of undefined (reading setCenter)` (`mapmarker`), a syntax error in `filter` | They are v19 components: their `component.json` has no `jcomponent` (or `19`) and the tool put `spa.min@20` on them. In the old format (`spa.min@19`) they were clean | The tool keeps the version that the component declares: 70 components stay on `spa.min@19` and `jcomponent: v19` |
| `crop` and about 30 more had code as the description (`// Resize canvas component.reconfigure(...)`) | The first block of the old readme was taken as the description, and a code block with blank lines gave a piece of code | Code blocks are ignored, it has to look like a sentence and only its first sentence is used; otherwise `TODO` (then written by the AI) |
| 18 components had no preview | Their picture is `picture.gif` (14) or `picture.png` (3); the tool only looked for `picture.jpg` | They are converted to `preview.jpg`. `scanner` has no picture at all and got a generated one |
| `check.js` reported `self.readonly()` in 127 components | The rule said it removes the setter, but it only does it when it is called after the setter is defined | It is only reported when it is called after `self.setter`/`self.getter` |
| The preview of `datagrid` was blank | The first `<ui-component>` of its example is `LAZY directory` (it loads a dependency and shows nothing) | `check.js --preview` ignores the `LAZY ...` components |

## 4. Not converted

- `j-ResponsiveLayout`: it has no `component.js`.
- `j-QRCodeGenerator`: it registers the same name as `j-QRCode` (`qrcode`), so both end in `qrcode/` and one overwrites the other.
- `Tangular-*`, `URLify`, `Mailify`, `Smilefy`, `Tags`, `Tooltip`, `HTML 5 template`, `CSV export`, `Print custom HTML`, `IntranetCSS`: they are not jComponents.

## 5. Still to finish

Options of the default configuration that the readme does not document (98 options in 64 components):

| Component | Options |
| --- | --- |
| autocomplete | `height` |
| backup | `btnsave`, `btnload` |
| banners | `class`, `interval`, `icon` |
| barchart | `axisX`, `axisY` |
| breadcrumb | `usetitle` |
| button | `flags` |
| calendar | `close` |
| carousel2 | `snapping` |
| choose | `event` |
| chunkyscroll | `limit` |
| clbind | `key` |
| colorpickerbutton | `default`, `align`, `position` |
| colorselector | `colors`, `empty` |
| datagrid | `buttonreset`, `fullwidth_xs`, `dirplaceholder` |
| datatable | `rowheight`, `clickid` |
| developer | `interval`, `position` |
| directory | `minwidth`, `create` |
| dockable | `menuicon` |
| drawzone | `margin`, `geolocation` |
| dynamicvalue | `loading` |
| dynamicvaluelist | `loading`, `limit` |
| EAN13 | `visibility` |
| edit | `padding` |
| emojibutton | `default`, `align`, `position` |
| enter | `flags` |
| faicons | `scrollbarshadow` |
| floatinginput | `minwidth` |
| floatingpanel | `minwidth`, `height` |
| flow | `horizontal` |
| floweditor | `margin` |
| fullform | `padding` |
| grid | `fillcount`, `rowheight` |
| icons | `scrollbarshadow` |
| input | `checkicon`, `height` |
| largeform | `padding` |
| layer | `offset` |
| layout2 | `scrollbar` |
| linechart | `axisY`, `axisX` |
| listmenueditable | `defaulticon` |
| monthlycalendar | `badgecolor` |
| nosqlcounter | `height` |
| objecttree | `copydata`, `copypath` |
| panel | `padding` |
| parameters | `offset` |
| passwordmeter | `sequence` |
| period | `firstday`, `apply`, `cancel`, `custom`, `month`, `thisY`, `lastY` |
| pictureupload | `type` |
| pin | `blank` |
| properties | `offset`, `modalalign` |
| properties2 | `encodenotes` |
| rules | `dirsearch` |
| searchdata | `class` |
| selection | `event` |
| serverlist | `prop` |
| serverlisting | `pluralizeitems`, `pluralizepages` |
| splashscreen | `timeout`, `autoremove` |
| stash | `internal` |
| table | `visibleY`, `pluralizepages`, `pluralizeitems`, `margin` |
| tablegrid | `visibleY` |
| touchmove | `diff` |
| treeview | `droppable` |
| uieditor | `margin` |
| uistudio | `loading`, `inputdelay` |
| wiki | `margin` |

Components with a default configuration and without the `__Configuration__:` section (10): autocomplete, banners, developer, drawer, dynamicvalue, floatingpanel, formdata, pages, touchmove, virtualwire.
