---
name: DropdownList
description: Multi-value picker that shows selected items as removable tags, choosing from a data-source with an optional selection limit
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2022-02-21 19:14
updated: 2024-08-14 16:09
jcomponent: v19,v20
---

# DropdownList

__Configuration__:

- `required {Boolean}` enables validation (default: `false`)
- `datasource {String}` a link to the `path {Array}` or inline defined items `key1|value1,key2 with value,key3|value`
- `limit {Number}` a maximum count of selected items (default: `0` disabled)
- `disabled {Boolean}` disables component
- `dirplaceholder {String}` placeholder for `j-Directory`
- `dirsearch {Boolean}` disables searching in `j-Directory` (default: `false`)
- `check {Boolean}` compares selected values with datasource (default: `false`)
