## j-Alter

The component enables `contenteditable` attribute for elements with `alter` or `alter2` classes.

- singleton
- put the component under `<body` element like `j-Directory` or `j-DatePicker`

__Good to know__:

- each element with the `alter` class is possible to edit with a single click
- each element with the `alter2` class is possible to edit with a double click

__Configuration__:

- `dateformat` {String} a default format for parsing dates (default: `yyyy-MM-dd`)

---

`data-alter` attribute supports:

- `required` {Boolean} optional, enables "required" (default: `false`)
- `type` {String} optional, can be `string` (default), `date`, `number`, `boolean`, `email` or `html` __NEW__ `tags`
- `check {String}` optional, a path to `function(opt, el)` must return `boolean`, it means `Can the user edit that field?`
- `exec {String}` optional, a path to `function(opt, accept(boolean/html_value_for_the_element))`
- `format {String}` optional, a format for `date`, default: `yyyy-MM-dd`
- `maxlength {Number}` a maxlength
- `minvalue {Number}` a min. value for number type (default: `undefined`)
- `maxvalue {Number}` a max. value for number type (default: `undefined`)
- `bind {Boolean}` if `true` rebinds `data-bind` on this element only (default: `0`)
- `multiline {Boolean}` optional, enables multiline + appends class `editable-multiline` (`inline-block` + `width:100%`) when it's editing (default: `false`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)