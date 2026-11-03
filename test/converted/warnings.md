# Warnings

All the warnings of `node tools/check.js <folder> --legacy` over the converted components, one by one. 703 warnings in 122 components, sorted by the number of warnings. Generated on 2026-11-03 11:16.

They are style rules of the new components that the old code does not follow. They are warnings and not errors because converting must not change the behaviour of a component, so nothing was rewritten. How to read them:

- `selector "X" is not scoped under .ui-<name>`: the CSS rule `X` does not belong to the class of the component (for example `.dg` in `datagrid`).
- `id="..." attributes`: the code writes `id` attributes.
- `self.release()` / `self.bindvisible()`: calls that do nothing in jComponent v20.
- `it uses spa.min@19`: the component declares v19 only.

| Component | Warnings |
| --- | --- |
| [datagrid](#datagrid) | 182 |
| [markdown](#markdown) | 94 |
| [codemirror](#codemirror) | 80 |
| [objecteditor](#objecteditor) | 47 |
| [multioptions](#multioptions) | 42 |
| [wiki](#wiki) | 34 |
| [textbox](#textbox) | 13 |
| [clbind](#clbind) | 13 |
| [notifications](#notifications) | 11 |
| [jsontree](#jsontree) | 11 |
| [display](#display) | 10 |
| [markdowneditor](#markdowneditor) | 6 |
| [noscrollbar](#noscrollbar) | 5 |
| [leaflet](#leaflet) | 5 |
| [grid](#grid) | 4 |
| [swiper](#swiper) | 3 |
| [svgicons](#svgicons) | 3 |
| [properties2](#properties2) | 3 |
| [properties](#properties) | 3 |
| [listmenu](#listmenu) | 3 |
| [layer](#layer) | 3 |
| [largeform](#largeform) | 3 |
| [inlineform](#inlineform) | 3 |
| [fullform](#fullform) | 3 |
| [floatingbox](#floatingbox) | 3 |
| [window](#window) | 2 |
| [upload](#upload) | 2 |
| [singleupload](#singleupload) | 2 |
| [scanner](#scanner) | 2 |
| [planner](#planner) | 2 |
| [panel](#panel) | 2 |
| [page](#page) | 2 |
| [modal](#modal) | 2 |
| [miniform](#miniform) | 2 |
| [form](#form) | 2 |
| [flow](#flow) | 2 |
| [fixedmodal](#fixedmodal) | 2 |
| [fileuploadlist](#fileuploadlist) | 2 |
| [fileupload](#fileupload) | 2 |
| [emoji](#emoji) | 2 |
| [editable](#editable) | 2 |
| [contenteditable](#contenteditable) | 2 |
| [checkboxlist](#checkboxlist) | 2 |
| [box](#box) | 2 |
| [wysiwyg](#wysiwyg) | 1 |
| [wizardexpert](#wizardexpert) | 1 |
| [websocket](#websocket) | 1 |
| [treeview](#treeview) | 1 |
| [tour](#tour) | 1 |
| [touchmove](#touchmove) | 1 |
| [tooltip](#tooltip) | 1 |
| [togglebutton](#togglebutton) | 1 |
| [togglebox](#togglebox) | 1 |
| [textboxtags](#textboxtags) | 1 |
| [textboxlist](#textboxlist) | 1 |
| [tagger](#tagger) | 1 |
| [submit](#submit) | 1 |
| [splashscreen](#splashscreen) | 1 |
| [section](#section) | 1 |
| [scrollbar](#scrollbar) | 1 |
| [repeatergroup](#repeatergroup) | 1 |
| [repeater](#repeater) | 1 |
| [releaser](#releaser) | 1 |
| [range](#range) | 1 |
| [radiobutton](#radiobutton) | 1 |
| [prompt](#prompt) | 1 |
| [pricerange](#pricerange) | 1 |
| [pictureuploadexpert](#pictureuploadexpert) | 1 |
| [pictureupload](#pictureupload) | 1 |
| [permissionsop](#permissionsop) | 1 |
| [period](#period) | 1 |
| [part](#part) | 1 |
| [pagination](#pagination) | 1 |
| [objecttree](#objecttree) | 1 |
| [nosqlcounter](#nosqlcounter) | 1 |
| [modificator](#modificator) | 1 |
| [markdownpreview](#markdownpreview) | 1 |
| [mapmarker](#mapmarker) | 1 |
| [map](#map) | 1 |
| [listbox](#listbox) | 1 |
| [lazyload](#lazyload) | 1 |
| [lazycontent](#lazycontent) | 1 |
| [layout](#layout) | 1 |
| [kanban](#kanban) | 1 |
| [isopen](#isopen) | 1 |
| [intro](#intro) | 1 |
| [info](#info) | 1 |
| [infinitescroll](#infinitescroll) | 1 |
| [iframepreview](#iframepreview) | 1 |
| [iframeeditable](#iframeeditable) | 1 |
| [html-5-template](#html-5-template) | 1 |
| [highlightsyntax](#highlightsyntax) | 1 |
| [formtab](#formtab) | 1 |
| [fontawesomebox](#fontawesomebox) | 1 |
| [fontawesome](#fontawesome) | 1 |
| [filter](#filter) | 1 |
| [faiconsbutton](#faiconsbutton) | 1 |
| [faicons](#faicons) | 1 |
| [exec](#exec) | 1 |
| [emojibutton](#emojibutton) | 1 |
| [duplicator](#duplicator) | 1 |
| [dropdownlist](#dropdownlist) | 1 |
| [dropdown](#dropdown) | 1 |
| [dragdropfiles](#dragdropfiles) | 1 |
| [disable](#disable) | 1 |
| [diagram](#diagram) | 1 |
| [developer](#developer) | 1 |
| [dashboard](#dashboard) | 1 |
| [csv-export](#csv-export) | 1 |
| [countdown](#countdown) | 1 |
| [cookie2](#cookie2) | 1 |
| [cookie](#cookie) | 1 |
| [clock](#clock) | 1 |
| [clipboard](#clipboard) | 1 |
| [clickbox](#clickbox) | 1 |
| [click](#click) | 1 |
| [chunkyscroll](#chunkyscroll) | 1 |
| [checkbox](#checkbox) | 1 |
| [calendar](#calendar) | 1 |
| [button](#button) | 1 |
| [avatar](#avatar) | 1 |
| [animation](#animation) | 1 |

## datagrid

[datagrid/component.html](datagrid/component.html), 182 warnings:

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
- `selector ".dg-pagination-items" is not scoped under .ui-datagrid`
- `selector ".dg-pagination-pages" is not scoped under .ui-datagrid`
- `selector ".dg-visible" is not scoped under .ui-datagrid`
- `selector ".dg-columns" is not scoped under .ui-datagrid`
- `selector ".dg-columns-checkbox > span" is not scoped under .ui-datagrid`
- `selector ".dg-columns-checkbox > span i" is not scoped under .ui-datagrid`
- `selector ".dg-columns-checkbox-checked > span" is not scoped under .ui-datagrid`
- `selector ".dg-columns-checkbox-checked > span i" is not scoped under .ui-datagrid`
- `selector ".dg-columns > div" is not scoped under .ui-datagrid`
- `selector ".dg-columns-body" is not scoped under .ui-datagrid`
- `selector ".dg-columns label" is not scoped under .ui-datagrid`
- `selector ".dg-columns label input" is not scoped under .ui-datagrid`
- `selector ".dg-columns label span" is not scoped under .ui-datagrid`
- `selector ".dg-columns-button" is not scoped under .ui-datagrid`
- `selector ".dg-columns-button:hover" is not scoped under .ui-datagrid`
- `selector ".dg-columns-button i" is not scoped under .ui-datagrid`
- `selector ".dt-columns-reset" is not scoped under .ui-datagrid`
- `selector ".dt-columns-reset:hover" is not scoped under .ui-datagrid`
- `selector ".dg-hcol .dg-checkbox" is not scoped under .ui-datagrid`
- `selector ".dg-checkbox" is not scoped under .ui-datagrid`
- `selector ".dg-checkbox i" is not scoped under .ui-datagrid`
- `selector ".dg-checked" is not scoped under .ui-datagrid`
- `selector ".dg-checked i" is not scoped under .ui-datagrid`
- `selector ".dg-required:before" is not scoped under .ui-datagrid`
- `selector ".dg input:-ms-input-placeholder" is not scoped under .ui-datagrid`
- `selector ".dg input::placeholder" is not scoped under .ui-datagrid`
- `selector ".dg input::-ms-input-placeholder" is not scoped under .ui-datagrid`
- `selector ".dg-col button" is not scoped under .ui-datagrid`
- `selector ".dg-col button:hover" is not scoped under .ui-datagrid`
- `selector ".dg-col button[name='remove']" is not scoped under .ui-datagrid`
- `selector ".dg-col button[name='remove']:hover" is not scoped under .ui-datagrid`
- `selector ".dg-col button:first-child" is not scoped under .ui-datagrid`
- `selector ".dg-col button:last-child" is not scoped under .ui-datagrid`
- `selector ".dg-col button:disabled" is not scoped under .ui-datagrid`
- `selector ".dg-editable .dg-checkbox" is not scoped under .ui-datagrid`
- `selector ".dg-editable > div > .dg-checkbox" is not scoped under .ui-datagrid`
- `selector ".dg-checkbox-main" is not scoped under .ui-datagrid`
- `selector ".dg-bool" is not scoped under .ui-datagrid`
- `selector ".dg-bool .dg-checked" is not scoped under .ui-datagrid`
- `selector ".dg-editable" is not scoped under .ui-datagrid`
- `selector ".dg-editable input" is not scoped under .ui-datagrid`
- `selector ".dg-noscroll .ui-scrollbar-area" is not scoped under .ui-datagrid`
- `selector ".dg-noscroll .ui-scrollbar-y span" is not scoped under .ui-datagrid`
- `selector ".dg-noborder .dg-container" is not scoped under .ui-datagrid`
- `selector ".dg-noborder .dg-footer" is not scoped under .ui-datagrid`
- `selector ".dg-header-scrollbar" is not scoped under .ui-datagrid`
- `selector ".dg-header-scrollbar-container" is not scoped under .ui-datagrid`
- `selector ".dg-resize-line" is not scoped under .ui-datagrid`
- `selector ".dg-colorize" is not scoped under .ui-datagrid`
- `selector ".dg-fluid" is not scoped under .ui-datagrid`
- `selector ".dg-noborder.dg-fluid" is not scoped under .ui-datagrid`
- `selector ".dg-link" is not scoped under .ui-datagrid`
- `selector ".dg-link i" is not scoped under .ui-datagrid`
- `selector ".dg-controls" is not scoped under .ui-datagrid`
- `selector ".dg-controls button" is not scoped under .ui-datagrid`
- `selector ".dg-controls button i" is not scoped under .ui-datagrid`
- `selector ".dg-controls button span" is not scoped under .ui-datagrid`
- `selector ".dg-controls button:hover" is not scoped under .ui-datagrid`
- `selector ".dg-controls button:first-child" is not scoped under .ui-datagrid`
- `selector ".dg-controls button:disabled" is not scoped under .ui-datagrid`
- `selector ".dg-controls button:disabled i" is not scoped under .ui-datagrid`
- `selector ".dg-controls-visible" is not scoped under .ui-datagrid`
- `selector ".dg-row:hover" is not scoped under .ui-datagrid`
- `selector ".dg-row-hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-body" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-hcol" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-footer" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-container" is not scoped under .ui-datagrid`
- `selector ".jc-19.ui-dark .dg-container" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-mobile .dg-container" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-header" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-noborder .dg-footer" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-filter-selected" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-filter-selected label" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-sorting .ti-arrows-v" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-filter" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-resize" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-filter-empty" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-number" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-col" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-hcol" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-hrow" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-row-empty" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-row" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-selected" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-columns" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-columns-checkbox > span" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-columns-checkbox-checked > span" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-columns > div" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-row-changed:hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-row-changed" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-row-changed.dg-row:nth-child(even)" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-btn-columns:hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-col button" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-col button:hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-col button:first-child" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-col button[name='remove']" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-col button:disabled" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-checkbox" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-checked" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-btn-columns" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-btn-columns span" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-btn-columns:hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-pagination button" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-pagination button:hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-pagination button:disabled" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-pagination button[name='page-prev']" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-pagination button[name='page-last']" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-bool .dg-checked" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-editable" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-resize-line" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-fluid" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-controls" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-controls button" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-controls button:disabled" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-controls button:disabled i" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-controls button:hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-row:hover" is not scoped under .ui-datagrid`
- `selector ".ui-dark .dg-row-hover" is not scoped under .ui-datagrid`
- `selector ".dg-hfunc" is not scoped under .ui-datagrid`

## markdown

[markdown/component.html](markdown/component.html), 94 warnings:

- `id="..." attribute in the code, near: marks === false ? '' : ' id="{3}"') + ' class="markdown-line" data-ind (use aria-label or a wrapping <label>, an id is shared by every instance)`
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
- `selector ".markdown-showblock-visible" is not scoped under .ui-markdown`
- `selector ".markdown-video" is not scoped under .ui-markdown`
- `selector ".markdown-video iframe" is not scoped under .ui-markdown`
- `selector ".markdown-small p" is not scoped under .ui-markdown`
- `selector ".markdown-small section" is not scoped under .ui-markdown`
- `selector ".markdown-small blockquote" is not scoped under .ui-markdown`
- `selector ".markdown-small table" is not scoped under .ui-markdown`
- `selector ".markdown-small .markdown-code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown blockquote" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown th" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h2" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h1" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h1 code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown hr" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h2 code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h3 code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h4 code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown section" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown a code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h4" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown h5" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown p code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown section code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown li code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown blockquote code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown td code" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown-footnote" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown-footnotebody" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown-block > div" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown-showblock" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown-secret" is not scoped under .ui-markdown`
- `selector ".ui-dark .markdown-secret > div" is not scoped under .ui-markdown`

## codemirror

[codemirror/component.html](codemirror/component.html), 80 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
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
- `selector ".ui-dark span.cm-type" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-def" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-bracket" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-tag" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-header" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-link" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-error" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-comment" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-atom" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-number" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-comment.cm-attribute" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-comment.cm-def" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-comment.cm-tag" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-comment.cm-type" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-property" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-attribute" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-keyword" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-builtin" is not scoped under .ui-codemirror`
- `selector ".ui-dark span.cm-string" is not scoped under .ui-codemirror`

## objecteditor

[objecteditor/component.html](objecteditor/component.html), 47 warnings:

- `selector ".ui-oe" is not scoped under .ui-objecteditor`
- `selector ".ui-oe input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe textarea" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-group" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-group > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-group > .ui-oe-items > .ui-oe-item span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-array" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-array > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-array > .ui-oe-items > .ui-oe-item span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-item:last-child span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-item:last-child .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-label span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-label .ti" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-null" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-null .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-null .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-date" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-date .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-date input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline textarea" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-string-multiline .ui-oe-label span" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-number" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-number .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-number input" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox .ti" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox.checked .ti" is not scoped under .ui-objecteditor`
- `selector ".ui-oe-boolean .ui-eo-checkbox.checked" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-number input" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-string input" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-date input" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-group > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-control" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-label span" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-array > .ui-oe-label" is not scoped under .ui-objecteditor`
- `selector ".ui-dark .ui-oe-array" is not scoped under .ui-objecteditor`

## multioptions

[multioptions/component.html](multioptions/component.html), 42 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".ui-moi-name" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputtext" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputarea" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber input" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber-buttons" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputnumber-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath input" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath-buttons" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputpath-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate input" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate-buttons" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-inputdate-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors span" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-colors .selected .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-select" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-select select" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-select .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean.checked .ti" is not scoped under .ui-multioptions`
- `selector ".ui-moi-value-boolean.checked" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputdate input" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputpath input" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputtext" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputarea" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-select select" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-select" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputnumber input" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputnumber-buttons span" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-inputnumber-buttons span:hover" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-boolean" is not scoped under .ui-multioptions`
- `selector ".ui-dark .ui-moi-value-boolean.checked" is not scoped under .ui-multioptions`

## wiki

[wiki/component.html](wiki/component.html), 34 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".hljs-quote" is not scoped under .ui-wiki`
- `selector ".hljs-selector-tag" is not scoped under .ui-wiki`
- `selector ".hljs-subst" is not scoped under .ui-wiki`
- `selector ".hljs-literal" is not scoped under .ui-wiki`
- `selector ".hljs-variable" is not scoped under .ui-wiki`
- `selector ".hljs-template-variable" is not scoped under .ui-wiki`
- `selector ".hljs-tag .hljs-attr" is not scoped under .ui-wiki`
- `selector ".hljs-doctag" is not scoped under .ui-wiki`
- `selector ".hljs-section" is not scoped under .ui-wiki`
- `selector ".hljs-selector-id" is not scoped under .ui-wiki`
- `selector ".hljs-class .hljs-title" is not scoped under .ui-wiki`
- `selector ".hljs-name" is not scoped under .ui-wiki`
- `selector ".hljs-attribute" is not scoped under .ui-wiki`
- `selector ".hljs-link" is not scoped under .ui-wiki`
- `selector ".hljs-bullet" is not scoped under .ui-wiki`
- `selector ".hljs-builtin-name" is not scoped under .ui-wiki`
- `selector ".hljs-quote" is not scoped under .ui-wiki`
- `selector ".hljs-selector-tag" is not scoped under .ui-wiki`
- `selector ".hljs-subst" is not scoped under .ui-wiki`
- `selector ".hljs-literal" is not scoped under .ui-wiki`
- `selector ".hljs-variable" is not scoped under .ui-wiki`
- `selector ".hljs-template-variable" is not scoped under .ui-wiki`
- `selector ".hljs-tag .hljs-attr" is not scoped under .ui-wiki`
- `selector ".hljs-doctag" is not scoped under .ui-wiki`
- `selector ".hljs-title" is not scoped under .ui-wiki`
- `selector ".hljs-section" is not scoped under .ui-wiki`
- `selector ".hljs-selector-id" is not scoped under .ui-wiki`
- `selector ".hljs-class .hljs-title" is not scoped under .ui-wiki`
- `selector ".hljs-name" is not scoped under .ui-wiki`
- `selector ".hljs-attribute" is not scoped under .ui-wiki`
- `selector ".hljs-link" is not scoped under .ui-wiki`
- `selector ".hljs-bullet" is not scoped under .ui-wiki`
- `selector ".hljs-builtin-name" is not scoped under .ui-wiki`

## textbox

[textbox/component.html](textbox/component.html), 13 warnings:

- `selector "input:-ms-input-placeholder" is not scoped under .ui-textbox`
- `selector "input:-webkit-input-placeholder" is not scoped under .ui-textbox`
- `selector "input:-moz-input-placeholder" is not scoped under .ui-textbox`
- `selector "input[type="text"]:disabled" is not scoped under .ui-textbox`
- `selector "input[type="password"]:disabled" is not scoped under .ui-textbox`
- `selector "input:invalid" is not scoped under .ui-textbox`
- `selector ".ui-right" is not scoped under .ui-textbox`
- `selector ".ui-center" is not scoped under .ui-textbox`
- `selector ".ui-dark input:-ms-input-placeholder" is not scoped under .ui-textbox`
- `selector ".ui-dark input:-webkit-input-placeholder" is not scoped under .ui-textbox`
- `selector ".ui-dark input:-moz-input-placeholder" is not scoped under .ui-textbox`
- `selector ".ui-dark input[type="text"]:disabled" is not scoped under .ui-textbox`
- `selector ".ui-dark input[type="password"]:disabled" is not scoped under .ui-textbox`

## clbind

[clbind/component.html](clbind/component.html), 13 warnings:

- `selector ".animation" is not scoped under .ui-clbind`
- `selector ".ui-animation-1-init" is not scoped under .ui-clbind`
- `selector ".ui-animation-1-run" is not scoped under .ui-clbind`
- `selector ".ui-animation-2-init" is not scoped under .ui-clbind`
- `selector ".ui-animation-2-run" is not scoped under .ui-clbind`
- `selector ".ui-animation-3-init" is not scoped under .ui-clbind`
- `selector ".ui-animation-3-run" is not scoped under .ui-clbind`
- `selector ".ui-animation-4-init" is not scoped under .ui-clbind`
- `selector ".ui-animation-4-run" is not scoped under .ui-clbind`
- `selector ".ui-animation-5-init" is not scoped under .ui-clbind`
- `selector ".ui-animation-5-run" is not scoped under .ui-clbind`
- `selector ".ui-animation-6-init" is not scoped under .ui-clbind`
- `selector ".ui-animation-6-run" is not scoped under .ui-clbind`

## notifications

[notifications/component.html](notifications/component.html), 11 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".ui-notification-container" is not scoped under .ui-notifications`
- `selector ".ui-notification" is not scoped under .ui-notifications`
- `selector ".ui-notification > i" is not scoped under .ui-notifications`
- `selector ".ui-notification > i:active" is not scoped under .ui-notifications`
- `selector ".ui-notification > i:hover" is not scoped under .ui-notifications`
- `selector ".ui-notification-icon" is not scoped under .ui-notifications`
- `selector ".ui-notification-message" is not scoped under .ui-notifications`
- `selector ".ui-notification-datetime" is not scoped under .ui-notifications`
- `selector ".ui-notification-hide" is not scoped under .ui-notifications`
- `selector ".ui-notification-container" is not scoped under .ui-notifications`

## jsontree

[jsontree/component.html](jsontree/component.html), 11 warnings:

- `selector ".jsontree-tree" is not scoped under .ui-jsontree`
- `selector ".jsontree-tree .spacer" is not scoped under .ui-jsontree`
- `selector ".jsontree-tree .treeitem" is not scoped under .ui-jsontree`
- `selector ".jsontree-tree .treeitem > div > img" is not scoped under .ui-jsontree`
- `selector ".jsontree-tree .treeitem span" is not scoped under .ui-jsontree`
- `selector ".jsontree-tree .treeitem span:hover" is not scoped under .ui-jsontree`
- `selector ".jsontree-tree .treeitem img" is not scoped under .ui-jsontree`
- `selector ".jsontree-textarea" is not scoped under .ui-jsontree`
- `selector ".jsontree-label" is not scoped under .ui-jsontree`
- `selector ".jsontree-label > button" is not scoped under .ui-jsontree`
- `selector ".ti-rotate-90" is not scoped under .ui-jsontree`

## display

[display/component.html](display/component.html), 10 warnings:

- `selector ".ui-centered-noscroll" is not scoped under .ui-display`
- `selector ".ui-centered-noscroll body" is not scoped under .ui-display`
- `selector ".ui-centered-container" is not scoped under .ui-display`
- `selector ".ui-centered-body" is not scoped under .ui-display`
- `selector ".ui-centered-content" is not scoped under .ui-display`
- `selector ".ui-centered-button" is not scoped under .ui-display`
- `selector ".ui-centered-button:active" is not scoped under .ui-display`
- `selector ".ui-centered-button:hover" is not scoped under .ui-display`
- `selector ".ui-dark .ui-centered-container" is not scoped under .ui-display`
- `selector ".ui-dark .ui-centered-button" is not scoped under .ui-display`

## markdowneditor

[markdowneditor/component.html](markdowneditor/component.html), 6 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".ui-markdown-editor-label" is not scoped under .ui-markdowneditor`
- `selector ".ui-markdown-editor-label .ti" is not scoped under .ui-markdowneditor`
- `selector ".ui-markdown-editor-label-required" is not scoped under .ui-markdowneditor`
- `selector ".ui-markdown-editor-label-required:before" is not scoped under .ui-markdowneditor`
- `selector ".ui-markdown-editor-invalid" is not scoped under .ui-markdowneditor`

## noscrollbar

[noscrollbar/component.html](noscrollbar/component.html), 5 warnings:

- `selector ".ui-viewbox" is not scoped under .ui-noscrollbar`
- `selector ".ui-viewbox-disabled" is not scoped under .ui-noscrollbar`
- `selector ".ui-viewbox-hidden" is not scoped under .ui-noscrollbar`
- `selector ".ui-viewbox-centered-table" is not scoped under .ui-noscrollbar`
- `selector ".ui-viewbox-centered-cell" is not scoped under .ui-noscrollbar`

## leaflet

[leaflet/component.html](leaflet/component.html), 5 warnings:

- `selector ".leaflet-container" is not scoped under .ui-leaflet`
- `selector ".leaflet-container .leaflet-control-attribution" is not scoped under .ui-leaflet`
- `selector ".leaflet-container .leaflet-control-attribution a" is not scoped under .ui-leaflet`
- `selector ".ui-dark .leaflet-container .leaflet-control-attribution" is not scoped under .ui-leaflet`
- `selector ".ui-dark .leaflet-container .leaflet-control-attribution a" is not scoped under .ui-leaflet`

## grid

[grid/component.html](grid/component.html), 4 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".left input[type="text"]" is not scoped under .ui-grid`
- `selector ".right" is not scoped under .ui-grid`
- `selector ".center" is not scoped under .ui-grid`

## swiper

[swiper/component.html](swiper/component.html), 3 warnings:

- `selector ".ui-wiper-button-next.swiper-button-next:after" is not scoped under .ui-swiper`
- `selector ".ui-wiper-button-prev.swiper-button-prev:after" is not scoped under .ui-swiper`
- `selector ".ui-wiper-pagination .swiper-pagination-bullet-active" is not scoped under .ui-swiper`

## svgicons

[svgicons/component.html](svgicons/component.html), 3 warnings:

- `selector ".ui-svgicon-b" is not scoped under .ui-svgicons`
- `selector ".selected .ui-svgicon-a" is not scoped under .ui-svgicons`
- `selector ".selected .ui-svgicon-b" is not scoped under .ui-svgicons`

## properties2

[properties2/component.html](properties2/component.html), 3 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: '<inp' + 'ut type="file" id="prope' + 'rties2upload" /' + '>'); s (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `selector "#properties2upload" is not scoped under .ui-properties2`

## properties

[properties/component.html](properties/component.html), 3 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: pend('<input type="file" id="propertiesupload" />'); self.append( (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `selector "#propertiesupload" is not scoped under .ui-properties`

## listmenu

[listmenu/component.html](listmenu/component.html), 3 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".listmenu a" is not scoped under .ui-listmenu`
- `selector ".listmenu .selected" is not scoped under .ui-listmenu`

## layer

[layer/component.html](layer/component.html), 3 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: ument.body).append('<div id="{1}" class="{0}"><div class="{0}-toolbar" (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## largeform

[largeform/component.html](largeform/component.html), 3 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {4}-container invisibl (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`
- `selector ".ui-form-title > span" is not scoped under .ui-largeform`

## inlineform

[inlineform/component.html](inlineform/component.html), 3 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {3}-container" style=" (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## fullform

[fullform/component.html](fullform/component.html), 3 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {4}-container invisibl (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`
- `selector ".ui-form-title > span" is not scoped under .ui-fullform`

## floatingbox

[floatingbox/component.html](floatingbox/component.html), 3 warnings:

- `selector ".floatingbox" is not scoped under .ui-floatingbox`
- `selector ".floatingbox-visible" is not scoped under .ui-floatingbox`
- `selector ".ui-dark .floatingbox" is not scoped under .ui-floatingbox`

## window

[window/component.html](window/component.html), 2 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {3}-container"><div cl (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## upload

[upload/component.html](upload/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: function(self) { var id = 'upload' + self._id; var input = null (use aria-label or a wrapping <label>, an id is shared by every instance)`

## singleupload

[singleupload/component.html](singleupload/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: pend('<input type="file" id="{0}" class="hidden"{1} />'.format(id, con (use aria-label or a wrapping <label>, an id is shared by every instance)`

## scanner

[scanner/component.html](scanner/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `console.log in the component`

## planner

[planner/component.html](planner/component.html), 2 warnings:

- `id="..." attribute in the code, near: 2000/svg"><defs><pattern id="{1}" width="20" height="20" patternunits= (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `selector ".ui-dark .svg-text" is not scoped under .ui-planner`

## panel

[panel/component.html](panel/component.html), 2 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {5}-container{3}"><div (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## page

[page/component.html](page/component.html), 2 warnings:

- `self.release() is a no-op in jComponent v20, remove it`
- `selector ".page" is not scoped under .ui-page`

## modal

[modal/component.html](modal/component.html), 2 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="{1}-container hidden"></div>' (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## miniform

[miniform/component.html](miniform/component.html), 2 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {4}-container invisibl (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## form

[form/component.html](form/component.html), 2 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {4}-container invisibl (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## flow

[flow/component.html](flow/component.html), 2 warnings:

- `id="..." attribute in the code, near: nnections"><defs><marker id="{0}-arrow" viewbox="0 0 10 10" refX="5" r (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `selector ".ui-dark #ui-flow-arrow" is not scoped under .ui-flow`

## fixedmodal

[fixedmodal/component.html](fixedmodal/component.html), 2 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="{1}-container hidden"></div>' (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## fileuploadlist

[fileuploadlist/component.html](fileuploadlist/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: , config, cls) { var id = 'fileuploadlist' + self.id; var input (use aria-label or a wrapping <label>, an id is shared by every instance)`

## fileupload

[fileupload/component.html](fileupload/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: (self, config) { var id = 'fileupload' + self._id; var input = (use aria-label or a wrapping <label>, an id is shared by every instance)`

## emoji

[emoji/component.html](emoji/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: lass="{0}-content-title" id="history">Frequently used</div>'.format(cl (use aria-label or a wrapping <label>, an id is shared by every instance)`

## editable

[editable/component.html](editable/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".editable-multiline" is not scoped under .ui-editable`

## contenteditable

[contenteditable/component.html](contenteditable/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `id="..." attribute in the code, near: if (html) { var id = '#URL' + Date.now(); document.exe (use aria-label or a wrapping <label>, an id is shared by every instance)`

## checkboxlist

[checkboxlist/component.html](checkboxlist/component.html), 2 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`
- `selector ".ui-dark .ui-checkbox.ui-disabled div" is not scoped under .ui-checkboxlist`

## box

[box/component.html](box/component.html), 2 warnings:

- `id="..." attribute in the code, near: { var html = '<div id="{0}" class="hidden {4}-container invisibl (use aria-label or a wrapping <label>, an id is shared by every instance)`
- `self.release() is a no-op in jComponent v20, remove it`

## wysiwyg

[wysiwyg/component.html](wysiwyg/component.html), 1 warnings:

- `id="..." attribute in the code, near: } else { var id = '#URL' + Date.now(); var html = (use aria-label or a wrapping <label>, an id is shared by every instance)`

## wizardexpert

[wizardexpert/component.html](wizardexpert/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## websocket

[websocket/component.html](websocket/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## treeview

[treeview/component.html](treeview/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## tour

[tour/component.html](tour/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## touchmove

[touchmove/component.html](touchmove/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## tooltip

[tooltip/component.html](tooltip/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## togglebutton

[togglebutton/component.html](togglebutton/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## togglebox

[togglebox/component.html](togglebox/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## textboxtags

[textboxtags/component.html](textboxtags/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## textboxlist

[textboxlist/component.html](textboxlist/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## tagger

[tagger/component.html](tagger/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## submit

[submit/component.html](submit/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## splashscreen

[splashscreen/component.html](splashscreen/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## section

[section/component.html](section/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## scrollbar

[scrollbar/component.html](scrollbar/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## repeatergroup

[repeatergroup/component.html](repeatergroup/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## repeater

[repeater/component.html](repeater/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## releaser

[releaser/component.html](releaser/component.html), 1 warnings:

- `self.bindvisible() is a no-op in jComponent v20, remove it`

## range

[range/component.html](range/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## radiobutton

[radiobutton/component.html](radiobutton/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## prompt

[prompt/component.html](prompt/component.html), 1 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{1}" class="{0} {0}-container hidden"><di (use aria-label or a wrapping <label>, an id is shared by every instance)`

## pricerange

[pricerange/component.html](pricerange/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## pictureuploadexpert

[pictureuploadexpert/component.html](pictureuploadexpert/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## pictureupload

[pictureupload/component.html](pictureupload/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## permissionsop

[permissionsop/component.html](permissionsop/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## period

[period/component.html](period/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## part

[part/component.html](part/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## pagination

[pagination/component.html](pagination/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## objecttree

[objecttree/component.html](objecttree/component.html), 1 warnings:

- `selector ".ti-rotate-270" is not scoped under .ui-objecttree`

## nosqlcounter

[nosqlcounter/component.html](nosqlcounter/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## modificator

[modificator/component.html](modificator/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## markdownpreview

[markdownpreview/component.html](markdownpreview/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## mapmarker

[mapmarker/component.html](mapmarker/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## map

[map/component.html](map/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## listbox

[listbox/component.html](listbox/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## lazyload

[lazyload/component.html](lazyload/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## lazycontent

[lazycontent/component.html](lazycontent/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## layout

[layout/component.html](layout/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## kanban

[kanban/component.html](kanban/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## isopen

[isopen/component.html](isopen/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## intro

[intro/component.html](intro/component.html), 1 warnings:

- `id="..." attribute in the code, near: ument.body).append('<div id="{0}" class="hidden {1}"><div class="{1}-b (use aria-label or a wrapping <label>, an id is shared by every instance)`

## info

[info/component.html](info/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## infinitescroll

[infinitescroll/component.html](infinitescroll/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## iframepreview

[iframepreview/component.html](iframepreview/component.html), 1 warnings:

- `id="..." attribute in the code, near: var offset = '<div id="IFPOFFSET"></div>'; if (content.ind (use aria-label or a wrapping <label>, an id is shared by every instance)`

## iframeeditable

[iframeeditable/component.html](iframeeditable/component.html), 1 warnings:

- `id="..." attribute in the code, near: var offset = ('<div id="IFPOFFSET"></div><scr' + 'ipt>window.addE (use aria-label or a wrapping <label>, an id is shared by every instance)`

## html-5-template

[html-5-template/component.html](html-5-template/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## highlightsyntax

[highlightsyntax/component.html](highlightsyntax/component.html), 1 warnings:

- `selector "pre" is not scoped under .ui-highlightsyntax`

## formtab

[formtab/component.html](formtab/component.html), 1 warnings:

- `id="..." attribute in the code, near: append('<div class="{0}" id="{1}"><div class="{0}-layer"></div></div>' (use aria-label or a wrapping <label>, an id is shared by every instance)`

## fontawesomebox

[fontawesomebox/component.html](fontawesomebox/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## fontawesome

[fontawesome/component.html](fontawesome/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## filter

[filter/component.html](filter/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## faiconsbutton

[faiconsbutton/component.html](faiconsbutton/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## faicons

[faicons/component.html](faicons/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## exec

[exec/component.html](exec/component.html), 1 warnings:

- `selector ".exec" is not scoped under .ui-exec`

## emojibutton

[emojibutton/component.html](emojibutton/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## duplicator

[duplicator/component.html](duplicator/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## dropdownlist

[dropdownlist/component.html](dropdownlist/component.html), 1 warnings:

- `id="..." attribute in the code, near: ; } else item.id = ''; next(); }, function() { (use aria-label or a wrapping <label>, an id is shared by every instance)`

## dropdown

[dropdown/component.html](dropdown/component.html), 1 warnings:

- `selector ".ui-disabled select" is not scoped under .ui-dropdown`

## dragdropfiles

[dragdropfiles/component.html](dragdropfiles/component.html), 1 warnings:

- `id="..." attribute in the code, near: var has = false; var id = 'file' + self.ID; self.aclass(confi (use aria-label or a wrapping <label>, an id is shared by every instance)`

## disable

[disable/component.html](disable/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## diagram

[diagram/component.html](diagram/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## developer

[developer/component.html](developer/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## dashboard

[dashboard/component.html](dashboard/component.html), 1 warnings:

- `id="..." attribute in the code, near: 2000/svg"><defs><pattern id="jdashboardgrid" width="0" height="0" patt (use aria-label or a wrapping <label>, an id is shared by every instance)`

## csv-export

[csv-export/component.html](csv-export/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## countdown

[countdown/component.html](countdown/component.html), 1 warnings:

- `selector ".avatar" is not scoped under .ui-countdown`

## cookie2

[cookie2/component.html](cookie2/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## cookie

[cookie/component.html](cookie/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## clock

[clock/component.html](clock/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## clipboard

[clipboard/component.html](clipboard/component.html), 1 warnings:

- `id="..." attribute in the code, near: }; } else { var id = 'clipboard' + self.id; $(document.b (use aria-label or a wrapping <label>, an id is shared by every instance)`

## clickbox

[clickbox/component.html](clickbox/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## click

[click/component.html](click/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## chunkyscroll

[chunkyscroll/component.html](chunkyscroll/component.html), 1 warnings:

- `self.release() is a no-op in jComponent v20, remove it`

## checkbox

[checkbox/component.html](checkbox/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## calendar

[calendar/component.html](calendar/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## button

[button/component.html](button/component.html), 1 warnings:

- `it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20`

## avatar

[avatar/component.html](avatar/component.html), 1 warnings:

- `selector ".avatar" is not scoped under .ui-avatar`

## animation

[animation/component.html](animation/component.html), 1 warnings:

- `selector ".animation" is not scoped under .ui-animation`
