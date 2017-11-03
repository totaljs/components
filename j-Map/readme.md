## j-Map

- easy usage
- `data-jc-path="target.property"` can contain GPS `48.727903,19.157763` or text `Viestova 28, Banská Bystrica, Slovakia`
- two way binding works with GPS (so the component returns GPS coordinates into the model when the `text` is used instead of GPS)
- __important__: the component element (or its `CSS`) must have defined `width` and `height` style attributes

__Configuration__:
Example: `data-jc-config="draggable:true;animation:bounce;zoom:10"`
- `type` (optional) has to contain a map type (`roadmap` (default), `satellite`, `hybrid`, `terrain`)
- `draggable` (optional) for drag & drop marker (default: `false`)
- `click` (optional) has to contain a function name and this method is evaluated when the user click on the marker
- `zoom` (optional), default `13`
- `icon` (optional) has to contain a URL to a new icon marker
- `animation` (optional) has to contain a animation type (`bounce` and `drop`)

__Methods__:
- `component.search(lat, lng)` arguments must be numbers
- `component.search(text)` arguments must be a string
- `component.reset()` call `resize` event (useful for modals)
- `component.reset(lat, lng)` arguments must be numbers

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT
