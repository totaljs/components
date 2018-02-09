## j-ServerListing

- easy usage

__Configuration__:

- `paginate(page)` {String} link to a function for pagination
- `pages` {Number} Optional, max pages in pagination (default: `3` --> half + current page + half)

__Model__:

The model must be in the format below:

```javascript
{
	page: Number,
	count: Number,
	pages: Number,
	items: [{...}, {...}]
}
```

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