---
name: Listbox
description: Select list box with static items or a data-source, with an optional search box, empty option and required validation
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-10-17 16:53
updated: 2023-01-31 15:39
jcomponent: v19
---

# Listbox

- __NEW__ dark mode
- Works with Bootstrap

__Configuration__:

- `required {Boolean}` enables `required` (default: __false__)
- `items {String}` static items `key1|value1, key2 with value, key3|value`
- `type {String}` can be `number` (converts `String` values to `Number`)
- `datasource {String}` path to data-source (must be array)
- `text {String}` determines a property name for text (in data-source), default: `name`
- `value {String}` determines a property name for value (in data-source) default: `id`
- `empty {String}` adds an empty field
- `disabled {Boolean}` disables this component
- `search {String}` enables search box with this value as a placeholder
- `height {Number/String}` height (default: `200`), `string` can contain `parent`, `window` or `.parent_selector`
- `multiple {Boolean}` `true` expects `Array` in `path` (default: `false`)
- `exec {String}` a link to function which is executed when the user click on the item
