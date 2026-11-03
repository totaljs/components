---
name: choose
description: The component is alternative to CheckboxListExpert and RadioButtonListExpert.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-02-21 16:32
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Choose

The component is alternative to `CheckboxListExpert` and `RadioButtonListExpert`.

__Configuration__:

- `limit {Number}` selection limit, `1` will return a value, `>1` will return array of values (default: `1`)
- `datasource {String}` a path to the datasource (default: empty)
- `required {Boolean}` enables validation (default: `false`)
- `key {String}` an `identifier` key name for the datasource (default: `id`)
- `attr {String}` a `data-[attr]` for storing of `identifier` (default: `id`)
- `selector {String}` a jQuery selector for elements (default: `.selection`)
- `class {String}` selected class (default: `selected`)
- `type {String}` converting type, supports `string` or `number` (default: `string`)
- `uncheck {Boolean}` allows to uncheck selected value for `limit:1` (default: `false`)
- `disabled {Boolean}` disables the component
- `click {String}` a link to the `function(val)` that is evaluted when the user changes the value
- __NEW__: `indexer {String}` a HTML selector for binding of the selected index
