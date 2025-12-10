## j-Detail

This component can render values from model. Supports inline mapping - look into the source-code of the example.

- jComponent `v19|v20`

__Configuration__:

- `dateformat {String}` a date format (default: `yyyy-MM-dd`)
- `timeformat {String}` a time format (default: `HH:mm`)
- `datetimeformat {String}` a date/time format (default: `yyyy-MM-dd HH:mm`)
- `numberformat {Number}` a default number format (default: empty)
- `small {Boolean}` enables smaller design (default: `false`)
- `style {Number}` component style (default: `1`), supports style `2`, `3` (minimal) and `4` (modern)
- `defaultgroup {String}` a default group name (default: `Default`)
- `notnull {Boolean}` skips nullable values (default: `false`)
- `track {String}` can contain paths divided by comma, this property will watch only changes in trakced keys

__Data declaration__:

```javascript
var model = { firstname: 'Peter', lastname: 'Širka', age: 33 };
var items = [{ id: 2, name: 'Banská Bystrica' }, { id: 3, name: 'Bratislava' }];
var form = [];

// The below values will be binded automatically from the "model" (according to the "path" field) because they contain "path" field
form.push({ group: 'Personal', label: 'First name', path: 'firstname', type: 'string', value: model, note: 'This is first name' });
form.push({ group: 'Personal', label: 'Last name', path: 'lastname', type: 'string', value: model, placeholder: 'String' });
form.push({ group: 'Personal', label: 'Age', path: 'age', type: 'number', value: model });

// The below values will be binded from "value" key
form.push({ group: 'Personal', label: 'Birth date', type: 'date', value: NOW });
form.push({ group: 'Additional', label: 'Newsletter', type: 'bool', value: true });
form.push({ group: 'Additional', label: 'City', type: 'list', value: 2, items: 'items' });
form.push({ group: 'Additional', label: 'Color', type: 'color', value: '#e73323' });
form.push({ group: 'Additional', label: 'Icon', type: 'fontawesome', value: 'fas fa-home' });
```

__Data properties in data declaration__:

- `group {String}` a group name (required)
- `label {String}` a label (required)
- `type {String}` a type (required)
- `note {String}` a small note under value
- `format {String}` number e.g. `2` or date format `dd.MM.yyyy`
- `detail {String}` URL address for obtaining of data for `list` type, example: `/users/{0}/` and `{0}` will be replaced with the value from list
- `items {Object Array/String}` items for `list` type only, string can contain a path to `Array` or `URL address` to search
- `value {Object}` a value or model with values (then `path` is required)
- `path {String}` a path to value in model (`value` must contain a model)
- `template {String}` A Tangular template (works only with `type:'template'` and `{{ value }}` contains a raw value, and `{{ item }}` contains the entire item)
- `empty {String}` An empty value when the value is nullable (default: `---`)
- `show {String}` the conditional function `value.type === 'company'` then displays if the evaluated condition is `true`
- __NEW__ `autoformat {Boolean}` enables auto-format for `email`, or `phones`, and only for `string` type (default: `false`)
- __NEW__ `colorize {Boolean}` colorizes the value with except `list`, `color` and `icon` type
- __NEW__ `plus {String}` adds a value to end of rendered value for `number` and `string` types

__Allowed types in data__:

- `string`
- `bool`
- `number`
- `date`
- `list`
- `color`
- `emoji`
- `fontawesome`
- `password`
- `template`

__Good to know__:

- if group contains only the one char then the name of group is not rendered

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
