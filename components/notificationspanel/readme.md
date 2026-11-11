---
name: NotificationsPanel
description: Singleton side panel listing notifications, with a click callback, a clear button and optional removal of items after a click
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-08-26 23:33
updated: 2023-02-01 09:42
jcomponent: v19,v20
---

# NotificationsPanel

- easy usage
- singleton
- learn from the example

__Configuration__:

- `top {Number}` top offset (default: `0`)
- `visibleY {Boolean}` shows Y scrollbars (default: `true`)
- `title {String}` title in notifications panel (default: `Notifications`)
- `autoremove {Boolean}` removes notifications after click on it (default: `true`)
- `click {String}` a path to method `function(obj, el)` when the user clicks on the notifications
- `exec {String}` a path to method `function(render(ARR_OF_OBJECT))` when the user wants to show the notifications
