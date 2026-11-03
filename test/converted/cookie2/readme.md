---
name: cookie2
description: TODO
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2018-08-15 13:58
updated: 2026-11-03 10:36
jcomponent: v19
---

# Cookie2

- singleton
- uses __localStorage__
- supports `cancel` operation (removes cookies, localStorage and redirects to `about:blank`)

__Configuration__:
- `agree {String}` a label for the agree button (default: `OK`)
- `cancel {String}` a label for the cancel button (default: `Cancel`)
- `redirect {String}` URL to redirect if the user pressed cancel button (default: `about:blank`)
