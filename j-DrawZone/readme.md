## j-DrawZone

The component can draw a zone (polygon). This component uses [OpenLayers](https://openlayers.org/) library with the [OpenStreetMap](https://www.openstreetmap.org/) map engine.

__Configuration__:

- `parent {String}` a parent element (default: `undefined`)
- `height {Number}` a fixed (minimal) height (default: `200`)
- `color {String}` a default color for polygon (default: `#fcba03`)
- `zoom {Number}` a default zoom level (default: `11`)
- `readonly {Boolean}` enables readonly mode (default: `false`)
- `stroke {Number}` a stroke width (default: `2`)
- `radius {Number}` a radius size of points in the polygon (default: `7`)
- `center {String}` a default map position (default: `48.73702478789267,19.137712002562715`)
- `opacity {Number}` determines the transparency of the polygon in percentage (default: `40`)
- `required {Boolean}` optional (default: `false`)

__Data-source__ needs to contain:

```js
{
    points: [{ lat: 48.75152530164132, lng: 19.13902142954625 }, { lat: 48.726826662905296, lng: 19.123238694044034 }, ...] // polygon points
    color: '#FD391A', // optional
    zoom: 13 // optional
}
```

__Methods__:

- `component.clear([draw])` clears the polygon `@draw {Boolean}` (default: `false`)
- `component.move(lat, lng)` moves the map to the specific position
- `component.export(opt, callback(base64))` exports data into the picture
    - `opt.width {Number}` required
    - `opt.height {Number}` required
    - `opt.zoom {Number}` (default: `13`)
    - `opt.type {png|jpg}` (default: `png`)
    - `opt.quality {Number}` only for JPEG
    - `opt.points {Array Number}`
    - `opt.color {String}` (default: `config.color`)
    - `opt.radius {Number}` (default: `config.radius`)
    - `opt.opacity {Number}` (default: `config.opacity`)

__Output__:

- is extended by `center { lat: Number, lng: Number }` property

__Good to know__:

- `double click` on vertices (created point) will delete selected point

### Author

- Peter Širka & Dodo Marton <info@totaljs.com>
- [License](https://www.totaljs.com/license/)