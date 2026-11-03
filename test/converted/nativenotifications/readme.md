---
name: nativenotifications
description: Singleton wrapper for browser system notifications with a title, message, optional icon and callback, closed after a timeout
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2017-02-12 23:15
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# NativeNotifications

- easy usage
- singleton

__Configuration__:
- `timeout {Number}` needs to contain a timeout (milliseconds) for the expiration of notification (default: `8000`)
- `icon {String}` (optional) an icon (default `/icon.png`)

__Methods__
- `component.append(title, message, [callback], [icon])` for creating a new notification

__Usage__

```javascript
SETTER('nativenotifications/show', 'TITLE', 'MESSAGE', function() {
    // optional, click
}, '/img/warning-optional.png');
```
