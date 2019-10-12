## j-Message

- singleton
- easy usage

__Configuration__:

- `button` {String} a button label (default `OK`)

__Usage__:

```javascript
SETTER('message', 'warning', 'Some warning');
SETTER('message', 'success', 'Some success message');
SETTER('message', 'info', 'Some info message');
```

__Great for AJAX responses__:

This component implements `FUNC.messageresponse` function and you can use it in `AJAX`:

```javascript
// FUNC.messageresponse(success_message, [success_callback]);
AJAX('GET /api/something', FUNC.messageresponse('Profile has been saved successfully'));
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/licenses/)