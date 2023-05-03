## j-MapZones

The component for drawing and displaying zones on the map. This component uses [OpenLayers](https://openlayers.org/) library with the [OpenStreetMap](https://www.openstreetmap.org/) map engine. The component uses 3rd party dependencies.

__Configuration__:

- `height {Number/String}` fixed height or a parent element (default: `200`)
- `color {String}` enables custom color for created polygon (default: `#fcba03`)
- `zoom {Number}` a default zoom level (default: `11`)
- `modify {Boolean}` enables modifiyng of the polygon (default: `true`)

__Data-source__ needs to contain:

```js
{
    items: ['48.75152530164132, 19.13902142954625', '48.726826662905296, 19.123238694044034', ...] // polygon points
    color: '#FD391A', // optional
    zoom: 13 // optional
}
```

__Good to know__:

- `SHIFT + click` on vertices (created point) will delete selected point

### Author

- Dodo Marton <dodo@totaljs.com>
- [License](https://www.totaljs.com/license/)