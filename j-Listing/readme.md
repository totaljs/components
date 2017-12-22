## j-Listing

- easy usage
- works with the whole Arrays only on client-side

__Configuration__:

- `count` {Number} Optional, items per page (default: `20`)

__Tangular layout__:

- `body` {String} contains all rendered items, output is __HTML__
- `page` {Number} current page number
- `pages` {Number} count of pages
- `count` {Number} count of items

__Tangular item__:

- `model` contains an object from `Array`
- second model contains info about data-source `{ index: Number, page: Number, pages: Number, count: Number }`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT