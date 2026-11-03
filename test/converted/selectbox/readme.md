---
name: selectbox
description: TODO
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-02-02 12:40
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# SelectBox

__Configuration__:

- `required {Boolean}` (optional) enables `required` (default: __false__)
- `items {String}` (optional) static items `key1|value1, key2 with value, key3|value`
- `type {String}` (optional) can be `number` (converts `String` values to `Number`)
- `datasource {String}` path to data-source (must be array)
- `text {String}` determines a property name for text (in data-source), default: `name`
- `value {String}` determines a property name for value (in data-source) default: `id`
- `empty {String}` (optional) adds an empty field
- `disabled {Boolean}` (optional) disables this component
- `search {String}` (optional) enables search box with this value as a placeholder
- `height {Number}` (optional) height (default: `200`)
- `if {String}` (optional) arrow function as a condition for filtering of datasource, example: `if:n => !n.removed`
- __NEW__ `raw {Boolean}` (optional) allow raw HTML to be rendered as text (default: `false`)
