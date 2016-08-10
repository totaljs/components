This component shows own content when is visible. It supports helpful features as `redraw` and `hide`.

__Attributes__:
- `data-height="NUMBER_IN_PIXELS"` optional, a default content height. __Default value__: is height of the current element
- `data-init="method_or_variable"` is executed when the element first time visible is (optional)
- `data-redraw="method_or_variable"` is executed when the element again visible is (optional)
- `data-hide="method_or_variable"` is executed when the element hidden is (optional)

__Notes__:
- `data-init` will be executed only one time
- `data-redraw` and `data-hide` will be executed more times
- if the attributes contains link to `variable` (not methods) then as value is stored `Boolean` value.
- __important__: scroll area must be `document.body` element

### Author

Peter Širka <petersirka@gmail.com>
License: MIT