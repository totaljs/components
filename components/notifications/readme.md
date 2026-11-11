---
name: Notifications
description: Singleton toast notifications with icon, date, message, color and callback, auto-closing and optional native alerts when unfocused
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-05-06 09:53
updated: 2023-02-01 09:38
jcomponent: v19
---

# Notifications

- easy usage
- singleton

__Configuration__:

- `date {String}` a date format (default `yyyy-MM-dd HH:mm`)
- `timeout {Number}` has to contain a timeout (milliseconds) for the expiration of notification (default: `8000`)
- `native {Boolean}` enables native notifications when is not focused window (default: `false`)

__Methods__
- `component.append(icon, message, [datetime], [callback], [color])` for creating a new notification
