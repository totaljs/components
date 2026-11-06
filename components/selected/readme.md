---
name: selected
description: The component can set a specific class to a specific element according to the simple condition.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2018-06-16 11:24
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Selected

The component can set a specific class to a specific element according to the simple condition.

__Configuration__:

- `class {String}` is a class name for selected element (default: `selected`)
- `selector {String}` is a jQuery selector (default: `a`)
- `attr {String}` attribute for comparing (default: `if` and it means `data-if`)
- `attror {String}` attribute for secondary comparing (default: `or` and it means `data-or`)
- `datasource {String}` a path to data-source for list of items
- `delay {Number}` a delay for rel-selecting of value (default: `50`)

__Usage__:

Each nested element according to the `selector` must have defined `data-if` attribute. It works only with `strings` values.
