---
name: aselected
description: Adds a selected class to links whose href matches the current browser address, intended for public websites
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2019-09-03 11:33
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ASelected

- readonly

The component adds `selected` class to `<a` element if the `href` attribute of the element will contain URL address from the web browser. It's targeted for public websites.

__Configuration__:

- `class {String}` is a class name for selected element (default: `selected`)
- `selector {String}` is a jQuery selector (default: `a`)
- `attr {String}` attribute for comparing (default: `href`)
- `strict {Boolean}` enables strict comparing of URL address (default: `false`)
- `delay {Number}` a delay for rebinding of selection when the model is changed (default: `300`)
- __NEW__: `watch {String}` a path for watching changes
