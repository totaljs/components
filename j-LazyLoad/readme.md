## j-LazyLoad

- easy usage
- can be used for everything
- vertically position only

__Configuration__:

Example: `data-jc-config="selector:img;container:.photos;exec:function_name"`

- `container` {String} a selector as a scrolling container (default: `window`)
- `selector` {String} (__important__) selector for lazy elements
- `exec` {String} a link to method, executed if the lazy element is visible
- `offset` {Number} this value extends the size of scrolling area top/bottom. (default: `50`)

__Methods__:
- `instance.refresh()` refreshes current state

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT