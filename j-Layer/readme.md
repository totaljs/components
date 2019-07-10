## j-Layer

- Works with Bootstrap
- __IMPORTANT__ `data-jc-path` expects {String Array}

__Configuration__:

- `title` {String} form title
- `if` {String} condition for showing of layer, it's compared with the value within of `data-jc-path`
- `reload` {String} link to a global function and it's executed if the form is showing
- `container` {String} jQuery selector for auto-height dimension (default: `.ui-layer-body`)
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`
- __NEW__: `scrollbar` {Boolean} enables custom scrollbar (default: `true`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT