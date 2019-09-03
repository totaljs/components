## j-ASelected

- singleton
- readonly

The component adds `selected` class to `<a` element if the `href` attribute of the element will contain URL address from the web browser. It's targeted for public websites.

__Configuration__:

- `class` {String} is a class name for selected element (default: `selected`)
- `selector` {String} is a jQuery selector (default: `a`)
- `attr` {String} attribute for comparing (default: `href`)
- `strict` {Boolean} enables strict comparing of URL address (default: `false`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT