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

- `pagination` {Boolean} shows pagination panel (optional, default: `true`)
- `head` {Boolean} shows a head (optional, default: `true`)
- `pluralizepages` {String} pluralization for pages (optional, default: `# pages,# page,# pages,# pages`)
- `pluralizeitems` {String} pluralization for items (optional, default: `# items,# item,# items,# items`)
- `pageclick` {String} a link to `function(page)`, it's evaluated if the pagination is changed
- `columnclick` {String} a link to `function({ columns: [], column: {} })`, it's evaluated if on the column is clicked
- `init` {String} a link to `function(count, height)`, it's evaluated if the grid is initialized
- `rowheight` {Number} row height (optional, default: `28`)
- `padding` {Number} height padding (optional, default: `0`)
- `offset` {Boolean} enables Y offset of parent element (optional, default `false`)
- `autosize` {Boolean} enables full-height auto-size (optional, default `true`)

__Column attributes in the template__:

- `name="price"` {String} a property name for e.g. sorting (required)
- `text="Price"` {String} a column name for column header (optional, default: `property name`)
- `width="150"` {Number} width in pixels (optional)
- `align="center"` {String} can contain `left` (default), `right` or `center` for column header
- `title="Tooltip"` {String} can contain a tooltip text for column header (optional)
- `icon="home"` {String} font-awesome icon without `fa-` for column header (optional)
- `bg="#F0F0F0` {String} a background color for column header (optional)

__Disabling column borders__

- just add a class `grid-noborder`

```html
<div data-jc="grid" class="grid-noborder" ...>
    ...
</div>
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT