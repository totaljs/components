## j-Message

- singleton
- easy usage

__Configuration__:

- `button` {String} a button label (default: `OK`)
- `style` {Number} can change a style (default: `1`), style `2` is similiar to `j-Approve` component

__Usage__:

```javascript
SETTER('message/warning', 'Some warning');
SETTER('message/success', 'Some success message');
SETTER('message/info', 'Some info message');
```

__Works with ASETTER__:

- errors are handled automatically

```javascript
// Without callback
AJAX('POST /api/profile/', userprofile, ASETTER('message', 'response', 'Profile has been saved successfully'));

// Or with a callback
AJAX('POST /api/profile/', userprofile, ASETTER('message', 'response', 'Profile has been saved successfully', function(response) {
	console.log(response);
}));

// Or with a callback and without message
AJAX('POST /api/profile/', userprofile, ASETTER('message', 'response', function(response) {
	console.log(response);
}));
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)