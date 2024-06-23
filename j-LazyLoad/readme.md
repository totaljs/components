## j-LazyLoad

- easy usage
- can be used for everything
- vertically position only

- jComponent `v19|v20`

__Configuration__:

- `container {String}` a selector as a scrolling container (default: `window`)
- `selector {String}` (__important__) selector for lazy elements
- `exec {String}` a link to method, executed if the lazy element is visible
- `offset {Number}` this value extends the size of scrolling area top/bottom. (default: `50`)

__Methods__:
- `instance.refresh()` refreshes current state

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)