---
name: ServerGrid
description: Beta paged data grid for single page apps, where columns, rows, sorting, filtering and pages come from the data-source
author: Peter Širka
version: 2
darkmode: false
license: https://www.totaljs.com/license/
created: 2025-01-03 21:15
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ServerGrid

__BETA VERSION__. This grid is designed for single page and enterprise applications. It's a simple alternative to the much more powerful `j-DataGrid`.

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
			color: '#000000' // optional: color for all rows,
			dirsource: [{ id: 'String|Number|Boolean', name: '...' }] // optional: a dropdown filter (it needs "directory" component)
		}
	],
    items: [{ name: 'Row <b>1</b> will be bold', $class: 'NEW: css class for the row', $style: 'NEW: css for the row' }, { name: 'Row 2' }, ...] // items
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
- `opacity {Number}` a default background opacity for column colors (default: `0.3`);
- __NEW__: `scrollbarshadow {Boolean}` enables scrollbar shadow (default: `false`)
- __NEW__: `scrolltop {Boolean}` it automatically scrolls to the top after the data source is changed (default: `true`)

__Good to know__:

- `NULL('link.to.data')` evaluates `config.exec`
