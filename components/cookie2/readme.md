---
name: Cookie2
description: Cookie consent notice like Cookie with different default button labels, storing agreement in localStorage
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2018-08-15 13:58
updated: 2024-04-15 23:23
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
