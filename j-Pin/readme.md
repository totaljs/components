# j-Pin

A simple PIN maker.

- jComponent `v19|v20`

__Configuration__:

- `count {Number}` a count of PIN inputs (default: `6`)
- `required {Boolean}` enables "required" (default: `false`)
- `disabled {Boolean}` can disabled this control
- `hide` {Boolean} disables displaying of numbers (default: `false`)
- `mask {Boolean}` disables the mask (default: `true`)
- __NEW__ `exec {String}` a path to `function(pin)`
- __NEW__ `allowpaste {Boolean}` enables pin pasting (default: `true`)

__Good to know__:

- input with no value creates a space
- it expects `String`

__Methods__:

- `component.focus()` focuses the first input
