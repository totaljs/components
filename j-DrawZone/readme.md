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
- `latlng {String}` a default map position (default: `48.73702477,19.137712`)
- `opacity {Number}` determines the transparency of the polygon in percentage (default: `20`)

__Data-source__ needs to contain:

```js
{
    points: [{ lat: 48.75152530164132, lng: 19.13902142954625 }, { lat: 48.726826662905296, lng: 19.123238694044034 }, ...] // polygon points
    color: '#FD391A', // optional
    zoom: 13 // optional
}
```

__Output__:

- is extended by `center { lat: Number, lng: Number }` property

__Good to know__:

- `double click` on vertices (created point) will delete selected point

### Author

- Peter Širka & Dodo Marton <info@totaljs.com>
- [License](https://www.totaljs.com/license/)