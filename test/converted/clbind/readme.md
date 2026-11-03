---
name: clbind
description: The component reads an item with a linked data source. The component supports Tangular template inside the element (optional). As the value is stored in the {{
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-10-02 13:09
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# ClBind

The component reads an item with a linked data source. The component supports Tangular template inside the element (optional). As the value is stored in the `{{ value.something }}` variable.

__Configuration__:

- `datasource {String}` or `dirsource {String}` __required__ a data-source
- `id {String}` a pair key (default: `id`)
- `nullable {Boolean}` renders `null` value (default: `true`)
- `exec {String}` executes `function(value, element)` method
- `bind {String}` binds a read value according to the defined path
