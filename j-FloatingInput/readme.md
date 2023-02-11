## j-FloatingInput

- singleton
- supports __dark mode__

__Methods__:

Method: `component.show(options)`

- `options.element` {Element/jQuery Element}
- `options.offsetX` {Number} optional, `x` offset (default: `0`)
- `options.offsetY` {Number} optional, `y` offset (default: `0`)
- `options.offsetWidth` {Number} optional, `width` offset (default: `0`)
- `options.placeholder` {String} optional, a placeholder for search field
- `options.minwidth` {Number} optional, a minimal width, default `200`
- `options.maxwidth` {Number} optional, a maximal width, default `infinite`
- `options.maxlength` {Number} optional, a maximal length of value, default `50`
- `options.callback(value, element) {Function}` is triggered when the user clicks on the item
- `options.icon` {String} optional, Font-Awesome icon
- `options.close` {Function} optional, can determine closing of panel
- `options.align` {String} optional, `left` (default), `right` or `center`
- `options.value` {String} optional, a default value for the input
- `options.position` {String} optional, `top` (default), `bottom`
- `options.summary` {String} additional help content
- `options.monospace` {Boolean} enables monospace font
- `options.select` {Boolean} selects text
- __NEW__ `options.multiline` {Boolean} enables multiline
- __NEW__ `options.height` {Number} a height for multiline (default: `100`)

Method: `component.hide()`

__Configuration__:

- `placeholder` - a placeholder for the input

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)