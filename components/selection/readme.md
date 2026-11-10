---
name: Selection
description: The component supports something like checkbox list.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2021-08-03 16:38
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Selection

The component supports something like checkbox list.

__Configuration__:

- `remember {Boolean}` remembers selection when the `datasource` is changed (default: `true`)
- `datasource {String}` a path to the datasource (default: empty)
- `key {String}` an `identifier` key name for the datasource (default: `id`)
- `attr {String}` a `data-[attr]` for storing of `identifier` (default: `id`)
- `selector {String}` a jQuery selector for elements (default: `.selection`)
- `class {String}` selected class (default: `selected`)
- `dblclickselectall {Boolean}` enables reverse selection after double-click (default: `true`)
- `cancel {String}` a path to the variable (if the variable is changed then the selection is resetted, default: empty)
- __NEW__: `click {String}` a selector for capturing of click (default: `.selection`)

__Methods__:

- `component.selectall()` selects all items
- `component.selectnone()` selects none
- `component.selecttoggle()` reverses selection
