## j-SearchInput

Customizable search input.

- jComponent `v19|v20`

__Configuration__:

- `searchicon {String}` search icon (default: `ti ti-search`)
- `cancelicon {String}` cancel icon (default: `ti ti-times`)
- `align {String}` icon align (default: `left`)
- `placeholder {String}` a plceholder
- `autofocus {Boolean/Number}` enables auto-focus for non-mobile devices (number means a delay for auto-focus, default: `false`)
- `exec {String}` a link to `function(value, element)` which is evaluated if the search input is affected

__Methods__:

- `component.focus()` focuses input
- `component.clear()` clears input

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)