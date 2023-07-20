## j-DataTable

__BETA__: This component is targeted for SPA and server-side listing.

- please try to understand the functionality
- supports pagination
- needed `bootstrap` grid system
- supports sorting
- supports vertical/horizontal scrolling
- responsive
- supports __dark mode__

__Data-source__ needs to contain:

```javascript
{
	cols: [{ name: 'id', ... }], // optional, can be defined inline in HTML
    items: [{ name: 'Row 1' }, { name: 'Row 2' }, ...] // items
    page: 1,    // current pages
    pages: 30,  // count of pages
    limit: 5,   // items limit per page
    count: 150  // count of items in DB
}
```

__Configuration__:

- `pluralizepages` {String} pluralization for pages (optional, default: `# pages,# page,# pages,# pages`)
- `pluralizeitems` {String} pluralization for items (optional, default: `# items,# item,# items,# items`)
- `height` {Number/String} height of grid, supported values: `auto` (default), __NEW__ `fluid`, `parent` or `NUMBER` as height or `selector` for jQuery.closest()
- __NEW__ `minheight` {Number} minimal height of grid, works with `fluid` and `auto` height (default: `300`)
- __NEW__ `parent` {String} selector for `auto` height option (default: `window`)
- `margin` {Number} a top margin for height (optional, default: `0`)
- `click` {String} a link to `function(row, grid, row_el)`, it's executed if the user clicks on a row
- `highlight` {Boolean} each selected row (after `click`) will be highlighted (default: `false`)
- `unhighlight` {Boolean} enables `undo highlighting` of selected row (default: `true`)
- `checked` {String} `path` to a variable or path to `function(rows, grid)` is executed if the user selected/checked some rows
- `autoselect` {Boolean} enables auto-select of first row in grid, it performs `EXEC(config.click)`, default: `false`
- `exec` {String} a link to `function(type, page, sort)` for server-side operations only (it disables client-side sorting & filtering), supported types: `refresh` or `page`
- `changed` {String} `path` to a variable or path to `function(rows, grid)` is executed if the user changed some rows
- `dblclick` {String} a link to `function(row, grid, row_el)` method, it's executed if the user double-clicks on a row
- `noborder` {Boolean} can disable a border around the grid (default: `false`)
- `colwidth` {Number} a default width for columns (default: `150`)
- `editable` {String} a link to `function(opt)` when the user performs editing
- `contextmenu` {String} a link to `function(e, grid)` when the user raises context menu

__Column properties__:

- `name` {String} a name of field in the row object
- `text` {String} a column label, text with `.fa fa-home` will render FontAwesome icon
- `width` {Number} a column width (optional, default `config.colwidth`)
- `align` {String} can be `center` or `right` (optional, default: `left`)
- `template` {String} can be a Tangular template and the model is the entire object of row
- `sort` {Boolean} enables sorting (optional, default: `false`)
- `format` {String/Number} can be used for date and numbers (count of decimals) field (optional), e.g. `dd.MM.yyyy`
- `currency` {String} a currency formatter, just add a currency
- `class` {String} optional, a custom column class name
- `empty` {String/Boolean} optional, can rewrite empty value with the value defined in empty field (`true` value uses `---` as a default value)
- `type` {String} optional, can contain a data-type (`boolean`, `date` or `number`) for the field
- `editable` {Boolean} enables editing

__Methods__:

- `component.redrawrow(row_object/index)` redraws row or __NEW__: replaces+redraws `row_object` with a new `new_object_row`
- `component.clear()` clears all changes
- `component.select(row)` selects `row` must be the same object as in data-source
- `component.rebind(columnsdeclaration)` the method rebinds the schema
- __NEW__: `component.reload()` executes `config.exec` with the current filter and sorting
- __NEW__: `component.empty()` empties all rows

__Good to know__:

- `SET('link.to.data', data, 'noscroll')` --> `noscroll` type disables reseting of scrolling

__How to extend a class of row?__

- look to the `{{ if active` line, it extends a class of row by adding `dg-active-class` if the `active` will be valid

```javascript
[
	'{{ if active }} dg-active-class{{ fi }}',
	{ name: 'name', text: 'Name', width: 200 },
	// other columns ...
]
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)