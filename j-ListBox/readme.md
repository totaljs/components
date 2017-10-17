## j-ListBox

- Works with Bootstrap

__Configuration__:

- `required` {Boolean} (optional) enables `required` (default: __false__)
- `items` {String} (optional) static items `key1|value1, key2 with value, key3|value`
- `type` {String} (optional) can be `number` (converts `String` values to `Number`)
- `datasource` {String} path to data-source (must be array)
- `text` {String} determines a property name for text (in data-source), default: `name`
- `value` {String} determines a property name for value (in data-source) default: `id`
- `empty` {String} (optional) adds an empty field
- `disabled` {Boolean} (optional) disables this component
- `search` {String} (optional) enables search box with this value as a placeholder
- `height` {Number} (optional) height (default: `200`)
- `multiple` {Boolean} (optional) `true` expects `Array` in `data-jc-path` (default: `false`)
- `exec` {String} (optional) a link to function which is executed when the user click on the item

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT