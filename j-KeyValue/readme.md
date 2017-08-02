## j-KeyValue

A simple component for create key/value pairs values.

__Configuration__:

- `placeholderkey` {String} (optional) a placeholder for the key input
- `placeholdervalue` {String} (optional) a placeholder for the value input
- `icon` {String} (optional) a label icon without `fa-`
- `maxlength` {Number} (optional) max. lenght for inputs
- `label` {String} (optional) a label (default: `innerHTML`)
- `disabled` {Boolean} (optional) can disabled this control

__Other functionality__

```javascript
// Binder
FIND('keyvalue').binder = function(type, value) {
    if (type === 'key')
        return value.toUpperCase();
    else // type === 'value'
        return value;
};
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT