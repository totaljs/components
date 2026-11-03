---
name: sticker
description: TODO
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-05-13 22:10
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# Sticker

__Configuration__:

- `on {String}` this class is enabled when the `scroll top` position is greater than this element `Y` position
- `off {String}` this class is enabled when the `scroll top` position is smaller than this element `Y` position
- `margin {Number}` a margin which will be deducted from the `top` position of the current element
- `xs {Boolean}` enables sticker for extra small display (default: `false`)
- `sm {Boolean}` enables sticker for small display (default: `true`)
- `md {Boolean}` enables sticker for medium display (default: `true`)
- `lg {Boolean}` enables sticker for large display (default: `true`)
- `type {String}` a method name for obtaining of position `offset` (default) or `position`
- `marginparent {Number}` a margin for `parent` scrolling (default: `0`)
- `parent {String}` optional, a parent selector (look to example for understanding)
- __NEW__: `minheight {Number}` a minimal height of scroll area for applying of classes
