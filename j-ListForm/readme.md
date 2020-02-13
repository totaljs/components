## j-ListForm

__Configuration__:

- `autofocus` {String/Boolean} focuses the first input element, `string` means a custom selector (default: `false`)
- `empty` {String} empty list text (default: `---`)
- `required` {Boolean} controll will be "required" (default: `false`)
- `disabled` {Boolean} disables the control (default: `false`)
- `formclass` {String} a custom class for form container
- `itemclass` {String} a custom class for item container
- `create` {String} a link to a function `function(callback(DEFAULT_ITEM_OBJECT))`
- `submit` {String} a link to a function `function(form_data, callback(NEW_DATA))`
- `remove` {String} a link to a function `function(remove_item, callback(really_remove?))`

The component needs to have defined 3 templates wrapped in `<script type="text/html">`:

- `1` first - with a Tangular template for rendering of item
- `2` second - a form with components (the form will be wrapped in isolated scope)
- `3` footer - a footer with button for `create` item

__Good to know:__

The component watches a click event on all buttons with `name` attribute:

- `name="submit"` performs submit/save of data to the model
- `name="remove"` removes the current item from the model
- `name="cancel"` cancels editing
- `name="create"` creates an empty form

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)