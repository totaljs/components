## j-Notify

- easy usage
- singleton

__Configuration__:

- `timeout` {Number} has to contain a timeout (milliseconds) for the expiration of notification (default: `3000`)
- `position` {String} can be `top`, `top left`, `top right`, `bottom` (default), `bottom left` and `bottom right`

__Methods__:

- `component.append(icon, message, [type])` for creating a new notification

__Types__:

- type `1`: success message (green)
- type `2`: warning message (red)
- type `3`: info message (blue)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT