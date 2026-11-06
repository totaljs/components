---
name: importcsv
description: Output of this component is mapped array.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2020-03-16 17:02
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ImportCSV

Output of this component is mapped array. The component uses `j-Directory` component.

__Configuration__:

- __IMPORTANT__ `datasource {String}` a path to CSV data (`String` type)
- `skipfirst {Boolean}` skips the first parsed line (default: `true`)
- `notdefined {String}` a text for undefined columns (default: `---`)
- `parent {String}` jQuery selector for obtaining of width/height (default: `parent`)
- `dirsearch {String}` a placeholder for search field (default: `Search`)
- `margin {Number}` a margin for `parent` (default: `0`)
- `marginxs {Number}` optional, a top/bottom margin together for `xs` screen width
- `marginsm {Number}` optional, a top/bottom margin together for `sm` screen width
- `marginmd {Number}` optional, a top/bottom margin together for `md` screen width
- `marginlg {Number}` optional, a top/bottom margin together for `lg` screen width
