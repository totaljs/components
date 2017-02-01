## j-Crop

__Supports__:

- zoom
- drag and drop
- local files

__Other attributes__:

- `data-width="500"` width
- `data-height="500"` height
- `data-dragdrop="true"` - allows drag and drop
- `data-background="white"` - optional, default empty (transparent)
- `data-format="/download/{0}.jpg"` - optional, a format of URL file generator (default: `{0}`)
- `data-jc-path="url-to-image"` - must contain URL to picture

__Methods__:

```javascript
// e.g.
var component = FIND('croper');

// Resize canvas
component.resize(500, 200);

// Get cropped image
var png = component.output('image/png');
var jpg = component.output('image/jpeg');

// Below method automatically detects the transparency and sets the output
var data = component.output();

// Is the image cropped?
console.log('Is changed?', component.dirty());
console.log('Is changed?', $.components.disable(component.path);
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT