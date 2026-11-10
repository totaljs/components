---
name: Columns
description: The component Columns is a very simple alternative to j-Layout and j-Layout2.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2020-12-01 23:40
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Columns

The component `Columns` is a very simple alternative to `j-Layout` and `j-Layout2`. With this component you can set columns with 100% height by your needs.

__Configuration__:

- `parent {String}` can contain `parent`, `window` or jQuery selector for the `closest` method (default: `window`)
- `margin {Number}` add margin to `height` (default: `0`)
- `marginlg {Number}` adds margin to `height` for `LG` display (default: `margin`)
- `marginmd {Number}` adds margin to `height` for `MD` display (default: `margin`)
- `marginsm {Number}` adds margin to `height` for `SM` display (default: `margin`)
- `marginxs {Number}` adds margin to `height` for `XS` display (default: `margin`)
- `noborder {Boolean}` disables border (default: `false`)
- `fontsize {Boolean}` enables percentual font-size according to the size of rows (default: `false`)

__Methods__:

- `SETTER('columns/refresh')` - reloads all `section` and sets sizes
- `SETTER('columns/add', size, html_node)` - adds a new column and performs refresh

__Good to know__:

Each column must be wrappend in `<section>`, try to understand from example.

__Attributes__:

- `data-size` contains a size of section `LG,MD,SM,XS` --> in pixels or percentage, example: `200,200,200,0` (`0` means hidden)
- section without `data-size` attribute will be counted from the residual value
