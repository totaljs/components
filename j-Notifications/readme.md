## j-Notifications

- easy usage
- singleton

__Attributes__
- `data-date-format` can contains a custom date/time formatting, default `yyyy-MM-dd HH:mm`
- `data-timeout` has to contain a timeout (milliseconds) for the expiration of notification
- `data-native="true"` enables native notifications when is not focused window

__Methods__
- `component.append(icon, message, [datetime], [callback], [color])` for creating a new notification

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT