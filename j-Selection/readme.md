- The component supports something like checkbox list.

__Configuration__:

- `remember {Boolean}` remembers selection when the `datasource` is changed (default: `true`)
- `datasource {String}` a path to the datasource (default: empty)
- `key {String}` an `identifier` key name for the datasource (default: `id`)
- `attr {String}` a `data-[attr]` for storing of `identifier` (default: `id`)
- `selector {String}` a jQuery selector for elements (default: `.selection`)
- `class {String}` selected class (default: `selected`)
- `dblclickselectall {Boolean}` enables reverse selection after double-click (default: `true`)

__Methods__:

- `component.selectall()` selects all items
- `component.selectnone()` selects none
- `component.selecttoggle()` reverses selection

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)