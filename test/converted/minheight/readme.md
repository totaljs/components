---
name: minheight
description: This component sets a minimal height for the parent (defined) element. The component is usefull for intranet applications.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2020-11-19 11:58
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# MinHeight

This component sets a minimal height for the `parent` (defined) element. The component is usefull for intranet applications.

__Configuration__:

- `parent {String}` a parent container which sets a minimal height (default: `parent`)
- `margin {Number}` a margin (default: `0`)
- `topoffset {Boolean}` applies `element.offset().top` as a margin (default: `false`)
- `topposition {Boolean}` applies `element.position().top` as a margin (default: `false`)
- `attr {String}` CSS attribute for setting of height (default: `min-height`)
- `minheight {Number}` a min. height (default: not defined)
- `disabledxs {Boolean}` disables height for `xs` display
- `disabledsm {Boolean}` disables height for `sm` display
- `disabledmd {Boolean}` disables height for `md` display
- `disabledlg {Boolean}` disables height for `lg` display
