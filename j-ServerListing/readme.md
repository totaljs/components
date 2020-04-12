## j-ServerListing

- easy usage

__Configuration__:

- `paginate(page)` {String} link to a function for pagination
- `pages` {Number} max. pages in pagination (default: `3` --> half + current page + half)
- `scrolltop` {Boolean} scrolls top automatically when the user changes a page
- `parent` {String} jQuery selector for obtaining of height, enables fixed area with custom scrollbars
- `margin` {Number} a margin for `parent` (default: `0`)
- `marginxs` {Number} optional, a top/bottom margin together for `xs` screen width
- `marginsm` a top/bottom margin together for `sm` screen width
- `marginmd` a top/bottom margin together for `md` screen width
- `marginlg` a top/bottom margin together for `lg` screen width
- __NEW__: `pluralizeitems` a pluralization for count of all items, form: `# zero,# one,# two-four,# five and more`
- __NEW__: `pluralizepages` a pluralization for count of all items, form: `# zero,# one,# two-four,# five and more`

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
