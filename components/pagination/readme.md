---
name: Pagination
description: Page navigation with numbered page buttons and pluralized page and item labels, calling a callback when a page is selected
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-03-01 10:09
updated: 2023-02-01 10:30
jcomponent: v19
---

# Pagination

- responsive
- easy usage

__Configuration__:

- `pages {String}` pluralization for `pages`, e.g. `zero, # one, # two-three-four, # others`
- `items {String}` pluralization for `items` e.g. `# zero, # one, # two-three-four, # others`
- `max {Number}` shows a maximum count of pages (default: `8`)
- `exec {String}` link to function
- __NEW__: `nopages` {Boolean} can hide pagination if the pages are less than `2` (default: `false`)

__Important__:
The component caches values: `pages` and `count`.
