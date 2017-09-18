## j-Layer

- Works only with +`v11.1.0` [jComponent](http://jcomponent.org)
- __Download__ [jComponent with Tangular (jcta.min.js)](https://github.com/petersirka/jComponent)
- Works with Bootstrap
- __IMPORTANT__ `data-jc-path` expects {String Array}

__Configuration__:

Example: `data-jc-config="title:Layer title;if:user"`

- `title` {String} form title
- `if` {String} condition for showing of layer, it's compared with the value within of `data-jc-path`
- `reload` {String} link to a global function and it's executed if the form is showing
- `container` {String} jQuery selector for auto-height dimension (default: `.ui-layer-body`)
- `default` {String} (optional) a short alias for `DEFAULT(default, true)`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT