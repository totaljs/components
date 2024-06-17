## j-SearchData

This component tries to filter data according to the search phrase.

- jComponent `v19|v20`

__Configuration__:

- `datasource {String}` __required__ - a path to the data-source with list of items `Array`
- `output {String}` __required__ - a path for filtered items
- `key {String}` __required__ - a key/property name for searching (default: `name`)
- `delay {Number}` a delay (default: `50` ms)
- `splitwords {Boolean}` tries to find word in various position (default: `true`)

__Good to know__:

This component adds classes below automatically when:

- class `ui-search-used` is added when the user searches for something
- class `ui-search-empty` is added when the user searches for something and at the same time nothing was found

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)