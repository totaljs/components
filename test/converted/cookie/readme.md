---
name: cookie
description: TODO
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-02-19 14:55
updated: 2026-11-03 09:56
jcomponent: v19
---

# Cookie

- singleton
- uses __localStorage__
- supports `cancel` operation (removes cookies, localStorage and redirects to `about:blank`)

__Configuration__:
- `agree {String}` a label for the agree button (default: `OK`)
- `cancel {String}` a label for the cancel button (default: `Cancel`)
- `redirect {String}` URL to redirect if the user pressed cancel button (default: `about:blank`)
