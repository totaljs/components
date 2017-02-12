## j-NativeNotifications

- easy usage
- singleton

__Attributes__
- `data-timeout` has to contain a timeout (milliseconds) for the expiration of notification

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