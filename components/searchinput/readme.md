---
name: SearchInput
description: Customizable search input.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2020-10-22 18:25
updated: 2026-01-08 17:02
jcomponent: v19,v20
---

# SearchInput

Customizable search input.

__Configuration__:

- `searchicon {String}` search icon (default: `ti ti-search`)
- `cancelicon {String}` cancel icon (default: `ti ti-times`)
- `align {String}` icon align (default: `left`)
- `placeholder {String}` a plceholder
- `autofocus {Boolean/Number}` enables auto-focus for non-mobile devices (number means a delay for auto-focus, default: `false`)
- `exec {String}` a link to the `function(value, element)` which will be evaluated if the input is affected
- __NEW__: `realtime {Boolean}` enables real-time binding (default: `true`)

__Methods__:

- `component.focus()` focuses input
- `component.clear()` clears input
