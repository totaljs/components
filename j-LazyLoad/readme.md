## j-LazyLoad

- easy usage
- can be used for everything
- vertically position only

__Attributes__:
- `data-jc-path` (optional) if the path is changed then the component refreshes the state automatically
- `data-container=".scroller"` (optional) a scrolling container when you use something else than `window` object. It has to contain a jQuery selector. Default `window` object.
- `data-selector=".lazyload"` (__important__) jQuery selector for lazy elements
- `data-exec="METHOD"` (__important__) a method name, this method is executed when the element is in scrolling area. It's executed onetime.
- `data-offset="50"` (optional) a number and this value extends the size of scrolling area (top/bottom). Default value `50`

__Methods__:
- `instance.refresh()` refreshes current state

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT