---
name: AutoSelect
description: The component automatically adds .selected class according to the selector class="autoselect" within the entire HTML document.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-10-07 13:26
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# AutoSelect

- singleton

The component automatically adds `.selected` class according to the selector `class="autoselect"` within the entire HTML document. This component is a perfect solution for server-side rendering and subsequent highlighting.

__Configuration__:

- `selector {String}` is a jQuery selector (default: `.autoselect a`)
- `class {String}` is a class name for selected element (default: `selected`)
