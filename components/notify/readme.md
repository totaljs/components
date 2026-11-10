---
name: Notify
description: Singleton toast notifications for warning, success and info messages, shown in a screen corner and closed automatically
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2021-10-22 20:32
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Notify

__Configuration__:

- `timeout {Number}` has to contain a timeout (milliseconds) for the expiration of notification (default: `3000`)
- `position {String}` can be `top`, `top left`, `top right` (default), `bottom` , `bottom left` and `bottom right`

__Methods__:

```js
SETTER('notify/warning', 'Some warning');
SETTER('notify/success', 'Some success message');
SETTER('notify/info', 'Some info message');
```

__Works with ASETTER__:

- errors are handled automatically

```js
// Without callback
AJAX('POST /api/profile/', userprofile, ASETTER('notify/response', 'Profile has been saved successfully'));

// Or with a callback
AJAX('POST /api/profile/', userprofile, ASETTER('notify/response', 'Profile has been saved successfully', function(response) {
	console.log(response);
}));

// Or with a callback and without notify
AJAX('POST /api/profile/', userprofile, ASETTER('notify/response', function(response) {
	console.log(response);
}));

// With auto-binding
AJAX('POST /api/profile/', userprofile, ASETTER('notify/response', '?.response'));
AJAX('POST /api/profile/', userprofile, ASETTER('notify/response', 'Your message', '?.response'));
````
