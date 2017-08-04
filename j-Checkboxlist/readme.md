## j-CheckboxList

__Configuration__:

Example: `data-jc-config="required:true;icon:envelope"`

- `required` {Boolean} (optional) enables "required" (default: `false`)
- `items` {String} (optional) static items `key1|value1, key2 with value, key3|value`
- `icon` {String} (optional) icon for label without `fa-` e.g. `home`, `cog`, etc.
- `checkicon` {String} (optional) check icon without `fa-`, (default: `check`).
- `label` {String} (optional) label (default is HTML content)
- `placeholder` {String} (optional) adds a `placeholder` text into the input
- `type` {String} (optional) can be `number` (converts `String` values to `Number`)
- `datasource` {String} path to data-source (must be array)
- `text` {String} determines a property name for text (in data-source), default: `name`
- `value` {String} determines a property name for value (in data-source) default :`id`
- `empty` {String} (optional) empty text for empty data-source
- `cleaner` {Boolean} (optional) clears non-exist values default: `true`
- `disabled` {Boolean} (optional) disables this component

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT