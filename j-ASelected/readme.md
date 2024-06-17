## j-ASelected

- jComponent `v19|v20`
- readonly

The component adds `selected` class to `<a` element if the `href` attribute of the element will contain URL address from the web browser. It's targeted for public websites.

__Configuration__:

- `class {String}` is a class name for selected element (default: `selected`)
- `selector {String}` is a jQuery selector (default: `a`)
- `attr {String}` attribute for comparing (default: `href`)
- `strict {Boolean}` enables strict comparing of URL address (default: `false`)
- `delay {Number}` a delay for rebinding of selection when the model is changed (default: `300`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)