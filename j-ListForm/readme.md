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

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)