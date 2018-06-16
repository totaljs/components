## j-Grid

- please try to understand the functionality
- needed `bootstrap` grid system

__Data-source__ needs to contain:

```javascript
{
    items: [{ name: 'Row 1' }, { name: 'Row 2' }, ...] // items
    page: 1,    // current pages
    pages: 30,  // count of pages
    limit: 5,   // items limit per page
    count: 150  // count of items in DB
}
```

__Configuration__:

- `filter` {Boolean} shows a filter (optional, default: `true`)
- `filterlabel` {String} a default placeholder for all filters (optional)
- `external` {Boolean} is an external data-source (dynamic data loading) (optinal, default: `false`)
- `pluralizepages` {String} pluralization for pages (optional, default: `# pages,# page,# pages,# pages`)
- `pluralizeitems` {String} pluralization for items (optional, default: `# items,# item,# items,# items`)
- `exec` {String} a link to `function(type, filter, sort, page)`, it's evaluated if the grid performs some operations
- `padding` {Number} height padding (optional, default: `0`)
- `autosize` {Boolean} enables full-height auto-size (optional, default `true`)
- `boolean` {String} a values for filtering of boolean values (optional, default: `true|on|yes`)
- `pagination` {Boolean} shows pagination panel (optional, default: `false`)
- `init` {Function} an init function for e.g. custom columns
- `checked` {Function} if rows will contain `<input type="checkbox` then this function will be evaluated when the checkbox is checked

__Column properties__:

- `name` {String} a name of field in the object
- `text` {String} a column label
- `title` {String} a column tooltip (optional)
- `size` {Number} a column width: `1` small, `2` medium, `3` large, `4` very large (optional, default `1`)
- `size` {String} a column width in pixels, value needs to contains `px` e.g. `20px`
- `filter` {String/Boolean} a placeholder for the filter or `boolean` can disable filter for this column (optional)
- `format` {String/Number} for formatting values (`string` for date, `number` for numbers)
- `background` {String} a background color (optional)
- `align` {String} can be `center` or `right` (optional, default: `left`)
- `template` {String} can be a Tangular template and the model is the whole object of row
- `render` {String/Function(value, column, row)} a custom rendering, `string` is evaluated as an arrow function
- `header` {String/Function(column)} a custom rendering of header, `string` is evaluated as an arrow function
- `sort` {Boolean} enables sorting (optional, default: `true`)
- `class` {String} additional classes for the column, e.g. `hidden-xs`
- `search` {Boolean/String} `true` will filter a value according to the `template` result or `String` can be a Tangular template which will be used as a value for search

__Filtering__:

- `numbers`: (1) `number` searches an exact number, (2) `number / number` is an interval between numbers
- `strings`: (1) `string` searches an exact string, (2) `string1, string2, string3` is a multiple search criterium
- `dates`: (1) year `2017` searches all dates in this year, (2) `2017-02-12 / 2017-03-13` is an interval between dates, (3) `20.12 / 31.12` an interval between dates in the current year

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT