- Works only with [jComponent](http://jcomponent.org)
- __Download__ [jComponent with Tangular (jcta.min.js)](https://github.com/petersirka/jComponent)
- Works with Bootstrap

__Attributes__:

- `data-title=""` title of the form
- `data-width="800px"` (optional) max-width, default: __800px__
- `data-if="value === 'user'"` condition for showing the form, the model is from `data-component-path`

__Properties__:

- `instance.submit = function(hide) { hide(); }` - the delegate for submitting form
- `instance.cancel = function(hide) { hide(); }` - the delegate for canceling form

### Author

Peter Širka <petersirka@gmail.com>
License: MIT