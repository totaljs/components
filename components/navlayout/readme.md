---
name: navlayout
description: A simple and fully responsive navigation layout.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2021-05-18 12:33
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# NavLayout

A simple and fully responsive navigation layout.

__Good to know__:

- `path {Boolean}` shows the navigation panel in display modes defined in the `hide` config option
- `<section>` must contain a navigation
- `<main>` must contain a content

__Configuration__:

- `width {Number}` a size of navigation (default: `250`)
- `hide {String}` hides navigation in defined display modes (default: `xs,sm`)
- `autoresize {Boolean}` enables auto-resizing (default: `true`)
- `position {String}` navigation position (default: `left`)
- `margin {Number}` adds margin for `height` (default: `0`)
- `parent {String}` can contain `parent`, `window` or jQuery selector for the `closest` method (default: `window`)
