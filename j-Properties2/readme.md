## j-Properties 2

The component uses `j-DatePicker`, `j-TimePicker`, `j-Directory`, `j-Emoji`, `j-ColorPicker` and `j-Icons` components.

- jComponent `v19`

__Configuration__:

- `dateformat {String}` a date format (default: `yyyy-MM-dd`)
- `timeformat {String}` a time format (default: `HH:mm`)
- `datetimeformat {String}` a date/time format (default: `yyyy-MM-dd HH:mm`)
- `change {String}` a path to method `method(item, replace_text(new_text))` (executed if some value is changed) and `replace_text` argument is optional
- `modalalign {String}` aligment for modal windows (default: `center`)
- `style {Number}` supports a new style `2` like `iOS` settings (default: `1`)
- `validation {Boolean}` enables validation for required fields (default: `true`)
- `defaultgroup {String}` a default group name (default: `Default`)

__Data declaration__:

```javascript
var form = [];
form.push({ group: 'Personal', label: 'First name', name: 'user.firstname', type: 'string', value: 'Peter', transform: 'capitalize' });
form.push({ group: 'Personal', label: 'Last name', name: 'user.lastname', type: 'string', value: 'Širka', placeholder: 'String' });
form.push({ group: 'Personal', label: 'Age', name: 'user.age', type: 'number', value: 33, min: 30 });
form.push({ group: 'Personal', label: 'Birth date', name: 'user.birth', type: 'date', value: NOW });
form.push({ group: 'Additional', label: 'Newsletter', name: 'user.newsletter', type: 'bool', value: true });
form.push({ group: 'Additional', label: 'City', name: 'user.city', type: 'list', value: 2, items: 'items', dirsearch: 'Search city', dircustom: true });
form.push({ group: 'Additional', label: 'Color', name: 'user.color', type: 'color', value: '#e73323' });
form.push({ group: 'Additional', label: 'Icon', name: 'user.icon', type: 'fontawesome', value: 'ti ti-home' });
form.push({ group: 'Additional', label: 'Emoji', name: 'user.emoji', type: 'emoji', value: '', show: 'n => n.age === 33' });
```

__Data properties in data declaration__:

- `name {String}` an item identifier (required)
- `label {String}` a label (required)
- `group {String}` a group name (required)
- `note {String}` a small note under control
- `type {String}` a type (required)
- `placeholder {String}` a placeholder (supports few types only)
- `transform {String}` for `string` type only, can contain `capitalize`, `uppercase`, `lowercase` or `slug`
- `maxlength {Number}` for `string` type only
- `validate {RegExp/String}` for `string` type only, can contain `email`, `phone` or `url`
- `min {Number}` for `number` type only
- `max {Number}` for `number` type only
- `inc {Number/String}` increments a value according to the value, targeted for `number` or `date` (can contain `1 day` or `-1 day`) type only
- `required {Boolean}` for type `string`, `number` or `date`
- `dirsearch {String/Boolean}` a placeholder for `list` type only, boolean disables search
- `dircustom {Boolean}` enables a custom value for `list` type only
- `dirkey {String}` a key name for label/name, targeted for `list` type only (default: `name`)
- `dirvalue {String}` a key name for value, targeted for `list` type only (default: `id`)
- `detail {String}` URL address for obtaining of data for `list` type, example: `/users/{0}/` and `{0}` will be replaced with the value from list
- `items {Object Array/String}` items for `list` type only, string can contain a path to `Array` or `URL address` to search
- `show {Arrow function}`, example: `data => data.KEY === 'SOMETHING'` --> will show the item if the condition will valid
- `icon {String}` Total icon, can contain a color e.g. `ti ti-home #00000`
- `ricon {String}` Right Font-Awesome icon or text e.g. `!HTML text`
- `riconclick {String}` a path to the method `function(item, set(new_val))`
- `camouflage {Boolean}` only for `string` type
- `monospace {Boolean}` it uses a monospace font

__Allowed types in data__:

- `string`
- `bool`
- `number`
- `date`
- `list`
- `color`
- `emoji`
- `fontawesome`
- `exec` (can exec `exec` method)
- `text` (readonly value)
- `menu` (it's similar to list but the component will execute `j-Menu`)

__Missing types__:

- `datetime`
- `time`
- `file`
- `months`

### Good to know

The component extends the Array by adding:

- `invalid {Boolean}` field determines if the `value` is invalid (default: `undefined`)
- `changed {Boolean}` field determines if the `value` has been changed (default: `undefined`)
- `prev` {???} field contains an initial value

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
