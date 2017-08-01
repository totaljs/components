## j-Notifications

- easy usage
- singleton

__Configuration__:

- `date` {String} a date format (default `yyyy-MM-dd HH:mm`)
- `timeout` {Number} has to contain a timeout (milliseconds) for the expiration of notification (default: `8000`)
- `native` {Boolean} enables native notifications when is not focused window (default: `false`)

__Methods__
- `component.append(icon, message, [datetime], [callback], [color])` for creating a new notification

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT