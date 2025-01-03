## j-ServerGrid

__BETA VERSION__. This grid is designed for single page and enterprise applications. It's a simple alternative to the much more powerful `j-DataGrid`.

- jComponent `v19|v20`
- please try to understand the functionality

__Data-source__ needs to contain:

```js
{
	columns: [
		{
			id: 'name',
			name: 'Name',
			width: 150, // optional (default: config.colwidth)
			filtering: false, // optional (default: false)
			sorting: false, // optional (default: false)
			align: 1, // optional: 0 or left (default), 1 or center, 2 or right
			alignheader: 1, // optional: 0 or left (default), 1 or center, 2 or right
			alignfilter: 1, // optional: 0 or left (default), 1 or center, 2 or right
			icon: 'ti ti-home', // optional: column icon
			color: '#000000' // optional: color for all rows
		}
	],
    items: [{ name: 'Row <b>1</b> will be bold' }, { name: 'Row 2' }, ...] // items
    page: 1,    // current pages
    pages: 30,  // count of pages
    limit: 5,   // items limit per page
    count: 150  // count of items in DB
}
```

__Configuration__:

- `colwidth {Number}` a default column width in pixels (default: `150`)
- `pluralizepages {String}` pluralization for pages (optional, default: `# pages,# page,# pages,# pages`)
- `pluralizeitems {String}` pluralization for items (optional, default: `# items,# item,# items,# items`)
- `margin {Number}` a top margin for height (optional, default: `0`)
- `noborder {Boolean}` can remove a border (default: `false`)
- `parent {String}` selector for `auto` height option (default: `window`)
- `height {Number}` a fixed height
- `filter {String}` a default placeholder for all filters (optional)
- `click {String}` a link to a path or `function(row, row_element)`
- `cell {String}` a link to a path or `function(row, cell_element, column)`
- `exec {String}` a link to `function(type, filter, sort, page)` for server-side operations (supported types: `filter`, `page` and `sort`)

__Good to know__:

- `NULL('link.to.data')` evaluates `config.exec`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
