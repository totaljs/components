## j-LazyContent

This component shows own content when it's visible. It supports helpful features as `redraw` and `hide`.

__Configuration__:
- `height:NUMBER_IN_PIXELS"` optional, a default content height. __Default value__: is height of the current element
- `init:method_or_variable"` is executed when the element first time visible is (optional)
- `redraw:method_or_variable"` is executed when the element again visible is (optional)
- `hide:method_or_variable"` is executed when the element hidden is (optional)

__Notes__:
- `init` will be executed only one time
- `redraw` and `hide` will be executed more times
- if the attributes contains link to `variable` (not methods) then as value is stored `Boolean` value.
- __important__: scroll area must be `document.body` element

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT