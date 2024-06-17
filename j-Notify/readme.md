## j-Notify

- jComponent `v19|v20`
- easy usage

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

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)