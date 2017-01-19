## j-KeyValue

A simple component for create key/value pairs values.

__Attributes__
- `data-placeholder-key="Type a key"` a placeholder for `key`
- `data-placeholder-value="Type a value and press enter"` a placehollder for `value`
- `data-maxlength="50"` a maximum size of key/value
- `data-icon="fa-globe"` FontAwesome icon for label

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

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT