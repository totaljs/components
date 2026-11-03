---
name: checkboxlist
description: TODO
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-05-10 19:09
updated: 2026-11-03 10:36
jcomponent: v19
---

# Checkboxlist

- for custom design you can use __j-CheckboxListExpert__
- now supports darkmode

__Configuration__:

- `required {Boolean}` (optional) enables "required" (default: `false`)
- `items {String}` (optional) static items `key1|value1, key2 with value, key3|value`
- `icon {String}` (optional) icon for label without `fa-` e.g. `home`, `cog`, etc.
- `checkicon {String}` (optional) check icon without `fa-`, (default: `check`).
- `label {String}` (optional) label (default is HTML content)
- `type {String}` (optional) can be `number` (converts `String` values to `Number`)
- `datasource {String}` path to data-source (must be array)
- `text {String}` determines a property name for text (in data-source), default: `name`
- `value {String}` determines a property name for value (in data-source) default :`id`
- `empty {String}` (optional) empty text for empty data-source
- `disabled {Boolean}` (optional) disables this component

### Author

- License: MIT
