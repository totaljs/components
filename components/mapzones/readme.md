---
name: MapZones
description: OpenLayers map for drawing and editing polygon zones from data-source points, with a callback when the value changes
author: Dodo Marton / Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2023-05-02 15:00
updated: 2025-08-05 10:33
jcomponent: v19,v20
---

# MapZones

The component for drawing and displaying zones on the map. This component uses [OpenLayers](https://openlayers.org/) library with the [OpenStreetMap](https://www.openstreetmap.org/) map engine. The component uses 3rd party dependencies.

__Configuration__:

- `height {Number/String}` fixed height or a parent element (default: `200`)
- `color {String}` enables custom color for created polygon (default: `#fcba03`)
- `zoom {Number}` a default zoom level (default: `11`)
- `modify {Boolean}` enables modifiyng of the polygon (default: `true`)
- `opacity {Number}` determines the transparency of the polygon in percentage (default: `20`)
- __NEW__ `exec {String}` a link to the `function(value)`, it's executed when the value is changed

__Data-source__ needs to contain:

```js
{
    points: [{ lat: 48.75152530164132, lng: 19.13902142954625 }, { lat: 48.726826662905296, lng: 19.123238694044034 }, ...] // polygon points
    color: '#FD391A', // optional
    zoom: 13 // optional
}
```

__Good to know__:

- `SHIFT + click` on vertices (created point) will delete selected point
