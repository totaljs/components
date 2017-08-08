## j-Features

- only for desktop computers
- singleton
- works with Bootstrap Grid System

__Methods__:

Method: `component.show([items], clickCallback)`

- `items` `{Array}` or `{String}` (with the path) and must have this structure: `[{ name: String, value: String, icon: String }]` (important: icon is optional and without `fa-`)
- `callback(selectedItem)` `{Function}` is triggered when the user clicks on the item

Method: `component.hide()`

__Configuration__:
- `placeholder` - a placeholder for the search input

If the `value` isn't defined then the component uses `name` as `value.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT