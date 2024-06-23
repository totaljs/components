## j-Features

- only for desktop computers
- singleton
- works with Bootstrap Grid System
- jComponent `v19|v20`

### Methods

Method: `component.open(opt)`

- `opt.placeholder {String}` a placeholder for search input (default: `config.placeholder`)
- `opt.items {Object Array}` with list of features (required):
    - `name {String}` a feature name
    - `icon {String}` (optional) icon without `fa-`
    - `keywords {String}` (optional) additional keywords for searching
    - `value {Object/String/Number}` a value
- `opt.scrolltop {Boolean}` scrolls to top until it's displaying the window (default: `false`)
- `opt.callback(selected) {Function}` a callback which is called when the user performs click for some feature. `selected` argument contains selected item.

Method: `component.hide()`

__Configuration__:

- `placeholder {String}` a placeholder for the search input
- `height {Number}` height of list item (optional, default `35`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)