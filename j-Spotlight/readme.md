## j-Spotlight

- singleton
- works with Bootstrap Grid System

__Configuration__:

- `height` {Number} a default height of each item (default: `40`, must be defined in CSS too)
- `placeholder` {String} a default placeholder (default: `Search`)

### Methods

__Methods__:

Method: `component.show(options)`

- `options.id` {String} optional, an identifier for recent items (default: `empty`)
- `optiont.recent` {String} enables recent items, must contain an expiration format (default: `3 days`, empty=disabled)
- `options.callback(selected_item)` {Function} is triggered when the user clicks on the item
- `options.cancel` {Function} is triggered then the user cancels component
- `options.search` {String} URL address for saerching of values in the form `GET /api/search/?={0}`
- or `options.search` {Function} a link to `function(search, next(ARR_ITEMS))` for searching
- `options.cache` {String} enables cache, can contain an expiration format e.g. `1 day` or `session`
- `options.remap` {Function} optional, it can remap results `items => items.map(...)`
- `options.clear` {Boolean} optional, it clears previous results (default: `false`)

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)