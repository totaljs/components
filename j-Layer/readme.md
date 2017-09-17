## j-Layer

- Works only with +`v11.1.0` [jComponent](http://jcomponent.org)
- __Download__ [jComponent with Tangular (jcta.min.js)](https://github.com/petersirka/jComponent)
- Works with Bootstrap

__Configuration__:

Example: `data-jc-config="title:Layer title;if:user"`

- `title` {String} form title
- `if` {String} condition for showing of the form, it's compared with the value within of `data-jc-path`
- `reload` {String} link to a global function and it's executed if the form is showing
- `container` {String} jQuery selector for auto-height dimension (default: `.ui-layer-body`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT