## j-MapMarker (BETA)

- jComponent `v19`
- `path="target.property"` can contain GPS `48.727903,19.157763` or text `Viestova 28, Banská Bystrica, Slovakia`
- two way binding works with GPS (so the component returns GPS coordinates into the model when the `text` is used instead of GPS)

__Google API__:

- allow `geometry` services

__Configuration__:

- `key {String}` __IMPORTANT__ Google API key
- `type {String}` needs to contain a map type (`roadmap` (default), `satellite`, `hybrid`, `terrain`)
- `draggable {Boolean}` for drag & drop marker (default: `false`)
- `zoom {Number}`, default `13`
- `autocomplete {Boolean}` enables auto-complete API (default: `false` and input must be attached by `mapmarker/autocomplete` method)
- `icon` needs to contain a URL to a new icon marker
- `animation` needs to contain a animation type (`bounce` and `drop`)
- `darkmode {Boolean}` enables dark mode (default: `false`)
- `parent {String}` jQuery selector which will be used as `height` container (default: `auto`)
- `height {Number}` height of the map (default: `undefined`)
- `heightlg {Number}` height of the map (default: `undefined`)
- `heightmd {Number}` height of the map (default: `undefined`)
- `heightsm {Number}` height of the map (default: `undefined`)
- `heightxs {Number}` height of the map (default: `undefined`)
- `margin {Number}` top/bottom margin of the map (default: `0`)
- `marginlg {Number}` top/bottom margin of the map (default: `undefined`)
- `marginmd {Number}` top/bottom margin of the map (default: `undefined`)
- `marginsm {Number}` top/bottom margin of the map (default: `undefined`)
- `marginxs {Number}` top/bottom margin of the map (default: `undefined`)
- `markerwidth {Number}` marker width, default `40`
- `markerheight {Number}` marker height, default: `50`
- `markeroffsetx {Number}` marker X offset, default `1`
- `markeroffsety {Number}` marker Y offset, default: `0`
- `infox {Number}` label offset Y, default: `0`
- `infoy {Number}` label offset X, default: `0`
- `labelopacity {Number}` marker label opacity, default: `0.75`
- `markercluster {Boolean}` enables marker clusterer (default: `true`)
- `onposition {String}` a path to `function(component, visible_markers)` - evaluated when the position on the map is changed
- `onready {String}` a path to `function(component)` - evaluated when the map is ready to use

__Methods__:

- `component.autocomplete(input)` input for autocomplete
- `component.clear()` Removes all markers
- `component.add(opt)` Adds marker
	- `opt.icon` URL address to icon
	- `opt.gps {String}` GPS position
	- `opt.center {Boolean}` centers the map to this position
	- `opt.tooltip {String}` tooltip for the marker
	- `opt.callback` {Function(opt)} triggered when the marker is added
	- `opt.onclick` {Function(opt)} triggered when the user clicks on the marker
	- `opt.onposition` {Function(opt)} triggered when the user changes the position of the map
	- __IMPORTANT__: `opt` will be extendend by adding methods: `opt.remove()`, `opt.setIcon(url)`, `opt.setPosition(gps)`, `opt.setVisible(boolean)` and properties: `opt.element`, `opt.marker`, `opt.map` and `opt.zoom`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
