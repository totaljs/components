---
name: Listing
description: Paginated client-side list that renders a template for each item of an array, with page buttons and item counts
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2017-12-21 22:43
updated: 2023-01-31 15:44
jcomponent: v19,v20
---

# Listing

- easy usage
- works with the whole Arrays only on client-side

__Configuration__:

- `count {Number}` Optional, items per page (default: `20`)
- `pages {Number}` Optional, max pages in pagination (default: `3` --> half + current page + half)
- `scrolltop {Boolean}` scrolls top automatically when the user changes a page
- `parent {String}` jQuery selector for obtaining of height, enables fixed area with custom scrollbars
- `margin {Number}` a margin for `parent` (default: `0`)
- `marginxs {Number}` optional, a top/bottom margin together for `xs` screen width
- `marginsm {Number}` optional, a top/bottom margin together for `sm` screen width
- `marginmd {Number}` optional, a top/bottom margin together for `md` screen width
- `marginlg {Number}` optional, a top/bottom margin together for `lg` screen width
- `pluralizeitems {String}` a pluralization for count of all items, form: `# zero,# one,# two-four,# five and more`
- `pluralizepages {String}` a pluralization for count of all items, form: `# zero,# one,# two-four,# five and more`
- __NEW__: `scrollbarshadow {Boolean}` enables scrollbar shadow

__Tangular layout__:

- `body {String}` contains all rendered items, output is __HTML__
- `page {Number}` current page number
- `pages {Number}` count of pages
- `count {Number}` count of items

__Tangular item__:

- `model` contains an object from `Array`
- second model contains info about data-source `{ index: Number, page: Number, pages: Number, count: Number }`
