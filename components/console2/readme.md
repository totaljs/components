---
name: Console2
description: Log console panel that shows messages from a data source, with a clear button and automatic opening and closing
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2025-02-25 13:52
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Console2

- easy usage
- supports __dark mode__

__Configuration__:

- `icon {String}` a label icon (default: `ti ti-script`)
- `name {String}` a label (default: `Console`)
- `datasource {String}` __required__ a path to a data-source `Array`
- `clear {String_LinkToFunction/Boolean}` adds a clear button (default: `true`)
- `autoclose {Boolean}` console automatically closes after clearing (default: `true`)
- `autoshow {Boolean}` console automatically opens after new logs (default: `true`)
- `height {Number}` console height in pixels (default: `150`)
