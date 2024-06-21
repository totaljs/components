## j-NotifyBar

- singleton
- success message `SETTER('notifybar/success', 'MESSAGE')`
- warning message `SETTER('notifybar/warning', 'MESSAGE')`
- info message `SETTER('notifybar/info', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`

- jComponent `v19|v20`

__Configuration__:

- `timeout` {Number} A timeout in milliseconds (default: `4000`)

__Methods__:

- `component.success(message)` appends success message
- `component.warning(message)` appends warning message
- `component.info(message)` appends info message
- `component.hide()` hides the bar
- `component.show()` shows last message

__Works with ASETTER__:

- errors are handled automatically

```javascript
// Without callback
AJAX('POST /api/profile/', userprofile, ASETTER('notifybar/response', 'Profile has been saved successfully'));

// Or with a callback
AJAX('POST /api/profile/', userprofile, ASETTER('notifybar/response', 'Profile has been saved successfully', function(response) {
	console.log(response);
}));

// Or with a callback and without message
AJAX('POST /api/profile/', userprofile, ASETTER('notifybar/response', function(response) {
	console.log(response);
}));

// With auto-binding
AJAX('POST /api/profile/', userprofile, ASETTER('notifybar/response', '?.response'));
AJAX('POST /api/profile/', userprofile, ASETTER('notifybar/response', 'Your message', '?.response'));
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)