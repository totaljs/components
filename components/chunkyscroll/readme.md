---
name: ChunkyScroll
description: Virtual scrolling list that renders only the visible rows of thousands of items, with configurable row height and margins
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-11-30 19:43
updated: 2023-01-31 12:17
jcomponent: v19,v20
---

# ChunkyScroll

- can handle thousands items/elements

__Configuration__:

- `rowheight {Number}` __Important__, a row height (default: `30` with auto obtaining of size)
- `parent {String}` optional, a container with fixed height, can be `window`. Default value: `parent` element.
- `margin {Number}` optional, a top/bottom margin together (default: `0`)
- `scrolltop {Boolean}` scrolls to top automatically if the `path` is changed (default: `false`)
- `marginxs {Number}` optional, a top/bottom margin together for `xs` screen width
- `marginsm` optional, a top/bottom margin together for `sm` screen width
- `marginmd` optional, a top/bottom margin together for `md` screen width
- `marginlg` optional, a top/bottom margin together for `lg` screen width
