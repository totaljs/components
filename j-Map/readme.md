## j-Map

- easy usage
- `data-jc-path="target.property"` can contain GPS `48.727903,19.157763` or text `Viestova 28, Banská Bystrica, Slovakia`
- two way binding works with GPS (so the component returns GPS coordinates into the model when the `text` is used instead of GPS)
- __important__: the component element (or its `CSS`) must have defined `width` and `height` style attributes

__Attributes__:
- `data-type` (optional) has to contain a map type (`roadmap` (default), `satellite`, `hybrid`, `terrain`)
- `data-draggable` (optional) for drag & drop marker (default: `false`)
- `data-click` (optional) has to contain a function name and this method is evaluated when the user click on the marker
- `data-zoom` (optional), default `13`
- `data-icon` (optional) has to contain a URL to a new icon marker

__Methods__:
- `component.search(lat, lng)` arguments must be numbers
- `component.search(text)` arguments must be a string

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT