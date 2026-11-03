---
name: faviconunread
description: Shows an unread count on the page favicon as a colored badge, also using the app badge API where the browser supports it
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2019-12-13 16:46
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# FaviconUnread

__Configuration__:
- `fg {String}` foreground color (default: `white`)
- `bg {String}` backround color (default: `red`)
- `selector {String}` optional, selector for a specific image element (default: `favicon` in `head` of HTML)
- __NEW__ `badge {Boolean}` optional, enables usage of `navigator.setAppBadge()` (default: `true`)
