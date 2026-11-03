## j-RadioList

- jComponent `v20`

A single-choice list in the style of the Apple Human Interface Guidelines (iOS grouped list): rows of at least 44 px, hairline separators, a blue checkmark on the selected row, an optional secondary text and a small uppercase header. It is a radio group for assistive technologies (`role="radiogroup"` and `role="radio"`) and it follows the system look in light and dark mode.

__Model__: the value of the selected item (a `String` or a `Number`, it keeps the type of the data-source). `null`, `undefined` or an unknown value selects nothing.

__Configuration__:

- `items {String}` items in the form `text|value|description,text|value`, the value defaults to the text and the description is optional. A comma in the text is written as `\,`
- `datasource {String}` path to an array of objects (or of strings); it replaces `items`
- `text {String}` name of the property with the text in the data-source (default: `name`)
- `value {String}` name of the property with the value in the data-source (default: `id`)
- `description {String}` name of the property with the secondary text in the data-source (default: `description`)
- `label {String}` header above of the list; when it is not defined, the HTML content of the tag is used (like in `j-Input`): `<ui-component name="radiolist" path="form.plan">Plan</ui-component>`
- `disabled {Boolean}` rejects the interaction (default: `false`)
- `required {Boolean}` a selected item is required, an invalid state is shown otherwise (default: `false`)
- `change {String}` link to a global `function(value, component)`, executed once after a change made by the user (not after a change of the model)

__Keyboard__: `Arrow` keys move the focus and select (the focus wraps), `Space` and `Enter` select the focused row. Only the selected row (or the first one when nothing is selected) is in the tab order.

__Good to know__:

- The label is HTML (it can contain markup and `@(...)` for the translation of the application); the texts of the items are rendered as text, never as HTML.
- All the configuration can be changed in runtime: `SETTER('radiolist/reconfigure', 'items:A|a,B|b')`.
- Colours follow the library: the checkmark uses `--color`.
- Tested with jComponent v20 (`20.014`).

### Author

- Gera G. Güiles
- License: MIT
