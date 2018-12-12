## j-SnackBar

- singleton
- info message `SETTER('snackbar', 'show', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- success message `SETTER('snackbar', 'success', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- warning message `SETTER('snackbar', 'warning', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- __NEW__ waiting message `SETTER('snackbar', 'waiting', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- `message` can contain `HTML` code

__Configuration__:

- `button` {String} A label for dismiss button (default: `OK`)
- `timeout` {Number} A timeout in milliseconds (default: `4000`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT