---
name: layer
description: Bootstrap layer panel shown when the value of its path matches the if condition, with a title, back button and optional scrollbar
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-09-17 12:20
updated: 2026-11-03 10:36
jcomponent: v19
---

# Layer

- Works with Bootstrap

__Configuration__:

- `title {String}` form title
- `if {String}` condition for showing of layer, it's compared with the value within of `path`
- `reload {String}` link to a global function and it's executed if the form is showing
- `container {String}` jQuery selector for auto-height dimension (default: `.ui-layer-body`)
- `default {String}` (optional) a short alias for `DEFAULT(default, true)`
- `scrollbar {Boolean}` enables custom scrollbar (default: `true`)
- __NEW__: `autofocus` {Boolean/String} focuses the first input, textarea (default: `false`)
