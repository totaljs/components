## j-DataGrid

This grid was created for single page applications and enterprise applications.

- please try to understand the functionality
- needed `bootstrap` grid system
- you can render more than 30 000 rows without any problem
- supports drag&drop columns
- supports sorting
- supports resizing of columns
- supports vertical/horizontal scrolling
- supports filters
- supports checkboxes
- custom scrollbars independent on OS
- responsive
- supports __dark mode__
- __IMPORTANT__ column options filter needs `j-Directory` component

__TO-DO__:

- multisort
- resizing columns for touch devices
- re-ordering columns for touch devices

__Data-source__ needs to contain:

```js
{
	schema: 'schema_id', // NEW: optional, DataGrid supports multiple schemas (it means: multiple declaration of columns)
    items: [{ name: 'Row 1' }, { name: 'Row 2' }, ...] // items
    page: 1,    // current pages
    pages: 30,  // count of pages
    limit: 5,   // items limit per page
    count: 150  // count of items in DB
}
```

or raw `Array` but you can't use pagination and external filters:

```js
[{ name: 'Row 1' }, { name: 'Row 2' }];
```

__Configuration__:

- `filterlabel` {String} a default placeholder for all filters (optional)
- __NEW__ `rememberfilter {Boolean}` with true it remembers filters for every schema (default: `true`)
- __NEW__ `schema {String}` a default schema (default: `default`)
- `pluralizepages` {String} pluralization for pages (optional, default: `# pages,# page,# pages,# pages`)
- `pluralizeitems` {String} pluralization for items (optional, default: `# items,# item,# items,# items`)
- `height` {Number/String} height of grid, supported values: `auto` (default), __NEW__ `fluid`, `parent` (or `parent1`, `parent2`) or `NUMBER` as height or `selector` for jQuery.closest()
- `minheight` {Number} minimal height of grid, works with `fluid` and `auto` height (default: `200`)
- `parent` {String} selector for `auto` height option (default: `window`)
- `margin` {Number} a top margin for height (optional, default: `0`)
- `boolean` {String} a values for filtering of boolean values (optional, default: `true|on|yes`)
- `resize` {Boolean} enables resizing of columns (optional, default: `true`)
- `reorder` {Boolean} enables re-ordering of columns (optional, default: `true`)
- `sort` {Boolean} enables sorting (optional, default `true`)
- `remember` {Boolean} remembers re-ordering and resizing columns (optional, default `true`)
- `checkbox` {Boolean} enables checkboxes
- `colwidth` {Number} a default column width in pixels (optional, default `150`)
- `rowheight` {Number} a default row height in pixels (optional, default: `24`) + it depends on CSS
- `alignheader` {String/Number} align for header `right` (or `2`) or `center` (or `1`) (optional, default: `left`)
- `alignfilter` {String/Number} align for filter input `right` (or `2`) or `center` (or `1`) (optional, default: `left`)
- `align` {String/Number} align for a column value `right` (or `2`) or `center` (or `1`) (optional, default: `left`)
- `click` {String} a link to a path or `function(row, grid, row_el)`, a record will be assigned/executed if the user clicks on a row
- `clickid` {String} an identificator/property name for backwards redrawing (for previous row highlight), default: `id`
- `highlight` {Boolean} each selected row (after `click`) will be highlighted (default: `false`)
- `unhighlight` {Boolean} enables `undo highlighting` of selected row (default: `true`)
- `checked` {String} `path` to a variable or path to `function(rows, grid)` is executed if the user selected/checked some rows
- `autoselect` {Boolean} enables auto-select of first row in grid, it performs `EXEC(config.click)`, default: `false`
- `limit` {Number} a cluster limit, default: `80`
- `numbering` {Boolean}, optional default `false`
- `allowtitles` {Boolean}, enables titles for all row values, optional default `false`
- `button` {String} a link to `function(btn_name, row, btn_element, event, name)` is executed if the user clicks on a __button__ in the row
- `exec` {String} a link to `function(type, filter, sort, page)` for server-side operations only (it disables client-side sorting & filtering), supported types: `refresh` or `page`
- `changed` {String} `path` to a variable or path to `function(rows, grid)` is executed if the user changed some rows
- `change` {String/Boolean __NEW__} boolean enables internal editing or string must contain a `path` to a variable or path to `function(meta, next(meta))` is executed if the user double clicks on a column (`meta` can be `null` if the grid is refreshed) + `next(null)` replaces previous content again
- `columns` {String} a path to definition of `columns {Array}`
- `dblclick` {String} a link to `function(row, grid, row_el)` method, it's executed if the user double-clicks on a row
- `noborder` {Boolean} can disable a border around the grid (default: `false`)
- `clusterize` {Boolean} can disable clustered scrolling (default: `true`)
- `contextmenu` {String} a link to `function(e, grid)` when the user raises context menu
- `autoformat` {Boolean} enables auto-format types like `email`, `phone` and `number` (default: `true`)
- `controls` {Boolean} enables controls defined in `columns` (default: `true`)
- `hfunc` {String} a link to `function(el)` method, it's executed if the user clicks on the icon added to very first header row. usefull to integrate other component with DataGrid. e.g. j-filter
- `hfuncicon` {String} hfunc icon e.g. home, cog, etc.
- `pagination` {Boolean} enables/disables pagination (default: `true`)
	- `config.exec` will be executed if the scrollbar is at the end, and you can use as the raw response `array` of rows
- __NEW__ `ovalue {String}` a default key for obtaining of `value` from `column.options` (default: `id`)
- __NEW__ `otext {String}` a default key for obtaining of `text` from `column.options` (default: `name`)

__Column properties__:

- `name` {String} a name of field in the row object
- `text` {String} a column label, text with `.fa fa-home` will render FontAwesome icon
- `title` {String} a column tooltip (optional)
- `width` {Number} a column width (optional, default `config.colwidth`)
- `filter` {String/Boolean} a placeholder for the filter or `boolean` can disable filter for this column (optional)
- `filtervalue` {Object} optional, a preddefined filter value (default: `undefined`)
- `filtertype` {Number/String}, `1` disables smart searching (default: `0` - it means enabled smart searching)
- `align` {String} can be `center` or `right` (optional, default: `left`)
- `template` {String} can be a Tangular template and the model is the entire object of row
- `sorting` {Boolean} enables sorting (optional, default: `true`)
- `search` {Boolean/String} `true` will filter a value according to the `template` result or `String` can be a Tangular template which will be used as a value for search
- `format` {String/Number} can be used for date and numbers (count of decimals) field (optional), e.g. `dd.MM.yyyy`
- `hide` {Boolean} hides a column
- `listcolumn` {Boolean} default:true, false for removing column from columns list
- `hidden` {String} as an arrow function `column => true` --> column will be hidden (e.g. for restricting user)
- `options` {Object Array} optional, a custom filter for example `[{ text: 'yes', value: true }, { text: 'no', value: false }]` or {String} link to data-source
- `otext` {String} optional, a key for `text` field in `options`, default `config.otext`
- `ovalue` {String} optional, a key for `value` field in `options`, default `config.ovalue`
- `buttonapply` {String} optional, a label for `Apply` button in columns, default: `Apply`
- `class` {String} optional, a custom column class name
- `empty` {String/Boolean} optional, can rewrite empty value with the value defined in empty field (`true` value uses `---` as a default value)
- `min` {Number} __editable only__ a min. number value
- `max` {Number} __editable only__ a max. number value
- `required` {Boolean} __editable only__
- `dirsearch` {String/Boolean} a placeholder for `j-Directory` search, boolean with `false` will disable search
- `type` {String} optional, can contain a data-type (`string`, `boolean`, `date`, `number`, `email`, `phone` or `url`) for the field
- `editable` {Boolean} enables editing
- `currency` {String} a currency name (must be defined in `DEF.currencies`)
- __NEW__ `editable` {String} A path to custom editable `function(meta)`, important: `meta.next(new_value)` or `meta.cancel()`
- __NEW__ `colorize` {Boolean} enables a colorization of the value
- __NEW__ `monospace` {Boolean} enables monospace font type

__Row controls (NEW)__:

- can be defined as column type `controls`
- must defined column `template` (Tangular, `row` is a model for Tangular for each row)
- look to example
- button `click` event is captured to `config.button`

__Filtering__:

- `numbers`: (1) `number` searches an exact number, (2) `number - number` is an interval between numbers
- `strings`: (1) `string` searches an exact string, (2) `string1, string2, string3` is a multiple search criterium
- `dates`: (1) year `2017` searches all dates in this year, (2) `2017-02-12 - 2017-03-13` <--> `02.12.2017 - 13.03.2017` is an interval between dates, (3) `12-20 - 12-31` <--> `20.12 - 31.12` an interval between dates in the current year ir (4) `2017-01 - 2018-05` <--> `01.2017 - 05.2018` or (5) `-5 days` <--> `-1 week` <--> `-10 years`

__Methods__:

- `component.redraw([reselect_again])` can redraw rows again (only for modifications, if you will remove some row you need to update the entire model)
- `component.resetfilter()` can reset a filter
- `component.exportrows(page_from or true from the current page, pages_count, callback(rows, internal_options), [reset_to_page or true for the current page])` can export rows with server-side rendering
- `component.appendrow(row_object, [scrolldown], [prepend])` appends and render row
- `component.redrawrow(row_object, [new_object_row])` redraws row or __NEW__: replaces+redraws `row_object` with a new `new_object_row`
- `component.clear()` clears all changes
- `component.select(row)` selects `row` must be the same object as in data-source
- `component.editcolumn(row_index, col_index)` executes `config.change` internally (only for advanced usage)
- `component.applyfilter(obj)` can apply a custom filter `{ name: 'Peter', age: '20 - 50' }`
- `component.resetcolumns()` resets columns
- `component.readfilter()` returns a current filter
- `component.rebind(schemaname__or__columnsdeclaration)` the method rebinds the schema
- `component.reload()` executes `config.exec` with the current filter and sorting
- `component.empty()` empties all rows
- `component.redrawcolumns()` redraw columns without reset them
- __NEW__: `component.schema(name)` changes a schema and refreshes data

__Properties__:

- `component.meta` returns internal meta info about filters, columns and rows

__Good to know__:

- `NULL('link.to.data')` evaluates `config.exec`
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

__Multiple schemas__:

```html
<div data---="datagrid__obj">

	<script type="text/plain" data-id="SCHEMA_A">
		[
			{ name: 'name', text: 'Name', width: 200 },
			// ...
		]
	</script>

	<script type="text/plain" data-id="SCHEMA_B">
		[
			{ name: 'price', text: 'Price', width: 100 },
			// ...
		]
	</script>

</div>

<script>
	// Usage
	var obj = {};
	obj.schema = 'SCHEMA_A';
	obj.items = [];

	// Changing of schema
	setTimeout(function() {
		obj.schema = 'SCHEMA_B';
		obj.items = [];
		UPD('obj');
	}, 5000);
</script>
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
