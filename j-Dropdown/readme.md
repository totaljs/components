## j-DropDown

- jComponent `v19|v20`

__Configuration__:

- `required {Boolean}` (optional) enables "required" (default: `false`)
- `items {String}` (optional) static items `key1|value1, key2 with value, key3|value`
- `icon {String}` (optional) icon for label e.g. `home`, `cog`, etc.
- `label {String}` (optional) label (default is HTML content)
- `type {String}` (optional) can be `number` (converts `String` values to `Number`)
- `datasource {String}` path to data-source (must be array)
- `text {String}` determines a property name for text (in data-source), default: `name`
- `value {String}` determines a property name for value (in data-source) default: `id`
- `empty {String}` (optional) adds an empty field
- `disabled {Boolean}` (optional) disables this component
- `if {String}` (optional) arrow function as a condition for filtering of datasource, example: `if:n => !n.removed`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)