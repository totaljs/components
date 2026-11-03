---
name: snackbar
description: TODO
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2017-10-18 14:02
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Snackbar

- singleton
- info message `SETTER('snackbar/show', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- success message `SETTER('snackbar/success', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- warning message `SETTER('snackbar/warning', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- __NEW__ waiting message `SETTER('snackbar/waiting', 'MESSAGE', '[BUTTON_LABEL]', [callback_dismiss])`
- `message` can contain `HTML` code

__Configuration__:

- `button {String}` A label for dismiss button (default: `OK`)
- `timeout {Number}` A timeout in milliseconds (default: `4000`)

__Works with ASETTER__:

- errors are handled automatically

```javascript
// Without callback
AJAX('POST /api/profile/', userprofile, ASETTER('snackbar/response', 'Profile has been saved successfully'));

// Or with a callback
AJAX('POST /api/profile/', userprofile, ASETTER('snackbar/response', 'Profile has been saved successfully', function(response) {
	console.log(response);
}));

// Or with a callback and without a message
AJAX('POST /api/profile/', userprofile, ASETTER('snackbar/response', function(response) {
	console.log(response);
}));

// With auto-binding
AJAX('POST /api/profile/', userprofile, ASETTER('snackbar/response', '?.response'));
AJAX('POST /api/profile/', userprofile, ASETTER('snackbar/response', 'Your message', '?.response'));
````
