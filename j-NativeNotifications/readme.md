## j-NativeNotifications

- easy usage
- singleton

__Configuration__

- `timeout` {Number} needs to contain a timeout (milliseconds) for the expiration of notification (default: `8000`)
- `icon` {String} (optional) an icon (default `/icon.png`)

__Methods__
- `component.append(title, message, [callback], [icon])` for creating a new notification

__Usage__

```javascript
SETTER('nativenotifications', 'append', 'TITLE', 'MESSAGE', function() {
    // optional, click
}, '/img/warning-optional.png');
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT