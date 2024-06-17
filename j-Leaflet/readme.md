## j-Leaflet (BETA)

This component uses [Leaflet](https://leafletjs.com/) library with the [OpenStreetMap](https://www.openstreetmap.org/) map engine. The component uses 3rd party dependencies.

- jComponent `v19|v20`

__Configuration__:

- `height {Number/String}` fixed height or a parent element (default: `200`)
- `margin {Number}` a margin for parent element (default: `0`)
- `marker {Boolean}` enables marker (default: `true`)
- `draggable {Boolean}` enables draggable marker (default: `false`)
- `zoom {Number}` a default zoom level (default: `10`)
- `maxzoom {Number}` a maximum zoom level (default: `19`)
- `icon {String}` a URL to the default marker icon
- `iconanchor {String}` optional, icon anchor in the for `x,y` (default: `undefined`)
- `iconsize {String}` optional, icon size in the for `w,h` (default: `undefined`)
- `move {String}` move event - a link to the function or variable `function(pos)`
- `click {String}` a marker click event - a link to the function or variable `function(pos)`
- `center {String}` a default location (e.g. `Bratislava, Slovakia`) if the `setter` value is empty/nullable

__Methods__:

- `component.search(location, callback)` searchs locality in the OpenStreetMap API (response is array)
- `component.parse(pos)` returns parsed GPS to array `[lat, lon, zoom]`
- `component.center(pos)` centers map to the specific position

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)