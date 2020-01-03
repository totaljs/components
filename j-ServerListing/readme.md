## j-ServerListing

- easy usage

__Configuration__:

- `paginate(page)` {String} link to a function for pagination
- `pages` {Number} max. pages in pagination (default: `3` --> half + current page + half)
- `scrolltop` {Boolean} scrolls top automatically when the user changes a page
- `height` {String} jQuery selector for obtaining of height, enables fixed area with custom scrollbars
- `margin` {Number} a margin for `height` (default: `0`)

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

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
