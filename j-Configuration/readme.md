## j-Configuration

- easy usage
- supports __dark mode__

__Configuration__:

- `dateformat {String}` a default date format (default: `DEF.dateformat`)

### Declaration

__Allowed properties__:

- `type {String}` supports:
	- `string`
	- `number`
	- `date`
	- `boolean`
	- `dropdown`
	- `color`
	- `icon`
	- `multiline`
	- `selectable`
- `text {String}` a text/title
- `name {String}` a name of property in the model
- `align {Number}` align for inputs (`0` left (default), `1` center, `2` right)
- `icon {String}` optional, Total JS or font-awesome icon identifier
- `summary {String}` optional, a summarization
- `note {String}` optional, a note
- `required {Boolean}` optional, is the property required?
- `disable {String}` optional, declaration of arrow function in the form `model => model.interval === 100`
- `visible {String}` optional, declaration of arrow function in the form `model => model.interval === 100`
- `button {String}` optional, creates a small button
- `click {String}` optional, a link to the method (depends on the `button`)
- `maxlength {Number}` optional, supports only `string` type
- `min {Number}` optional, supports only `number` type
- `max {Number}` optional, supports only `number` type
- `increment {Number}` optional, an increment count - supports only `number` type (default: `1`)
- `multiple {Boolean}` optional, works with `selectable` type (a value will be array)
- `monospace {Boolean}` optional, works with `string` and `number` types
- `bold {Boolean}` optional, works with `string` and `number` types
- `placeholder {String}` optional
- `items {String/Object Array}` optional for `dropdown` and `selectable` in the form `[{ id: 'VALUE', name: 'TEXT' }]`
	 - type `string` a path to the `Object Array` (works with scopes)
	 - type `Object Array` fixed defined array
- `dirplaceholder {String}` optional, placeholder for `j-Directory`
- `dirsearch {Boolean}` optional, enables/disables `search` field in `j-Directory` (default: `true`)
- __NEW__: `datasource {String}` optional, a path to the data-source for config items

Declaration must be defined in the component's element body wrapped in the `<script type="text/plain">` element. Example:

```js
[
	{
		text: 'My group label',
		type: 'group',
		// summary: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, nostrum.',
		// icon: 'fa fa-home'
	},
	{
		name: 'name',
		text: 'Application name',
		type: 'string',
		icon: 'fa fa-home',
		disable: 'model => model.interval < 100',
		summary: 'Lorem, ipsum dolor sit amet consectetur, adipisicing elit. Iste eos, illum voluptas assumenda sunt possimus necessitatibus nobis provident dicta deserunt.',
		required: true
	},
	... other items
]
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)