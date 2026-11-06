---
name: cookie
description: Singleton cookie consent notice that stores agreement in localStorage, with a cancel option that clears data and redirects
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-02-19 14:55
updated: 2026-11-03 10:36
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
