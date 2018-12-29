## j-ViewBox

- keeps a fixed percentage height
- great usage for intranet applications

__Configuration__:

- `height` {Number} a percentage of height
- `disabled` {Boolean} optional, can disable a content with the layer
- `parent` {String} optional, a container with fixed height, can be `window`. Default value: `component.parent()`
- `minheight` {Number} a minimal height in pixels (default: `0` - disabled)
- `scroll` {Boolean} enables vertical scrolling (default: `false` - disabled)
- `delay` {Number} `msec.` resizes the box again if the value is changed according to the path (default: `100`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT