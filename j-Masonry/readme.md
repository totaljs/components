## j-Masonry

A simple Masonry component. The component renders an Array according to the display size to columns.

__Configuration__:

- `lg {Number}` (large display) column width in percentage (default: `25`)
- `md {Number}` (medium display) column width in percentage (default: `33.33`)
- `sm {Number}` (small display) column width in percentage (default: `50`)
- `xs {Number}` (extra-small display) column width in percentage (default: `100`)
- __NEW__ `vdom {String}` optional, an item jQuery selector for virtual dom comparing
- __NEW__ `vdomattr {String}` optional, an attribute name for comparing virtual dom elements (values from the attribute will be compared between each other)

__Tangular model__:

- `value {Object}` contains a raw value from the array
- `index {Number}` a current processed row within the column
- `column {Number}` a current column index
- `counter {Number}` a current index of processed item within the array

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)