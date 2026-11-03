---
name: keyvalue
description: A simple component for create key/value pairs values.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-01-18 18:05
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# KeyValue

A simple component for create key/value pairs values.

__Configuration__:

- `placeholderkey {String}` a placeholder for the key input
- `placeholdervalue {String}` a placeholder for the value input
- `icon {String}` a label icon without `ti-`
- `maxlength {Number}` max. lenght for inputs
- `label {String}` a label (default: `innerHTML`)
- `disabled {Boolean}` can disabled this control
- `autocomplete {String}` a link to `function(input, component)` which is executed when an `input` is focused

__Other functionality__

```javascript
// Binder
SETTER('keyvalue/binder', function(type, value) {
    if (type === 'key')
        return value.toUpperCase();
    else // type === 'value'
        return value;
});
```
