## j-Spotlight

- singleton
- works with Bootstrap Grid System

__Configuration__:

- `height` {Number} a default height of each item (default: `40`, must be defined in CSS too)
- `placeholder` {String} a default placeholder (default: `Search`)

__Methods__:

Method: `component.show(opt)`

- `opt.id {String}` optional, an identifier for recent items (default: `empty`)
- `optiont.recent {String}` enables recent items, must contain an expiration format (default: `3 days`, empty=disabled)
- `opt.callback(selected_item) {Function}` is triggered when the user clicks on the item
- `opt.cancel {Function}` is triggered then the user cancels component
- `opt.search {String}` URL address for saerching of values in the form `GET /api/search/?={0}`
- or `opt.search {Function}` a link to `function(search, next(ARR_ITEMS))` for searching
- `opt.cache {String}` enables cache, can contain an expiration format e.g. `1 day` or `session`
- `opt.remap {Function}` it can remap results `items => items.map(...)`
- `opt.clear {Boolean}` it clears previous results (default: `false`)
- `opt.init {Boolean}` makes empty search when the component is called (default: `false`)
- `opt.delay {Number}` a delay in `ms` for performing of searching (default: `100`)
- `opt.height {Number}` a height of item (default: `config.height`)
- `opt.class {String}` adds a custom class to the container
- __NEW__ `placeholder` {String} search placeholder (default: `config.placeholder`)

__Good to know__:

- `.items = [{ html }]` -> `html` field ( in items) will be rendered as a plain HTML

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)