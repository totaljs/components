## j-Edit

The component enables `contenteditable` attribute for elements with `edit` or `edit2` classes.

- singleton
- put the component under `<body` element like `j-Directory` or `j-DatePicker`

__Good to know__:

- each element with the `edit` class is possible to edit with a single click
- each element with the `edit2` class is possible to edit with a double click

__Configuration__:

- `dateformat {String}` a default format for parsing dates (default: `yyyy-MM-dd`)
- __NEW__: `exec {String}` optional, a default path to `function(opt, accept(boolean/html_value_for_the_element))`
- `floating {Boolean}` optional, can enables floating by default (default: `false`)
- `minwidth {Number}` optional, a min width


---

`data-edit` attribute supports:

- `required` {Boolean} optional, enables "required" (default: `false`)
- `type` {String} optional, can be `string` (default), `date`, `number`, `boolean`, `email`, `url`, or `html`
- `check {String}` optional, a path to `function(opt, el)` must return `boolean`, it means `Can the user edit that field?`
- `exec {String}` optional, a path to `function(opt, accept(boolean/html_value_for_the_element))`
- `format {String}` optional, a format for `date`, default: `yyyy-MM-dd`
- `maxlength {Number}` a maxlength
- `minvalue {Number}` a min. value for number type (default: `undefined`)
- `maxvalue {Number}` a max. value for number type (default: `undefined`)
- `bind {Boolean}` if `true` rebinds `data-bind` on this element only (default: `true`)
- `multiline {Boolean}` optional, enables multiline + appends class `editable-multiline` (`inline-block` + `width:100%`) when it's editing (default: `false`)
- `floating {Boolean/String}` optional, enables floating window for the element (default: `false`, `string` can contain `position` or `offset` values)
- `offsetX {Number}` optional, additional X offset for the floating window
- `offsetY {Number}` optional, additional Y offset for the floating window
- `offsetWidth {Number}` optional, additional width for the floating window
- `width {Number}` optional, a fixed width for floating panel
- `parent {String}` optional, a selector for obtaining of offset (can contain `parent` or jQuery selector for `.closest()` method)
- `selectall {Boolean}` optional, selects all text
- `cursor {String}` optional, a cursor position `beg` or `end` (default)
- __NEW__: `notify {String}` optional, a path to `function(opt)` that will be notified after successful change
- __NEW__: `prevent {Boolean}` optional, executes `.preventDefault()` and `.stopPropagation()` in the click event

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)