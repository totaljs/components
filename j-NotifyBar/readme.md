## j-Snackbar

- singleton
- success message `SETTER('notifybar', 'success', 'MESSAGE')`
- warning message `SETTER('notifybar', 'warning', 'MESSAGE')`
- info message `SETTER('notifybar', 'info', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`

__Configuration__:

- `timeout` {Number} A timeout in milliseconds (default: `4000`)

__Methods__:

- `component.success(message)` appends success message
- `component.warning(message)` appends warning message
- `component.info(message)` appends info message
- `component.hide()` hides the bar
- `component.show()` shows last message


### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)