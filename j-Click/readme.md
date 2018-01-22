## j-Click

The component calls a method or can set a value according to the path.

__Configuration__:

Example: `data-jc-config="enter:#form;value:100"`

- `enter` {String} (optional) is a jQuery selector
- `value` {String/Number/Boolean} (optional) this value will be set to `data-jc-path`
- `disabled` {Boolean} disables this control
- `data-jc-type` works with `data-value`
- `data-jc-path` can be `value` or `function` (default behaviour when `value` is not defined in configuration).

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT