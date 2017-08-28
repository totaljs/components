## j-Features

- only for desktop computers
- singleton
- works with Bootstrap Grid System

### Methods

Method: `component.show([items], callback)`
- `items` {Object Array} (required) with list of features. Each item needs to contain:
    - `name` {String} a feature name
    - `icon` {String} (optional) icon without `fa-`
    - `keywords` {String} (optional) additional keywords for searching
    - `value` {Object/String/Number} a value
- `callback(selected)` {Function} a callback which is called when the user performs click for some feature. `selected` argument contains selected item.

Method: `component.hide()`

__Configuration__:
- `placeholder` {String} a placeholder for the search input
- `height` {Number} height of list item (optional, default `35`)

If the `value` isn't defined then the component uses `name` as `value.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT